const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const PRIORITY = require('./constants');

const messages = [
  [{
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
  [{
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
]

app.get('/api/v1/inbox/:id', function (req, res) {
  try {
    const payload = JSON.stringify(messages[Number(req.params.id)]);
    console.log(payload);
    const token = jwt.sign(payload, 'secret');
    console.log(token);
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