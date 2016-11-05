function getStyle(obj,name){
    return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name];
}
function move(obj,json,opition){
    clearInterval(obj.timer);

    opition = opition || {};
    //运动过程所需时间
    opition.duration = opition.duration || '1000';
    //运动形式
    opition.easing = opition.easing || 'linear';
    //初始值
    var start = {};
    //总距离，目标距离
    var dis = {};
    //将json里的初始值和总距离，分别存放到start和dis里
    for (var name in json){
        start[name] = parseFloat(getStyle(obj,name));
        dis[name] = json[name] - start[name];
    }
    //计算运动所需的总次数
    var count = Math.floor(opition.duration/30);
    //设置从第0步开始
    var n = 0;
    //开始循环每一步
    obj.timer = setInterval(function() {
        //步数++
        n++;
        //判断运动形式
        for (var name in json) {
            switch(opition.easing){
                case 'linear':
                    var a = n/count;
                    var cur = dis[name]*a;break;
                case 'ease-in':
                    var a = n/count;
                    var cur = dis[name]*a*a*a;break;
                case 'ease-out':
                    var a = 1-n/count;
                    //alert(1-a*a*a);
                    var cur = dis[name]*(1-a*a*a);break;
            }
            if(name == 'opacity'){

                obj.style.opacity = start[name] + cur;
                obj.style.filter = 'alpha(opacity:'+ (start[name] + cur )*100 +')';

            } else if(name == 'background'){
                obj.style.background = json[name];
            }else if(name == 'display'){
                obj.style.display = json[name];
            }else{
                obj.style[name] = start[name] + cur +'px';
            }
            //当运动步数等于总步数时，停止运动
            if(n == count) {
                clearInterval(obj.timer);
                opition.complete && opition.complete();
            }
        }

    },30)
}