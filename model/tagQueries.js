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
    return classifier;
}

function getPredResults(classifier, text) {
    let clf = natural.BayesClassifier.restore(classifier)
    console.log("Predicting: ", text);
    let results = clf.getClassifications(text);
    console.log(results);
    return results;
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
        let updatedUser =  await User.findOneAndUpdate({ email: user }, { $set: { tags: updateTags }, $inc: {countFromPreviousTraining : 1} }, { new: true });
        tagQueries.trainNLP(user);
        return updatedUser;
    },
    trainNLP: async (userEmail) => {
        let creator = await User.findOne({email: userEmail});
        if (creator.countFromPreviousTraining < 3) {
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
            let classifier = trainNLP(X, y);
            return await User.findOneAndUpdate({ email: userEmail }, { $set: { model: JSON.stringify(classifier), countFromPreviousTraining: 0 } }, { new: true });
        }
    },
    classifyNLP: async (userEmail, text) => {
        let creator = await User.findOne({email: userEmail});
        if (creator.model !== "") {
            let classifier = JSON.parse(creator.model);
            let results = getPredResults(classifier, text);
            return results.map(tag => tag.label);
        } else {
            let tags = creator.tags.sort((a, b) => {
                return b.count - a.count;
            });
            return tags.map(tag => tag.tag);
        }
    }
};

module.exports = tagQueries;