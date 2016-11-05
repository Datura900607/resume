domReady(function(){
    (function(){
        var aStarFace = getClassName(document,'starFace')[0];
        var str = '';
        var n = 0;
        var timer = null;
        var aSpa = aStarFace.getElementsByTagName('span');
        var oDate = new Date();
        var oHours = oDate.getHours();

        if(oHours>=0 && oHours<8){
            str = '现在是0-8点';
        } else if(oHours>=8 && oHours<12){
            str = '现在是8-12点';
        } else if(oHours>=12 && oHours<18){
            str = '现在是12-18点';
        } else if(oHours>=18 && oHours<22){
            str = '现在是18-22点';
        } else if(oHours>=22 && oHours<24){
            str = '现在是22-24点';
        }
        for (var i=0;i<str.length;i++){
            var aSpan = document.createElement('span');
            aSpan.innerHTML = str.charAt(i);
            aSpan.style.opacity = 0;
            aStarFace.appendChild(aSpan);
        }
        timer = setInterval(function () {
            move(aSpa[n],{opacity:1});
            n++;
            if(n == str.length){
                clearInterval(timer);
            }
        },500);
        var oBtnFace = document.getElementById('btnStarFace');
        var oFace = getClassName(document,'face_wrapper')[0];

        var oQues = document.getElementById('questions');
        var aQuesList = getClassName(oQues,'questions_list');

        addEVent(oBtnFace,'click',function(){
            move(oFace,{left:700});
            aStarFace.style.display = 'none';
            this.style.display = 'none';

            move(oQues,{display:"block",opacity:1},{duration:500,complete:function(){
                move(aQuesList[0],{left:0,top:0,opacity:1});
                move(aQuesList[1],{left:60,top:60,opacity:1});
                move(aQuesList[2],{opacity:1});
                move(aQuesList[3],{left:60,top:180,opacity:1});
                move(aQuesList[4],{left:0,top:240,opacity:1});
            }});

        });
        var aQuesView = getClassName(document,'question_view')[0];
        addEVent(oBtnFace,'click',function(){
            aQuesView.style.display = 'block';
            aQuesView.style.fontSize = '20px';

            move(aQuesView,{top:10},{duration:3000});
        });
        for (var j=0;j<aQuesList.length;j++){
            aQuesList[j].index = j;
            addEVent(aQuesList[j],'mouseenter',function(){
                for (var k=0;k<aQuesList.length;k++){
                    aQuesList[k].style.border = '';
                    removeClass(aQuesList[k],'active');
                }
                this.style.border = '1px solid #52b8e0';
                addClass(aQuesList[this.index],'active');
            });
        }
    })();
    (function(){
        var aQuesView = getClassName(document,'question_view')[0];
        var aAnsView = getClassName(document,'answer_view')[0];
        var oQues = document.getElementById('questions');
        var aQuesList = getClassName(oQues,'questions_list');
        var arrAns = [' 你好,我是李健。毕业于沈阳理工大学，开始从事的是硬件开发，工作开始接触前端开发。从"咸鱼"到"犀牛"才越发觉得前端的魅力，就是那种每次完成页面之后的成就感，现在只想安静的做一个小前端',' 因为我发现前端写的代码，在浏览器上立马就能显现，而且还能展现超炫的选过。非常有成就感web才是我的兴趣所在既然喜欢，那就做下去.',' 我觉得前端程序员，首先是程序员前端的知识深度和广度都很重要每次翻看javascript权威指南都有不同的收获，学习的过程总结一句话就是生活索然无味,直到你的出现当然不做IE兼容的生活更美',' 我的不足是：非计算机专业导致很多非前端范畴的专业名词似懂非懂，改进ing!我的优势是：非计算机专业不知者无畏，限制少了就敢想了，如果你希望时不时有所惊喜，那么果断招募我啊','晒着太阳吹着风陪一群单身狗敲代码。。。当然，先接受我的入队申请'];
        var strA = '';
        var m = 0;
        var timer = null;
        var aSpaA = aAnsView.getElementsByTagName('span');
        for (var j=0;j<aQuesList.length;j++){
            addEVent(aQuesList[j],'click',function(){
                for (var l=0;l<aQuesList.length;l++){
                    aQuesList[l].style.background = '#52b8e0';
                }
                aQuesList[this.index].style.background = 'rgba(142,252,0,.5)';
                strA = arrAns[this.index];
                m = 0;
                aAnsView.innerHTML = '';
                aQuesView.style.display = 'none';
                aAnsView.style.display = 'block';

                for (var i=0;i<strA.length;i++){
                    var aSpan = document.createElement('span');
                    aSpan.innerHTML = strA.charAt(i);
                    aSpan.style.opacity = 0;
                    aAnsView.appendChild(aSpan);
                }
                timer = setInterval(function () {
                    move(aSpaA[m],{opacity:1});
                    m++;
                    if(m == strA.length){
                        clearInterval(timer);
                    }
                },500);
            });
        }

    })();
});