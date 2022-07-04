const Meetup = require('./meetup');
const User = require('./user');

const queries = {
    getAllMeetups: async () => {
        return await Meetup.find({});
    },
    getMeetupById: async (id) => {
        return await Meetup.findById(id);
    },
    getMeetupByUserId: async (id) => {
        return await Meetup.find({ creator: id });
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
    getUsers: async () => {
        return await User.find({});
    },
    getUserById: async (id) => {
        return await User.findById(id);
    },
    addUser: async (user) => {
        return await User.create(user);
    },
    signIn: async (user) => {
        return await User.findOne({ username: user.username });
    }
};

module.exports = queries;