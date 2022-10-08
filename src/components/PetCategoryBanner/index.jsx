import classes from "./PetCategoryBanner.module.sass";
import PropTypes from "prop-types";

function PetCategoryBanner({ className, text, image }) {
  return (
    <div className={`${classes.container} ${className}`}>
      <img src={image} alt={text} className={classes.img} />
      <p>{text}</p>
    </div>
  );
}

export default PetCategoryBanner;

PetCategoryBanner.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string
};
