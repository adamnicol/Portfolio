import BPagination from "react-bootstrap/pagination";

export default function Pagination(props: {
  className?: string;
  currentPage: number;
  totalPages: number;
  onPageChanged: (page: number) => void;
}) {
  const { className, currentPage, totalPages, onPageChanged } = props;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const items: JSX.Element[] = [];

  for (let page = 1; page <= totalPages; page++) {
    items.push(
      <BPagination.Item
        key={page}
        active={page === currentPage}
        onClick={() => onPageChanged(page)}
      >
        {page}
      </BPagination.Item>
    );
  }

  return (
    <BPagination className={className}>
      <BPagination.Prev
        disabled={isFirstPage}
        onClick={() => onPageChanged(currentPage - 1)}
      >
        Prev
      </BPagination.Prev>

      {items}

      <BPagination.Next
        disabled={isLastPage}
        onClick={() => onPageChanged(currentPage + 1)}
      >
        Next
      </BPagination.Next>
    </BPagination>
  );
}
