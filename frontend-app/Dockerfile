# Base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Build Next.js application
RUN npm run build

# Set environment variables
ENV NODE_ENV production
ENV PORT 3000
ENV NEXT_PUBLIC_API_BASE_URL http://167.71.206.157:1337
ENV NEXT_PUBLIC_MAPBOX_TOKEN pk.eyJ1IjoicG9tbGltIiwiYSI6ImNsZHZvemw5dDAwOHkzd25yM3p1ZXR3NngifQ.Papg29gFPhuOFcPmASwGpw


# Expose port
EXPOSE 3000

# Start server
CMD ["npm", "start"]