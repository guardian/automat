import React from 'react';
import { css, cx } from 'emotion';
import { Card } from '@material-ui/core';
import { PictureInPicture as PictureInPictureIcon } from '@material-ui/icons';
import { Heading } from './Heading';
import { colors } from '../utils/theme';

const rootStyles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 36px 24px;
  background-color: ${colors.lighterGrey};
  border: 2px solid ${colors.darkerGrey};
`;

const iconStyles = css`
  font-size: 36px;
  margin-bottom: 12px;
`;

const textStyles = css`
  text-align: center;
  margin-bottom: 0;
`;

export const VariantsPlaceholder = () => {
  return (
    <Card className={cx(rootStyles)} elevation={0}>
      <PictureInPictureIcon className={cx(iconStyles)} />
      <Heading level={2} supressMargin>
        No variants to display
      </Heading>
      <p className={textStyles}>
        Click the <b>Add Variant</b> button to start defining <br />
        what the tests users will see.
      </p>
    </Card>
  );
};
