sudo chown -R $(whoami) ~/.docker

# Build
docker build -t omnistudy/api:prod -f ./docker/Dockerfile.prod .
# Run
docker run -dp 80:80 --name api omnistudy/api:prod