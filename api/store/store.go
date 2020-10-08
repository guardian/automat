package store

import (
	"fmt"
)

var ExampleVariants = []Variant{
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

var ExampleSlots = []Slot{
	{
		ID:   "bodyEnd",
		Name: "Body End",
		Tests: []Test{
			{
				ID:          "test1",
				Name:        "Test 1",
				Description: "example test",
				IsEnabled:   true,
				Variants:    []string{"contributionsbanner"},
				Author:      Author{ID: "automat.dev@guardian.co.uk", FirstName: "Automat", LastName: "Admin"},
			},
		},
	},
}

// Variant is a component really (TODO rename)
type Variant struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

// VariantStore defines access patterns for variants
type VariantStore interface {
	GetVariants() ([]Variant, error)
}

// Author - TODO use a single 'name' field as first/last is constraining
type Author struct {
	ID        string `json:"id"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
}

// Test is an MVT test
type Test struct {
	ID          string   `json:"id"`
	Name        string   `json:"name"`
	Description string   `json:"description"`
	IsEnabled   bool     `json:"isEnabled"`
	Variants    []string `json:"variants"`
	Author      Author   `json:"author"`
}

// Slot is a zone of a Guardian page
type Slot struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Tests []Test `json:"tests"`
}

// SlotStore defines access patterns for slots
type SlotStore interface {
	GetSlots() ([]Slot, error)
	GetSlot(ID string) (Slot, error)
	UpdateSlot(ID string, update Slot) error
}

// Store is the catchall all-in-one store interface. Prefer the narrow
// interfaces where possible in your function signatures.
type Store interface {
	VariantStore
	SlotStore
	Init(slots []Slot, variants []Variant) error
}

// MemoryStore is an in-memory store for local dev/testing
type MemoryStore struct {
	variants []Variant
	slots    []Slot
}

// GetSlots slots
func (s *MemoryStore) GetSlots() ([]Slot, error) {
	return s.slots, nil
}

// GetSlot slot by ID
func (s *MemoryStore) GetSlot(ID string) (Slot, error) {
	for _, slot := range s.slots {
		if slot.ID == ID {
			return slot, nil
		}
	}

	return Slot{}, fmt.Errorf("slot %s not found", ID)
}

// UpdateSlot updates a slot
func (s *MemoryStore) UpdateSlot(ID string, update Slot) error {
	for i, slot := range s.slots {
		if slot.ID == ID {
			s.slots[i] = update
		}
	}

	return nil
}

// GetVariants variants
func (s *MemoryStore) GetVariants() ([]Variant, error) {
	return s.variants, nil
}

// Init populates the store with some test data
func (s *MemoryStore) Init(slots []Slot, variants []Variant) error {
	s.variants = variants
	s.slots = slots
	return nil
}
