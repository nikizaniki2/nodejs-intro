import React from 'react';
import PropTypes from 'prop-types';

export function Button ({ title, onClick }) {
  return (
    <button onClick={onClick}>{title}</button>
  );
}

Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};
