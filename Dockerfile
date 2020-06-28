FROM node:lts-alpine3.12

RUN npm install yarn -g

RUN mkdir -p /opt/app/config
RUN mkdir -p /opt/app/dist

WORKDIR /opt/app

ADD ./.pnp.js /opt/app
ADD ./.yarnrc.yml /opt/app
ADD ./package.json /opt/app
ADD ./yarn.lock /opt/app
RUN cd /opt/app && yarn install --production=true

EXPOSE 3000
