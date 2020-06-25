import { truncate } from './truncate';

describe('truncate', () => {
  it(`should truncate a long string`, () => {
    const text = 'Who looks outside, dreams; who looks inside, awakes.';
    const obtainedText = truncate(text, 26);

    expect(obtainedText).toBe('Who looks outside, dreams...');
  });

  it(`should truncate a long string`, () => {
    const text = 'Who looks outside, dreams; who looks inside, awakes.';
    const obtainedText = truncate(text, 52);

    expect(obtainedText).toBe('Who looks outside, dreams; who looks inside, awakes.');
  });
});
