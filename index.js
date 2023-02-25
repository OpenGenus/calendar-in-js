import months from './modules/months.js';
import daysOfWeek from './modules/daysOfWeek.js';

const yearSpan = document.getElementById('year-span');
const monthSpan = document.getElementById('month-span');
const yearInput = document.getElementById('year');
const currentYear = new Date().getFullYear();
const currentDay = new Date().getDay();
const currentDate = new Date().getDate();
const daysContainer = document.getElementById('days');
const mainContainer = document.getElementById('table');
let year = currentYear;

// Select a year
yearInput.addEventListener('change', () => {
  yearSpan.textContent = yearInput.value;
  setDays();
});

// Set current year as default value
yearInput.value = currentYear;
yearSpan.textContent = yearInput.value;

months.forEach((month) => {
  const div = document.createElement('div');
  div.innerHTML = ` <table>
  <thead>
    <tr>
      <th class="year-display" colspan="7">
        <p>
          <span class="month-span">${month}</span>
        </p>
      </th>
    </tr>
    <tr id=${month} class="weeksContainer"></tr>
  </thead>
  <tbody class="daysContainer"></tbody>
</table>`;

  mainContainer.appendChild(div);

  // Create the days of the week
  const weekRow = document.getElementById(`${month}`);
  daysOfWeek.forEach((day) => {
    const dayHeader = document.createElement('th');
    dayHeader.textContent = day;
    dayHeader.setAttribute('class', 'week');
    weekRow.appendChild(dayHeader);
  });
});

// Set days text
const setDaysText = () => {
  // Get first day of month
  const firstDay = new Date(
    Number(yearSpan.textContent),
    months.indexOf(monthSpan.textContent),
    1
  )
    .toDateString()
    .split(' ')[0];

  // Get last day of month
  const lastDay = new Date(
    Number(yearSpan.textContent),
    months.indexOf(monthSpan.textContent) + 1,
    0
  )
    .toDateString()
    .split(' ')[2];

  let startDay = currentDay;

  switch (firstDay) {
    case 'Sun':
      startDay = 0;
      break;
    case 'Mon':
      startDay = 1;
      break;
    case 'Tue':
      startDay = 2;
      break;
    case 'Wed':
      startDay = 3;
      break;
    case 'Thu':
      startDay = 4;
      break;
    case 'Fri':
      startDay = 5;
      break;
    case 'Sat':
      startDay = 6;
      break;
    default:
      startDay = 0;
  }

  let daysCount = 1;

  for (let x = 1; x <= Number(lastDay); x++) {
    document.getElementById(`${startDay + 1}`).textContent = daysCount++;
    if (
      Number(document.getElementById(`${startDay + 1}`).textContent) ===
      currentDate
    ) {
      const curr = document.getElementById(`${startDay + 1}`);
      curr.style.background = '#e5e3c9';
      curr.style.borderRadius = '10px';
      curr.style.display = 'flex';
      curr.style.justifyContent = 'center';
      curr.style.alignItems = 'center';
      curr.style.color = '#BB6464';
    }
    startDay++;
  }
};

// Create days
const setDays = () => {
  daysContainer.innerHTML = '';
  let daysId = 0;

  for (let i = 0; i < 5; i++) {
    const week = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      daysId++;
      const day = document.createElement('td');
      day.setAttribute('class', 'days');
      day.setAttribute('id', `${daysId}`);
      week.appendChild(day);
    }
    daysContainer.appendChild(week);
  }
  setDaysText();
};
setDays();
