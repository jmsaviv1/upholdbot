/**
 * Class for use with price oscillation bot.
 */
export default class CurrencyPair {
    /**
     * @param {string} pairName The name of the currency pair.
     * @param {number} oscillationLimit The rate of oscillation that the user wishes to be notified about.
     */
    constructor(pairName, oscillationLimit) {
        this._pairName = pairName;
        this._oscillationLimit = oscillationLimit;
        this._initialBid;
        this._initialAsk;
        this._currentBid;
        this._currentAsk;
    }

    get pairName() {
        return this._pairName;
    }

    set currentAsk(newAsk) {
        return this._currentAsk = newAsk;
    }

    set currentBid(newBid) {
        return this._currentBid = newBid;
    }

    set initialAsk(newAsk) {
        return this._initialAsk = newAsk;
    }

    set initialBid(newBid) {
        return this._initialBid = newBid;
    }

    /**
     * Calculates the initial rate of the currency pair when the program starts.
     * @returns {number} The initial rate.
     */
    initialRate() {
        return this._calculateRate(this._initialBid, this._initialAsk);
    }

    /**
     * Calculates the change between the initial rate and the current rate of the currency pair.
     * @returns {number} The change in rate.
     */
    _rateChange() {
        return (this._currentRate() / this.initialRate()) - 1.0;
    }

    /**
     * Calculates the most recent rate of the currency pair.
     * @returns {number} The current rate.
     */
    _currentRate() {
        return this._calculateRate(this._currentBid, this._currentAsk);
    }

    /**
     * Calculates a given rate by taking the average of the bid and ask prices of the currency pair.
     * @param {number} bid The bid price of the currency pair.
     * @param {number} ask The ask price of the currency pair.
     * @returns {number} The calculated rate.
     */
    _calculateRate(bid, ask) {
        return (parseFloat(bid) + parseFloat(ask)) / 2.0;
    }

    /**
     * Compares the rate change against the oscillation limit. If it is above or below the limit,
     * then the user is notified.
     */
    compareRates() {
        const rateChange = this._rateChange();

        if(rateChange >= this._oscillationLimit) {
            console.log(`PRICE OSCILLATION ALERT: ${this._pairName} rate has risen from ${this.initialRate()} to ${this._currentRate()}.`);
        } else if(rateChange <= this._oscillationLimit * -1) {
            console.log(`PRICE OSCILLATION ALERT: ${this._pairName} rate has fallen from ${this.initialRate()} to ${this._currentRate()}.`);
        }
    }
}