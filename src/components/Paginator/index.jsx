import styles from "./Paginator.module.sass";
import PropTypes from "prop-types";

const Paginator = ({ children, pageNumber, totalPages, loadDataFromPage }) => {
  const handleClickPage = e => {
    loadDataFromPage(e.target.value);
  };

  return (
    <div>
      <div>{children}</div>
      <ul className={styles.pages}>
        {Array.from(Array(totalPages), (e, i) => {
          return (
            totalPages !== 0 && (
              <li
                className={i === pageNumber ? `${styles.page} ${styles.pageSelected}` : styles.page}
                key={i}
                onClick={handleClickPage}
                value={i}>
                {i}
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
};

Paginator.propTypes = {
  children: PropTypes.node.isRequired,
  pageNumber: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  loadDataFromPage: PropTypes.func.isRequired
};

export default Paginator;
