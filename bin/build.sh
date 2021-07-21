#!/bin/bash

set -euo pipefail

echo "Building the UI..."
pushd ui/
npm install
npm run build
popd

echo "Building the server..."
pushd server/
npm install
npm run build
popd

echo "Done."
