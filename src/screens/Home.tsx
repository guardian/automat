import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Automat UI | Home</title>
      </Helmet>
      <h2>Home</h2>
      <ul>
        <li>
          <Link to="/example">Example Page</Link>
        </li>
      </ul>
    </div>
  );
};
