import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FilterField } from '../components/FilterField';
import { FilterOption, FilterControl } from '../types';

const defaultProps = {
  selectedOptionIds: ['signedin'],
  options: [
    {
      value: 'signedin',
      label: 'User must be Signed In',
    },
    {
      value: 'signedout',
      label: 'User must be Signed Out',
    },
  ] as FilterOption[],
  control: 'options' as FilterControl,
  allowMultipe: false,
  isEditing: false,
  onFilterUpdated: jest.fn(),
};

describe('FilterConfig', () => {
  it('should be able to render a checkbox controller', () => {
    const { container } = render(
      <Router>
        <FilterField {...defaultProps} allowMultipe={true} />
      </Router>,
    );

    const checkboxes = container.querySelectorAll('[type="checkbox"]');
    expect(checkboxes.length).toBe(2);
  });

  it('should be able to render a radio controller', () => {
    const { container } = render(
      <Router>
        <FilterField {...defaultProps} />
      </Router>,
    );

    const radios = container.querySelectorAll('[type="radio"]');
    expect(radios.length).toBe(2);
  });

  it('should be able to render a slider controller', () => {
    const sliderOptions = [
      {
        value: '0',
        label: '0%',
      },
      {
        value: '100',
        label: '100%',
      },
    ];

    const { getByRole } = render(
      <Router>
        <FilterField {...defaultProps} options={sliderOptions} control="slider" />
      </Router>,
    );

    const slider = getByRole('slider');
    expect(slider).toBeInTheDocument();
  });
});
