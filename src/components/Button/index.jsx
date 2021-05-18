import PropTypes from 'prop-types';

import './style.css';

export const Button = ({ text, onCLick, disabled }) => {
  return (
    <button className="button" onClick={onCLick} disabled={disabled}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onCLick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
