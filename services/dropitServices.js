import { getFigmaFile, getAllPages, getAllScreens, getLocalStylesWithDetails, getAllImages } from '../utils/functions.js';
import { AppSkeleton } from '../utils/skeletons.js';

/**
 * Fetches and constructs an App object based on a Figma file.
 * 
 * This function retrieves a Figma file using its ID, extracts pages and screens 
 * from the file, and organizes them into an App object.
 * 
 * @param {string} figmaFileID - The ID of the Figma file to fetch.
 * @returns {Promise<Object>} - A Promise that resolves to the constructed App object.
 * 
 * @throws {Error} - Throws an error if fetching the Figma file or processing fails.
 * 
 * Example usage:
 * ```typescript
 * const app = await _getApp('FIGMA_FILE_ID');
 * console.log(app);
 * ```
 */
const _getApp = async (figmaFileID) => {
    let app = AppSkeleton;

    try {

        // Fetch the Figma file by ID
        const figmaFile = await getFigmaFile(figmaFileID);
        if (!figmaFile) {
            throw new Error("Failed to fetch Figma file. Check the file ID.");
        }

        // Fetch local styles with details
        const styles = await getLocalStylesWithDetails(figmaFile)
        // Fetch all images from the Figma file
        const images = await getAllImages(figmaFile, figmaFileID);

        // Extract all pages from the Figma file
        const pages = getAllPages(figmaFile);

        // Process each page to extract screens and add them to the App object
        pages.forEach((page) => {
            const screens = getAllScreens(page);
            screens.forEach((screen) => {
                // Add the screen to the App object
                app.screens.push(screen);
            });
        });

        // Add the Figma file name, styles, and images to the App object
        app.name = figmaFile.name;
        app.styles = styles;
        app.images = images;

        return app;

    } catch (error) {
        console.log(error.response.data.err);
        return {
            error: error.response.data.err,
        }
    }
};

/**
 * Fetches all images from a Figma file.
 *  
 * This function retrieves all images from a Figma file using the Figma API.
 * 
 * @param {string} figmaFileID - The ID of the Figma file to fetch images from.
 * @param {Object} properties - Optional properties to customize the image fetching.
 * @param {string} properties.format - The image format to fetch, It can be "jpg", "png", "svg", or "pdf" (default: 'png').
 * @param {number} properties.scale - The image scale to fetch between 0.01 and 4 (default: 4).
 * @returns {Promise<Object>} - A Promise that resolves to an array of image objects.
 * 
 * @throws {Error} - Throws an error if fetching the images fails.
 * 
 * Example usage:
 * ```typescript
 * const images = await _getAppImages('FIGMA_FILE_ID');
 * console.log(images);
 * ```
 */
const _getAppIamges = async (figmaFileID, properties) => {
    try {

        // Fetch the Figma file by ID
        const figmaFile = await getFigmaFile(figmaFileID);
        if (!figmaFile) {
            throw new Error("Failed to fetch Figma file. Check the file ID.");
        }

        // Fetch all images from the Figma file
        const images = await getAllImages(figmaFile, figmaFileID, properties);
        return images;

    } catch (error) {
        return {
            error
        }
    }
};

export { _getApp, _getAppIamges };
