import React from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { ThemeProvider } from 'emotion-theming';
import { Button as DSButton, LinkButton } from '@guardian/src-button';
import { SvgArrowRightStraight } from '@guardian/src-svgs';

// NOTE: this is copied from the Contributions service and needs refactoring!
// - Ditch/sanitise `isTertiary` prop
// - Update theme overrides or use defaults

// Custom theme for Button/LinkButton
// See also `tertiaryButtonOverrides` below.
const buttonStyles = {
  textPrimary: palette.neutral[7],
  backgroundPrimary: palette.brandAlt.main,
  backgroundPrimaryHover: palette.brandAlt.dark,
  textSecondary: palette.neutral[7],
  backgroundSecondary: palette.neutral[93],
  backgroundSecondaryHover: palette.neutral[86],
  borderSecondary: palette.neutral[86],
};

const contributionsTheme = {
  button: buttonStyles,
  link: buttonStyles,
};

type Url = string;

type Props = {
  // Accept a function or a string;
  // A function will render a <Button>
  // A string will render a <LinkButton>
  // Both using the same interface
  onClickAction: Function | Url;
  children: React.ReactElement | string;
  priority?: 'primary' | 'secondary';
  showArrow?: boolean;
  isTertiary?: boolean;
};

// Overrides for tertiary button
// Unfortunatly they all need !important :(
const tertiaryButtonOverrides = css`
  border: 1px solid ${palette.neutral[7]} !important;
  background-color: transparent !important;

  :hover {
    background-color: ${palette.neutral[86]} !important;
  }
`;

export const Button: React.FC<Props> = (allProps: Props) => {
  const { onClickAction, children, showArrow = false, priority = 'primary', isTertiary, ...props } = allProps;

  if (typeof onClickAction === 'string') {
    // LinkButton doesn't support 'tertiary' priority (unlike Button)
    // So we'll map that to 'primary' and apply a CSS override on both of
    // them so they get the same styles for 'tertiary' priority
    return (
      <ThemeProvider theme={contributionsTheme}>
        <LinkButton
          href={onClickAction}
          showIcon={showArrow}
          target="_blank"
          rel="noopener noreferrer"
          priority={isTertiary ? 'primary' : priority}
          className={isTertiary ? tertiaryButtonOverrides : undefined}
          {...props}
        >
          {children}
        </LinkButton>
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider theme={contributionsTheme}>
      <DSButton
        iconSide="right"
        icon={showArrow ? <SvgArrowRightStraight /> : undefined}
        onClick={(): void => onClickAction()}
        priority={isTertiary ? 'primary' : priority}
        className={isTertiary ? tertiaryButtonOverrides : undefined}
        {...props}
      >
        {children}
      </DSButton>
    </ThemeProvider>
  );
};