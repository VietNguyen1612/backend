FROM node:18
LABEL name="post-service"
COPY . .
RUN yarn
RUN npm rebuild grpc --force
EXPOSE 4001
CMD ["yarn", "start"]