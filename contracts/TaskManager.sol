// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IRewardToken {
    function mint(address to, uint256 amount) external;
}

contract TaskManager {
    struct Task {
        uint256 id;
        string content;
        bool completed;
        address creator;
        uint256 reward;
    }

    Task[] public tasks;
    mapping(address => uint[]) public userTasks;

    IRewardToken public rewardToken;
    uint256 public rewardAmount = 10 * (10 ** 18); // 10 TRWD tokens

    event TaskCreated(uint taskId, address creator, string content);
    event TaskToggled(uint taskId, address user, bool completed);
    event TaskDeleted(uint taskId, address user);
    event RewardClaimed(uint taskId, address user, uint256 amount);

    constructor(address _rewardTokenAddress) {
        rewardToken = IRewardToken(_rewardTokenAddress);
    }

    function createTask(string memory _content) external {
        uint256 taskId = tasks.length;
        tasks.push(Task({
            id: taskId,
            content: _content,
            completed: false,
            creator: msg.sender,
            reward: rewardAmount
        }));
        userTasks[msg.sender].push(taskId);
        emit TaskCreated(taskId, msg.sender, _content);
    }

    function toggleTask(uint256 _taskId) external {
        require(_taskId < tasks.length, "Task does not exist");
        Task storage task = tasks[_taskId];
        require(task.creator == msg.sender, "Not your task");

        task.completed = !task.completed;
        emit TaskToggled(_taskId, msg.sender, task.completed);
    }

    function deleteTask(uint256 _taskId) external {
        require(_taskId < tasks.length, "Task does not exist");
        Task storage task = tasks[_taskId];
        require(task.creator == msg.sender, "Not your task");

        // Remove task from user's task list
        uint[] storage userTaskList = userTasks[msg.sender];
        for (uint i = 0; i < userTaskList.length; i++) {
            if (userTaskList[i] == _taskId) {
                userTaskList[i] = userTaskList[userTaskList.length - 1];
                userTaskList.pop();
                break;
            }
        }

        // Clear the task data
        task.content = "";
        task.completed = false;
        task.reward = 0;
        
        emit TaskDeleted(_taskId, msg.sender);
    }

    function claimReward(uint256 _taskId) external {
        require(_taskId < tasks.length, "Task does not exist");
        Task storage task = tasks[_taskId];
        require(task.creator == msg.sender, "Not your task");
        require(task.completed, "Task not completed");
        require(task.reward > 0, "No reward available");

        uint256 reward = task.reward;
        task.reward = 0;
        rewardToken.mint(msg.sender, reward);
        emit RewardClaimed(_taskId, msg.sender, reward);
    }

    function getTaskCount() external view returns (uint256) {
        return tasks.length;
    }

    function getTasks(uint256 _taskId) external view returns (Task memory) {
        require(_taskId < tasks.length, "Task does not exist");
        return tasks[_taskId];
    }

    function getMyTasks() external view returns (Task[] memory) {
        uint[] memory ids = userTasks[msg.sender];
        Task[] memory result = new Task[](ids.length);
        for (uint i = 0; i < ids.length; i++) {
            result[i] = tasks[ids[i]];
        }
        return result;
    }
}
