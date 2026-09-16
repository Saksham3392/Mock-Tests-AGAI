# Use lightweight Python 3.11 base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=3090

# Copy application files
COPY . /app

# Expose default port
EXPOSE 3090

# Start server
CMD ["python", "server.py"]
