FROM node:17-alpine as builder

# Install base dependences
RUN apk update && apk add bash gcc shadow

# Create new user
RUN useradd --create-home foo

# Copy source files
WORKDIR /home/foo/book-store
COPY ./src /home/foo/book-store/src

# Run main application
WORKDIR /home/foo/book-store/src
RUN npm install -y
ENTRYPOINT ["/bin/bash", "-c"]
CMD ["node app.js"]
