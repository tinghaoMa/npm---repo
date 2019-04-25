var argv = require('minimist')(process.argv.slice(2));

console.log(argv['platform'])
console.log(argv['env'])



var argv2 = require('minimist')(process.argv.slice(2),{
    string:["platform"],
    env:["env"]
});
console.log(argv2.platform)
console.log(argv2.env)


// npm run nn -- --platform=alipay --env=pro