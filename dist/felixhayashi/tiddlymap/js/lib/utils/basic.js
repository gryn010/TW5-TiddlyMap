"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.bindTo=exports.getNearestRasterPosition=exports.mod=exports.removeDOMChildNodes=exports.setDomListeners=exports.merge=exports.getRandomLabel=exports.getFirstElementByClassName=exports.getImgFromWeb=exports.pickRandom=exports.hasKeyWithPrefix=exports.getWithoutPrefix=exports.getPropertiesByPrefix=exports.removeArrayElement=exports.isTrue=exports.replaceAll=exports.isInteger=exports.findAndRemoveClassNames=exports.getAncestorWithClass=exports.makeHashMap=exports.getWithoutNewLines=exports.joinAndWrap=exports.parseJSON=exports.hasSubString=exports.inArray=exports.getRandomInt=exports.isEqual=exports.identity=exports.startsWith=exports.getBasename=exports.escapeRegex=exports.hasElements=exports.ucFirst=undefined;var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol==="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};// @preserve
/*\

title: $:/plugins/felixhayashi/tiddlymap/js/lib/utils/basic
type: application/javascript
module-type: library

@preserve

\*/
var _exception=require("$:/plugins/felixhayashi/tiddlymap/js/exception");var ucFirst=exports.ucFirst=function e(t){return t&&t[0].toUpperCase()+t.slice(1)};var hasElements=exports.hasElements=function e(t){return Object.keys(t).length>0};var escapeRegex=exports.escapeRegex=function e(t){return t.replace(/[-$^?.+*[\]\\(){}|]/g,"\\$&")};var getBasename=exports.getBasename=function e(t){var r=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"/";return t.substring(t.lastIndexOf(r)+1)};var startsWith=exports.startsWith=function e(t,r){return t.substring(0,r.length)===r};var identity=exports.identity=function e(t){return(typeof t==="undefined"?"undefined":_typeof(t))==="object"&&t!==null?JSON.stringify(Object.keys(t).sort().map(function(e){return[e,t[e]]})):null};var isEqual=exports.isEqual=function e(t,r){return identity(t)===identity(r)};var getRandomInt=exports.getRandomInt=function e(t,r){return Math.floor(Math.random()*(r-t)+t)};var inArray=exports.inArray=function e(t,r){return r.indexOf(t)!==-1};var hasSubString=exports.hasSubString=function e(t,r){return t.indexOf(r)!==-1};var parseJSON=exports.parseJSON=function e(t,r){try{return JSON.parse(t)}catch(e){return r}};var joinAndWrap=exports.joinAndWrap=function e(t,r,n){var o=arguments.length>3&&arguments[3]!==undefined?arguments[3]:" ";return r+t.join(n+o+r)+n};var getWithoutNewLines=exports.getWithoutNewLines=function e(t){return typeof t==="string"?t.replace(/[\n\r]/g," "):t};var makeHashMap=exports.makeHashMap=function e(t){var r=Object.create(null);Object.defineProperty(r,"hasOwnProperty",{enumerable:false,configurable:false,writable:false,value:Object.prototype.hasOwnProperty.bind(r)});if(t){for(var n in t){if(t.hasOwnProperty(n)){r[n]=t[n]}}}return r};var getAncestorWithClass=exports.getAncestorWithClass=function e(t,r){if((typeof t==="undefined"?"undefined":_typeof(t))!=="object"||typeof r!=="string"){return}while(t.parentNode&&t.parentNode!==document){t=t.parentNode;if(t.classList.contains(r)){return t}}};var findAndRemoveClassNames=exports.findAndRemoveClassNames=function e(t){for(var r=t.length;r--;){var n=document.getElementsByClassName(t[r]);for(var o=n.length;o--;){n[o].classList.remove(t[r])}}};var isInteger=exports.isInteger=Number.isInteger||function(e){return typeof e==="number"&&isFinite(e)&&Math.floor(e)===e};var replaceAll=exports.replaceAll=function e(t){var r=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"";var n=arguments[2];for(var o=n.length;o--;){var s=n[o];var i=r;if(Array.isArray(s)){i=s[1];s=s[0]}t=t.replace(s,i)}return t};var isTrue=exports.isTrue=function e(t,r){if(t==null){return!!r}else if(typeof t==="string"){var n=parseInt(t);return isNaN(n)?t==="true":n!==0}else if(typeof t==="boolean"){return t}else if(typeof t==="number"){return n!==0}return false};var removeArrayElement=exports.removeArrayElement=function e(t,r){var n=t.indexOf(r);if(n>-1){return t.splice(n,1)[0]}};var getPropertiesByPrefix=exports.getPropertiesByPrefix=function e(t,r,n){var o=makeHashMap();for(var s in t){if(startsWith(s,r)){o[n?s.substr(r.length):s]=t[s]}}return o};var getWithoutPrefix=exports.getWithoutPrefix=function e(t,r){return startsWith(t,r)?t.substr(r.length):t};var hasKeyWithPrefix=exports.hasKeyWithPrefix=function e(t,r){for(var n in t){if(startsWith(n,r)){return true}}return false};var pickRandom=exports.pickRandom=function e(t){return t[getRandomInt(0,t.length-1)]};var getImgFromWeb=exports.getImgFromWeb=function e(t,r){if(!t||typeof r!=="function")return;var n=new XMLHttpRequest;n.open("GET",t,true);n.responseType="blob";n.onerror=function(e){console.log(e)};n.onload=function(e){if(this.readyState===4&&(this.status===200||this.status===0&&this.response.size>0)){var t=this.response;r(window.URL.createObjectURL(t))}};try{n.send()}catch(e){console.log(e)}};var getFirstElementByClassName=exports.getFirstElementByClassName=function e(t,r,n){var o=(r||document).getElementsByClassName(t)[0];if(!o&&(typeof n==="boolean"?n:true)){var s='Missing element with class "'+t+'" inside '+r;throw new _exception.EnvironmentError(s)}return o};var getRandomLabel=exports.getRandomLabel=function e(){var t=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var r=pickRandom(["exciting","notable","epic","new","fancy","great","cool","fresh","funky","clever"]);var n=(t.object||pickRandom(["concept","idea","thought","topic","subject"]))+(t.plural?"s":"");return"My "+r+" "+n};var _merge=function e(t,r){if((typeof t==="undefined"?"undefined":_typeof(t))!=="object"){t={}}for(var n in r){if(r.hasOwnProperty(n)){if(r[n]!=null){t[n]=_typeof(r[n])==="object"?e(t[n],r[n]):r[n]}}}return t};var merge=exports.merge=function e(t){for(var r=arguments.length,n=Array(r>1?r-1:0),o=1;o<r;o++){n[o-1]=arguments[o]}for(var s=0,i=n.length;s<i;s++){var a=n[s];if(a!=null&&(typeof a==="undefined"?"undefined":_typeof(a))==="object"){t=_merge(t,a)}}return t};var setDomListeners=exports.setDomListeners=function e(t,r,n,o){o=typeof o==="boolean"?o:false;t=t+"EventListener";for(var s in n){var i=n[s];if(typeof i==="function"){r[t](s,i,o)}else{r[t](s,i[0],typeof i[1]==="boolean"?i[1]:o)}}};var removeDOMChildNodes=exports.removeDOMChildNodes=function e(t){for(var r=t.childNodes.length;r--;){t.removeChild(t.childNodes[r])}};var mod=exports.mod=function e(t,r){var n=t%r;return Math.floor(n>=0?n:n+r)};var getNearestRasterPosition=exports.getNearestRasterPosition=function e(t,r){var n=t.x,o=t.y;var s=r/2;var i=mod(n,r);var a=mod(o,r);return{x:i<s?n-i:n-i+r,y:a<s?o-a:o-a+r}};var bindTo=exports.bindTo=function e(t,r){for(var n=r.length;n--;){var o=t[r[n]];t[r[n]]=o.bind(t)}};
//# sourceMappingURL=./maps/felixhayashi/tiddlymap/js/lib/utils/basic.js.map
