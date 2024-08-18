"use strict";
exports.__esModule = true;
var Input_1 = require("@/components/input/Input");
var logo_png_1 = require("@/public/images/logo.png");
var image_1 = require("next/image");
var link_1 = require("next/link");
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var SignIn_module_css_1 = require("./SignIn.module.css");
var signin_1 = require("@/api/auth/signin");
var react_query_1 = require("@tanstack/react-query");
var router_1 = require("next/router");
function SingInPage() {
    var _a = react_hook_form_1.useForm({
        mode: "onBlur",
        criteriaMode: "all",
        defaultValues: {
            email: "",
            password: ""
        }
    }), register = _a.register, handleSubmit = _a.handleSubmit, watch = _a.watch, reset = _a.reset, errors = _a.formState.errors;
    var _b = react_1.useState(false), isEyeShow = _b[0], setIsEyeShow = _b[1];
    var _c = react_1.useState("password"), type = _c[0], setType = _c[1];
    var watchEmail = watch("email");
    var watchPassword = watch("password");
    var router = router_1.useRouter();
    var handleClick = function () {
        setIsEyeShow(!isEyeShow);
        setType(function (prev) { return (prev === "password" ? "text" : "password"); });
    };
    var signinMutation = react_query_1.useMutation({
        mutationKey: ["signin"],
        mutationFn: function (data) { return signin_1.SignIn(data); }
    });
    var onSubmit = function () {
        if (!watchEmail || !watchPassword) {
            alert("빈값이 있으면 안됩니다");
            return;
        }
        signinMutation.mutate({
            email: watchEmail,
            password: watchPassword
        }, {
            onSuccess: function (data) {
                var myAccessToken = data.accessToken;
                var myRefreshToken = data.refreshToken;
                if (myAccessToken) {
                    localStorage.setItem("myAccessToken", myAccessToken);
                    localStorage.setItem("myRefreshToken", myRefreshToken);
                    router.push("/folder");
                }
            },
            onError: function (err) {
                alert("회원이 아닙니다. 회원가입을 해주세요");
                reset({
                    email: "",
                    password: "",
                    repassword: ""
                });
                return;
            }
        });
    };
    return (React.createElement("div", { className: SignIn_module_css_1["default"].container },
        React.createElement("div", { className: SignIn_module_css_1["default"].link__container },
            React.createElement("div", null,
                React.createElement(image_1["default"], { src: logo_png_1["default"], alt: "logo" })),
            React.createElement("div", { className: SignIn_module_css_1["default"].link__container__text },
                React.createElement("p", null, "\uD68C\uC6D0\uC774 \uC544\uB2C8\uC2E0\uAC00\uC694?"),
                React.createElement(link_1["default"], { href: "/signup", className: SignIn_module_css_1["default"].link__container__link }, "\uD68C\uC6D0\uAC00\uC785\uD558\uAE30"))),
        React.createElement("form", { className: SignIn_module_css_1["default"].form__container, onSubmit: handleSubmit(onSubmit) },
            React.createElement(Input_1["default"], { type: "text", errors: errors, label: "email", name: "email", register: register, placeholder: "\uC774\uBA54\uC77C\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694", required: { value: true, message: "이메일을 입력해 주세요" }, minLength: { value: 3, message: "최소 3글자를 입력해주세요" }, pattern: {
                    value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/gm,
                    message: "유효한 이메일이 아닙니다"
                } }),
            React.createElement(Input_1["default"], { type: type, errors: errors, label: "password", name: "password", register: register, placeholder: "\uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694", required: { value: true, message: "비밀번호를 입력해주세요" }, onClick: handleClick, isEyeShow: isEyeShow }),
            React.createElement("button", { className: SignIn_module_css_1["default"].login__button }, "\uB85C\uADF8\uC778"),
            React.createElement("div", { className: SignIn_module_css_1["default"].social__login },
                React.createElement("p", null, "\uC18C\uC124\uB85C\uADF8\uC778"),
                React.createElement("div", { className: SignIn_module_css_1["default"].social__login__images },
                    React.createElement(link_1["default"], { href: "https://www.google.com" },
                        React.createElement(image_1["default"], { src: "/images/google-oauth.png", alt: "google", width: 40, height: 40 })),
                    React.createElement(link_1["default"], { href: "https://www.kakao.com" },
                        React.createElement(image_1["default"], { src: "/images/kakao-oauth.png", alt: "kakao", width: 40, height: 40 })))))));
}
exports["default"] = SingInPage;
