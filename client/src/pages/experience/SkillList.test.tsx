import { render, screen } from "@testing-library/react";
import { SkillList, skills } from "./SkillList";

describe("SkillList", () => {
  beforeEach(() => {
    render(<SkillList />);
  });

  test("Heading is shown", () => {
    const heading = screen.queryByRole("heading", { name: "Skills" });
    expect(heading).toBeInTheDocument();
  });

  test("Each skill is shown", () => {
    skills.forEach((skill) => {
      const skillName = screen.queryByText(skill.name);
      expect(skillName).toBeInTheDocument();
    });
  });
});
