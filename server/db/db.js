const mongoose = require('mongoose');
const con = async() => {
    await mongoose.connect('mongodb://localhost:27017/netflix',{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
}
con().catch(err=>console.log(err))

module.exports = con