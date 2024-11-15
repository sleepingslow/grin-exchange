import { X } from 'lucide-react';
import { useState } from 'react';

interface SlatepackModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'receive' | 'send';
  onSubmit: (slatepack: string) => void;
}

export default function SlatepackModal({ isOpen, onClose, type, onSubmit }: SlatepackModalProps) {
  const [slatepack, setSlatepack] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(slatepack);
    setSlatepack('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl p-6 max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4">
          {type === 'receive' ? 'Receive via Slatepack' : 'Send via Slatepack'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {type === 'receive' ? 'Your Slatepack Message' : 'Recipient Slatepack'}
            </label>
            <textarea
              value={slatepack}
              onChange={(e) => setSlatepack(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500 h-40"
              placeholder={type === 'receive' 
                ? 'Paste the Slatepack message you received'
                : 'Enter the Slatepack address of the recipient'}
              required
            />
          </div>

          <div className="bg-gray-700 p-4 rounded-lg text-sm text-gray-400">
            <h4 className="font-medium text-white mb-2">Important Notes:</h4>
            {type === 'receive' ? (
              <ul className="list-disc list-inside space-y-1">
                <li>Paste the complete Slatepack message</li>
                <li>Double-check the amount before confirming</li>
                <li>Transaction will be processed after confirmation</li>
              </ul>
            ) : (
              <ul className="list-disc list-inside space-y-1">
                <li>Ensure the recipient's Slatepack address is correct</li>
                <li>Transaction cannot be reversed once sent</li>
                <li>Keep the Slatepack response for your records</li>
              </ul>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors"
          >
            {type === 'receive' ? 'Confirm Receipt' : 'Generate Slatepack'}
          </button>
        </form>
      </div>
    </div>
  );
}