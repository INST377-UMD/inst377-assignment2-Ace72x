const API_KEY = 'YeCTFxcqMMbPIgt_vnNio_TWpsGWfqt1';
const redditAPI = 'https://tradestie.com/api/v1/apps/reddit?date=2022-04-03';



function displayChart(dates, prices) {
    document.getElementById('stockChart').style.display = 'block';
    const ctx = document.getElementById('stockChart').getContext('2d');

    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Stock Price',
                data: prices,
                borderColor: 'red',
                backgroundColor: 'white',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
            },
            scales: {
                x: {
                    title: {
                        display: true,
                    }
                },
                y: {
                    title: {
                        display: true,
                    }
                }
            }
        }
    });
}


document.getElementById('lookupButton').addEventListener('click', () => {
    const stockTicker = document.getElementById('stockTicker').value.toUpperCase();
    const dateRange = document.getElementById('dateSelect').value;
    if (stockTicker) {
        fetchStockData(stockTicker, dateRange);
    }
});


async function fetchStockData(ticker, days) {
    const multiplier = 1;
    const timespan = 'day';
    const toDate = new Date().toISOString().split('T')[0]; // today
    const fromDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/${multiplier}/${timespan}/${fromDate}/${toDate}?apiKey=${API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();


    const dates = [];
    const prices = [];

    data.results.forEach((day) => {
        const date = new Date(day.t);
        const formattedDate = date.toISOString().split('T')[0];
        dates.push(formattedDate);
        prices.push(day.c);
    });

    displayChart(dates, prices);
}

async function fetchRedditStocks() {
    const response = await fetch(redditAPI);
    const data = await response.json();
    const topStocks = data.slice(0, 5);
    
    const tableBody = document.getElementById('redditTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    topStocks.forEach(stock => {
        const row = document.createElement('tr');
        const tickerCell = document.createElement('td');
        const commentCountCell = document.createElement('td');
        const sentimentCell = document.createElement('td');

        commentCountCell.textContent = stock.no_of_comments;

        const sentimentIcon = document.createElement('img');
        sentimentIcon.src = stock.sentiment === 'Bullish' ? 'https://img.freepik.com/premium-vector/bull-market-bull-bullish-run-market-trend-stocks-trade-exchange-economy-crash-boom_635702-609.jpg' : 'https://img.freepik.com/premium-vector/bear-market-bearish-market-trend-stocks-trade-exchange-background-down-arrow-graph_635702-606.jpg';
        sentimentCell.appendChild(sentimentIcon);

        const yahooLink = document.createElement('a');
        yahooLink.href = `https://finance.yahoo.com/quote/${stock.ticker}`;
        yahooLink.target = '_blank';
        yahooLink.textContent = stock.ticker;
        yahooLink.style.textDecoration = 'none';
        yahooLink.style.color = 'Blue';
        
        tickerCell.appendChild(yahooLink);

        row.appendChild(tickerCell);
        row.appendChild(commentCountCell);
        row.appendChild(sentimentCell);
        tableBody.appendChild(row);
    });
}

window.onload = fetchRedditStocks;
