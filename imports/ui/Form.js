import './Form.html';

Template.form.events({
    'submit #chat-form'(event) {
        event.preventDefault();

        const target = event.target;
        const text = target.text.value;

        Meteor.call('message.insert', text);

        target.text.value = '';
    },
});