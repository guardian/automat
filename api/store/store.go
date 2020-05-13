// Package store is the general interface for interacting with persistent
// storage
package store

// Test describes a slot configuration
type Test struct {
	ID          string
	Name        string
	Description string
	Enabled     bool
	Variants    []string
	Sections    []string
}

// Targeting is metadata used to select a Test
type Targeting struct {
	Section string
}

// Store is the main interface to fetch tests
type Store interface {
	GetAll() []Test
	GetMatching(Targeting) []Test
}

// MemoryStore is for testing only
type MemoryStore struct {
	data []Test
}

// GetAll tests from the memory store
func (m MemoryStore) GetAll() []Test {
	return m.data
}

// GetMatching tests from the memory store
func (m MemoryStore) GetMatching(t Targeting) []Test {
	matched := []Test{}

	for _, test := range m.data {
		for _, section := range test.Sections {
			if section == t.Section {
				matched = append(matched, test)
			}
		}
	}

	return matched
}

// InitTestData populates the store with some dummy data
func (m *MemoryStore) InitTestData() {
	data := []Test{
		{
			ID:          "test1",
			Name:        "Test 1",
			Description: "Example test",
			Enabled:     true,
			Variants:    []string{"foo", "bar"},
			Sections:    []string{"football"},
		},
		{
			ID:          "test2",
			Name:        "Test 2",
			Description: "Example test",
			Enabled:     true,
			Variants:    []string{"foo", "bar"},
			Sections:    []string{"culture"},
		},
	}

	m.data = data
}
