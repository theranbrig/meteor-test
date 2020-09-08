import { Meteor } from 'meteor/meteor';
import { Tasks } from '/imports/api/tasks';

if (!Accounts.findUserByUsername('meteorite')) {
  Accounts.createUser({
    username: 'meteorite',
    password: 'password',
  });
}
