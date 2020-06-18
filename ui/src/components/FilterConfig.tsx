import React, { useState } from 'react';
import { css, cx } from 'emotion';
import { Card, FormControl, FormControlLabel, RadioGroup, Radio, Checkbox } from '@material-ui/core';
import { FilterOption } from '../types';
import { FieldMessage } from './FieldMessage';

const rootStyles = css`
  padding: 12px;
`;

const fieldMessageWrapperStyles = css`
  margin-bottom: 16px;
`;

type Props = {
  selectedOptionIds: string[];
  options: FilterOption[];
  filterName: string;
  allowMultipe: boolean;
  isEditing: boolean;
  onFilterUpdated: Function;
};

export const FilterConfig = ({ selectedOptionIds, options, filterName, allowMultipe, isEditing, onFilterUpdated }: Props) => {
  const [selectedOptions, setSelectedOptions] = useState(selectedOptionIds);

  const handleCheckboxChange = (event: any, value: string) => {
    let updatedOptions: string[];
    if (event.target.checked) {
      updatedOptions = selectedOptions.includes(value) ? selectedOptions : [...selectedOptions, value];
    } else {
      updatedOptions = selectedOptions.filter((option) => option !== value);
    }
    setSelectedOptions(updatedOptions);
    onFilterUpdated(updatedOptions);
  };

  const handleRadioChange = (event: any) => {
    const updatedOptions = [event.target.value];
    setSelectedOptions(updatedOptions);
    onFilterUpdated(updatedOptions);
  };

  return (
    <Card elevation={2} className={cx(rootStyles)}>
      <FormControl component="fieldset">
        {allowMultipe ? (
          <>
            {options.map((option) => (
              <FormControlLabel
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
          </>
        ) : (
          <RadioGroup value={selectedOptions[0]} onChange={handleRadioChange}>
            {options.map((option) => (
              <FormControlLabel value={option.value} control={<Radio color="primary" disabled={!isEditing} />} label={option.label} />
            ))}
          </RadioGroup>
        )}
      </FormControl>
      {isEditing && selectedOptions.length === 0 && (
        <div className={fieldMessageWrapperStyles}>
          <FieldMessage severity="warning">
            <span>
              You must select at least one option in order to get some traffic on your test.
              <br />
              If you don't want to filter by <b>{filterName}</b>, you should remove this Filter.
            </span>
          </FieldMessage>
        </div>
      )}
    </Card>
  );
};
