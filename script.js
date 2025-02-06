document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '';
            } else if (value === '←') {
                currentInput = currentInput.slice(0, -1);
            } else if (value === '=') {
                try {
                    // Перевірка на коректність введення перед обчисленням
                    if (/[+\-*/]$/.test(currentInput) || currentInput === '') {
                        throw new Error("Invalid input");
                    }
                    currentInput = eval(currentInput).toString();
                } catch {
                    currentInput = '';
                }
            } else {
                // Запобігання введенню двох знаків операцій підряд
                if (/[+\-*/]$/.test(currentInput) && /[+\-*/]/.test(value)) {
                    currentInput = currentInput.slice(0, -1) + value;
                } else {
                    currentInput += value;
                }
            }

            display.textContent = currentInput;
        });
    });
});