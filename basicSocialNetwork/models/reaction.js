const { model, Schema } = require('mongoose');
const { reactionTypes, reactionDefaultValue } = require('../constants/reactionConstants');

const reactionSchema = new Schema({
    resourceId: {
        type: String,
        required: true
    },

    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    active: {
        type: Boolean,
        default: false
    },

    value: {
        type: String,
        enum: reactionTypes,
        default: reactionDefaultValue
    }
});

module.exports = model('Reaction', reactionSchema);
