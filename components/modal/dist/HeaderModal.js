"use strict";
exports.__esModule = true;
var getFolder_1 = require("@/api/folder/getFolder");
var check_svg_1 = require("@/public/images/check.svg");
var react_query_1 = require("@tanstack/react-query");
var react_1 = require("react");
var HeaderModal_module_css_1 = require("./HeaderModal.module.css");
function HeaderModal(_a) {
    var setOpenModal = _a.setOpenModal, inputLink = _a.inputLink;
    var _b = react_1.useState(""), clickedFolderName = _b[0], setClickedFolderName = _b[1];
    var _c = react_1.useState(false), isAdd = _c[0], setIsAdd = _c[1];
    var queryClient = react_query_1.useQueryClient();
    var _d = react_query_1.useQuery({
        queryKey: ["authFolderList"],
        queryFn: function () { return getFolder_1.getFolders(); }
    }), folderMenuList = _d.data, isLoading = _d.isLoading, isError = _d.isError;
    var handleClick = function (folderName) {
        setIsAdd(!isAdd);
        setClickedFolderName(folderName);
    };
    var modalRef = react_1.useRef(null);
    // const createLinkMutation = useMutation({
    //   mutationKey: ["postLink"],
    //   mutationFn: (data: postLink) => postLink(data),
    //   onSettled: () => {
    //     queryClient.invalidateQueries({ queryKey: ["authFolderList"] });
    //   },
    // });
    if (isLoading)
        return react_1["default"].createElement("p", { className: HeaderModal_module_css_1["default"].loading }, "Loadig..");
    if (isError)
        return react_1["default"].createElement("p", null, "Error...");
    var selectedItem = folderMenuList.find(function (ele) { return ele.name === clickedFolderName; });
    // const handleCreateLink = () => {
    //   {
    //     createLinkMutation.mutate(
    //       {
    //         data: {
    //           url: inputLink,
    //           folderId: selectedItem.id,
    //         },
    //       },
    //       {
    //         onSuccess: () => {
    //           setOpenModal(false);
    //         },
    //       }
    //     );
    //   }
    // };
    return (react_1["default"].createElement("div", { className: HeaderModal_module_css_1["default"].container },
        react_1["default"].createElement("div", { className: HeaderModal_module_css_1["default"].modal__container, ref: modalRef },
            folderMenuList.map(function (item) {
                var id = item.id, name = item.name, link_count = item.link_count;
                return (react_1["default"].createElement("li", { key: id, className: HeaderModal_module_css_1["default"].links, onClick: function () { return handleClick(name); } },
                    react_1["default"].createElement("div", { className: HeaderModal_module_css_1["default"].links__wrapper },
                        react_1["default"].createElement("span", { className: isAdd && name === clickedFolderName
                                ? HeaderModal_module_css_1["default"].folder_link_name
                                : "" }, name),
                        react_1["default"].createElement("span", { className: HeaderModal_module_css_1["default"].link_count },
                            link_count,
                            "\uAC1C\uB9C1\uD06C")),
                    isAdd && name === clickedFolderName && react_1["default"].createElement(check_svg_1["default"], null)));
            }),
            react_1["default"].createElement("button", { className: HeaderModal_module_css_1["default"].button, onClick: function () { return handleCreateLink(); } }, "\uCD94\uAC00\uD558\uAE30"))));
}
exports["default"] = HeaderModal;
