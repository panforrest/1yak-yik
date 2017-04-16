"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// <h2>{this.state.currentComment.username}</h2>  //SHOULD BE props NOT state
//<img src=ImageHelper.thumbnail({author.image}, 44) />
var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Link = require("react-router").Link;
var ImageHelper = require("../../utils").ImageHelper;
var connect = require("react-redux").connect;
var actions = _interopRequire(require("../../actions/actions"));

var Comment = (function (Component) {
    function Comment() {
        _classCallCheck(this, Comment);

        _get(Object.getPrototypeOf(Comment.prototype), "constructor", this).call(this);
        this.state = {
            isEditing: false,
            updated: {}
        };
    }

    _inherits(Comment, Component);

    _prototypeProperties(Comment, null, {
        toggleEdit: {
            value: function toggleEdit(event) {
                event.preventDefault();
                // console.log('EDIT: ')
                this.setState({
                    isEditing: !this.state.isEditing
                });
            },
            writable: true,
            configurable: true
        },
        componentDidUpdate: {
            value: function componentDidUpdate() {
                console.log("isEditing: " + this.state.isEditing);
            },
            writable: true,
            configurable: true
        },
        update: {
            value: function update(event) {
                console.log("update:" + event.target.id + " == " + event.target.value);
                this.setState({
                    updated: event.target.value
                });
            },
            writable: true,
            configurable: true
        },
        submitBody: {

            //    const endpoint = '/api/comment/'+comment._id
            // APIManager.put(endpoint, this.state.updatedComment, (err, response) => {
            // 	if (err) {
            // 		alert(err)
            // 		return
            // 	}
            // 	console.log('update:'+JSON.stringify(response))
            // })
            value: function submitBody(event) {
                console.log("submitBody: " + JSON.stringify(this.state.updated));
                if (Object.keys(this.state.updated).length == 0) {
                    //if (Object.keys(this.props.user).length == 0){
                    alert("No Changes Made!!");
                    return;
                }

                this.props.updateComment(this.props.body, this.state.updated);
            },
            writable: true,
            configurable: true
        },
        render: {
            value: function render() {
                var currentComment = this.props.currentComment;
                var author = currentComment.author;
                var radius = 16;

                var content = null;
                if (this.state.isEditing == true) {
                    content = React.createElement(
                        "div",
                        null,
                        React.createElement("textarea", { onChange: this.update.bind(this), defaultValue: currentComment.body, style: { width: 100 + "%" }, id: "body" }),
                        React.createElement("br", null),
                        React.createElement("img", { style: { borderRadius: radius, marginRight: 6 }, src: ImageHelper.thumbnail(author.image, radius * 2) }),
                        React.createElement(
                            "span",
                            { style: { fontWeight: 200 } },
                            React.createElement(
                                Link,
                                { to: "/profile/" + author.username },
                                author.username
                            )
                        ),
                        React.createElement(
                            "span",
                            { style: { fontWeight: 200, marginLeft: 12, marginRight: 12 } },
                            "|"
                        ),
                        React.createElement(
                            "span",
                            { style: { fontWeight: 200 } },
                            currentComment.timestamp
                        ),
                        React.createElement(
                            "button",
                            { onClick: this.submitBody.bind(this) },
                            "Done"
                        ),
                        React.createElement("hr", null),
                        React.createElement("br", null)
                    );
                } else {
                    content = React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "p",
                            { style: { fontSize: 20, fontWeight: 400 } },
                            currentComment.body,
                            React.createElement("br", null)
                        ),
                        React.createElement("img", { style: { borderRadius: radius, marginRight: 6 }, src: ImageHelper.thumbnail(author.image, radius * 2) }),
                        React.createElement(
                            "span",
                            { style: { fontWeight: 200 } },
                            React.createElement(
                                Link,
                                { to: "/profile/" + author.username },
                                author.username
                            )
                        ),
                        React.createElement(
                            "span",
                            { style: { fontWeight: 200, marginLeft: 12, marginRight: 12 } },
                            "|"
                        ),
                        React.createElement(
                            "span",
                            { style: { fontWeight: 200 } },
                            currentComment.timestamp
                        ),
                        React.createElement(
                            "button",
                            { onClick: this.toggleEdit.bind(this) },
                            "Edit"
                        ),
                        React.createElement("hr", null),
                        React.createElement("br", null)
                    );
                }

                return React.createElement(
                    "div",
                    null,
                    content
                );
            },
            writable: true,
            configurable: true
        }
    });

    return Comment;
})(Component);

var stateToProps = function (state) {
    return {
        comment: state.comment.comment
    };
};

var dispatchToProps = function (dispatch) {
    return {
        updateComment: function (comment) {
            return dispatch(actions.updateComment(comment));
        }
    };
};

module.exports = connect(stateToProps, dispatchToProps)(Comment);