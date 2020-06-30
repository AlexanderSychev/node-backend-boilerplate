FROM postgres:12.3-alpine

# Install locales
RUN apk --no-cache add ca-certificates wget && \
    wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub && \
    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.25-r0/glibc-2.25-r0.apk && \
    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.25-r0/glibc-bin-2.25-r0.apk && \
    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.25-r0/glibc-i18n-2.25-r0.apk && \
    apk add glibc-bin-2.25-r0.apk glibc-i18n-2.25-r0.apk glibc-2.25-r0.apk

# Set Russian locale (UTF-8 encoding)
RUN /usr/glibc-compat/bin/localedef -i ru_RU -c -f UTF-8 ru_RU.UTF-8
ENV LANG=ru_RU.UTF-8
ENV LANGUAGE=ru_RU.UTF-8

# Configure postgres
ENV POSTGRES_USER=john_doe
ENV POSTGRES_PASSWORD=123qwe
ENV POSTGRES_DB=node_backend_boilerplate
