// Récupérer les films favoris du stockage local
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Afficher les films favoris dans la page
const favoritesList = document.getElementById('favoritesList');
favorites.forEach(favorite => {
    const favoriteElement = document.createElement('div');
    favoriteElement.classList.add('favorite');
    favoriteElement.innerHTML = `
        <h3>${favorite.title}</h3>
        <p>Date de sortie: ${favorite.releaseDate}</p>
        <p>Auteurs: ${favorite.authors}</p>
    `;
    favoritesList.appendChild(favoriteElement);
});
