import { Meteor } from 'meteor/meteor';
import { MessageCollection } from '/imports/db/MessageCollection';
import { UserDataCollection } from '/imports/db/UserDataCollection';

Meteor.publish('chat', function publishMessages() {
    this.autorun(function () {
        const messages = MessageCollection.find();
        const activeUsers = UserDataCollection.find().map((item) => item.userId);

        const userSelector = { _id: { $in: activeUsers } };
        const users = Meteor.users.find(userSelector, { fields: { 'username': 1, 'status.online': 1 } });

        return [users, messages];
    });
});