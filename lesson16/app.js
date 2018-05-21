var express = require('express');
var cookieParser = require('cookie-parser');
// 首先引入 express-session 这个模块
var session = require('express-session');

var app = express();
app.use(cookieParser('hanzheng'))

// 按照上面的解释，设置 session 的可选参数
app.use(session({
  secret: 'hanzheng', // 建议使用 128 个字符的随机字符串
  cookie: { maxAge: 60 * 1000 },
  resave: false,
  saveUninitialized: false, // 是否保存未初始化的会话
}));

app.get('/', function(req, res) {
  // 检查 session 中的 isVisit 字段
  // 如果存在则增加一次，否则为 session 设置 isVisit 字段，并初始化为 1。
  // console.log(req.cookies.islogin)
  // console.log(req.signedCookies.islogin) // 设置了signed为true时，req.signedCookies代表cookie集合
  // console.log(req.signedCookies['connect.sid']); //如果cookie-parser和express-session使用秘钥不同，解密的req.signedCookies['connect.sid'] = false；
  // console.log(req.session.id);
  console.log(req.connection.remoteAddress);

  if (req.session.isVisit) {
    req.sessionStore.get(req.session.id, function(a, session) {
      // console.log(session);
    })
    req.session.isVisit++;
    res.send('<p>第 ' + req.session.isVisit + '次来此页面</p>');
  } else {
    req.session.isVisit = 1
    req.session.userInfo = {
      name: 'aaa',
      old: 66,
      id: 2415453
    }
    res.cookie('islogin', 'success', { maxAge: 60000, signed: true }); // 设置cookie
    res.cookie('user', {
      id: 1,
      name: 'ruidoc'
    }, {
      maxAge: 900000
    });
    res.send("欢迎第一次来这里");
    // console.log(req.session);
  }
});

app.listen(5000, '0.0.0.0');
