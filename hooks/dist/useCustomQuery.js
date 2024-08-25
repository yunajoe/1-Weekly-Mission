"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var getFolder_1 = require("@/api/folder/getFolder");
var getFolderLinks_1 = require("@/api/link/getFolderLinks");
var getUser_1 = require("@/api/user/getUser");
var react_query_1 = require("@tanstack/react-query");
function useCustomQuery(folderId) {
    var AuthUserQuery = react_query_1.useQuery({
        queryKey: ["authUser"],
        queryFn: function () { return getUser_1.getUser(); }
    });
    var AuthGetLink = react_query_1.useQuery({
        queryKey: ["FolderLink", folderId],
        queryFn: function () { return getFolderLinks_1.getFolderLinks(folderId); },
        enabled: !!AuthUserQuery
    });
    var wholeLinkList = AuthGetLink.data || [];
    var AuthFolderQuery = react_query_1.useQuery({
        queryKey: ["authFolderList", folderId],
        queryFn: function () { return getFolder_1.getFolders(); },
        enabled: !!AuthUserQuery && !!wholeLinkList,
        select: function (data) {
            return __spreadArrays([
                {
                    id: 0,
                    name: "전체",
                    link_count: wholeLinkList.length,
                    favorite: false
                }
            ], data);
        },
        staleTime: 0,
        refetchOnMount: "always",
        refetchOnReconnect: "always",
        refetchOnWindowFocus: "always"
    });
    return {
        AuthUserQuery: AuthUserQuery,
        AuthGetLink: AuthGetLink,
        wholeLinkList: wholeLinkList,
        AuthFolderQuery: AuthFolderQuery
    };
}
exports["default"] = useCustomQuery;
