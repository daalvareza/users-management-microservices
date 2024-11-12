# Use the official Nginx image
FROM nginx:alpine

# Copy the custom Nginx configuration into the container
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for the Nginx load balancer
EXPOSE 80

# Nginx will automatically start based on the default command in the image
