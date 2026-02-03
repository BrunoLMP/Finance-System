document.addEventListener('DOMContentLoaded', () => {

  const initialBalanceInput = document.getElementById('initial-balance');
  const expenseForms = document.getElementById('expense-forms');
  const addExpenseBtn = document.getElementById('add-expense');
  const clearAllBtn = document.getElementById('clear-all');
  const totalExpensesEl = document.getElementById('total-expenses');
  const remainingBalanceEl = document.getElementById('remaining-balance');
  const printBtn = document.getElementById('print-statement');

  const enterBtn = document.getElementById('enter-app');
  const welcomeScreen = document.getElementById('welcome-screen');
  const app = document.getElementById('app');

  const currency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  function parseValue(value) {
    return parseFloat(String(value).replace(',', '.')) || 0;
  }

  function createExpenseItem() {
    const item = document.createElement('div');
    item.className = 'expense-item';

    item.innerHTML = `
      <input type="text" class="account-name" placeholder="Conta">
      <input type="number" class="account-amount" step="0.01" placeholder="Valor">
      <button class="remove-btn">X</button>
    `;

    item.querySelector('.account-amount')
      .addEventListener('input', calculateTotals);

    item.querySelector('.remove-btn')
      .addEventListener('click', () => {
        item.remove();
        calculateTotals();
      });

    return item;
  }

  function calculateTotals() {
    const initial = parseValue(initialBalanceInput.value);
    let total = 0;

    document.querySelectorAll('.account-amount').forEach(i => {
      total += parseValue(i.value);
    });

    const remaining = initial - total;

    totalExpensesEl.textContent = currency.format(total);
    remainingBalanceEl.textContent = currency.format(remaining);

    remainingBalanceEl.className =
      remaining >= 0 ? 'value total-positive' : 'value total-negative';
  }

  addExpenseBtn.onclick = () => {
    expenseForms.appendChild(createExpenseItem());
  };

  clearAllBtn.onclick = () => {
    expenseForms.innerHTML = '';
    calculateTotals();
  };

  initialBalanceInput.oninput = calculateTotals;

  printBtn.onclick = () => {
    document.getElementById('st-initial').textContent =
      currency.format(parseValue(initialBalanceInput.value));

    document.getElementById('st-total').textContent =
      totalExpensesEl.textContent;

    document.getElementById('st-remaining').textContent =
      remainingBalanceEl.textContent;

    const list = document.getElementById('st-list');
    list.innerHTML = '';

    document.querySelectorAll('.expense-item').forEach(item => {
      const name = item.querySelector('.account-name').value || '—';
      const value = parseValue(item.querySelector('.account-amount').value);

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${name}</td>
        <td>${currency.format(value)}</td>
      `;
      list.appendChild(row);
    });

    window.print();
  };

  enterBtn.onclick = () => {
    welcomeScreen.style.display = 'none';
    app.classList.remove('hidden');
  };

  // init
  expenseForms.appendChild(createExpenseItem());
  calculateTotals();
});
    