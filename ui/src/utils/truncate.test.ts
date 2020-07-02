import { truncate } from './truncate';

describe('truncate', () => {
  it(`should truncate a long string`, () => {
    const text = 'Who looks outside, dreams; who looks inside, awakes.';
    const obtainedText = truncate(text, 26);

    expect(obtainedText).toBe('Who looks outside, dreams...');
  });

  it(`does not truncate a string shorter than the specified length`, () => {
    const text = 'Who looks outside, dreams; who looks inside, awakes.';
    const obtainedText = truncate(text, 52);

    expect(obtainedText).toBe('Who looks outside, dreams; who looks inside, awakes.');
  });
});
