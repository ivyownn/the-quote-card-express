"use strict";

const elements = {
  quote: document.getElementById("quote"),
  author: document.getElementById("author"),
};

async function updateBackgroundImage() {
  try {
    const response = await fetch("/api/photo");
    const data = await response.json();

    if (data.url) {
      const imgDiv = document.querySelector(".background-img");
      imgDiv.style.backgroundImage = `url("${data.url}")`;
    } else {
      console.error("No URL in response:", data);
    }
  } catch (error) {
    console.error("Failed to fetch background image:", error);
  }
}

// Call the function when the page loads
window.addEventListener("DOMContentLoaded", updateBackgroundImage);

// Your quote loop code (commented out for now)
// const quotes = [
//   {
//     quote: "All hands! Abandon ship!",
//     author: "Captain Picard",
//   },
//   {
//     quote: "Doh!",
//     author: "Homer Simpson",
//   },
//   {
//     quote:
//       "The Internet is the first thing that humanity has built that humanity doesn't understand...",
//     author: "Eric Schmidt",
//   },
// ];

// function loopThroughQuotes() {
//   let quoteIndex = 0;
//   setInterval(() => {
//     if (quoteIndex < quotes.length) {
//       elements.quote.textContent = quotes[quoteIndex].quote;
//       elements.author.textContent = quotes[quoteIndex].author;
//       quoteIndex++;
//     } else {
//       quoteIndex = 0;
//     }
//   }, 3000);
// }

// setTimeout(loopT