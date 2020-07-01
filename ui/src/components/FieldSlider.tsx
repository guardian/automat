import React, { useEffect } from 'react';
import { css, cx } from 'emotion';
import { Grid, Slider } from '@material-ui/core';
import { FilterOption } from '../types';

const gridStyles = css`
  width: 600px;
  margin: 12px auto;
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
  options: FilterOption[];
  selectedOptions: string[];
  isEditing: boolean;
  onFieldUpdated: Function;
};

const getSliderValue = (selectedOptions: string[]) => {
  if (selectedOptions.length > 0) {
    return parseInt(selectedOptions[0], 10) || 0; // NaN or numerical value
  }

  return undefined;
};

const getSliderMinValue = (options: FilterOption[]) => {
  return parseInt(options[0].value, 10);
};

const getSliderMaxValue = (options: FilterOption[]) => {
  return parseInt(options[1].value, 10);
};

export const FieldSlider = ({ options, selectedOptions, isEditing, onFieldUpdated }: Props) => {
  // Initialise the 'slider' controller with its default value (value of last option)
  useEffect(() => {
    if (selectedOptions.length === 0 && options.length === 2) {
      handleSliderChange(parseInt(options[1].value, 10));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions]);

  const handleSliderChange = (value: number) => {
    const stringifiedValue = String(value);
    const updatedOptions = [stringifiedValue];
    onFieldUpdated(updatedOptions);
  };

  return (
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
  );
};
