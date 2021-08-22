import React from "react";
import PropTypes from "prop-types";

const buttonCom = ({ id, value, classname, type, onSubmit }) => {
  return (
    <button type={type} className={classname} id={id} onClick={onSubmit}>
      {value}
    </button>
  );
};

buttonCom.prototype = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  classname: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
};

export default buttonCom;
