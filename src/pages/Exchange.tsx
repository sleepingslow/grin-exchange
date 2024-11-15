import { useState } from 'react';
import { ArrowDownUp } from 'lucide-react';

export default function Exchange() {
  const [amount, setAmount] = useState('');
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the order submission
    console.log('Order submitted:', { amount, orderType });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-8">
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">Place Order</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Order Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setOrderType('buy')}
                  className={`py-2 px-4 rounded-lg ${
                    orderType === 'buy'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  Buy
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('sell')}
                  className={`py-2 px-4 rounded-lg ${
                    orderType === 'sell'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  Sell
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Amount (GRIN)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>

            <div className="flex items-center justify-between text-gray-400">
              <span>Price</span>
              <span>1 GRIN = 0.00001234 BTC</span>
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-lg ${
                orderType === 'buy'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
              } text-white transition-colors`}
            >
              {orderType === 'buy' ? 'Buy GRIN' : 'Sell GRIN'}
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">Order Book</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-green-500 font-medium">Buy Orders</h3>
              <div className="space-y-1">
                {[
                  { price: 0.00001234, amount: 100.00 },
                  { price: 0.00001233, amount: 50.00 },
                  { price: 0.00001232, amount: 75.00 },
                ].map((order, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{order.price.toFixed(8)}</span>
                    <span>{order.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center text-gray-400">
              <ArrowDownUp className="h-6 w-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-red-500 font-medium">Sell Orders</h3>
              <div className="space-y-1">
                {[
                  { price: 0.00001235, amount: 80.00 },
                  { price: 0.00001236, amount: 120.00 },
                  { price: 0.00001237, amount: 90.00 },
                ].map((order, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{order.price.toFixed(8)}</span>
                    <span>{order.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">Recent Trades</h2>
          <div className="space-y-2">
            {[
              { price: 0.00001234, amount: 50.00, type: 'buy' },
              { price: 0.00001235, amount: 30.00, type: 'sell' },
              { price: 0.00001233, amount: 75.00, type: 'buy' },
            ].map((trade, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className={trade.type === 'buy' ? 'text-green-500' : 'text-red-500'}>
                  {trade.price.toFixed(8)}
                </span>
                <span>{trade.amount.toFixed(2)}</span>
                <span className="text-gray-400">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}