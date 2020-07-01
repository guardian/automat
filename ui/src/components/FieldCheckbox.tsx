import React from 'react';
import { css, cx } from 'emotion';
import { FormControl, FormControlLabel, Checkbox } from '@material-ui/core';
import { FieldMessage } from './FieldMessage';
import { FilterOption } from '../types';

const rootStyles = css`
  width: 100%;
`;

const fieldMessageStyles = css`
  margin-bottom: 16px;
`;

type Props = {
  options: FilterOption[];
  selectedOptions: string[];
  isEditing: boolean;
  onFieldUpdated: Function;
};

export const FieldCheckbox = ({ options, selectedOptions, isEditing, onFieldUpdated }: Props) => {
  const handleCheckboxChange = (event: any, value: string) => {
    let updatedOptions: string[];
    if (event.target.checked) {
      updatedOptions = selectedOptions.includes(value) ? selectedOptions : [...selectedOptions, value];
    } else {
      updatedOptions = selectedOptions.filter((option) => option !== value);
    }
    onFieldUpdated(updatedOptions);
  };

  return (
    <FormControl component="fieldset" className={cx(rootStyles)}>
      {options.map((option, index) => (
        <FormControlLabel
          key={`${option.value}-${index}`}
          control={
            <Checkbox
              checked={selectedOptions.includes(option.value)}
              onChange={(event) => handleCheckboxChange(event, option.value)}
              disabled={!isEditing}
              color="primary"
            />
          }
          label={option.label}
        />
      ))}
      {isEditing && selectedOptions.length === 0 && (
        <div className={fieldMessageStyles}>
          <FieldMessage severity="warning">
            <span>
              You must select at least one option in order to get some traffic on your test.
              <br />
              If you don't need this filter, you should remove it.
            </span>
          </FieldMessage>
        </div>
      )}
    </FormControl>
  );
};
