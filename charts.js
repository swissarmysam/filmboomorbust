import Chart from 'chart.js';

const ctx = document.querySelector('#ratingsChart').getContext('2d');

const data = {
  labels: ['Boom Rating', 'Bust Rating'],
  datasets: [
    {
      label: 'Viewer Rating',
      data: [8.4, 2.9],
      backgroundColor: ['rgb(201, 203, 207)', 'rgb(255, 99, 132)'],
    },
  ],
};

const ratingsChart = new Chart(ctx, {
  type: 'bar',
  data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// 110542857 boom budget
