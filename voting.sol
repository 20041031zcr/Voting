pragma solidity ^0.5.1;

contract Voting {

  mapping (bytes32 => uint8) public votesReceived;
  bytes32[] public candidateList;
  mapping(address => bool) addressVotedMap;

  function addCandidate(bytes32 _candidate) public
  {
      candidateList.push(_candidate);
  }
  
  function removeCandidate(bytes32 _candidate) public
  {
      uint i;
        for(i=0;i<=candidateList.length;i++){
            if(candidateList[i] == _candidate){
                delete candidateList[i];
                return;
            }
        }
  }
  function getCandidateCount() public view returns(uint)
  {
      return candidateList.length;
  }
  
  function getCandidate(uint _index) public view returns(bytes32)
  {
      if(_index>=candidateList.length)
         return "";
      else
         return candidateList[_index];
  }
  
  function totalVotesFor(bytes32 candidate) view public returns (uint8) {
    require(validCandidate(candidate));
    return votesReceived[candidate];
  }

  function voteForCandidate(bytes32 candidate) public {
    require(validCandidate(candidate), "无效的投票");
    votesReceived[candidate]  += 1;
    addressVotedMap[msg.sender] = true;
  }

  function validCandidate(bytes32 candidate) view public returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
   }
}
