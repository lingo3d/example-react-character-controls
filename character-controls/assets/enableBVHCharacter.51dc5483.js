import{aZ as P,a_ as O,a$ as V,b0 as H,b1 as z,b2 as U,b3 as G,b4 as w,b5 as _,b6 as B,Z as k,b7 as E,b8 as N,aN as T,b9 as W,V as j}from"./index.1d625381.js";import{b as Z}from"./computeBVH.6289c5a1.js";const f=new Set,F=()=>new WeakSet;P(function(){if(z())return;const s=O();if(!s.length)return;const c=V(),y=H(),h=.02,R=U(()=>{G.clear();for(const t of f){const a=t.bvhVelocity,o=t.outerObject3d,v=t.bvhHalfHeight,n=t.bvhRadius;a.y+=t.bvhOnGround?0:h*-c;const{position:r}=t.physicsUpdate;t.physicsUpdate={},r&&(r.x&&(a.x=0),r.y&&(a.y=0),r.z&&(a.z=0)),o.position.addScaledVector(a,h),o.updateMatrixWorld();const{start:i,end:d}=B;d.copy(i.copy(o.position));const m=Math.max(v-n,0);d.y+=m,i.y-=m;const A=i.clone();w.setFromCenterAndSize(o.position,_.set(n*2,v*2,n*2));const g=E,M=N;let l=0,b,S=!1,p;for(const x of s)p=Z.get(x),x.shapecast({intersectsBounds:u=>u.intersectsBox(w),intersectsTriangle:u=>{l=u.closestPointToSegment(B,g,M),l<n&&(S=!0,b=M.sub(g).normalize().multiplyScalar(n-l),i.add(b),d.add(b))}});S&&p&&k(G,t,F).add(p);const e=i.sub(A);t.bvhOnGround=e.y>Math.abs(h*a.y*.25),y&&t.bvhOnGround&&Math.abs(e.y/(e.x+e.z+Number.EPSILON))<y&&(t.bvhOnGround=!1);const C=Math.max(0,e.length()-1e-5);e.normalize().multiplyScalar(C),o.position.add(e),t.bvhOnGround?a.set(0,0,0):(e.normalize(),a.addScaledVector(e,-e.dot(a)))}});return()=>{R.cancel()}},[O,V,H,z]);function $(s){if(s.done)return;T.attach(this.outerObject3d),this.width=this.depth=Math.min(this.width,this.depth),this.physicsUpdate={};const c=W(this).multiplyScalar(.5);this.bvhHalfHeight=Math.max(c.y,.5),this.bvhRadius=Math.max(c.x,.5),this.bvhVelocity=new j,f.add(this),s.then(()=>{f.delete(this),this.physicsUpdate=void 0})}export{$ as default};
