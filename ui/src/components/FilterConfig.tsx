import React, { useState } from 'react';
import { css, cx } from 'emotion';
import { Card, FormControl, FormControlLabel, RadioGroup, Radio, Checkbox } from '@material-ui/core';
import { Warning as WarningIcon } from '@material-ui/icons';
import { FilterOption } from '../types';
import { colors } from '../utils/theme';

const rootStyles = css`
  padding: 12px;
`;

const infoStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-radius: 4px;
  margin: 12px 0;
  padding: 12px;
  border: 1px solid ${colors.darkerGrey};
  background-color: ${colors.yellow};
`;

const iconStyles = css`
  margin-right: 12px;
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
        <p className={infoStyles}>
          <WarningIcon className={iconStyles} />
          <span>
            You must select at least one option in order to get some traffic on your test.
            <br />
            If you don't want to filter by <b>{filterName}</b>, you should remove this Filter.
          </span>
        </p>
      )}
    </Card>
  );
};
