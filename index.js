const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/key');
const bcrypt = require('bcrypt');
const {User} = require('./models/User');


const app = express();

//application form태그 안에 있는걸 분석해서 가져옴
app.use(bodyParser.urlencoded({extended:true})); 
//Json형태분석해서 가져옴
app.use(bodyParser.json());

mongoose.connect(config.mongoURI ,{
    useNewUrlParser: true, 
}).then(()=> console.log('MongoDB Connected')).catch(err => console.log(err));


app.get('/', (req, res)=> res.send('Hello world'));

app.get('/api/hello', (req, res)=>{
    res.send('api 호출 쌉가능');
});



app.post('/join', (req, res)=>{
    
    //회원가입 할 때 필요한 정보들을 client에서 가져오면 
    //그것들을 데이터 베이스에 넣어준다.
    //req.body Json형식으로 들어있다. 
    
    const user = new User(req.body);
    
    user.save((err, userInfo)=>{
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    });
});

app.post('/login', (req, res)=>{
    
    //요청된 Email을 데이터베이스에서 있는지 찾는다.
    User.findOne({email: req.body.email},(err, userInfo)=>{
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인
        user.comparePassword(req.body.password,(err, isMatch)=>{
            if(!isMatch)
            return res.json({loginSuccess : false, message: "비밀번호가 틀렸습니다."})
            
            //비밀번호 까지 맞다면 토큰을 생성하기
            user.generagteToken
            
        })
        
    })
    
    
})

const port = 5000;
app.listen(port, ()=> console.log(`Express start on ${port}`))
