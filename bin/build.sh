#!/bin/bash

set -euo pipefail

echo "Building the UI..."
pushd ui/
npm ci
npm run build
popd

echo "Building the server..."
pushd server/
npm ci
npm run build
popd

echo "Done."
