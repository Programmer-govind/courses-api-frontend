# Dockerfile for React Frontend
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm run build || (echo "Build failed" && cat /app/npm-debug.log && exit 1)
RUN ls -l /app && ls -l /app/build || echo "No build directory"

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
