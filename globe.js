import createGlobe from 'https://unpkg.com/cobe@0.6.3/dist/cobe.esm.js';

    const canvas  = document.getElementById('globe-canvas');
    const wrap    = document.getElementById('wrap');
    const loader  = document.getElementById('loader');
    const btn     = document.getElementById('toggle');
    const icon    = btn.querySelector('i');
    const label   = btn.querySelector('span');

    /* size */
    const DPR = Math.min(2, window.devicePixelRatio || 1);
    let sizePx;
    function resize(){
      const w = wrap.clientWidth;
      sizePx = w * DPR;
      canvas.width  = sizePx;
      canvas.height = sizePx;
      canvas.style.width = canvas.style.height = w+'px';
      globe?.resize(sizePx,sizePx);
    }
    window.addEventListener('resize', resize);

    /* rotation state */
    let phi=0, theta=0.3, tPhi=0, tTheta=0.3;
    const speed=0.005;
    let pointer=false, sx=0, sy=0, sPhi=0, sTheta=0;

    /* motion pref */
    const autoStart = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    let autoRotate = autoStart;

    /* create globe */
    resize();
    const globe = createGlobe(canvas,{
      devicePixelRatio:DPR, width:sizePx, height:sizePx,
      phi:0, theta:0,
      dark:matchMedia('(prefers-color-scheme: dark)').matches?1:0,
      diffuse:1.2, mapSamples:16000, mapBrightness:6,
      baseColor:[0.3,0.3,0.3], markerColor:[1,0.5,1], glowColor:[1,1,1],
      markers:[
        {location:[40.71,-74.0],size:0.05},
        {location:[51.5,-0.1],size:0.05},
        {location:[35.68,139.65],size:0.05},
        {location:[-33.86,151.21],size:0.05}
      ],
      onRender:(s)=>{
        if(autoRotate&&!pointer) tPhi += speed;
        phi   += (tPhi   - phi  )*0.08;
        theta += (tTheta - theta)*0.08;
        s.phi=phi; s.theta=theta;
      }
    });
    /* hide loader */
    wrap.classList.add('loaded');

    /* pointer controls */
    canvas.addEventListener('pointerdown',e=>{
      pointer=true;
      sx=e.clientX; sy=e.clientY; sPhi=tPhi; sTheta=tTheta;
      canvas.setPointerCapture(e.pointerId); canvas.style.cursor='grabbing';
    });
    canvas.addEventListener('pointermove',e=>{
      if(!pointer)return;
      const dx=(e.clientX-sx)/canvas.clientWidth;
      const dy=(e.clientY-sy)/canvas.clientHeight;
      tPhi   = sPhi   + dx*Math.PI*2;
      tTheta = Math.max(-Math.PI/2, Math.min(Math.PI/2, sTheta+dy*Math.PI));
    });
    ['pointerup','pointerleave','pointercancel'].forEach(ev=>{
      canvas.addEventListener(ev,()=>{pointer=false;canvas.style.cursor='grab'});});

    /* keyboard */
    canvas.addEventListener('keydown',e=>{
      const step=0.25;
      switch(e.key){
        case'ArrowLeft':  tPhi-=step;break;
        case'ArrowRight': tPhi+=step;break;
        case'ArrowUp':    tTheta=Math.max(-Math.PI/2,tTheta-step);break;
        case'ArrowDown':  tTheta=Math.min( Math.PI/2,tTheta+step);break;
        case' ':
        case'Enter': toggle();break;
        default:return;
      }
      e.preventDefault();
    });

    /* toggle */
    function toggle(){
      autoRotate=!autoRotate;
      icon.className = autoRotate?'fas fa-pause':'fas fa-play';
      label.textContent = autoRotate?'Pause Rotation':'Resume Rotation';
    }
    btn.addEventListener('click',toggle);
    toggle(); /* set initial icon/label */