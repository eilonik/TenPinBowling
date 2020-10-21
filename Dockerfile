FROM node:latest
COPY . /usr/src/
CMD ["node", "/usr/src/app.js"]