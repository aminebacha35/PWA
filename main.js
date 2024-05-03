// Définition de la classe Film
class Film {
    constructor(title, releaseDate, authors, trailer) {
        this.title = title;
        this.releaseDate = releaseDate;
        this.authors = authors;
        this.trailer = trailer;
    }
}

// Fonction pour ajouter un film
function addMovie(event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    // Récupérer les valeurs du formulaire
    const title = document.getElementById('title').value;
    const releaseDate = document.getElementById('releaseDate').value;
    const authors = document.getElementById('authors').value;
    const fileInput = document.getElementById('upload');
    const trailer = fileInput.files[0]; // Récupérer le fichier vidéo

    // Créer un objet Film
    const movie = new Film(title, releaseDate, authors, trailer);

    // Ajouter le film à la liste
    const moviesList = document.getElementById('moviesList');
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    const videoElement = document.createElement('video');
    videoElement.width = "100%";
    videoElement.controls = true;
    const sourceElement = document.createElement('source');
    sourceElement.src = URL.createObjectURL(movie.trailer);
    sourceElement.type = "video/mp4";
    videoElement.appendChild(sourceElement);

    movieElement.innerHTML = `
        <h3>${movie.title}</h3>
        <p>Date de sortie: ${movie.releaseDate}</p>
        <p>Auteurs: ${movie.authors}</p>
    `;
    movieElement.appendChild(videoElement);

    // Boutons pour partager sur les réseaux sociaux et ajouter aux favoris
    const shareButton = document.createElement('button');
    shareButton.textContent = "Partager";
    shareButton.addEventListener('click', () => shareMovie(movie));
    const favoriteButton = document.createElement('button');
    favoriteButton.textContent = "Ajouter aux favoris";
    favoriteButton.addEventListener('click', () => addToFavorites(movie));

    movieElement.appendChild(shareButton);
    movieElement.appendChild(favoriteButton);

    moviesList.appendChild(movieElement);

    // Effacer les champs du formulaire
    document.getElementById('movieForm').reset();
}

// Fonction pour partager un film sur les réseaux sociaux
function shareMovie(movie) {
    // Construction de l'URL du partage sur Twitter avec le titre du film
    const shareUrl = `https://twitter.com/intent/tweet?text=Regardez ${movie.title}!`;
    // Ouvrir une nouvelle fenêtre de navigateur pour partager sur Twitter
    window.open(shareUrl, '_blank');
}

// Fonction pour ajouter un film aux favoris
function addToFavorites(movie) {
    // Récupérer les films favoris du stockage local
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // Vérifier si le film est déjà dans les favoris
    const isFavorite = favorites.some(favorite => favorite.title === movie.title);
    if (!isFavorite) {
        // Ajouter le film aux favoris
        favorites.push(movie);
        // Mettre à jour les favoris dans le stockage local
        localStorage.setItem('favorites', JSON.stringify(favorites));
        // Afficher un message de confirmation
        alert('Film ajouté aux favoris !');
    } else {
        // Si le film est déjà dans les favoris, afficher un message d'erreur
        alert('Ce film est déjà dans les favoris.');
    }
}

// Écouter l'événement de soumission du formulaire
document.getElementById('movieForm').addEventListener('submit', addMovie);

// Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => console.log('Service Worker registered'))
            .catch(error => console.error('Service Worker registration failed:', error));
    });
}
