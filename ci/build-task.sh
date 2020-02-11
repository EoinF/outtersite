#!/bin/sh
set -ex

# Generate the main content to be served
npm ci
npm run build

# Generate the phaser3 physics demo
git clone https://github.com/eoinf/phaser3-2d-terrain-car-example
cd phaser3-2d-terrain-car-example
npm ci
npm run build
cd ..
cp -R phaser3-2d-terrain-car-example/dist build/demos/phaser3-physics

# Generate the flower strategy demo
git clone https://github.com/eoinf/Flower-Tactics-Prototype
cd Flower-Tactics-Prototype
npm ci
npm run build
cd ..
cp -R Flower-Tactics-Prototype/dist build/demos/flower-strategy-prototype

# Compress all the non image files
find build -type f \
    ! -name '*.gz' \
    ! -name '*.png' \
    ! -name '*.jpg' \
    ! -name '*.gif' \
    ! -name '*.ico' \
    ! -name '*.swf' \
        -exec gzip "{}" \;

# Remove gzip extension from each filename
for f in `find build -type f -name '*.gz'`; do
    mv $f ${f%.gz}
done

# Upload non gzipped files
aws s3 sync build s3://www.outterest.com/ \
--include "*" --acl "public-read" \
--exclude "*.js" \
--exclude "*.css" \
--exclude "*.html" \
--exclude "*.fnt" \
--exclude "*.atlas" \
--exclude "*.txt" \
--exclude "*.glsl" \
--exclude "*.frag" \
--exclude "*.vert" \
--exclude "*.json" \
--exclude "*.map" \
--delete

# Upload gzipped files with content-encoding header set to gzip
aws s3 sync build s3://www.outterest.com/ \
--exclude "*" \
--include "*.js" --acl "public-read" --content-encoding gzip \
--include "*.css" --acl "public-read" --content-encoding gzip \
--include "*.html" --acl "public-read" --content-encoding gzip \
--include "*.fnt" --acl "public-read" --content-encoding gzip \
--include "*.atlas" --acl "public-read" --content-encoding gzip \
--include "*.txt" --acl "public-read" --content-encoding gzip \
--include "*.glsl" --acl "public-read" --content-encoding gzip \
--include "*.frag" --acl "public-read" --content-encoding gzip \
--include "*.vert" --acl "public-read" --content-encoding gzip \
--include "*.json" --acl "public-read" --content-encoding gzip \
--delete
