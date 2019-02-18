/* 
* @Author: Marte
* @Date:   2019-02-13 11:35:13
* @Last Modified by:   Marte
* @Last Modified time: 2019-02-18 20:02:12
*/

$(function(){

    $("._right input").on('focus',function(){
        $(this).css('borderColor','#ffbf00');
    });

    $("._right input").on('blur',function(){
        $(this).css('borderColor','#cfcfcf');
    });

    $("#login a").on('mouseover',function(){
        $(this).css('textDecoration','underline');
    });

    $("#login a").on('mouseout',function(){
        $(this).css('textDecoration','none');
    });

    $("#loginID").on('click',function(){
        var userName=$("#userName").val();
        var loginPassword=$("#loginPassword").val();

        $.ajax({
            type: 'post',
            url : '../api/login.php',
            data : {
                username : userName,
                password : loginPassword
            },
            success : function(str) {
                var arr=JSON.parse(str);
                console.log(arr);
                if(arr.code){
                    cookie.set('name',userName,{'path':'/H51811/xindan/src'});
                    cookie.set('uid',arr.arr[0].uid,{'path':'/H51811/xindan/src'});
                    status();
                    location.href='../index.html';
                }else{
                    $("#hint").html('请输入正确的用户名或密码。');
                }
            }
        });
    });

});