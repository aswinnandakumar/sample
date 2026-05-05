# 💰 Expense Tracker App

A simple yet powerful web-based expense tracking application that helps you manage your spending and budget effectively.

## new feature

✨ **Core Features:**
- ➕ Add expenses with amount, description, category, and date
- 📂 Categorize expenses (Food, Transport, Entertainment, Utilities, Shopping, Health, Education, Other)
- 🗑️ Delete individual expenses or all expenses at once
- 🔍 Search expenses by description
- 🏷️ Filter expenses by category

💰 **Budget Management:**
- Set monthly budget limits
- Track spending vs budget
- Visual budget progress bar
- Real-time budget status (over/under budget)

📊 **Reports & Analytics:**
- Total expenses summary
- Number of expenses tracked
- Average expense calculation
- Highest expense tracking
- Category-wise expense breakdown with percentages

💾 **Data Persistence:**
- All data saved to browser's localStorage
- Automatic data backup on every change
- No server required - works completely offline

## How to Use

### Quick Start (Easiest - No Installation Required)

**Option 1: Press F5 in VS Code**
1. Press `F5` or click the Debug button (▶️)
2. Select "**Open Expense Tracker (Direct)**"
3. Browser opens automatically with the app!

**Option 2: Double-click the file**
- Simply double-click `index.html` in your file explorer
- Opens directly in your default browser

**Option 3: Drag & Drop**
- Drag `index.html` into your browser window

### Advanced: Server Mode (Requires Node.js)

If you want to run with a local server:
1. Install Node.js from https://nodejs.org/
2. Press F5 and select "**Launch Expense Tracker (Server)**"
3. App runs on `http://localhost:3000`

### Using the App

1. **Open the App:**
   - Press F5 in VS Code and select "Open Expense Tracker (Direct)", OR
   - Double-click `index.html`, OR
   - Drag the file into your browser

2. **Add an Expense:**
   - Enter the amount
   - Add a description
   - Select a category
   - Choose the date (defaults to today)
   - Click "Add Expense"

3. **Set a Budget:**
   - Enter your monthly budget amount
   - Click "Set Budget"
   - Monitor your spending against the budget

4. **View Reports:**
   - Check total expenses, count, average, and highest expense
   - See category-wise breakdown of expenses
   - Percentages show how much each category represents

5. **Filter & Search:**
   - Use the search box to find expenses by description
   - Filter by category using the dropdown
   - Click "Clear Filters" to reset

6. **Delete Expenses:**
   - Click "Delete" on any expense to remove it
   - Click "Delete All" to clear all expenses (with confirmation)

## Files Included

- **index.html** - Main application interface and structure
- **style.css** - Styling and responsive design
- **script.js** - Core application logic and data management
- **README.md** - This file

## Technical Details

- **Language:** HTML5, CSS3, JavaScript (ES6+)
- **Storage:** Browser localStorage API
- **Framework:** None required - vanilla JavaScript
- **Browser Support:** All modern browsers (Chrome, Firefox, Safari, Edge)
- **Responsive:** Works great on desktop, tablet, and mobile devices

## Features Breakdown

### Add Expense Form
- Real-time input validation
- Default date set to today
- 8 predefined categories
- Currency support (USD)

### Budget Tracking
- Monthly budget management
- Visual progress indicator
- Color-coded status (green for under budget, red for over budget)
- Real-time calculations

### Reports Section
- Total expenses display
- Expense counter
- Average calculation
- Highest expense tracking
- Category breakdown with percentage distribution

### Filter & Search
- Text-based search functionality
- Category-based filtering
- Clear filters option
- Delete all expenses option

## Data Storage

The app uses browser's localStorage to persist data:
- All expenses are stored in `expenses` key
- Budget is stored in `budget` key
- Data persists even after closing the browser
- To clear all data, clear your browser's localStorage

## Tips

- Set a realistic monthly budget to track your spending effectively
- Categorize expenses properly for better analytics
- Check the reports section regularly to understand your spending patterns
- Use filters to focus on specific categories or search for particular expenses

## Limitations

- Data is stored locally in your browser (not synced across devices)
- Clearing browser cache/cookies may delete the data
- No backup or export feature (yet)
- Limited to the categories provided

## Future Enhancements

Possible improvements could include:
- Export expenses to CSV/PDF
- Multiple budget periods
- Custom categories
- Recurring expenses
- Budget alerts
- Multi-device sync
- Data visualization charts

## License

Free to use and modify for personal use.

---

## Requirements & Setup

**No installation required!** 🎉
- Just open `index.html` in any modern browser
- Works completely offline with localStorage

**Optional: For server mode**
- Node.js (download from: https://nodejs.org/)
- Enables running on `http://localhost:3000`

## Troubleshooting

**"localhost refused to connect"**
- Node.js is not installed or server not running
- Use the **Direct** option instead (F5 → "Open Expense Tracker (Direct)")

**Server not starting**
- Install Node.js first: https://nodejs.org/
- Or use the direct file method

**Data not saving?**
- Clear browser cache and cookies
- Try a different browser
- Ensure cookies/storage is enabled in browser settings

**App not loading**
- Try refreshing the page (Ctrl+F5)
- Check that all files are in the same folder
- Try opening in a different browser

---

**Enjoy tracking your expenses!** 💳✨