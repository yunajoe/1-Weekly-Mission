"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var ModalCancelButton_1 = require("@/components/button/ModalCancelButton");
var modal_1 = require("@/consts/modal");
var useCopyClipBoard_1 = require("@/hooks/useCopyClipBoard");
var useKaKao_1 = require("@/hooks/useKaKao");
var ModalLayout_1 = require("@/layout/ModalLayout");
var constant_1 = require("@/utils/constant");
var image_1 = require("next/image");
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var Title = styled_components_1["default"].p(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font-size: 1.8rem;\n  margin-top: 10px;\n  margin-bottom: 10px;\n"], ["\n  font-size: 1.8rem;\n  margin-top: 10px;\n  margin-bottom: 10px;\n"])));
var Folder = styled_components_1["default"].p(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin-bottom: 30px;\n"], ["\n  margin-bottom: 30px;\n"])));
var ImageContainer = styled_components_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  column-gap: 30px;\n  background-color: white;\n  width: 80%;\n"], ["\n  display: flex;\n  justify-content: center;\n  column-gap: 30px;\n  background-color: white;\n  width: 80%;\n"])));
var Button = styled_components_1["default"].div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  cursor: pointer;\n"], ["\n  cursor: pointer;\n"])));
function ShareModal(_a) {
    var folderId = _a.folderId, folderName = _a.folderName, tabName = _a.tabName, setTabName = _a.setTabName;
    var title = modal_1.modalObj[tabName][0];
    var shareLink = window.location.origin + "/folder/" + folderId;
    var _b = useCopyClipBoard_1["default"](), copyToClipboard = _b[0], setCopyToClipboard = _b[1];
    var shareKaKao = useKaKao_1["default"]();
    var onClickKaKao = function () {
        shareKaKao(__assign({ url: shareLink }, constant_1.KAKAO_SHARE_DATA));
    };
    var onClickFaceBook = function () {
        return window.open("http://www.facebook.com/sharer.php?u=" + shareLink);
    };
    var onClickLinkCopy = react_1.useCallback(function () {
        copyToClipboard(shareLink);
    }, [shareLink, copyToClipboard]);
    return (React.createElement(ModalLayout_1["default"], null,
        React.createElement(ModalCancelButton_1["default"], { setTabName: setTabName }),
        React.createElement(Title, null, title),
        React.createElement(Folder, null, folderName),
        React.createElement(ImageContainer, null,
            React.createElement(Button, { role: "button", onClick: onClickKaKao },
                React.createElement(image_1["default"], { src: "/images/kakao-oauth.png", alt: "kakao", width: 40, height: 40 })),
            React.createElement(Button, { role: "button", onClick: onClickFaceBook },
                React.createElement(image_1["default"], { src: "/images/face.png", alt: "facebook", width: 40, height: 40 })),
            React.createElement(Button, { role: "button", onClick: onClickLinkCopy },
                React.createElement(image_1["default"], { src: "/images/share.png", alt: "share", width: 40, height: 40 })))));
}
exports["default"] = ShareModal;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
