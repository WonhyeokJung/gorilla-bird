const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

app.set('port', process.env.PORT || 3085);
// preflight 적용(실제 요청 전에 접근 권한이 있는 지 미리 확인한다.)
app.options('*', cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }))

app.get('/', (req, res) => {
  res.status(200).send('안녕 시퀄라이즈');
});

app.post('/user', cors({ methods: ['POST'] }), (req, res) => {
  console.log(req.body) // 보내온 데이터는 body(콘솔상 payload)에 저장.
  res.status(200).send('data');
})

app.get('/login', cors({ methods: ['GET'] }), (req, res) => {
  // CORS 허용
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  console.log(req.headers);
  // 허용할 method 암시
  // res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS, DELETE, PATCH");
  // 허용할 Header 암시
  // res.header("Access-Control-Allow-Headers", "*");
  res.status(200).send();
})

// http 80, https는 443을 기본 포트로 사용.
app.listen(3085, () => {
  console.log(`백엔드 서버 ${app.get('port')}번에서 포트 작동중`);
});