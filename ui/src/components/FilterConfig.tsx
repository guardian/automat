import React, { useState, useEffect } from 'react';
import { css, cx } from 'emotion';
import { Card, Grid, FormControl, FormControlLabel, RadioGroup, Radio, Checkbox, Slider } from '@material-ui/core';
import { FilterOption, FilterControl } from '../types';
import { FieldMessage } from './FieldMessage';

const rootStyles = css`
  width: 100%;
  padding: 12px;
`;

const gridStyles = css`
  width: 600px;
  margin: 12px auto;
`;

const fieldMessageWrapperStyles = css`
  margin-bottom: 16px;
`;

const sliderStyles = css`
  width: 400px;
  margin-top: 36px;
  margin-bottom: 24px;
`;

const sliderRangeStyles = css`
  font-size: 18px;
  font-weight: bold;
  padding: 0 12px;
  text-align: center;
`;

type Props = {
  selectedOptionIds: string[];
  options: FilterOption[];
  filterName: string;
  allowMultipe: boolean;
  control: FilterControl;
  isEditing: boolean;
  onFilterUpdated: Function;
};

const getSliderValue = (selectedOptionIds: string[]) => {
  if (selectedOptionIds.length > 0) {
    return parseInt(selectedOptionIds[0], 10) || 0; // NaN or numerical value
  }

  return undefined;
};

const getSliderMinValue = (options: FilterOption[]) => {
  return parseInt(options[0].value, 10);
};

const getSliderMaxValue = (options: FilterOption[]) => {
  return parseInt(options[1].value, 10);
};

export const FilterConfig = ({ selectedOptionIds, options, filterName, allowMultipe, control, isEditing, onFilterUpdated }: Props) => {
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

  const handleSliderChange = (value: number) => {
    const stringifiedValue = String(value);
    const updatedOptions = [stringifiedValue];
    setSelectedOptions(updatedOptions);
    onFilterUpdated(updatedOptions);
  };

  // Initialise the 'slider' controller with its default value (value of last option)
  useEffect(() => {
    if (selectedOptionIds.length === 0 && control === 'slider' && options.length === 2) {
      handleSliderChange(parseInt(options[1].value, 10));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptionIds]);

  return (
    <Card elevation={2} className={cx(rootStyles)}>
      {control === 'options' && (
        <FormControl component="fieldset">
          {allowMultipe ? (
            <>
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
            </>
          ) : (
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
          )}
        </FormControl>
      )}

      {control === 'slider' && options.length === 2 && (
        <Grid container spacing={0} justify="space-between" alignItems="center" className={cx(gridStyles)}>
          <div className={sliderRangeStyles}>{options[0].label}</div>
          <Grid item>
            <Slider
              value={getSliderValue(selectedOptions)}
              onChange={(e, value: any) => handleSliderChange(value)}
              min={getSliderMinValue(options)}
              max={getSliderMaxValue(options)}
              defaultValue={getSliderMaxValue(options)}
              valueLabelDisplay="on"
              className={cx(sliderStyles)}
              disabled={!isEditing}
            />
          </Grid>
          <div className={sliderRangeStyles}>{options[1].label}</div>
        </Grid>
      )}

      {isEditing && selectedOptions.length === 0 && control !== 'slider' && (
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
