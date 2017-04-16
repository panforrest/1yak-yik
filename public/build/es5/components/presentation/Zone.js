"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// <span>{numComments} comments</span>
var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var styles = _interopRequire(require("./styles"));

var Zone = (function (Component) {
	function Zone() {
		_classCallCheck(this, Zone);

		if (Component != null) {
			Component.apply(this, arguments);
		}
	}

	_inherits(Zone, Component);

	_prototypeProperties(Zone, null, {
		onSelectTitle: {
			value: function onSelectTitle(event) {
				event.preventDefault();
				console.log("onSelectTitle: " + this.props.index);
				this.props.select(this.props.index);
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var zoneStyle = styles.zone;
				var zipCode = this.props.currentZone.zipCodes[0]; //const zipCode = this.state.zone.zipCodes[0]
				var title = this.props.isSelected ? React.createElement(
					"a",
					{ style: zoneStyle.title, href: "#" },
					this.props.currentZone.name
				) : React.createElement(
					"a",
					{ href: "#" },
					this.props.currentZone.name
				);

				return React.createElement(
					"div",
					{ style: zoneStyle.container },
					React.createElement(
						"h2",
						{ onClick: this.onSelectTitle.bind(this), style: zoneStyle.header },
						title
					),
					React.createElement(
						"span",
						{ className: "detail" },
						zipCode
					),
					React.createElement("br", null),
					React.createElement(
						"span",
						{ className: "detail" },
						this.props.currentZone.numComments,
						" comments"
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Zone;
})(Component);

// const styles = {
// 	container: {
//         padding:16,
//         background:'#f9f9f9',
//         marginTop:12,
//         border:'1px solid #ddd'
// 	},
// 	header: {
// 		marginBottom:0
// 	},
// 	title: {
// 		textDecoration:'none',
// 		color:'red'
// 	}
// }

module.exports = Zone;