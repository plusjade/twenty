#!/bin/sh

echo "Trying yarn build..."
yarn build

echo "Trying to sync static assets..."
aws s3 sync build/static/. s3://www.makeist.com/static/

echo "Trying to sync the homepage..."
aws s3 cp build/index.html s3://www.makeist.com/index.html --cache-control "public, must-revalidate, proxy-revalidate, max-age=0"

echo "SUCCESS!"
