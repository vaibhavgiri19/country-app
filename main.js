document.addEventListener('DOMContentLoaded', () => {
    const countriesContainer = document.getElementById('countries-container');
    const sortPopulationAscBtn = document.getElementById('sort-population-asc');
    const sortPopulationDescBtn = document.getElementById('sort-population-desc');

    const API_URL = 'https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries';

    let countries = [];

    const fetchCountries = async (sort = '') => {
        try {
            const response = await fetch(`${API_URL}${sort}`);
            const data = await response.json();
            countries = data.data;
            console.log(countries); // Debugging: check the structure of the fetched data
            displayCountries(countries);
        } catch (error) {
            console.error('Error fetching countries:', error);
            countriesContainer.innerHTML = '<p>Something went wrong. Please try again later.</p>';
        }
    };

    const displayCountries = (countries) => {
        countriesContainer.innerHTML = '';
        countries.forEach(country => {
            const countryCard = document.createElement('div');
            countryCard.className = 'country-card';
            countryCard.innerHTML = `
                <img src="${country.flag}" alt="${country.country} Flag">
                <h2>${country.country}</h2>
                <p>Population: ${country.population.toLocaleString()}</p>
                <p>Region: ${country.region ? country.region : 'N/A'}</p>
                <p>Capital: ${country.capital ? country.capital : 'N/A'}</p>
            `;
            countriesContainer.appendChild(countryCard);
        });
    };

    sortPopulationAscBtn.addEventListener('click', () => {
        fetchCountries('?sort=population&order=asc');
    });

    sortPopulationDescBtn.addEventListener('click', () => {
        fetchCountries('?sort=population&order=desc');
    });

    // Initial fetch without sorting
    fetchCountries();
});
