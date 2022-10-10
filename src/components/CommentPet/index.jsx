import classes from "./CommentPet.module.sass";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import TextareaRezise from "../TextAreaRezise";
import api from "../../helpers/axios";
import { getDateFormatted } from "../../helpers/dateFormat";

function CommentPet({ comment, setIsLoading, pet }) {
  // States
  const [text, setText] = useState(comment.message);
  const [onEdit, setOnEdit] = useState(false);

  // TODO: Get user Logged from store
  const userLogged = { userId: 2, role: "user" };

  const allowEdition = userLogged.userId === comment.userId || userLogged.role === "admin";

  const messageRef = useRef();

  // On Edit Event Hanlder
  const onEditHandler = () => {
    if (allowEdition) {
      setOnEdit(true);
      messageRef.current.focus();
    }
  };

  // Cancel Edition Handler
  const cancelHandler = () => {
    setOnEdit(false);
    setText(comment.message);
    messageRef.current.style.height = "inherit";
  };

  // Set On Change Hanlder
  const onChangeHandler = e => {
    setText(e.target.value);
  };

  // On Delete Handler
  const onDelete = async () => {
    try {
      const response = await api.delete(`/pets/comments/${comment.commentId}`);
      if (!response) {
        console.log("No answer");
        return;
      } else {
        console.log("Eliminado!");
        setOnEdit(false);
        setIsLoading(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Modify Text
  const submitHandler = async e => {
    e.preventDefault();
    try {
      const response = await api.put(`/pets/comments/${comment.commentId}`, {
        userId: userLogged.userId,
        message: text
      });
      if (!response) {
        console.log("No answer");
        return;
      } else {
        console.log("Modificado!");
      }
      setOnEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Format Date Manager
  return (
    <div className={classes.card}>
      <div className={classes.card_avatar}>
        {comment.avatar ? (
          <Link to={`/user/${comment.userId}`}>
            <img src={`/persons/${comment.avatar}`} alt={comment.fullName} />
          </Link>
        ) : (
          <Link to={`/user/${comment.userId}`}>
            <div></div>
          </Link>
        )}
      </div>
      <div className={classes.card_wrapper}>
        <div className={classes.card_header}>
          <div className={classes.card_header_user}>
            <span className={classes.card_header_user_name}>{comment.fullName}</span>
            <span>{getDateFormatted(comment.updatedDate)}</span>
          </div>
          {allowEdition ? (
            <div className={classes.card_header_buttons}>
              <FontAwesomeIcon icon={faPencil} onClick={onEditHandler} />
              <FontAwesomeIcon icon={faTrash} onClick={onDelete} />
            </div>
          ) : (
            <></>
          )}
        </div>
        <TextareaRezise
          className={classes.card_text}
          name="message"
          id={comment.commentId}
          innerRef={messageRef}
          rows="1"
          onChange={onChangeHandler}
          text={text}
          readOnly={!onEdit}
        />
        {onEdit ? (
          <div className={classes.card_header_onEditButtons}>
            <button className={classes.cancel} onClick={cancelHandler}>
              Cancelar
            </button>
            <button className={classes.submit} onClick={submitHandler}>
              Modificar
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default CommentPet;

CommentPet.propTypes = {
  comment: PropTypes.object.isRequired,
  setIsLoading: PropTypes.func,
  pet: PropTypes.number
};
