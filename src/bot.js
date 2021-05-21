import { getTickForCurrencyPair } from "../services/currencyPairService.js";
import CurrencyPair from "../lib/currencyPair.js";
import SimpleMovingAverage from "../lib/simpleMovingAverage.js";
import { askOscillationModeQuestions, chooseBotMode, askSMAModeQuestions, } from "../lib/inquirer.js";

// Globally scoped array of currency pairs to be used by the price oscillation bot.
const currencyPairs = [];

// Globally scoped variable that will be assigned an instance of the SimpleMovingAverage class
// to be used by the simple moving average bot.
let simpleMovingAverage = null;

/**
 * Asks user whether they want to start the price oscillation bot or the simple moving average bot,
 * then initializes the appropriate bot.
 */
export async function setupBot() {
    try {
        const botModeAnswers = await chooseBotMode();

        if (botModeAnswers['botMode'] === 'Price Oscillation Alert') {
            initOscBot();
        } else {
            initSMABot();
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

/**
 * Asks the user a series of questions, and uses that data to initialize the price oscillation bot.
 */
async function initOscBot() {
    const oscModeAnswers = await askOscillationModeQuestions();

    const fetchInterval = parseInt(oscModeAnswers['fetchInterval']) * 1000;
    const pairNames = oscModeAnswers['currencyPairs'];
    const oscillationLimit = parseFloat(oscModeAnswers['oscillationLimit']) * 0.01;

    setupCurrencyPairs(pairNames, oscillationLimit);

    oscBotStartAlert();

    setInterval(getTickForOscBot, fetchInterval);
}

/**
 * Asks the user a series of questions, and uses that data to initialize the simple moving average bot.
 */
async function initSMABot() {
    const SMAModeAnswers = await askSMAModeQuestions();

    const fetchInterval = parseInt(SMAModeAnswers['fetchInterval']) * 1000;
    const pairName = SMAModeAnswers['currencyPair'];
    const windowSize = parseInt(SMAModeAnswers['windowSize']);

    simpleMovingAverage = new SimpleMovingAverage(pairName, windowSize);

    SMABotStartAlert();

    setInterval(getTickForSMABot, fetchInterval);
}

/**
 * Gets bid and ask prices from currencyPairService for every currency pair that the user has chosen.
 * The first prices for each pair are used to set the initial price, and then subsequent prices are
 * user to set the current price and compare rates.
 */
async function getTickForOscBot() {
    for (const item of currencyPairs) {
        try {
            const response = await getTickForCurrencyPair(item.pairName);

            if (!item.initialRate()) {
                item.initialAsk = parseFloat(response.ask);
                item.initialBid = parseFloat(response.bid);
            } else {
                item.currentAsk = parseFloat(response.ask);
                item.currentBid = parseFloat(response.bid);
                item.compareRates();
            }
        } catch (error) {
            console.error(error);
        }
    }
}

/**
 * Gets bid and ask prices from currencyPairService and passes it to instance of SimpleMovingAverage
 * class to be processed.
 */
async function getTickForSMABot() {
    try {
        const response = await getTickForCurrencyPair(simpleMovingAverage.pairName);

        simpleMovingAverage.addPriceToWindow(parseFloat(response.bid), parseFloat(response.ask));
        simpleMovingAverage.calculateAverage();
    } catch (error) {
        console.error(error);
    }
}

/**
 * Sets up array of CurrencyPairs to poll prices for.
 * @param {Array<string>} pairNames Names of currency pairs that the oscillation bot is monitering.
 * @param {number} oscillationLimit Oscillation limit set by user.
 */
function setupCurrencyPairs(pairNames, oscillationLimit) {
    pairNames.forEach(item => {
        const pair = new CurrencyPair(item, oscillationLimit);
        currencyPairs.push(pair);
    });
}

/**
 * Alerts user that price oscillation bot is running.
 */
function oscBotStartAlert() {
    let pairNamesStr = ''

    currencyPairs.forEach(item => {
        pairNamesStr += item.pairName + ' ';
    })

    console.log(`Commencing price polling for ${pairNamesStr}`)
}

/**
 * Alerts user that SMA bot is running.
 */
function SMABotStartAlert() {
    console.log(`Commencing calculation of SMA for ${simpleMovingAverage.pairName}`);
}