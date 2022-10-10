import classes from "./PetBanner.module.sass";
import PropTypes from "prop-types";

function PetBanner({ className, text, image }) {
  return (
    <div className={`${classes.container} ${className}`}>
      <img src={image} alt={text} className={classes.img} />
      <p>{text}</p>
    </div>
  );
}

export default PetBanner;

PetBanner.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string
};
