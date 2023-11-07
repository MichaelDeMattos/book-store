FROM node:17-alpine as builder

# Install base dependences
RUN apk update && apk add bash gcc shadow python3

# Install wait-for-it.sh
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /opt/bin/
RUN chmod +x /opt/bin/wait-for-it.sh && chown -R 1000:1000 /opt/bin/wait-for-it.sh

# Create new user
RUN useradd --create-home foo

# Copy source files
WORKDIR /home/foo/book-store
COPY ./src /home/foo/book-store/src

# Run main application
WORKDIR /home/foo/book-store/src
RUN npm install -y && npm install -g pm2@latest
ENTRYPOINT ["/bin/bash", "-c"]
CMD ["/opt/bin/wait-for-it.sh -h $DATABASE_HOST -p $DATABASE_PORT --strict --timeout=60 -- python3 run.py"]
