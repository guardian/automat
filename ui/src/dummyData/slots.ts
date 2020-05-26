export interface Slot {
  id: string;
  name: string;
  testCount: number;
}

export const slots: Slot[] = [
  {
    id: 'bodyEnd',
    name: 'Body End',
    testCount: 12,
  },
  {
    id: 'cmp',
    name: 'CMP',
    testCount: 18,
  },
];
