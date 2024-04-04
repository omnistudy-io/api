FROM node:latest

# Attempt 1
# RUN addgroup --system app && adduser --system app && adduser app app
# USER app

# Attempt 2
# RUN useradd -rm -d /home/uapi -s /bin/bash -g root -G sudo -u 1001 uapi
# RUN chown -R uapi:root /home/uapi
# USER uapi

WORKDIR /api
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3001
CMD ["npm", "run", "dev"]