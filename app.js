const filters = document.querySelectorAll("[data-filter]");
const listings = document.querySelectorAll(".property");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const type = filter.dataset.filter;
    filters.forEach((option) => {
      option.setAttribute("aria-pressed", String(option === filter));
    });
    listings.forEach((listing) => {
      listing.hidden = type !== "all" && listing.dataset.type !== type;
    });
  });
});

const contactForm = document.querySelector("#contact-form");
const contactEmail = document.querySelector("#contact-email");
const contactStatus = document.querySelector("#contact-status");

const topicSelect = contactForm.elements.keperluan;
const otherTopic = document.querySelector("#other-topic");
const otherInput = contactForm.elements.keperluan_lain;

function updateOtherTopic() {
  const showOtherTopic = topicSelect.value === "lainnya";
  otherTopic.hidden = !showOtherTopic;
  otherInput.disabled = !showOtherTopic;
  otherInput.required = showOtherTopic;
}

topicSelect.addEventListener("change", updateOtherTopic);
updateOtherTopic();

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = new FormData(contactForm);
  const name = fields.get("nama").trim();
  const message = fields.get("pesan").trim();
  const topic = topicSelect.value === "lainnya"
    ? otherInput.value.trim()
    : topicSelect.value;

  if (!name || !message || !topic) {
    contactStatus.textContent = "Lengkapi nama, keperluan, dan pesan.";
    return;
  }

  const subject = encodeURIComponent(`My-Properti | ${topic}`);
  const body = encodeURIComponent([
    "Halo My-Properti,",
    "",
    `Nama: ${name}`,
    `Keperluan: ${topic}`,
    "",
    message,
  ].join("\r\n"));
  contactStatus.textContent = "Kirim pesan dari aplikasi emailmu. Kamu juga bisa menggunakan alamat email yang tertera.";
  window.location.href = `${contactEmail.href}?subject=${subject}&body=${body}`;
});

const siteHeader = document.querySelector(".site-header");
const updateHeaderHeight = () => {
  document.documentElement.style.setProperty("--header-height", `${siteHeader.offsetHeight}px`);
};

updateHeaderHeight();
new ResizeObserver(updateHeaderHeight).observe(siteHeader);
