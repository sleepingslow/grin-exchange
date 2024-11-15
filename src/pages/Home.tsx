import { ArrowRight, Shield, Coins, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Trade Grin Securely
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          The most trusted platform for trading Grin cryptocurrency. Fast, secure, and easy to use.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg flex items-center gap-2"
          >
            Get Started <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            to="/exchange"
            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg"
          >
            View Exchange
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: Shield,
            title: "Secure Trading",
            description: "Advanced security measures including 2FA protection for your assets"
          },
          {
            icon: Coins,
            title: "Instant Exchanges",
            description: "Fast and reliable Grin trading with automatic order matching"
          },
          {
            icon: Zap,
            title: "Low Fees",
            description: "Competitive trading fees and transparent pricing structure"
          }
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-green-500 transition-colors"
          >
            <feature.icon className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="bg-gray-800 rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-6">Current Exchange Rates</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-4">Pair</th>
                <th className="pb-4">Price</th>
                <th className="pb-4">24h Change</th>
                <th className="pb-4">Volume</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-4">GRIN/BTC</td>
                <td>0.00001234</td>
                <td className="text-green-500">+2.45%</td>
                <td>123.45 BTC</td>
              </tr>
              <tr>
                <td className="py-4">GRIN/ETH</td>
                <td>0.00123400</td>
                <td className="text-red-500">-1.23%</td>
                <td>456.78 ETH</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}