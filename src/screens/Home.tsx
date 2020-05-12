import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <ul>
        <li>
          <Link to="/example">Example Page</Link>
        </li>
      </ul>
    </div>
  );
};
