function setClock() {
    var dateInfo = new Date();
    var hour = modifyNumber(dateInfo.getHours());
    var min = modifyNumber(dateInfo.getMinutes());
    var sec = modifyNumber(dateInfo.getSeconds());
    var year = dateInfo.getFullYear();
    var month = dateInfo.getMonth() + 1;
    var date = dateInfo.getDate();
    document.getElementById("time").innerHTML = hour + ":" + min + ":" + sec;
    document.getElementById("date").innerHTML = year + ". " + month + ". " + date;
}

function modifyNumber(time) {
    if (parseInt(time) < 10) {
        return "0" + time;
    } else {
        return time;
    }
}

let clockInterval;

window.onload = function () {
    setClock();
    clockInterval = setInterval(setClock, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
    const batteryText = document.querySelector('.battery-text');
    const batteryCells = document.querySelectorAll('.battery-cell');
    const batteryBar = document.querySelector('.battery-bar');
    const dateDisplay = document.getElementById('date');
    const timeDisplay = document.getElementById('time');
    const hourButton = document.querySelector('.hour');
    const minuteButton = document.querySelector('.minute');
    const secondButton = document.querySelector('.second');
    const addButton = document.querySelector('.add');
    const historyDisplay = document.getElementById('historyDisplay');
    
    let batteryPercentage = 100;
    let isAlarmSettingMode = false;
    let alarmHour, alarmMinute, alarmSecond;
    let blinkInterval;
    let currentDisplayTime;
    const maxAlarms = 3; 

    function updateBattery() {
        batteryText.textContent = `${batteryPercentage}%`;
        const cellsToShow = Math.floor(batteryPercentage / 25);
        const remainingPercentage = batteryPercentage % 25;
        batteryBar.style.width = `${batteryPercentage}%`;

        batteryCells.forEach((cell, index) => {
            if (index < cellsToShow) {
                cell.style.display = 'block';
                cell.style.flex = '1';
            } else if (index === cellsToShow && remainingPercentage > 0) {
                cell.style.display = 'block';
                cell.style.flex = `${remainingPercentage / 25}`;
            } else {
                cell.style.display = 'none';
            }
        });

        batteryPercentage = Math.max(0, batteryPercentage - 1);

        if (batteryPercentage === 0) {
            batteryText.textContent = `0%`;
            clearInterval(batteryInterval);
            fadeOutDisplays();
        }
    }

    function fadeOutDisplays() {
        dateDisplay.style.transition = 'opacity 1s';
        timeDisplay.style.transition = 'opacity 1s';
        dateDisplay.style.opacity = '0';
        timeDisplay.style.opacity = '0';

        setTimeout(() => {
            batteryPercentage = 100;
            updateBattery();
            fadeInDisplays();
            const batteryInterval = setInterval(updateBattery, 1000);
        }, 10000);
    }

    function fadeInDisplays() {
        dateDisplay.style.transition = 'opacity 1s';
        timeDisplay.style.transition = 'opacity 1s';
        dateDisplay.style.opacity = '1';
        timeDisplay.style.opacity = '1';
    }

    function blinkTimeDisplay() {
        blinkInterval = setInterval(() => {
            timeDisplay.style.visibility = (timeDisplay.style.visibility === 'hidden' ? '' : 'hidden');
        }, 500);
    }

    function stopBlinking() {
        clearInterval(blinkInterval);
        timeDisplay.style.visibility = '';
    }

    function enterAlarmSettingMode() {
        if (isAlarmSettingMode) return;
        isAlarmSettingMode = true;
        clearInterval(clockInterval); 
        currentDisplayTime = timeDisplay.textContent; 
        blinkTimeDisplay();
    }

    function exitAlarmSettingMode() {
        if (!isAlarmSettingMode) return;
        isAlarmSettingMode = false;
        stopBlinking();
        setClock();
        clockInterval = setInterval(setClock, 1000); 
    }

    function incrementTime(unit) {
        let timeParts = currentDisplayTime.split(':');
        let hour = parseInt(timeParts[0]);
        let minute = parseInt(timeParts[1]);
        let second = parseInt(timeParts[2]);

        if (unit === 'hour') {
            hour = (hour + 1) % 24;
        } else if (unit === 'minute') {
            minute = (minute + 1) % 60;
        } else if (unit === 'second') {
            second = (second + 1) % 60;
        }

        currentDisplayTime = `${modifyNumber(hour)}:${modifyNumber(minute)}:${modifyNumber(second)}`;
        timeDisplay.textContent = currentDisplayTime;
    }

    function addAlarmToHistory() {
        let timeParts = timeDisplay.textContent.split(':');
        let alarmHour = parseInt(timeParts[0]);
        let alarmMinute = parseInt(timeParts[1]);
        let alarmSecond = parseInt(timeParts[2]);
        
        
        let alarms = historyDisplay.getElementsByClassName('alarm');
        if (alarms.length >= maxAlarms) {         
            historyDisplay.removeChild(alarms[0]);
        }
               
        const newAlarm = document.createElement('div');
        newAlarm.className = 'alarm';
        newAlarm.textContent = `${modifyNumber(alarmHour)}:${modifyNumber(alarmMinute)}:${modifyNumber(alarmSecond)}`;
        historyDisplay.appendChild(newAlarm);
    }

    hourButton.addEventListener('click', () => {
        enterAlarmSettingMode();
        incrementTime('hour');
    });

    minuteButton.addEventListener('click', () => {
        enterAlarmSettingMode();
        incrementTime('minute');
    });

    secondButton.addEventListener('click', () => {
        enterAlarmSettingMode();
        incrementTime('second');
    });

    addButton.addEventListener('click', () => {
        if (isAlarmSettingMode) {
            addAlarmToHistory();
            exitAlarmSettingMode();
        }
    });

    const batteryInterval = setInterval(updateBattery, 1000);
});