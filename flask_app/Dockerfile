FROM python:3.6

WORKDIR /app

COPY /app/requirements.txt /app
Run pip install -r /app/requirements.txt

#move utils into container
WORKDIR /app/utils
COPY /app/utils /app/utils
WORKDIR /app

#move python app entry point and requirements files into container
COPY /app/index.py /app


CMD ["python", "/app/index.py"]
