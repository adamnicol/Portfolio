import { ProgressBar } from "react-bootstrap";

export interface ISkill {
  name: string;
  rating: number;
}

export const skills: ISkill[] = [
  { name: "C#", rating: 90 },
  { name: "Winforms", rating: 90 },
  { name: "WPF", rating: 40 },
  { name: "DevExpress", rating: 70 },
  { name: "SQL", rating: 80 },
  { name: "HTML", rating: 90 },
  { name: "CSS", rating: 55 },
  { name: "Bootstrap", rating: 55 },
  { name: "React", rating: 65 },
  { name: "Typescript", rating: 65 },
  { name: "Node/Express", rating: 75 },
];

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
