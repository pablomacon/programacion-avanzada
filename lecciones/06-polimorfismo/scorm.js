(function(){
  "use strict";
  var api=null, initialized=false, finished=false;
  function findAPI(win){
    var t=0;
    while(win && t<20){
      try{ if(win.API) return win.API; }catch(e){}
      if(win.parent===win) break;
      win=win.parent; t++;
    }
    try{
      if(window.opener){
        win=window.opener; t=0;
        while(win && t<20){
          try{ if(win.API) return win.API; }catch(e){}
          if(win.parent===win) break;
          win=win.parent; t++;
        }
      }
    }catch(e){}
    return null;
  }
  function init(){
    api=findAPI(window);
    if(!api) return false;
    try{
      var r=api.LMSInitialize("");
      initialized=(r==="true" || r===true);
      if(initialized){
        var s=api.LMSGetValue("cmi.core.lesson_status");
        if(!s || s==="not attempted") api.LMSSetValue("cmi.core.lesson_status","incomplete");
        var l=api.LMSGetValue("cmi.core.lesson_location");
        if(l && l.charAt(0)==="#"){
          setTimeout(function(){
            var el=document.querySelector(l);
            if(el) el.scrollIntoView({behavior:"auto",block:"start"});
          },100);
        }
        api.LMSCommit("");
      }
    }catch(e){}
    return initialized;
  }
  function save(){
    if(!initialized || !api) return;
    try{
      var ss=document.querySelectorAll("section[id]"), cur="";
      for(var i=0;i<ss.length;i++){
        if(ss[i].getBoundingClientRect().top<=120) cur="#"+ss[i].id;
      }
      if(cur) api.LMSSetValue("cmi.core.lesson_location",cur);
    }catch(e){}
  }
  function complete(){
    var d=document.getElementById("scormDot"), t=document.getElementById("scormProgressText");
    if(d) d.style.background="#00a99d";
    if(t) t.textContent="Material recorrido";
    if(!initialized || !api) return;
    try{
      api.LMSSetValue("cmi.core.lesson_status","completed");
      api.LMSSetValue("cmi.core.lesson_location","#cierre");
      api.LMSCommit("");
    }catch(e){}
  }
  function onscroll(){
    save();
    var doc=document.documentElement, total=Math.max(doc.scrollHeight-window.innerHeight,1);
    if(window.scrollY/total>=0.94) complete();
  }
  function finish(){
    if(finished) return; finished=true;
    if(initialized && api){
      try{ save(); api.LMSCommit(""); api.LMSFinish(""); }catch(e){}
    }
  }
  init();
  window.addEventListener("scroll",onscroll,{passive:true});
  window.addEventListener("pagehide",finish);
  window.addEventListener("beforeunload",finish);
})();
