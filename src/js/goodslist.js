/* 
* @Author: Marte
* @Date:   2019-02-11 15:41:34
* @Last Modified by:   Marte
* @Last Modified time: 2019-02-18 13:09:46
*/

$(function(){

    //左边下滑
    for(var i=0; i<$('.cate_menu div').size(); i++){
        // console.log($('.cate_menu div').eq(i)[0]);
        $('.cate_menu div').eq(i)[0].isok=true;
    }
    $('.cate_menu div p').on('click',function(){
        if($(this).parent()[0].isok){
            $('.cate_menu div ul').slideUp();
            for(var i=0; i<$('.cate_menu div').size(); i++){
                $('.cate_menu div').eq(i)[0].isok=true;
            }
            $(this).next().slideDown();
            $('.cate_menu div p i').attr('class','');
            $(this).children().eq(0).children().attr('class','sj');
        }else{
            $(this).next().slideUp();
            $(this).children().attr('class','');
        }
        $(this).parent()[0].isok=!$(this).parent()[0].isok;
    });

    //右边上部
    $(".filter_box a,.sort a").on('mouseover',function(){
        $(this).css('text-decoration','underline');

    });
    $(".filter_box a,.sort a").on('mouseout',function(){
        $(this).css('text-decoration','none');

    });

    $(".cpt_filter li").on('mouseover',function(){
        // console.log($(this).index());
        $(".cpt_filter div").eq($(this).index()).css('display','block');
        $(".cpt_filter div").on('mouseover',function(){
            $(this).css('display','block');
            
        });
    });
    $(".cpt_filter li").on('mouseout',function(){
        $(".cpt_filter div").eq($(this).index()).css('display','none');
        $(".cpt_filter div").on('mouseout',function(){
            $(this).css('display','none');
            
        });
    }); 



    //数据渲染、排序
    var sortType='goodsid';
    var sortOrder='asc';

    function goodsShow(page,qty,type,order){
        $.ajax({
            type: 'get',
            url : '../api/goodslist.php',
            data : {
                page : page,
                qty : qty,
                type : type,
                order : order
            },
            success : function(str) {
                var arr=JSON.parse(str);
                console.log(arr);
                if(arr.code){
                    goodsRender(arr.list);
                    var totalPage='';
                    for(var i=0; i<arr.sum/arr.qty; i++){
                        // console.log(1);
                        totalPage+=`<a href="javascript:;">${i+1}</a>`;
                    }
                    $("#total").html(totalPage);
                    $("#total").children().eq(arr.page-1).attr('class','curr');
                }
            }
        });
    }
    goodsShow(1,20,sortType,sortOrder);
    
    function goodsRender(arr){
        var str=arr.map(function(item){
            return `<li data-id="${item.goodsid}">
                        <img src="../img/${item.imgurl}" alt="" />
                        <a class="qitian" href="javascript:;"></a>
                        <span class="xinpin"></span>
                        <p class="title">${item.title}</p>
                        <p class="pingjia"><i></i><em>[${item.collect}]</em></p>
                        <p class="price">¥${item.price}</p>
                        <p class="action">
                            <a class="purchase" href="javascript:;">购买</a>
                            <a class="collect" href="javascript:;">收藏</a>
                            <a class="compare" href="javascript:;"><i></i>比较</a>
                        </p>
                    </li>`;
        }).join('');
        $("#goodsData").html(str);
        for(var i=0; i<($(".compare").size()); i++){
            $(".compare i").eq(i)[0].i_isok=true;
        }
        // console.log($(".compare i").eq(1)[0].i_isok)
    }

    $('#total').on('click','a',function() {
        // console.log($(this));
        var page=$(this).html();
        goodsShow(page,20,sortType,sortOrder);
    });

    $('.sort').on('click','a',function() {
        // console.log($(this).attr('class'));
        sortOrder = sortOrder == 'asc' ? 'desc' : 'asc';
        $('.sort a').css('backgroundColor','#ffffff')
        $(this).css('backgroundColor','#FFF0D9')
        sortType=$(this).attr('class');
        goodsShow(1,20,sortType,sortOrder);
    });

    $(".pageConfirm").on('click',function(){
        var num=$(this).prev().val();
        goodsShow(num,20,sortType,sortOrder);
    });


    //页面跳转
    $("#goodsData").on('click','.title,img',function(){
        var goodsId=$(this).parent().attr('data-id');
        location.href='detail.html?id='+goodsId;
    });


    //商品里面的效果
    $("#goodsData").on('mouseover','.compare,.collect',function(){
        $(this).css('border-color','#dadada');
    });
    $("#goodsData").on('mouseout','.compare,.collect',function(){
        $(this).css('border-color','#838383');
    });

    
    $("#goodsData").on('click','.compare i',function(){
        // console.log($(this))
        if($(this)[0].i_isok){
            $(this).attr('class','i_all');
        }else{
            $(this).attr('class','');
        }
        $(this)[0].i_isok = !$(this)[0].i_isok;
    });

});