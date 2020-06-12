import React, { useState } from 'react';
import { css, cx } from 'emotion';
import { Card, FormControl, FormControlLabel, RadioGroup, Radio, Checkbox } from '@material-ui/core';
import { Filter, FilterOption } from '../types';

const rootStyles = css`
  padding: 12px;
`;

type Props = {
  selectedOptionIds: string[];
  options: FilterOption[];
  allowMultipe: boolean;
  isEditing: boolean;
  onChange: Function;
};

export const FilterConfig = ({ selectedOptionIds, options, allowMultipe, isEditing, onChange }: Props) => {
  const handleChange = () => {
    console.log('=== Handle Change');
  };

  return (
    <Card elevation={2} className={cx(rootStyles)}>
      <FormControl component="fieldset">
        {allowMultipe ? (
          <>
            {options.map((option) => (
              <FormControlLabel
                control={<Checkbox checked={selectedOptionIds.includes(option.value)} onChange={handleChange} disabled={!isEditing} color="primary" />}
                label={option.label}
              />
            ))}
          </>
        ) : (
          <RadioGroup value={selectedOptionIds[0]} onChange={handleChange}>
            {options.map((option) => (
              <FormControlLabel value={option.value} control={<Radio color="primary" disabled={!isEditing} />} label={option.label} />
            ))}
          </RadioGroup>
        )}
      </FormControl>
    </Card>
  );
};
