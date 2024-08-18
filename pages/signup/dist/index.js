"use strict";
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
var signup_1 = require("@/api/auth/signup");
var checkEmail_1 = require("@/api/user/checkEmail");
var Input_1 = require("@/components/input/Input");
var logo_png_1 = require("@/public/images/logo.png");
var react_query_1 = require("@tanstack/react-query");
var image_1 = require("next/image");
var link_1 = require("next/link");
var router_1 = require("next/router");
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var SignUp_module_css_1 = require("./SignUp.module.css");
function SingUpPage() {
    var _this = this;
    var methods = react_hook_form_1.useForm();
    var _a = react_hook_form_1.useForm({
        mode: "all",
        criteriaMode: "all",
        defaultValues: {
            email: "",
            password: "",
            repassword: ""
        }
    }), register = _a.register, handleSubmit = _a.handleSubmit, watch = _a.watch, reset = _a.reset, errors = _a.formState.errors;
    var _b = react_1.useState(false), isEyeShow = _b[0], setIsEyeShow = _b[1];
    var _c = react_1.useState(false), isReEyeShow = _c[0], setIsReEyeShow = _c[1];
    var _d = react_1.useState("password"), passwordType = _d[0], setPasswordType = _d[1];
    var _e = react_1.useState("password"), repasswordType = _e[0], setRepasswordType = _e[1];
    var watchEmail = watch("email");
    var watchPassword = watch("password");
    var watchRePassword = watch("repassword");
    var router = router_1.useRouter();
    var handlePassWordClick = function () {
        setIsEyeShow(!isEyeShow);
        setPasswordType(function (prevType) {
            return prevType === "password" ? "text" : "password";
        });
    };
    var handleRePassWordClick = function () {
        setIsReEyeShow(!isReEyeShow);
        setRepasswordType(function (prevType) {
            return prevType === "password" ? "text" : "password";
        });
    };
    var signupMutation = react_query_1.useMutation({
        mutationKey: ["signup"],
        mutationFn: function (data) { return signup_1.SignUp(data); }
    });
    var onSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!watchEmail || !watchPassword || !watchRePassword) {
                        alert("빈값이 있으면 안됩니다");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, checkEmail_1.CheckEmail({
                            email: watchEmail
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    alert(error_1.response.data.message);
                    return [3 /*break*/, 4];
                case 4:
                    signupMutation.mutate({
                        email: watchEmail,
                        password: watchPassword
                    }, {
                        onSuccess: function (data) {
                            reset({
                                email: "",
                                password: "",
                                repassword: ""
                            });
                            var myAccessToken = data.accessToken;
                            var myRefreshToken = data.refreshToken;
                            localStorage.setItem("myAccessToken", myAccessToken);
                            localStorage.setItem("myRefreshToken", myRefreshToken);
                            router.push("/folder");
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(react_hook_form_1.FormProvider, __assign({}, methods),
        React.createElement("div", { className: SignUp_module_css_1["default"].container },
            React.createElement("div", { className: SignUp_module_css_1["default"].link__container },
                React.createElement("div", null,
                    React.createElement(image_1["default"], { src: logo_png_1["default"], alt: "logo" })),
                React.createElement("div", { className: SignUp_module_css_1["default"].link__container__text },
                    React.createElement("p", null, "\uC774\uBBF8 \uD68C\uC6D0\uC774\uC2E0\uAC00\uC694?"),
                    React.createElement(link_1["default"], { href: "/signin", className: SignUp_module_css_1["default"].link__container__link }, "\uB85C\uADF8\uC778\uD558\uAE30"))),
            React.createElement("form", { className: SignUp_module_css_1["default"].form__container, onSubmit: handleSubmit(onSubmit) },
                React.createElement(Input_1["default"], { type: "text", errors: errors, label: "email", name: "email", register: register, placeholder: "\uC774\uBA54\uC77C\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694", required: { value: true, message: "이메일을 입력해 주세요" }, minLength: { value: 3, message: "최소 3글자를 입력해주세요" }, pattern: {
                        value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/gm,
                        message: "유효한 이메일이 아닙니다"
                    } }),
                React.createElement(Input_1["default"], { type: passwordType, errors: errors, label: "password", name: "password", register: register, placeholder: "\uC601\uBB38, \uC22B\uC790\uB97C \uC870\uD569\uD574 8\uC790 \uC774\uC0C1 \uC785\uB825\uD574 \uC8FC\uC138\uC694", required: { value: true, message: "비밀번호를 입력해주세요" }, pattern: {
                        value: /^(?=.*\d)(?=.*[a-zA-Z]).{3,}$/gm,
                        message: "비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요"
                    }, isEyeShow: isEyeShow, onClick: handlePassWordClick, watchPassword: watchPassword }),
                React.createElement(Input_1["default"], { type: repasswordType, errors: errors, label: "repassword", name: "repassword", register: register, placeholder: "\uBE44\uBC00\uBC88\uD638\uC640 \uC77C\uCE58\uD558\uB294 \uAC12\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694", required: { value: true, message: "비밀번호를 입력해주세요" }, isReEyeShow: isReEyeShow, onClick: handleRePassWordClick, watchRePassword: watchRePassword }),
                React.createElement("button", { className: SignUp_module_css_1["default"].login__button, type: "submit" }, "\uD68C\uC6D0\uAC00\uC785"),
                React.createElement("div", { className: SignUp_module_css_1["default"].social__login },
                    React.createElement("p", null, "\uB2E4\uB978\uBC29\uC2DD\uC73C\uB85C \uAC00\uC785\uD558\uAE30"),
                    React.createElement("div", { className: SignUp_module_css_1["default"].social__login__images },
                        React.createElement(link_1["default"], { href: "https://www.google.com" },
                            React.createElement(image_1["default"], { src: "/images/google-oauth.png", alt: "google", width: 40, height: 40 })),
                        React.createElement(link_1["default"], { href: "https://www.kakao.com" },
                            React.createElement(image_1["default"], { src: "/images/kakao-oauth.png", alt: "kakao", width: 40, height: 40 }))))))));
}
exports["default"] = SingUpPage;
