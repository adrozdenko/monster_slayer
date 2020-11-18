<template>
  <div id="app">
    <body>
      <header>
        <h1>Monster Slayer</h1>
      </header>
      <div>
        <section id="monster" class="container">
          <h2>Monster Health</h2>
          <div class="healthbar">
            <div class="healthbar__value" :style="monsterBarStyles"></div>
          </div>
        </section>
        <section id="player" class="container">
          <h2>Your Health</h2>
          <div class="healthbar">
            <div class="healthbar__value" :style="playerBarStyles"></div>
          </div>
        </section>
        <section class="container" v-if="winner">
          <h2>Game Over!</h2>
          <h3 v-if="winner === 'monster'">You lost!</h3>
          <h3 v-else-if="winner === 'player'">You won!</h3>
          <h3 v-else>It's a DRAW!</h3>
          <button @click="startNewGame">Start new game</button>
        </section>
        <section id="controls" v-else>
          <button @click="attackMonster">ATTACK</button>
          <button :disabled="allowSpecialAttack" @click="specialAttackMonster">
            SPECIAL ATTACK
          </button>
          <button @click="healPlayer">HEAL</button>
          <button @click="surrender">SURRENDER</button>
        </section>
        <section id="log" class="container">
          <h2>Battle Log</h2>
          <ul></ul>
        </section>
      </div>
    </body>
  </div>
</template>

<script>
import { getRandomInt } from "./utils";
export default {
  name: "App",
  data() {
    return {
      rounds: 0,
      monsterHealth: 100,
      playerHealth: 100,
      winner: null,
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    allowSpecialAttack() {
      return this.rounds % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // A draw
        this.winner = "draw";
      }
      if (value <= 0) {
        //Player lost
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // draw
        this.winner = "draw";
      }
      if (value <= 0) {
        // Monster lost
        this.winner = "player";
      }
    },
  },
  methods: {
    startNewGame() {
      this.rounds = 0;
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.winner = null;
    },
    attackMonster() {
      const attackValue = getRandomInt(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.rounds++;
    },
    attackPlayer() {
      const attackValue = getRandomInt(8, 15);
      this.playerHealth -= attackValue;
    },
    specialAttackMonster() {
      const attackValue = getRandomInt(10, 25);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.rounds++;
    },
    healPlayer() {
      const healValue = getRandomInt(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
      this.rounds++;
    },
    surrender() {
      this.winner = "monster";
    },
  },
};
</script>
