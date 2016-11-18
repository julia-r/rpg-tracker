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
        coinsTotalCopper: storage.fetch("coinsTotalCopper"),
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
        },
        coinsTotalCopper: {
            handler: function (coinsTotalCopper) {
                storage.save("coinsTotalCopper", coinsTotalCopper);
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

        getMoneyTotalInCopper: function () {
            this.coinsTotalCopper =  this.coinsCopper + 10 * this.coinsSilver + 100 * this.coinsGold + 1000 * this.coinsPlatinum;
        },

        /* @TODO: can those two be refactored into one function? */
        addMoney: function (platinumAmountPlus, goldAmountPlus, silverAmountPlus, copperAmountPlus) {
            this.getMoneyTotalInCopper();

            if (copperAmountPlus) {
                this.coinsTotalCopper += parseInt(copperAmountPlus);
                this.copperAmountPlus = "";
            }

            if (silverAmountPlus) {
                this.coinsTotalCopper += (parseInt(silverAmountPlus) * 10);
                this.silverAmountPlus = "";
            }

            if (goldAmountPlus) {
                this.coinsTotalCopper += (parseInt(goldAmountPlus) * 100);
                this.goldAmountPlus = "";
            }

            if (platinumAmountPlus) {
                this.coinsTotalCopper += (parseInt(platinumAmountPlus) * 1000);
                this.platinumAmountPlus = "";
            }

            this.convertMoneyFromCopper();
        },
        removeMoney: function (platinumAmountMinus, goldAmountMinus, silverAmountMinus, copperAmountMinus) {


            this.getMoneyTotalInCopper();

            if (copperAmountMinus) {
                this.coinsTotalCopper -= parseInt(copperAmountMinus);
                this.copperAmountMinus = "";
            }

            if (silverAmountMinus) {
                this.coinsTotalCopper -= (parseInt(silverAmountMinus) * 10);
                this.silverAmountMinus = "";
            }

            if (goldAmountMinus) {
                this.coinsTotalCopper -= (parseInt(goldAmountMinus) * 100);
                this.goldAmountMinus = "";
            }

            if (platinumAmountMinus) {
                this.coinsTotalCopper -= (parseInt(platinumAmountMinus) * 1000);
                this.platinumAmountMinus = "";
            }

            this.convertMoneyFromCopper();
        },
        convertMoneyFromCopper: function () {

            this.coinsCopper = this.coinsTotalCopper;
            this.coinsSilver = 0;
            this.coinsGold = 0;
            this.coinsPlatinum = 0;

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
