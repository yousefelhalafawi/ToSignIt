import styles from "../_style/News.module.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

function Pagination({ currentPage, totalPages, paginate }: PaginationProps) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="News pagination">
      <ul className={styles.pagination}>
        <li className={styles.pageItem}>
          <a
            href="#"
            className={`${styles.pageLink} ${
              currentPage === 1 ? styles.disabled : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) paginate(currentPage - 1);
            }}
            aria-label="Previous page"
          >
            &laquo;
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className={styles.pageItem}>
            <a
              className={`${styles.pageLink} ${
                currentPage === number ? styles.active : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                paginate(number);
              }}
            >
              {number}
            </a>
          </li>
        ))}
        <li className={styles.pageItem}>
          <a
            href="#"
            className={`${styles.pageLink} ${
              currentPage === totalPages ? styles.disabled : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) paginate(currentPage + 1);
            }}
            aria-label="Next page"
          >
            &raquo;
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
