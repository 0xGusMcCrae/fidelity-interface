import React from 'react'

interface OrderBookProps {
  data: {
    bids: Array<{price: number, size: number, total: number}>;
    asks: Array<{price: number, size: number, total: number}>;
  };
}

const OrderBook: React.FC<OrderBookProps> = ({ data }) => {
  const { bids, asks } = data;
  
  return (
    <div className="order-book">
      <h2>Order Book</h2>
      <div className="order-book-container">
        <div className="bids">
          <h3>Bids</h3>
          <table>
            <thead>
              <tr>
                <th>Price</th>
                <th>Size</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid, index) => (
                <tr key={`bid-${index}`}>
                  <td className="price bid">{bid.price.toFixed(2)}</td>
                  <td>{bid.size}</td>
                  <td>{bid.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="asks">
          <h3>Asks</h3>
          <table>
            <thead>
              <tr>
                <th>Price</th>
                <th>Size</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {asks.map((ask, index) => (
                <tr key={`ask-${index}`}>
                  <td className="price ask">{ask.price.toFixed(2)}</td>
                  <td>{ask.size}</td>
                  <td>{ask.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default OrderBook