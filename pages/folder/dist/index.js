"use client";
"use strict";
exports.__esModule = true;
var DataList_1 = require("@/components/datalist/DataList");
var Footer_1 = require("@/components/footer/Footer");
var FolderPageHeader_1 = require("@/components/header/FolderPageHeader");
var FolderMenuBar_1 = require("@/components/menubar/FolderMenuBar");
var FolderNav_1 = require("@/components/nav/FolderNav");
var SearchBar_1 = require("@/components/searchbar/SearchBar");
var useCustomQuery_1 = require("@/hooks/useCustomQuery");
var FolderPageLayout_1 = require("@/layout/FolderPageLayout");
var FolderMenuList_1 = require("./../../components/foldermenulist/FolderMenuList");
function FolderPages() {
    var _a = useCustomQuery_1["default"](), AuthUserQuery = _a.AuthUserQuery, AuthGetLink = _a.AuthGetLink, wholeLinkList = _a.wholeLinkList, AuthFolderQuery = _a.AuthFolderQuery;
    var user = AuthUserQuery.data || [];
    var folderMenuList = AuthFolderQuery.data || [];
    if (AuthUserQuery.isError)
        return React.createElement("p", null, " Error...");
    return (React.createElement(FolderPageLayout_1["default"], { isLoading: AuthUserQuery.isLoading },
        React.createElement(FolderNav_1["default"], { userProfile: user }),
        React.createElement(FolderPageHeader_1["default"], null),
        React.createElement(SearchBar_1["default"], null),
        React.createElement(FolderMenuList_1["default"], { folderMenuList: folderMenuList, folderId: "0" }),
        React.createElement(FolderMenuBar_1["default"], { data: folderMenuList }),
        React.createElement(DataList_1["default"], { linkList: wholeLinkList }),
        React.createElement(Footer_1["default"], null)));
}
exports["default"] = FolderPages;
