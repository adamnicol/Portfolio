import config from "../utils/config";
import db from "../database";
import { Role } from "@prisma/client";

async function seed() {
  const user = await db.user.upsert({
    where: { email: config.server.contactEmail },
    update: {},
    create: {
      email: config.server.contactEmail,
      username: "Adam",
      password: "",
      role: Role.Admin,
      createdAt: new Date("2022-10-14 22:19:35"),
      active: true,
    },
  });

  const posts = [
    {
      title: "New Website",
      slug: "new-website",
      author_id: user.id,
      createdAt: new Date("2022-10-14 22:19:35"),
      content:
        "My new website is finally live, though it’s still a work in progress so you may see the odd “lorem ipsum” here and there. I've been meaning to learn a modern front end framework for a long time. Everything has changed since my PHP days over a decade ago, it almost feels like starting over again. I think React was a great choice for the front end. I like being able to split things up into components, the modular nature fits well with my development style. Some of my choices may have been a little overkill for a simple site like this but I had a lot of fun making it and learnt a great deal. Please leave a comment and let me know what you think.",
      tags: {
        connectOrCreate: [
          {
            where: { name: "website" },
            create: { name: "website" },
          },
          {
            where: { name: "react" },
            create: { name: "react" },
          },
        ],
      },
    },
  ];

  for (const post of posts) {
    await db.post.upsert({
      where: { slug: post.slug },
      update: { ...post },
      create: { ...post },
    });
  }
}

seed();
