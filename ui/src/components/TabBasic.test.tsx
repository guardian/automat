import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { TabBasic } from './TabBasic';
import { TestErrors } from '../types';
import { mockTests } from '../fixtures/tests';

const defaultProps = {
  test: { ...mockTests[0] },
  isEditing: false,
  onTestUpdated: jest.fn(),
  testErrors: {} as TestErrors,
};

describe('TabVariants', () => {
  it('should render Name input with current values', () => {
    const { container, getByLabelText } = render(
      <Router>
        <TabBasic {...defaultProps} />
      </Router>,
    );

    const nameLabel = getByLabelText('Test Name');
    expect(nameLabel).toBeInTheDocument();

    const nameInput = container.querySelector('#TestNameInput') as HTMLInputElement;
    expect(nameInput?.value).toBe('Test 1');
  });

  it('should render Description input with current values', () => {
    const { container, getByLabelText } = render(
      <Router>
        <TabBasic {...defaultProps} />
      </Router>,
    );

    const descriptionLabel = getByLabelText('Description');
    expect(descriptionLabel).toBeInTheDocument();

    const descriptionInput = container.querySelector('#DescriptionInput') as HTMLInputElement;
    expect(descriptionInput?.value).toBe('Example test 1');
  });

  it('should render a Name error message if provided', () => {
    const testErrors: TestErrors = { [defaultProps.test.id]: { name: 'Validation error message' } };

    const { getByText } = render(
      <Router>
        <TabBasic {...defaultProps} isEditing={true} testErrors={testErrors} />
      </Router>,
    );

    const message = getByText('Validation error message');
    expect(message).toBeInTheDocument();
  });
});
