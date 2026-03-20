const productsContainerElem = document.getElementById("productsContainer");

async function getAndDisplayProducts() {
  try {
    // Making API request to get products
    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      console.error("We could not fetch the product");
      return;
    }

    const products = await response.json();

    // Getting the length (size) of the products array
    const productsLength = products.length;

    // Looping to display each product on the UI
    for (let index = 0; index < productsLength; index++) {
      const currentProduct = products[index];

      const itemContainerElem = document.createElement("div");
      itemContainerElem.classList.add("itemContainer");
      itemContainerElem.innerHTML = `
        <img src="${currentProduct.image}" class="itemImage"/>
        <h3 class="itemTitle">${currentProduct.title}</h3>
        <p class="itemDesc">${currentProduct.description}</p>
        <h2 class="itemPrice">${currentProduct.price}</h2>
      `;
      productsContainerElem.appendChild(itemContainerElem);
    }
  } catch (error) {
    console.error(error);
  }
}

getAndDisplayProducts();