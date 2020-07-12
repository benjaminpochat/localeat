# STEP 1 build static website
FROM node:14.4-alpine as node
RUN apk update
WORKDIR /app
COPY ./ui .
RUN cd /app && npm set progress=false && npm install
RUN npm run build -- --configuration production

# STEP 2 build a small apache image with static website
FROM httpd:2.4.41-alpine
RUN rm /usr/local/apache2/htdocs/index.html
COPY ./ui/localeat-httpd.conf /usr/local/apache2/conf/httpd.conf
COPY --from=node /app/dist/ui /usr/local/apache2/htdocs/
