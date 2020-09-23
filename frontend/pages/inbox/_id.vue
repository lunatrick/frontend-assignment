<template>
  <div class="Inbox">
    <h1 class="Inbox__Title">
      Inbox
    </h1>
    <p>inboxAlias: {{ inbox.inboxAlias }}</p>
    <table>
      <thead>
        <td>送信者</td>
        <td>送信時間</td>
        <td>タイトル</td>
        <td>優先度</td>
      </thead>
      <tbody>
        <tr v-for="(message, index) in inbox.messages" :key="index" class="Inbox__Messages">
          <td> {{ message.messageSender }} </td>
          <td> {{ message.messageAt | toReadableDate }} </td>
          <td> {{ message.messageSubject }} </td>
          <td> {{ message.messagePriority | toReadablePriority }} </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
const axios = require('axios');

export default {
  data() {
    return {
      inbox: {
        inboxAlias: null,
        messages: [],
      },
    }
  },
  async mounted() {
    const url = `https://coding-assignment-v1.now.sh/api/v1/inbox/${this.$route.params.id}`;
    const res = await axios.get(url);
    const token = res.data.payload;
    this.inbox = jwt_decode(token);
  },
  filters: {
    toReadableDate: function (dateISO) {
      if (!dateISO) return '';
      return new Date(dateISO).toString();
    },
    toReadablePriority: function (priorityNum) {
      // 0の方が緊急度が高い場合
      if (priorityNum == '0') return '緊急';
      if (priorityNum == '1') return '高';
      if (priorityNum == '2') return '中';
      if (priorityNum == '3') return '低';
      return priorityNum;
    }
  }
}
</script>