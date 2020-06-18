import React from 'react';
import { css, cx } from 'emotion';
import { Link } from 'react-router-dom';
import { Card, Chip } from '@material-ui/core';
import { Heading } from './Heading';
import { getTestStatus } from '../utils/testStatus';
import { colors } from '../utils/theme';
import { truncate } from '../utils/truncate';

const rootStyles = css`
  color: inherit;
  display: block;
  text-decoration: none;
`;

const getCardStyles = (isSelected: boolean, isLastItem: boolean, isModified: boolean, isInvalid: boolean) => {
  let borderColor = colors.darkerGrey;
  if (isInvalid) {
    borderColor = colors.red;
  } else if (isModified) {
    borderColor = colors.yellow;
  }

  return css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 12px;
    border: 2px solid ${borderColor};
    background-color: ${isSelected ? colors.lighterGrey : colors.white};
    margin-bottom: ${isLastItem ? '0' : '16px'};
  `;
};

const getChipStyles = (color: string) => css`
  background-color: ${color};
  height: auto;
  padding: 2px 0;
  color: ${colors.white};
  margin-left: 6px;
  width: 80px;
`;

const descriptionStyles = css`
  margin: 8px 0 0;
`;

const headerStyles = css`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const subheadingStyles = css`
  font-size: 12px;
`;

type Props = {
  id: string;
  name: string;
  description: string;
  link: string;
  isEnabled: boolean;
  isSelected: boolean;
  isModified: boolean;
  isLastItem: boolean;
  isInvalid: boolean;
};

export const TestsItem = ({ id, name, description, link, isEnabled, isSelected, isModified, isLastItem, isInvalid }: Props) => {
  const status = getTestStatus(isEnabled);
  const testName = truncate(name, 50);
  const testDescription = truncate(description, 80);

  return (
    <Link key={id} to={link} className={rootStyles}>
      <Card className={cx(getCardStyles(isSelected, isLastItem, isModified, isInvalid))} elevation={0}>
        <div className={headerStyles}>
          <Heading level={2} supressMargin>
            {isModified ? (
              <>
                {testName}
                <div className={subheadingStyles}>(Modified)</div>
              </>
            ) : (
              testName
            )}
          </Heading>
          {status && <Chip label={status.label} className={cx(getChipStyles(status.color))} />}
        </div>
        <p className={descriptionStyles}>{testDescription}</p>
      </Card>
    </Link>
  );
};
