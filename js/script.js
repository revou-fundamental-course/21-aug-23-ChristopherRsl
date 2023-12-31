document.addEventListener("DOMContentLoaded", function () {
  const welcomeMessage = document.getElementById("welcomeMessage");
  const inputForm = document.getElementById("inputForm");
  const displayContainer = document.getElementById("displayContainer");
  const navLinks = document.querySelectorAll("nav ul li a");
  const images = [
    document.getElementById("hvrd1"),
    document.getElementById("hvrd2"),
    document.getElementById("hvrd3"),
  ];
  let currentIndex = 0;

  // Hide all images except the first one
  for (let i = 1; i < images.length; i++) {
    images[i].style.display = "none";
  }
  // Function to show next image in the slideshow
  function showNextImage() {
    images[currentIndex].style.display = "none";
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].style.display = "block";
  }

  // Initial display of images and slideshow setup
  images[currentIndex].style.display = "block";
  setInterval(showNextImage, 3000); // Change image every 5 seconds

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Prompt user for their name
  const userName = prompt("Please enter your name:");

  // Update the welcome message if a name is provided
  if (userName) {
    welcomeMessage.textContent = `Hi ${userName}, Welcome To Harvard Website`;
  }

  // Load form data from local storage if available
  const formDataJSON = localStorage.getItem("formData");
  const formData = formDataJSON ? JSON.parse(formDataJSON) : {};

  // Populate display container with saved data
  const displayContent = `
    <p><span class="label">Current Time:</span> <span class="value">${
      formData.currentTime || "..."
    }</span></p>
    <p><span class="label">Name:</span> <span class="value">${
      formData.name || "..."
    }</span></p>
    <p><span class="label">Birthday:</span> <span class="value">${
      formData.birthday || "..."
    }</span></p>
    <p><span class="label">Gender:</span> <span class="value">${
      formData.gender || "..."
    }</span></p>
    <p><span class="label">About:</span> <span class="value">${
      formData.about || "..."
    }</span></p>

  `;
  displayContainer.innerHTML = `<div class="display-content">${displayContent}</div>`;

  inputForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const name = inputForm.elements.name.value;
    const birthday = inputForm.elements.birthday.value;
    const gender = inputForm.elements.gender.value;
    const about = inputForm.elements.about.value;
    const currentTime = new Date();
    const currentDate = ` ${currentTime.toDateString()} ${currentTime.toLocaleTimeString()}`;

    const displayContent = `
        <p><span class="label">Current Time:</span> <span class="value">${currentDate} </span></p>
        <p><span class="label">Name:</span> <span class="value">${name}</span></p>
        <p><span class="label">Birthday:</span> <span class="value">${birthday}</span></p>
        <p><span class="label">Gender:</span> <span class="value">${gender}</span></p>
        <p><span class="label">About:</span> <span class="value">${about}</span></p>
      `;

    displayContainer.innerHTML = `<div class="display-content">${displayContent}</div>`;

    // Save form data to local storage as JSON
    const formDataToSave = {
      name: name,
      birthday: birthday,
      gender: gender,
      about: about,
      currentTime: currentDate,
    };
    localStorage.setItem("formData", JSON.stringify(formDataToSave));
  });
});
