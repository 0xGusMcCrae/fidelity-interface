import React, { useState } from 'react'

interface TradeFormProps {
  onSubmit: (orderDetails: any) => void;
  isLoading: boolean;
}

const TradeForm: React.FC<TradeFormProps> = ({ onSubmit, isLoading }) => {
  const [orderType, setOrderType] = useState('market')
  const [side, setSide] = useState('buy')
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    onSubmit({
      orderType,
      side,
      quantity: parseInt(quantity.toString()),
      price: orderType === 'limit' ? parseFloat(price) : null
    })
  }
  
  return (
    <div className="trade-form">
      <h2>Place Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Order Type</label>
          <select 
            value={orderType} 
            onChange={(e) => setOrderType(e.target.value)}
          >
            <option value="market">Market</option>
            <option value="limit">Limit</option>
            <option value="stop">Stop</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Side</label>
          <div className="side-buttons">
            <button 
              type="button"
              className={`side-button ${side === 'buy' ? 'active buy' : ''}`}
              onClick={() => setSide('buy')}
            >
              Buy
            </button>
            <button 
              type="button"
              className={`side-button ${side === 'sell' ? 'active sell' : ''}`}
              onClick={() => setSide('sell')}
            >
              Sell
            </button>
          </div>
        </div>
        
        <div className="form-group">
          <label>Quantity</label>
          <input 
            type="number" 
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            required
          />
        </div>
        
        {orderType !== 'market' && (
          <div className="form-group">
            <label>Price</label>
            <input 
              type="number" 
              step="0.01"
              min="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        )}
        
        <button 
          type="submit" 
          className={`submit-button ${side}`}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : `${side === 'buy' ? 'Buy' : 'Sell'}`}
        </button>
      </form>
    </div>
  )
}

export default TradeForm