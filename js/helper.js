/* ---------- helpers ---------- */
const API = 'http://localhost:8000'; // the only place the frontend talks to; no keys live here
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const inr = n => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',minimumFractionDigits:2,maximumFractionDigits:2}).format(n||0);
const inr0 = n => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n||0);
const r2 = x => Math.round((x + Number.EPSILON) * 100) / 100;
const iso = d => { const z = new Date(d.getTime() - d.getTimezoneOffset()*60000); return z.toISOString().slice(0,10); };
const fd = s => { if(!s) return '—'; const d = new Date(s+(s.length===10?'T00:00:00':'')); return d.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}); };
const ft = s => new Date(s).toLocaleString('en-IN',{day:'numeric',month:'short',hour:'numeric',minute:'2-digit'});
const ic = (n, cls = '') => `<i data-lucide="${n}" class="ic ${cls}"></i>`;
const icons = () => { try { window.lucide && lucide.createIcons(); } catch(e) {} };
const store = {
  get(k){ try { return localStorage.getItem(k); } catch(e){ return null; } },
  set(k,v){ try { localStorage.setItem(k,v); } catch(e){} },
  del(k){ try { localStorage.removeItem(k); } catch(e){} }
};

function inWords(num){
  const a=['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
  const b=['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
  const two=n=>n<20?a[n]:b[Math.floor(n/10)]+(n%10?' '+a[n%10]:'');
  const three=n=>(n>=100?a[Math.floor(n/100)]+' Hundred'+(n%100?' ':''):'')+(n%100?two(n%100):'');
  let n=Math.round(num); if(n<=0) return 'Zero Rupees Only';
  const cr=Math.floor(n/1e7); n%=1e7; const lk=Math.floor(n/1e5); n%=1e5; const th=Math.floor(n/1e3); n%=1e3;
  const p=[]; if(cr)p.push(three(cr)+' Crore'); if(lk)p.push(two(lk)+' Lakh'); if(th)p.push(two(th)+' Thousand'); if(n)p.push(three(n));
  return p.join(' ')+' Rupees Only';
}
