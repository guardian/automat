import React from 'react';
import { css, cx } from 'emotion';
import { FormControl, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
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

export const FieldRadio = ({ options, selectedOptions, isEditing, onFieldUpdated }: Props) => {
  const handleRadioChange = (event: any) => {
    const updatedOptions = [event.target.value];
    onFieldUpdated(updatedOptions);
  };

  return (
    <FormControl component="fieldset" className={cx(rootStyles)}>
      <RadioGroup value={selectedOptions[0]} onChange={handleRadioChange}>
        {options.map((option, index) => (
          <FormControlLabel
            key={`${option.value}-${index}`}
            value={option.value}
            control={<Radio color="primary" disabled={!isEditing} />}
            label={option.label}
          />
        ))}
      </RadioGroup>
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
