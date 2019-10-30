const { model, Schema } = require('mongoose');

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        minlength: 10,
        required: true
    },

    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],

    reactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Reaction'
    }]
});

module.exports = model('Post', postSchema);
