'use strict';
/* ParkIQ Riverton — main.js */

/* ── NAV active state ── */
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}, { rootMargin:'-35% 0px -60% 0px' });
sections.forEach(s => io.observe(s));

/* ── Chart defaults ── */
const DARK = {
  responsive:true, maintainAspectRatio:false,
  plugins:{ legend:{ display:false } },
  scales:{
    y:{ grid:{color:'rgba(255,255,255,.05)'}, ticks:{color:'rgba(255,255,255,.3)',font:{size:9}} },
    x:{ grid:{display:false}, ticks:{color:'rgba(255,255,255,.3)',font:{size:9}} }
  }
};
const LEG = { display:true, labels:{color:'rgba(255,255,255,.4)',font:{size:9},boxWidth:8,padding:6} };
const C = { orange:'#e8621a',blue:'#2563eb',green:'#16a34a',red:'#dc2626',amber:'#d97706',teal:'#0d9488',purple:'#7c3aed',gray:'#6b7280' };

/* ── Draw charts when visible ── */
const drawn = new Set();
const chartIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !drawn.has(e.target.id)) {
      drawn.add(e.target.id);
      draw(e.target.id);
    }
  });
}, { threshold:0.15 });

['ch_viol','ch_appeal','ch_zone','ch_pay','ch_sc','ch_ac','ch_rc'].forEach(id => {
  const el = document.getElementById(id);
  if (el) chartIO.observe(el);
});

function draw(id) {
  const el = document.getElementById(id); if (!el) return;
  switch(id) {

    case 'ch_viol':
      new Chart(el, { type:'bar', data:{
        labels:['Expired Meter','Overtime Parking','No Permit','Improper Parking','Restricted Zone','Loading Zone Misuse'],
        datasets:[{ data:[3165,2325,2136,1625,1244,906],
          backgroundColor:[C.red,C.amber,C.purple,C.blue,C.teal,C.green],
          borderRadius:4, borderSkipped:false }]
      }, options:{...DARK, indexAxis:'y',
        scales:{ x:{beginAtZero:true,grid:{color:'rgba(255,255,255,.05)'},ticks:{color:'rgba(255,255,255,.3)',font:{size:9}}},
                 y:{grid:{display:false},ticks:{color:'rgba(255,255,255,.3)',font:{size:9}}} }
      }});
      break;

    case 'ch_appeal':
      new Chart(el, { type:'bar', data:{
        labels:['Rejected','Pending','Approved\n(Wrongful)','Total'],
        datasets:[{ data:[337,318,261,916],
          backgroundColor:[C.gray,C.amber,C.red,C.blue],
          borderRadius:4, borderSkipped:false }]
      }, options:{...DARK,
        scales:{ y:{beginAtZero:true,grid:{color:'rgba(255,255,255,.05)'},ticks:{color:'rgba(255,255,255,.3)',font:{size:9}}},
                 x:{grid:{display:false},ticks:{color:'rgba(255,255,255,.3)',font:{size:9}}} }
      }});
      break;

    case 'ch_zone':
      new Chart(el, { type:'bar', data:{
        labels:['Z001','Z002','Z003','Z004','Z005','Z006','Z007','Z008'],
        datasets:[{ data:[6229,6264,6090,6254,6387,6168,6340,6268],
          backgroundColor:[C.green,C.green,C.green,C.amber,C.red,C.green,C.red,C.amber],
          borderRadius:4, borderSkipped:false }]
      }, options:{...DARK,
        scales:{ y:{beginAtZero:false,min:5900,grid:{color:'rgba(255,255,255,.05)'},ticks:{color:'rgba(255,255,255,.3)',font:{size:9}}},
                 x:{grid:{display:false},ticks:{color:'rgba(255,255,255,.3)',font:{size:9}}} }
      }});
      break;

    case 'ch_pay':
      new Chart(el, { type:'bar', data:{
        labels:['No Fine','Paid','Unpaid','Partial'],
        datasets:[{ data:[38599,9188,1684,529],
          backgroundColor:[C.green,C.blue,C.red,C.amber],
          borderRadius:4, borderSkipped:false }]
      }, options:{...DARK,
        scales:{ y:{beginAtZero:true,grid:{color:'rgba(255,255,255,.05)'},ticks:{color:'rgba(255,255,255,.3)',font:{size:9}}},
                 x:{grid:{display:false},ticks:{color:'rgba(255,255,255,.3)',font:{size:9}}} }
      }});
      break;

    case 'ch_sc':
      new Chart(el, { type:'bar', data:{
        labels:['Sync OK','Failures'],
        datasets:[
          { label:'AS-IS', data:[46489,3511], backgroundColor:'rgba(220,38,38,.5)', borderRadius:4 },
          { label:'TO-BE', data:[49600,400],  backgroundColor:'rgba(34,197,94,.65)',  borderRadius:4 }
        ]
      }, options:{...DARK, plugins:{legend:LEG},
        scales:{ y:{beginAtZero:true,grid:{color:'rgba(255,255,255,.05)'},ticks:{color:'rgba(255,255,255,.3)',font:{size:9}}},
                 x:{grid:{display:false},ticks:{color:'rgba(255,255,255,.3)',font:{size:9}}} }
      }});
      break;

    case 'ch_ac':
      new Chart(el, { type:'bar', data:{
        labels:['Approved\n(Wrongful)','Pending','Rejected'],
        datasets:[
          { label:'AS-IS', data:[261,318,337], backgroundColor:'rgba(220,38,38,.5)', borderRadius:4 },
          { label:'TO-BE', data:[64,80,772],   backgroundColor:'rgba(34,197,94,.65)',  borderRadius:4 }
        ]
      }, options:{...DARK, plugins:{legend:LEG},
        scales:{ y:{beginAtZero:true,grid:{color:'rgba(255,255,255,.05)'},ticks:{color:'rgba(255,255,255,.3)',font:{size:9}}},
                 x:{grid:{display:false},ticks:{color:'rgba(255,255,255,.3)',font:{size:9}}} }
      }});
      break;

    case 'ch_rc':
      new Chart(el, { type:'bar', data:{
        labels:['Levied','Collected','Uncollected'],
        datasets:[
          { label:'AS-IS', data:[647,539,108], backgroundColor:'rgba(220,38,38,.5)', borderRadius:4 },
          { label:'TO-BE', data:[647,625,22],  backgroundColor:'rgba(34,197,94,.65)',  borderRadius:4 }
        ]
      }, options:{...DARK, plugins:{legend:LEG},
        scales:{ y:{beginAtZero:true,grid:{color:'rgba(255,255,255,.05)'},ticks:{color:'rgba(255,255,255,.3)',font:{size:9},callback:v=>'$'+v+'K'}},
                 x:{grid:{display:false},ticks:{color:'rgba(255,255,255,.3)',font:{size:9}}} }
      }});
      break;
  }
}
