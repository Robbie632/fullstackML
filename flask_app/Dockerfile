FROM python:3.6

WORKDIR /app

# Install dependencies
COPY /app/requirements.txt /app

RUN pip install -r /app/requirements.txt

# Copy all app files to container
COPY /app .

CMD ["python", "/app/index.py"]
