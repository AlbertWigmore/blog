# syntax=docker/dockerfile:1.7

FROM node:24-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

COPY --from=builder /app/out .
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p \
        /var/cache/nginx/client_temp \
        /var/cache/nginx/proxy_temp \
        /var/cache/nginx/fastcgi_temp \
        /var/cache/nginx/uwsgi_temp \
        /var/cache/nginx/scgi_temp \
        /var/run \
    && chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx /var/run

# Nginx needs these paths for temporary request files and its PID when the root filesystem is read-only.
VOLUME ["/var/cache/nginx", "/var/run"]

# The bundled hooks attempt to rewrite Nginx configuration at startup.
RUN rm -f /docker-entrypoint.d/*

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:80/ >/dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
