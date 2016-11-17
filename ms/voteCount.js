const cheerio = require('cheerio');
const login = require('./login');
const config = require('../server/config');
const fs = require('fs');
const cookie = require('cookie');
const Promise = require('bluebird');
const Throttle = require('superagent-throttle')

login()
    .then(({agent}) => {
        // get csrf token and timestamp for our target
        return agent
            .get(`${config.targetRoot}/search.php?keywords=vote&t=59399&sf=msgonly&sd=a`)
            .then(res => {
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
                        .get(`${config.targetRoot}/search.php?keywords=vote&t=59399&sf=msgonly&sd=a&start=${i*25}`)
                        .use(throttle.plugin())
                        .then(res => {
                            console.log(i)
                            const messages = []
                            const $ = cheerio.load(res.text);
                            $('div.post').each((i, elem) => {
                                const author = $(elem).find('dt.author a').text();
                                messages.push(author);
                            })
                            return messages;
                        })
                        .catch(err => {
                            console.log(err)
                        });
                }));     
    })
    .then(promises => {
        promises.forEach(messages => {
            messages.forEach(message => {
                console.log(message)
            })
        })
    });