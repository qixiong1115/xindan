/* 
* @Author: Marte
* @Date:   2019-02-15 16:27:30
* @Last Modified by:   Marte
* @Last Modified time: 2019-02-18 11:59:18
*/

$(function(){
    //轮播图
    var s1 = new Swiper('#swiper-container',{
        autoplay : {//自动轮播
            delay : 2000,//间隔时间
            disableOnInteraction:false
        },
        loop : true,//无缝
        pagination: {//焦点跟随
            el: '.swiper-pagination',
            clickable: true,//点击焦点跳到指定图片
            renderBullet: function(index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';//生成焦点数字
            }
        },
        mousewheel:false//滚动滑轮可以切图
    });
    
    var oBox=document.getElementById('swiper-container');
    
    oBox.onmouseover=function(){//鼠标经过停止
        s1.autoplay.stop();
    }
    
    oBox.onmouseout=function(){//鼠标经过离开
        s1.autoplay.start();
    }
    
    var iW=($(".timelimit_b_slide ul li").width()+18*2)*4;

    $(".timelimit_b .prev").click(function(){
        clearInterval(timer);
        $(".timelimit_b_slide").animate({left: '0px'}, "slow");
        timer=setInterval(timerFn,5000);
    });
    $(".timelimit_b .next").click(function(){
        clearInterval(timer);
        $(".timelimit_b_slide").animate({left: -iW+'px'}, "slow");
        timer=setInterval(timerFn,5000);
    });
    var timerSwitch=true
    var timer=null;
    timer=setInterval(timerFn,5000);
    function timerFn(){
        if(timerSwitch){
            $(".timelimit_b_slide").animate({left: -iW+'px'}, "slow");
        }else{
            $(".timelimit_b_slide").animate({left: '0px'}, "slow");
        }
        timerSwitch=!timerSwitch;
    }

    // console.log(setTime(11111))
    // 倒计时
    var startTime=new Date('2019-02-19 11:30:00');

    function trim(){
        var newTime=new Date();
        var differTime=parseInt((startTime-newTime)/1000);
        var arr=setTime(differTime);
        var str=`剩余时间：<span>${arr.hours}</span>：<span>${arr.mins}</span>：<span>${arr.secs}</span>`;

        // console.log(setTime(differTime));
        $(".timelimit_t p").html(str)
    }
    trim();
    setInterval(trim,1000);


    //热卖区
    var topNum=1;
    var divIw=($(".ready_sale_l .bottom li").width()+40)*4;
    $(".ready_sale_l .top a").on('click',function(){
        topNum = topNum++ > $(".ready_sale_l .bottom ul").size()-1 ? 1 : topNum;
        // console.log(topNum);
        $(".ready_sale_l .bottom div div").animate({left: -(divIw*(topNum-1))+'px'}, "slow");
    })

    setInterval(Selling,5000);
    var sellingNum=0;
    function Selling(){
        sellingNum = sellingNum++ < $(".ready_sale_r .bottom li").size()-1 ? sellingNum : 0;
        // console.log(sellingNum)
        $(".ready_sale_r .bottom li").eq(sellingNum-1).animate({opacity:0});
        $(".ready_sale_r .bottom li").eq(sellingNum).animate({opacity:1});
    }
    

    $("#good_review .bottom li").on('mouseover',function(){
        $("#good_review .bottom li").attr('class','');
        $(this).attr('class','active');

        for(var i=0; i<$("#good_review .bottom li").size(); i++){
            $("#good_review .bottom li:eq("+i+")>div").eq(0).css('display','none');
            $("#good_review .bottom li:eq("+i+")>div").eq(1).css('display','block');
        }

        $(this).children().eq(0).css('display','block');
        $(this).children().eq(1).css('display','none');

    });

    $(".interested_l .top li").on('mouseover',function(){
        $(".interested_l .top li").attr('class','');
        $(this).attr('class','interested_active');
        
        $(".interested_l .bottom>li").css('display','none');
        $(".interested_l .bottom>li").eq($(this).index()).css('display','block');
    });



    var s2 = new Swiper('#swiper-container2',{
        autoplay : {//自动轮播
            delay : 2000,//间隔时间
            disableOnInteraction:false
        },
        loop : true,//无缝
        pagination: {//焦点跟随
            el: '.swiper-pagination',
            clickable: true,//点击焦点跳到指定图片
            renderBullet: function(index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';//生成焦点数字
            }
        },
        mousewheel:false//滚动滑轮可以切图
    });
    
    var oBox2=document.getElementById('swiper-container2');
    
    oBox2.onmouseover=function(){//鼠标经过停止
        s2.autoplay.stop();
    }
    oBox2.onmouseout=function(){//鼠标经过停止
        s2.autoplay.start();
    }

    $(".electronic_one a").on('mouseover',function(){
        console.log(123)
        $(".electronic_one a").attr('class','');
        $(this).attr('class','active');

        $(".electronic_tow").css('display','none');
        $(".electronic_tow").eq($(this).index()).css('display','block');
    });

    $(".nav_two a").on('click',function(){
        // console.log(123)
        location.href='./html/goodlist.html';
    });

});