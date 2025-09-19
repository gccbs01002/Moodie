import { Chart } from 'chart.js';

const labels = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const data = [6,3,4,3,4,6,7]; // demo

new Chart(document.getElementById('moodChart'), {
  type: 'bar',
  data: {
    labels,
    datasets: [{
      label: 'Hours',
      data,
      backgroundColor: ({dataIndex}) => {
        // 依「當天主情緒」上色（示例：手動對應）
        const moodColorMap = [
          '--mood-exuberant', // Sun 興奮
          '--mood-sad',       // Mon 悲傷
          '--mood-exuberant', // Tue 興奮（依需求調整）
          '--mood-calm',      // Wed 平和
          '--mood-sad',       // Thu 悲傷
          '--mood-exuberant', // Fri 興奮
          '--mood-exuberant', // Sat 興奮
        ];
        return getComputedStyle(document.documentElement)
               .getPropertyValue(moodColorMap[dataIndex]).trim();
      },
      borderRadius: Number(getComputedStyle(document.documentElement)
               .getPropertyValue('--bar-radius').replace('px','')),
      borderSkipped: false,
      barPercentage: 0.6,         // 視覺寬度
      categoryPercentage: 0.7
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // 用自訂 Legend
      tooltip: {
        callbacks: { label: ctx => `${ctx.parsed.y} hr` }
      }
    },
    layout: { padding: 0 },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: getCss('--mood-text-weak'), font: { size: 12 } }
      },
      y: {
        suggestedMin: 0, suggestedMax: 10, ticks: {
          stepSize: 2,
          color: getCss('--mood-text-weak'),
          font: { size: 12 },
          callback: v => `${v} hr`,
          padding: 16 // y刻度到x標籤的視覺距離
        },
        grid: { display: false, drawBorder: false }
      }
    }
  }
});

function getCss(varName){
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}

