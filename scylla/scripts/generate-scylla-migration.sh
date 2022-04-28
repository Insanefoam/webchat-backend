#!/bin/bash

echo Enter migration name

read name

touch scylla/migrations/$(date +%s)__$name.cql