import test from "node:test";import assert from "node:assert/strict";
import {positions,createFilter,add,has,theoreticalFpr,build,experiment} from "../src/core.js";
test("positions deterministic and bounded",()=>{const p=positions("x",100,4);assert.deepEqual(p,positions("x",100,4));assert.ok(p.every(x=>x>=0&&x<100))});
test("inserted values never false negative",()=>{const vals=Array.from({length:500},(_,i)=>`v${i}`),f=build(vals,5000,7);assert.ok(vals.every(v=>has(f,v)))});
test("empty filter rejects ordinary value",()=>assert.equal(has(createFilter(512,4),"hello"),false));
test("theoretical rate bounded",()=>{const r=theoreticalFpr(10000,7,1000);assert.ok(r>0&&r<1)});
test("experiment returns reproducible counts",()=>{const a=experiment({inserted:500,queries:2000,m:5000,k:7}),b=experiment({inserted:500,queries:2000,m:5000,k:7});assert.deepEqual(a,b)});
test("bad configuration rejected",()=>{assert.throws(()=>positions("x",2,1));assert.throws(()=>createFilter(100,0));assert.throws(()=>experiment({inserted:0}))});
