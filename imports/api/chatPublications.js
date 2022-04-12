import { Meteor } from 'meteor/meteor';
import { MessageCollection } from '/imports/db/MessageCollection';

Meteor.publish('chat', function publishMessages() {
    const users = Meteor.users.find({}, {fields: { 'username': 1, 'status.online': 1 }});
    const messages = MessageCollection.find();
    return [users, messages];
});