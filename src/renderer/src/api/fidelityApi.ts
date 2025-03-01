export const fetchPositions = async (): Promise<any[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { 
            symbol: 'AAPL', 
            quantity: 10, 
            avgPrice: 150.25, 
            currentPrice: 155.75, 
            pnl: 55.0, 
            pnlPercent: 3.66, 
            marketValue: 1557.50 
          },
          { 
            symbol: 'MSFT', 
            quantity: 5, 
            avgPrice: 300.50, 
            currentPrice: 310.25, 
            pnl: 48.75, 
            pnlPercent: 3.24, 
            marketValue: 1551.25 
          },
          { 
            symbol: 'AMZN', 
            quantity: 8, 
            avgPrice: 130.75, 
            currentPrice: 125.50, 
            pnl: -42.0, 
            pnlPercent: -4.02, 
            marketValue: 1004.00 
          }
        ])
      }, 500)
    })
  }
  
  export const fetchOrderBook = async (symbol: string): Promise<{bids: any[], asks: any[]}> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const generateOrders = (basePrice: number, isBid: boolean) => {
          const orders = []
          const modifier = isBid ? -1 : 1
          let totalSize = 0
          
          for (let i = 0; i < 10; i++) {
            const price = basePrice + (modifier * i * 0.05)
            const size = Math.floor(Math.random() * 200) + 50
            totalSize += size
            
            orders.push({
              price,
              size,
              total: totalSize
            })
          }
          
          return orders
        }
        
        let basePrice
        switch (symbol.toUpperCase()) {
          case 'AAPL':
            basePrice = 155.75
            break
          case 'MSFT':
            basePrice = 310.25
            break
          case 'AMZN':
            basePrice = 125.50
            break
          default:
            basePrice = 100.00
        }
        
        resolve({
          bids: generateOrders(basePrice, true),
          asks: generateOrders(basePrice, false)
        })
      }, 300)
    })
  }
  
  export const submitOrder = async (orderDetails: any): Promise<any> => {
    console.log('Order submitted:', orderDetails)
    
    // Use the API exposed by the preload script
    if (window.api) {
      try {
        const result = await window.api.placeOrder(orderDetails)
        return result
      } catch (error: any) {
        throw new Error('Order failed: ' + error.message)
      }
    }
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          resolve({ success: true, orderId: 'ord_' + Math.random().toString(36).substring(2, 10) })
        } else {
          reject(new Error('Order rejected by exchange'))
        }
      }, 1000)
    })
  }