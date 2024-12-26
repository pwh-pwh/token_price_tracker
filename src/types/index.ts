export interface Token {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  image: string;
  price_change_percentage_24h: number;
}

export interface TokenListProps {
  tokens: Token[];
  onRemove: (id: string) => void;
}