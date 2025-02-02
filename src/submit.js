document.querySelectorAll(".pickup-btn").forEach(button => {
    button.addEventListener("click", function () {
      const restaurantName = this.previousElementSibling.previousElementSibling.textContent;
      alert(Pickup option selected for: ${restaurantName});
      
    });
  });