const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {User} = require('./models/User');


const app = express();
const port = 3000;

//application form태그 안에 있는걸 분석해서 가져옴
app.use(bodyParser.urlencoded({extended:true})); 
//Json형태분석해서 가져옴
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://walter:everglow95@todoapp.hudxb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, 
}).then(()=> console.log('MongoDB Connected')).catch(err => console.log(err));


app.get('/', (req, res)=> res.send('Hello world'));

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

app.listen(port, ()=> console.log(`Express start on ${port}`))
