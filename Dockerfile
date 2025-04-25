# Stage 1: Build the React application using pnpm
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm globally using npm (which comes with the node image)
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml to leverage Docker caching for dependencies
COPY package.json pnpm-lock.yaml ./

# Install ALL dependencies using pnpm, including devDependencies
RUN pnpm install --frozen-lockfile --prod=false

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN pnpm build

# Stage 2: Serve the built application
FROM nginx:1.25-alpine

# Remove default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Add Nginx configuration for serving the React app
COPY --from=builder /app/dist /usr/share/nginx/html
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html index.htm;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location ~* \.(?:css|js|jpg|jpeg|gif|png|ico|webp|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public";
    }

    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/xml+rss text/javascript;
}
EOF

# Expose port 80
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
