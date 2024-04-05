document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('new-list-form');
    const listContainer = document.getElementById('list-container');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const itemName = document.getElementById('item-name').value;
        const itemQuantity = document.getElementById('item-quantity').value;
        const itemPrice = document.getElementById('item-price').value;

        const newItem = { itemName, itemQuantity, itemPrice };
        addToLocalStorage(newItem);
        displayLists();
    });

    function displayLists() {
        const lists = getFromLocalStorage('lists') || [];

        listContainer.innerHTML = '';
        lists.forEach(list => {
            const listElement = document.createElement('div');
            listElement.textContent = `Article: ${list.itemName}, Quantité: ${list.itemQuantity}, Prix: ${list.itemPrice}`;
            listContainer.appendChild(listElement);
        });
    }

    function addToLocalStorage(newItem) {
        const currentLists = getFromLocalStorage('lists') || [];

        currentLists.push(newItem);

        localStorage.setItem('lists', JSON.stringify(currentLists));
    }

    function getFromLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    displayLists();
});
