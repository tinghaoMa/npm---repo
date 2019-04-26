#!/usr/bin/env node

const  path=require('path')

console.log('build js run ')
console.log(process.env.npm_package_version); // 1.2.5
console.log(`__filename =${__filename}`)
console.log(`__dirname =${__dirname}`)
console.log(`process.cwd() =${process.cwd()}`)
console.log('./：', path.resolve('./'))
