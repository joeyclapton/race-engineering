#!/bin/bash

npm install
npm run build
npx typeorm migration:run -d dist/shared/typeorm/database.providers.js
npm run start:dev
