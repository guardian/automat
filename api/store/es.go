package store

import (
	"bytes"
	"encoding/json"

	"github.com/elastic/go-elasticsearch/v7"
)

var slotIndex = "slots"
var variantsIndex = "variants"

var variants = []Variant{
	{
		ID:          "commercialmpu",
		Name:        "Commercial MPU",
		Description: "A Commercial MPU for article adverts",
	},
	{
		ID:          "contributionsbanner",
		Name:        "Contributions Banner",
		Description: "Banner format contributions ask",
	},
}

type q = map[string]interface{}

type searchResult struct {
	Took     int  `json:"took"`
	TimedOut bool `json:"timed_out"`
	Shards   struct {
		Total      int `json:"total"`
		Successful int `json:"successful"`
		Skipped    int `json:"skipped"`
		Failed     int `json:"failed"`
	} `json:"_shards"`
	Hits struct {
		Total struct {
			Value    int    `json:"value"`
			Relation string `json:"relation"`
		} `json:"total"`
		MaxScore float64 `json:"max_score"`
		Hits     []struct {
			Index  string          `json:"_index"`
			Type   string          `json:"_type"`
			ID     string          `json:"_id"`
			Score  float64         `json:"_score"`
			Source json.RawMessage `json:"_source"`
		} `json:"hits"`
	} `json:"hits"`
}

type getResult struct {
	Index       string          `json:"_index"`
	Type        string          `json:"_type"`
	ID          string          `json:"_id"`
	Version     int             `json:"_version"`
	SeqNo       int             `json:"_seq_no"`
	PrimaryTerm int             `json:"_primary_term"`
	Found       bool            `json:"found"`
	Source      json.RawMessage `json:"_source"`
}

// ElasticsearchStore implements the various *Store interfaces
type ElasticsearchStore struct {
	client   *elasticsearch.Client
	variants []Variant
}

// NewElasticsearchStore returns a store with a default client
func NewElasticsearchStore(URL string) (ElasticsearchStore, error) {
	var s ElasticsearchStore

	client, err := elasticsearch.NewClient(elasticsearch.Config{Addresses: []string{URL}})
	if err != nil {
		return s, err
	}

	s.client = client
	return s, nil
}

// Init populates the store will some dummy data. Note, this is not
// threadsafe.
func (s *ElasticsearchStore) Init(slots []Slot, variants []Variant) error {
	for _, slot := range slots {
		err := s.UpdateSlot(slot.ID, slot)
		if err != nil {
			return err
		}
	}

	s.variants = variants
	return nil
}

// GetSlot returns a single slot by ID
func (s *ElasticsearchStore) GetSlot(ID string) (Slot, error) {
	var slot Slot
	res, err := s.client.Get(slotIndex, ID)
	defer res.Body.Close()

	var result getResult
	err = json.NewDecoder(res.Body).Decode(&result)
	if err != nil {
		return slot, err
	}

	err = json.Unmarshal(result.Source, &slot)
	return slot, err
}

// GetSlots returns all slots (unpaginated).
func (s *ElasticsearchStore) GetSlots() ([]Slot, error) {
	var slots []Slot

	matchAll := q{
		"query": q{
			"match_all": q{},
		},
	}

	var query bytes.Buffer
	json.NewEncoder(&query).Encode(matchAll)

	res, err := s.client.Search(
		s.client.Search.WithIndex(slotIndex),
		s.client.Search.WithBody(&query),
	)

	if err != nil {
		return slots, err
	}
	defer res.Body.Close()

	var result searchResult
	err = json.NewDecoder(res.Body).Decode(&result)

	for _, hit := range result.Hits.Hits {
		var slot Slot
		err = json.Unmarshal(hit.Source, &slot)
		if err != nil {
			return slots, err
		}

		slots = append(slots, slot)
	}

	return slots, nil
}

// GetVariants variants
func (s *ElasticsearchStore) GetVariants() ([]Variant, error) {
	return s.variants, nil
}

// UpdateSlot updates a slot
func (s *ElasticsearchStore) UpdateSlot(ID string, update Slot) error {
	asJSON, err := json.Marshal(update)
	if err != nil {
		return err
	}

	_, err = s.client.Index(slotIndex, bytes.NewBuffer(asJSON), s.client.Index.WithDocumentID(ID))
	return err
}
