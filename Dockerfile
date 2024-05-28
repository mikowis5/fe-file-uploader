FROM node:16

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the development server
CMD ["npm", "start"]
