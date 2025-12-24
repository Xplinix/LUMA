const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const STORE = path.join(__dirname, 'store.json');
function loadStore(){ try{ return JSON.parse(fs.readFileSync(STORE)); }catch(e){ return { users: {}, progress: {} }; } }
function saveStore(store){ fs.writeFileSync(STORE, JSON.stringify(store, null, 2)); }

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/ping', (req,res)=>res.json({ok:true, ts: Date.now()}));

app.get('/api/users', (req,res)=>{ const store = loadStore(); res.json(store.users || {}); });
app.post('/api/users', (req,res)=>{ const {username, role} = req.body; if(!username) return res.status(400).json({error:'username required'}); const store = loadStore(); store.users = store.users || {}; store.users[username] = store.users[username] || {}; store.users[username].role = role || store.users[username].role || 'student'; store.users[username].created = store.users[username].created || Date.now(); saveStore(store); res.json(store.users[username]); });

app.get('/api/progress', (req,res)=>{ const store = loadStore(); res.json(store.progress || {}); });
app.get('/api/progress/:user', (req,res)=>{ const store = loadStore(); res.json(store.progress && store.progress[req.params.user] || {}); });
app.post('/api/progress/:user', (req,res)=>{ const store = loadStore(); store.progress = store.progress || {}; store.progress[req.params.user] = req.body || {}; saveStore(store); res.json({ok:true}); });

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log('Luma server running on port', port));
