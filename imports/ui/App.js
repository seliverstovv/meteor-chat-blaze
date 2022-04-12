import { Template } from 'meteor/templating';
import './App.html';
import './Form';
import './Messages';
import './Login';

const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();
const isUserLoading = () => getUser() === undefined;

Template.chat.helpers({
    isUserLogged() {
        return isUserLogged();
    },
    getUser() {
        return getUser();
    },
    isUserLoading() {
        return isUserLoading()
    }
});

Template.chat.events({
    'click #log-out'() {
        Meteor.logout();
    },
});