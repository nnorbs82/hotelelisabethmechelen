// Custom Date Picker for Booking Bar
class DatePicker {
    constructor(inputElement, options = {}) {
        this.input = inputElement;
        this.options = options;
        this.selectedDate = options.defaultDate || new Date();
        this.minDate = options.minDate || new Date();
        this.currentMonth = this.selectedDate.getMonth();
        this.currentYear = this.selectedDate.getFullYear();
        this.onChange = options.onChange || (() => {});
        
        this.createPicker();
        this.attachEvents();
        this.updateInputValue();
    }

    createPicker() {
        this.picker = document.createElement('div');
        this.picker.className = 'datepicker-container';
        this.picker.style.display = 'none';
        
        this.picker.innerHTML = `
            <div class="datepicker-header">
                <select class="datepicker-month"></select>
                <select class="datepicker-year"></select>
            </div>
            <div class="datepicker-weekdays">
                <div>Su</div><div>Mo</div><div>Tu</div><div>We</div>
                <div>Th</div><div>Fr</div><div>Sa</div>
            </div>
            <div class="datepicker-days"></div>
        `;
        
        document.body.appendChild(this.picker);
        
        this.monthSelect = this.picker.querySelector('.datepicker-month');
        this.yearSelect = this.picker.querySelector('.datepicker-year');
        this.daysContainer = this.picker.querySelector('.datepicker-days');
        
        this.populateMonthSelect();
        this.populateYearSelect();
        this.renderDays();
    }

    populateMonthSelect() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
        this.monthSelect.innerHTML = months.map((month, idx) => 
            `<option value="${idx}" ${idx === this.currentMonth ? 'selected' : ''}>${month}</option>`
        ).join('');
    }

    populateYearSelect() {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = 0; i < 5; i++) {
            years.push(currentYear + i);
        }
        this.yearSelect.innerHTML = years.map(year => 
            `<option value="${year}" ${year === this.currentYear ? 'selected' : ''}>${year}</option>`
        ).join('');
    }

    renderDays() {
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const prevLastDay = new Date(this.currentYear, this.currentMonth, 0);
        
        const firstDayWeekday = firstDay.getDay();
        const lastDateOfMonth = lastDay.getDate();
        const prevLastDate = prevLastDay.getDate();
        
        let daysHTML = '';
        
        // Previous month days
        for (let i = firstDayWeekday - 1; i >= 0; i--) {
            daysHTML += `<div class="datepicker-day prev-month">${prevLastDate - i}</div>`;
        }
        
        // Current month days
        for (let day = 1; day <= lastDateOfMonth; day++) {
            const date = new Date(this.currentYear, this.currentMonth, day);
            const isSelected = this.isSameDay(date, this.selectedDate);
            const isToday = this.isSameDay(date, new Date());
            const isDisabled = date < this.minDate && !this.isSameDay(date, this.minDate);
            
            const classes = ['datepicker-day'];
            if (isSelected) classes.push('selected');
            if (isToday) classes.push('today');
            if (isDisabled) classes.push('disabled');
            
            daysHTML += `<div class="${classes.join(' ')}" data-date="${this.formatDate(date)}">${day}</div>`;
        }
        
        // Next month days to fill the grid
        const totalCells = firstDayWeekday + lastDateOfMonth;
        const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
        for (let day = 1; day <= remainingCells; day++) {
            daysHTML += `<div class="datepicker-day next-month">${day}</div>`;
        }
        
        this.daysContainer.innerHTML = daysHTML;
    }

    isSameDay(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }

    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    updateInputValue() {
        this.input.value = this.formatDate(this.selectedDate);
    }

    attachEvents() {
        // Input click - show picker
        this.input.addEventListener('click', (e) => {
            e.stopPropagation();
            this.show();
        });

        // Month/Year change
        this.monthSelect.addEventListener('change', () => {
            this.currentMonth = parseInt(this.monthSelect.value);
            this.renderDays();
        });

        this.yearSelect.addEventListener('change', () => {
            this.currentYear = parseInt(this.yearSelect.value);
            this.renderDays();
        });

        // Day selection
        this.daysContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('datepicker-day') && 
                !e.target.classList.contains('disabled') &&
                !e.target.classList.contains('prev-month') &&
                !e.target.classList.contains('next-month')) {
                const dateStr = e.target.getAttribute('data-date');
                if (dateStr) {
                    const [year, month, day] = dateStr.split('-');
                    this.selectedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                    this.updateInputValue();
                    this.onChange(this.selectedDate);
                    this.hide();
                }
            }
        });

        // Close picker when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.picker.contains(e.target) && e.target !== this.input) {
                this.hide();
            }
        });
    }

    show() {
        // Position picker below input
        const rect = this.input.getBoundingClientRect();
        this.picker.style.top = (rect.bottom + window.scrollY + 5) + 'px';
        this.picker.style.left = rect.left + window.scrollX + 'px';
        this.picker.style.display = 'block';
        
        // Update to show selected date's month/year
        this.currentMonth = this.selectedDate.getMonth();
        this.currentYear = this.selectedDate.getFullYear();
        this.monthSelect.value = this.currentMonth;
        this.yearSelect.value = this.currentYear;
        this.renderDays();
    }

    hide() {
        this.picker.style.display = 'none';
    }

    setDate(date) {
        this.selectedDate = new Date(date);
        this.updateInputValue();
        this.renderDays();
    }

    setMinDate(date) {
        this.minDate = new Date(date);
        this.renderDays();
    }

    getDate() {
        return this.selectedDate;
    }
}

// Initialize booking bar
document.addEventListener('DOMContentLoaded', function() {
    const checkinInput = document.getElementById('checkin-date');
    const checkoutInput = document.getElementById('checkout-date');
    const searchBtn = document.getElementById('search-btn');

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Initialize check-in picker
    const checkinPicker = new DatePicker(checkinInput, {
        defaultDate: today,
        minDate: today,
        onChange: (selectedDate) => {
            // Update checkout date to be at least 1 day after check-in
            const nextDay = new Date(selectedDate);
            nextDay.setDate(nextDay.getDate() + 1);
            checkoutPicker.setMinDate(nextDay);
            
            // If checkout is before the new minimum, update it
            if (checkoutPicker.getDate() < nextDay) {
                checkoutPicker.setDate(nextDay);
            }
        }
    });

    // Initialize check-out picker
    const checkoutPicker = new DatePicker(checkoutInput, {
        defaultDate: tomorrow,
        minDate: tomorrow
    });

    // Search button functionality
    searchBtn.addEventListener('click', function() {
        const checkinDate = checkinInput.value;
        const checkoutDate = checkoutInput.value;
        
        if (checkinDate && checkoutDate) {
            const url = `https://app.mews.com/distributor/6e37d724-4c4d-4df9-9247-49442b7dd19e?mewsStart=${checkinDate}&mewsEnd=${checkoutDate}&mewsRoute=rooms`;
            window.open(url, '_blank');
        }
    });
});
