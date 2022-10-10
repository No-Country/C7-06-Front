import Axios from "axios";

export default function useAxios() {
  const BASE_URL = "https://animatch-test.herokuapp.com";

  const axios = Axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" }
    // withCredentials: true
  });

  // API calls for comments.
  // Parametres:
  //   petId<number>
  //   method<string>("post, put, get, delete"),
  //   comment<object>
  //   opcions<onbject>

  const commentsAPIHandler = async (method, petId, comment, options) => {
    const commentId = comment?.id || "";

    switch (method) {
      case "delete":
        try {
          const response = await axios.delete(`/pets/comments/${commentId}`, options);
          const result = response.data;
          return result;
        } catch (err) {
          return err;
        }

      case "post":
        try {
          const response = await axios.post(
            `/pets/${petId}/comments`,
            { userId: comment.userId, message: comment.message },
            options
          );
          const result = response.data;
          return result;
        } catch (err) {
          return err;
        }

      case "put":
        try {
          const response = await axios.put(
            `/pets/comments/${comment.id}`,
            { userId: comment.userId, message: comment.message },
            options
          );
          const result = response.data;
          return result;
        } catch (err) {
          return err;
        }

      default:
        if (commentId) {
          try {
            const response = await axios.get(`/pets/comments/${commentId}`, options);
            const comment = response.data;
            return comment;
          } catch (err) {
            return err;
          }
        } else {
          try {
            const response = await axios.get(`/pets/${petId}/comments`, options);
            const comments = response.data;
            console.log("comentarios ", comments);
            return comments;
          } catch (err) {
            return err;
          }
        }
    }
  };

  return {
    commentsAPIHandler,
    axios
  };
}
