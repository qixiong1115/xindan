/* 
* @Author: Marte
* @Date:   2019-01-24 15:56:33
* @Last Modified by:   Marte
* @Last Modified time: 2019-02-18 20:01:55
*/

$(function(){
    // <!-- 工具栏 -->
    $('#topbar .fr .top_accord').on('mouseover',function(){
        $(this).css('background','#ffffff');
        $(this).children().eq(0).children().attr('class','top_xs');
        $(this).children().eq(1).css('display','block');
        $(this).children().eq(2).css('display','block');
    });
    $('#topbar .fr .top_accord').on('mouseout',function(){
        $(this).css('background','#F1F1F1');
        $(this).children().eq(0).children().attr('class','');
        $(this).children().eq(1).css('display','none');
        $(this).children().eq(2).css('display','none');
    });

    // <!-- 导航 -->: ;
    $('#nav .nav .nav_l').on('mouseover',function(){
        $(this).children().eq(1).css('display','block');
    });
    $('#nav .nav .nav_l').on('mouseout',function(){
        $(this).children().eq(1).css('display','none');
    });


    $('#nav .nav .nav_l>div>ul>li').on('mouseover',function(){
        $(this).siblings().css('background','#F7F7F7');
        $(this).children().eq(1).css('display','block');
        $(this).parent().parent().css('border-right','none');
    });
    $('#nav .nav .nav_l>div>ul>li').on('mouseout',function(){
        $(this).siblings().css('background','#FFFFFF');
        $(this).children().eq(1).css('display','none');
        $(this).parent().parent().css('border-right','2px solid #FF6600');
    });


    $('#nav .nav .nav_r>ul>li').on('mouseover',function(){
        $(this).children().eq(0).children().eq(1).attr('class','backgI');
        $(this).attr('class','nav_back');
        $(this).children().eq(0).css('color','#767676');
        $(this).children().eq(1).css('display','block');
    });
    $('#nav .nav .nav_r>ul>li').on('mouseout',function(){
        $(this).children().eq(0).children().eq(1).attr('class','');
        $(this).attr('class','');
        $(this).children().eq(0).css('color','#ffffff');
        $(this).children().eq(1).css('display','none');
    });

    
    status();

    $("#exit").on('click',function(){
        console.log(123)
        cookie.remove('name','/H51811/xindan/src');
        cookie.remove('uid','/H51811/xindan/src');
        status();
    });

});

//获取cookie,查看是否登录
function status(){
    var cook=cookie.get('name');
    if(cook){
        $("#log_buttom").css('display','none');
        $("#log_buttom").next().html(cook+' 欢迎来新蛋购物！');
        $("#log_buttom").next().next().html('安全退出');
    }else{
        $("#log_buttom").css('display','inline-block');
        $("#log_buttom").next().next().html('');
        $("#log_buttom").next().html('');
    }


    window.onscroll=function(){
        console.log(window.scrollY)
        if(window.scrollY>400){
            $("#returnTop").css('display','block');
        }else{
            $("#returnTop").css('display','none');
        }
    }

    $("#returnTop").on('click',function(){
        window.scrollTo(0,0);
    });
}