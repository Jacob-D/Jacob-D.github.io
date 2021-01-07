const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const PATH = ['/english/ted'] // 需要读取的文件夹路径
const BASE_PREFIX = path.join(process.cwd(), 'pages')
const WORD_LIST = [] // 存储单词

for (let item of PATH) {
    item = path.join(BASE_PREFIX, item)
    console.log(item)
    readDir(item, (fileList) => {
        for (let f of fileList) {
            readFile(`${item}\\${f}`, (context) => {
                extractEnglishWord(context)
            })
        }
    })
}

function readDir (dirPath, cb) {
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.log(chalk.red(err))
            return
        }
        
        cb(files)
    })
}

function readFile (filePath, cb) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(chalk.red(err))
            return
        }

        let context = data.toString()
        // cb(context)
        // context = context.replace(/(?<=(?<=        )[A-z]+) /g, '</word> ')
        //     .replace(/ (?=([A-z]+)<\/word>)/g, ' <word>')
        context = context.replace(/>/g, '').replace(/<\/word>/g, '')

        fs.writeFile(filePath, context, () => {
            console.log(chalk.green('write file successed!'))
        })
    })
}

function extractEnglishWord (context, pattern = /\s{8}[A-z]*/) {
    const matchList = context.match(pattern)
    console.log(matchList.forEach(element => {
        console.log(element)  
    }))
}