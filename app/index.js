//创建express对象
var express = require('express');
var app = express();
// 创建Web服务器
var server = require('http').createServer(app);
// 指定Express框架的静态文件目录
app.use(express.static('.'));
//初始化 web3
let Web3 = require('web3');
let web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.1.101:8545"));
console.log('已完成初始化web3库。第一个账户是：'+ web3.eth.accounts[0]);
//根据ABI创建合约对象
let fs = require('fs');
let abiDefinition = fs.readFileSync('voting.abi').toString(); 
let VotingContract = web3.eth.contract(JSON.parse(abiDefinition));
//根据合约地址得到合约实例
let address = "0x60d3026e63d8ecb2528320abe0ff12e62832737f";
let contractInstance = VotingContract.at(address);
//定义一个/addCandidate接口，用于添加指定获选人
app.get("/addCandidate", function(req, res) {
	var voteName = req.query.voteName;
	contractInstance.addCandidate.call(voteName).toString();	
	res.send("ok");
});
//定义一个/totalVotesFor接口，用于获取指定获选人的票数
app.get("/totalVotesFor", function(req, res) {
	var voteName = req.query.voteName;
	var vote_num=contractInstance.totalVotesFor.call(voteName).toString();
	console.log(vote_num);
	res.send(vote_num);
});
//定义一个/voteForCandidate接口，用于给指定获选人投票，返回指定获选人的得票数
app.get("/voteForCandidate", function(req, res) {
	var voteName = req.query.voteName;
	contractInstance.voteForCandidate(voteName, {from: web3.eth.accounts[0]});
	var vote_num=contractInstance.totalVotesFor.call(voteName).toString();
	res.send(vote_num);
});
// 在10001端口上启动Web服务
server.listen(10001);
console.log('Web服务器已启动。访问192.168.1.101:10001/index.html浏览页面。');




