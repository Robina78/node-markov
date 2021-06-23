class MarkovMachine {
    /** build morkov chain generator using bigrams */
    constructor(text) {
        let words = text.split(/[ \r\n]+/);
        this.words = words.filter(char => char !== "");
        this.makeChains();
    };
    
    makeChains() {
        let chains = new Map();

        for (let i = 0; i < this.words.length -1; i++) {
            let bigram = this. words[i] + " " + this.words[i + 1];
            let nextWord = this.words[i + 2] || null;

            chains.has(bigram) ? chains.get(bigram).push(nextWord) : chains.set(bigram, [nextWord]);
        };
        this.chains = chains;
    };

    /** pick random choice from array */
    choice(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    };

    /** return random text from chains */
    makeText(numWords = 100) {
        //pick a random key to begin
        let keys = Array.from(this.chains.keys());
        let key = this.choice(keys);
        let result = [];

        // produce markov chain until reaching terminiation word
        while (result.length < numWords && key !== null) {
            let [word1, word2] = key.split(" ");
            result.push(word1);
            key = word2 + " " + this.choice(this.chains.get(key))
        };
        return result.join(" ");
    };
};

module.exports = {
    MarkovMachine,
};