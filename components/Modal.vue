<script>
export default {
  name: 'AppModal',
  methods: {
    openDialog() {
      this.$refs.dialog.showModal();
    },
    closeDialog() {
      this.$refs.dialog.close();
    },
    closeOnOuterClick(e) {
      const rect = this.$refs.dialog.getBoundingClientRect();
      const isInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;
      // console.debug(isInDialog);
      if (!isInDialog) {
        this.closeDialog();
      }
    }
  },
  expose: ['openDialog', 'closeDialog']
}
</script>

<template>
  <dialog ref="dialog" @click="closeOnOuterClick">
    <slot></slot>
  </dialog>
</template>

<style scoped>
dialog{
  @apply container bg-transparent w-full h-full;
}
dialog::backdrop {
  background-color: black;
  opacity: 0.5;
}
</style>
