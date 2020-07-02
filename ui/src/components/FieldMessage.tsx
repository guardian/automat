import React from 'react';
import { css } from 'emotion';
import { Warning as WarningIcon, Error as ErrorIcon } from '@material-ui/icons';
import { colors } from '../utils/theme';

const getRootStyles = (severity: Severity) => {
  const textColor = severity === 'error' ? colors.white : colors.darkestGrey;
  const backgroundColor = severity === 'error' ? colors.red : colors.yellow;

  return css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    border-radius: 4px;
    margin: 12px 0;
    padding: 12px;
    color: ${textColor};
    background-color: ${backgroundColor};
  `;
};

const iconStyles = css`
  margin-right: 12px;
`;

type Severity = 'warning' | 'error';
type Props = {
  children: JSX.Element | string;
  severity?: Severity;
  textMessage?: string;
};

export const FieldMessage = ({ children, severity = 'warning' }: Props) => {
  return (
    <div className={getRootStyles(severity)} role="alert">
      {severity === 'error' ? <ErrorIcon className={iconStyles} /> : <WarningIcon className={iconStyles} />}
      {children}
    </div>
  );
};
