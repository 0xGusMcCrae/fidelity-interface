import React, { useEffect, useRef } from 'react'

interface TradingViewWidgetProps {
  symbol: string;
}

// Declare global TradingView types
declare global {
  interface Window {
    TradingView: {
      widget: new (config: any) => any;
    };
  }
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({ symbol }) => {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/tv.js'
    script.async = true
    script.onload = () => {
      if (window.TradingView && container.current) {
        new window.TradingView.widget({
          width: '100%',
          height: 500,
          symbol: `NASDAQ:${symbol}`,
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          withdateranges: true,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          container_id: container.current.id
        })
      }
    }
    
    document.body.appendChild(script)
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [symbol])

  return (
    <div className="tradingview-widget">
      <div id={`tradingview_${symbol}`} ref={container} style={{ height: '500px' }} />
    </div>
  )
}

export default TradingViewWidget