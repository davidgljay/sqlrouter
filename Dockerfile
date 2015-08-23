FROM node
MAINTAINER "David Jay <davidgljay@gmail.com>"
LABEL updated_at = "2015-08-20" version = .02
LABEL description = "A simple container for accepting SQL queries, sanitizing them, and pinging a db."
RUN apt-get update
COPY ./ /home/sqlrouter
WORKDIR /home/sqlrouter
RUN npm install
EXPOSE 8099
CMD node app
