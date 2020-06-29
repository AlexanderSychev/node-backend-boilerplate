FROM node:12.18.1-alpine3.12

# Create directories for application
RUN mkdir -p /opt/app

WORKDIR /opt/app

# Add application files
COPY package.json /opt/app
COPY tsconfig.json /opt/app
COPY yarn.lock /opt/app
COPY config /opt/app/config
COPY dist /opt/app/dist
COPY .yarn/releases/yarn-1.22.4.js /opt/app/.yarn/releases/yarn-1.22.4.js
COPY .yarnrc /opt/app

# Install dependencies and run migrations
RUN cd /opt/app && yarn install --production=true

# Forwarding 3000 TCP Port
EXPOSE 3000

CMD [ "yarn", "start" ]
