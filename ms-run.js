if (process.argv.length < 3) {
    console.log("Usage: node ms-run <command> [<addl args...]")
    process.exit(1);
}

const cmd = require(`./ms/${process.argv[2]}`)
try {
    cmd.apply(null, process.argv.slice(3))
        .then(result => {
            console.log(result)
        })
} catch (e) {
    console.error(e);
    process.exit(2);
}