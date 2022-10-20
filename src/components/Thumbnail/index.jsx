import classes from "./Thumbnail.module.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
// Content for preview images and a button to close the image.

export default function Thumbnail({ image, onClose }) {
  return (
    <div className={classes.preview}>
      <div className={classes.preview_container}>
        <img src={image} alt="imageLoaded" className={classes.preview_image} />
        <FontAwesomeIcon onClick={onClose} icon={faClose} className={classes.preview_btn_close} />
      </div>
    </div>
  );
}

Thumbnail.propTypes = {
  image: PropTypes.object,
  onClose: PropTypes.func
};
