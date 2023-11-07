# book-store
Getting Started with Express.js to Build a JSON API in Node

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Docker**: Install Docker on your system. You can download it [here](https://www.docker.com/get-started).

## Getting Started

To get this project up and running, follow these steps:

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd project-directory
   ```
2. Create a .env file and set any environment variables your project requires. Refer to the .env.sample file for examples.

3. Build and start the Docker containers of docker-compose.yaml:

   ```bash
   docker compose --env-file .env up -d
   ```
## Utils

1. Stoping all containers of docker-compose.yaml:
   ```bash
   docker compose stop
   ```
2. Show logs of specifc container of docker-compose.yaml
   ```bash
   docker logs -f <container_name>
   ```
3. Drop all containers and delete all images of docker-compose.yaml
   ```bash
   docker compose down --rmi all
   ```
