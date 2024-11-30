import { Client } from 'figma-js';

let figmaClient = null; // Private variable to hold the client instance

/**
 * Initializes the Figma client with a personal access token.
 * @param {string} token - The Figma personal access token.
 */
export function initialize(token) {
  if (!token) {
    throw new Error('A valid Figma personal access token is required.');
  }
  figmaClient = Client({ personalAccessToken: token });
}

/**
 * Internal function to get the Figma client instance.
 * Throws an error if the client is not initialized.
 * @returns {Client} - The initialized Figma client.
 */
function getClient() {
  if (!figmaClient) {
    throw new Error('Figma client is not initialized. Call initialize(token) first.');
  }
  return figmaClient;
}

// Export only initialize for public use
export { getClient as _getClient }; // For internal use in the package
