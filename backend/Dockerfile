# Use Python 3.10 to avoid TF version conflicts
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy dependencies first
COPY requirements.txt .

# Install dependencies
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Copy rest of the code
COPY . .

# Expose the port
EXPOSE 5000

# Start the app
CMD ["python", "app.py"]
 