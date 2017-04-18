"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// <li><Comment currentComment={comment} ></li>  //DONT'S FORGET /
var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var _presentation = require("../presentation");

var Comment = _presentation.Comment;
var CreateComment = _presentation.CreateComment;
var styles = _interopRequire(require("./styles"));

// import superagent from 'superagent'
var APIManager = require("../../utils").APIManager;
var actions = _interopRequire(require("../../actions/actions"));

var connect = require("react-redux").connect;
var Comments = (function (Component) {
    function Comments() {
        _classCallCheck(this, Comments);

        _get(Object.getPrototypeOf(Comments.prototype), "constructor", this).call(this);
        this.checkForComments = this.checkForComments.bind(this);
        this.state = {
            commentsLoaded: false,
            index: 0
        };
    }

    _inherits(Comments, Component);

    _prototypeProperties(Comments, null, {
        submitComment: {

            // componentDidMount(){
            // console.log('Comments componentDidMount: ')
            // let zone = this.props.zones[this.props.index]

            // if (zone == null) {
            //     console.log('NO SELECTED ZONE!!!!')
            //     return
            // }

            // APIManager.get('/api/comment', {zone:zone._id}, (err, response) => {
            //     if (err) {
            //         alert('ERROR: '+err.message)
            //         return
            //     }
            //     console.log(JSON.stringify(response))
            //     var results = response.results
            //     // this.setState({
            //     //     list: results
            //     // })
            //     this.props.commentsReceived(results)
            // })
            // }

            value: function submitComment(comment) {
                var _this = this;
                if (this.props.user == null) {
                    alert("please sign up or log in to add comments");
                    return;
                }

                var updatedComment = Object.assign({}, comment);

                var zone = this.props.zones[this.props.index];
                updatedComment.zone = zone._id;
                updatedComment.username = this.props.user.username;
                updatedComment.author = {
                    username: this.props.user.username,
                    id: this.props.user._id,
                    image: this.props.user.image
                };

                console.log("to submitComment this" + JSON.stringify(updatedComment));

                APIManager.post("/api/comment", updatedComment, function (err, response) {
                    if (err) {
                        alert("ERROR: " + err.message);
                        return;
                    }
                    // console.log('submitComment: '+JSON.stringify(response))
                    var comment = response.result;

                    _this.props.commentCreated(comment);
                });
            },
            writable: true,
            configurable: true
        },
        checkForComments: {

            // updateUsername(event){
            //     let updatedComment = Object.assign({}, this.state.comment)
            //     updatedComment['username'] = event.target.value

            //     this.setState({
            //         comment: updatedComment  //comment['username'] = updatedComment
            //     })
            // }

            // updateBody(event){
            //     // console.log('updateComment: '+event.target.value)
            //     let updatedComment = Object.assign({}, this.state.comment)
            //     updatedComment['body'] = event.target.value
            //     this.setState({
            //         comment: updatedComment
            //     })
            // }

            // componentWillUpdate(){
            //     console.log('COMMENTS CONTAINER: componentWillUpdate: '+this.state.index+' == '+this.props.index+'?')
            // } 

            value: function checkForComments() {
                var zone = this.props.zones[this.props.index];
                if (zone == null) {
                    console.log("NO SELECTED ZONE!!!!");
                    return;
                }

                var commentsArray = this.props.commentsMap[zone._id];
                if (commentsArray != null) {
                    //COMMENTS HAVE BEEN ALREADY LOADED, NO NEED TO CALL API
                    return;
                }this.props.fetchComments({ zone: zone._id });
            },
            writable: true,
            configurable: true
        },
        componentDidMount: {
            value: function componentDidMount() {
                this.checkForComments();
            },
            writable: true,
            configurable: true
        },
        componentDidUpdate: {
            value: function componentDidUpdate() {
                this.checkForComments();
            },
            writable: true,
            configurable: true
        },
        updateComment: {
            value: function updateComment(comment, updatedBody) {
                console.log("update comment: " + comment._id + ", " + updatedBody);
                this.props.updateComment(comment, { body: updatedBody });
            },
            writable: true,
            configurable: true
        },
        render: {
            value: function render() {
                var _this = this;
                var selectedZone = this.props.zones[this.props.index];
                var currentUser = this.props.user; // null if not logged in

                var zoneName = null;
                var commentList = null;

                if (selectedZone != null) {
                    zoneName = selectedZone.name;

                    var zoneComments = this.props.commentsMap[selectedZone._id];
                    // console.log('SELECTED ZONE ID ='+selectedZone._id)
                    // console.log('COMMENTS MAP ='+JSON.stringify(this.props.commentsMapn))
                    if (zoneComments != null) {
                        commentList = zoneComments.map(function (comment, i) {
                            // console.log('Comment = '+comment.body)
                            var editable = false;
                            if (currentUser != null) {
                                // if (currentUser._id == comment.author.id)
                                //    editable = true
                                editable = currentUser._id == comment.author.id;
                            }
                            return React.createElement(
                                "li",
                                { key: i },
                                React.createElement(Comment, { onUpdate: _this.updateComment.bind(_this), isEditable: editable, currentComment: comment })
                            );
                        });
                    }
                }

                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "h2",
                        null,
                        zoneName
                    ),
                    React.createElement(
                        "div",
                        { style: styles.comment.commentsBox },
                        React.createElement(
                            "ul",
                            { style: styles.comment.commentsList },
                            commentList
                        ),
                        React.createElement(CreateComment, { onCreate: this.submitComment.bind(this) })
                    )
                );
            },
            writable: true,
            configurable: true
        }
    });

    return Comments;
})(Component);

var stateToProps = function (state) {
    return {
        commentsMap: state.comment.map,
        // comments: state.comment.list,
        commentsLoaded: state.comment.commentsLoaded,
        index: state.zone.selectedZone,
        zones: state.zone.list,
        user: state.account.user
        // comment: state.comment.comment
    };
};

var dispatchToProps = function (dispatch) {
    return {
        fetchComments: function (params) {
            return dispatch(actions.fetchComments(params));
        },
        commentsReceived: function (comments, zone) {
            return dispatch(actions.commentsReceived(comments, zone));
        },
        commentCreated: function (comment) {
            return dispatch(actions.commentCreated(comment));
        },
        updateComment: function (comment, params) {
            return dispatch(actions.updateComment(comment, params));
        }
    };
};

module.exports = connect(stateToProps, dispatchToProps)(Comments);
// this.props.commentsReceived([comment], zone)
//this.props.fetchComments(zone._id)
// APIManager.get('/api/comment', {zone:zone._id}, (err, response) => {
//     if (err) {
//         alert('ERROR: '+err.message)
//         return
//     }

//     let comments = response.results
//     this.props.commentsReceived(comments, zone)
// })