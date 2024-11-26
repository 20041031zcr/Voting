let Web3 = require('web3');
let fs = require('fs');
var sleep = function(time) {
  var startTime = new Date().getTime() + parseInt(time, 10);
  while(new Date().getTime() < startTime) {}};

//初始化 web3
let web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.1.101:8545"));
console.log('已完成初始化web3库。第一个账户是：'+ web3.eth.accounts[0]);

let abiDefinition = fs.readFileSync('voting.abi').toString();
console.log('已读取合约的ABI代码。');
let VotingContract = web3.eth.contract(JSON.parse(abiDefinition));
let address = "0x60d3026e63d8ecb2528320abe0ff12e62832737f";
let contractInstance = VotingContract.at(address);
// 测试添加候选人
console.log("测试添加候选人小红");
contractInstance.addCandidate("小红", {from: web3.eth.accounts[0], gas: 300000});
console.log("测试添加候选人小明");
contractInstance.addCandidate("小明", {from: web3.eth.accounts[0], gas: 300000});
console.log("测试添加候选人小强");
contractInstance.addCandidate("小强", {from: web3.eth.accounts[0], gas: 300000});
console.log("等待中...");
sleep(10000); // 等待5s
let count = contractInstance.getCandidateCount.call();
console.log("候选人数量："+count);
// 测试投票
console.log("测试给小红投票");
contractInstance.voteForCandidate("小红", {from: web3.eth.accounts[0], gas: 300000});
console.log("测试给小明投票");
contractInstance.voteForCandidate("小明", {from: web3.eth.accounts[0], gas: 300000});
console.log("测试给小强投票");
contractInstance.voteForCandidate("小强", {from: web3.eth.accounts[0], gas: 300000});
sleep(5000); // 等待5s
// 测试获取的得票数
let hongVote=contractInstance.totalVotesFor.call('小红');
let mingVote=contractInstance.totalVotesFor.call('小明');
let qiangVote=contractInstance.totalVotesFor.call('小强');
console.log("等待中...");
console.log("小红的得票数： "+hongVote);
console.log("小明的得票数： "+mingVote);
console.log("小强的得票数： "+qiangVote);




