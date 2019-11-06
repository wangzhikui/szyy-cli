/**
 * SZYY 下载最新工程
 * @author  Allen(wangzhk@yonyou.com)
 * @date    2019-11-01 11:14:35
 * 1，询问项目名称
 * 2，询问模板项目
 * 3，下载模板项目到当前目录
 */

const chalk = require('chalk');
const path = require('path');
const pathExists = require('path-exists');
const download = require('download-git-repo');
const inquirer = require('inquirer');

module.exports = async (folderName = '.') => {
    let projectTemplate = 'ucf';
    const urlObj = {
        'ucf': 'iuap-design/ucf-webapp',
        'koa2-bff': 'wangzhikui/koa2-bff'
    }
    //项目名称
    if (folderName == '.') {
        let inquirerProjectName = await inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: 'Project Name:',
            default: function () {
                return 'szyy-web';
            }
        }]);
        folderName = inquirerProjectName.name;
    }
    //选择模板项目
    let inquirerProjectTemplate = await inquirer.prompt([{
        type: 'list',
        name: 'template',
        message: 'Project Template:',
        choices: [
            'ucf',
            'koa2-bff'
        ],
        filter: function (val) { // 使用filter将回答变为小写
            return val.toLowerCase();
        }
    }]);
    projectTemplate = inquirerProjectTemplate.template;

    console.log(chalk.green(`\t\t⏳  SZYY cloud transfer to local machine ⏳`));
    console.log();
    console.log(chalk.cyan.bold(`[Info]: 🚀 Start downloading  project to the current directory 🎁`));
    console.log(chalk.cyan.bold(`Path:${path.resolve('.', folderName)}`));
    console.log(chalk.cyan.bold(`Template:${projectTemplate}`));
    console.log();

    var ProgressBar = require('./processBar');
    var pb = new ProgressBar('Download', 72);
    var num = 0, total = 100;

    //进度条
    function downloading() {
        if (num < total) {
            pb.render({ completed: num, total: total, status: 'Downloading...' });
            num++;
            setTimeout(function () {
                downloading();
            }, 10);
        }
    }

    if (!pathExists.sync(folderName) || folderName == 'szyy-web') {
        downloading();
        download(urlObj[projectTemplate], folderName, function (err) {
            if (!err) {
                pb.render({ completed: num, total: total, status: "Completed." });
                console.log();
                console.log();
                console.log(chalk.cyan(`🚀 Next, install NPM package dependencies 🎁 `));
                console.log(chalk.cyan(`[Tips] : 🏆  cd ${folderName} && npm install && npm start`));
            }
        });
    } else {
        console.log(chalk.red.bold(`[Error] :   ⚠️  directory ${folderName} already exists. 😫`));
        console.log(chalk.yellow(`[Tips] :    🤔 Try renaming the project name 🤗  `));
        process.exit(0);
    }

}