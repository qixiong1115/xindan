/* 
* @Author: Marte
* @Date:   2019-02-12 17:21:03
* @Last Modified by:   Marte
* @Last Modified time: 2019-02-16 14:36:56
*/

$(function(){

    var user='';
    var password='';

    $("#register .register_content>div>input").on('focus',function(){
        $(this).css('borderColor','#ffbf00');
    });

    $("#register .register_content>div>input").on('blur',function(){
        $(this).css('borderColor','#cfcfcf');
        var str=$(this).val()
        var way=$(this).attr("name");
        if(checkReg[way](str)){
            $(this).next().html('√');
            $(this).next().css('color','green');
            $(this).parent()[0].isok=true;
        }else{
            $(this).next().html('×');
            $(this).next().css('color','red');
            $(this).parent()[0].isok=false;
        }
    });

    $("#yzm").on('blur',function(){
        if($("#gain").html().toLowerCase() == $("#yzm").val().toLowerCase()){
            $(this).next().html('√');
            $(this).next().css('color','green');
            $(this).parent().parent()[0].isok=true;
        }else{
            $(this).next().html('×');
            $(this).next().css('color','red');
            $(this).parent().parent()[0].isok=false;
        }
    });

    $("#con_psw").on('blur',function(){
        // console.log($(this).val() , $("#psw").val());
        if($(this).val() === $("#psw").val()){
            $(this).next().html('√');
            $(this).next().css('color','green');
            $(this).parent()[0].isok=true;
            password=$("#psw").val();
        }else{
            $(this).next().html('密码不一致');
            $(this).next().css('color','red');
            $(this).parent()[0].isok=false;
            password='';
        }
        // console.log( $(this).parent()[0].isok);
    });

    $("#gain").on('click',function(){
        var str=randomCode();
        $(this).html(str);
    });

    $(".register_content .queding").on('click',function(){
        if($(this).parent().children().eq(0)[0].isok && $(this).parent().children().eq(1)[0].isok){
            user=$("#phone").val();
            $.ajax({
                type: 'post',
                url : '../api/checkname.php',
                data : {
                    username : user
                },
                success : function(str) {
                    var arr=JSON.parse(str);
                    // console.log(arr.code);
                    if(arr.code){
                        $(".queding").parent().parent().css('display','none');
                        $(".queding").parent().parent().next().css('display','block');
                    }else{
                        $("#phone").next().html(arr.message);
                        $("#phone").next().css({
                            color:'red',
                            fontSize:'14px'
                        });
                    }
                }
            });
        }else{
            user='';
            alert('请填写完整信息')
        }

    });

    $(".zhuce").on('click',function(){
        // console.log($(this).parent().children().eq(0)[0].isok,$(this).parent().children().eq(1)[0].isok);
        if($(this).parent().children().eq(0)[0].isok && $(this).parent().children().eq(1)[0].isok){
            $.ajax({
                type: 'post',
                url : '../api/enroll.php',
                data : {
                    username : user,
                    password : password
                },
                success : function(str) {
                    var arr=JSON.parse(str);
                    // console.log(arr);
                    if(arr.code){
                        $(".zhuce").parent().parent().css('display','none');
                        $(".zhuce").parent().parent().next().css('display','block');
                    }
                }
            });
        }else{
            $("#con_psw").next().css({
                color:'red',
                fontSize:'14px'
            });
            alert("请填写完整信息")
        }
    })
});