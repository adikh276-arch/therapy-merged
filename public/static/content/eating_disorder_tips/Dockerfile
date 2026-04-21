FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Clean up default content
RUN rm -rf /usr/share/nginx/html/*

# Copy all files from current directory
COPY . /usr/share/nginx/html/

# Fix permissions
RUN chmod -R 755 /usr/share/nginx/html &&     chown -R nginx:nginx /usr/share/nginx/html

# Update configuration
RUN rm /etc/nginx/conf.d/default.conf
COPY vite-nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx","-g","daemon off;"]