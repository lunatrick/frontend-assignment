const express = require('express');
const app = express();
import { PRIORITY } from './constants'

const messages = [
  {
    sender: 'foo',
    sendTimeISO: '2020-09-01T12:00:00+09:00',
    title: 'title desu',
    priority: PRIORITY.URGENT,
  },
  {
    sender: 'bar',
    sendTimeISO: '2020-09-02T12:00:00+09:00',
    title: 'title2 desu',
    priority: PRIORITY.HIGH,
  },
  {
    sender: 'baz',
    sendTimeISO: '2020-09-03T12:00:00+09:00',
    title: 'title3 desu',
    priority: PRIORITY.MIDDLE,
  },
  {
    sender: 'hoge',
    sendTimeISO: '2020-09-04T12:00:00+09:00',
    title: 'title4 desu',
    priority: PRIORITY.LOW,
  },
]

app.get('/api/v1/inbox/:id', function (req, res) {
  try {
    const payload = messages[Number(id)];
    const token = jwt.sign(payload, 'secret');
    res.json({token});
  } catch (e) {
    res.send('error');
  }
})