import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '/imports/db/MessageCollection';
import '/imports/db/UserDataCollection';
import '/imports/api/chatMethods';
import '/imports/api/usersDataMethods';
import '/imports/api/chatPublications';

const users = [
    {
        username: 'one',
        password: '1234',
    },
    {
        username: 'two',
        password: '1234',
    },
    {
        username: 'three',
        password: '1234',
    },
    {
        username: 'four',
        password: '1234',
    },
    {
        username: 'five',
        password: '1234',
    },
    {
        username: 'six',
        password: '1234',
    },
];

Meteor.startup(() => {
    users.forEach(({ username, password }) => {
        if (!Accounts.findUserByUsername(username)) {
            Accounts.createUser({
                username,
                password,
            });
        }
    });
});