'use strict';
/* ═══════════════════════════════════════
   ParkIQ Riverton — Portfolio Website
   main.js — Charts + Nav behaviour
═══════════════════════════════════════ */

/* ── NAV: highlight active section ── */
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin:'-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

/* ── CHART DEFAULTS ── */
const LIGHT = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { grid:{ color:'rgba(0,0,0,.05)' }, ticks:{ color:'#94a3b8', font:{ size:10 } } },
    x: { grid:{ display:false }, ticks:{ color:'#94a3b8', font:{ size:10 } } }
  }
};
const DARK = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { grid:{ color:'rgba(255,255,255,.05)' }, ticks:{ color:'rgba(255,255,255,.3)', font:{ size:10 } } },
    x: { grid:{ display:false }, ticks:{ color:'rgba(255,255,255,.3)', font:{ size:10 } } }
  }
};

/* ── COLORS ── */
const C = {
  orange:'#e8621a', blue:'#2563eb', green:'#16a34a',
  red:'#dc2626',    amber:'#d97706', teal:'#0d9488',
  purple:'#7c3aed', gray:'#6b7280'
};

/* ── DRAW CHARTS WHEN VISIBLE ── */
const chartObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.drawn) {
      e.target.dataset.drawn = 'true';
      drawChart(e.target.id);
    }
  });
}, { threshold: 0.2 });

['ch_viol','ch_appeal','ch_zone','ch_pay','ch_sync_c','ch_app_c','ch_rev_c'].forEach(id => {
  const el = document.getElementById(id);
  if (el) chartObserver.observe(el);
});

