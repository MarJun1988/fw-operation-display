FROM alpine:3.18

RUN apk add --no-cache postgresql-client bash

COPY backup.sh /backup.sh

# ENV Variablen können aus docker-compose kommen
ENV DATABASE_URL=""

RUN chmod +x /backup.sh

# Führt jede Stunde ein Backup aus
CMD ["sh", "-c", "while true; do /backup.sh; sleep 86400; done"]
