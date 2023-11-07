FROM node:17-alpine as builder

# Install base dependences
RUN apk update && apk add bash gcc shadow python3

# Create new user
RUN useradd --create-home foo

# Copy source files
WORKDIR /home/foo/book-store
COPY ./src /home/foo/book-store/src

# Run main application
WORKDIR /home/foo/book-store/src
RUN npm install -y && npm install -g pm2@latest
ENTRYPOINT ["/bin/bash", "-c"]
CMD ["python3 run.py"]
