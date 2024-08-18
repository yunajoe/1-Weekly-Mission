"use strict";
exports.__esModule = true;
var CreateModal_1 = require("@/components/modal/CreateModal");
var useModalMutation_1 = require("@/hooks/useModalMutation");
var plus_svg_1 = require("@/public/images/plus.svg");
var react_query_1 = require("@tanstack/react-query");
var router_1 = require("next/router");
var react_1 = require("react");
var Button_1 = require("../button/Button");
var FolderMenuList_module_css_1 = require("./FolderMenuList.module.css");
function FolderMenuList(_a) {
    var folderMenuList = _a.folderMenuList, folderId = _a.folderId;
    var router = router_1.useRouter();
    var _b = react_1.useState(""), createFolderName = _b[0], setCreateFolderName = _b[1];
    var _c = react_1.useState(""), openCreateModal = _c[0], setOpenCreateModal = _c[1];
    var createFolderMutation = useModalMutation_1["default"]().createFolderMutation;
    var queryClient = react_query_1.useQueryClient();
    var handleModal = function () {
        setOpenCreateModal("add");
    };
    var handleChange = function (e) {
        setCreateFolderName(e.target.value);
    };
    var handleCreateFolder = function () {
        createFolderMutation.mutate({
            data: {
                name: createFolderName
            }
        }, {
            onSuccess: function () {
                setOpenCreateModal("");
                setCreateFolderName("");
                queryClient.invalidateQueries({ queryKey: ["authFolderList"] });
            }
        });
    };
    return (React.createElement("div", { className: FolderMenuList_module_css_1["default"].container },
        React.createElement("div", { className: FolderMenuList_module_css_1["default"].sub__container }, folderMenuList === null || folderMenuList === void 0 ? void 0 : folderMenuList.map(function (item) {
            var id = item.id, name = item.name;
            var isActive = false;
            if (id === Number(folderId)) {
                isActive = true;
            }
            return (React.createElement(Button_1["default"], { isActive: isActive, onClick: function () {
                    if (id === 0) {
                        router.push("/folder");
                        return;
                    }
                    router.push("/folder/" + id);
                }, key: id }, name));
        })),
        React.createElement("div", { className: FolderMenuList_module_css_1["default"].add__folder__button },
            React.createElement(Button_1["default"], { onClick: handleModal }, "\uD3F4\uB354\uCD94\uAC00"),
            React.createElement("div", { className: FolderMenuList_module_css_1["default"].plus_icon },
                React.createElement(plus_svg_1["default"], null))),
        openCreateModal && (React.createElement(CreateModal_1["default"], { tabName: "add", setTabName: setOpenCreateModal, createFolderName: createFolderName, handleChange: handleChange, onClick: handleCreateFolder }))));
}
exports["default"] = FolderMenuList;
