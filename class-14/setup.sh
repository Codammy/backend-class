#!/usr/bin/env bash

HOST=localhost
PORT=27017

echo "use school" | mongosh --host $HOST --port $PORT