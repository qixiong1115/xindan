/* 
* @Author: Marte
* @Date:   2019-02-14 19:18:01
* @Last Modified by:   Marte
* @Last Modified time: 2019-02-15 15:35:30
*/

$(function(){
    function dataNow(){
        $.ajax({
            type: 'post',
            url : '../api/shoppingCart.php',
            data : {
                uid : cookie.get('uid')
            },
            success : function(str) {
                var arr=JSON.parse(str);
                console.log(arr);
                if(arr.code==1){
                    dataShow(arr.datalist);
                    NumPrice();
                    $(".commodity_deal").css('display','inlineBlock');
                    $(".commodity_add").css('display','none');
                }else if(arr.code==2){
                    $(".commodity_deal").css('display','none');
                    $(".commodity_add").css('display','block');
                }
            }
        });
    }
    dataNow();

    function dataShow(arr){
        var str=arr.map(function(item){
            return `<tr data-id="${item.deleid}">
                        <td><input class="check" type="checkbox" /></td>
                        <td class="xinxi">
                            <img src="../img/goods/${item.img_min2}" alt="" />
                            <a href="javascript:;"><span>${item.title}</span></a>
                        </td>
                        <td>
                            <p class="jiage">¥${item.price}</p>
                            <p class="fanhui">返现¥100.00</p>
                        </td>
                        <td class="shuliang">
                            <input type="text" value="${item.nums}" />
                            <span>
                                <span class="num_add"></span>
                                <span class="num_minus"></span>
                            </span>
                        </td>
                        <td>
                            <p class="xiaoji">¥3799.00</p>
                        </td>
                        <td class="caozuo">
                            <a class="dele" href="javascript:;">删除</a>
                            <a href="javascript:;">移入收藏夹</a>
                        </td>
                    </tr>`;
        }).join('');
        $(".message").html(str);

        //小计初始化
        for(var i=0; i<$('.xiaoji').size(); i++){
            subTotal($('.num_add').eq(i));
        }
    }


    //加减
    function addMinus(type,now){
        var dlId=now.parent().parent().parent().attr('data-id');
        var numInput=now.parent().prev();
        $.ajax({
            type: 'get',
            url : '../api/add_sub.php',
            data : {
                deleid : dlId,
                type : type
            },
            success : function(str) {
                var arr=JSON.parse(str);
                console.log(arr);
                numInput.val(arr.num);
                if(arr.code == 0){
                    alert(arr.message);
                }
                subTotal(now);
                NumPrice();
            }
        });
    }

    $(".message").on('click','.num_add',function(){
        addMinus('add',$(this));
    });
    $(".message").on('click','.num_minus',function(){
        addMinus('sud',$(this));
    });

    // 小计
    function subTotal(now){
        //价格
        var goodsPrice=now.parent().parent().prev().children().html().slice(1);
        //数量
        var val=now.parent().prev().val();
        //合计
        var total=(goodsPrice*val).toFixed(2);
        console.log(goodsPrice,val,total);
        now.parent().parent().next().children().html("¥"+total);
    }


    //删除
    $(".message").on('click','.dele',function(){
        var deleId=$(this).parent().parent().attr('data-id');
        // console.log(deleId);
        var cfm=confirm('确定删除吗？');
        if(cfm){
            $.ajax({
                type: 'get',
                url : '../api/delete.php',
                data : {
                    deleid : deleId
                },
                success : function(str) {
                    var arr=JSON.parse(str);
                    console.log(arr);
                    if(arr.code){
                        dataNow();
                    }
                }
            });
        }
    });

    //选择
    $(".message").on('click','.check',function(){
        // console.log($(this).prop('checked'))
        NumPrice();
    });

    var numArr = [];
    function NumPrice(){
        numArr = [];
        for(var i = 0; i < $('.check').size(); i++) {
            if($('.check').eq(i).prop('checked')) {
                numArr.push(i);
            }
        }
        // console.log(numArr);
        
        if(numArr.length == $('.check').size()){
            $('.header input').prop('checked','checked');
        }else{
            $('.header input').removeAttr('checked');
        }

        if(numArr.length<1){
            $(".sun_total").parent().css('display','none');
            $(".sun_total").parent().next().css('background','#767676');
        }else{
            $(".sun_total").parent().css('display','block');
            $(".sun_total").parent().next().css('background','#F7661F');
        }

        var priceAll = 0;//总价
        for(var i=0; i<numArr.length; i++){
            priceAll += $(".xiaoji").eq(numArr[i]).html().substring(1)*1;
        }
        // console.log(priceAll);
        $(".sun_total").html('¥' + priceAll.toFixed(2));
    }

    //全选、不选
    $('.header input').on('click',function() {
        if($(this).prop('checked')) {
            //给所有的复选框都勾上
            $('.check').prop('checked','checked');
        }else{
            $('.check').removeAttr('checked');
        }
        NumPrice();
    });

});