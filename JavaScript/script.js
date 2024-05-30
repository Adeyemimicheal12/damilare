async function sendMoney() {
    const recipientAddress = document.getElementById('recipientAddress').value;
    const amount = document.getElementById('amount').value;

    if (!window.ethereum) {
        alert('MetaMask is not installed');
        return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    try {
        const tx = await signer.sendTransaction({
            to: recipientAddress,
            value: ethers.utils.parseEther(amount),
        });
        console.log('Transaction sent:', tx);
    } catch (error) {
        console.error('Transaction error:', error);
    }
}

async function convertToUSD() {
    const cryptoAmount = document.getElementById('cryptoAmount').value;
    const fiatAmountElement = document.getElementById('fiatAmount');

    if (!cryptoAmount) {
        alert('Please enter a valid amount');
        return;
    }

    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        const rate = data.ethereum.usd;
        const fiatAmount = (cryptoAmount * rate).toFixed(2);
        fiatAmountElement.textContent = `Equivalent in USD: $${fiatAmount}`;
    } catch (error) {
        console.error('Error fetching rate:', error);
        fiatAmountElement.textContent = 'Error fetching conversion rate';
    }
}
