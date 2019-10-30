const Reaction = require('../models/reaction');
const { reactionDefaultValue, reactionTypes } = require('../constants/reactionConstants');

module.exports = {
    touch: async (req, res, next) => {
        const { userId, resourceId, value } = req.body;
        let currentValue = value;
        let defaultValueUsed = false;

        if (!reactionTypes.includes(value)) {
            currentValue = reactionDefaultValue;
            defaultValueUsed = true;
        }
        
        try {
            const reaction = await Reaction.findOne({ resourceId, userId });

            if (!reaction) {
                const newReaction = await Reaction.create({ resourceId, userId, value: currentValue, active: true });
                newReaction.save();

                return res.status(201).json({ message: 'Reaction created!', reaction: newReaction });

            } else if (reaction.active && !defaultValueUsed && currentValue !== reaction.value) {
                reaction.value = currentValue;
                reaction.save();

                return res.status(200).json({ message: 'Reaction was changed!', reaction });

            } else if (!reaction.active) {
                reaction.active = true;
                reaction.value = currentValue;

                reaction.save();

                return res.status(200).json({ message: 'Reaction was activated!', reaction });
            }

            reaction.active = false;
            reaction.value = currentValue;

            reaction.save();

            return res.status(200).json({ message: 'Reaction was deactivated!', reaction });

        } catch(err) {

            if (!err.status) {
                err.status = 500;
            }

            next(err);
        }
    },

    getReactionsByResourceId: async (req, res, next) => {
        const resourceId = req.body.resourceId;

        try {
            const reactions = await Reaction.find({ resourceId });

            if (reactions.length === 0) {
                res.status(200)
                    .json({ message: 'There are no reactions for this resource.', reactions });
            }

            res.status(200)
                .json({ message: 'Reactions fetched!', reactions });
        } catch(err) {
            if (!err.status) {
                err.status = 500;
            }

            next(err);
        }
    }
};