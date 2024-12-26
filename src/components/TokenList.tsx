import React from 'react';
import { ArrowDown, ArrowUp, Trash2 } from 'lucide-react';
import { TokenListProps } from '../types';

export function TokenList({ tokens, onRemove }: TokenListProps) {
  return (
    <div className="w-full max-w-3xl">
      {tokens.map((token) => (
        <div
          key={token.id}
          className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-3 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <img src={token.image} alt={token.name} className="w-8 h-8" />
            <div>
              <h3 className="font-semibold">{token.name}</h3>
              <p className="text-gray-500 text-sm uppercase">{token.symbol}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="font-medium">${token.current_price.toLocaleString()}</p>
              <p className={`text-sm flex items-center ${
                token.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {token.price_change_percentage_24h >= 0 ? (
                  <ArrowUp className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDown className="w-4 h-4 mr-1" />
                )}
                {Math.abs(token.price_change_percentage_24h).toFixed(2)}%
              </p>
            </div>
            <button
              onClick={() => onRemove(token.id)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}