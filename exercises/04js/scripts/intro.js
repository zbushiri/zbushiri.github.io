// shows message when clicked
document.getElementById("btn-show-message").onclick = (e) => {
    document.getElementById("p-message").innerHTML = "Hello World";
    e.target.innerHTML = "done!";
};

// styles the link when clicked
document.getElementById("link").onclick = (e) => {
    e.preventDefault(); //doesn't go to link destination
    e.target.classList.add("cool-link");
};

// ball bounce once button clicked
document.getElementById("btn-bounce").onclick = (e) => {
    document.getElementById("ball").classList
}