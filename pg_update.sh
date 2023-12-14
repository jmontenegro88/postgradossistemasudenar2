#!/bin/bash

SCHEMA_DUMP_FILE=$(mktemp)
DATA_DUMP_FILE=$(mktemp)
trap "rm -f $SCHEMA_DUMP_FILE $DATA_DUMP_FILE" EXIT

psql_ensure_stdin () {
    { cat && echo '; COMMIT;'; } |
        psql -v AUTOCOMMIT=off -v ON_ERROR_STOP=on -f- "$@"
}

pg_reset () {
    {
        printf 'DROP SCHEMA IF EXISTS "%s" CASCADE;' "$LOCAL_SCHEMA"
        printf 'CREATE SCHEMA "%s";' "$LOCAL_SCHEMA"
        for t in "${SHARED_TABLES[@]}"
        do
            printf 'DROP TABLE IF EXISTS "%s"."%s";' "$SHARED_SCHEMA" "$t"
        done
        printf 'CREATE SCHEMA IF NOT EXISTS "%s";' "$SHARED_SCHEMA"
    } | psql_ensure_stdin
}

pg_update () {
    set -ex
    . ./.env
    export PGDATABASE=${DB_NAME:?DB_NAME not set}
    export PGUSER=${DB_USERNAME:?DB_USERNAME not set}
    export PGPASSWORD=${DB_PASSWORD:?DB_PASSWORD not set}
    export PGHOST=${DB_HOST:-127.0.0.1}
    export DB_PORT=${DB_PORT:-5432}
    LOCAL_SCHEMA=${DB_LOCAL_SCHEMA:?DB_LOCAL_SCHEMA not set}
    SHARED_SCHEMA=${DB_SHARED_SCHEMA:-public}
    SHARED_TABLES=(participante)
    PGDUMP_SHARED_TABLES="$SHARED_SCHEMA.($(IFS='|'; echo "${SHARED_TABLES[*]}"))"
    unset SCHEMA_EXISTS

    if pg_dump --table "$PGDUMP_SHARED_TABLES" --schema-only >> $SCHEMA_DUMP_FILE
    then
        SCHEMA_EXISTS=1
        pg_dump --table "$PGDUMP_SHARED_TABLES" --data-only >> $DATA_DUMP_FILE
    fi

    if pg_dump --schema "$LOCAL_SCHEMA" --schema-only >> $SCHEMA_DUMP_FILE
    then
        SCHEMA_EXISTS=1
        pg_dump --schema "$LOCAL_SCHEMA" --data-only >> $DATA_DUMP_FILE
    fi

    pg_reset
    if npm run db-update
    then
        [ -z $SCHEMA_EXISTS ] && return
        psql_ensure_stdin < $DATA_DUMP_FILE && return
    fi

    STATUS=$?
    pg_reset
    psql -f $SCHEMA_DUMP_FILE
    psql -f $DATA_DUMP_FILE
    return $STATUS
}

if (pg_update)
then
    echo 'PostgreSQL database updated successfully!' >&2
else
    echo 'An error occurred while updating PostgreSQL database' >&2
fi
