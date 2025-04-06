# Example: .github/workflows/node.js.yml

# Name of the workflow
name: Node.js CI

# Specifies when the workflow should be triggered
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

# Defines the jobs that the workflow will execute
jobs:
  build:
    # Specifies the type of virtual host environment (runner) to use
    runs-on: ubuntu-latest

    # Strategy for running the jobs - useful for testing across multiple environments
    strategy:
      # A matrix build strategy to test against multiple versions of Node.js
      matrix:
        node-version: [14.x, 16.x]

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      - name: Checkout repository
        # Checks out your repository under $GITHUB_WORKSPACE, so the job can access it
        uses: actions/checkout@v2

      - name: Set up Node.js ${{ matrix.node-version }}
        # Sets up the specified version of Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install dependencies
        # Installs node modules as specified in the project's package-lock.json
        run: npm ci

      - name: Build the project
        # This command will only run if a build script is defined in the package.json
        run: npm run build --if-present

      - name: Run tests
        # Runs tests as defined in the project's package.json
        run: npm test

