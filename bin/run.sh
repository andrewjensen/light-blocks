#!/bin/bash

set -euo pipefail

NODE_ENV=production npm run serve --prefix server/
