import{a as d}from"./assets/vendor-26fe51b3.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const t of o)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function r(o){const t={};return o.integrity&&(t.integrity=o.integrity),o.referrerpolicy&&(t.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?t.credentials="include":o.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(o){if(o.ep)return;o.ep=!0;const t=r(o);fetch(o.href,t)}})();d.defaults.headers.common["x-api-key"]="live_Er46koKybYqW28gLOCiI46EOwSbW1Of6rmEYmaOYjgdL748hwWdb57JpKIyVtfLR";const l=document.querySelector(".breed-select"),u=document.querySelector(".loader"),a=document.querySelector(".error");a.hidden=!0;console.log(l);function s(){return fetch("https://api.thecatapi.com/v1/breeds").then(e=>{if(console.log(e),!e.ok)throw new Error;return e.json()}).catch(e=>console.log(e))}s();function f(){return s().then(e=>{e.forEach(({id:n,name:r})=>{const c=document.createElement("option");c.value=n,c.textContent=r,l.add(c),u.hidden=!0})})}f().then(()=>{console.log("Options added to select")}).catch(e=>{console.error("Error filling in options:",e)});function h(e){return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${e}`).then(r=>{if(console.log(r),!r.ok)throw new Error;return r.json()}).catch(r=>console.log(r))}h("acur").then(e=>{console.log(e)}).catch(e=>{console.error("Error filling in options:",e)});
//# sourceMappingURL=commonHelpers.js.map
