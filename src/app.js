import {build,has,experiment,bitDensity} from "./core.js";
const $=s=>document.querySelector(s);
let items=["alpha","bravo","charlie","delta","echo","foxtrot"];
function render(){
 const m=Math.max(64,Math.min(32768,Number($("#bits").value)||2048)),k=Math.max(1,Math.min(16,Number($("#hashes").value)||4));
 const f=build(items,m,k), q=$("#query").value.trim();
 const r=q?has(f,q):false;
 $("#answer").textContent=q?(r?"Possibly present":"Definitely not present"):"—";
 $("#answer").className="metric "+(r?"warning":"good");
 $("#count").textContent=items.length;$("#density").textContent=(100*bitDensity(f)).toFixed(1)+"%";
 const cells=Array.from({length:256},(_,i)=>{const idx=Math.floor(i*m/256);return `<rect x="${(i%32)*10}" y="${Math.floor(i/32)*10}" width="8" height="8" rx="2" fill="${f.bits[idx]?"#7dd3fc":"#1d2634"}"/>`}).join("");
 $("#bitsView").innerHTML=cells;
}
$("#add").onclick=()=>{const v=$("#item").value.trim();if(v&&!items.includes(v)){items.push(v);$("#item").value="";render()}};
$("#query").oninput=render;$("#bits").oninput=render;$("#hashes").oninput=render;
$("#run").onclick=()=>{const m=Number($("#bits").value),k=Number($("#hashes").value);const e=experiment({inserted:1000,queries:10000,m,k});$("#measured").textContent=(100*e.measured).toFixed(2)+"%";$("#theory").textContent=(100*e.theoretical).toFixed(2)+"%"};
render();
