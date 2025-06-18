'use client';

import React from 'react';
import { useWeb3 } from '../context/Web3Context';

const WalletConnect: React.FC = () => {
  const { account, connectWallet, disconnectWallet, isConnected } = useWeb3();

  return (
    <div className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Todo dApp</h1>
        <div>
          {isConnected ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {account?.slice(0, 6)}...{account?.slice(-4)}
              </span>
              <button
                onClick={disconnectWallet}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletConnect; 