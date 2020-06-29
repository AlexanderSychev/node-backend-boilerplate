# Node.JS Backend Boilerplate

My personal boilerplate for any pure backend project for Node.JS 12+.

## Requirements

For application building:
* Node.JS 12.18.1+;
* Yarn CLI 1.22.4+ (uses Yarn 2 on project level);
* GNU Make 4.2.1;

For application running:
* Docker 19.03.12+;
* Docker Compose 1.24.1+;
or:
* Vagrant 2.2.9+ (if your environment doesn't support Docker for some reason);

## Revert from scratch

Install all dependencies:
```bash
yarn install
```

If you will use Vagrant, you should install plugin `vagrant-docker-compose`:
```bash
vagrant plugin install vagrant-docker-compose
```

Build project:
```bash
make
```

## Running with Docker and Docker Compose

```bash
docker-compose up
```

## Running with Vagrant

```bash
vagrant up
```
