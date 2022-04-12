import { ReactiveDict } from 'meteor/reactive-dict';
import { check } from 'meteor/check';
import { Template } from 'meteor/templating';
import { MessageCollection } from '/imports/db/MessageCollection';
import './Messages.html';

const CURRENT_USER = 'currentUser';
const IS_LOADING = 'isLoading';

Template.messages.onCreated(function mainContainerOnCreated() {
    this.state = new ReactiveDict();
    this.state.set(CURRENT_USER, 'all');

    const handler = Meteor.subscribe('chat');
    Tracker.autorun(() => {
        this.state.set(IS_LOADING, !handler.ready());
    });
});

Template.messages.helpers({
    messages() {
        return MessageCollection.find({});
    },
    users() {
        return Meteor.users.find({});
    },
    isLoading() {
        const instance = Template.instance();
        return instance.state.get(IS_LOADING);
    },
});

Template.messages.events({
    'click #show-current-user-message'(event, instance) {
        instance.state.set(CURRENT_USER, event.target.value);
    },
    'click #deleteMessage'(messageId) {
        check(messageId, String);
        Meteor.call('message.remove', this._id);
    },
});
