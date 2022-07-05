const Meetup = require('./meetup');
const User = require('./user');

const queries = {
    getAllMeetups: async () => {
        return await Meetup.find({});
    },
    getMeetupById: async (id) => {
        return await Meetup.findById(id);
    },
    getMeetupByUserName: async (name) => {
        return await Meetup.find({ creator: name });
    },
    getMeetupByUserEmail: async (email) => {
        return await Meetup.find({ creator: email });
    },
    addMeetup: async (meetup) => {
        return await Meetup.create(meetup);
    },
    getAllUsers: async () => {
        return await User.find({});
    },
    getUserByEmail: async (email) => {
        return await User.findOne({ email: email });
    },
    getUserByUsername: async (username) => {
        return await User.findOne({ username: username });
    },
    addUser: async (user) => {
        return await User.create(user);
    },
    addMeetupToUserCreator: async (userEmail, meetup) => {
        let a = { meetupsCreated: meetup, state: "PENDING" , bestLocation: "", bestTime: [] };
        return await User.findOneAndUpdate({ email: userEmail }, { $push: { meetupsCreated: a } }, { new: true });
    },
    addMeetupToInvitees: async (invitees, meetup) => {
        for (let i = 0; i < invitees.length; i++) {
            return await User.findOneAndUpdate({ email: invitees[i] }, { $push: { meetupsPending: meetup } }, { new: true });
        }
    }
};

module.exports = queries;