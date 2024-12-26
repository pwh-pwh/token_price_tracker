import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { TokenList } from './components/TokenList';
import { AddTokenModal } from './components/AddTokenModal';
import { Token } from './types';

function App() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTokenPrices = async (ids: string[]) => {
    if (ids.length === 0) return;
    
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids.join(',')}&order=market_cap_desc&sparkline=false`
      );
      const data = await response.json();
      setTokens(data);
    } catch (error) {
      console.error('Error fetching token prices:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTokenPrices(tokens.map(t => t.id));
    }, 30000);

    return () => clearInterval(interval);
  }, [tokens]);

  const handleAddToken = async (tokenId: string) => {
    if (!tokens.find(t => t.id === tokenId)) {
      await fetchTokenPrices([...tokens.map(t => t.id), tokenId]);
    }
  };

  const handleRemoveToken = (tokenId: string) => {
    setTokens(tokens.filter(t => t.id !== tokenId));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Token Price Tracker</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Token</span>
          </button>
        </div>

        {tokens.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No tokens added yet. Click the Add Token button to get started.</p>
          </div>
        ) : (
          <TokenList tokens={tokens} onRemove={handleRemoveToken} />
        )}

        <AddTokenModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddToken}
        />
      </div>
    </div>
  );
}

export default App;