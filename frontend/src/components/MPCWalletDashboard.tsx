'use client';

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { 
  Wallet, 
  Users, 
  Shield, 
  Send, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Plus,
  Settings,
  BarChart3,
  Lock,
  Unlock
} from 'lucide-react';
import { MPCWallet, Signer, Transaction, cNGNUtils } from '../lib/mpc-wallet';
import Link from 'next/link';

interface WalletStats {
  totalSigners: number;
  activeSigners: number;
  threshold: number;
  pendingTransactions: number;
  totalTransactions: number;
  balance: string;
}

export default function MPCWalletDashboard() {
  const [wallet, setWallet] = useState<MPCWallet | null>(null);
  const [signers, setSigners] = useState<Signer[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<WalletStats>({
    totalSigners: 0,
    activeSigners: 0,
    threshold: 0,
    pendingTransactions: 0,
    totalTransactions: 0,
    balance: '0'
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [isCreatingWallet, setIsCreatingWallet] = useState(false);
  const [isProposingTransaction, setIsProposingTransaction] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    // Initialize with mock data
    const mockSigners: Signer[] = [
      {
        id: '1',
        address: '0x1234567890123456789012345678901234567890',
        publicKey: '0xabc123...',
        role: 'admin',
        isActive: true,
        createdAt: new Date()
      },
      {
        id: '2',
        address: '0x2345678901234567890123456789012345678901',
        publicKey: '0xdef456...',
        role: 'signer',
        isActive: true,
        createdAt: new Date()
      },
      {
        id: '3',
        address: '0x3456789012345678901234567890123456789012',
        publicKey: '0xghi789...',
        role: 'signer',
        isActive: true,
        createdAt: new Date()
      }
    ];

    setSigners(mockSigners);
    updateStats(mockSigners, []);
  }, []);

  const updateStats = (currentSigners: Signer[], currentTransactions: Transaction[]) => {
    setStats({
      totalSigners: currentSigners.length,
      activeSigners: currentSigners.filter(s => s.isActive).length,
      threshold: 2, // 2-of-3 threshold
      pendingTransactions: currentTransactions.filter(t => t.status === 'pending').length,
      totalTransactions: currentTransactions.length,
      balance: '1,250,000' // Mock balance
    });
  };

  const createWallet = async () => {
    setIsCreatingWallet(true);
    try {
      // Simulate wallet creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const { walletConfig, keyShares } = await MPCWallet.generateKeyShares(signers, 2);
      const newWallet = new MPCWallet(walletConfig);
      setWallet(newWallet);
      
      console.log('Wallet created:', walletConfig);
      console.log('Key shares:', keyShares);
    } catch (error) {
      console.error('Failed to create wallet:', error);
    } finally {
      setIsCreatingWallet(false);
    }
  };

  const proposeTransaction = async () => {
    setIsProposingTransaction(true);
    try {
      if (!wallet) return;

      const transaction = await wallet.proposeTransaction(
        '0x4567890123456789012345678901234567890123',
        '0',
        cNGNUtils.createCNGNTransfer('0x4567890123456789012345678901234567890123', '50000'),
        '0x1234567890123456789012345678901234567890'
      );

      setTransactions(prev => [...prev, transaction]);
      updateStats(signers, [...transactions, transaction]);
    } catch (error) {
      console.error('Failed to propose transaction:', error);
    } finally {
      setIsProposingTransaction(false);
    }
  };

  const approveTransaction = async (transactionId: string) => {
    if (!wallet) return;

    const success = await wallet.approveTransaction(transactionId, '0x1234567890123456789012345678901234567890');
    if (success) {
      setTransactions(prev => 
        prev.map(t => 
          t.id === transactionId 
            ? { ...t, status: t.approvals.length >= stats.threshold ? 'approved' : 'pending' }
            : t
        )
      );
    }
  };

  const executeTransaction = async (transactionId: string) => {
    if (!wallet) return;

    const success = await wallet.executeTransaction(transactionId);
    if (success) {
      setTransactions(prev => 
        prev.map(t => 
          t.id === transactionId 
            ? { ...t, status: 'executed', executedAt: new Date() }
            : t
        )
      );
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'executed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'executed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-slate-700 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">SecureVault</span>
              </Link>
              <span className="text-gray-500">|</span>
              <span className="text-lg font-semibold text-gray-700">MPC Wallet</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/mpc-wallet" className="text-blue-600 font-medium">MPC Wallet</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
              <Link href="/docs" className="text-gray-700 hover:text-blue-600 transition-colors">Documentation</Link>
            </nav>

            <ConnectButton />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Wallet Creation Section */}
        {!wallet && (
          <div className="card mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Create Your MPC Wallet
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Set up a secure multi-party computation wallet for enterprise digital asset management. 
                This enterprise-grade solution uses threshold signatures for enhanced security.
              </p>
              <button
                onClick={createWallet}
                disabled={isCreatingWallet}
                className="btn-primary text-lg px-8 py-4"
              >
                {isCreatingWallet ? 'Creating Wallet...' : 'Create MPC Wallet'}
              </button>
            </div>
          </div>
        )}

        {wallet && (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="card">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Signers</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalSigners}</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                    <Shield className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Threshold</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.threshold}-of-{stats.totalSigners}</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.pendingTransactions}</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Balance</p>
                    <p className="text-2xl font-bold text-gray-900">${stats.balance}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'transactions', label: 'Transactions', icon: Send },
                { id: 'signers', label: 'Signers', icon: Users },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Transactions */}
                <div className="card">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                    <button
                      onClick={proposeTransaction}
                      disabled={isProposingTransaction}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      {isProposingTransaction ? 'Proposing...' : 'New Transaction'}
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {transactions.slice(0, 5).map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(tx.status)}
                          <div>
                            <p className="font-medium text-gray-900">
                              {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
                            </p>
                            <p className="text-sm text-gray-600">
                              {tx.proposedAt.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                          {tx.status}
                        </span>
                      </div>
                    ))}
                    
                    {transactions.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Send className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No transactions yet</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Signer Status */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Signer Status</h3>
                  <div className="space-y-4">
                    {signers.map((signer) => (
                      <div key={signer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${signer.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                          <div>
                            <p className="font-medium text-gray-900">
                              {signer.address.slice(0, 6)}...{signer.address.slice(-4)}
                            </p>
                            <p className="text-sm text-gray-600 capitalize">{signer.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {signer.isActive ? (
                            <Unlock className="w-4 h-4 text-green-500" />
                          ) : (
                            <Lock className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">All Transactions</h3>
                  <button
                    onClick={proposeTransaction}
                    disabled={isProposingTransaction}
                    className="btn-primary text-sm px-4 py-2"
                  >
                    {isProposingTransaction ? 'Proposing...' : 'New Transaction'}
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">To</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Value</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Approvals</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx) => (
                        <tr key={tx.id} className="border-b border-gray-100">
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {tx.id.slice(0, 8)}...
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-900">
                            {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-900">
                            {tx.value} ETH
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                              {tx.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {tx.approvals.length}/{stats.threshold}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              {tx.status === 'pending' && (
                                <button
                                  onClick={() => approveTransaction(tx.id)}
                                  className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                  Approve
                                </button>
                              )}
                              {tx.status === 'approved' && (
                                <button
                                  onClick={() => executeTransaction(tx.id)}
                                  className="text-green-600 hover:text-green-800 text-sm"
                                >
                                  Execute
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {transactions.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <Send className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No transactions found</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'signers' && (
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Signer Management</h3>
                  <button className="btn-secondary text-sm px-4 py-2">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Signer
                  </button>
                </div>
                
                <div className="space-y-4">
                  {signers.map((signer) => (
                    <div key={signer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-slate-700 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {signer.address.slice(2, 4).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {signer.address}
                          </p>
                          <p className="text-sm text-gray-600">
                            Role: {signer.role} • Added: {signer.createdAt.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          signer.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {signer.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Wallet Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Security Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Threshold Configuration</p>
                          <p className="text-sm text-gray-600">Current: {stats.threshold}-of-{stats.totalSigners}</p>
                        </div>
                        <button className="btn-secondary text-sm px-4 py-2">
                          Update
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Emergency Pause</p>
                          <p className="text-sm text-gray-600">Pause all transactions</p>
                        </div>
                        <button className="btn-secondary text-sm px-4 py-2">
                          Pause
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Network Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Base Network</p>
                          <p className="text-sm text-gray-600">Chain ID: 8453</p>
                        </div>
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 