# Stage 1: Build the React application using pnpm
FROM node:18-alpine AS builder
WORKDIR /app

# Install pnpm globally using npm (which comes with the node image)
RUN npm install -g pnpm

# Copy package.json and the pnpm lockfile
COPY package.json pnpm-lock.yaml ./

# Install ALL dependencies using pnpm, including devDependencies
# Use --prod=false to ensure devDependencies needed for the build are installed
RUN pnpm install --frozen-lockfile --prod=false

# Copy the rest of the application code
COPY . .

# Build the application for production using pnpm
# If your app needs build-time environment variables, set them here
# Example: ARG VITE_API_URL
# ENV VITE_API_URL=$VITE_API_URL
RUN pnpm build

# Stage 2: Serve the built application with Nginx
FROM nginx:1.25-alpine

# Remove default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Create the Nginx configuration directly inside the Dockerfile
# Using 'EOF' (quoted) prevents shell variable expansion (like for $uri)
RUN cat <<'EOF' > /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _; # Listen on any server name

    # Root directory containing the built React app files
    root /usr/share/nginx/html;
    index index.html index.htm;

    location / {
        # Try serving the requested file directly, then as a directory,
        # otherwise fall back to index.html for SPA routing
        try_files $uri $uri/ /index.html;
    }

    # Optional: Add caching headers for static assets for better performance
    location ~* \.(?:css|js|jpg|jpeg|gif|png|ico|webp|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public";
    }

    # Optional: Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/xml+rss text/javascript;
}
EOF

# Copy the built static files from the builder stage
# Vite builds to 'dist' by default. Adjust if your output directory is different.
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (standard HTTP port Nginx listens on)
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
