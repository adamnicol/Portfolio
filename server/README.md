# Server
This is the backend rest API for my online portfolio and blog.

## Features
- Written using Node/Express and Typescript.
- Uses the Prisma ORM with a PostgreSQL database.
- Requests are validated using Zod schemas.
- Authentication with JWT access and refresh tokens.
- Passwords are hashed using bcrypt.
- Activation emails using nodemailer and handlebars.
- Rate limiting for login and account creation.
- Documentation with Swagger and JSDoc.
- Error logging using Sentry.io.
- Deployed using Docker.

## Installation and usage
1) Clone the repository:
```
git clone https://github.com/adamnicol/Portfolio.git
```
2) Install dependencies:
```
cd server  
npm install
```
3) Create an .env file using the example template:
```
copy .env.example .env
```
4) Generate the Prisma client:
```
npx prisma generate
```
5) Start the server:
```
npm run start-dev
```

## Documentation
See documentation at: https://api.adamnicol.dev
