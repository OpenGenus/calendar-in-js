import months from './modules/months.js';
import daysOfWeek from './modules/daysOfWeek.js';

const monthSpan = document.getElementById('month-span');
const yearInput = document.getElementById('year');
const currentYear = new Date().getFullYear();
const currentDay = new Date().getDay();
const mainContainer = document.getElementById('table');

// Select a year
yearInput.addEventListener('change', () => {
  setDays();
});

// Set current year as default value
yearInput.value = currentYear;

// Create 12 tables
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
  <tbody id=${month}-days class="daysContainer"></tbody>
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

  // Create days
  const daysContainer = document.getElementById(`${month}-days`);
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
  //setDaysText();
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
    startDay++;
  }
};
