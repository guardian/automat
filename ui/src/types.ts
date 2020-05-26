export interface Slot {
  id: string;
  name: string;
  testCount?: number;
}

export type Variant = string;
export type Section = string;

export interface Test {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  variants: Variant[];
  sections: Section[];
}
