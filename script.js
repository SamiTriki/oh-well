'use strict';
const history = require('./history');
const _ = require('lodash');
const moment = require('moment');

history.json(c => {
    console.log('MOST OCCURING WORDS', mostOccuringWords(c));
    console.log('MOST MESSAGY MONTH', time(c, 'month'));
    console.log('MESSAGES BY USER', messagesByUser(c));
    console.log('DIFFERENT WORDS BY 김혜미', differentWordsByPerson(c, '김혜미'))
});

const time = (conversation, period) => _(conversation)
    .groupBy((message) => moment(message.Date).startOf(period).format('LLL')) // Group by the period provided 'day', 'week', 'month', 'year'
    .map((message, day) => ({ count: message.length, day  }))
    .sort(countSort)
    .value();

const users = conversation => _(conversation)
    .groupBy('User')
    .map((message, name) => ({ name }))
    .value();

const messagesByUser = conversation => _(conversation)
    .groupBy('User')
    .map((messages, name) => ({ name, count: messages.length }))
    .value()

const mostOccuringWords = (conversation) => _(conversation)
    .map(c => c.Message.toLowerCase().split(' '))
    .flatten()
    .map((word) => ({ word, count: 1 }))
    .groupBy('word')
    .map((count, word) => ({ word, count: count.length }))
    .sort(countSort)
    .value();

const mostOccuringWordsByPerson = (conversation, person) => mostOccuringWords(conversation.filter(c => c.User === person));

const differentWords = conversation => mostOccuringWords(conversation).length;

const differentWordsByPerson = (conversation, person) => differentWords(conversation.filter(c => c.User === person));

const countSort = (a, b) => b.count - a.count;
/* sample messages
{ Date: '2016-04-06 07:23:14',
  User: '김혜미',
  Message: '(Emoticon)'
},
{ Date: '2016-04-06 10:15:58',
  User: 'Sami Triki',
  Message: 'Tu peux le faire !'
}
*/
