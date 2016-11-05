//兼容获取非行间样式
function getStyle(obj,name){
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name];
}
//生成随机数(n下限,m上限)
function rnd(n,m){
	return parseInt(Math.random()*(m-n)+n)
}
//在数组中查重
function findInArr(num,arr){
	for(var i=0;i<arr.length;i++){
		if(arr[i] == num){
			return true;
        }
    }
    return false;
}
//补零函数
function toDou(n){
    return n<10? '0'+n : ''+n;
}
//某个对象添加Class
console.log('hello,我是李健,谢谢大家观看本简历,目前本人正在求一份工作。本站使用HTML+CSS3+原生JS完成');
function addClass(obj,ClassName){
    if(obj.className == ''){
        obj.className = ClassName;
    } else{
        var arrClassName = obj.className.split(' ');
        var _index = arrIndexof(arrClassName,ClassName);
        if(_index == -1){
            obj.className += ' '+ ClassName;
        }
    }
}
//某个对象移除Class
function removeClass(obj,ClassName){
    if(obj.className != ''){
        var arrClassName = obj.className.split(' ');
        var _index = arrIndexof(arrClassName,ClassName);
        if( _index != -1 ){
            arrClassName.splice(_index,1);
            obj.className = arrClassName.join(' ');
        }
    }
}
//在当前class数组中查找是否存在
function arrIndexof(arr,v){
    for(var i=0;i<arr.length;i++){
     	if(arr[i] == v){
        	return i;
        }
    }
    return -1;
}
//通过className获取元素(parent父级,ClassName要获取的class名称)
function getClassName(parent,ClassName){
    if (document.getElementsByClassName){
        return parent.getElementsByClassName(ClassName);
    } else {
        var aEls = parent.getElementsByTagName('*');
        var arr = [];
        for (var i=0;i<aEls.length;i++){
        	var aClassName = aEls[i].className.split(' ');
        	for(var k=0;k<aClassName.length;k++){
                if (aClassName[k] == ClassName){
                    arr.push(aEls[i]);
                }
            }
    	}
   	 return arr;
	}
}
//获取一个字符串字节长度(str为要获取的字符串,type为'gbk''gb2312')
function getByLen(str,type){
    var len = 0;
    for (var i=0;i<str.length;i++){
        if(str.charAt(i)>='\u4e00' && str.charAt(i)<='\u9fa5'){
            if(type == 'gbk' || type == 'gb2312'){
                len+=2;
            } else {
                len+=3;
            }
        } else {
            len++;
        }
    }
    return len;
}
//获取元素到页面的绝对距离(无论有没有，有多少定位父级)
function getPos(obj){
    var x = 0;
    var y = 0;
    while (obj){
        x += obj.offsetLeft;
        y += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return {left:x,top:y};
}
//事件绑定
function addEVent(obj,oEvn,fn){
	if (obj.addEventListener) {
		obj.addEventListener(oEvn,fn, false);
	} else{
		obj.attachEvent('on' + oEvn,function(){
			fn.call(obj);
		});
	}
}
//解除事件绑定(无法解除匿名函数)
function removeEvent(obj,oEvn,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(oEvn, fn, false);
	}else{
		obj.detachEvent('on' + oEvn,function(){
			fn.call(obj);
		});
	}
}
//鼠标滚轮事件
function addWheel(obj,fn){
    if (window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
        obj.addEventListener('DOMMouseScroll',wheel,false);

    } else {
        addEvent(obj,'mousewheel',wheel)
    }
    function  wheel(ev){
        var oEvent = ev || event;
        var bDown = true;//假设鼠标向下滚动为true
        if(oEvent.wheelDelta){
            if(oEvent.wheelDelta > 0){//Chrome、IE系列
                bDown = false;//向下
            } else {
                bDown = true;//向上
            }
        } else {
            if(oEvent.detail < 0 ){//FF
                bDown = false;//向上
            } else {
                bDown = true;//向下
            }
        }
        fn && fn(bDown);
        oEvent.preventDefault && oEvent.preventDefault();
        return false;
    }
}
//domReady(替代window.onload)
function domReady(fn){
    if(document.addEventListener){
        document.addEventListener('DOMContentLoaded',function(){//高版本浏览器
            fn&&fn();
        },false);
    }else {
        document.onreadystatechange = function(){
            if (document.readyState == 'complete'){
                fn&&fn();
            }
        }
    }
}