sudo chown -R $(whoami) ~/.docker

# Build
docker build $1 -t omnistudy/api:dev -f docker/Dockerfile.dev .
# Run
docker run -dp 3001:3001 --name api --network omninet -v `pwd`:/api omnistudy/api:dev