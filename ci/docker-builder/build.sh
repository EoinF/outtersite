#!/bin/sh
set -x

git clone https://github.com/EoinF/outtersite.git
cd outtersite
chmod +x ci/build-task.sh

./ci/build-task.sh