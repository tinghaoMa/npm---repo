const chalk = require('chalk');
const log = console.log;

log(chalk.blue('Hello world!'));

log(chalk.blue('Hello') + ' World' + chalk.red('!'));

log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));

log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));

log(chalk.green(
    'I am a green line ' +
    chalk.blue.underline.bold('with a blue substring') +
    ' that becomes green again!'
));


const name = 'Sindre';
log(chalk.green('Hello %s'), name);


const miles = 18;
const calculateFeet = miles => miles * 5280;

log(chalk`
  There are {bold 5280 feet} in a mile.
  In {bold ${miles} miles}, there are {green.bold ${calculateFeet(miles)} feet}.
`);