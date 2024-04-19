# Claim ownership to docker - may not be necessary
sudo chown -R $(whoami) ~/.docker

# Build the container
docker build -t omnistudy/api:dev -f docker/Dockerfile.dev .

# Run the container
docker run -dp 3001:3001 --name api --network omninet -v `pwd`:/api omnistudy/api:dev