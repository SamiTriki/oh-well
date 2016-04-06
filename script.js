'use strict';
const history = require('./history');
const _ = require('lodash');


history.json(c => {
    console.log(time(c));
});

const time = conversation => _(conversation)
    .groupBy('Date')
    .value();

const users = conversation => _(conversation)
    .groupBy('User')
    .map((messages, name) => ({name}))
    .value();

const countMessages = conversation => _(conversation)
    .groupBy('User')
    .map((messages, name) => ({name,count: messages.length}))
    .value()

const mostOccuringWords = conversation => _(conversation)
    .map(c => c.Message.toLowerCase().split(' '))
    .flatten()
    .map((word) => ({word, count: 1}))
    .groupBy('word')
    .map((count, word) => ({word, count: count.length}))
    .value()
    .sort((a, b) => b.count - a.count);

const mostOccuringWordsByPerson = (conversation, person) => mostOccuringWords(conversation.filter(c => c.User === person));

const differentWords = conversation => mostOccuringWords(conversation).length;

const differentWordsByPerson = (conversation, person) => differentWords(conversation.filter(c => c.User === person));

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
