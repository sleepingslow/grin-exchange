import { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Copy, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import SlatepackModal from '../components/SlatepackModal';

type CryptoBalance = {
  currency: string;
  balance: number;
  address: string;
};

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [selectedCrypto, setSelectedCrypto] = useState('GRIN');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [isSlatepackModalOpen, setIsSlatepackModalOpen] = useState(false);

  const balances: CryptoBalance[] = [
    { currency: 'GRIN', balance: 1234.5678, address: 'grin1qwerty...' },
    { currency: 'BTC', balance: 0.12345678, address: '1ABC...' },
    { currency: 'ETH', balance: 1.23456789, address: '0xDEF...' },
  ];

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopySuccess(address);
    toast.success('Address copied to clipboard');
    setTimeout(() => setCopySuccess(null), 2000);
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCrypto === 'GRIN') {
      setIsSlatepackModalOpen(true);
    } else {
      toast.success(`Withdrawal of ${withdrawAmount} ${selectedCrypto} initiated`);
      setWithdrawAmount('');
      setWithdrawAddress('');
    }
  };

  const handleSlatepackSubmit = (slatepack: string) => {
    // Here you would handle the Slatepack transaction
    console.log('Processing Slatepack:', slatepack);
    toast.success('Slatepack transaction initiated');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center space-x-4">
        <Wallet className="h-8 w-8 text-green-500" />
        <h1 className="text-3xl font-bold">Wallet</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {balances.map((crypto) => (
          <div key={crypto.currency} className="bg-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{crypto.currency}</h3>
              <span className="text-gray-400">Available</span>
            </div>
            <p className="text-2xl font-bold mb-2">{crypto.balance.toFixed(8)}</p>
            <p className="text-sm text-gray-400">≈ $1,234.56 USD</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('deposit')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'deposit'
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            <ArrowDownLeft className="h-5 w-5" />
            <span>Deposit</span>
          </button>
          <button
            onClick={() => setActiveTab('withdraw')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'withdraw'
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            <ArrowUpRight className="h-5 w-5" />
            <span>Withdraw</span>
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Select Currency</label>
          <select
            value={selectedCrypto}
            onChange={(e) => setSelectedCrypto(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500"
          >
            {balances.map((crypto) => (
              <option key={crypto.currency} value={crypto.currency}>
                {crypto.currency}
              </option>
            ))}
          </select>
        </div>

        {activeTab === 'deposit' ? (
          <div className="space-y-6">
            {selectedCrypto === 'GRIN' ? (
              <div className="space-y-4">
                <p className="text-gray-400">
                  To deposit GRIN, you'll need to use Slatepack. Click the button below to start the process.
                </p>
                <button
                  onClick={() => setIsSlatepackModalOpen(true)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  Start Slatepack Deposit
                </button>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your {selectedCrypto} Deposit Address
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={balances.find(b => b.currency === selectedCrypto)?.address}
                    readOnly
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600"
                  />
                  <button
                    onClick={() => handleCopyAddress(balances.find(b => b.currency === selectedCrypto)?.address || '')}
                    className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
                  >
                    {copySuccess === balances.find(b => b.currency === selectedCrypto)?.address ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Important Notes:</h4>
              {selectedCrypto === 'GRIN' ? (
                <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                  <li>GRIN transactions require Slatepack messages</li>
                  <li>Keep your Slatepack messages secure</li>
                  <li>Minimum deposit: 0.01 GRIN</li>
                </ul>
              ) : (
                <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                  <li>Send only {selectedCrypto} to this address</li>
                  <li>Minimum deposit: 0.001 {selectedCrypto}</li>
                  <li>Deposits will be credited after network confirmation</li>
                </ul>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleWithdraw} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Amount</label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder={`Enter ${selectedCrypto} amount`}
                min="0"
                step="0.00000001"
                required
              />
            </div>

            {selectedCrypto !== 'GRIN' && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Withdrawal Address
                </label>
                <input
                  type="text"
                  value={withdrawAddress}
                  onChange={(e) => setWithdrawAddress(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  placeholder={`Enter ${selectedCrypto} address`}
                  required
                />
              </div>
            )}

            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Withdrawal Information:</h4>
              <div className="text-sm text-gray-400 space-y-2">
                <div className="flex justify-between">
                  <span>Available Balance:</span>
                  <span>{balances.find(b => b.currency === selectedCrypto)?.balance.toFixed(8)} {selectedCrypto}</span>
                </div>
                <div className="flex justify-between">
                  <span>Network Fee:</span>
                  <span>0.0001 {selectedCrypto}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors"
            >
              {selectedCrypto === 'GRIN' ? 'Continue with Slatepack' : `Withdraw ${selectedCrypto}`}
            </button>
          </form>
        )}
      </div>

      <SlatepackModal
        isOpen={isSlatepackModalOpen}
        onClose={() => setIsSlatepackModalOpen(false)}
        type={activeTab === 'deposit' ? 'receive' : 'send'}
        onSubmit={handleSlatepackSubmit}
      />
    </div>
  );
}