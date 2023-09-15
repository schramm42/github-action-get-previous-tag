const { exec } = require('child_process');
const fs = require('fs');
//const tagPrefix = `${process.env.INPUT_PREFIX || ''}*`;

exec(`git describe --abbrev=0 --tags $(git describe --abbrev=0 --tags)^`, (err, tag, stderr) => {
    tag = tag.trim();

    if (err) {
        console.error('\x1b[33m%s\x1b[0m', 'Could not find any tags because: ');
        console.error('\x1b[31m%s\x1b[0m', stderr);
        process.exit(1);
    } 
    
    if (tag === "") {
        let timestamp = Math.floor(new Date().getTime() / 1000);
        console.log('\x1b[33m%s\x1b[0m', 'Falling back to default tag');
        console.log('\x1b[32m%s\x1b[0m', `Use default tag: ${process.env.INPUT_FALLBACK}`);
        console.log('\x1b[32m%s\x1b[0m', `Found timestamp: ${timestamp}`);
        fs.appendFileSync(process.env.GITHUB_OUTPUT, `tag=${process.env.INPUT_FALLBACK}\n`);
        fs.appendFileSync(process.env.GITHUB_OUTPUT, `timestamp=${timestamp}\n`);
        process.exit(0);
    }

    console.log('\x1b[32m%s\x1b[0m', `Found tag: ${tag}`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `tag=${tag}\n`);
    process.exit(0);

});