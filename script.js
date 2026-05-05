// Expense Tracker App - JavaScript Logic

class ExpenseTracker {
    constructor() {
        this.expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        this.budget = JSON.parse(localStorage.getItem('budget')) || null;
        this.initializeApp();
        this.attachEventListeners();
    }

    initializeApp() {
        // Set today's date as default
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('date').value = today;
        
        this.render();
    }

    attachEventListeners() {
        // Form submission
        document.getElementById('expenseForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addExpense();
        });

        // Budget
        document.getElementById('setBudgetBtn').addEventListener('click', () => {
            this.setBudget();
        });

        // Filters
        document.getElementById('searchInput').addEventListener('input', () => {
            this.renderExpenses();
        });

        document.getElementById('filterCategory').addEventListener('change', () => {
            this.renderExpenses();
        });

        document.getElementById('clearFiltersBtn').addEventListener('click', () => {
            this.clearFilters();
        });

        document.getElementById('deleteAllBtn').addEventListener('click', () => {
            this.deleteAllExpenses();
        });
    }

    addExpense() {
        const amount = parseFloat(document.getElementById('amount').value);
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;
        const date = document.getElementById('date').value;

        if (!amount || !description || !category || !date) {
            alert('Please fill in all fields');
            return;
        }

        const expense = {
            id: Date.now(),
            amount,
            description,
            category,
            date,
            timestamp: new Date().toISOString()
        };

        this.expenses.unshift(expense);
        this.saveToLocalStorage();
        this.resetForm();
        this.render();
    }

    deleteExpense(id) {
        if (confirm('Are you sure you want to delete this expense?')) {
            this.expenses = this.expenses.filter(exp => exp.id !== id);
            this.saveToLocalStorage();
            this.render();
        }
    }

    deleteAllExpenses() {
        if (confirm('Are you sure you want to delete ALL expenses? This cannot be undone.')) {
            this.expenses = [];
            this.saveToLocalStorage();
            this.render();
        }
    }

    setBudget() {
        const budgetAmount = parseFloat(document.getElementById('budgetAmount').value);
        
        if (!budgetAmount || budgetAmount <= 0) {
            alert('Please enter a valid budget amount');
            return;
        }

        this.budget = {
            amount: budgetAmount,
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        };

        this.saveToLocalStorage();
        this.render();
    }

    saveToLocalStorage() {
        localStorage.setItem('expenses', JSON.stringify(this.expenses));
        localStorage.setItem('budget', JSON.stringify(this.budget));
    }

    resetForm() {
        document.getElementById('expenseForm').reset();
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('date').value = today;
    }

    clearFilters() {
        document.getElementById('searchInput').value = '';
        document.getElementById('filterCategory').value = '';
        this.renderExpenses();
    }

    getFilteredExpenses() {
        const search = document.getElementById('searchInput').value.toLowerCase();
        const category = document.getElementById('filterCategory').value;

        return this.expenses.filter(expense => {
            const matchesSearch = expense.description.toLowerCase().includes(search);
            const matchesCategory = !category || expense.category === category;
            return matchesSearch && matchesCategory;
        });
    }

    getCurrentMonthExpenses() {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        return this.expenses.filter(exp => {
            const expDate = new Date(exp.date);
            return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
        });
    }

    calculateStats() {
        const filteredExpenses = this.getFilteredExpenses();
        
        const total = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        const count = filteredExpenses.length;
        const average = count > 0 ? total / count : 0;
        const highest = count > 0 ? Math.max(...filteredExpenses.map(exp => exp.amount)) : 0;

        return { total, count, average, highest };
    }

    getCategoryBreakdown() {
        const monthExpenses = this.getCurrentMonthExpenses();
        const breakdown = {};

        monthExpenses.forEach(exp => {
            if (!breakdown[exp.category]) {
                breakdown[exp.category] = 0;
            }
            breakdown[exp.category] += exp.amount;
        });

        return breakdown;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    renderReports() {
        const stats = this.calculateStats();
        
        document.getElementById('totalExpenses').textContent = stats.total.toFixed(2);
        document.getElementById('expenseCount').textContent = stats.count;
        document.getElementById('averageExpense').textContent = stats.average.toFixed(2);
        document.getElementById('highestExpense').textContent = stats.highest.toFixed(2);

        // Category breakdown
        const categoryBreakdown = this.getCategoryBreakdown();
        const categoryContainer = document.getElementById('categoryBreakdown');
        
        if (Object.keys(categoryBreakdown).length === 0) {
            categoryContainer.innerHTML = '<p class="empty-state">No expenses this month yet</p>';
        } else {
            const monthTotal = Object.values(categoryBreakdown).reduce((sum, val) => sum + val, 0);
            let html = '';

            for (const [category, amount] of Object.entries(categoryBreakdown)) {
                const percentage = ((amount / monthTotal) * 100).toFixed(1);
                html += `
                    <div class="category-item">
                        <div class="category-name">${category}</div>
                        <div class="category-amount">$${amount.toFixed(2)}</div>
                        <div class="category-percent">${percentage}% of total</div>
                    </div>
                `;
            }

            categoryContainer.innerHTML = html;
        }
    }

    renderBudget() {
        const budgetDisplay = document.getElementById('budgetDisplay');
        
        if (!this.budget) {
            budgetDisplay.classList.add('hidden');
            return;
        }

        budgetDisplay.classList.remove('hidden');

        const monthExpenses = this.getCurrentMonthExpenses();
        const spent = monthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        const remaining = this.budget.amount - spent;
        const percentage = Math.min((spent / this.budget.amount) * 100, 100);

        document.getElementById('budgetValue').textContent = this.budget.amount.toFixed(2);
        document.getElementById('spentValue').textContent = spent.toFixed(2);
        document.getElementById('remainingValue').textContent = remaining.toFixed(2);

        const budgetProgress = document.getElementById('budgetProgress');
        budgetProgress.style.width = percentage + '%';

        if (spent > this.budget.amount) {
            budgetProgress.classList.add('over-budget');
        } else {
            budgetProgress.classList.remove('over-budget');
        }
    }

    renderExpenses() {
        const filteredExpenses = this.getFilteredExpenses();
        const container = document.getElementById('expensesList');

        if (filteredExpenses.length === 0) {
            container.innerHTML = '<p class="empty-state">No expenses found</p>';
            return;
        }

        let html = '';
        filteredExpenses.forEach(expense => {
            html += `
                <div class="expense-item">
                    <div class="expense-description">${this.escapeHtml(expense.description)}</div>
                    <div class="expense-category">${expense.category}</div>
                    <div class="expense-date">${this.formatDate(expense.date)}</div>
                    <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
                    <div class="expense-delete">
                        <button class="btn btn-danger" onclick="tracker.deleteExpense(${expense.id})">Delete</button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    render() {
        this.renderReports();
        this.renderBudget();
        this.renderExpenses();
    }
}

// Initialize the app
let tracker;
document.addEventListener('DOMContentLoaded', () => {
    tracker = new ExpenseTracker();
});
