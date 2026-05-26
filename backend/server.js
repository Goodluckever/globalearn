
const express=require('express');
const cors=require('cors');
require('dotenv').config();

const authRoutes=require('./routes/auth');
const userRoutes=require('./routes/users');
const kycRoutes=require('./routes/kyc');
const adminRoutes=require('./routes/admin');

const app=express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>res.json({app:'GlobalEarn Premium',mode:'simulation'}));
app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/kyc',kycRoutes);
app.use('/api/admin',adminRoutes);

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log(`Server on ${PORT}`));
