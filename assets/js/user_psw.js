var layer = layui.layer

$(".layui-form").on('submit', function (e) {
    e.preventDefault()
    getPsw()
    function getPsw() {
        $.ajax({
            methods: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    console.log(res);
                    return layer.msg(res.message)
                }
                layer.mas(res.message)
                $(".layui-form")[0].reset()
            }
        })
    }
})
