/* Vacation Class */
class Vacation {
    // Save each vacation's information
    constructor(title, type, description, thingsToDo, image, mapSrc) {
        this.title = title;
        this.type = type;
        this.description = description;
        this.thingsToDo = thingsToDo;
        this.image = image;
        this.mapSrc = mapSrc;
    }

    // Create one vacation card
    getCard() {
        const card = document.createElement("section");
        card.classList.add("vacation");
        card.innerHTML = `
            <h2>${this.title}</h2>
            <p>${this.type} Vacation</p>
            <img src="images/${this.image}" alt="${this.title}">
        `;
        card.onclick = () => this.showDetails();
        return card;
    }

    // Add this vacation's details to the modal
    showDetails() {
        document.getElementById("vacation-map").src = this.mapSrc;
        document.getElementById("vacation-info").innerHTML = `
            <h2>${this.title}</h2>
            <p><strong>Type:</strong> ${this.type}</p>
            <p><strong>Description:</strong> ${this.description}</p>
            <p><strong>Things To Do:</strong> ${this.thingsToDo}</p>
        `;
        document.getElementById("vacation-modal").style.display = "block";
    }
}

/* Japanese Vacation Data */
const vacations = [
    new Vacation("Mount Fuji", "Mountain", "Japan's tallest mountain and a famous national landmark.", "Hike, visit Fuji Five Lakes, and enjoy the views.", "mount-fuji.svg", "https://www.google.com/maps?q=Mount+Fuji,Japan&output=embed"),
    new Vacation("Hakone", "Mountain", "A peaceful mountain town known for hot springs and views of Mount Fuji.", "Visit Lake Ashi, ride the ropeway, and relax in an onsen.", "hakone.svg", "https://www.google.com/maps?q=Hakone,Japan&output=embed"),
    new Vacation("Nikko", "Mountain", "A mountain destination filled with forests, waterfalls, and shrines.", "See Toshogu Shrine, Kegon Falls, and Lake Chuzenji.", "nikko.svg", "https://www.google.com/maps?q=Nikko,Japan&output=embed"),
    new Vacation("Okinawa", "Beach", "A tropical island area with clear water and coral reefs.", "Swim, snorkel, and visit Okinawa Churaumi Aquarium.", "okinawa.svg", "https://www.google.com/maps?q=Okinawa,Japan&output=embed"),
    new Vacation("Kamakura", "Beach", "A coastal city with beaches, temples, and the Great Buddha.", "Visit the Great Buddha, explore temples, and relax at the beach.", "kamakura.svg", "https://www.google.com/maps?q=Kamakura,Japan&output=embed"),
    new Vacation("Shirahama", "Beach", "A seaside town known for white sand and hot springs.", "Enjoy Shirarahama Beach, visit Sandanbeki Cliffs, and try an onsen.", "shirahama.svg", "https://www.google.com/maps?q=Shirahama,Wakayama,Japan&output=embed")
];

/* Display Vacations */
const displayVacations = () => {
    const vacationList = document.getElementById("vacation-list");
    vacations.forEach((vacation) => vacationList.append(vacation.getCard()));
};

/* Modal Controls adapted from W3Schools */
const modal = document.getElementById("vacation-modal");
document.getElementById("close-btn").onclick = () => modal.style.display = "none";
window.onclick = (event) => {
    if (event.target === modal) modal.style.display = "none";
};

/* Start Page */
displayVacations();
