const request = require('superagent-bluebird-promise');
const config = require('../server/config');
const cookie = require('cookie');

module.exports = () => {
    let credentials;
    try {
        credentials = require('../credentials');
    } catch (e) {
        throw 'Credentials not set.  Please run "node boostrap-ms.js"';
    }
    
    const agent = request.agent({
        keepAliveTimeout: 30000
    });

    return agent
        .post(`${config.targetRoot}/ucp.php?mode=login`)
        .type('form')
        .send({username: credentials.username, password: credentials.password, login: 'login'})
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
};

