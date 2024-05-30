document.addEventListener('DOMContentLoaded', () => {
    const pricesDiv = document.getElementById('prices');

    async function fetchPrices() {
        const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin&vs_currencies=usd';

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            pricesDiv.innerHTML = `
                <div class="price">Bitcoin (BTC): $${data.bitcoin.usd}</div>
                <div class="price">Ethereum (ETH): $${data.ethereum.usd}</div>
                <div class="price">Litecoin (LTC): $${data.litecoin.usd}</div>
            `;
        } catch (error) {
            pricesDiv.innerHTML = '<p>Error fetching prices. Please try connecting to the internet.</p>';
            console.error('Error fetching data:', error);
        }
    }

    fetchPrices();
});