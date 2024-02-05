//Create web server
import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
const commentsPath = path.join(__dirname, 'comments.json');
const comments = [];

//read the comments.json file
fs.readFile(commentsPath, {encoding: 'utf8'}, function(err, data) {
    if (err) {
        return console.error(err);
    }
    if (data) {
        comments = JSON.parse(data);
    }
});

app.use('/', express.static(__dirname + '/'));
app.use(bodyParser.json());

//get comments
app.get('/api/comments', function(_req, res) {
    res.json(comments);
});

//post comments
app.post('/api/comments', function(req, res) {
    comments.push(req.body);
    fs.writeFile(commentsPath, JSON.stringify(comments, null, 4), function(err) {
        if (err) {
            return console.error(err);
        }
    });
    res.json(comments);
});

app.listen(3000, function() {
  console.log('Server is running on port 3000');
});