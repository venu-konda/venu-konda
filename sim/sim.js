/* Shared helpers for the project simulators. No dependencies. */
const $=id=>document.getElementById(id);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const fmt=(v,d=1)=>Number.isFinite(v)?v.toFixed(d):'—';
const pad=(n,w=2)=>String(n).padStart(w,'0');
const hex2=v=>(v&255).toString(16).padStart(2,'0').toUpperCase();

/* Range slider → label value binding. bindRange('kp','kpv', v=>v.toFixed(2)) */
function bindRange(id,outId,f=v=>v,onchange){
  const el=$(id),out=$(outId);
  const upd=()=>{out.textContent=f(parseFloat(el.value));if(onchange)onchange(parseFloat(el.value))};
  el.addEventListener('input',upd);upd();return el;
}

/* Console log box. log(el,'text','ok'|'warn'|'err'|'info'|'dim', showTime) */
function makeLog(el,max=400){
  return function(text,cls='',time=true){
    const d=document.createElement('div');
    if(time){const t=document.createElement('span');t.className='t';t.textContent=new Date().toLocaleTimeString([], {hour12:false})+' ';d.appendChild(t)}
    const s=document.createElement('span');if(cls)s.className=cls;s.textContent=text;d.appendChild(s);
    el.appendChild(d);while(el.childElementCount>max)el.removeChild(el.firstChild);el.scrollTop=el.scrollHeight;
  };
}

/* Minimal multi-series scrolling line chart on a canvas.
   const c=new Chart(canvas,{series:[{name:'T',color:'#38bdf8'},...],window:600,yMin:0,yMax:100,yLabel:'°C'});
   c.push(x,[v1,v2,...]); c.draw(); */
class Chart{
  constructor(canvas,opt){
    this.c=canvas;this.ctx=canvas.getContext('2d');this.opt=Object.assign({window:600,yMin:null,yMax:null,yLabel:'',xLabel:'s',series:[],pad:{l:46,r:12,t:12,b:26}},opt);
    this.data=[];this._resize=()=>{const r=this.c.getBoundingClientRect(),dpr=window.devicePixelRatio||1;this.c.width=Math.round(r.width*dpr);this.c.height=Math.round(r.height*dpr);this.ctx.setTransform(dpr,0,0,dpr,0,0);this.w=r.width;this.h=r.height;this.draw()};
    window.addEventListener('resize',this._resize);this._resize();
  }
  clear(){this.data=[];this.draw()}
  push(x,vals){this.data.push([x,...vals]);const minX=x-this.opt.window;while(this.data.length&&this.data[0][0]<minX)this.data.shift()}
  draw(){
    const {ctx,w,h}=this,o=this.opt,p=o.pad;if(!w)return;
    ctx.clearRect(0,0,w,h);
    const n=o.series.length,d=this.data;
    let yMin=o.yMin,yMax=o.yMax;
    if(yMin===null||yMax===null){let lo=Infinity,hi=-Infinity;for(const r of d)for(let i=1;i<=n;i++){const v=r[i];if(v==null||!Number.isFinite(v)||o.series[i-1].hidden)continue;if(v<lo)lo=v;if(v>hi)hi=v}
      if(lo===Infinity){lo=0;hi=1}if(hi-lo<1e-9){hi=lo+1}const m=(hi-lo)*.1;if(yMin===null)yMin=lo-m;if(yMax===null)yMax=hi+m}
    const x1=Math.max(d.length?d[d.length-1][0]:0,o.window),x0=x1-o.window;
    const X=x=>p.l+(x-x0)/(x1-x0||1)*(w-p.l-p.r),Y=y=>p.t+(1-(y-yMin)/(yMax-yMin||1))*(h-p.t-p.b);
    ctx.strokeStyle='#1f2937';ctx.lineWidth=1;ctx.fillStyle='#64748b';ctx.font='11px system-ui,sans-serif';ctx.textAlign='right';ctx.textBaseline='middle';
    for(let i=0;i<=4;i++){const y=yMin+(yMax-yMin)*i/4,yy=Y(y);ctx.beginPath();ctx.moveTo(p.l,yy);ctx.lineTo(w-p.r,yy);ctx.stroke();ctx.fillText(fmt(y,Math.abs(yMax-yMin)<10?1:0),p.l-6,yy)}
    ctx.textAlign='center';ctx.textBaseline='top';
    for(let i=0;i<=4;i++){const x=x0+(x1-x0)*i/4,xx=X(x);ctx.beginPath();ctx.moveTo(xx,p.t);ctx.lineTo(xx,h-p.b);ctx.stroke();ctx.fillText(fmt(x,0)+o.xLabel,xx,h-p.b+6)}
    if(o.yLabel){ctx.save();ctx.translate(10,p.t);ctx.rotate(-Math.PI/2);ctx.textAlign='right';ctx.fillText(o.yLabel,0,0);ctx.restore()}
    for(let s=0;s<n;s++){const ser=o.series[s];if(ser.hidden)continue;ctx.strokeStyle=ser.color;ctx.lineWidth=ser.width||1.8;if(ser.dash)ctx.setLineDash(ser.dash);else ctx.setLineDash([]);ctx.beginPath();let started=false;
      for(const r of d){const v=r[s+1];if(v==null||!Number.isFinite(v)){started=false;continue}const xx=X(r[0]),yy=clamp(Y(v),p.t-2,h-p.b+2);if(!started){ctx.moveTo(xx,yy);started=true}else ctx.lineTo(xx,yy)}
      ctx.stroke()}
    ctx.setLineDash([]);
    /* legend */
    let lx=p.l+6;ctx.textAlign='left';ctx.textBaseline='top';ctx.font='12px system-ui,sans-serif';
    for(const ser of o.series){if(ser.hidden)continue;ctx.fillStyle=ser.color;ctx.fillRect(lx,p.t+4,12,3);ctx.fillStyle='#cbd5e1';ctx.fillText(ser.name,lx+16,p.t-1);lx+=ctx.measureText(ser.name).width+30}
  }
}

/* Step timing: run fn(dtSeconds) at a simulated rate with a speed multiplier. */
function makeLoop(step,draw,hz=50){
  let running=false,last=0,acc=0,raf=0;
  const dt=1/hz;
  function frame(t){
    if(!running)return;
    if(!last)last=t;let el=(t-last)/1000;last=t;if(el>0.25)el=0.25;
    acc+=el*(loop.speed||1);let n=0;
    while(acc>=dt&&n<2000){step(dt);acc-=dt;n++}
    draw();raf=requestAnimationFrame(frame);
  }
  const loop={speed:1,start(){if(running)return;running=true;last=0;raf=requestAnimationFrame(frame)},stop(){running=false;cancelAnimationFrame(raf)},get running(){return running},toggle(){running?loop.stop():loop.start()}};
  return loop;
}
