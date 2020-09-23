// deprecated
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const PRIORITY = require('./constants');

const messageBoxes = [
  {
    userId: 123456,
    mails: [{
      id: 1,
      sender: 'foo',
      sendTimeISO: '2020-09-01T12:00:00+09:00',
      title: 'title desu',
      priority: PRIORITY.URGENT,
    },
    {
      id: 2,
      sender: 'bar',
      sendTimeISO: '2020-09-02T12:00:00+09:00',
      title: 'title2 desu',
      priority: PRIORITY.HIGH,
    }],
  },
  {
    userId: 234567,
    mails: [{
      id: 3,
      sender: 'baz',
      sendTimeISO: '2020-09-03T12:00:00+09:00',
      title: 'title3 desu',
      priority: PRIORITY.MIDDLE,
    },
    {
      id: 4,
      sender: 'hoge',
      sendTimeISO: '2020-09-04T12:00:00+09:00',
      title: 'title4 desu',
      priority: PRIORITY.LOW,
    }],
  },
]

app.get('/api/v1/inbox/:id', function (req, res) {
  try {
    const messages = messageBoxes.find(item => item.userId === Number(req.params.id));
    const payload = JSON.stringify(messages.mails);
    const token = jwt.sign(payload, 'secret');
    res.header('Access-Control-Allow-Origin', '*')
    res.json(token);
  } catch (e) {
    console.log(e);
    res.send('error');
  }
})

app.listen(3001, () => {
  console.log('listen on http://localhost:3001');
})