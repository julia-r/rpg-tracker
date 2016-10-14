storage = {
    fetch: function (key) {
        return JSON.parse(localStorage.getItem(key) || 0);
    },
    save: function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};


new Vue({
    el: '#app',
    data: {
        maxHP: storage.fetch("maxHP"),
        currentHP: storage.fetch("currentHP"),
        currentHeal: "",
        currentHit: "",
        coinsCopper: storage.fetch("coinsCopper"),
        coinsSilver: storage.fetch("coinsSilver"),
        coinsGold: storage.fetch("coinsGold"),
        coinsPlatinum: storage.fetch("coinsPlatinum"),
        copperAmountPlus: "",
        silverAmountPlus: "",
        goldAmountPlus: "",
        platinumAmountPlus: "",
        copperAmountMinus: "",
        silverAmountMinus: "",
        goldAmountMinus: "",
        platinumAmountMinus: "",
        log: [],
    },
    computed: {
        HPbarWidth: function () {
            return (100 / this.maxHP * this.currentHP);
        }
    },

    /* This is for putting current values into local storage */
    watch: {
        maxHP: {
            handler: function (maxHP) {
                storage.save("maxHP", maxHP);
            }
        },
        currentHP: {
            handler: function (currentHP) {
                storage.save("currentHP", currentHP);
            }
        },
        coinsCopper: {
            handler: function (coinsCopper) {
                storage.save("coinsCopper", coinsCopper);
            }
        },
        coinsSilver: {
            handler: function (coinsSilver) {
                storage.save("coinsSilver", coinsSilver);
            }
        },
        coinsGold: {
            handler: function (coinsGold) {
                storage.save("coinsGold", coinsGold);
            }
        },
        coinsPlatinum: {
            handler: function (coinsPlatinum) {
                storage.save("coinsPlatinum", coinsPlatinum);
            }
        }
    },
    methods: {
        getRandomInt: function (max) {
            var min = 1;
            return Math.floor(Math.random() * (max - min)) + min;
        },
        drinkPotion: function () {
            var potion = this.getRandomInt(8) + 1;
            this.currentHP = this.currentHP + potion;

            if (this.currentHP > this.maxHP) {
                this.currentHP = this.maxHP;
            }
        },
        heal: function (healHP) {
            if (healHP) {
                this.currentHP = parseInt(this.currentHP) + parseInt(healHP);

                if (this.currentHP > this.maxHP) {
                    this.currentHP = this.maxHP;
                }
                this.currentHeal = "";
            }
        },
        hit: function (hitHP) {
            if (hitHP) {
                this.currentHP = parseInt(this.currentHP) - parseInt(hitHP);

                if (this.currentHP < 0) {
                    this.currentHP = 0;
                }
                this.currentHit = "";
            }
        },

        /* @TODO: can those two be refactored into one function? */
        addMoney: function (platinumAmountPlus, goldAmountPlus, silverAmountPlus, copperAmountPlus) {
            if (platinumAmountPlus) {
                this.coinsPlatinum = parseInt(this.coinsPlatinum) + parseInt(platinumAmountPlus);
                this.platinumAmountPlus = "";
            }

            if (goldAmountPlus) {
                this.coinsGold = parseInt(this.coinsGold) + parseInt(goldAmountPlus);
                this.goldAmountPlus = "";
            }

            if (silverAmountPlus) {
                this.coinsSilver = parseInt(this.coinsSilver) + parseInt(silverAmountPlus);
                this.silverAmountPlus = "";
            }

            if (copperAmountPlus) {
                this.coinsCopper = parseInt(this.coinsCopper) + parseInt(copperAmountPlus);
                this.copperAmountPlus = "";
            }
        },
        removeMoney: function (platinumAmountMinus, goldAmountMinus, silverAmountMinus, copperAmountMinus) {
            if (platinumAmountMinus) {
                this.coinsPlatinum = parseInt(this.coinsPlatinum) - parseInt(platinumAmountMinus);
                this.platinumAmountMinus = "";
            }

            if (goldAmountMinus) {
                this.coinsGold = parseInt(this.coinsGold) - parseInt(goldAmountMinus);
                this.goldAmountMinus = "";
            }

            if (silverAmountMinus) {
                this.coinsSilver = parseInt(this.coinsSilver) - parseInt(silverAmountMinus);
                this.silverAmountMinus = "";
            }

            if (copperAmountMinus) {
                this.coinsCopper = parseInt(this.coinsCopper) - parseInt(copperAmountMinus);
                this.copperAmountMinus = "";
            }
        },
        convertMoney: function () {
            var converted;
            if (this.coinsCopper >= 10) {
                converted = Math.floor(this.coinsCopper / 10);
                this.coinsCopper = this.coinsCopper - (converted * 10);
                this.coinsSilver += converted;
            }
            if (this.coinsSilver >= 10) {
                converted = Math.floor(this.coinsSilver / 10);
                this.coinsSilver = this.coinsSilver - (converted * 10);
                this.coinsGold += converted;
            }
            if (this.coinsGold >= 10) {
                converted = Math.floor(this.coinsGold / 10);
                this.coinsGold = this.coinsGold - (converted * 10);
                this.coinsPlatinum += converted;
            }
        }
    },
    config: {
        debug: true
    }
});
