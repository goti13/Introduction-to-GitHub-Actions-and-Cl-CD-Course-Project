# Introduction-to-GitHub-Actions-and-Cl-CD-Course-Project
Introduction to GitHub Actions and Cl/ CD Course Project


Lesson 1: Understanding Continuous Integration and Continuous Deployment


Objectives:

1. ﻿﻿﻿Define Cl/CD and understand its benefits.
2. ﻿﻿﻿Get familiar with the Cl/CD pipeline.

Lesson Details:

1. Definition and Benefits of Cl/CD:

- Continuous Integration (Cl) is the practice of merging all developers' working copies to a shared mainline several times a day.
- Continuous Deployment (CD) is the process of releasing software changes to production automatically and reliably.
- Benefits: Faster release rate, improved developer productivity, better code quality, and enhanced customer satisfaction.

2. Overview of the Cl/CD Pipeline:

- Cl Pipeline typically includes steps like version control, code integration, automated testing, and building the application.
- CD Pipeline involves steps like deploying the application to a staging or production environment, and post-deployment monitoring.



# Lesson 1: Understanding Continuous Integration and Continuous Deployment

**Objectives:**

1. ﻿﻿﻿Define Cl/CD and understand its benefits.
2. ﻿﻿﻿Get familiar with the CI/CD pipeline.


Lesson Details:

1. Definition and Benefits of CI/CD:

- Continuous Integration (Cl) is the practice of merging all developers' working copies to a shared mainline several times a day.
- Continuous Deployment (CD) is the process of releasing software changes to production automatically and reliably.
- Benefits: Faster release rate, improved developer productivity, better code quality, and enhanced customer satisfaction.

2. Overview of the Cl/CD Pipeline:

- Cl Pipeline typically includes steps like version control, code integration, automated testing, and building the application.
- CD Pipeline involves steps like deploying the application to a staging or production environment, and post-deployment monitoring.
- Tools: Version control systems (e.g., Git), CI/CD platforms (e.g., GitHub Actions), testing frameworks, and deployment tools.

# Lesson 2: Introduction to GitHub Actions

**Objectives:**

1. ﻿﻿﻿Understand what GitHub Actions is.
2. ﻿﻿﻿Learn key concepts and terminology.

Lesson Details:

- GitHub Actions: A CI/CD platform integrated into GitHub, automating the build, test, and deployment pipelines of your software directly within your GitHub repository.
- Documentation Reference: Explore the GitHub Actions Documentation for in-depth understanding.


# Key Concepts and Terminology:

1. Workflow:
- Definition: A configurable automated process made up of one or more jobs. Workflows are defined by a YAML file in your repository.
- Example: A workflow to test and deploy a Node.js application upon a Git push.
- Documentation: Learn more about workflows in the GitHub Docs on Workflows.

2. Event:
- Definition: A specific activity that triggers a workflow. Events include activities like push, pull request, issue creation, or even a scheduled time.
- Example: A 'push' event triggers a workflow that runs tests every time code is pushed to any branch in a repository.
- Documentation: Review different types of events in the Events that trigger workflows section.

3. Job:
- Definition: A set of steps in a workflow that are executed on the same runner. Jobs can run sequentially or in parallel.
- Example: A job that runs tests on your application.
- Documentation: Understand jobs in detail in the GitHub Docs on Jobs.

4. Step:
- Definition: An individual task that can run commands within a job. Steps can run scripts or actions.
- Example: A step in a job to install dependencies ('npm install').
- Documentation: Learn about steps in the Steps section of GitHub Docs.
  
5. Action:
- Definition: Standalone commands combined into steps to create a job. Actions can be written by you or provided by the GitHub community.
- Example: Using 'actions/checkout' to check out your repository code.
- Documentation: Explore GitHub Actions in the Marketplace and learn how to create your own in the Creating actions guide.

6. Runner:
- Definition: A server that runs your workflows when they're triggered. Runners can be hosted by GitHub or self-hosted
- Example: A GitHub-hosted runner that uses Ubuntu.
- Documentation: Delve into runners in the GitHub Docs on Runners.

# Practical Implementation

**Setting Up the Project:**

1. Initialize a GitHub Repository:

- Create a new repository on GitHub.

![image](https://github.com/user-attachments/assets/fb943f2e-8cc4-46c5-96a4-825a2fd1b0f4)

- Clone it to your local machine.

![image](https://github.com/user-attachments/assets/d3e4591f-76fe-45e2-aa14-3ccef13b743d)


![image](https://github.com/user-attachments/assets/8b5cf9c9-0bc3-4280-9a0e-0e3ba0de7ced)


![image](https://github.com/user-attachments/assets/3ddbc482-b0a6-4dc2-a4eb-34cbec716a4f)



2. Create a Simple Node.js Application:

- Initialize a Node.js project ('npm init').


![image](https://github.com/user-attachments/assets/f45b082f-609f-4851-a9b6-71217d8ccb1c)



- Create a simple server using Express.js to serve a static web page.

```

// Example: index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

```

- Add your code to the repository and push it to GitHub


![image](https://github.com/user-attachments/assets/d0f73894-4aee-4779-88c0-8b7e320ab8a9)


- Create a.github/workflows' directory in your repository.


![image](https://github.com/user-attachments/assets/6f8ad22d-2f38-4564-80df-9cf5164054e2)


- Add a workflow file (e.g., ' node. js .yml*).



```
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


```

# Explanation:

1. ﻿﻿﻿'name': This simply names your workflow. It's what appears on GitHub when the workflow is running.
   
2. ﻿﻿﻿'on': This section defines when the workflow is triggered. Here, it's set to activate on push and pull request events to the main branch.
   
3. ﻿﻿﻿'jobs': Jobs are a set of steps that execute on the same runner. In this example, there's one job named 'build'.
   
4. ﻿﻿﻿' runs-on*: Defines the type of machine to run the job on. Here, it's using the latest Ubuntu virtual machine.
 
5. ﻿﻿﻿'strategy,matrix': This allows you to run the job on multiple versions of Node.js, ensuring compatibility.
   
6. ﻿﻿﻿'steps": A sequence of tasks executed as part of the job. 'actions/checkout@v2' : Checks out your repository under '$GITHUB_WORKSPACE'.

- ‘actions/setup-node@v1': Sets up the Node.js environment.
  
- ‘npm ci" : Installs dependencies defined in 'package-lock. json'.
  
- ‘npm run build --if-present': Runs the build script from 'package. json' if it's present.
  
- ‘npm test' : Runs tests specified in 'package. json'.

This workflow is a basic example for a Node js project, demonstrating how to automate testing across different Node.js versions and ensuring that your code integrates and works as expected in a clean environment.


4. Testing and Deployment:

- Add automated tests for your application.

Inside your project folder, create a __tests__/index.test.js

```

const request = require('supertest');
const app = require('../index');

describe('GET /', () => {
  it('should return Hello World!', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200); // `.toBe` is more idiomatic for value comparisons
    expect(res.text).toBe('Hello World!');
  });
});


```

Modify index.js to export app for testing:

```

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}

module.exports = app; // Export the app for testing

```

Run the following command to ensure jest and supertest are added to your devDependencies:


```
npm install --save-dev jest supertest

```

![image](https://github.com/user-attachments/assets/ab821277-7493-47bc-9aaf-495edae33eba)

Try to run test locally:
Before relying on GitHub Actions, always run tests locally to confirm they're passing. Run:

```

npm test

```

![image](https://github.com/user-attachments/assets/07579ea7-1e17-4368-8f04-5831b772a99a)




