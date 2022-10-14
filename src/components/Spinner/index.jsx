import classes from "./Spinner.module.sass";
import PropTypes from "prop-types";

function Spinner({ className }) {
  return (
    <div className={`${classes.container} ${className}`}>
      <div className={classes.lds_ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Spinner;

Spinner.propTypes = {
  className: PropTypes.string
};
