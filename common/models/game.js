'use strict';

const msVoteCount = require('../../ms/voteCount');
const resolveVotes = require('../../server/resolveVotes');

module.exports = function(Game) {
    Game.voteCount = (id, cb) => {
        msVoteCount(id)
            .then(votePosts => {
                Game.findOne({id})
                    .then(game => {
                        game.slots((err, slots) => {
                            resolveVotes(slots, votePosts);
                            cb();
                        });
                    });
            });
    };

    Game.remoteMethod('voteCount', {
        accepts: [
            {arg: 'id', type: 'number', required: true}
        ],
        http: {
            path: '/:id/vote-count',
            verb: 'post'
        }
    });
};
