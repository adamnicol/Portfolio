import { Form } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

function ProjectFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = decodeURIComponent(searchParams.get("search") ?? "");

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams();
    params.set("search", encodeURIComponent(e.target.value));
    setSearchParams(params);
  }

  return (
    <>
      <h2>Filter</h2>
      <Form.Control
        size="sm"
        placeholder="Search"
        value={search}
        onChange={handleSearch}
        maxLength={50}
      />
    </>
  );
}

export default ProjectFilters;
