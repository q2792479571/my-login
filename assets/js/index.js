$(function () {
    getApi()
})
function getApi() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        data: {

        },
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0) {
                console.log(res);
                return layer.msg(res.message)
            }
            console.log(res);
            getAvative(res.data)
        }
        
    })
}
function getAvative(user) {
    // 用户名渲染
    var name = user.nickname || user.username
    $("#username").html('欢迎您 &nbsp &nbsp ' + name)
    // 渲染头像
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr('src', user.user_pic).show()
        $(".text-avative").hide()
    } else {
        $(".layui-nav-img").hide()
        $(".text-avative").show()
    }
}
// 退出功能
$("#esc").on('click', function () {
    layer.confirm('是否退出登录?', { icon: 3, title: '提示' }, function (index) {
        //do something
        localStorage.removeItem('token')
        location.href = '/login.html'
        layer.close(index);
    });
})