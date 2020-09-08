import { Meteor } from 'meteor/meteor';
import Tasks from '/imports/api/tasks';

function insertTask(text) {
  Tasks.insert({ text, createdAt: new Date() });
}
if (!Accounts.findUserByUsername('meteorite')) {
  Accounts.createUser({
    username: 'meteorite',
    password: 'password',
  });
}
//Populate DB with some task
if (Tasks.find().count() === 0) {
  [
    'First Task',
    'Second Task',
    'Third Task',
    'Fourth Task',
    'Fifth Task',
    'Sixth Task',
    'Seventh Task',
  ].forEach((task) => insertTask(task));
}
