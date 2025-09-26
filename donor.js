document.getElementById("donorForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Collect form data
  const donorData = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    income: document.getElementById("income").value,
    document: document.getElementById("document").value,
    side: document.getElementById("side").value,
  };

  // Handle photo
  const photoInput = document.getElementById("photo");
  if (photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      donorData.photo = e.target.result; // Save photo as Base64
      saveAndRedirect(donorData);
    };
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    donorData.photo = "";
    saveAndRedirect(donorData);
  }
});

function saveAndRedirect(donorData) {
  // Save donor data to localStorage
  localStorage.setItem("donorProfile", JSON.stringify(donorData));

  // Redirect to profile page
  window.location.href = "profile.html";
}
