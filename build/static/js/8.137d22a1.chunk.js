(this.webpackJsonpdev=this.webpackJsonpdev||[]).push([[8],{125:function(e,s,t){},135:function(e,s,t){"use strict";t.r(s);var n=t(14),r=t(15),o=t(17),a=t(16),p=t(2),c=t(4),i=t(13),l=t(27),u=t(18),d=t(35),h=t(24),b=t(28),_=t(19),j=(t(125),function(e){Object(o.a)(t,e);var s=Object(a.a)(t);function t(e){var r;return Object(n.a)(this,t),(r=s.call(this,e)).getResponseData=function(e){var s={};return"employer"===r.props.userState.user_type?(s.employer=r.props.userState.id,s.vacancy=r.props.item.answer,s.cv=r.props.item.pk,s.worker=r.props.item.owner_id):(s.employer=r.props.item.owner_id,s.vacancy=r.props.item.pk,s.cv=r.props.item.answer,s.worker=r.props.userState.id),s.message=e,s.state=r.props.item.state||"sent",s},r.changeWorkValue=function(e){r.setState({chosenWorkValue:e.target.value})},r.popupClose=function(){r.props.onCloseResponsePopup()},r.getAvatarFromFirebase=function(e,s,t){b.a.storage().ref().child("user-avatar"+e).getDownloadURL().then((function(e){return r.props.onSetValuePhoto(e,s,t)})).catch((function(e){return r.props.onSetValuePhoto("https://firebasestorage.googleapis.com/v0/b/diploma-55e3f.appspot.com/o/placeholder-avatar.jpg?alt=media&token=5058f243-49e5-4df4-8686-899c6ce12c54",s,t)}))},r.makeResponse=function(e){e.preventDefault();var s=r.getResponseData(e.target.responseMessageInput.value);r.props.onMakeResponse(Object(h.j)(Object(h.f)(r.props.userState.user_type)),s),r.props.onChangeAnswer(r.props.answerId,Object(h.j)(r.props.userState.user_type),"viewed"),r.props.onCloseResponsePopup(),r.props.onNullifyValues(),r.props.onNullifyAnswers();var t=Object(h.d)(r.props.userState.user_type);r.props.onGetUserResponses(t,r.props.responseState.nextValues,r.props.userState.id,r.getAvatarFromFirebase),r.props.onGetUserAnswers(t,r.props.responseState.nextAnswers,r.props.userState.id,r.getAvatarFromFirebase)},r.state={chosenWorkValue:-1},r}return Object(r.a)(t,[{key:"render",value:function(){return Object(p.jsxs)("form",{className:"response-form-popup rounded",onSubmit:this.makeResponse.bind(this),children:[Object(p.jsx)("button",{className:"close-popup-btn",onClick:this.popupClose,tabIndex:"-1",children:"x"}),Object(p.jsx)("textarea",{className:"response-form-popup__textarea rounded",type:"text",name:"responseMessageInput",placeholder:"\u0421\u043e\u043f\u0440\u043e\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0435 \u043f\u0438\u0441\u044c\u043c\u043e"}),Object(p.jsx)("input",{className:"sup-btn",type:"submit"})]})}}]),t}(c.Component)),f=Object(i.b)((function(e,s){return{userState:e.user.user,item:s.item,answerId:s.answerId,responseState:e.response}}),(function(e){return{onMakeResponse:function(s,t){e(Object(u.h)(s,t))},onChangeAnswer:function(s,t,n){e(Object(u.d)(s,t,n))},onCloseResponsePopup:function(){e({type:"CLOSE_RESPONSE_POPUP",payload:null})},onGetUserResponses:function(s,t,n,r){e(Object(d.f)()),e(Object(u.r)(s,t,n)).then((function(t){null!==t.data&&404!==t.data&&(e({type:"RESPONSE_UPDATE_RESULTS_COUNT",payload:t.data.count}),e({type:"RESPONSE_UPDATE_VALUES",payload:t.data.results}),t.data.results.forEach((function(e){r(n,e.id,s)})))})).then((function(s){return e(Object(d.g)())}))},onGetUserAnswers:function(s,t,n,r){e(Object(d.a)()),e(Object(u.p)(s,t,n)).then((function(t){null!==t.data&&404!==t.data&&(e({type:"ANSWERS_UPDATE_RESULTS_COUNT",payload:t.data.count}),e({type:"RESPONSE_UPDATE_ANSWERS",payload:t.data.results}),t.data.results.forEach((function(e){r(n,e.id,s)})))})).then((function(s){return e(Object(d.b)())}))},onNullifyValues:function(){e({type:"RESPONSE_NULLIFY_VALUES",payload:null})},onNullifyAnswers:function(){e({type:"RESPONSE_NULLIFY_ANSWERS",payload:null})},onSetValuePhoto:function(s,t,n){e("worker"===n?{type:"SEARCH_UPDATE_VALUES_PHOTO",payload:{photo:s,id:t}}:{type:"SEARCH_UPDATE_ANSWERS_PHOTO",payload:{photo:s,id:t}})}}}))(j),m=t(88),O=t(93),y=function(e){Object(o.a)(t,e);var s=Object(a.a)(t);function t(e){var r;return Object(n.a)(this,t),(r=s.call(this,e)).getAvatarFromFirebase=function(e,s){b.a.storage().ref().child("user-avatar"+e).getDownloadURL().then((function(e){return r.props.onSetValuePhoto(e,s)})).catch((function(e){return r.props.onSetValuePhoto("https://firebasestorage.googleapis.com/v0/b/diploma-55e3f.appspot.com/o/placeholder-avatar.jpg?alt=media&token=5058f243-49e5-4df4-8686-899c6ce12c54",s)}))},r.openVacancyInfo=function(e){r.props.onOpenVacancyInfo(e)},r.openResponsePopup=function(e,s){r.props.onOpenResponsePopup(e,s)},r.getInvites=function(){return r.props.responseState.responseAnswers.filter((function(e){return void 0===r.props.responseState.responseValues.find((function(s){return s.vacancy===e.vacancy&&s.cv===e.cv}))}))},r.getResults=function(){if(null!==r.props.responseState.nextValues||null!==r.props.responseState.nextAnswers){var e=Object(h.d)(r.props.userState.user_type);r.props.onGetUserResponses(e,r.props.responseState.nextValues,r.props.userState.id,r.getAvatarFromFirebase),console.log(r.props.responseState.nextValues,r.props.responseState.nextAnswers),r.props.onGetUserAnswers(e,r.props.responseState.nextAnswers,r.props.userState.id,r.getAvatarFromFirebase)}},r.state={openedId:-1},r}return Object(r.a)(t,[{key:"invertUserType",value:function(e){return"employer"===e?"worker":"employer"}},{key:"componentDidMount",value:function(){var e=this;this.props.onNullifyValues(),this.props.onNullifyAnswers(),console.log(this.props.userState.id),setTimeout((function(){e.getResults()}),0)}},{key:"getAnswer",value:function(e){return this.props.responseState.responseAnswers.find((function(s){return s.vacancy===e.vacancy&&s.cv===e.cv}))}},{key:"render",value:function(){var e=this;return this.props.responseState.responseLoading||this.props.responseState.answersLoading?Object(p.jsx)(l.a,{active:"active"}):Object(p.jsxs)("section",{className:"responses",children:[Object(p.jsx)("div",{className:"responses__header",children:Object(p.jsx)("h2",{className:"f-extra-large bold",children:"\u0412\u0430\u0448\u0438 \u043e\u0442\u043a\u043b\u0438\u043a\u0438 \u0438 \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u044f:"})}),0!==this.props.responseState.responseValues.length||0!==this.props.responseState.responseAnswers.length?Object(p.jsxs)("ul",{className:"responses__list rounded",children:[this.getInvites().map((function(s,t){return Object(p.jsxs)("li",{className:"responses__list-el rounded",children:[Object(p.jsxs)("div",{className:"responses__list-el__header",children:[Object(p.jsx)("button",{className:"responses__list-el__header__link",onClick:e.openVacancyInfo.bind(e,s.vacancy),children:Object(p.jsx)("h3",{className:"underline-link f-medium semi",children:s.vacancy_name})}),Object(p.jsx)("button",{className:"responses__list-el__header__btn"}),Object(p.jsx)("p",{className:"responses__list-el__header__response-date semi",children:Object(h.i)(s.date_response)}),Object(p.jsx)("p",{className:"green",children:"\u041f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435"})]}),Object(p.jsxs)("div",{className:"responses__list-el__body opened",children:[Object(p.jsxs)("div",{className:"responses__reciever responded",children:[Object(p.jsx)(_.b,{to:"/"+Object(h.k)(e.invertUserType(e.props.userState.user_type))+"/"+s[e.invertUserType(e.props.userState.user_type)],children:Object(p.jsx)("img",{className:"responses__avatar",src:""===s[e.invertUserType(e.props.userState.user_type)+"_avatar"]?"https://firebasestorage.googleapis.com/v0/b/diploma-55e3f.appspot.com/o/placeholder-avatar.jpg?alt=media&token=5058f243-49e5-4df4-8686-899c6ce12c54":s[e.invertUserType(e.props.userState.user_type)+"_avatar"],alt:""})}),Object(p.jsx)("p",{className:"responses__message rounded",children:s.message}),Object(p.jsx)("span",{className:"responses__decoration"})]}),Object(p.jsxs)("div",{className:"responses__sender controls",children:[Object(p.jsx)("button",{className:"sup-btn",onClick:e.openResponsePopup.bind(e,t,"accepted"),children:"\u043f\u0440\u0438\u043d\u044f\u0442\u044c"}),Object(p.jsx)("button",{className:"sup-btn",onClick:e.openResponsePopup.bind(e,t,"declined"),children:"\u043e\u0442\u043a\u0430\u0437\u0430\u0442\u044c"}),e.props.responseState.openedResponseId===t?Object(p.jsx)(f,{answerId:s.id,item:{owner_id:s[e.invertUserType(e.props.userState.user_type)],pk:s[Object(h.j)(e.invertUserType(e.props.userState.user_type))],answer:s[Object(h.j)(e.props.userState.user_type)],state:e.props.responseState.responseSendState}}):""]})]}),Object(p.jsx)("div",{className:"responses__list-el__footer"})]},t)})),this.props.responseState.responseValues.map((function(s,t){return Object(p.jsxs)("li",{className:"responses__list-el rounded",children:[Object(p.jsxs)("div",{className:"responses__list-el__header",children:[Object(p.jsx)("button",{className:"responses__list-el__header__link",onClick:e.openVacancyInfo.bind(e,s.vacancy),children:Object(p.jsx)("h3",{className:"underline-link f-medium semi",children:s.vacancy_name})}),Object(p.jsx)("button",{className:"responses__list-el__header__btn"}),Object(p.jsx)("p",{className:"responses__list-el__header__response-date semi",children:Object(h.i)(s.date_response)}),void 0!==e.getAnswer(s)?"viewed"===e.getAnswer(s).state?"accepted"===s.state?Object(p.jsx)("p",{className:"green",children:"\u041f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435"}):Object(p.jsx)("p",{className:"red",children:"\u041e\u0442\u043a\u0430\u0437"}):"declined"===e.getAnswer(s).state?Object(p.jsx)("p",{className:"red",children:"\u041e\u0442\u043a\u0430\u0437"}):"accepted"===e.props.responseState.responseAnswers.find((function(e){return e.vacancy===s.vacancy&&e.cv===s.cv})).state?Object(p.jsx)("p",{className:"green",children:"\u041f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435"}):"":""]}),Object(p.jsxs)("div",{className:"responses__list-el__body opened",children:[Object(p.jsxs)("div",{className:"responses__reciever "+("declined"===s.state||"accepted"===s.state||"viewed"===s.state?"responded":""),children:[Object(p.jsx)(_.b,{to:"/"+Object(h.k)(e.invertUserType(e.props.userState.user_type))+"/"+s[e.invertUserType(e.props.userState.user_type)],children:Object(p.jsx)("img",{className:"responses__avatar",src:""===s[e.invertUserType(e.props.userState.user_type)+"_avatar"]?"https://firebasestorage.googleapis.com/v0/b/diploma-55e3f.appspot.com/o/placeholder-avatar.jpg?alt=media&token=5058f243-49e5-4df4-8686-899c6ce12c54":s[e.invertUserType(e.props.userState.user_type)+"_avatar"],alt:""})}),"sent"===s.state?Object(p.jsx)("p",{className:"responses__message rounded",children:"\u041e\u0442\u0432\u0435\u0442\u0430 \u043f\u043e\u043a\u0430 \u043d\u0435\u0442 :( "}):"accepted"===s.state||"declined"===s.state||"viewed"===s.state?Object(p.jsx)("p",{className:"responses__message rounded responded",children:void 0!==e.getAnswer(s)?e.getAnswer(s).message:""}):"",Object(p.jsx)("span",{className:"responses__decoration"})]}),Object(p.jsxs)("div",{className:"responses__sender responded",children:[Object(p.jsx)("p",{className:"responses__message rounded responded",children:s.message}),Object(p.jsx)("span",{className:"responses__decoration "}),Object(p.jsx)(_.b,{to:"/"+Object(h.k)(e.props.userState.user_type)+"/"+e.props.userState.id,children:Object(p.jsx)("img",{className:"responses__avatar",src:e.props.userAvatar,alt:""})})]})]}),Object(p.jsx)("div",{className:"responses__list-el__footer"})]},t)}))]}):Object(p.jsx)("p",{children:"\u041e\u0442\u043a\u043b\u0438\u043a\u043e\u0432 \u043d\u0435\u0442 :("}),-1!==this.props.responseState.openedVacancyId?Object(p.jsx)(O.a,{id:this.props.responseState.openedVacancyId}):"",Object(p.jsx)(m.a,{as:"div",onChange:function(s,t){s&&e.getResults()}})]})}}]),t}(c.Component);s.default=Object(i.b)((function(e){return{userState:e.user.user,responseState:e.response,userAvatar:e.nav.avatar}}),(function(e){return{onGetUserResponses:function(s,t,n,r){e(Object(d.f)()),e(Object(u.r)(s,t,n)).then((function(s){null!==s.data&&404!==s.data&&(e({type:"RESPONSE_UPDATE_RESULTS_COUNT",payload:s.data.count}),e({type:"RESPONSE_UPDATE_VALUES",payload:s.data.results}),s.data.results.forEach((function(e){r(n,e.id)})))})).then((function(s){return e(Object(d.g)())}))},onGetUserAnswers:function(s,t,n,r){e(Object(d.a)()),e(Object(u.p)(s,t,n)).then((function(s){null!==s.data&&404!==s.data&&(e({type:"ANSWERS_UPDATE_RESULTS_COUNT",payload:s.data.count}),e({type:"RESPONSE_UPDATE_ANSWERS",payload:s.data.results}),s.data.results.forEach((function(e){r(n,e.id)})))})).then((function(s){return e(Object(d.b)())}))},onSetValuePhoto:function(s,t){e({type:"RESPONSE_UPDATE_ANSWERS_PHOTO",payload:{photo:s,id:t}})},onNullifyValues:function(){e({type:"RESPONSE_NULLIFY_VALUES",payload:null})},onNullifyAnswers:function(){e({type:"RESPONSE_NULLIFY_ANSWERS",payload:null})},onOpenResponsePopup:function(s,t){e({type:"RESPONSE_OPEN_RESPONSE_POPUP",payload:{index:s,state:t}})},onOpenVacancyInfo:function(s){e({type:"OPEN_VACANCY_POPUP",payload:s})}}}))(y)},88:function(e,s,t){"use strict";t.d(s,"a",(function(){return u}));var n=t(4);function r(){return(r=Object.assign||function(e){for(var s=1;s<arguments.length;s++){var t=arguments[s];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}var o=new Map,a=new Map,p=0;function c(e){return Object.keys(e).sort().filter((function(s){return void 0!==e[s]})).map((function(s){return s+"_"+("root"===s?(t=e.root)?(a.has(t)||(p+=1,a.set(t,p.toString())),a.get(t)):"0":e[s]);var t})).toString()}function i(e,s,t){if(void 0===t&&(t={}),!e)return function(){};var n=function(e){var s=c(e),t=o.get(s);if(!t){var n,r=new Map,a=new IntersectionObserver((function(s){s.forEach((function(s){var t,o=s.isIntersecting&&n.some((function(e){return s.intersectionRatio>=e}));e.trackVisibility&&"undefined"===typeof s.isVisible&&(s.isVisible=o),null==(t=r.get(s.target))||t.forEach((function(e){e(o,s)}))}))}),e);n=a.thresholds||(Array.isArray(e.threshold)?e.threshold:[e.threshold||0]),t={id:s,observer:a,elements:r},o.set(s,t)}return t}(t),r=n.id,a=n.observer,p=n.elements,i=p.get(e)||[];return p.has(e)||p.set(e,i),i.push(s),a.observe(e),function(){i.splice(i.indexOf(s),1),0===i.length&&(p.delete(e),a.unobserve(e)),0===p.size&&(a.disconnect(),o.delete(r))}}function l(e){return"function"!==typeof e.children}var u=function(e){var s,t;function o(s){var t;return(t=e.call(this,s)||this).node=null,t._unobserveCb=null,t.handleNode=function(e){t.node&&(t.unobserve(),e||t.props.triggerOnce||t.props.skip||t.setState({inView:!!t.props.initialInView,entry:void 0})),t.node=e||null,t.observeNode()},t.handleChange=function(e,s){e&&t.props.triggerOnce&&t.unobserve(),l(t.props)||t.setState({inView:e,entry:s}),t.props.onChange&&t.props.onChange(e,s)},t.state={inView:!!s.initialInView,entry:void 0},t}t=e,(s=o).prototype=Object.create(t.prototype),s.prototype.constructor=s,s.__proto__=t;var a=o.prototype;return a.componentDidUpdate=function(e){e.rootMargin===this.props.rootMargin&&e.root===this.props.root&&e.threshold===this.props.threshold&&e.skip===this.props.skip&&e.trackVisibility===this.props.trackVisibility&&e.delay===this.props.delay||(this.unobserve(),this.observeNode())},a.componentWillUnmount=function(){this.unobserve(),this.node=null},a.observeNode=function(){if(this.node&&!this.props.skip){var e=this.props,s=e.threshold,t=e.root,n=e.rootMargin,r=e.trackVisibility,o=e.delay;this._unobserveCb=i(this.node,this.handleChange,{threshold:s,root:t,rootMargin:n,trackVisibility:r,delay:o})}},a.unobserve=function(){this._unobserveCb&&(this._unobserveCb(),this._unobserveCb=null)},a.render=function(){if(!l(this.props)){var e=this.state,s=e.inView,t=e.entry;return this.props.children({inView:s,entry:t,ref:this.handleNode})}var o=this.props,a=o.children,p=o.as,c=o.tag,i=function(e,s){if(null==e)return{};var t,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],s.indexOf(t)>=0||(r[t]=e[t]);return r}(o,["children","as","tag","triggerOnce","threshold","root","rootMargin","onChange","skip","trackVisibility","delay","initialInView"]);return Object(n.createElement)(p||c||"div",r({ref:this.handleNode},i),a)},o}(n.Component);u.displayName="InView",u.defaultProps={threshold:0,triggerOnce:!1,initialInView:!1}},93:function(e,s,t){"use strict";var n=t(14),r=t(15),o=t(17),a=t(16),p=t(2),c=t(4),i=t(18),l=t(24),u=t(13),d=(t(94),function(e){Object(o.a)(t,e);var s=Object(a.a)(t);function t(){return Object(n.a)(this,t),s.apply(this,arguments)}return Object(r.a)(t,[{key:"componentDidMount",value:function(){this.props.onGetVacancy(this.props.id)}},{key:"popupClose",value:function(e){e.preventDefault(),this.props.onCloseVacancyPopup()}},{key:"render",value:function(){return console.log(Object.keys(this.props.openedVacancy).length),0!==Object.keys(this.props.openedVacancy).length?Object(p.jsx)("div",{className:"blur-box active",onClick:this.popupClose.bind(this),children:Object(p.jsxs)("div",{className:"resume resumes-list-el popup-wrapper rounded",children:[Object(p.jsxs)("section",{className:"resume-main",children:[Object(p.jsxs)("div",{className:"resume__header white top-rounded "+this.props.openedVacancy.bg_header_color,children:[Object(p.jsxs)("div",{className:"resume__header-top",children:[Object(p.jsx)("h2",{className:"resume__header__name bold f-large",children:this.props.openedVacancy.vacancy_name}),Object(p.jsxs)("p",{children:[Object(p.jsx)("span",{className:"resume__header__salary bold f-medium",children:this.props.openedVacancy.salary}),Object(p.jsx)("span",{className:"bold f-medium",children:" \u0440\u0443\u0431."})]})]}),Object(p.jsxs)("div",{className:"resume__header-bottom",children:[Object(p.jsx)("p",{className:"resume__header__grade",children:Object(l.c)(this.props.openedVacancy.grade)}),Object(p.jsx)("p",{className:"resume__publication-date sup",children:this.props.openedVacancy.pub_date.slice(0,10)})]})]}),Object(p.jsxs)("div",{className:"resume__main-info bottom-rounded full-width",children:[Object(p.jsx)("p",{className:"resume__industry f-pre",children:this.props.openedVacancy.industry}),Object(p.jsx)("p",{className:"resume__work-type",children:this.props.openedVacancy.work_type.map((function(e){return Object(l.e)(e)})).join(", ")}),Object(p.jsxs)("div",{className:"vacancy__about",children:[Object(p.jsx)("p",{children:this.props.openedVacancy.leading}),Object(p.jsx)("ul",{className:"vacancy__about__body-list",children:this.props.openedVacancy.body.map((function(e,s){return Object(p.jsxs)("li",{children:[Object(p.jsx)("h3",{className:"bold f-large",children:e.title}),Object(p.jsx)("h4",{className:"bold f-medium",children:e.subtitle}),Object(p.jsx)("ul",{className:"vacancy__about__body-list__points-list",children:e.points.map((function(e,s){return Object(p.jsx)("li",{children:e},s)}))})]},s)}))}),Object(p.jsx)("p",{children:this.props.openedVacancy.trailing})]}),Object(p.jsx)("ul",{className:"resume__tags-list",children:this.props.openedVacancy.tags.map((function(e,s){return Object(p.jsx)("li",{className:"resume__tags-list-el",children:e},s)}))})]})]}),Object(p.jsx)("button",{className:"close-popup-btn",onClick:this.popupClose.bind(this),tabIndex:"-1",children:"x"})]})}):""}}]),t}(c.Component));s.a=Object(u.b)((function(e,s){return{openedVacancy:e.buf.openedVacancy,id:s.id}}),(function(e){return{onGetVacancy:function(s){e(Object(i.u)(s))},onCloseVacancyPopup:function(){e({type:"CLOSE_VACANCY_POPUP",payload:null})}}}))(d)},94:function(e,s,t){}}]);
//# sourceMappingURL=8.137d22a1.chunk.js.map