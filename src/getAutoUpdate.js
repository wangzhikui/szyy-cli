/**
 * 检测当前是否有新版本，给出提示升级szyy-cli
 */

const request = require('request');
const chalk = require('chalk');
const path = require('path');

module.exports = () => {
    let version = require('../package.json').version;
    console.log(chalk.yellow.bold(`version ${version}`));
    console.log(chalk.yellow.bold(`npm install szyy-cli@${version} -g`));
    // request({ url: 'https://github.com/wangzhikui/szyy-cli/blob/master/src/ucf-cli-version.json' }, (error, response, body) => {
    //     let result = JSON.parse(body);
    //     let version = require('../package.json').version;
    //     if(result['szyy-cli'] != version){
    //         console.log(chalk.yellow.bold(`New version ${version} -> ${result['ucf-cli']}`));
    //         console.log(chalk.yellow.bold(`npm install szyy-cli@${result['szyy-cli']} -g`));
    //     }
    // });
}