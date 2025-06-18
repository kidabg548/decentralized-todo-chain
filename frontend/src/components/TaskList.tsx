'use client';

import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { Task } from '../types/todo';
import { ethers } from 'ethers';

const TaskList: React.FC = () => {
  const { contract, isConnected } = useWeb3();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {
    if (!contract) return;
    try {
      const taskCount = await contract.getTaskCount();
      const loadedTasks: Task[] = [];
      
      for (let i = 0; i < taskCount; i++) {
        const task = await contract.getTasks(i);
        loadedTasks.push({
          id: Number(task.id),
          content: task.content,
          completed: task.completed,
          reward: Number(task.reward),
        });
      }
      
      setTasks(loadedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  useEffect(() => {
    if (isConnected && contract) {
      loadTasks();
    }
  }, [isConnected, contract]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contract || !newTask.trim()) return;

    try {
      setLoading(true);
      const tx = await contract.createTask(newTask);
      await tx.wait();
      setNewTask('');
      await loadTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (id: number) => {
    if (!contract) return;

    try {
      setLoading(true);
      const tx = await contract.toggleTask(id);
      await tx.wait();
      await loadTasks();
    } catch (error) {
      console.error('Error toggling task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (!contract) return;

    try {
      setLoading(true);
      const tx = await contract.deleteTask(id);
      await tx.wait();
      await loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimReward = async (id: number) => {
    if (!contract) return;

    try {
      setLoading(true);
      const tx = await contract.claimReward(id);
      await tx.wait();
      await loadTasks();
    } catch (error) {
      console.error('Error claiming reward:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatReward = (reward: number) => {
    return ethers.formatEther(reward.toString());
  };

  if (!isConnected) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please connect your wallet to manage tasks.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleCreateTask} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={loading || !newTask.trim()}
          >
            Add Task
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                disabled={loading}
              />
              <div>
                <span
                  className={`text-lg ${
                    task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                  }`}
                >
                  {task.content}
                </span>
                {task.reward > 0 && (
                  <p className="text-sm text-green-600">
                    Reward: {formatReward(task.reward)} TRWD
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {task.completed && task.reward > 0 && (
                <button
                  onClick={() => handleClaimReward(task.id)}
                  className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none"
                  disabled={loading}
                >
                  Claim Reward
                </button>
              )}
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-red-600 hover:text-red-700 focus:outline-none"
                disabled={loading}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList; 