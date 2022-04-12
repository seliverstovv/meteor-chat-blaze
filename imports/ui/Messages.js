import { ReactiveDict } from 'meteor/reactive-dict';
import { Template } from 'meteor/templating';
import { MessageCollection } from '/imports/db/MessageCollection';
import './Messages.html';
import { Meteor } from 'meteor/meteor';

const CURRENT_USER = 'currentUser';
const IS_LOADING = 'isLoading';

Template.messages.onCreated(function mainContainerOnCreated() {
    this.state = new ReactiveDict();
    this.state.set(CURRENT_USER, 'all');
    this.state.set(IS_LOADING, true);

    const handler = Meteor.subscribe('chat');
    Tracker.autorun(() => {
        this.state.set(IS_LOADING, !handler.ready());
    });
});

Template.messages.helpers({
    messages() {
        const instance = Template.instance();
        const currentUser = instance.state.get(CURRENT_USER);
        const filter = currentUser !== 'all' ? { userId: currentUser } : {};
        return MessageCollection.find(filter);
    },
    users() {
        return Meteor.users.find({});
    },
    user(userId) {
        const user = Meteor.users.findOne({ _id: userId });
        return { username: user.username, status: user.status.online };
    },
    isLoading() {
        const instance = Template.instance();
        return instance.state.get(IS_LOADING);
    },
    equals(userId) {
        const _id = Meteor.user()._id;
        return userId === _id;
    },
});

Template.messages.events({
    'click #deleteMessage'() {
        Meteor.call('message.remove', this._id);
    },
    'change #users-select'(event, instance) {
        instance.state.set(CURRENT_USER, event.target.value);
    },
});
