function hash32(text, seed) {
  let h=seed>>>0;
  for(const ch of String(text)){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)>>>0}
  return h>>>0;
}
export function positions(value,m,k){
  if(!Number.isInteger(m)||m<8||m>1000000||!Number.isInteger(k)||k<1||k>32)throw new Error("config");
  const h1=hash32(value,2166136261), h2=(hash32(value,0x9e3779b9)|1)>>>0;
  return Array.from({length:k},(_,i)=>(h1+Math.imul(i,h2))>>>0).map(x=>x%m);
}
export function createFilter(m=2048,k=4){if(!Number.isInteger(m)||m<8||m>1000000||!Number.isInteger(k)||k<1||k>32)throw new Error("config");return {m,k,bits:new Uint8Array(m),count:0}}
export function add(filter,value){for(const i of positions(value,filter.m,filter.k))filter.bits[i]=1;filter.count++;return filter}
export function has(filter,value){return positions(value,filter.m,filter.k).every(i=>filter.bits[i]===1)}
export function theoreticalFpr(m,k,n){if(n<0)throw new Error("n");return (1-Math.exp(-(k*n)/m))**k}
export function bitDensity(filter){let on=0;for(const b of filter.bits)on+=b;return on/filter.m}
export function build(values,m,k){const f=createFilter(m,k);for(const v of values)add(f,String(v));return f}
export function experiment({inserted=1000,queries=10000,m=12000,k=8}={}){
  if(!Number.isInteger(inserted)||inserted<1||inserted>50000||!Number.isInteger(queries)||queries<1||queries>100000)throw new Error("experiment");
  const values=Array.from({length:inserted},(_,i)=>`member-${i}`);
  const f=build(values,m,k);
  let falsePositives=0;
  for(let i=0;i<queries;i++) if(has(f,`outside-${i}`)) falsePositives++;
  return {inserted,queries,falsePositives,measured:falsePositives/queries,theoretical:theoreticalFpr(m,k,inserted),density:bitDensity(f)};
}
