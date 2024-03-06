# FullStack Templates

## Overview

This repository is a lerna monorepo containing client-server application built with ReactJS for the client-side and Node.js with Express for the server-side. The client is packaged using `rspack`, and the server can be configured either as a traditional monolithic application or as a serverless setup.

## Apps

### Client

The `client` directory houses the React client, bundled with `rspack`. This ensures efficient and optimized packaging for the client-side application.

### Server

The `server` directory contains the Express API, providing the backend logic for the application. This can be set up either as a monolithic server or as a serverless function.

## Technologies Used

-  ReactJS
-  Node.js
-  Express
-  TypeScript

## Author

-  **Suman Biswas**
   -  [Website](https://sumanbiswas.vercel.app)
   -  [LinkedIn](https://www.linkedin.com/in/sumanbiswas7)

## Building Packages

### Build Process

During development, it's important to note that the build might fail, but it could still work. Ensure to check the logs for any error messages after every change in the `packages/*` directory, whether it's in `utils` or `types`. In such cases, run the `build:pkg` script to build the packages.

### Cleaning

Two scripts are provided for cleaning based on your operating system:

-  `clean:unix`: Use this script for Unix-based systems.
-  `clean:win`: Use this script for Windows.

Before running these scripts, configure your preferred script in the root `package.json`. After cleaning, the `dist` directories of the packages will be deleted. Therefore, you might need to run `build:pkg` again. After cleaning, run `yarn install` followed by `yarn run clean`.
