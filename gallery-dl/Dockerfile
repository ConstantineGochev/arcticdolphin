FROM alpine:3.12
RUN apk add --update --no-cache python3 \
                                py3-pip \
                                ffmpeg \
                                aria2 \
    && ln -s /usr/bin/python3 /usr/local/bin/python
RUN pip3 install --upgrade youtube-dlc gallery-dl \
    && ln -s /usr/bin/youtube-dlc /usr/local/bin/youtube-dl
WORKDIR /app
