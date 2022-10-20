import classes from "./ThumbnailInput.module.sass";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { Thumbnail } from "..";
import { apiPrivate } from "../../helpers/axios";

// Component to share and public text and one image.

export default function ThumbnailInput({ id, pictures, setPictures }) {
  const previewref = useRef();
  const imageRef = useRef();

  // Use State
  const [files, setFiles] = useState([]);

  function readAndPreview(file) {
    if (/\.(jpe?g|png|webp)$/i.test(file.name)) {
      const reader = new FileReader();

      reader.addEventListener(
        "load",
        function () {
          setFiles(prev => [...prev, this.result]);
        },
        false
      );

      reader.readAsDataURL(file);
    }
  }

  function handleMultipe(e) {
    const files = e.target.files;
    const fileList = [];
    if (files) {
      fileList.forEach.call(files, readAndPreview);
    }
    console.log(fileList);
  }

  const resetForm = () => {
    imageRef.current.value = "";
    setFiles([]);
  };
  // Event Handler for delete image preview and reset input
  // const imageDeleteHandler = () => {
  //   setUrlImageLoaded(false);
  //   setFile(false);
  //   setIsImageCharged("");
  // };

  // Event Handler for submit form
  const submitHandler = async e => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < e.target.image.files.length; i++) {
      formData.append(`picture${i + 1}`, e.target.image.files[i]);
    }
    try {
      const result = await apiPrivate.post(`/pets/${id}/pictures`, formData);
      imageRef.current.value = "";
      console.log(result.data);
      setPictures([...pictures, ...result.data]);
      setFiles([]);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <form id="filesForm" onSubmit={submitHandler} encType="multipart/form-data">
        <div className={classes.wrapper}>
          <div className={classes.shareHeader}>
            <div className={classes.previewer} ref={previewref}>
              {files && files.map((image, key) => <Thumbnail key={`prev${key}`} image={image} />)}
            </div>
          </div>
          <hr className={classes.separator} />

          <div className={classes.shareFooter}>
            <div className={classes.shareFooter_options}>
              <input
                ref={imageRef}
                onChange={handleMultipe}
                accept="image/*"
                id="imagesFiles"
                name="image"
                type="file"
                style={{ display: "none" }}
                multiple
              />

              <label className={classes.shareFooter_option} htmlFor="imagesFiles">
                <FontAwesomeIcon icon={faCamera} className={classes.shareFooter_option_icon} />
                <span className={classes.shareFooter_option_text}>Seleccionar la Imagen</span>
              </label>
              <div className={classes.share_action}>
                {pictures ? (
                  <div className={classes.share_btn_cancel}>
                    <span onClick={resetForm}>Cancelar</span>
                  </div>
                ) : null}
                <button type="submit" className={classes.share_btn}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
