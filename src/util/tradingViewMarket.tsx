import React from "react"

let src = {
  colorTheme: "light",
  dateRange: "12M",
  showChart: true,
  width: "100%",
  height: "100%",
  isTransparent: false,
  showSymbolLogo: true,
  plotLineColorGrowing: "rgba(33, 150, 243, 1)",
  plotLineColorFalling: "rgba(33, 150, 243, 1)",
  gridLineColor: "rgba(240, 243, 250, 1)",
  scaleFontColor: "rgba(120, 123, 134, 1)",
  belowLineFillColorGrowing: "rgba(33, 150, 243, 0.12)",
  belowLineFillColorFalling: "rgba(33, 150, 243, 0.12)",
  symbolActiveColor: "rgba(33, 150, 243, 0.12)",
  tabs: [
    {
      title: "Saham",
      symbols: []
    }
  ]
}

export default class TVMarket extends React.Component<any, any> {
  componentDidUpdate() {
    const { symbols } = this.props

    if (symbols.length >= 1) {
      const symbolsArray = symbols.map((symbol: string) => ({ s: `IDX:${symbol}` }))
      src.tabs[0].symbols = symbolsArray
      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
      script.async = true
      script.innerHTML = JSON.stringify(src)
      document.getElementById("myContainer")!.appendChild(script)
    }
  }

  render() {
    const { symbols } = this.props

    if (symbols.length < 1) {
      return <div />
    }

    return (
      <div id="myContainer" style={{ height: "100%" }}>
        <div className="tradingview-widget-container">
          <div className="tradingview-widget-container__widget" />
        </div>
      </div>
    )
  }
}
