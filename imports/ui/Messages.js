import { ReactiveDict } from 'meteor/reactive-dict';
import { Template } from 'meteor/templating';
import { MessageCollection } from '/imports/db/MessageCollection';
import './Messages.html';
import { Meteor } from 'meteor/meteor';

const CURRENT_USER = 'currentUser';
const IS_LOADING = 'isLoading';
const IS_DISABLED_SUBMIT = 'isDisabledSubmitBtn';

Template.messages.onCreated(function mainContainerOnCreated() {
    this.state = new ReactiveDict();
    this.state.set(CURRENT_USER, 'all');
    this.state.set(IS_LOADING, true);
    this.state.set(IS_DISABLED_SUBMIT, true);

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
    isDisabledSubmit() {
        const instance = Template.instance();
        return instance.state.get(IS_DISABLED_SUBMIT);
    },
    equals(userId) {
        const _id = Meteor.user()?._id;
        return userId === _id;
    },
});

Template.messages.events({
    'submit #chat-form'(event, instance) {
        event.preventDefault();

        const target = event.target;
        const text = target.text.value.trim();

        if (text.length !== 0) {
            Meteor.call('message.insert', text);
            Meteor.call('usersData.push');
            target.text.value = '';
            instance.state.set(IS_DISABLED_SUBMIT, true);
        }
    },
    'keyup #chat-input'(event, instance) {
        const target = event.target;
        const text = target.value.trim();

        if (text.length !== 0) {
            instance.state.set(IS_DISABLED_SUBMIT, false);
        } else {
            instance.state.set(IS_DISABLED_SUBMIT, true);
        }
    },
    'click #deleteMessage'() {
        Meteor.call('message.remove', this._id);
        Meteor.call('usersData.pop');
    },
    'change #users-select'(event, instance) {
        instance.state.set(CURRENT_USER, event.target.value);
    },
});
