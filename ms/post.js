const cheerio = require('cheerio');
const login = require('./login');
const config = require('../server/config');
const fs = require('fs');
const cookie = require('cookie');

module.exports = (password, topicId) => {
    return login(password)
        .then(({agent}) => {
            // get csrf token and timestamp for our target
            return agent
                .get(`${config.targetRoot}/posting.php?mode=reply&f=90&t=${topicId}`)
                .then(res => {
                    const $ = cheerio.load(res.text);
                    return {
                        agent,
                        form_token: $('form#postform input[name="form_token"]').attr().value,
                        creation_time: $('form#postform input[name="creation_time"]').attr().value,
                        topic_cur_post_id: $('form#postform input[name="topic_cur_post_id"]').attr().value,
                    };
                })
        })
        .then(({agent, creation_time, form_token, topic_cur_post_id}) => {
            setTimeout(() => {
                const req = agent
                      .post(`${config.targetRoot}/posting.php?mode=reply&f=90&t=64192`)
                      .type('form')
                      .set('Host', config.targetHost)
                      .set('Origin', config.targetRoot)
                      .set('Referer',`${config.targetRoot}/posting.php?mode=reply&f=90&t=64192`)
                      .send({message: 'jam',
                             post: 'Submit',
                             creation_time,
                             form_token, 
                             topic_cur_post_id,
                             lastclick: creation_time,
                             attach_sig: 'on',
                             addbbcode20: 100
                            })
                      .then(res => {
                          console.log(res.text);
                          return 'Post successful.';
                      });
            }, 2000);  //fuck phpbb
        });
}