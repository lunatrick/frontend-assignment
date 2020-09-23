<template>
  <div class="Inbox">
    <h1 class="Inbox__Title">
      Inbox
    </h1>
    <ul class="Inbox__Messages">
      <li>メッセージ送信者: {{ sender }} </li>
      <li>メッセージ送信時間: {{ sendTimeISO }} </li>
      <li>タイトル: {{ title }} </li>
      <li>優先度: {{ priority }} </li>
    </ul> 
  </div>
</template>

<script>
const jwt = require('jsonwebtoken');
const axios = require('axios');

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// instantly avoid cors
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default {
  data() {
    return {
      sender: '',
      sendTime: '',
      title: '',
      priority: '',
    }
  },
  async mounted() {
    const url = `http://localhost:3001/api/v1/inbox/${this.$route.params.id}`;
    const res = await axios.get(url);
    const token = res.data;

    jwt.verify(token, 'secret', (err, data) => {
      if (!err) {
        this.sender = data.sender;
        this.sendTime = new Date(data.sendTimeISO).toLocaleString();
        this.title = data.title;
        this.priority = data.priority;
      }
      else console.log(err);
    })
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
