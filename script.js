

// =========================
// CARLY'S NAILS TECH
// INTERACTIVE GALLERY
// =========================

// Replace this with Carly's actual WhatsApp number.
// Include the country code, without + or spaces.
const whatsappNumber = "2348145300731";

const designs = [
  {
    name: "Purple Floral Glam",
    image: "ChatGPT Image Nov 20, 2026, 11_13_23 AM.jpg "
  },
  {
    name: "Gold Luxury",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=85"
  },
  {
    name: "Bling Chic",
    image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=900&q=85"
  },
  {
    name: " Brown Luxe ",
    image: " ChatGPT Image Nov 20, 2026, 11_29_12 AM.jpg  "
  },
  
 
  {
    name: "Glamorous Pink Rhinestone ",
    image: " Glamorous Pink Rhinestone Manicure.png "
  },
  {
    name: "  Red French Elegance",
    image: " ChatGPT Image Nov 20, 2026, 11_13_07 AM - Copy.jpg  "
  },
  {
    name: "  Pink Glam",
    image: " ChatGPT Image Nov 20, 2026, 11_13_15 AM.jpg "
  },
  {
    name: "Pink And Black Glam",
    image: " ChatGPT Image Nov 20, 2026, 11_12_59 AM.jpg "
  }
];

// =========================
// GALLERY ELEMENTS
// =========================

const galleryGrid = document.getElementById("galleryGrid");
const moreBtn = document.getElementById("moreBtn");

let visibleDesigns = 8;
let currentDesignIndex = 0;

// =========================
// WHATSAPP BOOKING
// =========================

function bookDesign(designName) {
  const message = `Hello Carly's Nails Asthetics! I would like to book the ${designName} nail design. Please let me know the available dates and prices.`;

  const url = `https://wa.me/${+2348145300731}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}

// =========================
// CREATE GALLERY CARDS
// =========================

function renderGallery() {
  galleryGrid.innerHTML = "";

  designs.slice(0, visibleDesigns).forEach((design, index) => {

    const card = document.createElement("article");
    card.className = "gallery-card";

    card.innerHTML = `
      <div class="gallery-image">

        <img
          src="${design.image}"
          alt="${design.name} nail design"
          loading="lazy"
        >

        <button class="zoom-icon" aria-label="Enlarge ${design.name}">
          ⌕
        </button>

      </div>

      <div class="gallery-info">

        <h3>${design.name}</h3>

        <button class="btn-primary book-design">
          ♡ Book This Design
        </button>

      </div>
    `;

    // Open image modal
    card.querySelector(".zoom-icon").addEventListener("click", () => {
      openModal(index);
    });

    // Book individual design
    card.querySelector(".book-design").addEventListener("click", () => {
      bookDesign(design.name);
    });

    // Clicking the picture also opens the modal
    card.querySelector(".gallery-image img").addEventListener("click", () => {
      openModal(index);
    });

    galleryGrid.appendChild(card);
  });

  // Hide button when all designs are shown
  moreBtn.style.display =
    visibleDesigns >= designs.length ? "none" : "inline-flex";
}

// =========================
// VIEW MORE DESIGNS
// =========================

moreBtn.addEventListener("click", () => {

  visibleDesigns += 4;

  renderGallery();

});

// =========================
// IMAGE MODAL
// =========================

const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalBook = document.getElementById("modalBook");

const modalClose = document.getElementById("modalClose");
const modalPrev = document.getElementById("modalPrev");
const modalNext = document.getElementById("modalNext");

function openModal(index) {
  currentDesignIndex = index;

  updateModal();

  imageModal.classList.add("active");

  document.body.style.overflow = "hidden";
}

function updateModal() {
  const design = designs[currentDesignIndex];

  modalImage.src = design.image;
  modalImage.alt = design.name;
  modalTitle.textContent = design.name;

  modalBook.onclick = (event) => {
    event.preventDefault();
    bookDesign(design.name);
  };
}

function closeModal() {
  imageModal.classList.remove("active");

  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);

// Close modal when clicking outside the image
imageModal.addEventListener("click", (event) => {
  if (event.target === imageModal) {
    closeModal();
  }
});

// =========================
// PREVIOUS / NEXT IMAGES
// =========================

modalNext.addEventListener("click", () => {

  currentDesignIndex++;

  if (currentDesignIndex >= designs.length) {
    currentDesignIndex = 0;
  }

  updateModal();

});

modalPrev.addEventListener("click", () => {

  currentDesignIndex--;

  if (currentDesignIndex < 0) {
    currentDesignIndex = designs.length - 1;
  }

  updateModal();

});

// Keyboard navigation
document.addEventListener("keydown", (event) => {

  if (!imageModal.classList.contains("active")) return;

  if (event.key === "Escape") {
    closeModal();
  }

  if (event.key === "ArrowRight") {
    modalNext.click();
  }

  if (event.key === "ArrowLeft") {
    modalPrev.click();
  }

});

// =========================
// MOBILE NAVIGATION
// =========================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

  navLinks.classList.toggle("active");

  menuToggle.textContent =
    navLinks.classList.contains("active") ? "✕" : "☰";

});

navLinks.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("active");

    menuToggle.textContent = "☰";

  });

});

// =========================
// ALL GENERAL WHATSAPP BUTTONS
// =========================

document.querySelectorAll(".whatsapp-btn").forEach(button => {

  button.addEventListener("click", (event) => {

    event.preventDefault();

    bookDesign("a nail appointment");

  });

});

// =========================
// INITIALIZE WEBSITE
// =========================

renderGallery();

// =========================
// CONTACT FORM TO WHATSAPP
// =========================

const bookingForm = document.getElementById("bookingForm");
const dateInput = document.getElementById("appointmentDate");

// Prevent customers from selecting past dates
const today = new Date();
const localToday = new Date(
  today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

dateInput.min = localToday;

// Form submission
bookingForm.addEventListener("submit", function(event) {

  event.preventDefault();

  // Collect form values
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const email = document.getElementById("customerEmail").value.trim();
  const service = document.getElementById("service").value;
  const date = document.getElementById("appointmentDate").value;
  const time = document.getElementById("appointmentTime").value;
  const message = document.getElementById("customerMessage").value.trim();

  
  const whatsappMessage = `
Hello Carly's Nails Asthetics! 💅

I would like to book an appointment.

👤 Name: ${name}
📞 Phone: ${phone}
📧 Email: ${email || "Not provided"}

💅 Service: ${service}
📅 Preferred Date: ${date}
⏰ Preferred Time: ${time}

📝 Additional Message:
${message || "No additional message"}

Please let me know if my preferred appointment is available.

Thank you! 💗
  `;

  // Encode message for WhatsApp
  const encodedMessage = encodeURIComponent(whatsappMessage);

  // WhatsApp booking URL
  const whatsappURL =
    `https://wa.me/${+2348145300731}?text=${encodedMessage}`;

  // Open WhatsApp
  window.open(whatsappURL, "_blank");

});
