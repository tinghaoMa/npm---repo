const execSync = require('child_process').execSync
execSync('rm -rf child')

execSync(`git log -n 1 --decorate --pretty=oneline`,{ stdio: 'inherit' });