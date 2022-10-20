import { PetForm } from "../components";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const PetFormPage = () => {
  const params = useParams();
  const petId = parseInt(params.id);

  return <>{petId ? <PetForm petId={petId} /> : <PetForm />}</>;
};
export default PetFormPage;

PetFormPage.propTypes = {
  petId: PropTypes.number
};
