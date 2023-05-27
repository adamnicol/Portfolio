FROM nginx
WORKDIR /app

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

COPY package*.json ./
RUN npm install

ARG API_URL
ENV VITE_API_URL=$API_URL

COPY . .
RUN npm run build

RUN rm -rf /usr/share/nginx/html/*
RUN cp -a build/. /usr/share/nginx/html