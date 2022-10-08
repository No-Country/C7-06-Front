import classes from "./CommentPet.module.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function CommentPet({ comment }) {
  return (
    <div className={classes.card}>
      <div className={classes.card_avatar}>
        {comment.avatar ? (
          <img src={`/persons/${comment.avatar}`} alt={comment.fullName} />
        ) : (
          <div></div>
        )}
      </div>
      <div className="classes.card_wrapper">
        <div className={classes.card_header}>
          <div className={classes.card_header_user}>
            <span className={classes.card_header_user_name}>{comment.fullName}</span>·
            <span>{comment.updatedDate}</span>
          </div>
          <div className={classes.card_header_buttons}>
            <FontAwesomeIcon icon={faPencil} />
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
        <div className={classes.card_text}>{comment.message}</div>
      </div>
    </div>
  );
}

export default CommentPet;

CommentPet.propTypes = {
  comment: PropTypes.object.isRequired
};
