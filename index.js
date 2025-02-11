fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    // Render Profile Section
    const profile = data.profile;
    document.querySelector(".profile-card .image img").src =
      profile.profileImage;
    document.querySelector(".profile-card .card-title").textContent =
      profile.name;
    document.querySelector(
      ".profile-card p"
    ).innerHTML = `${profile.title} having <span>${profile.experience}</span>`;
    document
      .querySelector(".btn-copy")
      .setAttribute("data-clipboard-text", profile.email);
    const socialIcons = document.querySelectorAll(".social-media-icon ul li a");
    socialIcons[0].href = profile.socialLinks.facebook;
    socialIcons[1].href = profile.socialLinks.pinterest;
    socialIcons[2].href = profile.socialLinks.github;
    socialIcons[3].href = profile.socialLinks.youtube;
    const workExperienceData = data.workExperience;

    // Target container for dynamic rendering
    const workContainer = document.querySelector(".work-experiance-main");
    workContainer.innerHTML = ""; // Clear existing content

    // Function to create list item for each experience
    const createExperienceItem = (exp) => `
        <li>
          <div class="date">
            <p>${exp.years}</p>
          </div>
          <div class="info">
            <div class="icon">
              <img src="${exp.icon}" alt="${exp.company}">
            </div>
            <div class="text">
              <h4 class="title">${exp.company}</h4>
              <h6 class="subtitle">${exp.role}</h6>
            </div>
          </div>
        </li>`;

    // Generate experience lists dynamically
    const experienceList1 = workExperienceData
      .map(createExperienceItem)
      .join("");
    const experienceList2 = workExperienceData
      .map(createExperienceItem)
      .join("");

    // Append dynamic content to both lists
    workContainer.innerHTML = `
        <ul class="work-experiance-slider list-unstyled">${experienceList1}</ul>
        <ul class="work-experiance-slider list-unstyled">${experienceList2}</ul>
      `;
  })

  .catch((error) => console.error("Error loading JSON:", error));
