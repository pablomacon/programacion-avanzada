(function () {
  "use strict";

  var api = null;
  var initialized = false;
  var finished = false;

  function findAPI(win) {
    var tries = 0;
    while (win && tries < 20) {
      try {
        if (win.API) return win.API;
      } catch (e) {}
      if (win.parent === win) break;
      win = win.parent;
      tries++;
    }
    try {
      if (window.opener) {
        win = window.opener;
        tries = 0;
        while (win && tries < 20) {
          try {
            if (win.API) return win.API;
          } catch (e) {}
          if (win.parent === win) break;
          win = win.parent;
          tries++;
        }
      }
    } catch (e) {}
    return null;
  }

  function initialize() {
    api = findAPI(window);
    if (!api) return false;
    try {
      var result = api.LMSInitialize("");
      initialized = (result === "true" || result === true);
      if (initialized) {
        var status = api.LMSGetValue("cmi.core.lesson_status");
        if (!status || status === "not attempted") {
          api.LMSSetValue("cmi.core.lesson_status", "incomplete");
        }
        var loc = api.LMSGetValue("cmi.core.lesson_location");
        if (loc && loc.charAt(0) === "#") {
          setTimeout(function () {
            var el = document.querySelector(loc);
            if (el) el.scrollIntoView({behavior:"auto", block:"start"});
          }, 100);
        }
        api.LMSCommit("");
      }
    } catch (e) {}
    return initialized;
  }

  function saveLocation() {
    if (!initialized || !api) return;
    try {
      var sections = document.querySelectorAll("section[id]");
      var current = "";
      for (var i = 0; i < sections.length; i++) {
        var r = sections[i].getBoundingClientRect();
        if (r.top <= 120) current = "#" + sections[i].id;
      }
      if (current) api.LMSSetValue("cmi.core.lesson_location", current);
    } catch (e) {}
  }

  function markComplete() {
    var pill = document.getElementById("scormProgress");
    var text = document.getElementById("scormProgressText");
    if (pill) pill.classList.add("completed");
    if (text) text.textContent = "Material recorrido";

    if (!initialized || !api) return;
    try {
      api.LMSSetValue("cmi.core.lesson_status", "completed");
      api.LMSSetValue("cmi.core.lesson_location", "#final");
      api.LMSCommit("");
    } catch (e) {}
  }

  function onScroll() {
    saveLocation();
    var doc = document.documentElement;
    var height = Math.max(doc.scrollHeight - window.innerHeight, 1);
    var ratio = window.scrollY / height;
    if (ratio >= 0.94) markComplete();
  }

  function finish() {
    if (finished) return;
    finished = true;
    if (initialized && api) {
      try {
        saveLocation();
        api.LMSCommit("");
        api.LMSFinish("");
      } catch (e) {}
    }
  }

  initialize();
  window.addEventListener("scroll", onScroll, {passive:true});
  window.addEventListener("pagehide", finish);
  window.addEventListener("beforeunload", finish);
})();