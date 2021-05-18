import PropTypes from 'prop-types';

import './style.css';

export const Input = ({ valueInput, handleChange }) => {
  return (
    <input
      className="textInput"
      onChange={handleChange}
      value={valueInput}
      type="search"
      placeholder="Type your search"
    />
  );
};

Input.propTypes = {
  valueInput: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
