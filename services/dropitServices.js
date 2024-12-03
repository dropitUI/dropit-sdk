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

    // Fetch the Figma file by ID
    const figmaFile = await getFigmaFile(figmaFileID);
    if (!figmaFile) {
        throw new Error("Failed to fetch Figma file. Check the file ID.");
    }

    // Fetch local styles with details
    const styles =  await getLocalStylesWithDetails(figmaFile)
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
};

export { _getApp };
