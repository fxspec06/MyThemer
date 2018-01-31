appinfo = {}
enyo.fetchAppInfo = function(){return appinfo}
$.getJSON("appinfo.json", function(d) {console.log(appinfo=d)});