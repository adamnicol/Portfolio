import { IProject } from "../../api/interfaces";

const projects: IProject[] = [
  {
    name: "Portfolio",
    description:
      "A fully responsive website that serves as my online portfolio and blog. Written in React/Typescript with a rest API on the backend. Currently deployed on Netlify.",
    website: "https://www.adamnicol.dev",
    github: "https://github.com/adamnicol/Portfolio",
    tags: [
      { id: 1, name: "react" },
      { id: 2, name: "typescript" },
      { id: 3, name: "bootstrap" },
    ],
  },
  {
    name: "NodeJS Rest API",
    description:
      "A rest API written in Node/Express and Typescript that serves as the backend for my site. Featuring authentication using JWT tokens, schema validation using Zod, and connecting to a PostgreSQL database using the Prisma ORM.",
    website: "https://api.adamnicol.dev",
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
