<template>
  <div class="Inbox">
    <h1 class="Inbox__Title">
      Inbox
    </h1>
    <p>id: {{$route.params.id}}</p>
    <table>
      <thead>
        <td>送信者</td>
        <td>送信時間</td>
        <td>タイトル</td>
        <td>優先度</td>
      </thead>
      <tbody>
        <tr v-for="mail in mails" :key="mail.id" class="Inbox__Messages">
          <td> {{ mail.sender }} </td>
          <td> {{ mail.sendTimeISO | toReadableDate }} </td>
          <td> {{ mail.title }} </td>
          <td> {{ mail.priority }} </td>
        </tr>
      </tbody>
    </table>
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
      mails: [],
      // sender: '',
      // sendTime: '',
      // title: '',
      // priority: '',
    }
  },
  async mounted() {
    const url = `http://localhost:3001/api/v1/inbox/${this.$route.params.id}`;
    const res = await axios.get(url);
    console.log(res);
    const token = res.data;

    jwt.verify(token, 'secret', (err, data) => {
      if (!err) {
        this.mails = data;
      }
      else console.log(err);
    })
  },
  filters: {
    toReadableDate: function (dateISO) {
      if (!dateISO) return ''
      return new Date(dateISO).toString();
    }
  }
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
