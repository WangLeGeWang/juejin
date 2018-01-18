#! /usr/bin/env node
const program = require('commander')
const request = require('superagent')
const {table} = require('table')
var Table2 = require('cli-table2');
// 初始化commander
program
    .version('0.0.1')
    .usage('juejin <cmd> [option]')


var table2 = new Table2({
    head: ['option', 'articleType'],
    colWidths: [10, 30]
    });

table2.push(
  ['android', '安卓'],
  ['fe', '前端'],
  ['ios', 'iOS'],
  ['be', '后端'],
  ['de', '设计'],
  ['pm', '产品'],
  ['tools', '工具资源'],
  ['read', '阅读'],

  ['ai', '人工智能'],
  ['all', '查看所有最新文章和最热文章']
);

program.on('--help', function(){

  console.log('');
  console.log('命令列表');
  console.log(table2.toString());
});

//存储数据的表格
var tableData=[];

//输出表格数据
var output;

var queryData={
  src: 'sixgold',
  limit: 20,
  category: 'all'
};

if (program.fontend) {
  console.log("-fontend");
}
// 添加自定义命令
program
  .command('hot <dir>')
  .description('获取最热文章列表')
  .action(function (dir, otherDirs) {
    switch (dir) {
      case "android":
        queryData.category="5562b410e4b00c57d9b94a92";
        break;
      case "fe":
        queryData.category="5562b415e4b00c57d9b94ac8";
        break;
      case "ios":
        queryData.category="5562b405e4b00c57d9b94a41";
        break;
      case "be":
        queryData.category="5562b419e4b00c57d9b94ae2";
        break;
      case "de":
        queryData.category="5562b41de4b00c57d9b94b0f";
        break;
      case "pm":
        queryData.category="569cbe0460b23e90721dff38";
        break;
      case "tools":
        queryData.category="5562b422e4b00c57d9b94b53";
        break;
      case "read":
        queryData.category="5562b428e4b00c57d9b94b9d";
        break;
      case "ai":
        queryData.category="57be7c18128fe1005fa902de";
        break;
      case "all":
        queryData.category="all";
        break;
      default:

    }
    getResult(queryData,"hot");
  });

program
    .command('new <dir>')
    .description('获取最新文章列表')
    .action(function (dir, otherDirs) {
      switch (dir) {
        case "android":
          queryData.category="5562b410e4b00c57d9b94a92";
          break;
        case "fe":
          queryData.category="5562b415e4b00c57d9b94ac8";
          break;
        case "ios":
          queryData.category="5562b405e4b00c57d9b94a41";
          break;
        case "be":
          queryData.category="5562b419e4b00c57d9b94ae2";
          break;
        case "de":
          queryData.category="5562b41de4b00c57d9b94b0f";
          break;
        case "pm":
          queryData.category="569cbe0460b23e90721dff38";
          break;
        case "tools":
          queryData.category="5562b422e4b00c57d9b94b53";
          break;
        case "read":
          queryData.category="5562b428e4b00c57d9b94b9d";
          break;
        case "ai":
          queryData.category="57be7c18128fe1005fa902de";
          break;
        case "all":
          queryData.category="all";
          break;
        default:

      }
      getResult(queryData,"new");
    });

  // 没有参数时显示帮助信息
  if (!process.argv[2]) {
      program.help();
      console.log();
  }

  program.parse(process.argv)


//获取查询结果
  function getResult(queryData,articleType){
    var url;
    if (articleType==="hot") {
      url="https://timeline-merger-ms.juejin.im/v1/get_entry_by_rank"
    }else{
      url="https://timeline-merger-ms.juejin.im/v1/get_entry_by_timeline"
    }

    //网络请求
    request.get(url)
    .query(queryData)
    .then(res => {
      var reqData=res.body.d.entrylist;
      for (var i = 0; i < reqData.length; i++) {
        if (reqData[i].type!="post") {
          reqData[i].originalUrl="https://juejin.im/entry/"+reqData[i].objectId
        }
        tableData[i]=[reqData[i].title,reqData[i].user.username,reqData[i].originalUrl];
    }
    }).then(()=>{
      config = {
          columns: {
              0: {
                  alignment: 'left',
                  width: 30,
              },
              1: {
                  alignment: 'right',
                  width: 10
              },
              2: {
                  alignment: 'right',
                  width: 50
              }
          }
      };

      //添加表头
      tableData.unshift(['最热文章','作者','文章链接（Command/Ctrl+鼠标左键链接可点击）']); // 注意数组索引, [0,1,2..]
      output = table(tableData, config);
      console.log(output);
    })
    .catch(err => {
      console.error("err"+err);
    })
  }
