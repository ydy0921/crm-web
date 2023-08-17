FROM node:16.14.2 as builder
RUN mkdir /app
WORKDIR /app
# COPY package.json /app
# RUN npm install -g pnpm && \
#   pnpm install
# COPY . /app
# CMD ["npm", "run","serve"]

COPY . .
RUN npm install -g pnpm && \
  pnpm install && \
  # npm run clean && \
  npm run build

FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf