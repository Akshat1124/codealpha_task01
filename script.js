const display = document.getElementById('display');

// Handle button clicks
document.querySelector('.buttons').addEventListener('click', function(e) {
    const target = e.target;
    const value = target.getAttribute('data-value');
    const type = target.getAttribute('data-type');

    if (type === 'number') {
        appendToDisplay(value);
    } else if (type === 'operator') {
        appendOperator(value);
    } else if (type === 'function') {
        handleFunction(value);
    } else if (type === 'equal') {
        calculate();
    }
});

function appendToDisplay(value) {
    if (display.value === 'Error') clearDisplay();
    display.value += value;
}

function appendOperator(operator) {
    if (display.value === '' || ['+', '-', '*', '/'].includes(display.value.slice(-1))) {
        return;
    }
    display.value += operator;
}

function handleFunction(func) {
    switch (func) {
        case 'AC':
            clearDisplay();
            break;
        case 'Del':
            deleteLast();
            break;
    }
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        const result = eval(display.value);
        display.value = isFinite(result) ? result : 'Error';
    } catch (error) {
        display.value = 'Error';
    }
}

// Handle keyboard input
window.addEventListener('keydown', function(e) {
    if (!isNaN(e.key) || ['+', '-', '*', '/'].includes(e.key)) {
        appendToDisplay(e.key);
    } else if (e.key === 'Enter') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Backspace') {
        deleteLast();
    } else if (e.key === 'Escape') {
        clearDisplay();
    } else if (e.key === '(' || e.key === ')') {
        appendOperator(e.key);
    }
});
