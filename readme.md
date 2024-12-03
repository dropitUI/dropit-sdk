# DropIT: Seamless Design-to-Code Workflow with Figma

DropIT is an NPM package designed to simplify interaction with the Figma API. It allows users to programmatically fetch and transform Figma designs into structured data for development workflows. This package focuses on providing a single, powerful function that consolidates all necessary Figma data into an `App` object.

---

## Features

- **Unified Figma Data Fetching**: Retrieve Figma file details, including pages, screens, styles, and images, in a single call.
- **Design-to-Code Workflow**: Streamline the process of converting Figma designs into usable code or structured formats.
- **Simple Setup**: Initialize with a Figma Personal Access Token for seamless integration.

---

## Table of Contents

- [DropIT: Seamless Design-to-Code Workflow with Figma](#dropit-seamless-design-to-code-workflow-with-figma)
  - [Features](#features)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Using npm](#using-npm)
    - [Using yarn](#using-yarn)
    - [Local Installation (if you haven't published the package yet)](#local-installation-if-you-havent-published-the-package-yet)
  - [Setup](#setup)
  - [Function: `getApp`](#function-getapp)
    - [Parameters](#parameters)
    - [Returns](#returns)
    - [Example Usage](#example-usage)

---

## Installation

To install DropIT into your project, use one of the following methods:

### Using npm

```bash
npm install dropit-figma
```

### Using yarn

```bash
yarn add dropit-figma
```

### Local Installation (if you haven't published the package yet)

1. Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/dropit-figma.git
```

2. Navigate to the project directory:

```bash
cd dropit-figma
```

3. Run npm or yarn to install the dependencies:

```bash
npm install
```
or
```bash
yarn install
```

4. Link the package globally so you can use it in your project:

```bash
npm link
```
or
```bash
yarn link
```

5. In your project, link the local version of the package:

```bash
npm link dropit-figma
```
or
```bash
yarn link dropit-figma
```

Now you can use the package in your project even before it's published.

---

## Setup

Before using DropIT, obtain a **Figma Personal Access Token** by following these steps:

1. Log in to your Figma account and navigate to [Figma account settings](https://www.figma.com/settings).
2. Generate a **Personal Access Token**.
3. Store the token securely, as it will be used for authenticating API requests.

Initialize DropIT in your project:

```javascript
import { initialize } from 'dropit-figma';

// Initialize with your Figma Personal Access Token
initialize('your-figma-access-token');
```

---

## Function: `getApp`

The `getApp` function retrieves a comprehensive representation of a Figma file, including its pages, screens, styles, and images.

```javascript
import { getApp } from 'dropit-figma';

const app = await getApp(figmaFileID);
```

### Parameters

- `figmaFileID` (string): The ID of the Figma file you want to fetch.

### Returns

A Promise resolving to an object with the following structure:

```javascript
{
  name: string; // The name of the Figma file
  screens: Array<Object>; // List of extracted screens
  styles: Array<Object>; // Local styles with detailed properties
  images: Array<Object>; // Images fetched from the Figma file
}
```

### Example Usage

```javascript
import { initialize, getApp } from 'dropit-figma';

// Initialize DropIT with your Figma Personal Access Token
initialize('your-figma-access-token');

// Fetch the Figma file data
const fetchFigmaData = async () => {
    try {
        const app = await getApp('your-figma-file-id');
        console.log('App Data:', app);
    } catch (error) {
        console.error('Error fetching Figma data:', error);
    }
};

fetchFigmaData();
```

---
