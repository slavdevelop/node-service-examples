const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
        maxlength: 100
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },

    created: {
        type: Date,
        default: Date.now
    },

    reactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Reaction'
    }]
});

module.exports = model('Comment', commentSchema);