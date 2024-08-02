document.addEventListener('DOMContentLoaded', () => {

    function handleCheckboxChange(event) {
        const row = event.target.closest('.checklist-row');
        if (event.target.checked) {
            row.classList.add('completed');
        } else {
            row.classList.remove('completed');
        }
    }

    document.querySelectorAll('.day-box').forEach(dayBox => {
        dayBox.addEventListener('click', () => {
            document.querySelectorAll('.day-box').forEach(box => box.classList.remove('selected'));
            dayBox.classList.add('selected');
            document.getElementById('selected-day').value = dayBox.getAttribute('data-day');
        });
    });

    document.getElementById('add-button').addEventListener('click', () => {
        const name = document.getElementById('schedule-name').value.trim();
        const time = document.getElementById('schedule-time').value;
        const day = document.getElementById('selected-day').value;

        if (name && time && day) {
            const checklist = document.getElementById('checklist');
            const newRow = document.createElement('div');
            newRow.classList.add('checklist-row');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('checklist-checkbox');
            checkbox.addEventListener('change', handleCheckboxChange);
            newRow.appendChild(checkbox);

            const itemName = document.createElement('div');
            itemName.classList.add('checklist-item');
            itemName.textContent = name;
            newRow.appendChild(itemName);

            const itemDay = document.createElement('div');
            itemDay.classList.add('checklist-item');
            itemDay.textContent = {
                monday: '월요일',
                tuesday: '화요일',
                wednesday: '수요일',
                thursday: '목요일',
                friday: '금요일',
                saturday: '토요일',
                sunday: '일요일'
            }[day];
            newRow.appendChild(itemDay);

            const itemTime = document.createElement('div');
            itemTime.classList.add('checklist-item');
            itemTime.textContent = time;
            newRow.appendChild(itemTime);

            checklist.appendChild(newRow);

            document.getElementById('schedule-name').value = '';
            document.getElementById('schedule-time').value = '';
            document.getElementById('selected-day').value = '';
            document.querySelectorAll('.day-box').forEach(box => box.classList.remove('selected'));
        } else {
            alert('모든 필드를 입력해 주세요.');
        }
    });
});