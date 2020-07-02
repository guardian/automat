import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ModeToggler } from './ModeToggler';
import { TestErrors } from '../types';
import { mockTests } from '../fixtures/tests';
import { mockVariants } from '../fixtures/variants';
import { mockFilters } from '../fixtures/filters';

const defaultProps = {
  isEditing: false,
  hasChanges: false,
  testErrors: {} as TestErrors,
  onUnlock: jest.fn(),
  onSaveChanges: jest.fn(),
  onRevertChanges: jest.fn(),
};

describe('TestEditor', () => {
  it('should render in read-only mode as default', () => {
    const { getByText } = render(
      <Router>
        <ModeToggler {...defaultProps} />
      </Router>,
    );

    const status = getByText('Read Only');
    expect(status).toBeInTheDocument();
  });

  it('should render in editing mode if making changes', () => {
    const { getByText } = render(
      <Router>
        <ModeToggler {...defaultProps} isEditing={true} />
      </Router>,
    );

    const status = getByText('Editing');
    expect(status).toBeInTheDocument();
  });

  it('should call the Unlock handler when unlocking', () => {
    const { getByLabelText } = render(
      <Router>
        <ModeToggler {...defaultProps} />
      </Router>,
    );

    const button = getByLabelText('Unlock editing mode');
    fireEvent.click(button);
    expect(defaultProps.onUnlock).toHaveBeenCalled();
  });

  it('should call the Save handler when saving without changes', () => {
    const { getByLabelText } = render(
      <Router>
        <ModeToggler {...defaultProps} isEditing={true} hasChanges={false} />
      </Router>,
    );

    const button = getByLabelText('Save changes');
    fireEvent.click(button);
    expect(defaultProps.onSaveChanges).toHaveBeenCalled();
  });

  it('should call the Save handler after confirmation with saving with changes', () => {
    const { getByText, getByLabelText } = render(
      <Router>
        <ModeToggler {...defaultProps} isEditing={true} hasChanges={true} />
      </Router>,
    );

    const saveButton = getByLabelText('Save changes');
    fireEvent.click(saveButton);

    const confirmation = getByText('Save changes?');
    expect(confirmation).toBeInTheDocument();

    const confirmSaveButton = getByLabelText('Confirm save changes');
    fireEvent.click(confirmSaveButton);
    expect(defaultProps.onSaveChanges).toHaveBeenCalled();
  });

  it('should call the Revert handler when saving without changes', () => {
    const { getByLabelText } = render(
      <Router>
        <ModeToggler {...defaultProps} isEditing={true} hasChanges={false} />
      </Router>,
    );

    const button = getByLabelText('Revert changes');
    fireEvent.click(button);
    expect(defaultProps.onRevertChanges).toHaveBeenCalled();
  });

  it('should call the Revert handler after confirmation with reverting with changes', () => {
    const { getByText, getByLabelText } = render(
      <Router>
        <ModeToggler {...defaultProps} isEditing={true} hasChanges={true} />
      </Router>,
    );

    const revertButton = getByLabelText('Revert changes');
    fireEvent.click(revertButton);

    const confirmation = getByText('Revert changes?');
    expect(confirmation).toBeInTheDocument();

    const confirmRevertButton = getByLabelText('Confirm revert changes');
    fireEvent.click(confirmRevertButton);
    expect(defaultProps.onRevertChanges).toHaveBeenCalled();
  });
});
