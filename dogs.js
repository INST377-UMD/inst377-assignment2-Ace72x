document.addEventListener('DOMContentLoaded', () => {
    loadDogImages();
    loadBreedButtons();
  });
  
  async function loadDogImages() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random/10');
    const data = await response.json();
  
    const carousel = document.getElementById('dogCarousel');
    carousel.innerHTML = '';
  
    carousel.removeAttribute('data-simple-slider');
  
    data.message.forEach(imgUrl => {
      const img = document.createElement('img');
      img.src = imgUrl;
      img.style.width = '100%';
      img.style.height = '100%';
      carousel.appendChild(img);
    });
  
    setTimeout(() => {
      carousel.setAttribute('data-simple-slider', '');
      simpleslider.getSlider();
    }, 100);
  }
  
  async function loadBreedButtons() {
    const container = document.getElementById('breedButtonsContainer');
    container.innerHTML = '';
  
    const response = await fetch('https://dogapi.dog/api/v2/breeds');
    const data = await response.json();
    const allBreeds = data.data;
  
    const shuffled = allBreeds.sort(() => 0.5 - Math.random());
    const selectedBreeds = shuffled.slice(0, 10);
  
    selectedBreeds.forEach(breedObj => {
      const breed = breedObj.attributes;
  
      const button = document.createElement('button');
      button.textContent = breed.name;
      button.className = 'breed-button';
      button.addEventListener('click', () => displayBreedInfo(breed));
      container.appendChild(button);
    });
  }
  
  
  function fetchBreeds() {
    fetch('https://dogapi.dog/api/v2/breeds')
      .then(response => response.json())
      .then(data => {
        displayBreedButtons(data.data);
      });
  }
  
  function displayBreedButtons(breeds) {
    const breedButtonsContainer = document.getElementById('breedButtonsContainer');
    
    breedButtonsContainer.innerHTML = '';
  
    breeds.forEach(breed => {
      const breedButton = document.createElement('button');
      breedButton.textContent = breed.attributes.name;
      breedButton.classList.add('breed-button');

      breedButton.addEventListener('click', function() {
        displayBreedInfo(breed.attributes);
      });
  
      breedButtonsContainer.appendChild(breedButton);
    });
  }

  function displayBreedInfo(breed) {
    const breedInfoContainer = document.getElementById('breedInfoContainer');
  
    breedInfoContainer.style.display = 'block';

    console.log(breed); 
  
    breedInfoContainer.innerHTML = `
      <h3>${breed.name}</h3>
      <p>${breed.description}</p>
      <p><strong>Min Life: </strong>${breed.life.min} years</p>
      <p><strong>Max Life: </strong>${breed.life.max} years</p>
    `;
  }
  
  window.onload = fetchBreeds;
  
  
  