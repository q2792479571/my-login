$(function () {
})
var form = layui.form
var layer = layui.layer
getUserInfo()
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            form.val('formUserInfo', res.data)
        }
    })
}
// 重置表单
$(".layui-btn").on('click', function (e) {
    e.preventDefault
    getUserInfo()
})
// 修改用户信息
$(".layui-form").on('submit', function (e) {
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('更新用户信息失败！')
            }
            layer.msg('更新用户信息成功！')
            // 调用父页面中的方法，重新渲染用户的头像和用户的信息
            window.parent.getApi()
            getUserInfo()
        }
    })
})