import { useSearchParams } from "react-router-dom";

export function usePagination(resultsPerPage: number) {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const limit = resultsPerPage;
  const offset = (page - 1) * resultsPerPage;
  const filter = { limit, offset };

  return { page, limit, offset, filter };
}
