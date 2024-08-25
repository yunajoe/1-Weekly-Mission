"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var deleteFolder_1 = require("@/api/folder/deleteFolder");
var putFolder_1 = require("@/api/folder/putFolder");
var postLinks_1 = require("@/api/link/postLinks");
var react_query_1 = require("@tanstack/react-query");
var router_1 = require("next/router");
var postFolder_1 = require("./../api/folder/postFolder");
function useModalMutation() {
    var _this = this;
    var router = router_1.useRouter();
    var queryClient = react_query_1.useQueryClient();
    var createFolderMutation = react_query_1.useMutation({
        mutationKey: ["createFolder"],
        mutationFn: function (data) { return postFolder_1.postFolder(data); },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["authFolderList"] });
        },
        onSuccess: function (data) {
            var folderId = data[0].id;
            router.push("/folder/" + folderId);
        },
        onError: function (err, data, context) {
            console.log("err", err);
        }
    });
    var deleteFolderMutation = react_query_1.useMutation({
        mutationKey: ["deleteFolder"],
        mutationFn: function (folderId) { return deleteFolder_1.deleteFolder(folderId); },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["authFolderList"] });
        }
    });
    var editFolderMutation = react_query_1.useMutation({
        mutationKey: ["editFolder", 1],
        mutationFn: function (data) { return putFolder_1.putFolder(data); },
        onMutate: function (data) { return __awaiter(_this, void 0, void 0, function () {
            var previousData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryClient.cancelQueries({
                            queryKey: ["authFolderList"]
                        })];
                    case 1:
                        _a.sent();
                        previousData = queryClient.getQueryData(["authFolderList"]);
                        return [2 /*return*/, { previousData: previousData }];
                }
            });
        }); },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["authFolderList"] });
        },
        onSuccess: function (data) {
            console.log("Data", data);
        },
        onError: function (err, data, context) {
            console.log("err", err);
        }
    });
    var createLinkMutation = react_query_1.useMutation({
        mutationKey: ["postLink"],
        mutationFn: function (data) { return postLinks_1.postLink(data); },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["authFolderList"] });
        }
    });
    // const deleteLinkMutation = useMutation({
    //   mutationKey: ["deleteLink"],
    //   mutationFn: (linkId: number) => deleteLink(linkId),
    //   // onSettled: () => {
    //   //   queryClient.invalidateQueries({ queryKey: ["FolderLink", Number(id)] });
    //   // },
    // });d
    return {
        createFolderMutation: createFolderMutation,
        editFolderMutation: editFolderMutation,
        deleteFolderMutation: deleteFolderMutation,
        createLinkMutation: createLinkMutation
    };
}
exports["default"] = useModalMutation;
