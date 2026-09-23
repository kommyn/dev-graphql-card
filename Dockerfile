FROM node:22.21-alpine AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --ignore-scripts
COPY . .
RUN yarn db:generate && yarn build 

FROM node:22.21-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/src/generated ./src/generated
COPY package.json prisma.config.ts ./
COPY prisma ./prisma

EXPOSE 3000

CMD ["sh", "-c", "yarn db:deploy && node dist/prisma/seed.js && yarn start:prod"]
