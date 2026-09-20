/* Menu */
const arrow = document.getElementById("arrow");
const links = document.getElementById("links");
const one = document.getElementById("one");
const two = document.getElementById("two");

arrow.onclick = () => {
    links.classList.toggle("hide");

    if (links.classList.contains("hide")) {
        arrow.innerHTML = "▼";
    } else {
        arrow.innerHTML = "▲";
    }
};

document.getElementById("link1").onclick = (e) => {
    e.preventDefault();
    one.classList.remove("hide");
    two.classList.add("hide");
};

document.getElementById("link2").onclick = (e) => {
    e.preventDefault();
    one.classList.add("hide");
    two.classList.remove("hide");
};

/* Exercise 1 */
document.getElementById("days").onkeyup = (e) => {
    const missed = parseInt(e.target.value);

    if (e.target.value === "") {
        document.getElementById("result").innerHTML = "";
        document.getElementById("message").innerHTML = "";
    } else {
        const lost = (missed / 25) * 7;

        document.getElementById("result").innerHTML =
            `You will lose ${lost.toFixed(1)}% for skipping ${missed} days.`;

        if (missed === 0) {
            document.getElementById("message").innerHTML = "Great job!";
        } else if (missed <= 9 && missed > 0) {
            document.getElementById("message").innerHTML = "Try to get bettre.";
        } else if (missed >= 10 && missed <= 25) {
            document.getElementById("message").innerHTML = "Uh oh someone's being riskay!.";
        } else {
            document.getElementById("message").innerHTML = "IMPOSSABLE!";
        }
    }
};

/* Exercise 2 */
const lastDay = new Date(2026, 11, 4);
const today = new Date();
const daysLeft = Math.ceil((lastDay - today) / (1000 * 60 * 60 * 24));

document.getElementById("count").innerHTML =
    `You have ${daysLeft} days left in the semester.`;

if (daysLeft > 100) {
    document.getElementById("end").innerHTML = "Too many days.";
} else if (daysLeft >= 30 && daysLeft <= 100) {
    document.getElementById("end").innerHTML = "Keep it pushing!";
} else if (daysLeft > 0 && daysLeft < 30) {
    document.getElementById("end").innerHTML = "The semester is almost over!";
} else {
    document.getElementById("end").innerHTML = "The semester is over!";
}
