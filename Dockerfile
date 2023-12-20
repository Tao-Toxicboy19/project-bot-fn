# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to /app
COPY . .

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 7070

# Command to run the application
CMD ["npm", "run", "start"]
