import React, { ReactElement } from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { Counter } from './Counter';

export default {
  component: Counter,
  title: 'Components/Counter',
  decorators: [withKnobs],
};

export const defaultStory = (): ReactElement => {
  return <Counter startFrom={number('startFrom', 1)} />;
};

defaultStory.story = { name: 'Default Counter' };

export const fromTenStory = (): ReactElement => {
  return <Counter startFrom={number('startFrom', 525)} />;
};

fromTenStory.story = { name: 'Counter starting from 525' };
