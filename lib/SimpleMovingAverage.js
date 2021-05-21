/**
 * Class for use with simple moving average bot.
 */
export default class SimpleMovingAverage {
    /**
     * 
     * @param {string} pairName The name of the currency pair.
     * @param {number} windowSize The size of the window that will be used to calculate the moving average.
     */
    constructor(pairName, windowSize) {
        this._pairName = pairName;
        this._windowSize = windowSize;
        this._window = [];
    }

    get pairName() {
        return this._pairName;
    }

    /**
     * Adds a price to the window that will be used to take the moving average. If the window is full,
     * then the oldest price is discarded.
     * 
     * @param {number} bid The currenct bid price of the currency pair.
     * @param {number} ask The current ask price of the currency pair.
     */
    addPriceToWindow(bid, ask) {
        const price = (bid + ask) / 2;
        
        if (this._window.length === this._windowSize) {
            this._window.shift();
        }

        this._window.push(price);
    }

    /**
     * Calculates the simple moving average if the window is full, else does nothing.
     */

    calculateAverage() {
        if (this._window.length === this._windowSize) {
            let sum = 0;

            this._window.forEach(item => {
                sum += item;
            });

            const average = sum / this._windowSize;

            console.log(`Simple moving average for ${this._pairName} = ${average}`);
        }
    }

}