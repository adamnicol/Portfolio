import { ProgressBar } from "react-bootstrap";
import { skills } from "./SkillList.content";

export function SkillList() {
  return (
    <>
      <h2>Skills</h2>
      <ul className="list-unstyled">
        {skills.map((skill, index) => (
          <li key={index} className="skillList">
            <div className="fw-bold">{skill.name}</div>
            <ProgressBar now={skill.rating} striped />
          </li>
        ))}
      </ul>
    </>
  );
}
