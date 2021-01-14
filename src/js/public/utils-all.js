// 1. 若干个数字求和
function fn() {
  var res = 0
  for (var i = 0; i < arguments.length; i++) {
    res += arguments[i]
  }
  return res
}

// 2. 获取最大公约数
function getGys(a, b) {
  var gys = 1
  var max = a > b ? a : b
  var min = a > b ? b : a
  for (var i = min; i >= 1; i--) {
    if (max % i === 0 && min % i === 0) {
      gys = i
      break
    }
  }
  return gys
}

// 3. 获取最小公倍数
function getGbs(a, b) {
  var gbs = a * b / getGys(a, b)
  return gbs
}

// 4. 判断是不是质数
function isZs(num) {
  var flag = true
  for (var i = 2; i < num; i++) {
    if (num % i === 0) {
      flag = false
      break
    }
  }
  return flag
}

// 5. 返回十六进制颜色字符串
function getColor() {
  var str = '#'
  for (var i = 0; i < 3; i++) {
    str += Math.round(Math.random() * (255 + 1 - 0) + 0).toString(16);
  }
  return str;
}

// 6. 随意两个数值间随机整数
function getRes(a, b) {
  var max = Math.max(a, b)
  var min = Math.min(a, b)
  var num = parseInt(Math.random() * (max + 1 - min) + min)
  return num;
}

// 7. 对象转化字符串格式
// var obj = {a:100,b:200,c:300} 
// 返回值： 'a=100&b=200&c=300' 
function getStr(obj) {
  // 定义一个空字符串存储最终结果
  var str = ''
  for (var key in obj) {
    // console.log(key)  //h获取到的是对象的每个键名
    // 对每一个成员也就是键值对，进行切割以：
    str += key + '=' + obj[key] + '&';
    console.log(str)
  }
  // 循环完成得到所需字符串但是多一个末尾的&，用字符串截取方式去除掉
  // return str.slice(0,-1);
  // 也可使用substring截取，包前不包后，直接到最后一个索引即可
  return str.substring(0, str.length - 1)
}

// 8. 格式化字符串
// a=100&b=200&c==300   =>    {a:100,b:200,c:300}
var str = 'a=100&b=200&c=300';
var arr = str.split('&')
// console.log(arr)
var obj = {};
arr.forEach(function (item) {
  obj[item.split('=')[0]] = item.split('=')[1];

})

// 9. 给定字符串和一个敏感词，替换敏感词
function isMgc(str, wold) {
  var res = ''
  // 方法1：循环每个字符每次循环替换一个敏感词
  // for( var i = 0 ;v < arr.length ; i++ ){
  //   res = str.replace( wold , '*' )
  // }
  // 方法2：通过字符串切割方法以敏感词为间隔分割为数组，再根据数字方法拼接字符串
  res = res.split(wold).join('*');
  // 最终返回res
  return res;
}

// 10 批量替换敏感词
// 给定一个字符串，一组敏感词以数组形式['f','d','n','o']
// 把一个字符串里面所有敏感词全部替换掉
// 分析
function isMgcs(str, arr) {
  arr.forEach(function (item) {
    str = str.split(item).join('*')
  })
}

// 11. 字符串查重
// 给定一个字符串，查询每个字符出现的次数，以对象键值对形式返回
function getCcObj(str) {
  // 定义一个空对象，存储最终数据
  var obj = {};
  for (var i = 0; i < str.length; i++) {
    if (obj[str[i]] === undefined) {
      obj[str[i]] = 1;
    } else {
      obj[str[i]]++;
    }
  }
  return obj;
}
// 12. 
function getStyle(ele, style) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(ele)[style]
  }
  if (ele.currentStyle) {
    return ele.currentStyle[style]
  }
  return ele.style[style]
}
// 13.
function on(ele, type, fn) {
  if (ele.addEventListener) {
    ele.addEventListener(type, fn)
    return
  }
  if (ele.attachEvent) {
    ele.attachEvent('on' + type, fn)
    return
  }
  ele['on' + type] = fn
}
// 14.
function off(ele, type, fn) {
  if (ele.removeEventListener) {
    ele.removeEventListener(type, fn)
    return
  }
  if (ele.detachEvent) {
    ele.detachEvent('on' + type, fn)
    return
  }
  ele['on' + type] = null
}
// 15. 运动函数
function move(ele, target, fn) {
  let count = 0
  for (let key in target) {
    if (key === 'opacity') target[key] *= 100
    count++
    const timer = setInterval(() => {
      // 1. 获取当前值
      let current
      if (key === 'opacity') current = window.getComputedStyle(ele)[key] * 100
      else current = parseInt(window.getComputedStyle(ele)[key])

      // 2. 计算本次运动的距离
      let distance = (target[key] - current) / 10
      distance = distance > 0 ? Math.ceil(distance) : Math.floor(distance)

      // 3. 判断是否到达目标位置
      if (current === target[key]) {
        clearInterval(timer)
        count--
        if (!count) fn()
      } else {
        if (key === 'opacity') ele.style[key] = (current + distance) / 100
        else ele.style[key] = current + distance + 'px'
      }
    }, 20)
  }
}
// 16. 选项卡
function Tabs(ele, type = 'click') {
  this.ele = document.querySelector(ele)
  this.btns = this.ele.querySelectorAll('ul > li')
  this.tabs = this.ele.querySelectorAll('ol > li')
  this.change(type)
}

