# DropIT: Figma API Integration for Seamless Design-to-Code Workflow

DropIT is an NPM package that facilitates seamless interaction with the Figma API. It allows users to fetch various elements, components, styles, images, and other Figma resources programmatically. DropIT integrates with the Figma API to enable design-to-code workflows, making it ideal for automating the conversion of Figma designs into usable code for developers.

---

## Features

- **Figma File Fetching**: Fetches Figma file data, including components, frames, groups, and nodes.
- **Styles Fetching**: Retrieve both local and remote styles used within a Figma document.
- **Images Fetching**: Fetch images based on node IDs or retrieve all images associated with the file.
- **Component Access**: Retrieve Figma components for easy integration with your development workflow.
- **Utility Functions**: Simplifies authentication and client management with easy-to-use functions.

---

## Table of Contents

- [DropIT: Figma API Integration for Seamless Design-to-Code Workflow](#dropit-figma-api-integration-for-seamless-design-to-code-workflow)
  - [Features](#features)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Setup](#setup)
  - [Functions](#functions)
    - [1. **getFigmaFile**](#1-getfigmafile)
  - [Functions](#functions-1)
    - [1. **getFigmaFile**](#1-getfigmafile-1)
    - [2. **getComponents**](#2-getcomponents)
    - [3. **getStyles**](#3-getstyles)
    - [4. **getStyle**](#4-getstyle)
    - [5. **getImagesByIds**](#5-getimagesbyids)
    - [6. **getAllImages**](#6-getallimages)
    - [7. **getAllGroups**](#7-getallgroups)
    - [8. **getAllFrames**](#8-getallframes)
    - [9. **getLocalStyles**](#9-getlocalstyles)
    - [10. **getMappedLocalStyles**](#10-getmappedlocalstyles)
  - [Example Usage](#example-usage)

---

## Installation

To install DropIT into your project, use npm or yarn:

```bash
npm install dropit-figma
```

Or with yarn:

```bash
yarn add dropit-figma
```

## Setup

Before you start using DropIT, you'll need a **Figma Personal Access Token**. Follow these steps:

1. Go to your [Figma account settings](https://www.figma.com/settings).
2. Generate a new **Personal Access Token**.
3. Store the token securely, as you'll use it to initialize the DropIT client.

Once you have the token, you can initialize the client in your project like this:

```javascript
import { initialize } from 'dropit-figma';

// Initialize with your Figma Personal Access Token
initialize('your-figma-access-token');
```

This will set up the client, and you can start calling the available functions directly without needing to pass the access token each time.

---

## Functions

### 1. **getFigmaFile**

Fetches a Figma file by its ID.

```javascript
export async function getFigmaFile(fileId);
```
**Parameters**:

- `fileId` (string): The ID of the Figma file.

---

## Functions

### 1. **getFigmaFile**

Fetches a Figma file by its ID.

```javascript
export async function getFigmaFile(fileId);
```

**Parameters**:
- `fileId` (string): The ID of the Figma file.

**Returns**:
- A Promise that resolves to the file data in JSON format.

---

### 2. **getComponents**

Fetches the components from a Figma file.

```javascript
export async function getComponents(fileId);
```

**Parameters**:
- `fileId` (string): The ID of the Figma file.

**Returns**:
- A Promise that resolves to a list of components.

---

### 3. **getStyles**

Fetches the styles used in a Figma file.

```javascript
export async function getStyles(fileId);
```

**Parameters**:
- `fileId` (string): The ID of the Figma file.

**Returns**:
- A Promise that resolves to the styles data (both local and remote).

---

### 4. **getStyle**

Fetches a style by its unique key.

```javascript
export async function getStyle(styleKey);
```

**Parameters**:
- `styleKey` (string): The unique key of the style.

**Returns**:
- A Promise that resolves to the detailed style information.

---

### 5. **getImagesByIds**

Fetches images from a Figma file based on node IDs.

```javascript
export async function getImagesByIds(fileId, ids);
```

**Parameters**:
- `fileId` (string): The ID of the Figma file.
- `ids` (Array<string>): An array of node IDs.

**Returns**:
- A Promise that resolves to the images associated with the given node IDs.

---

### 6. **getAllImages**

Fetches all images from a Figma file.

```javascript
export async function getAllImages(fileId);
```

**Parameters**:
- `fileId` (string): The ID of the Figma file.

**Returns**:
- A Promise that resolves to all images in the file.

---

### 7. **getAllGroups**

Fetches all groups from a Figma file.

```javascript
export async function getAllGroups(fileId);
```

**Parameters**:
- `fileId` (string): The ID of the Figma file.

**Returns**:
- A Promise that resolves to a list of all groups in the file.

---

### 8. **getAllFrames**

Fetches all frames from a Figma file.

```javascript
export async function getAllFrames(fileId);
```

**Parameters**:
- `fileId` (string): The ID of the Figma file.

**Returns**:
- A Promise that resolves to a list of all frames in the file.

---

### 9. **getLocalStyles**

Fetches all the local styles used in a Figma file.

```javascript
export async function getLocalStyles(fileId);
```

**Parameters**:
- `fileId` (string): The ID of the Figma file.

**Returns**:
- A Promise that resolves to a list of all local styles used in the file.

---

### 10. **getMappedLocalStyles**

Fetches all local styles along with their detailed properties.

```javascript
export async function getMappedLocalStyles(fileId);
```

**Parameters**:
- `fileId` (string): The ID of the Figma file.

**Returns**:
- A Promise that resolves to an array of local styles mapped with their properties (e.g., color, font, size, etc.).

**Sample Output**:

```json
[
  {
    "styleId": "40:5",
    "styleKey": "19c421a6d37c39ef9468a567d32300861e718dc9",
    "name": "Heading1",
    "type": "TEXT",
    "description": "",
    "fontSize": 24,
    "fontFamily": "Roboto",
    "color": "#000000"
  },
  {
    "styleId": "2:5",
    "styleKey": "02dba491fe58aac06c7edd70ff86474705cf7c1c",
    "name": "Primary",
    "type": "FILL",
    "description": "",
    "color": "#FF0000"
  }
]
```

---

## Example Usage

Here’s a simple example that demonstrates how to use the `initialize` function and other methods in DropIT:

```javascript
import { initialize, getFigmaFile, getComponents, getStyles, getAllImages } from 'dropit-figma';

// Initialize the package with the Figma personal access token
initialize('your-figma-access-token');

// Fetch Figma file
const fileData = await getFigmaFile('your-file-id');
console.log(fileData);

// Fetch components
const components = await getComponents('your-file-id');
console.log(components);

// Fetch styles
const styles = await getStyles('your-file-id');
console.log(styles);

// Fetch all images
const images = await getAllImages('your-file-id');
console.log(images);
```



