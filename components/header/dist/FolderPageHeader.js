"use strict";
exports.__esModule = true;
var LinkModal_1 = require("@/components/modal/LinkModal");
var FooterContext_1 = require("@/contexts/FooterContext");
var HeaderContext_1 = require("@/contexts/HeaderContext");
var useCustomQuery_1 = require("@/hooks/useCustomQuery");
var useObserver_1 = require("@/hooks/useObserver");
var link_svg_1 = require("@/public/images/link.svg");
var react_1 = require("react");
var FolderPageHeader_module_css_1 = require("./FolderPageHeader.module.css");
function FolderPageHeader() {
    var _a = react_1.useState(false), linkOpenModal = _a[0], setLinkOpenModal = _a[1];
    var _b = react_1.useState(""), inputLink = _b[0], setInputLink = _b[1];
    var _c = useCustomQuery_1["default"](), AuthUserQuery = _c.AuthUserQuery, AuthGetLink = _c.AuthGetLink, wholeLinkList = _c.wholeLinkList, AuthFolderQuery = _c.AuthFolderQuery;
    console.log("ㅎㅎㅎㅎㅎ", AuthFolderQuery.data);
    var handleOpenModal = function () {
        setLinkOpenModal(true);
    };
    var handleInput = function (e) {
        setInputLink(e.target.value);
    };
    var _d = useObserver_1["default"](), ref = _d.ref, isVisible = _d.isVisible;
    var _e = react_1.useContext(HeaderContext_1["default"]), isHeaderVisible = _e.isHeaderVisible, setIsHeaderVisible = _e.setIsHeaderVisible;
    var _f = react_1.useContext(FooterContext_1["default"]), isFooterVisible = _f.isFooterVisible, setIsFooterVisible = _f.setIsFooterVisible;
    react_1.useEffect(function () {
        setIsHeaderVisible(isVisible);
    }, [isVisible, setIsHeaderVisible]);
    if (isFooterVisible) {
        return (react_1["default"].createElement("div", { ref: ref, className: "" + FolderPageHeader_module_css_1["default"].container },
            react_1["default"].createElement("div", { className: FolderPageHeader_module_css_1["default"].button__container },
                react_1["default"].createElement("div", { className: FolderPageHeader_module_css_1["default"].input__container },
                    react_1["default"].createElement(link_svg_1["default"], null),
                    react_1["default"].createElement("input", { className: FolderPageHeader_module_css_1["default"].input, placeholder: "\uB9C1\uD06C\uB97C \uCD94\uAC00\uD574\uBCF4\uC138\uC694", onChange: handleInput })),
                react_1["default"].createElement("button", { className: FolderPageHeader_module_css_1["default"].add__button, onClick: handleOpenModal }, "\uCD94\uAC00\uD558\uAE30"),
                linkOpenModal && (react_1["default"].createElement(LinkModal_1["default"], { data: AuthFolderQuery.data, inputLink: inputLink, setLinkOpenModal: setLinkOpenModal })))));
    }
    return (react_1["default"].createElement("div", { ref: ref },
        react_1["default"].createElement("div", { className: FolderPageHeader_module_css_1["default"].container + " " + (!isHeaderVisible ? FolderPageHeader_module_css_1["default"].sticky : "") },
            react_1["default"].createElement("div", { className: FolderPageHeader_module_css_1["default"].button__container },
                react_1["default"].createElement("div", { className: FolderPageHeader_module_css_1["default"].input__container },
                    react_1["default"].createElement(link_svg_1["default"], null),
                    react_1["default"].createElement("input", { className: FolderPageHeader_module_css_1["default"].input, placeholder: "\uB9C1\uD06C\uB97C \uCD94\uAC00\uD574\uBCF4\uC138\uC694", onChange: handleInput })),
                react_1["default"].createElement("button", { className: FolderPageHeader_module_css_1["default"].add__button, onClick: handleOpenModal }, "\uCD94\uAC00\uD558\uAE30"),
                linkOpenModal && (react_1["default"].createElement(LinkModal_1["default"], { data: AuthFolderQuery.data, inputLink: inputLink, setLinkOpenModal: setLinkOpenModal }))))));
}
exports["default"] = FolderPageHeader;
