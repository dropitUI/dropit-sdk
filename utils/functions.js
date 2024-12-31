import { _getClient } from './figmaClient.js';



/**
 * Fetches a Figma file by its ID.
 * @param {string} fileId - The ID of the Figma file.
 * @returns {Promise<Object>} - The Figma file data.
 */
export async function getFigmaFile(fileId) {
  const { data } = await _getClient().file(fileId);
  return data;
}

export function getAllPages(figmaFile) {
  const pages = [];
  figmaFile?.document?.children.forEach((page) => {
    if (page?.type === 'CANVAS') {
      pages.push(page);
    }
  });
  return pages;
}

export function getAllScreens(page) {
  const screens = [];
  page?.children.forEach((screen) => {
    if (screen?.type === 'FRAME' || screen?.type === 'GROUP') {
      screens.push(screen);
    }
  });
  return screens;
}


/**
 * Fetches the components from a Figma file.
 * @param {string} fileId - The ID of the Figma file.
 * @returns {Promise<Object[]>} - List of components in the file.
 */
export async function getComponents(fileId) {
  const fileData = await getFigmaFile(fileId);
  return fileData.components || [];
}

/**
 * Fetches the styles by key.
 * @param {string} key - The key of the style.
 * @returns {Promise<Object>} - The Figma file Style data.
 */
export async function getStyle(key) {
  const { data } = await _getClient().style(key)
  return data;
}

/**
 * Fetches the Images from a Figma file.
 * @param {string} fileId - The ID of the Figma file.
 * @param {Array<String>} ids - Array of Component id e.g. ['2:1','3:3]
 * @returns {Promise<Object>} - The Figma file Images data.
 */
export async function getImagesByIds(fileId, ids) {
  const { data } = await _getClient().fileImages(fileId, { ids: ids })
  return data;
}

/**
 * Extracts all image fills from a Figma file.
 * This function recursively traverses the Figma document to find nodes with image fills.
 * 
 * @param {string} fileId - The ID of the Figma file.
 * @returns {Array<Object>} - An array of objects containing image details (node ID, name, and image reference).
 */
async function getAllImageFills(figmaFile) {
  try {

    // Retrieve the document structure
    const document = figmaFile.document;

    /**
     * Recursively searches nodes to find image fills.
     * @param {Array<Object>} nodes - List of nodes to search.
     * @param {Array<Object>} images - Accumulator for found images.
     * @returns {Array<Object>} - List of image fills found in the document.
     */
    const findImageFills = (nodes, images = []) => {
      nodes.forEach(node => {
        // Check if the node has fills and filter IMAGE fills
        if (node.fills && Array.isArray(node.fills)) {
          node.fills.forEach(fill => {
            if (fill.type === 'IMAGE' && fill.imageRef) {
              images.push({
                nodeId: node.id,
                imageRef: fill.imageRef,
                name: node.name,
              });
            }
          });
        }

        // Recursively search child nodes, if present
        if (node.children) {
          findImageFills(node.children, images);
        }
      });

      return images;
    };

    // Start the recursive search from the root node
    const images = findImageFills(document.children || []);
    return images;
  } catch (error) {
    console.error('Error fetching image fills:', error.message);
    throw error;
  }
}

/**
 * Fetches public URLs for image fills in a Figma file.
 * This function uses image references (`imageRef`) to fetch accessible URLs via Figma API.
 * 
 * @param {string} fileId - The ID of the Figma file.
 * @param {Array<Object>} images - List of image fills (objects with nodeId, imageRef, and name).
 * @returns {Promise<Object>} - An array of objects containing image details with public URLs.
 */
async function getImageUrls(fileId, images) {
  try {
    // Extract image keys from the image fills
    const imageKeys = images.map(image => image.nodeId);

    // Fetch public URLs for the image references
    const { data: imageUrls } = await _getClient().fileImages(fileId, { ids: imageKeys });

    // Map the URLs back to the image details
    return images.map((key, index) => ({
      nodeName: images[index].name,
      nodeId: images[index].nodeId,
      imageUrl: imageUrls.images[images[index].nodeId],
    }));
  } catch (error) {
    console.error('Error fetching image URLs:', error.message);
    throw error;
  }
}


export async function getAllImages(figmaFile, fileId) {
  const images = await getAllImageFills(figmaFile);
  const imageUrls = await getImageUrls(fileId, images);
  return imageUrls;
}

/**
 * Fetches detailed information about a style by its key.
 * @param {string} styleKey - The key of the style to fetch.
 * @returns {Promise<Object>} - Detailed information about the style.
 * @throws {Error} - If the style key is invalid or fetch fails.
 */
export async function getStyleDetailsByKey(styleKey) {
  try {
    const { data } = await _getClient().style(styleKey); // Fetch style details using figma-js
    return data;
  } catch (error) {
    console.error(`Failed to fetch details for style key: ${styleKey}`, error);
    throw new Error("Unable to fetch style details. Check the style key.");
  }
}



/**
 * Fetches all local styles with actual styling details (e.g., font, color).
 * @param {string} fileId - The ID of the Figma file.
 * @returns {Array<Object>} - List of local styles with their detailed properties.
 */
export async function getLocalStylesWithDetails(figmaFile) {
  const styles = figmaFile.styles || {};
  const nodes = figmaFile.document.children || [];

  // Function to find a node by its ID and extract style details
  const getStyleDetails = (styleId, baseStyle) => {
    for (const node of nodes) {
      if (node.styles && node?.styles[baseStyle?.styleType?.toLowerCase()] === styleId) {
        return node.styles;
      }
      // Recursively check child nodes
      if (node.children) {
        const childStyle = getStyleDetailsFromChildren(node.children, styleId, baseStyle);
        if (childStyle) return childStyle;
      }
    }
    return null;
  };

  const getStyleDetailsFromChildren = (children, styleId, baseStyle) => {
    for (const child of children) {
      if (child.styles && child?.styles[baseStyle?.styleType?.toLowerCase()] === styleId) {
        switch (baseStyle?.styleType) {
          case 'FILL':
            return { fills: child?.fills };
          case 'TEXT':
            return { textStyle: child?.style };
          case 'EFFECT':
            return { effects: child?.effects };
          default:
            return {};
        }
      }
      if (child.children) {
        const nestedStyle = getStyleDetailsFromChildren(child.children, styleId, baseStyle);
        if (nestedStyle) return nestedStyle;
      }
    }
    return null;
  };

  // Map styles to include detailed properties
  return Object.keys(styles).map((key) => {
    const baseStyle = styles[key];
    const details = getStyleDetails(key, baseStyle);
    return {
      styleId: key,
      styleKey: baseStyle.key,
      name: baseStyle.name,
      type: baseStyle.styleType,
      description: baseStyle.description || '',
      details, // Add detailed style properties
    };
  });
}