#!/bin/sh
set -x

aws s3 cp src s3://cdn.outterest.com/ --recursive
