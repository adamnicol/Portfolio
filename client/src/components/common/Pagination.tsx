import BSPagination from "react-bootstrap/pagination";
import { useSearchParams } from "react-router-dom";

export type PaginationProps = {
  className?: string;
  currentPage: number;
  totalPages: number;
  onPageChanged: (page: number) => void;
};

function Pagination(props: PaginationProps) {
  const { className, currentPage, totalPages } = props;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const items: JSX.Element[] = [];

  const [searchParams, setSearchParams] = useSearchParams();

  function handlePageChanged(page: number) {
    if (page != currentPage) {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      setSearchParams(params);
      props.onPageChanged(page);
    }
  }

  for (let page = 1; page <= totalPages; page++) {
    items.push(
      <BSPagination.Item
        key={page}
        active={page === currentPage}
        onClick={() => handlePageChanged(page)}
      >
        {page}
      </BSPagination.Item>
    );
  }

  return (
    <BSPagination className={className}>
      <BSPagination.Prev
        disabled={isFirstPage}
        onClick={() => handlePageChanged(currentPage - 1)}
      >
        Prev
      </BSPagination.Prev>

      {items}

      <BSPagination.Next
        disabled={isLastPage}
        onClick={() => handlePageChanged(currentPage + 1)}
      >
        Next
      </BSPagination.Next>
    </BSPagination>
  );
}

export default Pagination;
