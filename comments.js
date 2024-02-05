//create web server
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendfile(path.join(__dirname + '/public/index.html'));
});

app.get('/comments', function(req, res) {
    fs.readFile(__dirname + '/public/comments.json', 'utf8', function(err, data) {
        res.end(data);
    });
});

app.post('/comments', urlencodedParser, function(req, res) {
    console.log(req.body);
    fs.readFile(__dirname + '/public/comments.json', 'utf8', function(err, data) {
        var comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile(__dirname + '/public/comments.json', JSON.stringify(comments, null, 4), function(err) {
            console.log('Data written');
            res.end(JSON.stringify(comments));
        });
    });
});

app.listen(8080, function() {
    console.log('Server is running at 8080');
});
```
> index.html
```
<!DOCTYPE html>
<html>
    <head>
        <title>React Tutorial</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/JSXTransformer.js"></script>
        <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
    </head>
    <body>
        <div id="content"></div>
        <script type="text/jsx">
            var Comment = React.createClass({
                render: function() {
                    return (
                        <div className="comment">
                            <h2 className="commentAuthor">
                                {this.props.author}
                            </h2>
                            {this.props.children}
                        </div>
                    );
                }
            });

            var CommentList = React.createClass({
                render: function() {
                    var commentNodes = this.props.data.map(function(comment) {
                        return (
                            <Comment author={comment.author}>
                                {comment.text}
                            </Comment>
                        );
                    });
                    return (
                        <div className="commentList">
                            {commentNodes}
                        </div>