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
      password: "$2b$10$GAVS0QN4KZx.mWRN8ToMZ.TGh7satSFdqQGL8JSsRoSP8fw005cfS",
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
      tags: ["website", "react"],
      image: "react_quhagb",
      content:
        "My new website is now live, though it’s still a work in progress so it's not in its final form yet. I've been meaning to learn a modern front end framework for a long time. Everything has changed since my PHP days over a decade ago, it almost feels like starting over again. I think React was a great choice for the front end. I like being able to split things up into components and the modular nature fits well with my development style. Front end design is something I always struggle with but I'm fairly happy with how it turned out. Some of my development choices may have been a little overkill for a simple site like this but I had a lot of fun making it and learnt a great deal. Please leave a comment below and let me know what you think.",
      comments: [
        {
          user_id: user.id,
          createdAt: new Date("2022-10-14 23:17:00"),
          content:
            "Just testing the comments section. Please leave a comment !!",
        },
      ],
    },
    {
      title: "Database changed to Postgres",
      slug: "database-changed-to-postgres",
      author_id: user.id,
      createdAt: new Date("2022-11-10 20:30:14"),
      tags: ["website", "database"],
      image: "postgres_smrnub",
      content:
        "This site now uses a Postgres database but that’s not how it started out. Originally the plan was to use MongoDB and the MERN stack. After 15 years working with relational databases I wanted to try something new and NoSQL was just what I was looking for. I'd read that relational data could be stored together, avoiding the need for joins across multiple tables. *Data that is queried together should be stored together* they said. Unfortunately I soon learnt that this was an over simplification. I needed to return news without comments, tags without posts, and aggregation pipelines were becoming a headache. Eventually I decided to split up the data into separate collections but that came with problems of its own. That's when I made the decision to move to Postgres and I haven't looked back since. Don’t get me wrong, I can absolutely see the benefit of NoSQL databases. There are many cases where they are a good choice, but I think it was the wrong approach for this site.",
      comments: [],
    },
    {
      title: "Future plans for the site",
      slug: "future-plans-for-the-site",
      author_id: user.id,
      createdAt: new Date("2022-12-19 14:39:41"),
      tags: ["website"],
      image: "react_quhagb",
      content:
        "I haven't had much time to work on the site as I’ve been busy lately. I plan to work on it some more in the near future, in particular I would like to make some improvements around the login and registration forms. I plan to add client side validation by implementing a library such as Formik or React-hook-form, and add more options such as password resets. I would also like to look into logging in using 3rd party sites.",
      comments: [
        {
          user_id: user.id,
          createdAt: new Date("2022-12-21 15:56:00"),
          content:
            "Form validation has now been implemented using React-hook-form and Zod schemas. After some research react-hook-form had the best performance and the best typescript support.",
        },
      ],
    },
    {
      title: "Error logging with Sentry",
      slug: "error-logging-with-sentry",
      author_id: user.id,
      createdAt: new Date("2023-01-15 17:36:01"),
      tags: ["website", "features"],
      image: "sentry_nfbyab",
      content:
        "Sentry is now being used for error logging on both the front and backend. They have a very generous free tier which is more than enough for this site. It was easy enough to set up, although I ran into a problem with my ad blocker stopping the reports from being uploaded to Sentry. After reading the documentation I found that I could get around this by tunnelling requests via the backend and now it’s working well.",
      comments: [
        {
          user_id: user.id,
          createdAt: new Date("2023-01-15 17:45:21"),
          content:
            "I might enable the tracing features at some point. I don't want to slow the site down too much by sending a lot of extra data, and turning down the sample rate seemed to affect the error logging as well.",
        },
        {
          user_id: user.id,
          createdAt: new Date("2023-02-12 09:48:02"),
          content:
            "For more information about Sentry see [www.sentry.io](https://sentry.io)",
        },
      ],
    },
    {
      title: "Images moved to Cloudinary",
      slug: "images-moved-to-cloudinary",
      author_id: user.id,
      createdAt: new Date("2023-02-07 09:45:07"),
      tags: ["website", "features"],
      image: "cloudinary_qjp7ry",
      content:
        "The majority of the website's images have now been moved to Cloudinary, a cloud-based image hosting platform and content delivery network. By utilizing Cloudinary's compression and optimization capabilities, this should improve the website's performance and page load times. This change will also make it easier to manage images and scale as the website grows. This was a necessary step to support future features I have planned.",
      comments: [
        {
          user_id: user.id,
          createdAt: new Date("2023-02-07 10:05:44"),
          content:
            "I’m a little concerned about the number of services I’m using for the backend now. I was trying to save money on hosting fees but if it starts to become difficult to manage then I will consider moving to an all-in-one solution such as AWS.",
        },
        {
          user_id: user.id,
          createdAt: new Date("2023-02-12 09:48:02"),
          content:
            "For more information about Cloudinary see [www.cloudinary.com](https://cloudinary.com)",
        },
      ],
    },
    {
      title: "Unit test coverage",
      slug: "unit-test-coverage",
      author_id: user.id,
      createdAt: new Date("2023-02-10 15:16:04"),
      tags: ["testing"],
      image: "codecov_jygsu9",
      content:
        "I've recently implemented Codecov to help me track the code coverage for my unit tests. This tool allows me to see how much of my code is being tested. To integrate Codecov into my development workflow I've set up a CI pipeline using Github actions. Whenever I push my code to Github, the pipeline runs my unit tests and uploads the coverage report to Codecov. Right now my code coverage is at 12% so there's still a lot of room for improvement, but I plan to work on this in the future. For the unit tests themselves I use a combination of Jest and the React testing framework which so far has been working well.",
      comments: [
        {
          user_id: user.id,
          createdAt: new Date("2023-02-10 16:25:59"),
          content:
            "For more information about Codedov see [www.codecov.io](https://codecov.io)",
        },
      ],
    },
  ];

  for (const post of posts) {
    const data = {
      ...post,
      tags: {
        connectOrCreate: post.tags.map((tag) => {
          return {
            where: { name: tag },
            create: { name: tag },
          };
        }),
      },
    };

    await db.post.upsert({
      where: { slug: post.slug },
      update: { ...data, comments: undefined },
      create: {
        ...data,
        comments: {
          createMany: { data: post.comments },
        },
      },
    });
  }
}

seed();
