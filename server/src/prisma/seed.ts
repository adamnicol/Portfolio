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
        "My new website is finally live, though it’s still a work in progress so it's not in its final form yet. I've been meaning to learn a modern front end framework for a long time. Everything has changed since my PHP days over a decade ago, it almost feels like starting over again. I think React was a great choice for the front end. I like being able to split things up into components and the modular nature fits well with my development style. Front end design is something I always struggle with but I'm fairly happy with how it turned out. Some of my development choices may have been a little overkill for a simple site like this but I had a lot of fun making it and learnt a great deal. Please leave a comment below and let me know what you think.",
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
    {
      title: "Why I changed to Postgres",
      slug: "why-i-changed-to-postgres",
      author_id: user.id,
      createdAt: new Date("2022-11-10 20:30:14"),
      content:
        "This site uses a PostgreSQL database but that’s not how it started out. Originally my plan was to use MongoDB and the MERN stack. After 15 years working with relational databases I wanted to try something new and NoSQL was just what I was looking for. I'd read that relational data could be stored together, avoiding the need for joins across multiple tables. “Data that is queried together should be stored together” they said. Unfortunately I soon learnt that this was an over-simplification. I needed to return news without comments, tags without posts, and aggregation pipelines were becoming a headache. Eventually I made the decision to split up the data into separate collections which is when it occurred to me ....my data is relational. Don’t get me wrong, I can absolutely see the benefit of NoSQL databases and there are many cases where they are a good choice. I realise now it was the wrong choice for my site and I'm much happier having changed to Postgres.",
      tags: {
        connectOrCreate: [
          {
            where: { name: "website" },
            create: { name: "website" },
          },
          {
            where: { name: "database" },
            create: { name: "database" },
          },
        ],
      },
    },
    {
      title: "Future plans for the site",
      slug: "future-plans-for-the-site",
      author_id: user.id,
      createdAt: new Date("2022-12-19 14:39:41"),
      content:
        "I haven't had much time to work on the site lately as I’ve been busy redecorating my bathroom amongst other things. I plan to work on it some more in the near future, in particular I would like to make some improvements around the login and sign-up forms. I plan to add client side validation by implementing a library such as Formik or React-hook-form, and add more options such as password resets. I would also like to look into what’s involved in logging in using 3rd party sites (e.g. Github).",
      tags: {
        connectOrCreate: [
          {
            where: { name: "website" },
            create: { name: "website" },
          },
        ],
      },
    },
  ];

  for (const post of posts) {
    await db.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
}

seed();
