# Use a single stage for simplicity and to ensure all binaries are in PATH
FROM python:3.12-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Create the data directory (for runtime JSON files)
RUN mkdir -p /app/data

# Cloud Run expects the app to listen on PORT (default 8080)
ENV PORT=8080
EXPOSE 8080

# Run uvicorn on the Cloud Run PORT
# Use python -m uvicorn to be safer about PATH
CMD ["sh", "-c", "python -m uvicorn main:app --host 0.0.0.0 --port ${PORT}"]
