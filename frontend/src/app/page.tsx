'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Shield, Users, Zap, Lock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Multi-party computation with threshold signatures for maximum security'
    },
    {
      icon: Users,
      title: 'Multi-Signer Support',
      description: 'Support for unlimited signers with configurable thresholds'
    },
    {
      icon: Zap,
      title: 'Instant Execution',
      description: 'Fast transaction execution once threshold is met'
    },
    {
      icon: Lock,
      title: 'Zero Trust Architecture',
      description: 'No single point of failure with distributed key management'
    }
  ];

  const benefits = [
    'Threshold signature schemes (TSS)',
    'Distributed key generation',
    'Multi-chain support',
    'Real-time transaction monitoring',
    'Audit trail and compliance',
    'Role-based access control'
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-slate-700 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">SecureVault</span>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/mpc-wallet" className="text-gray-700 hover:text-blue-600 transition-colors">MPC Wallet</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
              <Link href="/docs" className="text-gray-700 hover:text-blue-600 transition-colors">Documentation</Link>
            </nav>

            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Enterprise-Grade
              <span className="block text-blue-300">MPC Wallet</span>
              Infrastructure
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-slate-200 max-w-3xl mx-auto">
              Secure multi-party computation wallet for enterprise digital asset management. 
              Built with threshold signatures and distributed key management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/mpc-wallet" className="btn-primary text-lg px-8 py-4">
                Launch MPC Wallet
              </Link>
              <Link href="/docs" className="btn-secondary text-lg px-8 py-4">
                View Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SecureVault?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enterprise-grade security with multi-party computation technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How MPC Works
            </h2>
            <p className="text-xl text-gray-600">
              Understanding the multi-party computation process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Key Generation</h3>
              <p className="text-gray-600">
                Private keys are distributed across multiple parties using threshold signature schemes
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-slate-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Transaction Approval</h3>
              <p className="text-gray-600">
                Multiple signers approve transactions until the threshold is reached
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Execution</h3>
              <p className="text-gray-600">
                Transactions are executed securely once threshold approval is achieved
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Enterprise Benefits
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                SecureVault provides enterprise-grade security for digital asset management 
                with advanced multi-party computation technology.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Security Features</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <span className="font-medium text-gray-900">Threshold Signatures</span>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <span className="font-medium text-gray-900">Distributed Keys</span>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <span className="font-medium text-gray-900">Zero Trust</span>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <span className="font-medium text-gray-900">Audit Trail</span>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Secure Your Assets?
          </h2>
          <p className="text-xl mb-8 text-slate-200">
            Join enterprises worldwide using SecureVault for their digital asset security
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/mpc-wallet" className="bg-white text-slate-900 font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors">
              Get Started
            </Link>
            <Link href="/docs" className="border-2 border-white text-white font-semibold py-3 px-8 rounded-xl hover:bg-white hover:text-slate-900 transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-slate-700 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">SecureVault</span>
              </div>
              <p className="text-gray-400">
                Enterprise-grade MPC wallet infrastructure for secure digital asset management.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/mpc-wallet" className="hover:text-white transition-colors">MPC Wallet</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/api" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SecureVault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
