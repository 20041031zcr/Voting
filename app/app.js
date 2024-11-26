let candidates = {"小红": "vote-num1", "小明": "vote-num2", "小强": "vote-num3"}

$(document).ready(function() {
	//初始化得票数
	candidateNames = Object.keys(candidates); //获取所有候选人姓名到candidateNames
 	for (var i = 0; i < candidateNames.length; i++) { // 每个候选人获取得票数。
		let voteName = candidateNames[i];
		addCandidate(voteName);  //添加候选人到区块链，成为有效的候选人
  		totalVotesFor(voteName); // 获取候选人的总得票数
	}

 	//初始化事件
 	$(".vote-btn").click(function(){
 		//获取投票人名称 		
 		let voteName=$(this).prev().prev().prev().text();
 		voteForCandidate(voteName);

 	});
});
// 添加指定候选人
function addCandidate(voteName) {
    $.get("/addCandidate?voteName=" + voteName, function(data) {
		if(data == "Error") {
            alert('提示', '500');
        } else {
			console.log(data);
		}
    });
}
// 获取指定的候选人的得票数
function totalVotesFor(voteName) {
    $.get("/totalVotesFor?voteName=" + voteName, function(data) {
		if(data == "Error") {
            alert('提示', '500');
        } else {
			$("#"+candidates[voteName]).html(data);
		}
    });
}
// 为指定的候选人投票
function voteForCandidate(voteName) {
    $.get("/voteForCandidate?voteName=" + voteName, function(data) {
        if(data == "Error") {
            alert('提示', '500');
        } else {
           let div_id = candidates[voteName];           
           console.log(data)
		   var vote_num = totalVotesFor(voteName);
		   $("#"+div_id).html(vote_num);//.fadeIn(800);
		  // $("#"+div_id).html;//.fadeOut(400);
        }
    });
}
