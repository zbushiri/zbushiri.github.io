/**
 * Anime Shelf
 * Gets anime recommendations from the AniList GraphQL API.
 * Source: https://docs.anilist.co/guide/graphql/
 */

/* Page Elements */
const animeList = document.querySelector("#anime-list");
const animeStatus = document.querySelector("#anime-status");
const finder = document.querySelector("#anime-finder");
const genreInput = document.querySelector("#genre");
const moreAnime = document.querySelector("#more-anime");
const shownIds = new Set();

/* AniList GraphQL Search */
const animeQuery = `
query ($genre: String, $page: Int) {
  Page(page: $page, perPage: 12) {
    media(
      type: ANIME
      status: FINISHED
      genre: $genre
      format_in: [TV, MOVIE]
      countryOfOrigin: JP
      isAdult: false
      genre_not_in: ["Ecchi", "Horror"]
      tag_not_in: ["Nudity", "Sexual Content", "Female Harem", "Male Harem"]
      minimumTagRank: 50
      popularity_greater: 3000
      averageScore_greater: 65
      sort: [POPULARITY_DESC, SCORE_DESC]
    ) {
      id
      title { english romaji }
      coverImage { extraLarge large }
      genres
      averageScore
      siteUrl
    }
  }
}`;

/* Keeps API text safe before adding it to the page */
const safe = (value) =>
  String(value || "").replace(
    /[&<>\"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '\"': "&quot;",
      })[character],
  );

/** Adds the returned anime cards to the page. */
function showResults(anime, append) {
  const cards = anime
    .map((item) => {
      const title = item.title.english || item.title.romaji;
      const image = item.coverImage.extraLarge || item.coverImage.large;
      return `<a class="card anime-card" href="${safe(item.siteUrl)}" target="_blank" rel="noopener noreferrer">
          <img src="${safe(image)}" alt="${safe(title)} cover art">
          <div><p class="eyebrow">${safe(item.genres.slice(0, 3).join(" · "))}</p>
          <h2>${safe(title)}</h2><p>${item.averageScore ? `${item.averageScore}% AniList score` : "Not yet rated"}</p></div>
        </a>`;
    })
    .join("");
  if (append) animeList.insertAdjacentHTML("beforeend", cards);
  else animeList.innerHTML = cards;
}

/** Changes the order so each search feels different. */
function shuffle(items) {
  return items.sort(() => Math.random() - 0.5);
}

/** Sends a POST request using the query and variables required by AniList. */
async function requestAnime(genre, page) {
  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: animeQuery, variables: { genre, page } }),
  });
  if (!response.ok) throw new Error(`AniList returned ${response.status}`);
  return (await response.json()).data?.Page?.media || [];
}

/** Finds anime for the selected genre and displays the results. */
async function findAnime(genre, append = false) {
  animeStatus.textContent = `Finding random ${genre} anime...`;
  moreAnime.disabled = true;
  if (!append) {
    animeList.innerHTML = "";
    shownIds.clear();
  }
  try {
    const randomPage = Math.floor(Math.random() * 8) + 1;
    let anime = await requestAnime(genre, randomPage);
    if (!anime.length) anime = await requestAnime(genre, 1);
    anime = shuffle(anime).filter((item) => !shownIds.has(item.id));
    if (!anime?.length) throw new Error("No matches found");
    anime.forEach((item) => shownIds.add(item.id));
    showResults(anime, append);
    animeStatus.textContent = `Showing ${shownIds.size} random ${genre} recommendations.`;
  } catch (error) {
    console.error(error);
    animeStatus.textContent = append
      ? "No new titles were found this time. Try Suggest More again."
      : "Recommendations are temporarily unavailable. Please try again.";
    if (!append)
      animeList.innerHTML =
        '<article class="panel"><h2>Could not reach AniList</h2><p>The anime finder needs an internet connection.</p></article>';
  } finally {
    moreAnime.disabled = false;
  }
}

/* Page Controls */
finder.addEventListener("submit", (event) => {
  event.preventDefault();
  findAnime(genreInput.value);
});
moreAnime.addEventListener("click", () => findAnime(genreInput.value, true));

findAnime(genreInput.value);
