var ddequalcolumns=new Object()
ddequalcolumns.columnswatch=["m_right_bottom","right_cont_b"]
ddequalcolumns.setHeights=function(reset){var tallest=0
var resetit=(typeof reset=="string")?true:false
for(var i=0;i<this.columnswatch.length;i++){if(document.getElementById(this.columnswatch[i])!=null){if(resetit)
document.getElementById(this.columnswatch[i]).style.height="auto"
if(document.getElementById(this.columnswatch[i]).offsetHeight>tallest)
tallest=document.getElementById(this.columnswatch[i]).offsetHeight}}
if(tallest>0){for(var i=0;i<this.columnswatch.length;i++){if(document.getElementById(this.columnswatch[i])!=null)
document.getElementById(this.columnswatch[i]).style.height=tallest+"px"}}}
ddequalcolumns.resetHeights=function(){this.setHeights("reset")}
ddequalcolumns.dotask=function(target,functionref,tasktype){var tasktype=(window.addEventListener)?tasktype:"on"+tasktype
if(target.addEventListener)
target.addEventListener(tasktype,functionref,false)
else if(target.attachEvent)
target.attachEvent(tasktype,functionref)}
ddequalcolumns.dotask(window,function(){ddequalcolumns.setHeights()},"load")
ddequalcolumns.dotask(window,function(){if(typeof ddequalcolumns.timer!="undefined")clearTimeout(ddequalcolumns.timer);ddequalcolumns.timer=setTimeout("ddequalcolumns.resetHeights()",200)},"resize")