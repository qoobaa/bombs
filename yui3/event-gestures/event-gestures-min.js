/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0
build: 2676
*/
YUI.add("event-flick",function(C){var G=("ontouchstart" in C.config.win&&!C.UA.chrome)?{start:"touchstart",end:"touchend"}:{start:"mousedown",end:"mouseup"},H="start",K="end",B="ownerDocument",I="minVelocity",E="minDistance",A="preventDefault",D="_fs",F="_fsh",L="_feh",J="nodeType";C.Event.define("flick",{on:function(N,M,P){var O=N.on(G[H],this._onStart,this,N,M,P);M[F]=O;},detach:function(O,N,Q){var P=N[F],M=N[L];if(P){P.detach();N[F]=null;}if(M){M.detach();N[L]=null;}},processArgs:function(M){var N=(M.length>3)?C.merge(M.splice(3,1)[0]):{};if(!(I in N)){N[I]=this.MIN_VELOCITY;}if(!(E in N)){N[E]=this.MIN_DISTANCE;}if(!(A in N)){N[A]=this.PREVENT_DEFAULT;}return N;},_onStart:function(Q,O,U,N){var M=true,T,S,R=U._extra.preventDefault,P=Q;if(Q.touches){M=(Q.touches.length===1);Q=Q.touches[0];}if(M){if(R){if(!R.call||R(Q)){P.preventDefault();}}Q.flick={time:new Date().getTime()};U[D]=Q;T=U[L];if(!T){S=(O.get(J)===9)?O:O.get(B);T=S.on(G[K],C.bind(this._onEnd,this),null,O,U,N);U[L]=T;}}},_onEnd:function(Z,T,a,Q){var X=new Date().getTime(),O=a[D],M=!!O,b=Z,P,S,Y,V,W,N,U,R;if(M){if(Z.changedTouches){if(Z.changedTouches.length===1&&Z.touches.length===0){b=Z.changedTouches[0];}else{M=false;}}if(M){V=a._extra;Y=V[A];if(Y){if(!Y.call||Y(Z)){b.preventDefault();}}P=O.flick.time;X=new Date().getTime();S=X-P;W=[b.pageX-O.pageX,b.pageY-O.pageY];R=V.axis||(Math.abs(W[0])>=Math.abs(W[1]))?"x":"y";N=W[(R==="x")?0:1];U=(S!==0)?N/S:0;if(isFinite(U)&&(Math.abs(N)>=V[E])&&(Math.abs(U)>=V[I])){Z.type="flick";Z.flick={time:S,distance:N,velocity:U,axis:R,start:O};Q.fire(Z);}a[D]=null;}}},MIN_VELOCITY:0,MIN_DISTANCE:0,PREVENT_DEFAULT:false});},"3.2.0",{requires:["node-base","event-touch","event-synthetic"]});YUI.add("event-move",function(E){var J=("ontouchstart" in E.config.win&&!E.UA.chrome)?{start:"touchstart",move:"touchmove",end:"touchend"}:{start:"mousedown",move:"mousemove",end:"mouseup"},X="start",d="move",H="end",L="gesture"+d,A=L+H,I=L+X,c="_msh",M="_mh",W="_meh",R="_dmsh",O="_dmh",C="_dmeh",G="_ms",S="_m",a="minTime",T="minDistance",U="preventDefault",B="button",V="ownerDocument",N="currentTarget",P="target",Q="nodeType",K=function(h,f,g){var Y=(g)?4:3,e=(f.length>Y)?E.merge(f.splice(Y,1)[0]):{};if(!(U in e)){e[U]=h.PREVENT_DEFAULT;}return e;},F=function(e,Y){return Y._extra.root||(e.get(Q)===9)?e:e.get(V);},Z=function(Y,f,e){Y.pageX=f.pageX;Y.pageY=f.pageY;Y.screenX=f.screenX;Y.screenY=f.screenY;Y.clientX=f.clientX;Y.clientY=f.clientY;Y[P]=f[P]||Y[P];Y[N]=f[N]||Y[N];Y[B]=(e&&e[B])||1;},b=function(f,Y){if(Y){if(!Y.call||Y(f)){f.preventDefault();}}},D=E.Event.define;D(I,{on:function(e,Y,f){Y[c]=e.on(J[X],this._onStart,this,e,Y,f);},delegate:function(f,e,h,Y){var g=this;e[R]=f.delegate(J[X],function(i){g._onStart(i,f,e,h,true);},Y);},detachDelegate:function(f,e,h,Y){var g=e[R];if(g){g.detach();e[R]=null;}},detach:function(e,Y,g){var f=Y[c];if(f){f.detach();Y[c]=null;}},processArgs:function(Y,e){var f=K(this,Y,e);if(!(a in f)){f[a]=this.MIN_TIME;}if(!(T in f)){f[T]=this.MIN_DISTANCE;}return f;},_onStart:function(k,f,q,Y,m){if(m){f=k[N];}var g=q._extra,p=true,h=g[a],o=g[T],i=g.button,j=g[U],n=F(f,q),l;if(k.touches){if(k.touches.length===1){Z(k,k.touches[0],g);}else{p=false;}}else{p=(i===undefined)||(i===k.button);}if(p){b(k,j);if(h===0||o===0){this._start(k,f,Y,g);}else{l=[k.pageX,k.pageY];if(h>0){g._ht=E.later(h,this,this._start,[k,f,Y,g]);g._hme=n.on(J[H],E.bind(function(){this._cancel(g);},this));}if(o>0){g._hm=n.on(J[d],E.bind(function(e){if(Math.abs(e.pageX-l[0])>o||Math.abs(e.pageY-l[1])>o){this._start(k,f,Y,g);}},this));}}}},_cancel:function(Y){if(Y._ht){Y._ht.cancel();Y._ht=null;}if(Y._hme){Y._hme.detach();Y._hme=null;}if(Y._hm){Y._hm.detach();Y._hm=null;}},_start:function(g,Y,f,h){if(h){this._cancel(h);}g.type=I;Y.setData(G,g);f.fire(g);},MIN_TIME:0,MIN_DISTANCE:0,PREVENT_DEFAULT:false});D(L,{on:function(f,e,h){var Y=F(f,e),g=Y.on(J[d],this._onMove,this,f,e,h);e[M]=g;},delegate:function(f,e,h,Y){var g=this;e[O]=f.delegate(J[d],function(i){g._onMove(i,f,e,h,true);},Y);},detach:function(e,Y,g){var f=Y[M];if(f){f.detach();Y[M]=null;}},detachDelegate:function(f,e,h,Y){var g=e[O];if(g){g.detach();e[O]=null;}},processArgs:function(Y,e){return K(this,Y,e);},_onMove:function(k,i,h,j,g){if(g){i=k[N];}var Y=h._extra.standAlone||i.getData(G),f=h._extra.preventDefault;if(Y){if(k.touches){if(k.touches.length===1){Z(k,k.touches[0]);}else{Y=false;}}if(Y){b(k,f);k.type=L;j.fire(k);}}},PREVENT_DEFAULT:false});D(A,{on:function(g,f,h){var e=F(g,f),Y=e.on(J[H],this._onEnd,this,g,f,h);f[W]=Y;},delegate:function(f,e,h,Y){var g=this;e[C]=f.delegate(J[H],function(i){g._onEnd(i,f,e,h,true);},Y);},detachDelegate:function(f,e,h,Y){var g=e[C];if(g){g.detach();e[C]=null;}},detach:function(f,e,g){var Y=e[W];if(Y){Y.detach();e[W]=null;}},processArgs:function(Y,e){return K(this,Y,e);},_onEnd:function(k,i,g,j,f){if(f){i=k[N];}var h=g._extra.standAlone||i.getData(S)||i.getData(G),Y=g._extra.preventDefault;if(h){if(k.changedTouches){if(k.changedTouches.length===1){Z(k,k.changedTouches[0]);}else{h=false;}}if(h){b(k,Y);k.type=A;j.fire(k);i.clearData(G);i.clearData(S);}}},PREVENT_DEFAULT:false});},"3.2.0",{requires:["node-base","event-touch","event-synthetic"]});YUI.add("event-gestures",function(A){},"3.2.0",{use:["event-flick","event-move"]});