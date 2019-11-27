FROM node

#create project folder in container
WORKDIR /app

#copy node module files into container
WORKDIR /app/node_modules
COPY /app/node_modules /app/node_modules
WORKDIR /app

#copy metadata on dependencies to container
COPY app/package-lock.json /app
COPY app/package.json /app

#copy node front end pages into container
WORKDIR /app/views
COPY /app/views /app/views
WORKDIR /app

#copy client side javascript into container
WORKDIR /app/js
COPY /app/js /app/js
WORKDIR /app

#copy entry point files into container
copy /app/index.js /app
copy /app/utils.js /app
copy /app/callbackDB.js /app
copy /app/boot.js /app

#expose port 3000 in contaienr to node app
EXPOSE 3000

#run app with node
CMD ["node", "/app/boot.js"]
