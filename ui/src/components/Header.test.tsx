/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Header', () => {
  it('should render the Automat logo', () => {
    render(
      <Router>
        <Header />
      </Router>,
    );

    expect(screen.getByAltText('Automat logo')).toBeInTheDocument();
  });
});
