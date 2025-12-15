let expenses = [];

function addExpense() {
    let name = document.getElementById("name").value;
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;

    if (name === "" || amount === "") {
        alert("Please fill all fields!");
        return;
    }

    expenses.push({
        id: Date.now(),     // e fix nya ang delete
        name,
        amount: parseFloat(amount),
        category
    });

    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";

    filterExpenses(); // naa gyapon ang filter
}

function displayExpenses(data) {
    let tbody = document.getElementById("expenseList");
    tbody.innerHTML = "";

    let total = 0;

    data.forEach((item) => {
        total += item.amount;
        tbody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>₱${item.amount.toFixed(2)}</td>
                <td>${item.category}</td>
                <td><button class="delete-btn" onclick="deleteExpense(${item.id})">Delete</button></td>
            </tr>
        `;
    });

    document.getElementById("total").innerText = total.toFixed(2);
}

function deleteExpense(id) {
    expenses = expenses.filter(item => item.id !== id);
    filterExpenses(); // e refresh nya ang filter
}

function filterExpenses() {
    let filterValue = document.getElementById("filterCategory").value;

    if (filterValue === "All") {
        displayExpenses(expenses);
    } else {
        let filtered = expenses.filter(item => item.category === filterValue);
        displayExpenses(filtered);
    }
}