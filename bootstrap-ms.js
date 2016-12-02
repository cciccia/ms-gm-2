const prompt = require('prompt');
const jsonfile = require('jsonfile')

const properties = [
    {
        name: 'username',
        description: 'Enter your MafiaScum username',
    },
    {
        name: 'password',
        description: 'Enter your MafiaScum password.  This is the only time you will ever have to do this. It will only be used to send requests to MS and will not be shared with anyone',
        hidden: true
    }
];

prompt.start();

prompt.get(properties, (err, result) => {
    jsonfile.writeFile('credentials.json', result, e => {
        if (e) console.error(e);
    });
});