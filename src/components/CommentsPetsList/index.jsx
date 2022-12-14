import classes from "./CommentsPetList.module.sass";
import CommentPet from "../CommentPet";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { apiPub, apiPrivate } from "../../helpers/axios";

function CommentsPetsList({ petId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState("");
  const [totalPages, setTotalPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [onEdit] = useState(false);

  const { userLogged } = useSelector(state => state.auth);
  // Get comments of pet
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getComments = async () => {
      try {
        const response = await apiPub.get(
          `/pets/${petId}/comments?pageNumber=${currentPage}&pageSize=5`,
          {
            signal: controller.signal
          }
        );
        if (isMounted) {
          // Stock data
          console.log(response.data);
          setComments(response.data.content);
          setTotalPages(() => {
            const pag = [];
            for (let i = 1; i <= response.data.totalPages; i++) {
              pag.push(i);
            }
            return pag;
          });
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

  // Cambiar pagina en paginacion
  const changeCurrentPage = e => {
    const page = e.target.getAttribute("data-page");
    if (currentPage !== page - 1) {
      setCurrentPage(page - 1);
      setIsLoading(true);
    }
  };
  // Handle Change of Message Input
  const handleCommentMessageChange = e => {
    setText(e.target.value);
  };

  // Handle form submit
  const submitHandler = async e => {
    e.preventDefault();
    try {
      const response = await apiPrivate.post(`/pets/${petId}/comments`, {
        message: text
      });
      if (!response) {
        console.log("No answer");
        return;
      } else {
        setText("");
        setCurrentPage(0);
        setIsLoading(true);
        console.log("publicado!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.comments}>
      {isLoading ? (
        <div> Loading... </div>
      ) : (
        <div className={classes.comments_list}>
          <h2>Comentarios</h2>
          {comments && comments.length !== 0 ? (
            comments.map(comment => {
              return (
                <CommentPet
                  key={comment.commentId}
                  comment={comment}
                  setIsLoading={setIsLoading}
                  pet={petId}
                />
              );
            })
          ) : (
            <div className={classes.comments_list_noComments}>
              No hay comentarios para esta mascota. S?? el primero en comentar!
            </div>
          )}
        </div>
      )}
      <div className={classes.comments_pagination}>
        {totalPages.length > 1 &&
          totalPages.map(pag => {
            return (
              <li
                key={`pag${pag}`}
                className={currentPage + 1 === pag ? classes.active : ""}
                data-page={pag}
                onClick={changeCurrentPage}>
                {pag}
              </li>
            );
          })}
      </div>
      <form className={classes.comments_form} onSubmit={submitHandler}>
        <h2>Deja tu comentario</h2>
        <input type="text" name="userId" defaultValue={!onEdit ? userLogged.userId : null} hidden />
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
