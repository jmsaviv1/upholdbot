import inquirer from "inquirer";

/**
 * Questions to be prompted to the user if they choose to use the price oscillation bot.
 * @returns {Promise<any>} Answers to questions.
 */
export async function askOscillationModeQuestions() {
    const questions = [
        {
            type: 'checkbox',
            name: 'currencyPairs',
            message: 'What currency pair(s) would you like to moniter?',
            choices: ['BTC-USD', 'BTC-EUR', 'XRP-USD', 'XRP-EUR']
        },
        {
            type: 'list',
            name: 'oscillationLimit',
            message: 'At what percent change in price would like to be alerted?',
            choices: ['0.01','0.1', '1.0', '5.0', '10.0']
        },
        {
            type: 'list',
            name: 'fetchInterval',
            message: 'At what interval (in seconds) would you like to check the price?',
            choices: ['5', '10', '30', '60']
        },
    ]
    return inquirer.prompt(questions);
}

/**
 * Questions to be prompted to the user if they choose to use the simple moving average bot.
 * @returns {Promise<any>} Answers to questions.
 */
export async function askSMAModeQuestions() {
    const questions = [
        {
            type: 'list',
            name: 'currencyPair',
            message: 'What currency pair would you like to moniter?',
            choices: ['BTC-USD', 'BTC-EUR', 'XRP-USD', 'XRP-EUR']
        },
        {
            type: 'list',
            name: 'fetchInterval',
            message: 'At what interval (in seconds) would you like to check the price?',
            choices: ['5', '10', '30', '60']
        },
        {
            type: 'list',
            name: 'windowSize',
            message: 'How many price points would you like to use to calculate your average?',
            choices: ['10','100', '1000', '10000']
        },
    ]
    return inquirer.prompt(questions);
}

/**
 * Questions to be prompted to the user to determine if they want to check price oscillation or a
 * simple moving average.
 * @returns {Promise<any>} Answers to questions.
 */
export async function chooseBotMode() {
    const questions = [
        {
            type: 'list',
            name: 'botMode',
            message: 'What mode should the bot use?',
            choices: ['Price Oscillation Alert', 'Simple Moving Average'],
        }
    ]
    return inquirer.prompt(questions);
}


