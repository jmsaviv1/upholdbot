import axios from "axios";

const url = "https://api.uphold.com/v0/ticker/";

/**
 * Gets price information for a given currency pair.
 * @param {string} currencyPair Name of currency pair to check price for.
 * @returns {object} Price information for given currency pair
 */
export async function getTickForCurrencyPair(currencyPair) {
    try {
        const response = await axios.get(`${url}${currencyPair}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

function handleError(error) {
    if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
    } else if (error.request) {
        console.error(error.request);
    } else {
        console.error('Unknown error has occurred')
    }
}