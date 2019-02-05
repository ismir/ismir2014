var Message={ 
set: function() {//最小化與恢復狀態切換 
var set=this.minbtn.status == 1?[0,1,'block',this.char[0],"minimize"]:[1,0,'none',this.char[1],"restore"]; 
this.minbtn.status=set[0]; 
this.win.style.borderBottomWidth=set[1]; 
this.content.style.display =set[2]; 
this.minbtn.innerHTML =set[3] 
this.minbtn.title = set[4]; 
this.win.style.top = this.getY().top; 
}, 
close: function() {//關閉 
this.win.style.display = 'none'; 
window.onscroll = null; 
}, 
setOpacity: function(x) {//設置透明度 
var v = x >= 100 ? '': 'Alpha(opacity=' + x + ')'; 
this.win.style.visibility = x<=0?'hidden':'visible';//IE有絕對或相對定位內容不隨父透明度變化的bug 
this.win.style.filter = v; 
this.win.style.opacity = x / 100; 
}, 
show: function() {//漸顯 
clearInterval(this.timer2); 
var me = this,fx = this.fx(0, 100, 0.1),t = 0; 
this.timer2 = setInterval(function() { 
t = fx(); 
me.setOpacity(t[0]); 
if (t[1] == 0) {clearInterval(me.timer2) } 
},6);//10 to 6 
}, 
fx: function(a, b, c) {//緩衝計算 
var cMath = Math[(a - b) > 0 ? "floor": "ceil"],c = c || 0.1; 
return function() {return [a += cMath((b - a) * c), a - b]} 
}, 
getY: function() {//計算移動坐標 
var d = document,b = document.body, e = document.documentElement; 
var s = Math.max(b.scrollTop, e.scrollTop); 
var h = /BackCompat/i.test(document.compatMode)?b.clientHeight:e.clientHeight; 
var h2 = this.win.offsetHeight; 
return {foot: s + h + h2 + 2+'px',top: s + h - h2 - 2+'px'} 
}, 
moveTo: function(y) {//移動動畫 
clearInterval(this.timer); 
var me = this,a = parseInt(this.win.style.top)||0; 
var fx = this.fx(a, parseInt(y)); 
var t = 0 ; 
this.timer = setInterval(function() { 
t = fx(); 
me.win.style.top = t[0]+'px'; 
if (t[1] == 0) { 
clearInterval(me.timer); 
me.bind(); 
} 
},6);//10 to 6 
}, 
bind:function (){//綁定窗口滾動條與大小變化事件 
var me=this,st,rt; 
window.onscroll = function() { 
clearTimeout(st); 
clearTimeout(me.timer2); 
me.setOpacity(0); 
st = setTimeout(function() { 
me.win.style.top = me.getY().top; 
me.show(); 
},100);//600 mod 100 
}; 
window.onresize = function (){ 
clearTimeout(rt); 
rt = setTimeout(function() {me.win.style.top = me.getY().top},100); 
} 
}, 
init: function() {//創建HTML 
function $(id) {return document.getElementById(id)}; 
this.win=$('msg_win'); 
var set={minbtn: 'msg_min',closebtn: 'msg_close',title: 'msg_title',content: 'msg_content'}; 
for (var Id in set) {this[Id] = $(set[Id])}; 
var me = this; 
this.minbtn.onclick = function() {me.set();this.blur()}; 
this.closebtn.onclick = function() {me.close()}; 
this.char=navigator.userAgent.toLowerCase().indexOf('firefox')+1?['-','::','*']:['-',' ','*'];//FF不支持webdings字體 
this.minbtn.innerHTML=this.char[0]; 
this.closebtn.innerHTML=this.char[2]; 
setTimeout(function() {//初始化最先位置 
me.win.style.display = 'block'; 
me.win.style.top = me.getY().foot; 
me.moveTo(me.getY().top); 
},0); 
return this; 
} 
}; 
Message.init();
