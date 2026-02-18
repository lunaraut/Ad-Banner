let impressionCount = 0;

async function loadProducts() {
  const loader = document.getElementById("loader");
  const errorDiv = document.getElementById("error");
  const container = document.getElementById("product-container");

  try {
    const response = await fetch("data/products.json");

    if (!response.ok) {
      throw new Error("Network error");
    }

    const products = await response.json();
    loader.classList.add("hidden");

    products.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.productName}">
        <h2 class="product-name">${product.productName}</h2>
        <p class="product-price">₹${product.price}</p>
        
        <a href="${product.productUrl}" target="_blank" class="shop-btn">Shop Now</a>
        <div class="timer">Offer ends in: <span>${product.offerEndsIn}</span>s</div>
      `;

      container.appendChild(productDiv);
      impressionCount++;

      document.getElementById("impression-display").textContent =
        "Impressions: " + impressionCount;

      console.log("Ad Impression Recorded for:", product.productName);
      
      // After rendering product
      console.count("Ad Impression");

      //   Now every time banner loads → impression is recorded
      // console.log("Ad Impression Recorded for:", product.productName);


      // Animation trigger
      setTimeout(() => {
        productDiv.querySelector(".product-name").classList.add("show");
        productDiv.querySelector(".product-price").classList.add("show");
      }, 200);

      // Click tracking
      const button = productDiv.querySelector(".shop-btn");
      button.addEventListener("click", () => {
        console.log("Ad Click Recorded:", product.productName);
        // window.open(product.productUrl, "_blank");
      });

      // Countdown Timer
      let timeLeft = product.offerEndsIn;
      const timerSpan = productDiv.querySelector(".timer span");

      const countdown = setInterval(() => {
        timeLeft--;
        timerSpan.textContent = timeLeft;

        if (timeLeft <= 0) {
          clearInterval(countdown);

          // Change timer text
          timerSpan.parentElement.textContent = "Offer Expired!";
          
          // Disable button
          button.disabled = true;

          // Optional: Change button text
          button.textContent = "Expired";

          // Optional: Add style class
          button.classList.add("disabled-btn");

        }
      }, 1000);
    });
    console.log("Total Impressions:", impressionCount);

  } catch (error) {
    loader.classList.add("hidden");
    errorDiv.classList.remove("hidden");
    console.error(error);
  }
}




loadProducts();
