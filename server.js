const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, 'dist')));

// 路由重定向
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// 启动服务器
app.listen(5175, () => {
    console.log('Server is running on http://localhost:5175');
});
