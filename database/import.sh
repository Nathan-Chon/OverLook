#!/bin/sh

set -e

if [ -f "$PWD"/../server/.env ]; then
# shellcheck source=/dev/null
  . "$PWD"/../server/.env
else
  echo 'no .env file found' 1>&2
fi

if [ -n "$DATABASE_URL" ]; then
  psql "$DATABASE_URL" \
    -f "$PWD"/schema.sql \
    -f "$PWD"/data.sql
else
  echo 'no DATABASE_URL environment variable set' 1>&2
  exit 1
fi
