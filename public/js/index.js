"use strict";

const elements = {
  quote: document.getElementById("quote"),
  author: document.getElementById("author"),
};

async function getRandomImage() {
  const endpoint = "http://localhost:8080/api/v1/getRandomImage";
  try {
    const response = await fetch(endpoint);
    const returnedData = await response.json();
    const receivedPhotoUrl = returnedData.data;

    const imgDiv = document.querySelector(".background-img");
    imgDiv.style.backgroundImage = `url(${receivedPhotoUrl})`;
  } catch (error) {
    console.error("Error fetching image:", error);
  }
}

// Call the function when the page loads
window.addEventListener("DOMContentLoaded", getRandomImage);

// Optional: Quote loop code (currently commented out)
/*
const quotes = [
  {
    quote: "All hands! Abandon ship!",
    author: "Captain Picard",
  },
  {
    quote: "Doh!",
    author: "Homer Simpson",
  },
  {
    quote: "The Internet is the first thing that humanity has built that humanity doesn't understand...",
    author: "Eric Schmidt",
  },
];

function loopThroughQuotes() {
  let quoteIndex = 0;
  setInterval(() => {
    if (quoteIndex < quotes.length) {
      elements.quote.textContent = quotes[quoteIndex].quote;
      elements.author.textContent = quotes[quoteIndex].author;
      quoteIndex++;
    } else {
      quoteIndex = 0;
    }
  }, 3000);
}

setTimeout(loopThroughQuotes, 3000);
*/
