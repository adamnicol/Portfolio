import { IProject } from "../../api/interfaces";

export const projects: IProject[] = [
  {
    name: "Portfolio",
    description:
      "A fully responsive website that serves as my online portfolio and blog. Written in React, Typescript, and Bootstrap with a rest API on the backend. Data is prefetched and cached using Axios and React-query. Currently deployed on Netlify.",
    image: "thumbnail.jpg",
    website: "https://www.adamnicol.dev",
    github: "https://github.com/adamnicol/Portfolio",
    complete: false,
    tags: [
      { id: 1, name: "react" },
      { id: 2, name: "typescript" },
      { id: 3, name: "bootstrap" },
    ],
  },
  {
    name: "NodeJS Rest API",
    description:
      "A Node/Express rest API written in Typescript that serves as the backend for my site. Featuring authentication using JWT tokens, schema validation using Zod, and connecting to a PostgreSQL database using the Prisma ORM. Currently deployed using Docker.",
    image: "nodejs.jpg",
    website: "https://api.adamnicol.dev",
    github: "https://github.com/adamnicol/Portfolio",
    complete: false,
    tags: [
      { id: 1, name: "node" },
      { id: 2, name: "express" },
      { id: 3, name: "typescript" },
      { id: 4, name: "prisma" },
      { id: 5, name: "postgres" },
    ],
  },
];
