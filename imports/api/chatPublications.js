import { Meteor } from 'meteor/meteor';
import { MessageCollection } from '/imports/db/MessageCollection';

Meteor.publish('chat', function publishMessages() {
    const messages = MessageCollection.find();

    const activeUsersIds = new Set(messages.map((message) => message.userId));
    const userSelector = { _id: { $in: [...activeUsersIds] } };

    const users = Meteor.users.find(userSelector, { fields: { 'username': 1, 'status.online': 1 } });
    return [users, messages];
});