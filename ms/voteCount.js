const cheerio = require('cheerio');
const login = require('./login');
const config = require('../server/config');
const fs = require('fs');
const cookie = require('cookie');
const Promise = require('bluebird');
const Throttle = require('superagent-throttle')

module.exports = topicId => {
    return login()
        .then(({agent}) => {
            return agent
                .get(`${config.targetRoot}/search.php?keywords=vote&t=${topicId}&sf=msgonly&sd=a`)
                .then(res => {
                    fs.writeFile('test.html', res.text);
                    const $ = cheerio.load(res.text);
                    const pageCount = ($('.rightside.pagination a strong:last-child').html());
                    return {
                        agent,
                        pageCount
                    };
                })
        })
        .then(({agent, pageCount}) => {
            // tweak? sometimes everything just hangs; be conservative.
            const throttle = new Throttle({
                active: true,
                rate: 5,         
                ratePer: 2000,
                concurrent: 2    
            });

            return Promise.all(
                Array.from(new Array(parseInt(pageCount)).keys())
                    .map(i => {
                        return agent
                            .get(`${config.targetRoot}/search.php?keywords=vote&t=${topicId}&sf=msgonly&sd=a&start=${i*25}`)
                            .use(throttle.plugin())
                            .then(res => {
                                const messages = []
                                const $ = cheerio.load(res.text);
                                $('div.post').each((i, elem) => {
                                    const author = $(elem).find('dt.author a').text();

                                     $(elem)
                                        .find('.content')
                                        .find('span.bbvote, span.noboldsig')
                                        .not($('blockquote span.bbvote, blockquote span.noboldsig'))
                                        .not($('div.quotecontent span.bbvote, div.quotecontent span.noboldsig'))
                                        .each((i, e) => {
                                            console.log("Match:", $(e).html())
                                            messages.push({author,
                                                           content: $(e).text()});
                                        });
                                });
                                return messages;
                            })
                            .catch(err => {
                                console.log(err)
                            });
                    }));     
        })
        .then(promises => {
            const votePosts = [];
            promises.forEach(messages => {
                messages.forEach(message => {
                    if (message.content !== null) {
                        let sanitizedContent =/^\s*(unvote|vote)[:\s]*(.*)/ig.exec(message.content);

                        if (sanitizedContent != null) {
                            votePosts.push({
                                author: message.author,
                                action: sanitizedContent[1].toLowerCase(),
                                content: sanitizedContent[2].replace(/\W/g, '')
                            });
                        }
                    }
                })
            })
            return votePosts;
        });
}
