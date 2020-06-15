import React, { useState } from 'react';
import { css, cx } from 'emotion';
import { Card, FormControl, FormControlLabel, RadioGroup, Radio, Checkbox } from '@material-ui/core';
import { FilterOption } from '../types';

const rootStyles = css`
  padding: 12px;
`;

type Props = {
  selectedOptionIds: string[];
  options: FilterOption[];
  allowMultipe: boolean;
  isEditing: boolean;
  onFilterUpdated: Function;
};

export const FilterConfig = ({ selectedOptionIds, options, allowMultipe, isEditing, onFilterUpdated }: Props) => {
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
    </Card>
  );
};
