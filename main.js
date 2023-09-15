const { exec } = require('child_process');
const fs = require('fs');

exec(`git describe --abbrev=0 --tags "$(git describe --abbrev=0 --tags)^"`, (err, tag, stderr) => {
    tag = tag.trim();

    if (err) {
        console.error('Could not find any tags because: ');
        console.error(stderr);
        process.exit(1);
    } 
    
    if (tag === "") {
        console.log(`Use default tag: ${process.env.INPUT_FALLBACK}`);
        fs.appendFileSync(process.env.GITHUB_OUTPUT, `tag=${process.env.INPUT_FALLBACK}\n`);
        process.exit(0);
    }

    console.log(`Found tag: ${tag}`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `tag=${tag}\n`);
    process.exit(0);

});