import{aB as f,aC as r,aD as d,aE as l,aF as a}from"./index.1d625381.js";const[m,v]=f(void 0);function E(){this.done||(this.createEffect(()=>{if(!(this.mouseControlState.get()!==!0||r()!==this.camera))return d("camera"),()=>{d("mouse")}},[this.mouseControlState.get,r]),this.createEffect(()=>{if(r()!==this.camera||!this.mouseControlState.get())return;if(v()===this.camera){const e=c=>this.gyrate(c.movementX,c.movementY);return document.addEventListener("mousemove",e),()=>{document.removeEventListener("mousemove",e)}}let t=!1,[n,o]=[0,0];const i=l.on("down",e=>(t=!0,[n,o]=[e.clientX,e.clientY])),s=l.on("up",()=>t=!1),u=e=>{if(e.movementX===void 0){const[c,h]=[e.clientX-n,e.clientY-o];[n,o]=[e.clientX,e.clientY],t&&this.gyrate(c*2,h*2);return}t&&this.gyrate(e.movementX*2,e.movementY*2)};return a.addEventListener("pointermove",u),()=>{i.cancel(),s.cancel(),a.removeEventListener("pointermove",u),t=!1}},[this.mouseControlState.get,r,v]),this.createEffect(()=>{const t=r();if(this.mouseControlState.get()!==!0||t!==this.camera)return;const n=()=>{var i,s;return(s=(i=a).requestPointerLock)==null?void 0:s.call(i)},o=()=>{document.pointerLockElement===a?m(t):m(void 0)};return a.addEventListener("click",n),document.addEventListener("pointerlockchange",o),()=>{a.removeEventListener("click",n),document.removeEventListener("pointerlockchange",o),document.exitPointerLock(),m(void 0)}},[this.mouseControlState.get,r]))}export{E as default};