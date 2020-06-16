import React from 'react';
import { css } from 'emotion';
import { TextField } from '@material-ui/core';
import { Test } from '../types';
import { colors } from '../utils/theme';

const rootStyles = css``;

const inputStyles = css`
  width: 100%;
  margin: 0 0 16px 0;
`;

const createdByStyles = css`
  font-size: 12px;
  color: ${colors.darkerGrey};
  margin: 0;
`;

type Props = {
  test: Test;
  isEditing: boolean;
  onTestUpdated: Function;
};

export const TabBasic = ({ test, isEditing, onTestUpdated }: Props) => {
  const { created, author } = test;

  const formattedDate = new Date(created).toLocaleString().replace(', ', ' at ');
  let createdSentence = `Test created on ${formattedDate}`;
  if (author && author.firstName && author.lastName) {
    createdSentence += ` by ${author.firstName} ${author.lastName}`;
  }

  return (
    <div className={rootStyles}>
      <TextField
        label="Test Name"
        variant="outlined"
        className={inputStyles}
        value={test.name}
        disabled={!isEditing}
        onChange={(e) => onTestUpdated({ ...test, name: e.currentTarget.value })}
      />
      <TextField
        label="Description"
        variant="outlined"
        className={inputStyles}
        value={test.description}
        disabled={!isEditing}
        onChange={(e) => onTestUpdated({ ...test, description: e.currentTarget.value })}
        multiline
        rows={4}
      />
      {created && formattedDate && createdSentence && <p className={createdByStyles}>{createdSentence}</p>}
    </div>
  );
};
