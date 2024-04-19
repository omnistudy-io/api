sudo chown -R $(whoami) ~/.docker

# Build
docker build --no-cache -t omnistudy/api:staging -f ./docker/Dockerfile.staging .
# Run
docker run -dp 80:80 --name api omnistudy/api:staging