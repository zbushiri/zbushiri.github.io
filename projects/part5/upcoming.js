const apiUrl = "https://graphql.anilist.co";
const cacheKey = "cozy-corner-upcoming-anime-v3";
const cacheTime = 6 * 60 * 60 * 1000;

const query = `
query ($today: FuzzyDateInt, $page: Int) {
  Page(page: $page, perPage: 9) {
    pageInfo { hasNextPage }
    media(
      type: ANIME
      status: NOT_YET_RELEASED
      startDate_greater: $today
      format_in: [TV, MOVIE]
      countryOfOrigin: JP
      isAdult: false
      genre_not_in: ["Ecchi", "Horror"]
      tag_not_in: ["Nudity", "Sexual Content", "Female Harem", "Male Harem"]
      minimumTagRank: 50
      popularity_greater: 10000
      sort: [START_DATE, POPULARITY_DESC]
    ) {
      id
      title { english romaji }
      format
      startDate { year month day }
      coverImage { extraLarge large }
      siteUrl
      description(asHtml: false)
    }
  }
}`;

const list = document.querySelector("#release-list");
const status = document.querySelector("#release-status");
const loadMore = document.querySelector("#load-more");
let currentPage = 1;

const escapeHtml = value => String(value ?? "").replace(/[&<>"]/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"
})[character]);

function plainText(value) {
    return new DOMParser().parseFromString(value || "Description coming soon.", "text/html")
        .body.textContent.trim();
}

function formatDate(date) {
    if (!date.year) return "Date to be announced";
    if (!date.month) return String(date.year);
    const options = date.day
        ? { year: "numeric", month: "long", day: "numeric" }
        : { year: "numeric", month: "long" };
    return new Date(date.year, date.month - 1, date.day || 1).toLocaleDateString("en-US", options);
}

function showAnime(anime, append = false) {
    const cards = anime.map(item => {
        const title = item.title.english || item.title.romaji;
        const image = item.coverImage?.extraLarge || item.coverImage?.large || "images/soon.jpg";
        const url = item.siteUrl?.startsWith("https://anilist.co/") ? item.siteUrl : "https://anilist.co";
        const summary = plainText(item.description).slice(0, 220);

        return `
          <a class="card release-card" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">
            <img src="${escapeHtml(image)}" alt="${escapeHtml(title)} cover art">
            <div>
              <p class="eyebrow">${escapeHtml((item.format || "Anime").replaceAll("_", " "))}</p>
              <h2>${escapeHtml(title)}</h2>
              <p class="date">${escapeHtml(formatDate(item.startDate))}</p>
              <p class="summary">${escapeHtml(summary)}</p>
            </div>
          </a>`;
    }).join("");
    if (append) list.insertAdjacentHTML("beforeend", cards);
    else list.innerHTML = cards;
}

function todayNumber() {
    const today = new Date();
    return Number(`${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`);
}

async function loadAnime(page = 1, append = false) {
    loadMore.disabled = true;
    loadMore.textContent = append ? "Loading..." : "Load More";
    try {
        let saved;
        try {
            saved = JSON.parse(localStorage.getItem(cacheKey));
        } catch {
            localStorage.removeItem(cacheKey);
        }
        if (page === 1 && saved && Date.now() - saved.time < cacheTime) {
            showAnime(saved.anime);
            loadMore.hidden = !saved.hasNextPage;
            status.textContent = "Upcoming releases refresh automatically every six hours.";
            return true;
        }

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query, variables: { today: todayNumber(), page } })
        });
        if (!response.ok) throw new Error(`AniList returned ${response.status}`);

        const result = await response.json();
        const anime = result.data?.Page?.media;
        const hasNextPage = result.data?.Page?.pageInfo?.hasNextPage;
        if (!anime?.length) throw new Error("No upcoming anime were returned");

        if (page === 1) {
            try {
                localStorage.setItem(cacheKey, JSON.stringify({ time: Date.now(), anime, hasNextPage }));
            } catch {
                // The page still works when browser storage is disabled.
            }
        }
        showAnime(anime, append);
        loadMore.hidden = !hasNextPage;
        status.textContent = append
            ? `Showing ${list.children.length} upcoming anime.`
            : `Updated ${new Date().toLocaleString()}. Refreshes automatically every six hours.`;
        return true;
    } catch (error) {
        console.error(error);
        if (!append) list.innerHTML = `<article class="panel"><h2>Releases are temporarily unavailable</h2><p>Please try again later. The rest of Cozy Corner is still available.</p></article>`;
        status.textContent = append ? "Could not load more titles. Please try again." : "Could not reach AniList right now.";
        return false;
    } finally {
        loadMore.disabled = false;
        loadMore.textContent = "Load More";
    }
}

loadAnime();
loadMore.addEventListener("click", async () => {
    const nextPage = currentPage + 1;
    if (await loadAnime(nextPage, true)) currentPage = nextPage;
});
setInterval(() => {
    currentPage = 1;
    loadAnime();
}, cacheTime);
