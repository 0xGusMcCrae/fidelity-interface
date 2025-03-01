import { useState, useEffect } from 'react'
import './App.css'
import TradingViewWidget from './components/TradingViewWidget'
import OrderBook from './components/OrderBook'
import TradeForm from './components/TradeForm'
import PositionsTable from './components/PositionsTable'
import { fetchPositions, fetchOrderBook, submitOrder } from './api/fidelityApi'

function App(): JSX.Element {
  const [symbol, setSymbol] = useState('AAPL')
  const [positions, setPositions] = useState<any[]>([])
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadPositions()
    loadOrderBook(symbol)
    
    const intervalId = setInterval(() => {
      loadOrderBook(symbol)
      loadPositions()
    }, 5000)
    
    return () => clearInterval(intervalId)
  }, [symbol])

  const loadPositions = async (): Promise<void> => {
    try {
      const data = await fetchPositions()
      setPositions(data)
    } catch (err) {
      setError('Failed to load positions')
      console.error(err)
    }
  }

  const loadOrderBook = async (sym: string): Promise<void> => {
    try {
      const data = await fetchOrderBook(sym)
      setOrderBook(data)
    } catch (err) {
      setError('Failed to load order book')
      console.error(err)
    }
  }

  const handleSymbolChange = (newSymbol: string): void => {
    setSymbol(newSymbol)
    loadOrderBook(newSymbol)
  }

  const handleTradeSubmit = async (orderDetails: any): Promise<void> => {
    setIsLoading(true)
    setError(null)
    
    try {
      await submitOrder({
        ...orderDetails,
        symbol: symbol
      })
      
      await loadPositions()
    } catch (err: any) {
      setError(`Trade failed: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app-container">
      <header>
        <h1>Custom Fidelity Trading Interface</h1>
        <div className="symbol-search">
          <input 
            type="text" 
            value={symbol} 
            onChange={(e) => handleSymbolChange(e.target.value)}
            placeholder="Enter symbol"
          />
        </div>
      </header>
      
      <div className="main-content">
        <div className="left-panel">
          <TradingViewWidget symbol={symbol} />
        </div>
        
        <div className="right-panel">
          <OrderBook data={orderBook} />
          <TradeForm onSubmit={handleTradeSubmit} isLoading={isLoading} />
        </div>
      </div>
      
      <div className="bottom-panel">
        <PositionsTable positions={positions} />
      </div>
      
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}

export default App