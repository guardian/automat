import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FieldSlider } from './FieldSlider';
import { FilterOption } from '../types';

const defaultProps = {
  selectedOptions: ['option1'],
  options: [
    {
      value: '0',
      label: '0%',
    },
    {
      value: '100',
      label: '100%',
    },
  ] as FilterOption[],
  isEditing: false,
  onFieldUpdated: jest.fn(),
};

describe('FieldCheckbox', () => {
  it('should render min and max values provided', () => {
    const { getByText } = render(
      <Router>
        <FieldSlider {...defaultProps} />
      </Router>,
    );

    expect(getByText('0%')).toBeInTheDocument();
    expect(getByText('100%')).toBeInTheDocument();
  });

  it('should call the change handler when option clicked', () => {
    const { getByRole } = render(
      <Router>
        <FieldSlider {...defaultProps} isEditing={true} />
      </Router>,
    );

    const slider = getByRole('slider');
    fireEvent.click(slider);

    waitFor(() => {
      expect(defaultProps.onFieldUpdated).toHaveBeenCalled();
    });
  });
});
