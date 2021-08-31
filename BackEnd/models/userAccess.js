const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const userAccessSchema  = new Schema ({
userName:{
type:'string',
required:true
},
password:{
type:'string',
required:true

},
},{timestamps:true})


const UserAccess = mongoose.model('usersAcess',userAccessSchema);
module.exports = UserAccess;