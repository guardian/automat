package store

import "testing"

func TestGetMatching(t *testing.T) {
	tests := []Test{
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

	targeting := Targeting{
		Section: "culture",
	}

	ms := MemoryStore{data: tests}
	got := ms.GetMatching(targeting)

	if got[0].ID != "test2" {
		t.Errorf("%s; want test2", got[0].ID)
	}
}
