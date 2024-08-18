"use strict";
exports.__esModule = true;
var document_1 = require("next/document");
function Document() {
    return (React.createElement(document_1.Html, { lang: "ko" },
        React.createElement("script", { defer: true, src: "https://developers.kakao.com/sdk/js/kakao.min.js" }),
        React.createElement(document_1.Head, null),
        React.createElement("body", null,
            React.createElement(document_1.Main, null),
            React.createElement(document_1.NextScript, null))));
}
exports["default"] = Document;
