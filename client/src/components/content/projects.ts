import { IProject } from "../../api/interfaces";

const projects: IProject[] = [
  {
    name: "Portfolio",
    description:
      "You're looking at it. A fully responsive website written in React and typescript, " +
      "connecting to a rest API for the backend. Currently deployed on Netlify.",
    website: "https://www.adamnicol.com",
    github: "https://github.com/adamnicol/Portfolio",
    tags: [
      { id: 1, name: "react" },
      { id: 2, name: "bootstrap" },
      { id: 3, name: "typescript" },
    ],
  },
  {
    name: "Rest API",
    description:
      "A rest API written in Node/Express.js and typescript. Featuring authentication " +
      "using JWT tokens, and connecting to a PostgresSQL database using the Prisma ORM.",
    website: "https://adamnicol.com/api",
    github: "https://github.com/adamnicol/Portfolio",
    tags: [
      { id: 1, name: "express.js" },
      { id: 2, name: "typescript" },
      { id: 3, name: "prisma" },
      { id: 4, name: "postgres" },
    ],
  },
];

export default projects;
