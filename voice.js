document.addEventListener('DOMContentLoaded', () => {
    if (annyang) {
      const commands = {
        'hello': () => {
          alert('Hello!');
        },
        'change the color to *color': (color) => {
          document.body.style.backgroundColor = color.toLowerCase();
        },
        'navigate to *page': (page) => {
          const destination = page.toLowerCase().trim();
          if (destination.includes('home')) {
            window.location.href = 'home.html';
          } else if (destination.includes('stocks')) {
            window.location.href = 'stocks.html';
          } else if (destination.includes('dogs')) {
            window.location.href = 'dogs.html';
          }
        },
        'look up *name': (name) => {
          const stockTicker = name.trim().toUpperCase();
          const dateRange = 30;
          if (stockTicker) {
            fetchStockData(stockTicker, dateRange);
          }
        },
        'load *breed': (breed) => {
          loadBreed(breed.trim());
        }
      }
  
      annyang.addCommands(commands);
  
      const startBtn = document.getElementById('startBtn');
      const stopBtn = document.getElementById('stopBtn');
  
      if (startBtn && stopBtn) {
        startBtn.addEventListener('click', () => {
          annyang.start();
        });
  
        stopBtn.addEventListener('click', () => {
          annyang.abort();
        });
      }
    }
  });

  async function loadBreed(breedName) {
    const response = await fetch('https://dogapi.dog/api/v2/breeds');
    const data = await response.json();
  
    const matched = data.data.find(b => b.attributes.name.toLowerCase() === breedName.toLowerCase());
  
    if (matched) {
      displayBreedInfo(matched.attributes);
    }
  }

  
  
