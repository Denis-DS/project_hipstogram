(this.webpackJsonphipstagram=this.webpackJsonphipstagram||[]).push([[8],{102:function(e,t,a){"use strict";a.r(t);var r=a(72),n=a(0),o=a.n(n),i=a(17),l=a(21),c=a(12),u=a(89),s=a.n(u),d=a(27),m=a.n(d),f=a(74),p=a(73);t.default=Object(l.c)((function(e){return{error:e.auth.authData.error}}),(function(e){return Object(i.bindActionCreators)({authUser:c.a.request,deleteError:c.b},e)}))(o.a.memo((function(e){var t=Object(n.useState)(""),a=Object(r.a)(t,2),i=a[0],l=a[1],c=Object(n.useState)("s"),u=Object(r.a)(c,2),d=u[0],v=u[1];o.a.useEffect((function(){return function(){e.deleteError()}}),[]);return o.a.createElement("div",{className:m()("row container",s.a.wrapper)},o.a.createElement("h1",{className:"center-align"},"Authorization"),o.a.createElement("form",{className:"col s6 offset-s3",onSubmit:function(t){Object(p.b)("login",i)&&e.authUser({login:i,password:d}),t.preventDefault()}},o.a.createElement(f.a,{id:"login",type:"text",labelText:"Email",value:i,onChangeHandler:function(e){l(e.currentTarget.value),Object(p.b)("login",e.currentTarget.value)},dataError:"Email should be like this: email@email.com"}),o.a.createElement(f.a,{id:"password",type:"password",labelText:"Password",value:d,onChangeHandler:function(e){v(e.currentTarget.value)},dataError:"Not a character of 5 characters"}),e.error&&o.a.createElement("div",{className:"card-panel red lighten-3"},e.error),o.a.createElement("button",{className:"btn waves-effect waves-light ",type:"submit",name:"action"},"Submit",o.a.createElement("i",{className:"material-icons right"},"send"))))})))},72:function(e,t,a){"use strict";var r=a(32);function n(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var a=[],r=!0,n=!1,o=void 0;try{for(var i,l=e[Symbol.iterator]();!(r=(i=l.next()).done)&&(a.push(i.value),!t||a.length!==t);r=!0);}catch(c){n=!0,o=c}finally{try{r||null==l.return||l.return()}finally{if(n)throw o}}return a}}(e,t)||Object(r.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}a.d(t,"a",(function(){return n}))},73:function(e,t,a){"use strict";a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return i}));var r=function(e,t){var a=document.querySelector("#".concat(e));return t?(null===a||void 0===a||a.classList.remove("invalid"),null===a||void 0===a||a.classList.add("valid"),!0):(null===a||void 0===a||a.classList.add("invalid"),null===a||void 0===a||a.classList.remove("valid"),!1)},n=function(e,t,a,n,o){n?e.length<n&&o(e):o(e);var i=!(a&&e.length<a);return r(t,i)},o=function(e,t){var a=!!t.match(/^[0-9a-z-&#92;]/i);return r(e,a)},i=function(e){for(var t=[/jpg/,/jpeg/,/png/,/gif/],a=0;a<t.length;a++)if(t[a].test(e))return!0;return!1}},74:function(e,t,a){"use strict";var r=a(0),n=a.n(r),o=a(27),i=a.n(o);t.a=n.a.memo((function(e){return document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelectorAll(".tooltipped");M.Tooltip.init(e,{})})),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"input-field col s12"},n.a.createElement("input",{value:e.value,onChange:e.onChangeHandler,onBlur:function(t){return e.onBlurHandler&&e.onBlurHandler(e.id,t.currentTarget.value)},id:e.id,type:e.type,className:i()(e.dataTooltip?"tooltipped":""),"data-position":"right","data-tooltip":e.dataTooltip,placeholder:"","data-length":e.maxLength}),n.a.createElement("label",{htmlFor:e.id,className:"active"},e.labelText),n.a.createElement("span",{className:"helper-text","data-error":e.dataError,"data-success":"Good"})))}))},89:function(e,t,a){e.exports={wrapper:"style_wrapper__3G873"}}}]);
//# sourceMappingURL=8.bd3ac4a6.chunk.js.map