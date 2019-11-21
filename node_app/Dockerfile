FROM node

#create project folder in container
WORKDIR /app

#copy node module files into container
WORKDIR /app/node_modules
COPY /app/node_modules /app/node_modules
WORKDIR /app

#copy metadata on dependencies to container
COPY package-lock.json /app
COPY package-lock.json /app

#copy metadata on dependencies to container
COPY package.json /app
COPY package.json /app

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

#expose port 3000 in contaienr to node app
EXPOSE 3000

#run app with node
CMD ['node', '/app/index.js']
