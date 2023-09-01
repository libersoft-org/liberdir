FROM node:18.17.1-bullseye

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8088

CMD [ "node", "index.js" ]


# TO Build
# docker build -t liberdir-proxy:test -t mligor/liberdir-proxy:latest .
# TO Build specific platform
# docker build -t liberdir-proxy:test -t mligor/liberdir-proxy:latest --platform linux/amd64 .

# TO Run
# docker run --rm -ti --name liberdir-proxy-test -p8088:8088  liberdir-proxy:test

# TO Push to dockerhub
# docker push mligor/liberdir-proxy:latest
