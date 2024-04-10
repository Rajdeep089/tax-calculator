document.addEventListener("DOMContentLoaded", function () {
    // Error icon elements
    const incomeError = document.getElementById('incomeError');
    const extraIncomeError = document.getElementById('extraIncomeError');
    const deductionsError = document.getElementById('deductionsError');
    const ageError = document.getElementById('ageError');

    // Input elements
    const incomeInput = document.getElementById('income');
    const extraIncomeInput = document.getElementById('extraIncome');
    const deductionsInput = document.getElementById('deductions');
    const ageSelect = document.getElementById('age');

    // Modal elements
    const modal = document.getElementById('resultModal');
    const modalClose = document.getElementsByClassName('close')[0];
    const modalResult = document.getElementById('result');

    // Function to show error icon and tooltip
    function showErrorIcon(element, message) {
        element.style.display = 'block';
        element.setAttribute('title', message);
    }

    // Function to hide all error icons
    function hideErrorIcons() {
        incomeError.style.display = 'none';
        extraIncomeError.style.display = 'none';
        deductionsError.style.display = 'none';
        ageError.style.display = 'none';
    }
    hideErrorIcons();

    // Function to validate numbers
    function isValidNumber(input) {
        return !isNaN(parseFloat(input)) && isFinite(input);
    }

    // Function to calculate tax
    function calculateTax() {

        const income = parseFloat(incomeInput.value);
        const extraIncome = parseFloat(extraIncomeInput.value);
        const deductions = parseFloat(deductionsInput.value);
        const age = ageSelect.value;

        let hasError = false; // Flag to track if there's an error

        // Validate inputs
        if (!incomeInput.value.trim() || !isValidNumber(income) || income <= 0) {
            showErrorIcon(incomeError, 'Income must be a valid number greater than 0');
            hasError = true;
        }

        if (!extraIncomeInput.value.trim() || !isValidNumber(extraIncome) || extraIncome < 0) {
            showErrorIcon(extraIncomeError, 'Extra Income must be a valid number');
            hasError = true;
        }

        if (!deductionsInput.value.trim() || !isValidNumber(deductions) || deductions < 0) {
            showErrorIcon(deductionsError, 'Deductions must be a valid number');
            hasError = true;
        }

        if (age === "") {
            showErrorIcon(ageError, 'Age is required');
            hasError = true;
        }

        // If there's an error, stop further execution
        if (hasError) {
            return;
        }

        // Perform tax calculation
        let taxableIncome = income + extraIncome - deductions;
        let tax = 0;

        if (taxableIncome > 800000) {
            if (age === "<40") {
                tax = 0.3 * (taxableIncome - 800000);
            } else if (age === ">=40&<60") {
                tax = 0.4 * (taxableIncome - 800000);
            } else {
                tax = 0.1 * (taxableIncome - 800000);
            }
        }

       // Display result in modal
       modalIncome.textContent = `₹ ${tax.toFixed(2)}`;
       modal.style.display = 'block';
   }
    // Event listener for Calculate Tax button
    document.getElementById('calculateBtn').addEventListener('click', calculateTax);

    // Event listener for closing the modal (close button)
    closeModalBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });


    // Event listener for closing the modal
    modalClose.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Close the modal when clicking outside of it
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
});
