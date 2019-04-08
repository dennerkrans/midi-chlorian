<template>
  <div id="app">
    <button @click.prevent="playNote">Press me</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    message: null
  }),
  methods: {
    playNote() {
      this.$socket.emit("note", { message: 64 });
    }
  },
  mounted() {
    this.$socket.on("played_note", data => {
      this.message = data.message;
    });
  }
};
</script>
