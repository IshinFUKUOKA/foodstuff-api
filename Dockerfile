FROM node:10-slim

RUN groupadd -r foodstuff && useradd -r -g foodstuff foodstuff
WORKDIR /app

EXPOSE 3000
USER foodstuff
CMD ["npm", "start"]
