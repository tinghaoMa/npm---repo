const fs = require('fs-extra')

//返回Promise
// fs.copy('A/myfile.json', 'B/mynewfile.json').then(() => {
//     console.log('sucess')
// }).catch((e) => {
//     console.log(e)
//     console.log('error')
// })


// 异步方法，回调函数
// fs.copy('A/myfile.json', 'B/mynewfile.json', err => {
//     if (err) return console.error(err)
//     console.log('success!')
// })


// const myFile = fs.readFileSync('A/README.md', 'utf8');
//
// console.log(myFile)


const buildConfig={
    name:'mth',
    age:'22222',
    attr:[
        {
            a:'1',
            b:'2'
        }
    ]
}


fs.writeFileSync("./build.json", JSON.stringify(buildConfig,null,2));


