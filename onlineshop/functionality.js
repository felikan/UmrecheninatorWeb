const buyButton = document.getElementById('Kaufen');

buyButton.addEventListener('click', () => {
  const order = {
    name: 'John Doe',
    address: '123 Main St.',
    items: ['Produkt 1', 'Produkt 2']
  };
  fetch('/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Bestellung fehlgeschlagen');
    }
    console.log('Bestellung erfolgreich');
  })
  .catch(error => {
    console.error(error);
    alert('Bestellung fehlgeschlagen');
  });
});

const searchButton = document.getElementById('Suchen');

buyButton.addEventListener('click', () => {
  // Hier fügen Sie den Code hinzu, der ausgeführt werden soll, wenn der Button geklickt wird
  console.log('Der Button wurde geklickt!');
});

