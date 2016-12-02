const jw = require('jaro-winkler');

const MATCH_THRESHOLD = 0.7;

module.exports = (slots, votePosts) => {

    const matchPairs = slots.reduce((p, c) => {
        return p
            .concat({id: c.id, name: c.player})
            .concat(c.player.split(' ').map(token => {return {id: c.id, name: token}}))
            .concat((c.aliases || []).map(alias => {return {id: c.id, name: alias}}))
    }, []);

    votePosts.forEach(votePost => {
        switch (votePost.action) {
        case 'unvote':
            console.log(`${votePost.author} unvoted.`);
            break;
        case 'vote':
            console.log(`${votePost.author} voted: ${votePost.content}`);
            const resolution = matchPairs.reduce((p, c) => {
                let distance;

                if (c.name.includes(votePost.content)) {
                    distance = 1;
                } else {
                    distance = jw(votePost.content, c.name, { caseSensitive: false });
                }
                return distance > p.distance ? {distance, match: c} : p
            }, {distance: 0});
            if (resolution.distance >= MATCH_THRESHOLD) {
                console.log(`Closest match was: ${resolution.match.name} (${resolution.distance}), referring to: ${slots.find(slot => slot.id === resolution.match.id).player}`);
            } else {
                 console.warn(`Closest match was: ${resolution.match.name} (${resolution.distance}), referring to: ${slots.find(slot => slot.id === resolution.match.id).player}. May require resolution.`);
            }
            break;
        default:
            console.error(`cannot parse action ${votePost.action}`);
        }
    })
};