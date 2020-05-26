import React from 'react';
import { css, cx } from 'emotion';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@material-ui/icons';

type Variant = string;
type Section = string;

interface Test {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  variants: Variant[];
  sections: Section[];
}

type Props = {
  tests: Test[];
  slot: any;
};

const rootStyles = css`
  flex-grow: 1;
`;

const paperStyles = css`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 20px;
  padding: 12px;
`;

const testLinkStyles = css`
  color: inherit;
  display: block;
  text-decoration: none;
`;

const testInfoStyles = css`
  margin-top: 0;
`;

const testHeaderStyles = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ListTests = ({ tests, slot }: Props): JSX.Element => (
  <Grid container className={cx(rootStyles)} spacing={2}>
    <Grid item xs={12}>
      {tests.map((test: Test) => (
        <Card className={cx(paperStyles)}>
          <div className={testHeaderStyles}>
            <div>
              <Typography component="p" variant="h6">
                <Link to={`/slots/${slot.id}/tests/${test.id}`} className={testLinkStyles}>
                  {test.name}
                </Link>
              </Typography>
            </div>
            {test.enabled ? <Visibility /> : <VisibilityOff />}
          </div>

          <p className={testInfoStyles}>{test.description}</p>
          <p className={testInfoStyles}>{test.variants.length} variants</p>
        </Card>
      ))}
    </Grid>
  </Grid>
);
