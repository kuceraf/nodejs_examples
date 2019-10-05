function Greeter(lang) {
    this.greet = function () {
        switch (lang) {
            case 'en': return "Hello!";
            case 'fr': return "Bonjour!";
            case 'cz': return "Ahoj!";
            default: return "Don't speak that language"
        }
    }
}

module.exports = Greeter;