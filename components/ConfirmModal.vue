<script>
export default {
name: "ConfirmModal",
  emits : ['confirmAction', 'cancelAction']
}
</script>

<template>
  <div class="confirm-modal-container">
    <div class="confirm-modal">
      <h1 class="text-xl leading-none mb-2"><slot name="confirm-text"></slot></h1>
      <div class="flex flex-row justify-around py-3">
        <button class="rounded-sm p-1 w-28 bg-red-500 text-white" @click="$emit('confirmAction')">Si</button>
        <button class="rounded-sm p-1 w-28 bg-grey-light" @click="$emit('cancelAction')">No</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.confirm-modal-container{
  @apply flex justify-center items-center h-[80vh] w-full;
}

.confirm-modal{
  @apply bg-white rounded-sm overflow-hidden border-2 max-w-80 mx-auto p-3;
}

</style>
