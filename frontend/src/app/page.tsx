'use client';

import React from 'react';
import { Web3Provider } from '../context/Web3Context';
import WalletConnect from '../components/WalletConnect';
import TaskList from '../components/TaskList';

export default function Home() {
  return (
    <Web3Provider>
      <div className="min-h-screen bg-gray-50">
        <WalletConnect />
        <main className="container mx-auto py-8">
          <h1 className="text-3xl font-bold text-center mb-8">Todo dApp</h1>
          <TaskList />
        </main>
      </div>
    </Web3Provider>
  );
}
