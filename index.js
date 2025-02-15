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
    socialIcons[0].href = profile.socialLinks.twitter;
    socialIcons[1].href = profile.socialLinks.linkedin;
    socialIcons[2].href = profile.socialLinks.github;
    socialIcons[3].href = profile.socialLinks.youtube;
    const workExperienceData = data.workExperience;

    // Target container for dynamic rendering
    const workContainer = document.querySelector(".work-experiance-main");
    if (workContainer) {
      workContainer.innerHTML = "";
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
    // const experienceList2 = workExperienceData
    //   .map(createExperienceItem)
    //   .join(""); if more than 5 list is needed enable this and css 622
    // <ul class="work-experiance-slider list-unstyled">${experienceList2}</ul>
    // Append dynamic content to both lists
    if (workContainer)
      workContainer.innerHTML = `
        <ul class="work-experiance-slider list-unstyled">${experienceList1}</ul>
      
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
      console.log(item, index);
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

    const footerText = document.querySelector(".footer-area .text p");
    if (footerText && data.footer) {
      footerText.innerHTML = `${data.footer.text} <a href="${data.footer.link.url}" target="_blank">${data.footer.link.text}</a>`;
    }

    const expertiseContainer = document.querySelector(".expertise-main .row");

    if (expertiseContainer && data.expertise) {
      expertiseContainer.innerHTML = ""; // Clear existing content

      data.expertise.forEach((item) => {
        const expertiseItem = `
            <div class="col-xl-4 col-md-4 col-sm-6 col-6">
              <div class="expertise-item">
                <div class="image text-center">
                  <img src="${item.icon}" alt="${item.name}" />
                </div>
                <div class="text">
                  <h4 class="title">${item.name}</h4>
                </div>
              </div>
            </div>
          `;
        expertiseContainer.insertAdjacentHTML("beforeend", expertiseItem);
      });
    }

    const productsContainer = document.querySelector(".services-main .row");

    if (productsContainer && data.products) {
      productsContainer.innerHTML = ""; // Clear existing content

      data.products.forEach((product) => {
        const productItem = `
            <div class="col-md-3 col-sm-6 col-6">
              <div class="services-item text-center">
              <a href="${product.link}" target="_blank">
                <div class="image">
                  <img src="${product.icon}" alt="${product.name}" height="50" width="50"/>
                </div>
                <div class="text">
                  <h3 class="title">${product.name}</h3>
                </div>
              </a>
              </div>
            </div>
          `;
        productsContainer.insertAdjacentHTML("beforeend", productItem);
      });
    }
    const scrollingInfo = document.querySelector(
      ".scrolling-info .slider-item p"
    );
    if (scrollingInfo && data.workTogether) {
      scrollingInfo.textContent = data.workTogether.scrollingText;
    }

    // ✅ Update Headings
    const heading = document.querySelector(
      ".lets-talk-together-card .card-title"
    );
    if (heading && data.workTogether) {
      heading.innerHTML = `${data.workTogether.heading} <span class="d-block">${data.workTogether.subheading}</span>`;
    }

    // ✅ Update Button Text & Link
    const workButton = document.querySelector(
      ".lets-talk-together-card .link-btn"
    );
    if (workButton && data.workTogether.button) {
      workButton.href = data.workTogether.button.link;
      workButton.childNodes[0].textContent =
        data.workTogether.button.text + " "; // Ensures space before SVG
    }
    const projectsContainer = document.querySelector(".projects-main .row");

    if (projectsContainer && data.projects) {
      projectsContainer.innerHTML = ""; // Clear existing content

      data.projects.forEach((project) => {
        const projectItem = `
            <div class="col-lg-12">
            <a href="${project.link}" target="_blank">
              <div class="project-item">
                <div class="image">
                  <img src="${project.image}" alt="${project.title}" class="img-fluid w-100" />
                  <a href="${project.preview}" class="gallery-popup full-image-preview parent-container">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                      <path d="M10 4.167v11.666M4.167 10h11.666"></path>
                    </svg>
                  </a>
                  <div class="info">
                    <span class="category">${project.category}</span>
                  </div>
                </div>

              </div>
              </a>
            </div>
          `;
        projectsContainer.insertAdjacentHTML("beforeend", projectItem);
      });
    }
    const resumeText = document.querySelector(".card-text");
    if (resumeText && data.resume) {
      resumeText.textContent = data.resume.text;
    }

    // ✅ Update Resume Download Button
    const resumeButton = document.querySelector(".link-btn.gggggg");
    if (resumeButton && data.resume.button) {
      resumeButton.href = data.resume.button.link;
      const btnTextNode = resumeButton.childNodes[0]; // First text node
      if (btnTextNode.nodeType === Node.TEXT_NODE) {
        btnTextNode.textContent = data.resume.button.label + " "; // Add space before SVG
      }
    }
  })

  .catch((error) => console.error("Error loading JSON:", error));
