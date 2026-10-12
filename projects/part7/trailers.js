// * Gets the JSON file.
const jsonUrl = "https://zbushiri.github.io/projects/part7/json/trailers.json";

const getTrailers = async () => {
  const response = await fetch(jsonUrl);
  return response.json();
};

const showTrailers = async () => {
  const trailers = await getTrailers();
  trailers.forEach((trailer) => {
    document.getElementById("trailer-list").append(makeTrailer(trailer));
  });
};

// * Makes one trailer card.
const makeTrailer = (trailer) => {
  const card = document.createElement("article");
  card.classList.add("trailer-card");

  const title = document.createElement("h2");
  title.innerHTML = trailer.title;
  card.append(title);

  const image = document.createElement("img");
  image.src = trailer.img_name;
  image.alt = `${trailer.title} trailer`;
  card.append(image);

  const info = document.createElement("p");
  info.innerHTML = `${trailer.type} | ${trailer.release}<br>${trailer.description}`;
  card.append(info);

  const video = document.createElement("iframe");
  video.src = trailer.video_url;
  video.title = `${trailer.title} trailer`;
  video.allowFullscreen = true;
  card.append(video);

  return card;
};

showTrailers();
