# Use an official Node.js image as the base image
FROM node:20.11.1

# Set the working directory
WORKDIR /catalyst

# Copy package.json and package-lock.json (if applicable)
COPY package*.json ./
COPY package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Expose the default React Native port
EXPOSE 8081

# Start the React Native application
CMD ["npx", "react-native", "run-android"]
