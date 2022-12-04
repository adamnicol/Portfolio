![](https://img.shields.io/github/license/adamnicol/portfolio) 
![](https://img.shields.io/github/last-commit/adamnicol/portfolio)
![](https://img.shields.io/github/languages/count/adamnicol/portfolio)
![](https://img.shields.io/github/languages/top/adamnicol/portfolio)

# Server
This is the backend API for my online portfolio and blog.

## Features
- Authentication with access and refresh tokens.
- User roles with Express.js middleware.
- Password hashing using bcrypt.
- Rate limiting for added security.
- Account activation using nodemailer and handlebars.
- Schema validation using Zod.
- Connects to a PostgreSQL database using the Prisma ORM.
- Documentation with Swagger and JSDoc.
- Fully type safe with Typescript.
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
