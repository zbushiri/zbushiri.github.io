// * Sends the email.
document.getElementById("contact-form").onsubmit = async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const result = document.getElementById("contact-result");

  formData.append("access_key", "34f630b6-fbd1-4cb3-8d8b-631d61c7f8f6");
  result.innerHTML = "Your message is getting ready for takeoff...";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      result.innerHTML = "Message sent! Your note made it to Cozy Corner ☁️";
      form.reset();
    } else {
      result.innerHTML = "Oops! " + data.message;
    }
  } catch (error) {
    result.innerHTML = "The message got lost in the clouds. Please try again.";
  }

  setTimeout(() => {
    result.innerHTML = "";
  }, 1000);
};