Tabs.prototype.change = function (type) {
  this.btns.forEach((item, index) => {
    item['on' + type] = () => {
      this.btns.forEach((item, index) => {
        this.btns[index].classList.remove('active')
        this.tabs[index].classList.remove('active')
      })
      this.btns[index].classList.add('active')
      this.tabs[index].classList.add('active')
    }
  })
}
// 17. 设置cookie
function setCookie(key, value, expires) {
  // 1. 条件判断
  if (!expires) {
    // expires为undefined，即未传递值，则设置会话时效
    // 设置cookie
    document.cookie = key + '=' + value
    return
  }
  // 2. 到这里说明expires有传递实参
  const time = new Date()
  time.setTime(time.getTime() - 1000 * 8 * 60 * 60 + 1000 * expires)
  // 设置cookie
  document.cookie = `${key}=${value};expires=${time}`
}
// 18. 前端获取cookie
function getCookie(key){
  // 准备一个空对象
  const obj = {}
  // 获取到的cookie数据按split('； ')进行切割
  const tmp = document.cookie.split('; ')
  // 切割后为数组，再把数组循环遍历拿到每一项
  tmp.forEach(item=>{
      // 再次对每个项目通过split('=')进行切割
      const t = item.split('=')
      // t数组存储的是等号前后的两个数值，赋值给空对象中
      obj[t[0]] = t[1]
  })
  // 返回函数的结果，判断形参是否赋值
  if(key){
      return obj[key]
  }else{
      return obj
  }
}
// 19. 封装解析 查询字符串
// 查询字符串 - 一个固定格式的字符串
// key=value&key2=value2&key3=value3
function parseQueryString(str) {
  const obj = {}
  const tmp = str.split('&')

  // 循环遍历 tmp
  tmp.forEach(item => {
    // 继续切割 item
    const t = item.split('=')
    obj[t[0]] = t[1]
  })

  // 直接返回对象
  return obj
}
// 20.封装组装 查询字符串
// 把一个对象数据结构转换成 queryString 的格式
function queryStringify(obj) {
  // 准备一个空字符串
  let str = ''

  // 循环遍历 obj
  for (let key in obj) {
    str += key + '=' + obj[key] + '&'
  }

  return str.slice(0, -1)
}
// 21. ajax
function ajax(options = {}) {
  // 1. 参数验证
  // 1-1. 验证 url 必填
  if (!options.url) {
    throw new Error('url 为必填选项')
  }

  // 1-2. 验证 method
  if (!(options.method === undefined || /^(get|post)$/i.test(options.method))) {
    throw new Error('目前只接受 GET 和 POST 请求, 请期待更新 ^_^')
  }

  // 1-3. 验证 async
  if (!(options.async === undefined || typeof(options.async) === 'boolean')) {
    throw new Error('async 只能传递一个布尔值')
  }

  // 1-4. 验证 data
  if (!(options.data === undefined || Object.prototype.toString.call(options.data) === '[object Object]' || /^(.+=.+&?)*[^&]$/.test(options.data))) {
    throw new Error('data 需要传递一个查询字符串 或者 对象数据类型2')
  }

  // 1-5. 验证 success
  if (!(options.success === undefined || typeof options.success === 'function')) {
    throw new Error('success 需要传递一个 function 数据类型')
  }

  // 1-6. 验证 error
  if (!(options.error === undefined || typeof options.error === 'function')) {
    throw new Error('error 需要传递一个 function 数据类型')
  }

  // 1-7. 验证 dataType
  if (!(options.dataType === undefined || typeof(options.dataType) === 'boolean')) {
    throw new Error('dataType 只能传递一个布尔值')
  }

  // 2. 设置默认值
  const _default = {
    url: options.url,
    method: options.method || 'GET',
    async: typeof options.async === 'boolean' ? options.async : true,
    data: options.data || '',
    success: options.success || function () {},
    error: options.error || function () {},
    dataType: typeof options.dataType === 'boolean' ? options.dataType : true,
  }
  if (typeof _default.data === 'object') {
    _default.data = queryStringify(_default.data)
  }
  if (_default.method.toUpperCase() === 'GET' && _default.data) {
    _default.url += '?' + _default.data
  }

  // 3. 发送 ajax 请求
  const xhr = new XMLHttpRequest()
  xhr.open(_default.method, _default.url, _default.async)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
      _default.success(_default.dataType ? JSON.parse(xhr.responseText) : xhr.responseText)
    }
    if (xhr.readyState === 4 && xhr.status === 404) {
      _default.error(xhr.statusText)
    }
  }
  if (_default.method.toUpperCase() === 'GET') {
    xhr.send()
  } else {
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
    xhr.send(_default.data)
  }
}
// 22. promsie - ajax
function pAjax(options = {}) {
  // 返回一个 promise 对象数据类型
  return new Promise(function (resolve, reject) {
    // 要执行异步的事情
    // 我的异步事情就是 ajax 的封装
    ajax({
      url: options.url,
      async: options.async,
      data: options.data,
      dataType: options.dataType,
      method: options.method,
      success (res) {
        resolve(res)
      },
      error (err) {
        reject(err)
      }
    })
  })
}