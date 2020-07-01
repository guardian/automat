import React from 'react';
import { css, cx } from 'emotion';
import { Card } from '@material-ui/core';
import { FilterOption, FilterControl } from '../types';
import { FieldCheckbox } from './FieldCheckbox';
import { FieldRadio } from './FieldRadio';
import { FieldSlider } from './FieldSlider';

const rootStyles = css`
  width: 100%;
  padding: 12px;
`;

type Props = {
  selectedOptionIds: string[];
  options: FilterOption[];
  allowMultipe: boolean;
  control: FilterControl;
  isEditing: boolean;
  onFilterUpdated: Function;
};

export const FilterField = ({ selectedOptionIds, options, allowMultipe, control, isEditing, onFilterUpdated }: Props) => {
  const handleFieldUpdate = (updatedOptions: string[]) => {
    onFilterUpdated(updatedOptions);
  };

  return (
    <Card elevation={2} className={cx(rootStyles)}>
      {control === 'options' && allowMultipe && (
        <FieldCheckbox options={options} selectedOptions={selectedOptionIds} isEditing={isEditing} onFieldUpdated={handleFieldUpdate} />
      )}

      {control === 'options' && !allowMultipe && (
        <FieldRadio options={options} selectedOptions={selectedOptionIds} isEditing={isEditing} onFieldUpdated={handleFieldUpdate} />
      )}

      {control === 'slider' && options.length === 2 && (
        <FieldSlider options={options} selectedOptions={selectedOptionIds} isEditing={isEditing} onFieldUpdated={handleFieldUpdate} />
      )}
    </Card>
  );
};
