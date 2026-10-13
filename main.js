
const form = document.getElementById('goal-form');
const input = document.getElementById('goal-input');
const errorMsg = document.getElementById('error-msg');
const goalList = document.getElementById('goal-list');
const counterDisplay = document.getElementById('counter');
const emptyMsg = document.getElementById('empty-msg');
const filterButtons = document.querySelectorAll('.filters button');

let currentFilter = 'all';

1
form.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const text = input.value.trim(); 

    if (text.length < 3 || text.length > 100) {
        errorMsg.textContent = 'Текст має містити від 3 до 100 символів.';
        return;
    }

    errorMsg.textContent = '';

    const li = document.createElement('li');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'goal-checkbox';

    const span = document.createElement('span');
    span.className = 'goal-text';
    span.textContent = text; 

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Видалити';
    deleteBtn.className = 'delete-btn';

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    goalList.appendChild(li);

    input.value = '';
    input.focus();

    updateUI();
});

// 2
goalList.addEventListener('click', function(e) {
    const li = e.target.closest('li');
    if (!li) return;

    if (e.target.classList.contains('delete-btn')) {
        li.remove();
        updateUI();
    }
});

goalList.addEventListener('change', function(e) {
    const li = e.target.closest('li');
    if (!li) return;

    if (e.target.classList.contains('goal-checkbox')) {
        if (e.target.checked) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
        updateUI();
    }
});

// 3
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        currentFilter = this.getAttribute('data-filter');
        
        updateUI();
    });
});

// 4
function updateUI() {
    const items = goalList.querySelectorAll('li');
    
    let total = items.length;
    let completedCount = 0;

    items.forEach(item => {
        const isCompleted = item.classList.contains('completed');

        if (isCompleted) completedCount++;

        if (currentFilter === 'all') {
            item.hidden = false;
        } else if (currentFilter === 'active') {
            item.hidden = isCompleted; 
        } else if (currentFilter === 'completed') {
            item.hidden = !isCompleted; 
        }
    });

    counterDisplay.textContent = `Усього: ${total}. Виконано: ${completedCount}`;

    if (total === 0) {
        emptyMsg.hidden = false;
        goalList.hidden = true;
    } else {
        emptyMsg.hidden = true;
        goalList.hidden = false;
    }
}

updateUI();