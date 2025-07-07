

export type WalletSettings = {
  upiId: string;
  qrCodeUrl: string;
  minDeposit: number;
  minWithdrawal: number;
  referralBonus: number;
  paymentGatewayEnabled: boolean;
  manualDepositEnabled: boolean;
  paymentGatewayApiKey: string;
  bonusUsagePercentage: number;
  paidMatchJoinBonus: number;
};

export const walletSettingsData: WalletSettings = {
  upiId: 'battleclub@upi',
  qrCodeUrl: 'https://placehold.co/200x200.png',
  minDeposit: 10,
  minWithdrawal: 50,
  referralBonus: 10,
  paymentGatewayEnabled: false,
  manualDepositEnabled: true,
  paymentGatewayApiKey: '',
  bonusUsagePercentage: 30,
  paidMatchJoinBonus: 5,
};
