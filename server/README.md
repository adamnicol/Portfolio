# Server
A Node.js backend API for my online portfolio and blog.

## Features
- Written using Typescript and Express.
- Uses the Prisma ORM with a PostgreSQL database.
- Schema validation using Zod.
- Authentication using JWT access and refresh tokens.
- Password hashing using bcrypt.
- Rate limiting for login and account creation.
- Activation emails using nodemailer and handlebars.
- Documentation with Swagger and JSDoc.
- Deployed using a Dockerfile.

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
