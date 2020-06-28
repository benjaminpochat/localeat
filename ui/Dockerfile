# STEP 1 build static website
FROM node:14.4-alpine as builder
RUN apk update
WORKDIR /app
COPY . .
RUN cd /app && npm set progress=false && npm install
RUN npm run build -- --configuration production

# STEP 2 build a small nginx image with static website
FROM httpd:2.4.41-alpine
RUN rm /usr/local/apache2/htdocs/index.html
COPY --from=builder /app/dist/ui /usr/local/apache2/htdocs/
