#!/bin/sh



(
set -ve
. ./.env
export PGDATABASE=$DB_NAME
export PGUSER=$DB_USERNAME
export PGPASSWORD=$DB_PASSWORD
NOW=$(date +"-%d-%m-%Y-%H-%M")
echo $NOW
pg_dump --schema redis > "../bk-redis${NOW}.sql"


echo 'PostgreSQL database backup successfully!'
)

STATUS=$?
rm $SCHEMA_DUMP_FILE $DATA_DUMP_FILE 2>&-
[ $STATUS -ne 0 ] && echo 'An error occurred while updating PostgreSQL database'
