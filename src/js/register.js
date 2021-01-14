  
  $(function () {
  // 注册
    // 1-1. 点击事件
    $('.register').click(async () => {
        // 1-2. 拿到用户输入的内容
        const username = $('#username').val()
        const password = $('#password').val()
    
        // 1-3. 进行验证
        // 非空验证
        if (!username || !password) return alert('请完整填写表单')
        // 正则验证
        if (!/^[a-z0-9]\w{4,11}$/i.test(username) || !/^\w{6,12}$/i.test(password)) return alert('表单不符合规则')
    
        // 1-4. 提交到后端
        //  post
        // username 和 password
        //  $.post(地址, 数据, 回调, 解析)
        const {code} = await $.post('../php/register.php', { username, password }, null, 'json')
        // 1-5. 通过返回的结果来进行操作
        if (!code) return alert('注册失败')
        // 能来到这，说明code为1，注册成功
        const url = window.sessionStorage.getItem('url')
        // // 跳转页面
        window.location.href = `./${ url ? url : 'index' }.html`
        // console.log(url)
  
      })

    })