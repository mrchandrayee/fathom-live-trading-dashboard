const $=s=>document.querySelector(s);
const chart=document.querySelector("#market-chart");
const path=$("#chart-path"),area=$("#chart-area"),dot=$("#chart-dot"),cross=$("#crosshair");
const initial=[42,47,43,55,51,59,54,62,57,66,61,70,65,72,68,77,71,83,76,80,73,88,82,91,84,97,89,94,86,102,96,108,99,112,105,118,110,124,116,130,121,135,127,140,133,146,138,151,144,157,149,162,154,167,159,172,165,178,171,182,175,188,181,193,186,198,191,202,196,207];
let points=initial.map((y,i)=>[i*800/(initial.length-1),y]);
function drawChart(data=points){
 const d=data.map((p,i)=>(i?"L":"M")+p[0].toFixed(1)+" "+p[1].toFixed(1)).join(" ");
 path.setAttribute("d",d);area.setAttribute("d",d+` L800 220 L0 220 Z`);
}
drawChart();
const bars=$("#volume-bars");for(let i=0;i<44;i++){const b=document.createElement("i");b.style.height=(5+Math.random()*19)+"px";bars.append(b)}
const asks=$("#asks"),bids=$("#bids");
function bookRows(el,side){for(let i=0;i<6;i++){const price=side==="ask"?67435+i*3.2:67426-i*2.8;const amount=(.12+Math.random()*.9).toFixed(3);const row=document.createElement("div");row.className="book-row";row.style.setProperty("--depth",(25+Math.random()*70)+"%");row.style.setProperty("--depth-color",side==="ask"?"#e56c6c":"#39c88b");row.innerHTML=`<span>${price.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}</span><span>${amount}</span><span>${(price*Number(amount)).toLocaleString("en-US",{maximumFractionDigits:0})}</span>`;el.append(row)}}
bookRows(asks,"ask");bookRows(bids,"bid");
const positions=[["₿","Bitcoin","BTC","Long","65,820.00","67,428.50","+2.44%","long"],["◆","Ethereum","ETH","Long","3,420.50","3,512.80","+2.70%","long"],["◎","Solana","SOL","Short","148.20","145.60","+1.75%","short"],["A","Cardano","ADA","Long","0.4520","0.4682","+3.58%","long"]];
positions.forEach(([icon,name,symbol,type,entry,mark,pnl,kind])=>{const tr=document.createElement("tr");tr.innerHTML=`<td><div class="asset"><span class="coin ${symbol.toLowerCase()}">${icon}</span>${name} <span style="color:#6f7d83;font-weight:400">${symbol}</span></div></td><td><span class="tag ${kind==="short"?"short":""}">${type}</span></td><td>${entry}</td><td>${mark}</td><td class="up">${pnl}</td><td><span class="tag">Active</span></td>`;$("#position-rows").append(tr)});
const watch=[["₿","Bitcoin","BTC/USD","67,428.50","+2.34%","up"],["◆","Ethereum","ETH/USD","3,512.80","+1.82%","up"],["◎","Solana","SOL/USD","145.60","−0.74%","down"],["A","Cardano","ADA/USD","0.4682","+3.58%","up"],["✕","XRP","XRP/USD","0.6241","−0.32%","down"]];
watch.forEach(([ico,name,sym,price,change,cls])=>{const row=document.createElement("div");row.className="watch-row";row.innerHTML=`<span class="coin">${ico}</span><span class="watch-name"><b>${name}</b><small>${sym}</small></span><span class="watch-price"><b>${price}</b><small class="${cls}">${change}</small></span>`;$("#watch-rows").append(row)});
document.querySelectorAll(".range").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".range").forEach(x=>x.classList.remove("active"));btn.classList.add("active");const factor={ "1D":1,"1W":.85,"1M":.72,"1Y":.55}[btn.dataset.range];const data=initial.map((y,i)=>[i*800/(initial.length-1),Math.max(12,Math.min(205,110+(y-110)*factor+(Math.sin(i*1.7)*5)))]);drawChart(data);toast("Chart range updated: "+btn.dataset.range)}));
document.querySelectorAll(".pair").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".pair").forEach(x=>x.classList.remove("active"));btn.classList.add("active");$("#price").textContent=btn.textContent==="ETH/USD"?"$3,512.80":"$67,428.50";toast(btn.textContent+" selected")}));
const modal=$("#trade-modal");function openModal(){modal.classList.remove("hidden")}function closeModal(){modal.classList.add("hidden")}
$("#all-positions").addEventListener("click",()=>{toast("Showing all active positions")});
$("#add-watch").addEventListener("click",()=>{const name=prompt("Enter a market symbol to watch (demo):","DOGE/USD");if(name){const row=document.createElement("div");row.className="watch-row";row.innerHTML=`<span class="coin">＋</span><span class="watch-name"><b>${name.toUpperCase()}</b><small>Custom watch</small></span><span class="watch-price"><b>—</b><small class="up">Added</small></span>`;$("#watch-rows").append(row);toast("Added to watchlist")}});
document.querySelectorAll(".metric").forEach(card=>card.addEventListener("click",openModal));
$("#modal-close").addEventListener("click",closeModal);modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
document.querySelectorAll(".toggle button").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".toggle button").forEach(x=>x.classList.remove("selected"));btn.classList.add("selected");$("#submit-order").textContent="Place demo "+btn.dataset.side.toLowerCase()+" order"}));
function updateEstimate(){const amount=Number($("#amount").value)||0,price=Number($("#limit-price").value)||0;$("#estimate").textContent="$"+(amount*price).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}
$("#amount").addEventListener("input",updateEstimate);$("#limit-price").addEventListener("input",updateEstimate);
$("#submit-order").addEventListener("click",()=>{const amount=Number($("#amount").value);if(!(amount>0)){toast("Enter a valid amount");return}closeModal();toast("Demo order submitted — no real trade placed")});
let toastTimer;function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2100)}
chart.addEventListener("pointermove",e=>{const rect=chart.getBoundingClientRect(),x=(e.clientX-rect.left)/rect.width*800;cross.setAttribute("x1",x);cross.setAttribute("x2",x);const idx=Math.max(0,Math.min(points.length-1,Math.round(x/800*(points.length-1))));dot.setAttribute("cx",points[idx][0]);dot.setAttribute("cy",points[idx][1])});
setInterval(()=>{const last=points[points.length-1][1];points=points.slice(1).map((p,i)=>[i*800/(points.length-1),p[1]]);points.push([800,Math.max(25,Math.min(205,last+(Math.random()-.48)*13))]);drawChart();$("#balance").textContent="$"+(124568.82+(Math.random()-.4)*28).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})},2500);
