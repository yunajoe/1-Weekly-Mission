"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var styled_components_1 = require("styled-components");
var Container = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.4);\n  z-index: 1;\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.4);\n  z-index: 1;\n"])));
var ModalContainer = styled_components_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background-color: #fff;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  row-gap: 1.5rem;\n  width: 380px;\n  padding: 2rem;\n  border-radius: 10px;\n"], ["\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background-color: #fff;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  row-gap: 1.5rem;\n  width: 380px;\n  padding: 2rem;\n  border-radius: 10px;\n"])));
function ModalLayout(_a) {
    var children = _a.children;
    return (React.createElement(Container, null,
        React.createElement(ModalContainer, null, children)));
}
exports["default"] = ModalLayout;
var templateObject_1, templateObject_2;
