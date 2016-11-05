domReady (function(){
    var bSwitch = false;
    (function(){
        var aFloats = getClassName(document,'floats')[0];
        var aAlert = getClassName(document,'alert')[0];
        var aAlertBtn = getClassName(document,'alert_btn')[0];
        addEVent(aAlertBtn,'click',function(){
            aFloats.style.display = 'none';
            aAlert.style.display = 'none';
        });
    })();
    (function(){
        var aComn = getClassName(document,'common1');
        for (var i=0;i<aComn.length;i++){
            var aMyPho = getClassName(aComn[i],'myPhoto')[0];
            var aMyName = getClassName(aComn[i],'myName')[0];
            var aTap5 = getClassName(aComn[i],'tap_5')[0];
            var aTap6 = getClassName(aComn[i],'tap_6')[0];
            var aTap7 = getClassName(aComn[i],'tap_7')[0];
            var aTap8 = getClassName(aComn[i],'tap_8')[0];

            move(aMyPho,{left:21,top:10},{duration:2500});
            move(aMyName,{left:80,top:140,opacity:1},{duration:900,easing:'ease-out'});
            move(aTap5,{left:20,top:190,opacity:1},{duration:1000});
            move(aTap6,{left:20,top:230,opacity:1},{duration:1500});
            move(aTap7,{left:20,top:270,opacity:1},{duration:2000});
            move(aTap8,{left:20,top:310,opacity:1},{duration:2500});
        }
    })();
    (function(){
        var oBtn = document.getElementById('control_ul');
        var aLi = oBtn.getElementsByTagName('li');
        var otvScreen = document.getElementById('tvScreen');

        for (var i=0;i<aLi.length;i++){
            aLi[i].index = i;
            addEVent(aLi[i],'click',function(){
                if(!bSwitch){
                    for (var j=0;j<aLi.length;j++){
                        removeClass(aLi[j],'control_active');
                        removeClass(otvScreen.children[j],'show');
                        addClass(otvScreen.children[j],'hidden');
                    }
                    addClass(this,'control_active');
                    removeClass(otvScreen.children[this.index],'hidden');
                    addClass(otvScreen.children[this.index],'show');
                }
            });
        }
    })();
    (function(){
        var oBox = document.getElementById('screenSwitch');
        var oImg = oBox.getElementsByTagName('img')[0];
        var iNow = 0;
        var timer = null;

        var oViewAlert = document.getElementById('view_alert');
        var aViewT = getClassName(oViewAlert,'viewAlert_top')[0];
        var aViewB = getClassName(oViewAlert,'viewAlert_bottom')[0];
        var aViewAlert = getClassName(document,'view_alert')[0];
        var onOff = false;

        function start(){
            timer = setInterval(function(){
                iNow++;
                oImg.src = 'images/btnSport'+'0'+(iNow%3+1)+'.png';
            },100);
        }
        start();
        addEVent(oBox,'mouseenter',function(){
            oBox.style.animationPlayState = 'paused';
        });
        addEVent(oBox,'mouseleave',function(){
            oBox.style.animationPlayState = 'running';
        });
        addEVent(oBox,'click',function(){
            bSwitch = !bSwitch;
            clearInterval(timer);
            var n = 0;
            timer = setInterval(function(){
                n++;
                oImg.src = 'images/btnSport'+'fight0'+((n%4)+1)+'.png';
                if( n==12 ){
                    clearInterval(timer);
                    start();
                }
            },30);
            if(!onOff){
                removeClass(aViewAlert,'hidden');
                addClass(aViewAlert,'show');
                addClass(aViewAlert,'viewBackrgound');

                move(aViewT,{top:0,opacity:1},{duration:1500});
                move(aViewB,{top:214,opacity:1},{duration:1500});
                onOff = true
            } else {
                removeClass(aViewAlert,'show');
                addClass(aViewAlert,'hidden');
                removeClass(aViewAlert,'viewBackrgound');

                move(aViewT,{top:-214,opacity:0},{duration:1500});
                move(aViewB,{top:440,opacity:0},{duration:1500});
                onOff = false;
            }
        });

    })();
    (function(){
        var oDial=document.getElementById("dial");
        var oHour=document.getElementById("hour");
        var oMin=document.getElementById("min");
        var oSec=document.getElementById("sec");
        toDial(oDial);
        toTime(oHour,oMin,oSec);
        setInterval(function(){
            toTime(oHour,oMin,oSec);
        },1000);

        function toTime(oHour,oMin,oSec) {
            var oDate=new Date();
            var iSec=oDate.getSeconds();
            var iMin=oDate.getMinutes()+iSec/60;
            var iHour=(oDate.getHours()%12)+iMin/60;
            if(window.navigator.userAgent.indexOf('Firefox') != -1){
                oSec.style.MozTransform="rotate("+(iSec*360/60)+"deg)";
                oMin.style.MozTransform="rotate("+(iMin*360/60)+"deg)";
                oHour.style.MozTransform="rotate("+(iHour*360/12)+"deg)";
            } else {
                oSec.style.WebkitTransform="rotate("+(iSec*360/60)+"deg)";
                oMin.style.WebkitTransform="rotate("+(iMin*360/60)+"deg)";
                oHour.style.WebkitTransform="rotate("+(iHour*360/12)+"deg)";
            }

        }
        function toDial(obj) {
            var sHtml="";
            var iDeg=6;
            for(var i=0;i<60;i++){
                if(window.navigator.userAgent.indexOf('Firefox') != -1){
                    sHtml+="<span style='-moz-transform:rotate("+iDeg*i+"deg)'></span>"
                }else {
                    sHtml+="<span style='-webkit-transform:rotate("+iDeg*i+"deg)'></span>"
                }
            }
            obj.innerHTML=sHtml;
        }

    })();
    (function(){
        var oBox=document.getElementById('clock');
        addEVent(oBox,'dblclick',function(ev){
            var oEvent = ev || event;
            var disX=oEvent.clientX-oBox.offsetLeft;
            var disY=oEvent.clientY-oBox.offsetTop;
            var newDiv=document.createElement('div');
            newDiv.className='box';
            newDiv.style.left=oBox.offsetLeft-5+'px';
            newDiv.style.top=oBox.offsetTop-5+'px';
            oBox.parentNode.appendChild(newDiv);
            document.onmousemove=function(ev){
                var oEvent=ev||event;
                var l=oEvent.clientX-disX;
                var t=oEvent.clientY-disY;
                newDiv.style.left=l+'px';
                newDiv.style.top=t+'px';
            };
            document.onmouseup=function(){
                document.onmousemove=null;
                document.onmouseup=null;
                oBox.style.left=newDiv.offsetLeft+5+'px';
                oBox.style.top=newDiv.offsetTop+5+'px';
                oBox.parentNode.removeChild(newDiv);
                oBox.releaseCapture && oBox.releaseCapture();
            };
            oBox.setCapture && oBox.setCapture();
            return false;
        });
    })();
    (function(){
        var aMyPhoto = getClassName(document,'myPhoto_outer');
        for (var i=0;i<aMyPhoto.length;i++){
            addEVent(aMyPhoto[i],'mouseenter',function(){
                for (var j=0;j<aMyPhoto.length;j++){
                    //addClass(aMyPhoto[j],'hidden');
                    move(aMyPhoto[j],{opacity:0},{duration:1500});
                }
            });
        }
    })();
    (function(){
        var oAuto = document.getElementById('lg_audio');
        var aPlay = getClassName(oAuto,'lg_audio_play')[0];
        var aPause = getClassName(oAuto,'lg_audio_pause')[0];
        var oSource = document.getElementById('lg_audio-source');
        var bStart = true;
        addEVent(oAuto,'click',function(){
            if (bStart){
                removeClass(aPause,'hidden');
                addClass(aPause,'show');

                removeClass(aPlay,'show');
                addClass(aPlay,'hidden');
                oSource.pause();
                bStart = false;
            } else {
                removeClass(aPause,'show');
                addClass(aPause,'hidden');

                removeClass(aPlay,'hidden');
                addClass(aPlay,'show');
                oSource.play();
                oSource.loop = 'loop';

                bStart = true;
            }
        })
    })();
});