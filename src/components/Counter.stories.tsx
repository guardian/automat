import React, { ReactElement } from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { Counter } from './Counter';

export default {
  component: Counter,
  title: 'Components/Counter',
  decorators: [withKnobs],
};

export const defaultStory = (): ReactElement => {
  return <Counter name={text('heading', 'Roberto')} />;
};

defaultStory.story = { name: 'Default Counter' };
