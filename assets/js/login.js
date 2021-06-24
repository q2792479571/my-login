$(function(){
    // 登录注册切换事件
    $("#link_reg").on("click",function(){
        $(".login_box").hide()
        $(".reg_box").fadeIn(1000);
    }) 
    $("#link_login").on("click",function(){
        $(".login_box").fadeIn(1000);
        $(".reg_box").hide()
    })
    $("#login_user").on('keyup',function(){
        var txt = $(this).val()
        judge_user(txt)
    })
    $("#reg_user").on('blur',function(){
        var txt = $(this).val()
        judge_reguser(txt)
    })
    // 判断输入框函数 user
    function judge_user(txt){
        // 中文判断
        var re = new RegExp(/.*[\u4e00-\u9fa5]+.*$/)
        var utip = $("#loginUser_tip")
        // 长度 中文判断
        if(txt.length > 12 || txt.length == 0 ||txt.length <6 ||re.test(txt)) {
            $(utip).show()
            utip.text('不能包含中文/空格以及长度不能超过12位数')
        }
        if(!(txt.length > 12 || txt.length == 0 ||txt.length <6 ||re.test(txt))) {
            $(utip).show()
            utip.text('不能包含中文/空格以及长度不能超过12位数')
        }
    }
    // 判断输入框函数 psw
    function judge_reguser (txt) {
        // 中文判断
        var re = new RegExp(/.*[\u4e00-\u9fa5]+.*$/)
        var urtip = $("#regUser_tip")
        // 长度 中文判断
        if(txt.length > 12 || txt.length == 0 ||txt.length <6 ||re.test(txt)) {
            $(urtip).show()
            urtip.text('不能包含中文/空格以及长度不能超过12位数')
        }
        if(!(txt.length > 12 || txt.length == 0 ||txt.length <6 ||re.test(txt))) {
            $(urtip).show()
            urtip.text('不能包含中文/空格以及长度不能超过12位数')
        }
    }
    // $.ajaxPrefilter(function(options) {
    //     // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    //     options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    //   })
    // 注册接口
    var layer =layui.layer
    $("#btn_reg").on('click',function(e){
        e.preventDefault()
        var reg = {username:$("#reg_user").val(),password:$("#reg_psw").val()}
        $.post('/api/reguser',reg,function(res){
            if(res.status !==0){
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            $("#link_login").click()
        })
    })
    // 登录接口
    $(".login_box").submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if (res.status !== 0 ) {
                    return layer.msg(res.message)
                }
                // 缓存
                localStorage.setItem('token',res.token)
                layer.msg(res.message)
                // 跳转
                location.href = '/index.html'
            },
            
        })
    })
})