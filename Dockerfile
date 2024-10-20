# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm i 

# Copy the rest of the application code to the container
COPY . .

# Build the TypeScript code
RUN npm run build:ts

# Expose the port that the application will listen on
EXPOSE 4700

# Set the command to start the application
CMD ["npm", "start"]
