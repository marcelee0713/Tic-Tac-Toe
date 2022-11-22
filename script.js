const Formatter = (function () {
    const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);

    const makeUppercase = (text) => {
        log("Making uppercase");
        return text.toUpperCase();
    };

    return {
        makeUppercase,
    }
})();


let x = Formatter;
console.log(typeof x);


