// Wallet naming service for SecureVault
export interface WalletName {
  address: string;
  name: string;
  createdAt: number;
}

// Helper function to check if we're in a browser environment
const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

export class WalletNamingService {
  private static instance: WalletNamingService;
  private walletNames: Map<string, string> = new Map();
  private readonly STORAGE_KEY = 'securevault_wallet_names';
  private initialized = false;

  private constructor() {
    // Only initialize if we're in a browser environment
    if (isBrowser) {
      this.loadWalletNames();
      this.initialized = true;
    }
  }

  static getInstance(): WalletNamingService {
    if (!WalletNamingService.instance) {
      WalletNamingService.instance = new WalletNamingService();
    }
    return WalletNamingService.instance;
  }

  // Load wallet names from localStorage
  private loadWalletNames() {
    if (!isBrowser) return;
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const names = JSON.parse(stored);
        this.walletNames = new Map(Object.entries(names));
      }
    } catch (error) {
      console.error('Error loading wallet names:', error);
    }
  }

  // Save wallet names to localStorage
  private saveWalletNames() {
    if (!isBrowser) return;
    
    try {
      const names = Object.fromEntries(this.walletNames);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(names));
    } catch (error) {
      console.error('Error saving wallet names:', error);
    }
  }

  // Set wallet name
  setWalletName(address: string, name: string) {
    this.walletNames.set(address.toLowerCase(), name);
    this.saveWalletNames();
  }

  // Get wallet name
  getWalletName(address: string): string | undefined {
    // If not initialized (server-side), return undefined
    if (!this.initialized) return undefined;
    return this.walletNames.get(address.toLowerCase());
  }

  // Get all wallet names
  getAllWalletNames(): Map<string, string> {
    // If not initialized (server-side), return empty map
    if (!this.initialized) return new Map();
    return new Map(this.walletNames);
  }

  // Generate default wallet name
  generateDefaultName(index: number): string {
    return `SecureVault ${index + 1}`;
  }

  // Check if wallet has a custom name
  hasCustomName(address: string): boolean {
    // If not initialized (server-side), return false
    if (!this.initialized) return false;
    return this.walletNames.has(address.toLowerCase());
  }

  // Initialize the service when called from client-side
  initialize() {
    if (isBrowser && !this.initialized) {
      this.loadWalletNames();
      this.initialized = true;
    }
  }
}

// Export singleton instance
export const walletNamingService = WalletNamingService.getInstance(); 