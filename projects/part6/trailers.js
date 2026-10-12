// * Gets the JSON file.
const jsonUrl = "https://zbushiri.github.io/projects/part6/json/trailers.json";

const getTrailers = async () => {
  const response = await fetch(jsonUrl);
  return response.json();
};

const showTrailers = async () => {
  const trailerList = document.getElementById("trailer-list");

  try {
    const trailers = await getTrailers();
    trailers.forEach((trailer) => {
      trailerList.append(makeTrailer(trailer));
    });
  } catch (error) {
    trailerList.innerHTML = "<p>Trailers could not load. Please try again later.</p>";
  }
};

// * Makes one trailer card.
const makeTrailer = (trailer) => {
  const card = document.createElement("button");
  card.classList.add("trailer-card");

  const image = document.createElement("img");
  image.src = trailer.img_name;
  image.alt = `${trailer.title} trailer`;
  card.append(image);

  const text = document.createElement("span");
  text.innerHTML = `<strong>${trailer.title}</strong><small>${trailer.type} | ${trailer.release}</small><small>${trailer.description}</small>`;
  card.append(text);

  card.onclick = () => {
    document.getElementById("trailer-video").src = trailer.video_url;
    document.getElementById("trailer-title").innerHTML = trailer.title;
  };

  return card;
};

showTrailers();
