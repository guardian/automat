import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FieldCheckbox } from './FieldCheckbox';
import { FilterOption } from '../types';

const defaultProps = {
  selectedOptions: ['option1'],
  options: [
    {
      value: 'option1',
      label: 'Option 1',
    },
    {
      value: 'option2',
      label: 'Option 2',
    },
  ] as FilterOption[],
  isEditing: false,
  onFieldUpdated: jest.fn(),
};

describe('FieldCheckbox', () => {
  it('should render all options provided', () => {
    const { getByText } = render(
      <Router>
        <FieldCheckbox {...defaultProps} />
      </Router>,
    );

    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();
  });

  it('should show a warning when no option selected in editing mode', () => {
    const selectedOptions: string[] = [];

    const { getByRole } = render(
      <Router>
        <FieldCheckbox {...defaultProps} isEditing={true} selectedOptions={selectedOptions} />
      </Router>,
    );

    const message = getByRole('alert');
    expect(message).toBeInTheDocument();
  });

  // it('should call the change handler when option clicked', () => {
  //   const { getByText } = render(
  //     <Router>
  //       <FieldCheckbox {...defaultProps} isEditing={true} />
  //     </Router>,
  //   );

  //   const option = getByText('Option 2');
  //   fireEvent.click(option);
  //   expect(defaultProps.onFieldUpdated).toHaveBeenCalled();
  // });
});
