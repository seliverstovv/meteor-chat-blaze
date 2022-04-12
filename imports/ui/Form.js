import { ReactiveDict } from 'meteor/reactive-dict';
import './Form.html';

const IS_DISABLED_SUBMIT = 'isDisabledSubmitBtn'

Template.messageForm.onCreated(function mainContainerOnCreated() {
    this.state = new ReactiveDict();
    this.state.set(IS_DISABLED_SUBMIT, true);
});

Template.messageForm.helpers({
    isDisabledSubmit() {
        const instance = Template.instance();
        return instance.state.get(IS_DISABLED_SUBMIT);
    }
});

Template.messageForm.events({
    'submit #chat-form'(event, instance) {
        event.preventDefault();

        const target = event.target;
        const text = target.text.value.trim();

        if (text.length !== 0) {
            Meteor.call('message.insert', text);
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
    }
});