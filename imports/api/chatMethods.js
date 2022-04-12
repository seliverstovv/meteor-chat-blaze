import { check } from 'meteor/check';
import { MessageCollection } from '../db/MessageCollection';

Meteor.methods({
    'message.insert'(text) {
        check(text, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        MessageCollection.insert({
            text,
            createdAt: new Date,
            userId: this.userId,
        });
    },

    'message.remove'(messageId) {
        check(messageId, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const task = MessageCollection.findOne({ _id: messageId, userId: this.userId });

        if (!task) {
            throw new Meteor.Error('Access denied.');
        }

        MessageCollection.remove(messageId);
    },
});