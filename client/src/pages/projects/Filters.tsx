import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, InputGroup } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

export function ProjectFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = decodeURIComponent(searchParams.get("search") ?? "");
  const stage = decodeURIComponent(searchParams.get("stage") ?? "all");

  function clearSearch() {
    searchParams.delete("search");
    setSearchParams(searchParams);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = encodeURIComponent(e.target.value);
    searchParams.set(e.target.name, value);
    setSearchParams(searchParams);
  }

  return (
    <>
      <h2>Filter</h2>
      <InputGroup>
        <Form.Control
          size="sm"
          name="search"
          placeholder="Search"
          maxLength={50}
          value={search}
          onChange={handleSearch}
        />
        <InputGroup.Text
          role="button"
          className="input-button"
          title={search ? "Clear Search" : "Search"}
          onClick={clearSearch}
        >
          <FontAwesomeIcon icon={search ? faCircleXmark : faSearch} />
        </InputGroup.Text>
      </InputGroup>

      <div className="form-check mt-3">
        <input
          type="radio"
          name="stage"
          value="all"
          id="stageAll"
          className="form-check-input"
          checked={stage === "all"}
          onChange={handleSearch}
        />
        <label className="form-check-label" htmlFor="stageAll">
          Show all
        </label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          name="stage"
          value="development"
          id="stageDevelopment"
          className="form-check-input"
          checked={stage === "development"}
          onChange={handleSearch}
        />
        <label className="form-check-label" htmlFor="stageDevelopment">
          In development
        </label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          name="stage"
          value="complete"
          id="stageComplete"
          className="form-check-input"
          checked={stage === "complete"}
          onChange={handleSearch}
        />
        <label className="form-check-label" htmlFor="stageComplete">
          Complete
        </label>
      </div>
    </>
  );
}

export default ProjectFilters;
