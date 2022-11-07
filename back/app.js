const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cookie = require('cookie-parser');
const passport = require('passport');

const db = require('./models');
const passportConfig = require('./passport');
const app = express();

// 리눅스와 맥은 MySQL을 터미널 혹은 GUI에서 따로 실행해주는 것까지 해야 한다.
db.sequelize.sync(); // db 시작(MySQL). 만약 db 생성을 안한경우, $ npx sequelize db:create 먼저 실행.
passportConfig();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie('cookiesecret')); // 쿠키 암호화된 경우 해석하는 cookie-parser
app.use(session({ // passport 세션 사용 위해 필요한 express-session
  resave: false,
  saveUninitialized: false,
  secret: 'cookiesecret'
}));

app.use(passport.initialize()); // req res에 로그인, 로그아웃 기능 추가
app.use(passport.session()); // 세션스토리지에 정보 기록

app.set('port', process.env.PORT || 3085);
// preflight 적용(실제 요청 전에 접근 권한이 있는 지 미리 확인한다.). 모든 경로에 대해 origin 주소의 접근을 허용한다.
app.options('*', cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }))

app.get('/', (req, res) => {
  res.status(200).send('안녕 시퀄라이즈');
});

app.post('/user', cors({ methods: ['POST'] }), async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 12);
    const exUser = await db.User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (exUser) {
      return res.status(403).json({
        errorCode: 1, // 커스텀 에러코드
        message: '이미 존재하는 이메일입니다.'
      });
    }
    const newUser = await db.User.create({
      email: req.body.email,
      password: hash,
      nickname: req.body.nickname,
    });
    console.log(req.body) // 보내온 데이터는 body(콘솔상 payload)에 저장.
    // send()는 문자열과 버퍼용으로 주로 사용.
    res.status(201).json(newUser); // HTTP status code. 생성 성공
  } catch(err) { // 에러 발생시 알아서 FRONTEND에 전달함.
    console.log(err);
    return next(err);
    // 이렇게 커스터마이징도 가능하다.
    // return res.status(500).json({ ... });
  }
})

app.post('/user/login', cors({ methods: ['POST'] }), async (req, res, next) => {
  // CORS 허용
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // console.log(req.headers);
  // 허용할 method 암시
  // res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS, DELETE, PATCH");
  // 허용할 Header 암시
  // res.header("Access-Control-Allow-Headers", "*");
  // 이메일, 패스워드 검사
  const password = await bcrypt.compare(req.body.password, 'savedPassword');
  if (!password) {
    return res.status(400).send('이메일이나 비밀번호가 올바르지 않습니다.');
  }
  // 생성한 암호화된 쿠키 = 유저정보 객체를 세션에 저장
  // 프런트에 그 쿠키 내려보내주기.
  res.status(200).send();
})

// http 80, https는 443을 기본 포트로 사용.
app.listen(3085, () => {
  console.log(`백엔드 서버 ${app.get('port')}번에서 포트 작동중`);
});