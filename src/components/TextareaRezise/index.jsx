import PropTypes from "prop-types";
import { useEffect } from "react";

// Textarea elements that change height when inserting data.

function TextAreaRezise({ placeHolder, text, onChange, name, className, innerRef, readOnly }) {
  /**
   * @EventHandler
   * @name textAreaReziser
   * @description Change the size of the textarea.
   * @param {EventListenerObject} e
   */
  function textAreaReziser(e) {
    if (e.target.readOnly) {
      return;
    }
    e.target.style.height = "inherit";
    const newHeight = e.target.scrollHeight + 10;
    e.target.style.height = `${newHeight}px`;
    if (e.target.value.length === 0) {
      e.target.style.height = "inherit";
    }
  }
  // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`

  useEffect(() => {
    innerRef.current.style.height = `${innerRef.current.scrollHeight}px`;
  }, []);
  return (
    <textarea
      name={name}
      ref={innerRef}
      rows="1"
      onChange={onChange}
      onKeyDown={textAreaReziser}
      placeholder={placeHolder}
      className={className}
      value={text || ""}
      readOnly={readOnly}
    />
  );
}

TextAreaRezise.propTypes = {
  placeHolder: PropTypes.string,
  id: PropTypes.number,
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  name: PropTypes.string,
  className: PropTypes.string,
  innerRef: PropTypes.object,
  readOnly: PropTypes.bool
};

export default TextAreaRezise;
