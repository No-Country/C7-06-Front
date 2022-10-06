import classes from "./PetCategoryBanner.module.sass";
import cat from "../../assets/cat.jpg";
import dog from "../../assets/dog.jpg";
import PropTypes from "prop-types";

function PetCategoryBanner({ category }) {
  console.log(category);

  return (
    <div className={classes.container}>
      <img
        src={category === "cat" ? cat : dog}
        alt={category === "cat" ? "Gatos" : "Perros"}
        className={classes.img}
      />
      <p>{category === "cat" ? "Gatos" : "Perros"}</p>
    </div>
  );
}

export default PetCategoryBanner;

PetCategoryBanner.propTypes = {
  category: PropTypes.string
};
