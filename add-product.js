document.addEventListener('DOMContentLoaded', () => {
  // We grab the physical input boxes once, so the browser doesn't have to keep looking for them.
  const formElement = document.getElementById('newProductForm');
  const titleInput = document.getElementById('productTitle');
  const priceInput = document.getElementById('productPrice');
  const descInput = document.getElementById('productDesc');
  const categoryInput = document.getElementById('productCategory');
  const imageInput = document.getElementById('productImage');
  
  const modalElement = document.getElementById('addProductModal');
  const bootstrapModal = new bootstrap.Modal(modalElement);

  //  LISTEN FOR THE ACTION
  formElement.addEventListener('submit', async (event) => {
    event.preventDefault(); // the page reloads.

    // Now we look inside the boxes we grabbed earlier to see what the user actually typed.
    const newProductData = {
      title: titleInput.value.trim(),
      price: parseFloat(priceInput.value.trim()), 
      description: descInput.value.trim(),
      category: categoryInput.value,
      image: imageInput.value.trim()
    };

    // EXECUTE THE API CALL
    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProductData)
      });

      const data = await response.json();
      console.log('Success! Product Added:', data);
      
      // 5. CLEAN UP
      formElement.reset(); // Clears all the input boxes
      bootstrapModal.hide(); // Closes the UI modal
      
    } catch (error) {
      console.error('Critical Error: Failed to add product:', error);
    }
  });
});