sudo chown -R $(whoami) ~/.docker

# Build
docker build -t omnistudy/api:dev -f ./docker/Dockerfile.dev .
# Run
docker run -dp 3001:3001 --name api omnistudy/api:dev