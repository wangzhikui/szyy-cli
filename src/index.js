/**
 * SZYY 工程脚手架
 * @author  Allen(wangzhk@yonyou.com)
 * @date    2019-11-01 11:14:35
 */

const chalk = require('chalk');
const getDownloadUcf = require('./getDownloadUcf');
const getAutoUpdate = require('./getAutoUpdate');

//检查更新

getAutoUpdate();

function getHelp() {
    console.log(chalk.green.bold(" Usage : "));
    console.log();
    console.log(chalk.green(" ucf init \t 🚀 Create a standard microservice front-end project"));
    console.log();
    console.log(chalk.green(" ucf new app \t ☁️  Create a module page \n \t\t ⚠️  There are two types of pages: separate pages and separate pages containing routing."));
    console.log();
}

function getVersion() {
    console.log(chalk.green('👉  ' + require("../package.json").version));
}

module.exports = {
    plugin: function (options) {
        commands = options.cmd;
        pluginname = options.name;
        if (options.argv.h || options.argv.help) {
            getHelp();
        }
        if (options.argv.v || options.argv.version) {
            getVersion();
        }
    
        let action = options.argv._[0],
            param = options.argv._[1];
        switch (action) {
            case 'init':
                getDownloadUcf(param);
            default:
                getHelp();
                break;
        }

    }
}