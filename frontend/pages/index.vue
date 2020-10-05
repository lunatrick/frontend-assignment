<template>
  <div class="Mailbox">
    <h1 class="Mailbox__Title">
      Mailbox
    </h1>
    <div class="Mailbox__Form">
      <input v-model="id" type="number">
      <nuxt-link :to="`/inbox/${id}`">メールを開く</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 123456,
    };
  },
}
</script>
