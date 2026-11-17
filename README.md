# Fathom — Live Trading Dashboard

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://mrchandrayee.github.io/fathom-live-trading-dashboard/)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org) [![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

A responsive, browser-runnable recreation of the trading dashboard shown in the supplied screen recording.

## Visible product structure recreated
- Fathom brand and dark trading-terminal theme
- Left navigation: Overview, Markets, Portfolio, Orders, Trade history, Watchlist, Price alerts, Settings
- Summary metrics: Total balance, Today's P&L, Available funds, Open positions
- Market overview with BTC/USD and ETH/USD selector and 1D / 1W / 1M / 1Y chart ranges
- Volume histogram and order book with ask/bid depth
- Open positions table and watchlist
- Buy/Sell demo order modal with order type, amount, price, estimated total
- Responsive desktop/tablet/mobile layout

## Run locally
No npm install or build step is needed.

```bash
python3 -m http.server 8000
```
Open http://localhost:8000.

You can also open `index.html` directly in a modern browser.

## Interactions
- Switch BTC/USD and ETH/USD view labels.
- Change chart range.
- Click metric cards to open the demo order panel.
- Switch Buy/Sell, adjust amount/price and submit the demo order.
- Add a watchlist row.
- Hover/move across the market chart to move the chart marker.

## Important: demo, not a live broker
The screen recording demonstrates a trading UI, but does not provide an actual broker API, exchange credentials, live market feed, or backend trading implementation. All displayed balances, quotes, order book levels, positions and order submission are simulated locally for UI demonstration. No real trades are placed and no funds are accessed.

## Source fidelity
The video title reads **“Live trading dashboard animation”** and the visible brand reads **Fathom**. The original code panes/source files are not shown in this recording. Therefore this project recreates the visible screens and interaction flow; it is not an extraction of the original source repository or backend.

## 👨‍💻 Author

**mrchandrayee** · [GitHub](https://github.com/mrchandrayee)

## 📄 License

[MIT License](./LICENSE)
