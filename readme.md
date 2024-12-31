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
