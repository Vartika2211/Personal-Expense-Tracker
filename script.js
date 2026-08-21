const modal = document.getElementById("transactionModal");

const addExpenseBtn =
    document.getElementById("addExpenseBtn");

const floatingAdd =
    document.getElementById("floatingAdd");

const floatingRemove =
    document.getElementById("floatingRemove");

const closeModal =
    document.getElementById("closeModal");

const saveTransaction =
    document.getElementById("saveTransaction");

const transactionList =
    document.getElementById("transactionList");

const transactionName =
    document.getElementById("transactionName");

const transactionAmount =
    document.getElementById("transactionAmount");

const transactionType =
    document.getElementById("transactionType");

const incomeAmount =
    document.getElementById("incomeAmount");

const expenseAmount =
    document.getElementById("expenseAmount");

const tabs =
    document.querySelectorAll(".tab");

const chartGroups =
    document.querySelectorAll(".chart-bar-group");

const periodBtn =
    document.getElementById("periodBtn");

const periodText =
    document.getElementById("periodText");

let income = 2645;

let expenses = 1895;

let currentPeriod = "Day";


function openModal() {

    modal.classList.add("show");

}

function closeTransactionModal() {

    modal.classList.remove("show");

}

addExpenseBtn.addEventListener(
    "click",
    openModal
);

floatingAdd.addEventListener(
    "click",
    openModal
);

closeModal.addEventListener(
    "click",
    closeTransactionModal
);

modal.addEventListener("click", function (event) {

    if (event.target === modal) {

        closeTransactionModal();

    }

});


saveTransaction.addEventListener(
    "click",
    function () {

        const name =
            transactionName.value.trim();

        const amount =
            parseFloat(
                transactionAmount.value
            );

        const type =
            transactionType.value;

        if (name === "" || isNaN(amount)) {

            alert(
                "Please enter a transaction name and amount."
            );

            return;

        }

        const transaction =
            document.createElement("div");

        transaction.classList.add(
            "transaction"
        );

        let iconClass;

        if (type === "income") {

            iconClass = "income";

        } else {

            iconClass = "shopping";

        }

        let amountText;

        if (type === "income") {

            amountText =
                `+$${amount.toFixed(2)}`;

        } else {

            amountText =
                `-$${amount.toFixed(2)}`;

        }


        transaction.innerHTML = `

        <div class="transaction-left">

            <div class="transaction-icon ${iconClass}">
                <i class="fas fa-wallet"></i>
            </div>

            <div>

                <strong>${name}</strong>

                <span>Just now</span>

            </div>

        </div>

        <strong class="${
            type === "income"
                ? "transaction-income"
                : "transaction-expense"
        }">

            ${amountText}

        </strong>

        `;

        transactionList.prepend(
            transaction
        );

        if (type === "income") {

            income += amount;

            incomeAmount.textContent =
                `Rs ${income.toFixed(2)}`;

        } else {

            expenses += amount;

            expenseAmount.textContent =
                `Rs ${expenses.toFixed(2)}`;

        }

        transactionName.value = "";

        transactionAmount.value = "";

        transactionType.value =
            "expense";

        closeTransactionModal();

    }
);

floatingRemove.addEventListener(
    "click",
    function () {

        const transactions =
            document.querySelectorAll(
                ".transaction"
            );

        if (transactions.length === 0) {

            alert("No transactions to remove.");

            return;

        }

        transactions[0].remove();

    }
);

tabs.forEach(function (tab) {

    tab.addEventListener(
        "click",
        function () {

            tabs.forEach(
                function (item) {

                    item.classList.remove(
                        "active-tab"
                    );

                }
            );

            tab.classList.add(
                "active-tab"
            );

        }
    );

});

periodBtn.addEventListener(
    "click",
    function () {

        if (currentPeriod === "Day") {

            currentPeriod = "Week";

        }

        else if (
            currentPeriod === "Week"
        ) {

            currentPeriod = "Month";

        }

        else {

            currentPeriod = "Day";

        }


        periodText.textContent =
            currentPeriod;

    }
);


chartGroups.forEach(
    function (group) {

        group.addEventListener(
            "click",
            function () {

                chartGroups.forEach(
                    function (item) {

                        item.classList.remove(
                            "active-month"
                        );

                    }
                );


                group.classList.add(
                    "active-month"
                );

                const month =
                    group.querySelector(
                        "span"
                    ).textContent;

                document.querySelector(
                    ".tooltip-month"
                ).textContent = month;

            }
        );

    }
);