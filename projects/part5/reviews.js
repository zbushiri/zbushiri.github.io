/* Got help learning how to impliment user specific reviews so that everyone can only delete their comment */
const reviewKey = "cozy-corner-reviews";
const reviewForm = document.querySelector("#review-form");
const reviewText = document.querySelector("#review-text");
const reviewCount = document.querySelector("#review-count");
const reviewList = document.querySelector("#review-list");
const reviewStatus = document.querySelector("#review-status");
const ownerKey = "cozy-corner-review-owner";
let ownerId;
try {
    ownerId = localStorage.getItem(ownerKey);
    if (!ownerId) {
        ownerId = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
        localStorage.setItem(ownerKey, ownerId);
    }
} catch {
    ownerId = "storage-unavailable";
}

const starterReviews = [
    { name: "Cozy Corner", type: "Anime", title: "Violet Evergarden", text: "Beautiful, patient, and deeply human. Its quietest moments carry the most weight." },
    { name: "Cozy Corner", type: "Game", title: "Stardew Valley", text: "A relaxing game about building a farm, meeting a community, and enjoying life at your own pace." }
];

function getReviews() {
    try {
        return JSON.parse(localStorage.getItem(reviewKey)) || starterReviews;
    } catch {
        return starterReviews;
    }
}

function saveReviews(reviews) {
    try { localStorage.setItem(reviewKey, JSON.stringify(reviews)); } catch { return false; }
    return true;
}

function renderReviews() {
    const reviews = getReviews();
    reviewList.replaceChildren(...reviews.map((review, index) => {
        const article = document.createElement("article");
        article.className = "panel review-item";
        const type = document.createElement("p");
        type.className = "eyebrow";
        type.textContent = review.type;
        const title = document.createElement("h3");
        title.textContent = review.title;
        const text = document.createElement("p");
        text.textContent = review.text;
        const meta = document.createElement("p");
        meta.className = "review-meta";
        meta.textContent = `Posted by ${review.name}`;
        article.append(type, title, text, meta);
        if (review.owner === ownerId) {
            const remove = document.createElement("button");
            remove.className = "remove-own-review";
            remove.type = "button";
            remove.textContent = "Remove my review";
            remove.addEventListener("click", () => {
                const updated = getReviews();
                if (updated[index]?.owner !== ownerId) return;
                updated.splice(index, 1);
                saveReviews(updated);
                renderReviews();
            });
            article.append(remove);
        }
        return article;
    }));
    reviewStatus.textContent = `${reviews.length} favorite${reviews.length === 1 ? "" : "s"} shared on this device.`;
}

reviewText.addEventListener("input", () => reviewCount.textContent = reviewText.value.length);
reviewForm.addEventListener("submit", event => {
    event.preventDefault();
    const reviews = getReviews();
    reviews.unshift({
        name: document.querySelector("#review-name").value.trim(),
        type: document.querySelector("#review-type").value,
        title: document.querySelector("#review-title").value.trim(),
        text: reviewText.value.trim(),
        owner: ownerId
    });
    reviewStatus.textContent = saveReviews(reviews) ? "Your favorite was posted!" : "Your browser could not save the review.";
    reviewForm.reset();
    reviewCount.textContent = "0";
    renderReviews();
});

renderReviews();
