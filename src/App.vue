<template>
  <div id="app">
    <button v-touch:start="playNote" v-touch:end="stopNote" @>Press me</button>
    <h1 :class="{playing:playing}">
      <span v-if="playing">Playing</span>
      <span v-else>Not Playing</span>
    </h1>
  </div>
</template>

<script>
export default {
  data: () => ({
    playing: false
  }),
  methods: {
    playNote() {
      this.$socket.emit("note_on", { message: 144 });
    },
    stopNote() {
      this.$socket.emit("note_off", { message: 144 });
    }
  },
  mounted() {
    this.$socket.on("played_note_on", () => {
      this.playing = true;
    });
    this.$socket.on("played_note_off", () => {
      this.playing = false;
    });
  }
};
</script>

<style>
.playing {
  color: cadetblue;
}
</style>
