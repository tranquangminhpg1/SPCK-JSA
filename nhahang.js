let allRecipes = []; // Lưu toàn bộ công thức món ăn
let allDrinks = [];  // Lưu toàn bộ công thức đồ uống
let displayedFoodCount = 3; // Số món ăn hiển thị ban đầu
let displayedDrinkCount = 3; // Số đồ uống hiển thị ban đầu

// Lấy dữ liệu món ăn
function fetchFoodData() {
    fetch("https://api.api-ninjas.com/v1/recipe?query=food", {
        method: "GET",
        headers: {
            "X-Api-Key": "WcYaIYifsTC+GUFKu+Imhg==goORcM3II5gdfa0F",
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(data => {
            allRecipes = data;
            displayRecipeList(); // Hiển thị danh sách món ăn
        })
        .catch(error => console.error("Lỗi khi lấy dữ liệu món ăn:", error));
}

// Lấy dữ liệu đồ uống
function fetchDrinkData() {
    fetch("https://api.api-ninjas.com/v1/recipe?query=drink", {
        method: "GET",
        headers: {
            "X-Api-Key": "WcYaIYifsTC+GUFKu+Imhg==goORcM3II5gdfa0F",
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(data => {
            allDrinks = data;
            displayDrinkList(); // Hiển thị danh sách đồ uống
        })
        .catch(error => console.error("error when take drinks information:", error));
}

// Hiển thị danh sách món ăn
function displayRecipeList() {
    let foodListDiv = document.getElementById("food-list");

    foodListDiv.innerHTML = ""; // Xóa danh sách cũ để cập nhật mới

    for (let i = 0; i < Math.min(displayedFoodCount, allRecipes.length); i++) {
        let item = allRecipes[i];

        let foodItem = document.createElement("div");
        foodItem.classList.add("food-item");

        foodItem.innerHTML = `
            <h3>${item.title}</h3>
            <p><strong>Meal:</strong> ${item.servings} People</p>
        `;

        let viewRecipeBtn = document.createElement("button");
        viewRecipeBtn.textContent = "Show recipe";

        let recipeDetails = document.createElement("div");
        recipeDetails.classList.add("recipe-details");
        recipeDetails.style.display = "none";

        recipeDetails.innerHTML = `
            <p><strong>Ingredients:</strong> ${item.ingredients}</p>
            <p><strong>Tutorial:</strong> ${item.instructions}</p>
        `;

        viewRecipeBtn.onclick = function () {
            recipeDetails.style.display = recipeDetails.style.display === "none" ? "block" : "none";
            viewRecipeBtn.textContent = recipeDetails.style.display === "none" ? "show recipe" : "hide recipe";
        };

        foodItem.appendChild(viewRecipeBtn);
        foodItem.appendChild(recipeDetails);
        foodListDiv.appendChild(foodItem);
    }
}

// Hiển thị danh sách đồ uống
function displayDrinkList() {
    let drinkListDiv = document.getElementById("drink-list");

    drinkListDiv.innerHTML = ""; // Xóa danh sách cũ để cập nhật mới

    for (let i = 0; i < Math.min(displayedDrinkCount, allDrinks.length); i++) {
        let item = allDrinks[i];

        let drinkItem = document.createElement("div");
        drinkItem.classList.add("drink-item");

        drinkItem.innerHTML = `
            <h3>${item.title}</h3>
            <p><strong>Type of drinks:</strong> ${item.servings} part</p>
        `;

        let viewRecipeBtn = document.createElement("button");
        viewRecipeBtn.textContent = "show recipe";

        let recipeDetails = document.createElement("div");
        recipeDetails.classList.add("recipe-details");
        recipeDetails.style.display = "none";

        recipeDetails.innerHTML = `
            <p><strong>Ingredients:</strong> ${item.ingredients}</p>
            <p><strong>Tutorial:</strong> ${item.instructions}</p>
        `;

        viewRecipeBtn.onclick = function () {
            recipeDetails.style.display = recipeDetails.style.display === "none" ? "block" : "none";
            viewRecipeBtn.textContent = recipeDetails.style.display === "none" ? "show recipe" : "hide recipe";
        };

        drinkItem.appendChild(viewRecipeBtn);
        drinkItem.appendChild(recipeDetails);
        drinkListDiv.appendChild(drinkItem);
    }
}

// Gọi API khi tải trang
fetchFoodData();
fetchDrinkData();
