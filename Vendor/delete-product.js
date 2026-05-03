document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("productsContainer");
  const confirmBtn = document.getElementById("confirmDeleteBtn");
  const deleteModal = new bootstrap.Modal(document.getElementById("deleteProductModal"));

  // 1. OPEN MODAL: When they click any delete button
  productsContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".delete-product-btn");
    if (!btn) return;

    // Grab the ID from the card and pass it to the Modal's Confirm button
    confirmBtn.dataset.productId = btn.dataset.productId;
    
    // Grab the title directly from the card (No store lookup needed for a simple UI update)
    const card = btn.closest(".itemContainer");
    const title = card.querySelector(".itemTitle").textContent;
    document.getElementById("deleteProductTitle").textContent = title;

    deleteModal.show();
  });

  // 2. DO THE DELETE: When they click "Yes, Delete"
  confirmBtn.addEventListener("click", async () => {
    const id = confirmBtn.dataset.productId;

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" });

      if (response.ok) {
        // Remove from the UI immediately
        document.querySelector(`[data-product-id="${id}"]`).remove();
        deleteModal.hide();
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  });
});