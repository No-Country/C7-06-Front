import classes from "./CommentsPetList.module.sass";
import CommentPet from "../CommentPet";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../helpers/axios";

function CommentsPetsList({ petId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState("");
  const [onEdit, setOnEdit] = useState(false);
  const userLogged = { userId: 1 };

  // Get comments of pet
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getComments = async () => {
      try {
        const response = await api.get(`/pets/${petId}/comments`, { signal: controller.signal });

        if (isMounted) {
          // Stock data
          setComments(response.data.content);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getComments();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [isLoading]);

  // Handle Change of Message Input
  const handleCommentMessageChange = e => {
    setText(e.target.value);
  };

  // Handle for erase comment

  // Handle for modifying comment

  // Handle form submit
  const submitHandler = e => {
    e.preventDefault();
    console.log(e.target.userId.value);
    console.log(text);
  };

  return (
    <div className={classes.comments}>
      {isLoading ? (
        <div> Loading... </div>
      ) : (
        <div className={classes.comments_list}>
          <h2>Commentarios</h2>
          {comments && comments.length !== 0 ? (
            comments.map(comment => {
              return <CommentPet key={comment.commentId} comment={comment} setOnEdit={setOnEdit} />;
            })
          ) : (
            <div className={classes.comments_list_noComments}>
              No hay comentarios para esta mascota. Sé el primero en comentar!
            </div>
          )}
        </div>
      )}

      <form className={classes.comments_form} onSubmit={submitHandler}>
        <h2>Deja tu comentario</h2>
        <input type="text" name="userId" value={onEdit ? userLogged.userId : null} hidden />
        <textarea
          className={classes.comments_form_commentInput}
          name="message"
          placeholder="Escribe aqui..."
          onChange={handleCommentMessageChange}
          value={text || ""}
        />
        <button className={classes.comments_form_button} type="submit">
          Comentar
        </button>
      </form>
    </div>
  );
}

export default CommentsPetsList;

CommentsPetsList.propTypes = {
  petId: PropTypes.number.isRequired
};
