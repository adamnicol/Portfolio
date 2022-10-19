import { IProject } from "../../api/interfaces";

const projects: IProject[] = [
  {
    name: "Portfolio",
    description:
      "You're looking at it. A fully responsive website that serves as my online portfolio " +
      "and blog. Written in React/Typescript and connecting to a rest API for the backend. " +
      "Currently deployed on Netlify.",
    website: "https://www.adamnicol.com",
    github: "https://github.com/adamnicol/Portfolio",
    tags: [
      { id: 1, name: "react" },
      { id: 2, name: "bootstrap" },
      { id: 3, name: "typescript" },
    ],
  },
  {
    name: "NodeJS Rest API",
    description:
      "A rest API written in Node/Express and Typescript that serves as the backend for my portfolio. " +
      "Featuring authentication using JWT tokens, schema validation using Zod, and the Prisma ORM " +
      "connected to a PostgreSQL database.",
    website: "https://adamnicol.com/api",
    github: "https://github.com/adamnicol/Portfolio",
    tags: [
      { id: 1, name: "node" },
      { id: 2, name: "express" },
      { id: 3, name: "typescript" },
      { id: 4, name: "prisma" },
      { id: 5, name: "postgres" },
    ],
  },
];

export default projects;
