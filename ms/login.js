const request = require('superagent-bluebird-promise');
const config = require('../server/config');
const cookie = require('cookie');

module.exports = () => {
    if (process.argv.length < 3) {
        console.log("Missing: password");
        process.exit(1);
    }
    
    const agent = request.agent({
        keepAliveTimeout: 30000
    });

    return agent
        .post(`${config.targetRoot}/ucp.php?mode=login`)
        .type('form')
        .send({username: 'borkjerfkin', password: process.argv[2], login: 'login'})
        .then(res => {
            if (res.header['set-cookie']) {
                const cookies = res.header['set-cookie'].map(cookie.parse);
                if (cookies.some(e => (e['ms_phpbb3_u'] || "1") !== "1")) {
                    return {agent};
                } else {
                    throw 'Unable to login';
                }
            }
            else {
                throw 'No cookies returned';
            }
        })
        .catch(err => {
            console.log(err);
        })
};

