"use strict";
exports.__esModule = true;
var putLinks_1 = require("@/api/link/putLinks");
var Card_1 = require("@/components/card/Card");
var kebab_png_1 = require("@/public/images/kebab.png");
var caltime_1 = require("@/utils/caltime");
var react_query_1 = require("@tanstack/react-query");
var image_1 = require("next/image");
var link_1 = require("next/link");
var react_1 = require("react");
var DropDown_1 = require("../dropdown/DropDown");
var DataListItem_module_css_1 = require("./DataListItem.module.css");
function DataListItem(_a) {
    var item = _a.item, linkList = _a.linkList;
    var _b = react_1.useState(false), open = _b[0], setOpen = _b[1];
    var _c = react_1.useState(false), isStarClick = _c[0], setIsStarClick = _c[1];
    var _d = react_1.useState(""), targetUrl = _d[0], setTargetUrl = _d[1];
    var id = item.id, url = item.url, title = item.title, image_source = item.image_source, description = item.description, created_at = item.created_at;
    var targetData = caltime_1.parseDatestring(created_at);
    var year = targetData.year, month = targetData.month, day = targetData.day;
    var diffTime = caltime_1.getElapsedTime(created_at);
    var imageRef = react_1.useRef(null);
    var handleClose = function () {
        setOpen(!open);
    };
    var changeLinktoFavoriteMutation = react_query_1.useMutation({
        mutationKey: ["putLink"],
        mutationFn: function (data) { return putLinks_1.putLink(data); }
    });
    var handleStarClick = function () {
        setIsStarClick(!isStarClick);
    };
    var handleChangeLinktoFavorite = function () {
        if (isStarClick && item.url === targetUrl) {
            var targetItem = linkList.find(function (item) { return item.url === targetUrl; });
            changeLinktoFavoriteMutation.mutate({
                linkId: targetItem.id,
                data: {
                    favorite: true
                }
            });
        }
        else if (!isStarClick && item.url === targetUrl) {
            var targetItem = linkList.find(function (item) { return item.url === targetUrl; });
            changeLinktoFavoriteMutation.mutate({
                linkId: targetItem.id,
                data: {
                    favorite: false
                }
            });
        }
    };
    react_1.useEffect(function () {
        handleChangeLinktoFavorite();
    }, [isStarClick]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Card_1["default"], null,
            React.createElement("div", { className: DataListItem_module_css_1["default"].container },
                React.createElement("div", { className: DataListItem_module_css_1["default"].card__image__container },
                    React.createElement("div", { className: DataListItem_module_css_1["default"].star, onClick: function () {
                            setTargetUrl(url);
                            setIsStarClick(!isStarClick);
                        } },
                        React.createElement(image_1["default"], { src: isStarClick ? "/images/blue-star.svg" : "/images/star.svg", alt: "", width: 30, height: 30 })),
                    React.createElement(link_1["default"], { href: url },
                        React.createElement("img", { className: DataListItem_module_css_1["default"].card__image, src: image_source !== null && image_source !== void 0 ? image_source : "/images/card-default.png", alt: title }))),
                React.createElement("div", { className: DataListItem_module_css_1["default"].item__contents__container },
                    React.createElement("div", null,
                        React.createElement("div", { className: DataListItem_module_css_1["default"].sub__container },
                            React.createElement("p", null, diffTime),
                            React.createElement(image_1["default"], { ref: imageRef, src: kebab_png_1["default"], alt: "kebab", className: DataListItem_module_css_1["default"].kebab, onClick: function (e) {
                                    e.stopPropagation();
                                    setOpen(!open);
                                } }),
                            open && (React.createElement(DropDown_1["default"], { linkList: linkList, linkUrl: url, closeFunc: handleClose }))),
                        React.createElement("p", null, description)),
                    React.createElement("p", null,
                        year,
                        ". ",
                        month,
                        ". ",
                        day))))));
}
exports["default"] = DataListItem;
