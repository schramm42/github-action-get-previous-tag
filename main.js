const { appendFile } = require('node:fs/promises');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const main = async () => {
    try {
        const tagList = await getTagList()
        const currentTag = tagList.shift()
        const previousTag = tagList.shift()

        const lines = [
            `currentTag=${currentTag}`,
            `previousTag=${previousTag}`
        ].join('\n')
        
        console.log(lines)
        
        if (process.env.GITHUB_OUTPUT) {
            await appendFile(process.env.GITHUB_OUTPUT, `${lines}\n`)
        }

        process.exit(0)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

async function getTagList() {
    const { fetchStdout, fetchStderr } = await exec(`git fetch --tags -f`)
    const { stdout, stderr } = await exec(`git tag -l`)
    const list = stdout.split('\n').filter((val) => val != "").reverse()

    return list
}

main()