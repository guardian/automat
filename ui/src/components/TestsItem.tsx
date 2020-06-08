import React from 'react';
import { css, cx } from 'emotion';
import { Link } from 'react-router-dom';
import { Card, Chip } from '@material-ui/core';
import { Heading } from './Heading';
import { getTestStatus } from '../lib/testStatusHelpers';

const rootStyles = css`
  color: inherit;
  display: block;
  text-decoration: none;
`;

const getCardStyles = (isSelected: boolean, isLastItem: boolean, isModified: boolean) => css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 12px;
  background-color: ${isSelected ? '#EEE' : '#FFF'};
  border: ${isModified ? '2px' : '2px'} solid ${isModified ? '#ffeb3b' : '#bdbdbd'};
  margin-bottom: ${isLastItem ? 0 : '16px'};
`;

const getChipStyles = (color: string) => css`
  background-color: ${color};
  height: auto;
  padding: 2px 0;
  color: #fff;
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
};

export const TestsItem = ({ id, name, description, link, isEnabled, isSelected, isModified, isLastItem }: Props) => {
  const status = getTestStatus(isEnabled);
  return (
    <Link key={id} to={link} className={rootStyles}>
      <Card className={cx(getCardStyles(isSelected, isLastItem, isModified))} elevation={0}>
        <div className={headerStyles}>
          <Heading level={2} supressMargin>
            {isModified ? (
              <>
                {name}
                <div className={subheadingStyles}>(Modified)</div>
              </>
            ) : (
              name
            )}
          </Heading>
          {status && <Chip label={status.label} className={cx(getChipStyles(status.color))} />}
        </div>
        <p className={descriptionStyles}>{description}</p>
      </Card>
    </Link>
  );
};
