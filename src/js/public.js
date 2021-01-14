
// 顶部滚动栏topscroll信息


// toplogo-logoin
// 1. 鼠标滑过事件，登录注册显示模块
// 2. nav- 前三个鼠标滑过时间，二级菜单显示

// nav-input  
// input输入事件，获取百度接口搜索信息

// 0. 获取元素
const search_ul = document.querySelector('.search_ul');
// 1. 给input绑定input事件
const search_input = document.querySelector('.nav-input');
search_input.addEventListener('input', function () {
    // 2.拿到用户输入的内容
    const search_text = this.value.trim()
    console.log(search_text)
    // 3. 动态创建script标签来发送请求，jsonp
    const search_script = document.createElement('script');
    // 添加src属性：元素.属性名 = 属性值
    search_script.src = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=33425,33402,31254,32970,33286,33343,33413,26350,33389,33381,33370&wd=${search_text}&req=2&csor=1&cb=bindHtml&_=1610416057036`
    // 将生成的 script 插入input后面
    const search_a = document.querySelector('.nav-right>a');
    const nav_right = document.querySelector('.nav-right');
    nav_right.appendChild(search_script);
    // nav_right.insertBefore(search_script, search_a)
    // 使用完成后删除script标签
    search_script.remove()
})
// 4. 准备一个请求回来的函数
function bindHtml(res) {
    // 4-2 判断是否有g存在
    if (!res.g) {
        // 表示 g 不存在
        search_ul.style.display = 'none'
        return
    }
    // 能来到这里, 表示 res.g 存在, 那么就循环遍历 res.g 渲染页面
    let str = ''
    res.g.forEach(item => {
        str += `
          <li>${item.q}</li>
        `
    })
    // 渲染完毕以后, 插入到 ul 内部
    search_ul.innerHTML = str
    // 让 ul 显示出来
    search_ul.style.display = 'block'
}
