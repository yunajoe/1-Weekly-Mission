"use strict";
exports.__esModule = true;
var ChangeModal_1 = require("@/components/modal/ChangeModal");
var DeleteModal_1 = require("@/components/modal/DeleteModal");
var ShareModal_1 = require("@/components/modal/ShareModal");
var useCustomQuery_1 = require("@/hooks/useCustomQuery");
var useModalMutation_1 = require("@/hooks/useModalMutation");
var image_1 = require("next/image");
var router_1 = require("next/router");
var react_1 = require("react");
var FolderMenu_module_css_1 = require("./FolderMenu.module.css");
function FolderMenuBar(_a) {
    var _b;
    var data = _a.data;
    var _c = react_1.useState(""), tabName = _c[0], setTabName = _c[1];
    var _d = react_1.useState(""), changeFolderName = _d[0], setChangeFolderName = _d[1];
    var router = router_1.useRouter();
    var id = router.query.id;
    var folderId = id;
    var _e = useCustomQuery_1["default"](folderId), AuthUserQuery = _e.AuthUserQuery, AuthGetLink = _e.AuthGetLink, wholeLinkList = _e.wholeLinkList, AuthFolderQuery = _e.AuthFolderQuery;
    var folderName = !id
        ? "전체"
        : (_b = data === null || data === void 0 ? void 0 : data.filter(function (item) { return item.id === Number(id); })[0]) === null || _b === void 0 ? void 0 : _b.name;
    var _f = useModalMutation_1["default"](), editFolderMutation = _f.editFolderMutation, deleteFolderMutation = _f.deleteFolderMutation;
    var handleTab = function (e) {
        var altAttribute = e.target.alt;
        setTabName(altAttribute);
    };
    // 삭제
    var handleDeleteFolder = function (folderId) {
        deleteFolderMutation.mutate(folderId, {
            onSuccess: function () {
                router.push("/folder");
            }
        });
    };
    // 변경
    var handleChange = function (e) {
        setChangeFolderName(e.target.value);
    };
    var handleEditFolder = function () {
        editFolderMutation.mutate({
            folderId: Number(id),
            data: {
                name: changeFolderName
            }
        }, {
            onSuccess: function () {
                setTabName("");
                setChangeFolderName("");
                AuthUserQuery.refetch();
            }
        });
    };
    return (react_1["default"].createElement("div", { className: FolderMenu_module_css_1["default"].container },
        react_1["default"].createElement("p", { className: FolderMenu_module_css_1["default"].title }, folderName),
        react_1["default"].createElement("div", { className: FolderMenu_module_css_1["default"].images__container },
            react_1["default"].createElement("div", { className: FolderMenu_module_css_1["default"].tab_button, onClick: function (e) {
                    handleTab(e);
                } },
                react_1["default"].createElement(image_1["default"], { src: "/images/share.png", width: 40, height: 20, alt: "share" })),
            react_1["default"].createElement("div", { className: FolderMenu_module_css_1["default"].tab_button, onClick: function (e) {
                    handleTab(e);
                } },
                react_1["default"].createElement(image_1["default"], { src: "/images/namechange.png", width: 60, height: 20, alt: "change" })),
            react_1["default"].createElement("div", { className: FolderMenu_module_css_1["default"].tab_button, role: "button", onClick: function (e) {
                    handleTab(e);
                } },
                react_1["default"].createElement(image_1["default"], { src: "/images/delete.png", width: 40, height: 20, alt: "delete" }))),
        tabName === "change" && (react_1["default"].createElement(ChangeModal_1["default"], { tabName: tabName, setTabName: setTabName, changeFolderName: changeFolderName, handleChange: handleChange, onClick: handleEditFolder })),
        tabName === "delete" && (react_1["default"].createElement(DeleteModal_1["default"], { folderName: folderName, tabName: tabName, setTabName: setTabName, onClick: function () { return handleDeleteFolder(Number(id)); } })),
        tabName === "share" && (react_1["default"].createElement(ShareModal_1["default"], { folderId: folderId, folderName: folderName, tabName: tabName, setTabName: setTabName }))));
}
exports["default"] = FolderMenuBar;
