document.addEventListener('DOMContentLoaded', function () {
    const table = document.getElementById('gradeTable');
    const unsubmittedCountDisplay = document.getElementById('unsubmittedCount');
    const addRowBtn = document.getElementById('addRowBtn');
    const addColumnBtn = document.getElementById('addColumnBtn');
    const save = document.getElementById('save');
    const restore = document.getElementById('restore');
    let savedTableState = null;

    addRowBtn.addEventListener('click', function () {
        addNewRow();
    });

    addColumnBtn.addEventListener('click', function () {
        addNewColumn();
    });

    save.addEventListener('click', function () {
        savedTableState = table.innerHTML; // Save the current state of the table
        alert("Data Saved");
    });

    // Attach event listener to the "Restore" button
    restore.addEventListener('click', function () {
        if (savedTableState) {
            table.innerHTML = savedTableState; // Restore the table to its saved state
            initializeCellEvents(); // Re-initialize events for the cells
            updateUnsubmittedCount(); // Recalculate the unsubmitted count as the table structure may have change
        }
        alert("Data Restored");
    });


    function updateAverageForRow(row) {
        let sum = 0;
        let count = 0;
        // Determine the number of assignment cells, excluding the Student Name, Student ID, and Average cells.
        const assignmentCells = row.querySelectorAll('.values');

        // The count should be equal to the number of assignment cells.
        count = assignmentCells.length;

        // Iterate over each assignment cell to calculate the sum.
        assignmentCells.forEach(cell => {
            const value = cell.textContent.trim();
            let number = parseFloat(value);
            // If it's not a number or "-", treat it as 0.
            number = (!isNaN(number) && value !== '-') ? number : 0;
            sum += number; // Cells with "-" contribute 0 to the sum.
        });

        // Calculate the average based on the sum and the count of assignment cells.
        const average = count > 0 ? Math.round(sum / count) : '-';
        const averageCell = row.querySelector('.average');

        // Update the average cell text, background, and text color.
        averageCell.textContent = average !== '-' ? `${average}%` : average;
        averageCell.style.backgroundColor = average < 60 && average !== '-' ? 'red' : '';
        averageCell.style.color = average < 60 && average !== '-' ? 'white' : '';
    }

    function updateUnsubmittedCount() {
        let unsubmittedCount = 0;

        Array.from(table.querySelectorAll('.values')).forEach(cell => {
            if (cell.textContent.trim() === '-') {
                unsubmittedCount++;
            }
        });

        unsubmittedCountDisplay.textContent = `Total Unsubmitted Assignments: ${unsubmittedCount}`;
        unsubmittedCountDisplay.style.color = 'black'; // Add styles as you see fit
        unsubmittedCountDisplay.style.fontWeight = 'bold';
    }

    function makeCellEditable(cell) {
        cell.addEventListener('click', function () {
            // Check if the input element already exists to avoid creating a new one upon every click
            if (!this.querySelector('input')) {
                const input = document.createElement('input');
                input.type = 'number';
                input.min = 0;
                input.max = 100;
                input.value = this.textContent !== '-' ? this.textContent : '';
                input.className = 'values-input'; // Use a different class or none as needed
                input.style.width = '100%';
                input.style.border = 'none';
                input.style.textAlign = 'center';

                // Event to handle the blur action
                input.addEventListener('blur', function () {
                    let newValue = this.value.trim() !== '' ? this.value : '-';
                    // Convert the string value to a number for comparison
                    let numericValue = parseFloat(newValue);
                    // Check if the value is out of the 0-100 range and replace with "-"
                    if (numericValue < 0 || numericValue > 100) {
                        newValue = '-';
                    }
                    cell.innerHTML = newValue; // Directly setting innerHTML of cell to newValue
                    cell.style.backgroundColor = newValue === '-' ? 'yellow' : '';

                    // Updating the table based on new values
                    updateAverageForRow(cell.closest('tr'));
                    updateUnsubmittedCount();
                });

                // Event to handle the Enter key
                input.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter') {
                        this.blur(); // Trigger the blur event to save and exit edit mode
                    }
                });

                // Replace the cell's content with the input element and focus on it
                cell.innerHTML = '';
                cell.appendChild(input);
                input.focus();
            }
        });
    }

    // Initialize event listeners for the 'values' cells
    function initializeCellEvents() {
        const valuesCells = document.querySelectorAll('.values');
        valuesCells.forEach(cell => {
            makeCellEditable(cell);
        });
    }

    Array.from(table.querySelectorAll('tbody tr')).forEach(row => {
        Array.from(row.querySelectorAll('.values')).forEach(cell => {
            cell.addEventListener('click', function () {
                if (!this.querySelector('input')) {
                    makeCellEditable(this);
                }
            });
            if (cell.textContent.trim() === '-') {
                cell.style.backgroundColor = 'yellow'
            }
        });
    });

    updateUnsubmittedCount(); // Initial calculation of the unsubmitted count

    function convertGradeToLetter(percentage) {
        if (percentage >= 93) return 'A';
        else if (percentage >= 90) return 'A-';
        else if (percentage >= 87) return 'B+';
        else if (percentage >= 83) return 'B';
        else if (percentage >= 80) return 'B-';
        else if (percentage >= 77) return 'C+';
        else if (percentage >= 73) return 'C';
        else if (percentage >= 70) return 'C-';
        else if (percentage >= 67) return 'D+';
        else if (percentage >= 63) return 'D';
        else if (percentage >= 60) return 'D-';
        else return 'F';
    }

    function convertGradeTo4Point(percentage) {
        if (percentage >= 93) return 4.0;
        else if (percentage >= 90) return 3.7;
        else if (percentage >= 87) return 3.3;
        else if (percentage >= 83) return 3.0;
        else if (percentage >= 80) return 2.7;
        else if (percentage >= 77) return 2.3;
        else if (percentage >= 73) return 2.0;
        else if (percentage >= 70) return 1.7;
        else if (percentage >= 67) return 1.3;
        else if (percentage >= 63) return 1.0;
        else if (percentage >= 60) return 0.7;
        else return 0.0;
    }

    // Function to toggle grade presentation on click
    function toggleGrade() {
        const averageCells = table.querySelectorAll('.average');
        averageCells.forEach(cell => {
            // Get the current text and remove any '%' or trailing spaces.
            let currentText = cell.textContent.replace('%', '').trim();
            if (currentText === '-') return; // Skip if no grade is present.

            // Check if we're dealing with a letter grade (indicative of needing to find the original percentage)
            if (isNaN(currentText)) {
                // If it's a letter grade or 4.0 scale, we need to revert to the percentage.
                if (cell.hasAttribute('data-original-grade')) {
                    // Revert to the original percent
                    cell.textContent = cell.getAttribute('data-original-grade') + '%';
                    cell.removeAttribute('data-original-grade');
                }
            } else {
                // It's a percentage; save it and convert to 4.0 scale.
                let percentage = parseFloat(currentText);
                let scaleGrade = convertGradeTo4Point(percentage);
                if (!cell.hasAttribute('data-original-grade')) {
                    cell.setAttribute('data-original-grade', percentage); // Save original percentage.
                }

                // Now, decide if we should display 4.0 scale or convert to letter grade.
                // Assuming we want to toggle to 4.0 scale first, then letter grade.
                if (cell.textContent.includes('%')) {
                    // Convert to 4.0 scale
                    cell.textContent = scaleGrade.toFixed(1);
                } else {
                    // It's already in 4.0 scale, convert to letter grade.
                    const letterGrade = convertGradeToLetter(percentage);
                    cell.textContent = letterGrade;
                }
            }
        });
    }

    // Attach the toggle function to the header cell for average grades
    const averageHeaderCell = table.querySelector('thead tr th:last-child');
    averageHeaderCell.addEventListener('click', toggleGrade);

    function addNewRow() {
        const table = document.getElementById('gradeTable');
        const newRow = table.insertRow(-1); // Insert at the end of the table

        // Loop to create cells for the new row
        for (let i = 0; i < table.rows[0].cells.length; i++) {
            const newCell = newRow.insertCell(i);
            if (i === 0 || i === 1) {
                // Student Name and ID are editable
                newCell.contentEditable = true;
                newCell.className = 'text';
            } else if (i < table.rows[0].cells.length - 1) {
                // Assignment cells
                newCell.className = 'values';
                newCell.textContent = '-';
                newCell.style.backgroundColor = 'yellow';
            } else {
                // Average cell
                newCell.className = 'average';
                newCell.textContent = '-';
            }
        }

        // Call a function to initialize the event listeners for the 'values' cells
        initializeCellEvents();
        // Update the average and unsubmitted count
        updateAverageForRow(newRow);
        updateUnsubmittedCount();
    }

    // Function to add a new column for assignment grade data
    function addNewColumn() {
        const columnIndex = table.rows[0].cells.length - 1; // Before 'Average' column
        Array.from(table.rows).forEach((row, index) => {
            if (index === 0) { // Header row
                const headerCell = document.createElement('th');
                headerCell.contentEditable = true;
                headerCell.textContent = 'Assignment' + ' ' + (columnIndex - 1);
                row.insertBefore(headerCell, row.cells[columnIndex]);
            } else { // Data rows
                const cell = row.insertCell(columnIndex);
                cell.className = 'values';
                cell.textContent = '-';
                cell.style.backgroundColor = 'yellow';
                makeCellEditable(cell);
            }
        });
        initializeCellEvents();
        updateUnsubmittedCount();
    }

});
