import { Form } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

function ProjectFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      params.set("search", encodeURIComponent(e.target.value.trim()));
    } else {
      params.delete("search");
    }
    setSearchParams(params);
  }

  return (
    <>
      <h2>Filter</h2>
      <Form.Control
        size="sm"
        placeholder="Search"
        value={decodeURIComponent(searchParams.get("search") ?? "")}
        onChange={handleSearch}
        maxLength={50}
      />
    </>
  );
}

export default ProjectFilters;
