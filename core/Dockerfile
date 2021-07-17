# Must be used with localeat root folder as docker context.
# For instance : docker build ~/localeat -f ~/localeat/core/Dockerfile

FROM maven:3.6.3-openjdk-14-slim

RUN apt-get update
RUN apt-get install wait-for-it

RUN chmod -R a+rwx /usr/share/maven
RUN useradd --create-home localeat
WORKDIR /home/localeat

COPY ./core ./core

RUN mvn clean install -s /usr/share/maven/ref/settings-docker.xml -f ./core/pom.xml
RUN mvn exec:java -s /usr/share/maven/ref/settings-docker.xml -f ./core/pom.xml -Dexec.skip=true

USER localeat

# Wait for Postgre database (localhost:5432)
# and then start java core application
ENTRYPOINT ["wait-for-it", \
    "database:5432", \
    "--timeout=10", \
    "--", \
    "mvn", \
    "exec:java", \
    "-s", \
    "/usr/share/maven/ref/settings-docker.xml", \
    "-f", \
    "./core/pom.xml", \
    "-Dspring.profiles.active=prod", \
    "-Ddatasource_url=${localeat_datasource_url}", \
    "-Ddatasource_username=${localeat_datasource_username}", \
    "-Ddatasource_password=${localeat_datasource_password}", \
    "-Dlocaleat_smtp_username=${localeat_smtp_username}", \
    "-Dlocaleat_smtp_password=${localeat_smtp_password}", \
    "-Dlocaleat_http_domainname=${localeat_http_domainname}"]
