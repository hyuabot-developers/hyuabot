# build stage
FROM node:lts-alpine as build-stage
WORKDIR /home/node/app
COPY . .
RUN npm install -g npm@8.6.0
RUN npm install
RUN npm run build

# production stage
FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /home/node/app

# Install deps for production only
COPY ./package* ./
RUN npm install && \
    npm cache clean --force
# Copy builded source from the upper builder stage
COPY --from=builder /home/node/app/build ./build

# Expose ports (for orchestrators and dynamic reverse proxies)
EXPOSE 3000

# Start the app
CMD npm start