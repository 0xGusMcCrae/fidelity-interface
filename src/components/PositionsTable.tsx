import React from 'react'

interface Position {
  symbol: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  marketValue: number;
}

interface PositionsTableProps {
  positions: Position[];
}

const PositionsTable: React.FC<PositionsTableProps> = ({ positions }) => {
  // Calculate total portfolio value
  const totalValue = positions.reduce((sum, position) => sum + position.marketValue, 0);
  
  // Calculate total P&L
  const totalPnl = positions.reduce((sum, position) => sum + position.pnl, 0);
  
  // Calculate total P&L percentage (weighted by position size)
  const totalPnlPercent = totalValue > 0 
    ? (totalPnl / (totalValue - totalPnl)) * 100 
    : 0;

  return (
    <div className="positions-table">
      <h2>Positions</h2>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Avg Price</th>
            <th>Current Price</th>
            <th>Market Value</th>
            <th>P&L</th>
            <th>P&L %</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => (
            <tr key={position.symbol}>
              <td>{position.symbol}</td>
              <td>{position.quantity}</td>
              <td>${position.avgPrice.toFixed(2)}</td>
              <td>${position.currentPrice.toFixed(2)}</td>
              <td>${position.marketValue.toFixed(2)}</td>
              <td className={position.pnl >= 0 ? 'positive' : 'negative'}>
                ${position.pnl.toFixed(2)}
              </td>
              <td className={position.pnlPercent >= 0 ? 'positive' : 'negative'}>
                {position.pnlPercent.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}><strong>Total</strong></td>
            <td><strong>${totalValue.toFixed(2)}</strong></td>
            <td className={totalPnl >= 0 ? 'positive' : 'negative'}>
              <strong>${totalPnl.toFixed(2)}</strong>
            </td>
            <td className={totalPnlPercent >= 0 ? 'positive' : 'negative'}>
              <strong>{totalPnlPercent.toFixed(2)}%</strong>
            </td>
          </tr>
        </tfoot>
      </table>
      
      {positions.length === 0 && (
        <div className="no-positions">
          No positions to display
        </div>
      )}
    </div>
  )
}

export default PositionsTable