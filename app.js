import { setupBot } from "./src/bot.js";

/**
 * Main function that begins running on npm start.
 */
(async () => {
    try {
        await setupBot();
    } catch (error) {
        console.error(error);
    } 
})();
