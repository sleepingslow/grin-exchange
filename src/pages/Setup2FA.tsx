import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Shield } from 'lucide-react';

export default function Setup2FA() {
  const [verificationCode, setVerificationCode] = useState('');
  const navigate = useNavigate();

  // In a real application, this would be generated by the backend
  const mockQRCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/GrinExchange:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=GrinExchange';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would verify the code with your backend
    if (verificationCode.length === 6) {
      toast.success('2FA setup complete!');
      navigate('/login');
    } else {
      toast.error('Invalid verification code');
    }
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <Shield className="h-16 w-16 text-green-500 mx-auto mb-4" />
      <h1 className="text-3xl font-bold mb-4">Set Up Two-Factor Authentication</h1>
      <p className="text-gray-400 mb-8">
        Scan the QR code below with your authenticator app to enable 2FA protection.
      </p>

      <div className="bg-white p-4 rounded-lg mb-8">
        <img
          src={mockQRCodeUrl}
          alt="2FA QR Code"
          className="mx-auto"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Enter Verification Code
          </label>
          <input
            type="text"
            maxLength={6}
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
            placeholder="000000"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Verify and Complete Setup
        </button>
      </form>
    </div>
  );
}