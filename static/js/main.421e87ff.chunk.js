(this["webpackJsonpit-talent-hunt"]=this["webpackJsonpit-talent-hunt"]||[]).push([[0],{10:function(e,t,a){e.exports={container:"ProjectModal_container__3QBVg",modal:"ProjectModal_modal__2Eh_f",background:"ProjectModal_background__4nWk3",heading:"ProjectModal_heading__g2JmK",heading__container:"ProjectModal_heading__container__BPBoz",title:"ProjectModal_title__Z8I-1",status:"ProjectModal_status__1fXRd",favorite:"ProjectModal_favorite__2aipk",owner:"ProjectModal_owner__1__X4",owner__name:"ProjectModal_owner__name__NQpeu",members:"ProjectModal_members__wgtzz",members__icon:"ProjectModal_members__icon__PQAvn",description:"ProjectModal_description__2vG76",footer:"ProjectModal_footer__v3lCl",btn:"ProjectModal_btn__GCU_x",date__container:"ProjectModal_date__container__1thKg",calendar__icon:"ProjectModal_calendar__icon__1gip4"}},117:function(e,t,a){},118:function(e,t,a){},119:function(e,t,a){},12:function(e,t,a){e.exports={card:"ProjectCard_card__2Q7cm",heading:"ProjectCard_heading__3rlvv",heading__container:"ProjectCard_heading__container__25rih",title:"ProjectCard_title__3xQwc",status:"ProjectCard_status__Vs8cy",favorite:"ProjectCard_favorite__3_F-t",owner:"ProjectCard_owner__1V1tC",owner__name:"ProjectCard_owner__name__3Rsni",members:"ProjectCard_members__344FN",members__icon:"ProjectCard_members__icon__2Z08B",description:"ProjectCard_description__oJpyA",footer:"ProjectCard_footer__3hMjs",btn:"ProjectCard_btn__19LMb",date__container:"ProjectCard_date__container__3AFEJ",calendar__icon:"ProjectCard_calendar__icon__31fgA"}},120:function(e,t,a){},121:function(e,t,a){},122:function(e,t,a){},123:function(e,t,a){"use strict";a.r(t);var n=a(1),i=a.n(n),c=a(55),s=a.n(c),r=a(16),o=a(4),l=(a(89),a(3)),j=(a(90),a(5)),d=a(9),u=a(22),m=a.n(u),_=a(46),b=a.n(_),p=a(0),h=function(e){var t=e.svg,a=e.submit,n=void 0!==a&&a;return Object(p.jsx)("button",{type:n?"submit":"button",className:b.a.button,onClick:n?function(){}:function(){return window.open("https://youtu.be/dQw4w9WgXcQ")},children:Object(p.jsx)("div",{style:{backgroundImage:"url(".concat(t,")")},className:b.a.icon})})},O=a.p+"static/media/search.f2a3f9f7.svg",x=a.p+"static/media/bell.da8ec108.svg",g=a.p+"static/media/profile.a25953c7.svg";var f=function(){var e=Object(n.useState)(""),t=Object(l.a)(e,2),a=t[0],i=t[1],c=function(e,t){var a=Object(n.useState)(e),i=Object(l.a)(a,2),c=i[0],s=i[1];return Object(n.useEffect)((function(){var a=setTimeout((function(){s(e)}),t);return function(){clearTimeout(a)}}),[e,t]),c}(a,500);return Object(n.useEffect)((function(){function e(){return(e=Object(d.a)(Object(j.a)().mark((function e(){return Object(j.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})))).apply(this,arguments)}c&&function(){e.apply(this,arguments)}()}),[c]),Object(p.jsxs)("div",{className:m.a.header,children:[Object(p.jsx)("div",{className:m.a.logo}),Object(p.jsxs)("div",{className:m.a.controls,children:[Object(p.jsxs)("form",{className:m.a.form,onSubmit:function(e){return function(e){e.preventDefault(),i("")}(e)},children:[Object(p.jsx)("input",{className:m.a.input,placeholder:"Try 'Coffee shop project'...",value:a,onChange:function(e){return i(e.target.value)}}),Object(p.jsx)(h,{svg:O,submit:!0})]}),Object(p.jsx)("button",{type:"button",className:m.a.create_button,children:"Create +"}),Object(p.jsx)(h,{svg:x}),Object(p.jsx)(h,{svg:g})]})]})},v=function(){return Object(p.jsx)("div",{className:"footer",children:"Footer"})},y=function(){var e=Object(n.useState)(!1),t=Object(l.a)(e,2),a=t[0],i=(t[1],Object(o.p)());return Object(n.useEffect)((function(){i("/signIn")}),[]),Object(p.jsxs)("div",{className:"starter",children:[Object(p.jsx)("header",{children:Object(p.jsx)(f,{})}),Object(p.jsx)("main",{children:Object(p.jsx)(o.b,{})}),a&&Object(p.jsx)("footer",{children:Object(p.jsx)(v,{})})]})},w=a(33),N=a.n(w),k=a(8),P=a(18),C=a.n(P),S=a(14),D=a.n(S),I=a.p+"static/media/eye-open.e4d87718.svg",F=a.p+"static/media/eye-locked.0e25333e.svg",T=function(e){var t=e.input,a=e.onBlur,i=e.setValue,c=e.setIsValueDirty,s=e.isSignedUp,o=void 0!==s&&s,j=t.type,d=t.name,u=t.value,m=t.message,_=t.isDirty,b=t.text,h=Object(n.useState)(!1),O=Object(l.a)(h,2),x=O[0],g=O[1];return Object(p.jsxs)("label",{htmlFor:j,className:D.a.label,id:j,style:{display:"flex",alignItems:"center"},children:[Object(p.jsxs)("div",{style:{width:"100%",textAlign:"left"},children:[Object(p.jsx)("p",{children:b}),Object(p.jsx)("input",{type:x||"password"!==j?"text":"password",id:j,name:d,minLength:"password"===j?5:0,value:u,onChange:function(e){return function(e,t,a){e(a.target.value),t(!1)}(i,c,e)},onBlur:function(e){return a(e)},className:C()(D.a.input,Object(k.a)({},D.a.input__error,_)),placeholder:"confirmPassword"===d?b:"Enter ".concat(d)}),"password"===d&&!o&&Object(p.jsx)(r.b,{to:"/recovery",className:D.a.link_recovery,children:Object(p.jsx)("span",{children:"Forgot password?"})})]}),_&&Object(p.jsxs)("span",{className:D.a.input__error_message,children:[Object(p.jsx)("i",{className:"bx bx-error"}),Object(p.jsx)("span",{children:m})]}),"password"===j&&Object(p.jsx)("button",{type:"button",onClick:function(){return g(!x)},children:Object(p.jsx)("div",{className:D.a.img__eye,style:{backgroundImage:"url('".concat(x?I:F,"')")}})})]})},B=function(e,t,a){t(!0),""===e.trim()?a('The "Password" field is required. Please enter your password.'):e.length<8||e.length>30?a("The password must be 8-30 symbols long and contain only a-z Latin letters and digits."):/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/.test(e)?t(!1):a('"Password" field should contain upper, lower case letter and digits')},M=function(e,t,a){t(!0),""===e.trim()?a('The "Email" field is required'):e.length<8||e.length>30?a("The email must be 8-30 symbols long and contain only a-z Latin letters and digits."):/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)?t(!1):a("Please ensure that your email address is correctly formatted")},L=function(e,t,a,n){""===e.trim()&&(a(!0),n("Password should not be empty")),e!==t&&(a(!0),n("Passwords aren`t matching"))},V=function(e,t,a,n){var i=t[0].toUpperCase()+t.slice(1);"position"===t?""===e.trim()&&(a(!0),n("".concat(i," should be selected"))):""!==e.trim()?e[0]!==e[0].toUpperCase()&&(a(!0),n("The ".concat(t," should start with the upper case letter"))):(a(!0),n("".concat(i," should not be empty")))},U=(a(92),function(e){var t=e.title,a=e.isDisabled,n=void 0===a||a,i=e.onClick;return Object(p.jsx)("button",{type:"submit",className:C()("completeButton",{"completeButton-disable":!n}),onClick:i,children:t})}),A=(a(93),function(e){var t=e.isSigningUp,a=e.setIsSigningUp,i=Object(n.useState)(""),c=Object(l.a)(i,2),s=c[0],r=c[1],j=Object(n.useState)(""),d=Object(l.a)(j,2),u=d[0],m=d[1],_=Object(n.useState)(""),b=Object(l.a)(_,2),h=b[0],O=b[1],x=Object(n.useState)(!1),g=Object(l.a)(x,2),f=g[0],v=g[1],y=Object(n.useState)(!1),w=Object(l.a)(y,2),k=w[0],P=w[1],C=Object(n.useState)(!1),S=Object(l.a)(C,2),D=S[0],I=S[1],F=Object(n.useState)(""),V=Object(l.a)(F,2),A=V[0],E=V[1],z=Object(n.useState)(""),H=Object(l.a)(z,2),R=H[0],Z=H[1],Q=Object(n.useState)(""),q=Object(l.a)(Q,2),G=q[0],J=q[1],X=!1===f&&s.length>0&&!1===!!k&&u.length>0,K=Object(o.p)(),W=function(e){switch(e.target.name){case"email":M(s,v,E);break;case"password":B(u,P,Z);break;case"confirmPassword":L(h,u,I,J)}},Y={id:0,type:"email",name:"email",value:s,message:A,isDirty:f,text:"Email"},$={id:1,type:"password",name:"password",value:u,message:R,isDirty:k,text:"Password"},ee={id:2,type:"password",name:"confirmPassword",value:h,message:G,isDirty:D,text:"Confirm Password"};return Object(p.jsxs)("section",{style:{width:"100%"},children:[Object(p.jsxs)("form",{onSubmit:function(e){e.preventDefault(),B(u,P,Z),M(s,v,E),L(h,u,I,J),t&&(X=!1===f&&s.length>0&&!1===k&&u.length>0&&!1===D&&h.length>0),X&&K(t?"/profileCreate":"/main")},className:N.a.form,method:"get",children:[Object(p.jsx)("h1",{className:N.a.header,children:"Sign in"}),Object(p.jsx)(T,{input:Y,onBlur:W,setValue:r,setIsValueDirty:v}),Object(p.jsx)(T,{input:$,onBlur:W,setValue:m,setIsValueDirty:P,isSignedUp:t}),t&&Object(p.jsx)(p.Fragment,{children:Object(p.jsx)(T,{input:ee,onBlur:W,setValue:O,setIsValueDirty:I})}),Object(p.jsx)(U,{title:t?"Sign up":"Sign in",isDisabled:X})]}),Object(p.jsxs)("p",{className:N.a.p,children:[t?Object(p.jsx)("span",{children:"Don't have an account yet?\xa0"}):Object(p.jsx)("span",{children:"Have an account?\xa0"}),Object(p.jsx)("span",{className:N.a.link,onClick:function(){K(t?"/signIn":"/signUp")},onKeyDown:function(e){return function(e){"Enter"===e.key&&a(!0)}(e)},role:"link",tabIndex:0,children:t?Object(p.jsx)("span",{children:"Sign in "}):Object(p.jsx)("span",{children:"Register now"})})]})]})}),E=(a(94),function(e){var t=e.children;return Object(p.jsx)("div",{className:"containerC",children:Object(p.jsx)("div",{className:"containerC__suit",children:Object(p.jsx)("div",{className:"containerC__wrapper",children:Object(p.jsx)("div",{className:"containerC__shell",children:t})})})})}),z=function(){var e=Object(n.useState)(!1),t=Object(l.a)(e,2),a=t[0],i=t[1];return Object(p.jsx)("div",{className:"container",children:Object(p.jsx)(E,{children:Object(p.jsx)(A,{isSigningUp:a,setIsSigningUp:i})})})},H=a(47),R=a.n(H),Z=a(11),Q=a(34),q=a.n(Q),G=a(23),J=a.n(G),X=function(e){var t=e.list,a=e.callbackFn,n=e.stateType,i=e.heading,c=e.state;return Object(p.jsxs)("div",{className:J.a.list,children:[Object(p.jsx)("h4",{className:J.a.heading,children:i}),Object(p.jsx)("ul",{className:J.a.list__ul,children:t.map((function(e){return Object(p.jsxs)("li",{className:J.a.list__item,children:[Object(p.jsx)("input",{type:"checkbox",checked:c.includes(e.toLowerCase()),name:e.toLowerCase(),id:e.toLowerCase(),className:J.a.checkbox,onChange:function(e){return a(e,n)}}),Object(p.jsx)("label",{htmlFor:e.toLowerCase(),className:J.a.label,children:e})]},e)}))})]})},K=a(28),W=a.n(K),Y=function(e){var t=e.list,a=e.state,n=e.heading,i=e.groupName,c=e.setState;return Object(p.jsxs)("div",{className:W.a.list,children:[Object(p.jsx)("h4",{className:W.a.heading,children:n}),Object(p.jsx)("ul",{className:W.a.list__ul,children:t.map((function(e){return Object(p.jsx)("li",{className:W.a.list__item,children:Object(p.jsx)("input",{type:"radio",name:i,id:e.toLowerCase(),value:e.toLowerCase(),checked:a===e.toLowerCase(),onChange:function(e){return c(e.target.value)},className:W.a.radio,"data-content":e.toLowerCase()})},e)}))})]})},$=function(){var e=Object(n.useState)([]),t=Object(l.a)(e,2),a=t[0],i=t[1],c=Object(n.useState)([]),s=Object(l.a)(c,2),r=s[0],o=s[1],j=Object(n.useState)([]),d=Object(l.a)(j,2),u=d[0],m=d[1],_=Object(n.useState)("4"),b=Object(l.a)(_,2),h=b[0],O=b[1],x=Object(n.useState)("16"),g=Object(l.a)(x,2),f=g[0],v=g[1],y=Object(n.useCallback)((function(e,t){var n=e.target.name;"position"===t?a.includes(n)?i(a.filter((function(e){return e!==n}))):i([].concat(Object(Z.a)(a),[n])):"status"===t?r.includes(n)?o(r.filter((function(e){return e!==n}))):o([].concat(Object(Z.a)(r),[n])):"technologies"===t&&(u.includes(n)?m(u.filter((function(e){return e!==n}))):m([].concat(Object(Z.a)(u),[n])))}),[r,a,u]);return Object(p.jsxs)("div",{className:q.a.main,children:[Object(p.jsxs)("div",{className:q.a.heading__container,children:[Object(p.jsx)("h4",{className:q.a.heading,children:"Filters"}),Object(p.jsx)("button",{type:"button",onClick:function(){i([]),o([]),m([]),O("4"),v("16")},className:q.a.clearAll,children:"Clear all"})]}),Object(p.jsx)(X,{list:["Front-end developer","Back-end developer","Full-stack developer","DevOps","QA","Project Manager","UI/UX Designer"],callbackFn:y,stateType:"position",heading:"Position",state:a}),Object(p.jsx)(X,{list:["All","Recruitment","In progress","Finished"],callbackFn:y,stateType:"status",heading:"Status",state:r}),Object(p.jsx)(Y,{list:["2","3","4","5","6+"],state:h,setState:O,heading:"Team size",groupName:"team"}),Object(p.jsx)(X,{list:["TypeScript","Java","C#","Python","Assembly","Figma","HTML/CSS"],callbackFn:y,stateType:"technologies",heading:"Technologies",state:u}),Object(p.jsx)(Y,{list:["8","16","24","32"],state:f,setState:v,heading:"Display projects",groupName:"projects"})]})},ee=a(24),te=a.n(ee),ae=function(e){var t=e.n,a=void 0===t?0:t,i=e.position,c=Object(n.useState)("all"),s=Object(l.a)(c,2),r=s[0],o=s[1];return Object(p.jsxs)("div",{className:te.a.header,children:[Object(p.jsxs)("h5",{className:te.a.heading,children:["".concat(a," projects was found for"),Object(p.jsx)("p",{className:te.a.accented_text,children:i||" your filters"})]}),Object(p.jsx)("ul",{className:te.a.list__container,children:["All","New","Favorites"].map((function(e){return Object(p.jsx)("li",{className:te.a.list__item,children:Object(p.jsx)("input",{type:"radio",name:"filterOptions",id:e.toLowerCase(),value:e.toLowerCase(),checked:r===e.toLowerCase(),onChange:function(e){return o(e.target.value)},className:te.a.radio,"data-content":e})},e)}))})]})},ne=a(12),ie=a.n(ne),ce=a.p+"static/media/heartEmpty.e5fc67d4.svg",se=function(e){var t=e.id,a=e.title,n=e.owner,i=e.status,c=e.members,s=e.maxMembers,r=e.description,o=e.creationDate,l=(e.isFavorite,e.onClick),j=function(e,t){if(e.length<=t)return e;var a=e.slice(0,t).trim(),n=a.lastIndexOf(" ");return"".concat(a.slice(0,n),"...")}(r,120);return Object(p.jsxs)("div",{className:ie.a.card,onClick:function(){return l(t)},onKeyDown:function(){},children:[Object(p.jsxs)("div",{className:ie.a.heading,children:[Object(p.jsxs)("div",{className:ie.a.heading__container,children:[Object(p.jsx)("h2",{className:ie.a.title,children:a}),Object(p.jsx)("div",{className:ie.a.status,children:i})]}),Object(p.jsx)("button",{type:"button",className:ie.a.favorite,style:{backgroundImage:"url(".concat(ce,")")},onClick:function(e){e.stopPropagation()}})]}),Object(p.jsx)("div",{className:ie.a.owner,children:Object(p.jsx)("h5",{className:ie.a.owner__name,children:n})}),Object(p.jsxs)("div",{className:ie.a.members,children:[Object(p.jsx)("div",{className:ie.a.members__icon}),"".concat(c,"/").concat(s," members")]}),Object(p.jsx)("p",{className:ie.a.description,children:j}),Object(p.jsxs)("div",{className:ie.a.footer,children:[Object(p.jsx)("button",{type:"button",className:ie.a.btn,onClick:function(e){e.stopPropagation()},children:"Apply"}),Object(p.jsxs)("div",{className:ie.a.date__container,children:[Object(p.jsx)("div",{className:ie.a.calendar__icon}),o]})]})]})},re=a(10),oe=a.n(re),le=function(e){var t=e.title,a=e.owner,n=e.status,i=e.members,c=e.maxMembers,s=e.description,r=e.creationDate,o=(e.isFavorite,e.onClick);return Object(p.jsxs)("div",{className:oe.a.container,children:[Object(p.jsx)("div",{className:oe.a.background,onClick:function(){return o(!1)}}),Object(p.jsxs)("div",{className:oe.a.modal,children:[Object(p.jsxs)("div",{className:oe.a.heading,children:[Object(p.jsxs)("div",{className:oe.a.heading__container,children:[Object(p.jsx)("h2",{className:oe.a.title,children:t}),Object(p.jsx)("div",{className:oe.a.status,children:n})]}),Object(p.jsx)("div",{className:oe.a.favorite,style:{backgroundImage:"url(".concat(ce,")")}})]}),Object(p.jsx)("div",{className:oe.a.owner,children:Object(p.jsx)("h5",{className:oe.a.owner__name,children:a})}),Object(p.jsxs)("div",{className:oe.a.members,children:[Object(p.jsx)("div",{className:oe.a.members__icon}),"".concat(i,"/").concat(c," members")]}),Object(p.jsx)("p",{className:oe.a.description,children:s}),Object(p.jsxs)("div",{className:oe.a.footer,children:[Object(p.jsx)("button",{type:"button",className:oe.a.btn,children:"Apply"}),Object(p.jsxs)("div",{className:oe.a.date__container,children:[Object(p.jsx)("div",{className:oe.a.calendar__icon}),r]})]})]})]})},je=function(){var e=Object(n.useState)(!1),t=Object(l.a)(e,2),a=t[0],i=t[1],c=Object(n.useState)(0),s=Object(l.a)(c,2),r=s[0],o=s[1],j=Object(n.useCallback)((function(e){i(!0),o(e)}),[]),d=[{id:1,title:"Taskify",status:"In progress",owner:"Vatalik",members:4,maxMembers:5,isFavorite:!0,creationDate:"26.06.2023",description:'"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.'},{id:2,title:"Taskify",status:"In progress",owner:"Biden Prime",members:4,maxMembers:5,isFavorite:!0,creationDate:"26.06.2023",description:'"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.'},{id:3,title:"Taskify",status:"In progress",owner:"Geralt",members:4,maxMembers:5,isFavorite:!0,creationDate:"26.06.2023",description:'"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.'},{id:4,title:"Taskify",status:"In progress",owner:"Mario",members:4,maxMembers:5,isFavorite:!0,creationDate:"26.06.2023",description:'"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.'},{id:5,title:"Taskify",status:"finished",owner:"Vigil",members:4,maxMembers:5,isFavorite:!0,creationDate:"26.06.2023",description:'"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.'},{id:6,title:"Taskify",status:"recruitment",owner:"Dante",members:4,maxMembers:5,isFavorite:!0,creationDate:"26.06.2023",description:'"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.'},{id:7,title:"Taskify",status:"In progress",owner:"Trump Prime",members:4,maxMembers:5,isFavorite:!0,creationDate:"26.06.2023",description:'"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.'},{id:8,title:"Taskify",status:"jOver",owner:"Druttut",members:4,maxMembers:5,isFavorite:!0,creationDate:"26.06.2023",description:'"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.'}];return Object(p.jsxs)("div",{className:R.a.main,children:[a&&Object(p.jsx)(le,{title:d[r-1].title,status:d[r-1].status,owner:d[r-1].owner,members:d[r-1].members,maxMembers:d[r-1].maxMembers,isFavorite:d[r-1].isFavorite,creationDate:d[r-1].creationDate,description:d[r-1].description,onClick:i}),Object(p.jsx)($,{}),Object(p.jsxs)("div",{className:R.a.grid__container,children:[Object(p.jsx)(ae,{n:24,position:""}),Object(p.jsx)("div",{className:"grid",children:d.map((function(e){return Object(p.jsx)(se,{id:e.id,title:e.title,status:e.status,owner:e.owner,members:e.members,maxMembers:e.maxMembers,isFavorite:e.isFavorite,creationDate:e.creationDate,description:e.description,onClick:j},e.id)}))})]})]})},de=a(56),ue=a.n(de),me=a(6),_e=a.n(me),be=function(){var e=Object(n.useState)(""),t=Object(l.a)(e,2),a=t[0],i=t[1],c=Object(n.useState)(""),s=Object(l.a)(c,2),r=s[0],o=s[1],u=Object(n.useState)([]),m=Object(l.a)(u,2),_=m[0],b=m[1],h=Object(n.useState)("Telegram"),O=Object(l.a)(h,2),x=O[0],g=O[1],f=Object(n.useState)(""),v=Object(l.a)(f,2),y=v[0],w=v[1],N=function(){var e=Object(d.a)(Object(j.a)().mark((function e(t){return Object(j.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),i(""),o(""),b([]),g("Telegram"),w("");case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(p.jsx)("div",{className:_e.a.newProject__wrapper,children:Object(p.jsx)("div",{className:_e.a.newProject__container,children:Object(p.jsxs)("form",{className:"".concat(_e.a.newProject__form," ").concat(_e.a.form),onSubmit:N,children:[Object(p.jsx)("h1",{className:_e.a.form__header,children:"Create your own project with a team!"}),Object(p.jsxs)("ul",{className:"".concat(_e.a.form__list," ").concat(_e.a.list),children:[Object(p.jsxs)("li",{className:"".concat(_e.a.list__item," ").concat(_e.a.item," ").concat(_e.a.descriptions),children:[Object(p.jsx)("div",{className:_e.a.item__title,children:"Name and description"}),Object(p.jsx)("label",{htmlFor:"name",className:_e.a.item__label,children:"Project name"}),Object(p.jsx)("input",{type:"text",required:!0,id:"name",value:a,onChange:function(e){i(e.target.value)},className:_e.a.item__input,placeholder:"Enter the name of the project"}),Object(p.jsx)("label",{htmlFor:"description",className:_e.a.item__label,children:"Project description"}),Object(p.jsx)("textarea",{required:!0,id:"description",value:r,onChange:function(e){o(e.target.value)},className:"".concat(_e.a.item__input," ").concat(_e.a.description),placeholder:"Enter the description of the project"})]}),Object(p.jsxs)("li",{className:"".concat(_e.a.list__item," ").concat(_e.a.item," ").concat(_e.a.members),children:[Object(p.jsx)("div",{className:"item__title",children:"Project members"}),Object(p.jsx)(ue.a,{value:_,onChange:function(e){b(e)},suggestions:["UI/UX designer","Front-end developer","Back-end developer","QA engineer","Project-manager","DevOps","Mentor"],uniqueChips:!1})]}),Object(p.jsxs)("li",{className:"".concat(_e.a.list__item," ").concat(_e.a.item," ").concat(_e.a.communication),children:[Object(p.jsx)("div",{className:_e.a.item__title,children:"Communication"}),Object(p.jsx)("label",{htmlFor:"communication",className:_e.a.item__label,children:"Link for communication"}),Object(p.jsxs)("div",{className:_e.a.communication__item,id:"communication",children:[Object(p.jsxs)("select",{name:"select",className:_e.a.item__select,value:x,onChange:function(e){g(e.target.value)},children:[Object(p.jsx)("option",{value:"Telegram",children:"Telegram"}),Object(p.jsx)("option",{value:"Discord",children:"Discord"}),Object(p.jsx)("option",{value:"Slack",children:"Slack"})]}),Object(p.jsx)("input",{type:"link",required:!0,value:y,onChange:function(e){w(e.target.value)},className:"".concat(_e.a.item__input," ").concat(_e.a.link),placeholder:"Enter ".concat(x," link")})]})]})]}),Object(p.jsx)("button",{type:"submit",onClick:N,className:C()(0!==(a.length&&r.length&&_.length&&y.length)?"".concat(_e.a.form__button):"".concat(_e.a.button__inactive)),children:"Create"})]})})})},pe=(a(117),a.p+"static/media/arrow-left.dfa142d2.svg"),he=function(){var e=Object(o.p)();return Object(p.jsxs)("button",{type:"button",style:{display:"flex",alignItems:"center",gap:"10px"},onClick:function(){return e(-1)},children:[Object(p.jsx)("div",{style:{backgroundImage:"url('".concat(pe,"')"),backgroundRepeat:"no-repeat",width:"10px",height:"16px"}}),Object(p.jsx)("span",{children:"Back"})]})},Oe=function(){var e=Object(n.useState)(""),t=Object(l.a)(e,2),a=t[0],i=t[1],c=Object(n.useState)(!1),s=Object(l.a)(c,2),r=s[0],j=s[1],d=Object(n.useState)(""),u=Object(l.a)(d,2),m=u[0],_=u[1],b=Object(o.p)(),h={id:0,type:"email",name:"email",value:a,message:m,isDirty:r,text:"Email"},O=!r&&!!a;return Object(p.jsx)("section",{className:"recovery",children:Object(p.jsx)(E,{children:Object(p.jsxs)("form",{action:"",onSubmit:function(e){return function(e){e.preventDefault(),M(a,j,_),O&&b("/recoveryComplete")}(e)},children:[Object(p.jsx)("div",{className:"recovery__back",children:Object(p.jsx)(he,{})}),Object(p.jsx)("h1",{className:"recovery__title",children:"Password recovery"}),Object(p.jsx)("p",{className:"recovery__title_sub",children:"To reset your password,\n              enter the email used to log in.\n              A recovery link will be sent to it."}),Object(p.jsx)(T,{input:h,onBlur:function(){M(a,j,_)},setValue:i,setIsValueDirty:j}),Object(p.jsx)(U,{title:"Send",isDisabled:O})]})})})},xe=(a(118),function(){var e=Object(o.p)();return Object(p.jsx)("section",{className:"recoveryComplete",children:Object(p.jsxs)(E,{children:[Object(p.jsx)("h1",{className:"recoveryComplete__title",children:"Link send to your email!"}),Object(p.jsx)("p",{className:"recoveryComplete__title-sub",children:"Follow the links to recover your password."}),Object(p.jsx)(U,{title:"Log in",onClick:function(){e("/signIn")}})]})})}),ge=(a(119),a(120),a.p+"static/media/arrow-bottom.0881b593.svg"),fe=function(e){var t=e.input,a=e.onBlur,i=e.setValue,c=e.setIsValueDirty,s=Object(n.useState)(!1),r=Object(l.a)(s,2),o=r[0],j=r[1],d=Object(n.useState)("Choose"),u=Object(l.a)(d,2),m=u[0],_=u[1],b=t.type,h=t.name,O=t.value,x=t.message,g=t.isDirty,f=t.text,v=t.setlections;return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsxs)("label",{htmlFor:b,className:D.a.label,id:b,style:{display:"flex",alignItems:"center"},children:[Object(p.jsxs)("div",{style:{width:"100%"},children:[Object(p.jsx)("p",{children:f}),Object(p.jsx)("button",{type:"button",onClick:function(){j(!o),_("Choose")},style:{width:"100%",textAlign:"left"},children:Object(p.jsx)("input",{type:b,id:b,name:h,value:O,onBlur:a,className:C()(D.a.input,Object(k.a)({},D.a.input__error,g)),placeholder:m,disabled:!0,style:{color:"#000"}})})]}),g&&Object(p.jsxs)("span",{className:D.a.input__error_message,children:[Object(p.jsx)("i",{className:"bx bx-error"}),Object(p.jsx)("span",{children:x})]}),Object(p.jsx)("button",{type:"button",children:Object(p.jsx)("div",{className:C()("inputSelect__arrow",[{"inputSelect__arrow-move":o}]),style:{backgroundImage:"url('".concat(ge,"')")}})})]}),o&&Object(p.jsx)("ul",{className:"inputSelect__list",children:null===v||void 0===v?void 0:v.map((function(e){return Object(p.jsx)("button",{type:"button",onClick:function(){return t=e.name,i(t),c(!1),void j(!1);var t},className:"inputSelect__item",onMouseOver:function(){return t=e.name,void _(t);var t},onFocus:function(){},children:Object(p.jsx)("li",{children:e.name})},e.id)}))})]})},ve=function(){var e=Object(n.useState)(""),t=Object(l.a)(e,2),a=t[0],i=t[1],c=Object(n.useState)(!1),s=Object(l.a)(c,2),r=s[0],j=s[1],d=Object(n.useState)(""),u=Object(l.a)(d,2),m=u[0],_=u[1],b=Object(n.useState)(""),h=Object(l.a)(b,2),O=h[0],x=h[1],g=Object(n.useState)(!1),f=Object(l.a)(g,2),v=f[0],y=f[1],w=Object(n.useState)(""),N=Object(l.a)(w,2),k=N[0],P=N[1],C=Object(n.useState)(""),S=Object(l.a)(C,2),D=S[0],I=S[1],F=Object(n.useState)(!1),B=Object(l.a)(F,2),M=B[0],L=B[1],A=Object(n.useState)(""),z=Object(l.a)(A,2),H=z[0],R=z[1],Z=Object(n.useState)({}),Q=Object(l.a)(Z,2),q=Q[0],G=Q[1],J=Object(o.p)(),X=!1===M&&!1===r&&!1===v&&a.length>0&&O.length>0&&D.length>0,K={id:0,type:"text",name:"name",value:a,message:m,isDirty:r,text:"Name"},W={id:1,type:"text",name:"surname",value:O,message:k,isDirty:v,text:"Surname"},Y={id:2,type:"text",name:"position",value:D,message:H,isDirty:M,text:"Position",setlections:[{id:0,name:"UI/UX designer"},{id:1,name:"Front-end developer"},{id:2,name:"Back-end developer"},{id:3,name:"DevOps"},{id:4,name:"Project manager"},{id:5,name:"QA Engineer"},{id:6,name:"Mentor"}]};return Object(p.jsx)("section",{className:"profileCreate",children:Object(p.jsx)(E,{children:Object(p.jsxs)("form",{method:"get",onSubmit:function(e){V(a,"name",j,_),V(O,"surname",y,P),V(D,"position",L,R),X&&J("/signIn"),e.preventDefault(),G({name:a,surName:O,position:D}),console.log(q)},className:"profileCreate__shell",children:[Object(p.jsx)("h1",{children:"Profile"}),Object(p.jsx)(T,{input:K,onBlur:function(){return V(a,"name",j,_)},setValue:i,setIsValueDirty:j}),Object(p.jsx)(T,{input:W,onBlur:function(){return V(O,"surname",y,P)},setValue:x,setIsValueDirty:y}),Object(p.jsx)(fe,{input:Y,onBlur:function(){return V(D,"position",L,R)},setValue:I,setIsValueDirty:L}),Object(p.jsx)(U,{title:"Sign up",isDisabled:X})]})})})},ye=a.p+"static/media/logo.31f8a651.svg",we=(a(121),function(){return Object(p.jsx)("div",{className:"logo",style:{backgroundImage:"url('".concat(ye,"')")}})}),Ne=(a(122),function(){var e=Object(n.useState)(!0),t=Object(l.a)(e,2),a=t[0],i=t[1];return Object(p.jsxs)("section",{className:"signUp",children:[Object(p.jsx)("div",{className:"signUp__container",children:Object(p.jsx)(A,{isSigningUp:a,setIsSigningUp:i})}),Object(p.jsx)("div",{className:"signUp__wrapper",children:Object(p.jsxs)("div",{style:{margin:"0 auto"},children:[Object(p.jsx)(we,{}),Object(p.jsx)("h1",{className:"signUp__title",children:"Your way to gain experience"}),Object(p.jsx)("p",{className:"signUp__title-sub",children:"Just a few clicks and you'll start your journey in IT!"})]})})]})});s.a.render(Object(p.jsx)(i.a.StrictMode,{children:Object(p.jsx)(r.a,{children:Object(p.jsx)(o.e,{children:Object(p.jsxs)(o.c,{path:"/",element:Object(p.jsx)(y,{}),children:[Object(p.jsx)(o.c,{path:"main",element:Object(p.jsx)(o.a,{to:"../",replace:!0})}),Object(p.jsx)(o.c,{index:!0,element:Object(p.jsx)(je,{})}),Object(p.jsx)(o.c,{path:"project",element:Object(p.jsx)(be,{})}),Object(p.jsx)(o.c,{path:"signIn",element:Object(p.jsx)(z,{})}),Object(p.jsx)(o.c,{path:"recovery",element:Object(p.jsx)(Oe,{})}),Object(p.jsx)(o.c,{path:"recoveryComplete",element:Object(p.jsx)(xe,{})}),Object(p.jsx)(o.c,{path:"profileCreate",element:Object(p.jsx)(ve,{})}),Object(p.jsx)(o.c,{path:"signUp",element:Object(p.jsx)(Ne,{})})]})})})}),document.getElementById("root"))},14:function(e,t,a){e.exports={input:"InputField_input__3cvMf",input__error:"InputField_input__error__6Zi09",input__error_message:"InputField_input__error_message__ZgPVD",label:"InputField_label__3VyZu",link_recovery:"InputField_link_recovery__3sXps",img__eye:"InputField_img__eye__ETI3J"}},22:function(e,t,a){e.exports={header:"Header_header__1v0yI",logo:"Header_logo__3T0lc",form:"Header_form__3eIBo",input:"Header_input__3sc1D",controls:"Header_controls__w9BSt",create_button:"Header_create_button__1-g_J"}},23:function(e,t,a){e.exports={heading:"CheckBoxList_heading__3lSFd",list:"CheckBoxList_list__3ZDNO",list__ul:"CheckBoxList_list__ul__1ryL7",list__item:"CheckBoxList_list__item__3cwnO",checkbox:"CheckBoxList_checkbox__237F7",label:"CheckBoxList_label__3fh6T"}},24:function(e,t,a){e.exports={header:"GridHeader_header__2iGUh",heading:"GridHeader_heading__1FeLq",accented_text:"GridHeader_accented_text__jqeCP",list__container:"GridHeader_list__container__3LFMy",list__item:"GridHeader_list__item__2R1o1",radio:"GridHeader_radio__sFZRZ"}},28:function(e,t,a){e.exports={heading:"RadioBtnList_heading__2xhtK",list:"RadioBtnList_list__109Pi",list__ul:"RadioBtnList_list__ul__KLTuo",list__item:"RadioBtnList_list__item__11Vqg",radio:"RadioBtnList_radio__1NGIR"}},33:function(e,t,a){e.exports={form:"LoginForm_form__2VEPW",header:"LoginForm_header__3Hlvw",p:"LoginForm_p__KOxmq",link:"LoginForm_link__anxBe"}},34:function(e,t,a){e.exports={main:"sideBar_main__1g8nw",clearAll:"sideBar_clearAll__2lxax",heading:"sideBar_heading__5D2If",heading__container:"sideBar_heading__container__17sBT"}},46:function(e,t,a){e.exports={button:"IconButton_button__1BPZn",icon:"IconButton_icon__3XwPU"}},47:function(e,t,a){e.exports={main:"MainPage_main__2XItd",grid__container:"MainPage_grid__container__LjwRS"}},6:function(e,t,a){e.exports={newProject__wrapper:"ProjectPage_newProject__wrapper__sp4xQ",newProject__container:"ProjectPage_newProject__container__j9SER",form:"ProjectPage_form__THoiq",form__header:"ProjectPage_form__header__1mCjq",form__button:"ProjectPage_form__button__2k8jc",button__inactive:"ProjectPage_button__inactive__lMZlp",item:"ProjectPage_item__Zoijt",item__title:"ProjectPage_item__title__2CZEP",item__label:"ProjectPage_item__label__1RQm8",item__input:"ProjectPage_item__input__10mIe",item__select:"ProjectPage_item__select__2QOi0",description:"ProjectPage_description__3xkaN",communication__item:"ProjectPage_communication__item__cIbfK",link:"ProjectPage_link__wuXJY"}},89:function(e,t,a){},90:function(e,t,a){},92:function(e,t,a){},94:function(e,t,a){}},[[123,1,2]]]);
//# sourceMappingURL=main.421e87ff.chunk.js.map