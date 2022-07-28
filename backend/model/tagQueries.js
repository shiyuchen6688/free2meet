const User = require('./user');
const natural = require('natural');

function trainNLP(X, y) {
    const classifier = new natural.BayesClassifier();
    for (let i = 0; i < X.length; i++) {
        classifier.addDocument(X[i], y[i]);
    }
    console.log("Starting training");
    classifier.train();
    console.log("Training complete");
    console.log("Classifier: " + classifier);
    console.log("Classifier.classify('A detailed description for Party 10 ...'): " + classifier.classify('A detailed description for Party 10 ...'));
    console.log("Classifier.classify(' I am a cat'): " + classifier.classify('I am a cat'));
    return classifier;
}

const tagQueries = {
    addTagToUser: async (user, meetup) => {
        let creator = await User.findOne({email: user});
        let updateTags = creator.tags;
        for (let i = 0; i < meetup.tags.length; i++) {
            let found = false;
            for (let j = 0; j < updateTags.length; j++) {
                if (meetup.tags[i] === updateTags[j].tag) {
                    updateTags[j].count++;
                    updateTags[j].details.push(meetup.description);
                    found = true;
                }
            }
            if (!found) {
                updateTags.push({
                    tag: meetup.tags[i],
                    details: [meetup.description],
                    count: 1
                });
            }
        }
        let updatedUser =  await User.findOneAndUpdate({ email: user }, { $set: { tags: updateTags } }, { new: true });
        tagQueries.trainNLP(user);
        return updatedUser;
    },
    trainNLP: async (userEmail) => {
        let creator = await User.findOne({email: userEmail});
        console.log(creator);
        if (creator.countFromPreviousTraining < 2) {
            return;
        } else {
            console.log('training NLP');
            let X = [];
            let y = [];
            for (let i = 0; i < creator.tags.length; i++) {
                for (let j = 0; j < creator.tags[i].details.length; j++) {
                    X.push(creator.tags[i].details[j]);
                    y.push(creator.tags[i].tag);
                }
            }
            console.log(X);
            console.log(y);
            let classifier = trainNLP(X, y);
            return await User.findOneAndUpdate({ email: userEmail }, { $set: { classifier: classifier } }, { new: true });
        }
    }
};

module.exports = tagQueries;