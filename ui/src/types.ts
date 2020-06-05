// GET /admin/slots
// Returns an array of Automat slots.
type Slots = Slot[];
export interface Slot {
  id: string;
  name: string;
}

// GET /admin/slots/:slotId/tests
// Returns an array of tests under the slot.
// PUT /admin/slots/:slotId/tests
// Updates the array of tests under the slot.
export interface Test {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  created: Date;
  updated: Date;
  startDate?: Date;
  expiryDate?: Date;
  author: {
    id: string; // Likely email address
    firstName: string;
    lastName: string;
  };
  variants: string[]; // Array of variant IDs (components)
  filters: TestFilter[];
}

interface TestFilter {
  filterId: string;
  selectedOptionIds: string[]; // Allow one or multiple entries depending on allowMultiple boolean in Filter
}

export type SimpleTest = {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
};

// GET /admin/filters
type Filters = Filter[];
interface Filter {
  id: string;
  name: string;
  helpText: string;
  options: FilterOption[];
  allowMultiple: boolean; // Default to false?
}
interface FilterOption {
  value: string;
  label: string;
}

// GET /admin/variants
type Variants = Variant[];
interface Variant {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
}
