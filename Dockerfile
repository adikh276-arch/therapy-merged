FROM node:20-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG VITE_AUTH_PORTAL_URL
ENV VITE_AUTH_PORTAL_URL=$VITE_AUTH_PORTAL_URL

RUN pnpm build

# ─────────────────────────────────────────
FROM nginx:alpine AS runner

# Create the directory structure matching the /therapy subpath
RUN mkdir -p /usr/share/nginx/html/therapy

# Copy built assets into the subpath
COPY --from=builder /app/dist /usr/share/nginx/html/therapy
# Static HTML content for Group C2
COPY --from=builder /app/public/static /usr/share/nginx/html/static

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
