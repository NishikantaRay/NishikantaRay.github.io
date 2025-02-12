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
    if (workContainer) {
      workContainer.innerHTML = ""; // Clear existing content
    }
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
    if (workContainer)
      workContainer.innerHTML = `
        <ul class="work-experiance-slider list-unstyled">${experienceList1}</ul>
        <ul class="work-experiance-slider list-unstyled">${experienceList2}</ul>
      `;
    if (!data.menu || !Array.isArray(data.menu)) {
      console.error("Menu data is missing or incorrect in menu.json");
      return;
    }

    // ✅ Select all existing menu items
    const navbarItems = document.querySelectorAll(".navbar-info .nav-item");

    // ✅ Ensure navbarItems exists
    if (navbarItems.length === 0) {
      console.warn("No navbar items found in HTML.");
      return;
    }

    data.menu.forEach((item, index) => {
      if (navbarItems[index]) {
        const navLink = navbarItems[index].querySelector(".nav-link");
        if (navLink) {
          navLink.href = item.link;
          const navText = navLink.querySelector("span");
          if (navText) {
            navText.textContent = item?.label || "Unnamed";
          }
        }
      }
    });
    const mainLogo = document.getElementById("main-logo");

    if (mainLogo) mainLogo.src = data.brand.logo;

    const innerLogo = document.getElementById("inner-logo");

    if (innerLogo) innerLogo.src = data.brand.logo;
    const letsTalkBtn = document.querySelector(".lets-talk-btn");
    if (letsTalkBtn && data.buttons.letsTalk) {
      letsTalkBtn.href = data.buttons.letsTalk.link;
      const btnTextNode = letsTalkBtn.childNodes[0]; // First text node
      if (btnTextNode.nodeType === Node.TEXT_NODE) {
        btnTextNode.textContent = data.buttons.letsTalk.label + " "; // Add space before icon
      }
    }
  })

  .catch((error) => console.error("Error loading JSON:", error));
