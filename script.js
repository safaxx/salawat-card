class CardNavigator {
  constructor(sectionSelector, prevBtnId, nextBtnId, counterId) {
    this.section = document.querySelector(sectionSelector);
    this.cards = this.section.querySelectorAll(".card");
    this.prevBtn = document.getElementById(prevBtnId);
    this.nextBtn = document.getElementById(nextBtnId);
    this.counter = document.getElementById(counterId);
    this.currentIndex = 0;

    this.init();
  }

  init() {
    this.updateDisplay();
    this.bindEvents();
  }

  bindEvents() {
    this.prevBtn.addEventListener("click", () => this.goToPrevious());
    this.nextBtn.addEventListener("click", () => this.goToNext());

    // Add keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.goToPrevious();
      if (e.key === "ArrowRight") this.goToNext();
    });

    // Add touch/swipe support
    let startX = 0;
    this.section.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    this.section.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        // Minimum swipe distance
        if (diff > 0) {
          this.goToNext();
        } else {
          this.goToPrevious();
        }
      }
    });
  }

  goToNext() {
    if (this.currentIndex < this.cards.length - 1) {
      this.currentIndex++;
      this.updateDisplay();
    }
  }

  goToPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateDisplay();
    }
  }

 updateDisplay() {
  this.cards.forEach((card, index) => {
    card.classList.remove("active", "prev", "next");

    if (index === this.currentIndex) {
      card.classList.add("active");
    } else if (index === this.currentIndex - 1) {
      // Only the immediately previous card gets 'prev' class
      card.classList.add("prev");
    } else if (index === this.currentIndex + 1) {
      // Only the immediately next card gets 'next' class
      card.classList.add("next");
    }
    // All other cards will have no classes and be hidden by CSS
  });

  // Update navigation buttons
  this.prevBtn.disabled = this.currentIndex === 0;
  this.nextBtn.disabled = this.currentIndex === this.cards.length - 1;

  // Update counter
  this.counter.textContent = `${this.currentIndex + 1} / ${
    this.cards.length
  }`;
}
  // Method to go to specific card
  goToCard(index) {
    if (index >= 0 && index < this.cards.length) {
      this.currentIndex = index;
      this.updateDisplay();
    }
  }
}

// Initialize navigation for both sections
document.addEventListener("DOMContentLoaded", () => {
  const benefitsNav = new CardNavigator(
    ".benefits-section",
    "benefitsPrev",
    "benefitsNext",
    "benefitsCounter"
  );

  const salawatNav = new CardNavigator(
    ".salawat-section",
    "salawatPrev",
    "salawatNext",
    "salawatCounter"
  );

  // Optional: Auto-play functionality
  // setInterval(() => {
  //   benefitsNav.goToNext();
  //   if (benefitsNav.currentIndex === benefitsNav.cards.length - 1) {
  //     benefitsNav.goToCard(0);
  //   }
  // }, 5000);
});
