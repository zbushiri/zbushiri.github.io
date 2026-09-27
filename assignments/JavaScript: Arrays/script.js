/* Google Maps search  */
const landmarks = {
    "Biltmore Estate, Asheville": "Biltmore+Estate,+Asheville,+NC",
    "Fort Sumter National Monument": "Fort+Sumter+National+Monument,+SC",
    "South Carolina State House": "South+Carolina+State+House,+Columbia,+SC",
    "USS Yorktown, Mount Pleasant": "USS+Yorktown,+Mount+Pleasant,+SC"
};

const natureSpots = {
    "Congaree National Park": "Congaree+National+Park,+SC",
    "Raven Rock State Park": "Raven+Rock+State+Park,+NC",
    "Falls Park on the Reedy": "Falls+Park+on+the+Reedy,+Greenville,+SC",
    "Jocassee Gorges": "Jocassee+Gorges,+SC"
};

const destinationType = document.getElementById("destination-type");
const destinations = document.getElementById("destinations");
const mapWrap = document.getElementById("map-wrap");
const map = document.getElementById("map");
const mapTitle = document.getElementById("map-title");

function showMap(name, location) {
    mapTitle.textContent = name;
    map.src = `https://www.google.com/maps?q=${location}&output=embed`;
    mapWrap.hidden = false;
}

function displayDestinations(destinationArray) {
    destinations.innerHTML = "";
    mapWrap.hidden = true;
    map.removeAttribute("src");

    for (const name in destinationArray) {
        const link = document.createElement("a");
        link.href = "#map-wrap";
        link.textContent = name;
        link.addEventListener("click", (event) => {
            event.preventDefault();
            showMap(name, destinationArray[name]);
        });
        destinations.append(link);
    }
}

destinationType.addEventListener("change", () => {
    if (destinationType.value === "landmarks") {
        displayDestinations(landmarks);
    } else if (destinationType.value === "nature") {
        displayDestinations(natureSpots);
    } else {
        destinations.innerHTML = "";
        mapWrap.hidden = true;
        map.removeAttribute("src");
    }
});