function drawChart(id) {
  const el = document.getElementById(id);
  if (!el) return;

  switch(id) {

    /* ── Dashboard insight charts ── */
    case 'ch_viol':
      new Chart(el, { type:'bar', data:{
        labels:['Expired Meter','Overtime Parking','No Permit','Improper Parking','Restricted Zone','Loading Zone Misuse'],
        datasets:[{ data:[3165,2325,2136,1625,1244,906],
          backgroundColor:[C.red,C.amber,C.purple,C.blue,C.teal,C.green],
          borderRadius:5, borderSkipped:false }]
      }, options:{...DARK, indexAxis:'y',
        scales:{
          x:{ beginAtZero:true, grid:{color:'rgba(255,255,255,.05)'}, ticks:{color:'rgba(255,255,255,.3)',font:{size:9}} },
          y:{ grid:{display:false}, ticks:{color:'rgba(255,255,255,.3)',font:{size:9}} }
        }
      }});
      break;

    case 'ch_appeal':
      new Chart(el, { type:'bar', data:{
        labels:['Rejected','Pending','Approved\n(Wrongful)','Total'],
        datasets:[{ data:[337,318,261,916],
          backgroundColor:[C.gray, C.amber, C.red, C.blue],
          borderRadius:5, borderSkipped:false }]
      }, options:{...DARK,
        scales:{
          y:{beginAtZero:true, grid:{color:'rgba(255,255,255,.05)'}, ticks:{color:'rgba(255,255,255,.3)',font:{size:9}}},
          x:{grid:{display:false}, ticks:{color:'rgba(255,255,255,.3)',font:{size:9}}}
        }
      }});
      break;

    case 'ch_zone':
      new Chart(el, { type:'bar', data:{
        labels:['Z001','Z002','Z003','Z004','Z005\nRiverfront','Z006','Z007\nStudent Hsg','Z008'],
        datasets:[{ data:[6229,6264,6090,6254,6387,6168,6340,6268],
          backgroundColor:[C.green,C.green,C.green,C.amber,C.red,C.green,C.red,C.amber],
          borderRadius:4, borderSkipped:false }]
      }, options:{...DARK,
        scales:{
          y:{beginAtZero:false, min:5900, grid:{color:'rgba(255,255,255,.05)'}, ticks:{color:'rgba(255,255,255,.3)',font:{size:9}}},
          x:{grid:{display:false}, ticks:{color:'rgba(255,255,255,.3)',font:{size:9}}}
        }
      }});
      break;

    case 'ch_pay':
      new Chart(el, { type:'bar', data:{
        labels:['No Fine','Paid','Unpaid','Partial'],
        datasets:[{ data:[38599,9188,1684,529],
          backgroundColor:[C.green, C.blue, C.red, C.amber],
          borderRadius:5, borderSkipped:false }]
      }, options:{...DARK,
        scales:{
          y:{beginAtZero:true, grid:{color:'rgba(255,255,255,.05)'}, ticks:{color:'rgba(255,255,255,.3)',font:{size:9}}},
          x:{grid:{display:false}, ticks:{color:'rgba(255,255,255,.3)',font:{size:9}}}
        }
      }});
      break;

    /* ── Comparison charts ── */
    case 'ch_sync_c': {
      const leg = { display:true, labels:{ color:'rgba(255,255,255,.4)', font:{size:9}, boxWidth:8, padding:6 } };
      new Chart(el, { type:'bar', data:{
        labels:['Sync OK','Failures'],
        datasets:[
          { label:'AS-IS', data:[46489,3511], backgroundColor:'rgba(220,38,38,.5)', borderRadius:4 },
          { label:'TO-BE', data:[49600, 400], backgroundColor:'rgba(34,197,94,.65)', borderRadius:4 }
        ]
      }, options:{...DARK, plugins:{legend:leg},
        scales:{
          y:{beginAtZero:true, grid:{color:'rgba(255,255,255,.05)'}, ticks:{color:'rgba(255,255,255,.3)',font:{size:9}}},
          x:{grid:{display:false}, ticks:{color:'rgba(255,255,255,.3)',font:{size:9}}}
        }
      }});
      break;
    }

    case 'ch_app_c': {
      const leg = { display:true, labels:{ color:'rgba(255,255,255,.4)', font:{size:9}, boxWidth:8, padding:6 } };
      new Chart(el, { type:'bar', data:{
        labels:['Approved\n(Wrongful)','Pending','Rejected'],
        datasets:[
          { label:'AS-IS', data:[261,318,337], backgroundColor:'rgba(220,38,38,.5)', borderRadius:4 },
          { label:'TO-BE', data:[ 64, 80,772], backgroundColor:'rgba(34,197,94,.65)', borderRadius:4 }
        ]
      }, options:{...DARK, plugins:{legend:leg},
        scales:{
          y:{beginAtZero:true, grid:{color:'rgba(255,255,255,.05)'}, ticks:{color:'rgba(255,255,255,.3)',font:{size:9}}},
          x:{grid:{display:false}, ticks:{color:'rgba(255,255,255,.3)',font:{size:9}}}
        }
      }});
      break;
    }

    case 'ch_rev_c': {
      const leg = { display:true, labels:{ color:'rgba(255,255,255,.4)', font:{size:9}, boxWidth:8, padding:6 } };
      new Chart(el, { type:'bar', data:{
        labels:['Levied','Collected','Uncollected'],
        datasets:[
          { label:'AS-IS', data:[647,539,108], backgroundColor:'rgba(220,38,38,.5)', borderRadius:4 },
          { label:'TO-BE', data:[647,625, 22], backgroundColor:'rgba(34,197,94,.65)', borderRadius:4 }
        ]
      }, options:{...DARK, plugins:{legend:leg},
        scales:{
          y:{beginAtZero:true, grid:{color:'rgba(255,255,255,.05)'}, ticks:{color:'rgba(255,255,255,.3)',font:{size:9}, callback:v=>'$'+v+'K'}},
          x:{grid:{display:false}, ticks:{color:'rgba(255,255,255,.3)',font:{size:9}}}
        }
      }});
      break;
    }
  }
}

/* ── SMOOTH NAV active style ── */
document.querySelector('.nav-links') && document.querySelector('.nav-links').addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    navLinks.forEach(a => a.classList.remove('active'));
    e.target.classList.add('active');
  }
});