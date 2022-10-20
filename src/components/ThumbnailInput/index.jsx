import classes from "./ThumbnailInput.module.sass";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { Thumbnail } from "../../components";

// Component to share and public text and one image.

export default function ThumbnailInput({ photo, setIsOpen }) {
  useEffect(() => {
    if (photo) {
      setUrlImageLoaded(photo);
    }
  }, [photo]);

  // Use State
  const [urlImageLoaded, setUrlImageLoaded] = useState(false); // if url exists will storage url file
  const [file, setFile] = useState(); // if file is charged it will storage the file to send
  const [isImageCharged, setIsImageCharged] = useState(""); // control input value image (for reset

  // Event Handler for Preview Image
  const loadImagePreviewHandler = e => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setUrlImageLoaded(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setFile(e.target.files[0]);
    } else {
      setUrlImageLoaded(false);
    }
  };

  // Event Handler for delete image preview and reset input
  const imageDeleteHandler = () => {
    setUrlImageLoaded(false);
    setFile(false);
    setIsImageCharged("");
  };

  // Event Handler for submit form
  const submitHandler = async event => {
    event.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
      return formData;
    } else {
      console.log("Veuillez ajouter une image ou du texte");
    }
  };

  return (
    <div className={classes.container}>
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <div className={classes.wrapper}>
          <div className={classes.shareHeader}>
            {urlImageLoaded ? (
              <Thumbnail image={urlImageLoaded} onClose={imageDeleteHandler} />
            ) : null}
          </div>
          <hr className={classes.separator} />

          <div className={classes.shareFooter}>
            <div className={classes.shareFooter_options}>
              <input
                onChange={loadImagePreviewHandler}
                accept="image/*"
                id="imagesFiles"
                name="image"
                type="file"
                style={{ display: "none" }}
                value={isImageCharged}
                multiple
              />

              <label className={classes.shareFooter_option} htmlFor="imagesFiles">
                <FontAwesomeIcon
                  icon={faCamera}
                  htmlColor="tomato"
                  className={classes.shareFooter_option_icon}
                />
                <span className={classes.shareFooter_option_text}>Ajouter Image</span>
              </label>
              <div className={classes.share_action}>
                {photo ? (
                  <div className={classes.share_btn_cancel}>
                    <span onClick={() => setIsOpen(false)}>Annuler</span>
                  </div>
                ) : null}
                <button type="submit" className={classes.share_btn}>
                  Publier
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
