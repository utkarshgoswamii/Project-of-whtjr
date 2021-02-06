new Vue({
  el: '#app-root',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack() {
      let damage = this.calculateDamage(4, 11);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits Monster for: ${damage}`
      });
      if (this.checkWin())
        return;
      this.monsterAttacks();
    },
    specialAttack() {
      let damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits Monster hard for: ${damage}`
      });
      if (this.checkWin())
        return;
      this.monsterAttacks();
    },
    heal() {
      let playerHealthBefore = this.playerHealth;
      if (this.playerHealth <= 90)
        this.playerHealth += 10;
      else
        this.playerHealth = 100;
      let playerHealUp = this.playerHealth - playerHealthBefore;
      if (playerHealUp > 0) {
        this.turns.unshift({
          isPlayer: true,
          text: `Player heals up for: ${playerHealUp}`
        });
      } else {
        this.turns.unshift({
          isPlayer: false,
          text: `Dear Player, you are already 100... no more healing!`
        });
      }
    },
    giveUp() {
      this.gameIsRunning = false;
    },
    monsterAttacks() {
      let damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: `Monsters hits Player for: ${damage}`
      });
      this.checkWin();
    },
    calculateDamage(minDamage, maxDamage) {
      return Math.max(Math.floor(Math.random() * maxDamage) + 1, minDamage);
    },
    checkWin() {
      if (this.monsterHealth <= 0) {
        if (confirm('Congrats, you won! New Game?'))
          this.startGame();
        else
          this.gameIsRunning = false;
        return true;
      } 
      else if (this.playerHealth <= 0) {
        if (confirm('Sorry, you lost. New Game?'))
          this.startGame();
        else
          this.gameIsRunning = false;
        return true;
      }
      return false;
    }
  }
});