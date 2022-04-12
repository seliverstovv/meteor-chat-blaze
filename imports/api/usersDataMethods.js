import { UserDataCollection } from '/imports/db/UserDataCollection';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'usersData.push'() {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const findUser = UserDataCollection.findOne({ userId: this.userId });

        if (findUser) {
            UserDataCollection.update({ _id: findUser._id }, {
                $set: { countMessages: findUser.countMessages + 1 },
            });
        } else {
            UserDataCollection.insert({
                userId: this.userId,
                countMessages: 1,
            });
        }
    },

    'usersData.pop'() {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const findUser = UserDataCollection.findOne({ userId: this.userId });

        if (findUser.countMessages === 1) {
            UserDataCollection.remove(findUser._id);
        } else {
            UserDataCollection.update({ _id: findUser._id }, {
                $set: { countMessages: findUser.countMessages - 1 },
            });
        }
    },
});