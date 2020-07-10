package store

// Variant is a component really (TODO rename)
type Variant struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

// VariantStore defined access patterns for variants
type VariantStore interface {
	GetVariants() ([]Variant, error)
}

// MemoryStore is an in-memory store for local dev/testing
type MemoryStore struct {
	variants []Variant
}

// GetVariants variants
func (s MemoryStore) GetVariants() ([]Variant, error) {
	return s.variants, nil
}

// Init populates the store with some test data
func (s *MemoryStore) Init() {
	variants := []Variant{
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
	s.variants = variants
}
