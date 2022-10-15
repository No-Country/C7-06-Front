import classes from "./PetBanner.module.sass";
import PropTypes from "prop-types";

function PetBanner({ className, text, images }) {
  return (
    <div className={`${classes.container} ${className}`}>
      <img
        srcSet={`${images.mobile.src} ${images.mobile.size}w, ${images.desktop.src} ${images.desktop.size}w`}
        src={images.mobile.src}
        sizes="(min-width: 1440px) 1440px, (min-width: 992px) 992px, (min-width: 768px) 768px, 390px"
        alt={text}
        className={classes.img}
      />
      <p>{text}</p>
    </div>
  );
}

export default PetBanner;

PetBanner.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  images: PropTypes.object
};
