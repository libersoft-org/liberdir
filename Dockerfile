FROM node:18 as BUILD

WORKDIR /src
COPY . .

RUN npm install
RUN npm run-script build

FROM nginx:1.14.1-alpine

EXPOSE 8080

COPY --from=BUILD /src/build /app
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
CMD ["/bin/sh",  "-c",  "exec nginx -g 'daemon off;'"]


# TO Build
# docker build -t liberdir-ui:test -t mligor/liberdir-ui:latest .
# TO Build specific platform
# docker build -t liberdir-ui:test -t mligor/liberdir-ui:latest --platform linux/amd64 .

# TO Run
# docker run --rm -ti --name liberdir-ui-test -p8080:8080 liberdir-ui:test

# TO Push to dockerhub
# docker push mligor/liberdir-ui:latest
