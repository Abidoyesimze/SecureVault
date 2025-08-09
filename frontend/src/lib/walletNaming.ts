// Wallet naming service for SecureVault
export interface WalletName {
  address: string;
  name: string;
  createdAt: number;
}

export class WalletNamingService {
  private static instance: WalletNamingService;
  private walletNames: Map<string, string> = new Map();
  private readonly STORAGE_KEY = 'securevault_wallet_names';

  private constructor() {
    this.loadWalletNames();
  }

  static getInstance(): WalletNamingService {
    if (!WalletNamingService.instance) {
      WalletNamingService.instance = new WalletNamingService();
    }
    return WalletNamingService.instance;
  }

  // Load wallet names from localStorage
  private loadWalletNames() {
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
    return this.walletNames.get(address.toLowerCase());
  }

  // Get all wallet names
  getAllWalletNames(): Map<string, string> {
    return new Map(this.walletNames);
  }

  // Generate default wallet name
  generateDefaultName(index: number): string {
    return `SecureVault ${index + 1}`;
  }

  // Check if wallet has a custom name
  hasCustomName(address: string): boolean {
    return this.walletNames.has(address.toLowerCase());
  }
}

// Export singleton instance
export const walletNamingService = WalletNamingService.getInstance(); 