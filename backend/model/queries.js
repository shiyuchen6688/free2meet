const Meetup = require('./meetup');
const User = require('./user');

const queries = {
    // Returns all meetups
    getAllMeetups: async () => {
        return await Meetup.find({});
    },
    // Given a meetup id, returns the meetup
    getMeetupById: async (id) => {
        return await Meetup.findById(id);
    },
    // Given a new meetup, returns the meetup
    addMeetup: async (meetup) => {
        return await Meetup.create(meetup);
    },
    // Returns a list of all users
    getAllUsers: async () => {
        return await User.find({});
    },
    // Given a user email, returns the user object
    getUserByEmail: async (email) => {
        return await User.findOne({ email: email });
    },
    // Given a user info, returns the user object
    addUser: async (user) => {
        return await User.create(user);
    },
    // Given a user email and a meetup, returns the updated user object
    addMeetupToUserCreator: async (userEmail, meetup) => {
        return await User.findOneAndUpdate({ email: userEmail }, { $push: { meetupsCreated: meetup } }, { new: true });
    },
    // Given an array of emails, add the meetup to the meetupsPending of the user's invitees
    addMeetupToInvitees: async (invitees, meetup) => {
        for (let i = 0; i < invitees.length; i++) {
            return await User.findOneAndUpdate({ email: invitees[i] }, { $push: { meetupsPending: meetup } }, { new: true });
        }
    },
    // Given a user email and a meetup id, returns all the meetups that the user has accepted
    declineMeetup: async (userEmail, meetup) => {
        // remove meetup from user's meetupsPending
        await User.findOneAndUpdate({ email: userEmail }, { $pull: { meetupsPending: meetup } }, { new: true });
        // add meetup to user's meetupsDeclined
        await User.findOneAndUpdate({ email: userEmail }, { $push: { meetupsDeclined: meetup } }, { new: true });
        // get all pending meetups for user
        let meetupsPending = await this.getMeetupsPending(userEmail);
        // get all declined meetups for user
        let meetupsDeclined = await this.getMeetupsDeclined(userEmail);
        // await checkIfMeetupIsComplete(meetup);
        return { meetupsPending: meetupsPending, meetupsDeclined: meetupsDeclined };
    },
    // Given a user email and a meetup id and availability (locations and time slots), returns all pending and accepted meetups for that user
    acceptMeetup: async (userEmail, meetup, availableLocations, availableTimeSlots) => {
        // remove meetup from user's meetupsPending
        await User.findOneAndUpdate({ email: userEmail }, { $pull: { meetupsPending: meetup } }, { new: true });
        // add meetup to user's meetupsAccepted
        let a = { meetupId: meetup, availableLocations: availableLocations, availableTimeSlot: availableTimeSlots };
        await User.findOneAndUpdate({ email: userEmail }, { $push: { meetupsAccepted: a } }, { new: true });
        // get all pending meetups for user
        let meetupsPending = await this.getMeetupsPending(userEmail);
        // get all accepted meetups for user
        let meetupsAccepted = await this.getMeetupsAccepted(userEmail);
        // await checkIfMeetupIsComplete(meetup);
        return { meetupsPending: meetupsPending, meetupsAccepted: meetupsAccepted };
    },
    // Given a meetupId, returns all users who have not accepted or declined the meetup
    checkIfMeetupIsComplete: async (meetupId) => {
        // get all users who have not accepted or declined the meetup
        let inviteesNoDecisions = await User.find({ meetupsPending: meetupId });
        // if there are no invitees, then the meetup is complete
        if (inviteesNoDecisions.length === 0) {
            await Meetup.findOneAndUpdate({ id: meetupId }, { state: 'COMPLETED' }, { new: true });
            // TODO: calculate best location and time slots for meetup
        }
        // returns username and email fields for each invitee who have not accepted or declined the meetup
        return inviteesNoDecisions.map(invitee => {
            return { username: invitee.username, email: invitee.email };
        });
    },
    // Given a user email, returns the usernames and emails of all the friends of the user
    getFriends: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        // get all users who are friends of the user
        let friends = await User.find({ email: { $in: user.friends } });
        // keep friends username and email fields
        return friends.map(function (friend) {
            return { username: friend.username, email: friend.email };
        });
    },
    // Given a user email, returns the usernames and emails of all the users who have sent the user a friend request
    getFriendRequests: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        // get all users who are friends of the user
        let friendRequests = await User.find({ email: { $in: user.friendRequests } });
        // keep friends username and email fields
        return friendRequests.map(function (friend) {
            return { username: friend.username, email: friend.email };
        });        
    },
    // Given a user email, returns the usernames and emails of all the users who received the user's friend requests
    getFriendRequestsSent: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        // get all users who are friends of the user
        let friendRequestsSent = await User.find({ email: { $in: user.friendRequestsSent } });
        // keep friends username and email fields
        return friendRequestsSent.map(function (friend) {
            return { username: friend.username, email: friend.email };
        });
    },
    // Given a user email, returns the updated friend list of the user and the updated friend request list of the user
    acceptFriendRequest: async (userEmail, friendEmail) => {
        // remove friend request from user's friendRequests
        await User.findOneAndUpdate({ email: userEmail }, { $pull: { friendRequests: friendEmail } }, { new: true });
        // remove friend request from friend's friendRequestsSent
        await User.findOneAndUpdate({ email: friendEmail }, { $pull: { friendRequestsSent: userEmail } }, { new: true });
        // add friend to user's friends
        await User.findOneAndUpdate({ email: userEmail }, { $push: { friends: friendEmail } }, { new: true });
        // add user to friend's friends
        await User.findOneAndUpdate({ email: friendEmail }, { $push: { friends: userEmail } }, { new: true });
        // return updated friend list (including username and email) of user
        let newFriends = await this.getFriends(userEmail);
        // return updated friend request list (including username and email) of user
        let newFriendRequests = await this.getFriendRequests(userEmail);
        return { friends: newFriends, friendRequests: newFriendRequests };
    },
    // Given a user email, returns the updated friend request list (including username and email) of the user
    declineFriendRequest: async (userEmail, friendEmail) => {
        // remove friend request from user's friendRequests
        await User.findOneAndUpdate({ email: userEmail }, { $pull: { friendRequests: friendEmail } }, { new: true });
        // remove friend request from friend's friendRequestsSent
        await User.findOneAndUpdate({ email: friendEmail }, { $pull: { friendRequestsSent: userEmail } }, { new: true });
        return await this.getFriendRequests(userEmail);
    },
    // Given a user email and a friend email, returns updated friend request sent list (including username and email) of the user
    sendFriendRequest: async (userEmail, friendEmail) => {
        // add friend request to user's friendRequests
        await User.findOneAndUpdate({ email: userEmail }, { $push: { friendRequests: friendEmail } }, { new: true });
        // add friend request to friend's friendRequestsSent
        await User.findOneAndUpdate({ email: friendEmail }, { $push: { friendRequestsSent: userEmail } }, { new: true });
        return await this.getFriendRequestsSent(userEmail);
    },
    // Given a user email and a friend email, returns usernames and emails of all friends of the user
    deleteFriend: async (userEmail, friendEmail) => {
        // remove friend from user's friends
        await User.findOneAndUpdate({ email: userEmail }, { $pull: { friends: friendEmail } }, { new: true });
        // remove user from friend's friends
        await User.findOneAndUpdate({ email: friendEmail }, { $pull: { friends: userEmail } }, { new: true });
        return await this.getFriends(userEmail);
    },
    // Given a user email, returns all meetups they are invited to but have not yet accepted or declined
    getMeetupsPending: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        return await Meetup.find({ id: { $in: user.meetupsPending } });
    },
    // Given a user email, returns all meetups they are invited to and have accepted
    getMeetupsAccepted: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        return await Meetup.find({ id: { $in: user.meetupsAccepted } });
    },
    // Given a user email, returns all meetups they are invited to and have declined
    getMeetupsDeclined: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        return await Meetup.find({ id: { $in: user.meetupsDeclined } });
    },
    // Given a user email, returns all meetups they created
    getMeetupsCreated: async (userEmail) => {
        let user = await User.findOne({ email: userEmail });
        return await Meetup.find({ id: { $in: user.meetupsCreated } });
    },
    // Given a user email and new user info, returns all fields of updated user info
    updateUser: async (userEmail, user) => {
        return await User.findOneAndUpdate({ email: userEmail }, user, { new: true });
    }
};

module.exports = queries;