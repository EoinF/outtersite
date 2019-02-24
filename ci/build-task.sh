#!/bin/sh
set -x

aws s3 cp src s3://www.outterest.com/ --recursive
