"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var useModalMutation_1 = require("@/hooks/useModalMutation");
var ModalLayout_1 = require("@/layout/ModalLayout");
var check_svg_1 = require("@/public/images/check.svg");
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var CancelButton = styled_components_1["default"].button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n  border-radius: 9999px;\n  top: 15px;\n  right: 20px;\n  border: 1px solid white;\n  cursor: pointer;\n  background: transparent;\n  color: white;\n  background-color: black;\n"], ["\n  position: absolute;\n  border-radius: 9999px;\n  top: 15px;\n  right: 20px;\n  border: 1px solid white;\n  cursor: pointer;\n  background: transparent;\n  color: white;\n  background-color: black;\n"])));
var Title = styled_components_1["default"].p(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  font-size: 1rem;\n"], ["\n  font-size: 1rem;\n"])));
var Link = styled_components_1["default"].li(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 100%;\n  display: flex;\n  align-items: center;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  justify-content: space-between;\n  &:hover {\n    background-color: var(--background);\n  }\n"], ["\n  width: 100%;\n  display: flex;\n  align-items: center;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  justify-content: space-between;\n  &:hover {\n    background-color: var(--background);\n  }\n"])));
var LinkInnerContainer = styled_components_1["default"].div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  column-gap: 0.7rem;\n"], ["\n  display: flex;\n  column-gap: 0.7rem;\n"])));
var LinkCount = styled_components_1["default"].span(templateObject_5 || (templateObject_5 = __makeTemplateObject([""], [""])));
var FolderLinkName = styled_components_1["default"].span(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  color: ", ";\n"], ["\n  color: ",
    ";\n"])), function (props) {
    return props.isActive ? "var(--Linkbrary-primary-color, #6d6afe)" : "inherit";
});
function LinkModal(_a) {
    var data = _a.data, inputLink = _a.inputLink, setLinkOpenModal = _a.setLinkOpenModal;
    var _b = react_1.useState(""), clickedFolderName = _b[0], setClickedFolderName = _b[1];
    var _c = react_1.useState(false), isAdd = _c[0], setIsAdd = _c[1];
    var createLinkMutation = useModalMutation_1["default"]().createLinkMutation;
    var handleCloseModal = function () {
        setLinkOpenModal(false);
    };
    var selectedItem = data === null || data === void 0 ? void 0 : data.find(function (ele) { return ele.name === clickedFolderName; });
    console.log("selectedItem", selectedItem);
    //   const handleCreateLink = () => {
    //     {
    //       createLinkMutation.mutate(
    //         {
    //           data: {
    //             url: inputLink,
    //             folderId: selectedItem.id,
    //           },
    //         },
    //         {
    //           onSuccess: () => {
    //             setLinkOpenModal(false);
    //           },
    //         }
    //       );
    //     }
    //   };
    var handleCheck = function (name) {
        setClickedFolderName(name);
    };
    return (React.createElement(ModalLayout_1["default"], null,
        React.createElement(CancelButton, { onClick: handleCloseModal }, "X"),
        React.createElement(Title, null, "\uD3F4\uB354\uC5D0\uCD94\uAC00"),
        React.createElement("p", null, inputLink), data === null || data === void 0 ? void 0 :
        data.map(function (item) {
            var id = item.id, name = item.name, link_count = item.link_count;
            return (React.createElement(Link, { key: id, role: "button", onClick: function () { return handleCheck(name); } },
                React.createElement(LinkInnerContainer, null,
                    React.createElement(FolderLinkName, { isActive: isAdd && name === clickedFolderName }, name),
                    React.createElement(LinkCount, null,
                        link_count,
                        "\uAC1C\uB9C1\uD06C")),
                isAdd && name === clickedFolderName && React.createElement(check_svg_1["default"], null)));
        })));
}
exports["default"] = LinkModal;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
