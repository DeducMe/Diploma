(this.webpackJsonpdev=this.webpackJsonpdev||[]).push([[9],{124:function(e,t,n){},133:function(e,t,n){"use strict";n.r(t);var r=n(15),o=n(16),s=n(18),a=n(17),i=n(2),c=n(4),l=(n(124),n(14)),u=n(20),p=n(19),h=n(35),d=n(30),b=n(25),f=n(91),_=function(e){Object(s.a)(n,e);var t=Object(a.a)(n);function n(){var e;Object(r.a)(this,n);for(var o=arguments.length,s=new Array(o),a=0;a<o;a++)s[a]=arguments[a];return(e=t.call.apply(t,[this].concat(s))).getSearchValues=function(){console.log("get"),!1===e.props.searchState.searchLoading&&setTimeout((function(){e.props.onGetSearchResponse(Object(b.h)(e.props.searchOptions),e.props.searchOptions.searchType,e.props.searchState.next,e.getAvatarFromFirebase)}),0)},e.getAvatarFromFirebase=function(t,n){d.a.storage().ref().child("user-avatar"+t).getDownloadURL().then((function(t){return e.props.onSetValuePhoto(t,n)})).catch((function(t){return e.props.onSetValuePhoto("https://firebasestorage.googleapis.com/v0/b/diploma-55e3f.appspot.com/o/placeholder-avatar.jpg?alt=media&token=5058f243-49e5-4df4-8686-899c6ce12c54",n)}))},e}return Object(o.a)(n,[{key:"componentDidMount",value:function(){console.log(this.props.searchState),this.getSearchValues()}},{key:"render",value:function(){var e=this;return Object(i.jsxs)("div",{className:"landing-wrapper",children:[Object(i.jsx)("div",{className:"landing__main white",children:Object(i.jsx)("h2",{className:"f-extra-large bold main-header",children:"\u041f\u043e\u0440\u0430 \u0432\u0441\u0442\u0430\u0442\u044c \u043d\u0430 \u043f\u0435\u0440\u0432\u0443\u044e \u0441\u0442\u0443\u043f\u0435\u043d\u044c \u0441\u0432\u043e\u0435\u0439 \u043a\u0430\u0440\u044c\u0435\u0440\u043d\u043e\u0439 \u043b\u0435\u0441\u0442\u043d\u0438\u0446\u044b!"})}),Object(i.jsx)("ul",{className:"landing__recomendations",children:this.props.searchValues.map((function(t,n){return Object(i.jsx)("li",{className:"resume resumes-landing-list-el rounded",children:Object(i.jsxs)("section",{className:"resume-main",children:[Object(i.jsxs)("div",{className:"resume__header white top-rounded "+t.bg_header_color,children:[Object(i.jsxs)("div",{className:"resume__header-top",children:[Object(i.jsx)("h2",{className:"resume__header__name bold text-overflow",children:t.vacancy_name}),-1===t.salary?Object(i.jsx)("span",{className:"resume__header__salary bold text-overflow",children:"\u0417\u0430\u0440\u043f\u043b\u0430\u0442\u0430 \u043d\u0435 \u0443\u043a\u0430\u0437\u0430\u043d\u0430"}):Object(i.jsxs)("span",{className:"resume__header__salary bold text-overflow",children:[t.salary," \u0440\u0443\u0431."]})]}),Object(i.jsxs)("div",{className:"resume__header-bottom",children:[Object(i.jsx)("p",{className:"resume__header__grade",children:Object(b.d)(t.grade)}),Object(i.jsx)("p",{className:"resume__publication-date sup",children:t.pub_date.slice(0,10)})]})]}),Object(i.jsxs)("div",{className:"resume__main-info bottom-rounded flex",children:[Object(i.jsxs)("div",{className:"resume__main-info__text",children:[Object(i.jsx)("p",{className:"resume__industry f-pre",children:t.industry}),Object(i.jsx)("p",{className:"resume__work-type",children:t.work_type.map((function(e){return Object(b.f)(e)})).join(", ")}),Object(i.jsx)("p",{className:"resume__about",children:t.about||t.leading})]}),Object(i.jsxs)(u.b,{className:"resume__main-info__avatar-name-block",to:"/"+Object(b.i)(e.props.searchOptions.searchType)+"/"+t.owner_id,children:[Object(i.jsx)("img",{className:"avatar-name-block__small-avatar",src:t.photo_url,alt:"\u0430\u0432\u0430\u0442\u0430\u0440"}),Object(i.jsx)("p",{children:t.owner})]})]})]})},n)}))}),Object(i.jsx)(f.a,{as:"div",onChange:function(t,n){console.log(t),t&&e.getSearchValues(!1)}})]})}}]),n}(c.Component);t.default=Object(l.b)((function(e){return{searchState:e.search,searchOptions:e.search.searchOptions,searchValues:e.search.searchValues}}),(function(e){return{onNullifyValues:function(){e({type:"SEARCH_NULLIFY_VALUES",payload:null})},onNullifySearchOptions:function(){e({type:"SEARCH_NULLIFY_OPTIONS",payload:null})},onUpdateValues:function(t){e({type:"SEARCH_UPDATE_VALUES",payload:t})},onSortValues:function(t){e({type:"SEARCH_SORT_VALUES",payload:t})},onChangeSearchQuery:function(t){e({type:"CHANGE_SEARCH_QUERY",payload:t})},onGetSearchResponse:function(t,n,r,o){e(Object(h.h)()),e(Object(p.o)(t,n,r)).then((function(t){null!==t.data&&404!==t.data&&(e({type:"SEARCH_UPDATE_OPTIONS",payload:t.data.next}),e({type:"SEARCH_UPDATE_RESULTS_COUNT",payload:t.data.count}),e({type:"SEARCH_UPDATE_VALUES",payload:t.data.results}),t.data.results.forEach((function(e){""===e.photo_url&&o(e.owner_id,e.pk)})))})).then((function(t){return e(Object(h.i)())}))},onSetValuePhoto:function(t,n){console.log("photo"),e({type:"SEARCH_UPDATE_VALUES_PHOTO",payload:{photo:t,id:n}})}}}))(_)},91:function(e,t,n){"use strict";n.d(t,"a",(function(){return p}));var r=n(4);function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var s=new Map,a=new Map,i=0;function c(e){return Object.keys(e).sort().filter((function(t){return void 0!==e[t]})).map((function(t){return t+"_"+("root"===t?(n=e.root)?(a.has(n)||(i+=1,a.set(n,i.toString())),a.get(n)):"0":e[t]);var n})).toString()}function l(e,t,n){if(void 0===n&&(n={}),!e)return function(){};var r=function(e){var t=c(e),n=s.get(t);if(!n){var r,o=new Map,a=new IntersectionObserver((function(t){t.forEach((function(t){var n,s=t.isIntersecting&&r.some((function(e){return t.intersectionRatio>=e}));e.trackVisibility&&"undefined"===typeof t.isVisible&&(t.isVisible=s),null==(n=o.get(t.target))||n.forEach((function(e){e(s,t)}))}))}),e);r=a.thresholds||(Array.isArray(e.threshold)?e.threshold:[e.threshold||0]),n={id:t,observer:a,elements:o},s.set(t,n)}return n}(n),o=r.id,a=r.observer,i=r.elements,l=i.get(e)||[];return i.has(e)||i.set(e,l),l.push(t),a.observe(e),function(){l.splice(l.indexOf(t),1),0===l.length&&(i.delete(e),a.unobserve(e)),0===i.size&&(a.disconnect(),s.delete(o))}}function u(e){return"function"!==typeof e.children}var p=function(e){var t,n;function s(t){var n;return(n=e.call(this,t)||this).node=null,n._unobserveCb=null,n.handleNode=function(e){n.node&&(n.unobserve(),e||n.props.triggerOnce||n.props.skip||n.setState({inView:!!n.props.initialInView,entry:void 0})),n.node=e||null,n.observeNode()},n.handleChange=function(e,t){e&&n.props.triggerOnce&&n.unobserve(),u(n.props)||n.setState({inView:e,entry:t}),n.props.onChange&&n.props.onChange(e,t)},n.state={inView:!!t.initialInView,entry:void 0},n}n=e,(t=s).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n;var a=s.prototype;return a.componentDidUpdate=function(e){e.rootMargin===this.props.rootMargin&&e.root===this.props.root&&e.threshold===this.props.threshold&&e.skip===this.props.skip&&e.trackVisibility===this.props.trackVisibility&&e.delay===this.props.delay||(this.unobserve(),this.observeNode())},a.componentWillUnmount=function(){this.unobserve(),this.node=null},a.observeNode=function(){if(this.node&&!this.props.skip){var e=this.props,t=e.threshold,n=e.root,r=e.rootMargin,o=e.trackVisibility,s=e.delay;this._unobserveCb=l(this.node,this.handleChange,{threshold:t,root:n,rootMargin:r,trackVisibility:o,delay:s})}},a.unobserve=function(){this._unobserveCb&&(this._unobserveCb(),this._unobserveCb=null)},a.render=function(){if(!u(this.props)){var e=this.state,t=e.inView,n=e.entry;return this.props.children({inView:t,entry:n,ref:this.handleNode})}var s=this.props,a=s.children,i=s.as,c=s.tag,l=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(s,["children","as","tag","triggerOnce","threshold","root","rootMargin","onChange","skip","trackVisibility","delay","initialInView"]);return Object(r.createElement)(i||c||"div",o({ref:this.handleNode},l),a)},s}(r.Component);p.displayName="InView",p.defaultProps={threshold:0,triggerOnce:!1,initialInView:!1}}}]);
//# sourceMappingURL=9.044cf64d.chunk.js.map