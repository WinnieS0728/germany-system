import{r as l,k as h,R as N,W as m,j as R}from"./index-d92dbf70.js";import{b as K,S as ee,_ as te,c as ne,m as ie,d as re,e as V,f as D,A as ae}from"./react-select-async.esm-21729001.js";import{_ as v,a as U}from"./use-isomorphic-layout-effect.browser.esm-49653e3d.js";var oe=l.forwardRef(function(u,r){var i=K(u);return l.createElement(ee,v({ref:r},i))}),ue=oe;function G(u,r){u.prototype=Object.create(r.prototype),u.prototype.constructor=u,te(u,r)}const L={disabled:!1},A=h.createContext(null);var se=function(r){return r.scrollTop},O="unmounted",x="exited",g="entering",M="entered",I="exiting",E=function(u){G(r,u);function r(a,t){var e;e=u.call(this,a,t)||this;var n=t,o=n&&!n.isMounting?a.enter:a.appear,s;return e.appearStatus=null,a.in?o?(s=x,e.appearStatus=g):s=M:a.unmountOnExit||a.mountOnEnter?s=O:s=x,e.state={status:s},e.nextCallback=null,e}r.getDerivedStateFromProps=function(t,e){var n=t.in;return n&&e.status===O?{status:x}:null};var i=r.prototype;return i.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},i.componentDidUpdate=function(t){var e=null;if(t!==this.props){var n=this.state.status;this.props.in?n!==g&&n!==M&&(e=g):(n===g||n===M)&&(e=I)}this.updateStatus(!1,e)},i.componentWillUnmount=function(){this.cancelNextCallback()},i.getTimeouts=function(){var t=this.props.timeout,e,n,o;return e=n=o=t,t!=null&&typeof t!="number"&&(e=t.exit,n=t.enter,o=t.appear!==void 0?t.appear:n),{exit:e,enter:n,appear:o}},i.updateStatus=function(t,e){if(t===void 0&&(t=!1),e!==null)if(this.cancelNextCallback(),e===g){if(this.props.unmountOnExit||this.props.mountOnEnter){var n=this.props.nodeRef?this.props.nodeRef.current:N.findDOMNode(this);n&&se(n)}this.performEnter(t)}else this.performExit();else this.props.unmountOnExit&&this.state.status===x&&this.setState({status:O})},i.performEnter=function(t){var e=this,n=this.props.enter,o=this.context?this.context.isMounting:t,s=this.props.nodeRef?[o]:[N.findDOMNode(this),o],c=s[0],d=s[1],f=this.getTimeouts(),p=o?f.appear:f.enter;if(!t&&!n||L.disabled){this.safeSetState({status:M},function(){e.props.onEntered(c)});return}this.props.onEnter(c,d),this.safeSetState({status:g},function(){e.props.onEntering(c,d),e.onTransitionEnd(p,function(){e.safeSetState({status:M},function(){e.props.onEntered(c,d)})})})},i.performExit=function(){var t=this,e=this.props.exit,n=this.getTimeouts(),o=this.props.nodeRef?void 0:N.findDOMNode(this);if(!e||L.disabled){this.safeSetState({status:x},function(){t.props.onExited(o)});return}this.props.onExit(o),this.safeSetState({status:I},function(){t.props.onExiting(o),t.onTransitionEnd(n.exit,function(){t.safeSetState({status:x},function(){t.props.onExited(o)})})})},i.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},i.safeSetState=function(t,e){e=this.setNextCallback(e),this.setState(t,e)},i.setNextCallback=function(t){var e=this,n=!0;return this.nextCallback=function(o){n&&(n=!1,e.nextCallback=null,t(o))},this.nextCallback.cancel=function(){n=!1},this.nextCallback},i.onTransitionEnd=function(t,e){this.setNextCallback(e);var n=this.props.nodeRef?this.props.nodeRef.current:N.findDOMNode(this),o=t==null&&!this.props.addEndListener;if(!n||o){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var s=this.props.nodeRef?[this.nextCallback]:[n,this.nextCallback],c=s[0],d=s[1];this.props.addEndListener(c,d)}t!=null&&setTimeout(this.nextCallback,t)},i.render=function(){var t=this.state.status;if(t===O)return null;var e=this.props,n=e.children;e.in,e.mountOnEnter,e.unmountOnExit,e.appear,e.enter,e.exit,e.timeout,e.addEndListener,e.onEnter,e.onEntering,e.onEntered,e.onExit,e.onExiting,e.onExited,e.nodeRef;var o=U(e,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return h.createElement(A.Provider,{value:null},typeof n=="function"?n(t,o):h.cloneElement(h.Children.only(n),o))},r}(h.Component);E.contextType=A;E.propTypes={};function C(){}E.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:C,onEntering:C,onEntered:C,onExit:C,onExiting:C,onExited:C};E.UNMOUNTED=O;E.EXITED=x;E.ENTERING=g;E.ENTERED=M;E.EXITING=I;const W=E;function k(u,r){var i=function(e){return r&&l.isValidElement(e)?r(e):e},a=Object.create(null);return u&&l.Children.map(u,function(t){return t}).forEach(function(t){a[t.key]=i(t)}),a}function le(u,r){u=u||{},r=r||{};function i(d){return d in r?r[d]:u[d]}var a=Object.create(null),t=[];for(var e in u)e in r?t.length&&(a[e]=t,t=[]):t.push(e);var n,o={};for(var s in r){if(a[s])for(n=0;n<a[s].length;n++){var c=a[s][n];o[a[s][n]]=i(c)}o[s]=i(s)}for(n=0;n<t.length;n++)o[t[n]]=i(t[n]);return o}function S(u,r,i){return i[r]!=null?i[r]:u.props[r]}function ce(u,r){return k(u.children,function(i){return l.cloneElement(i,{onExited:r.bind(null,i),in:!0,appear:S(i,"appear",u),enter:S(i,"enter",u),exit:S(i,"exit",u)})})}function de(u,r,i){var a=k(u.children),t=le(r,a);return Object.keys(t).forEach(function(e){var n=t[e];if(l.isValidElement(n)){var o=e in r,s=e in a,c=r[e],d=l.isValidElement(c)&&!c.props.in;s&&(!o||d)?t[e]=l.cloneElement(n,{onExited:i.bind(null,n),in:!0,exit:S(n,"exit",u),enter:S(n,"enter",u)}):!s&&o&&!d?t[e]=l.cloneElement(n,{in:!1}):s&&o&&l.isValidElement(c)&&(t[e]=l.cloneElement(n,{onExited:i.bind(null,n),in:c.props.in,exit:S(n,"exit",u),enter:S(n,"enter",u)}))}}),t}var pe=Object.values||function(u){return Object.keys(u).map(function(r){return u[r]})},fe={component:"div",childFactory:function(r){return r}},F=function(u){G(r,u);function r(a,t){var e;e=u.call(this,a,t)||this;var n=e.handleExited.bind(ne(e));return e.state={contextValue:{isMounting:!0},handleExited:n,firstRender:!0},e}var i=r.prototype;return i.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},i.componentWillUnmount=function(){this.mounted=!1},r.getDerivedStateFromProps=function(t,e){var n=e.children,o=e.handleExited,s=e.firstRender;return{children:s?ce(t,o):de(t,n,o),firstRender:!1}},i.handleExited=function(t,e){var n=k(this.props.children);t.key in n||(t.props.onExited&&t.props.onExited(e),this.mounted&&this.setState(function(o){var s=v({},o.children);return delete s[t.key],{children:s}}))},i.render=function(){var t=this.props,e=t.component,n=t.childFactory,o=U(t,["component","childFactory"]),s=this.state.contextValue,c=pe(this.state.children).map(n);return delete o.appear,delete o.enter,delete o.exit,e===null?h.createElement(A.Provider,{value:s},c):h.createElement(A.Provider,{value:s},h.createElement(e,o,c))},r}(h.Component);F.propTypes={};F.defaultProps=fe;const X=F;var me=["in","onExited","appear","enter","exit"],he=function(r){return function(i){i.in,i.onExited,i.appear,i.enter,i.exit;var a=V(i,me);return l.createElement(r,a)}},ve=he,Ee=["component","duration","in","onExited"],z=function(r){var i=r.component,a=r.duration,t=a===void 0?1:a,e=r.in;r.onExited;var n=V(r,Ee),o=l.useRef(null),s={entering:{opacity:0},entered:{opacity:1,transition:"opacity ".concat(t,"ms")},exiting:{opacity:0},exited:{opacity:0}};return l.createElement(W,{mountOnEnter:!0,unmountOnExit:!0,in:e,timeout:t,nodeRef:o},function(c){var d={style:m({},s[c]),ref:o};return l.createElement(i,v({innerProps:d},n))})},w=260,xe=function(r){var i=r.children,a=r.in,t=r.onExited,e=l.useRef(null),n=l.useState("auto"),o=D(n,2),s=o[0],c=o[1];l.useEffect(function(){var f=e.current;if(f){var p=window.requestAnimationFrame(function(){return c(f.getBoundingClientRect().width)});return function(){return window.cancelAnimationFrame(p)}}},[]);var d=function(p){switch(p){default:return{width:s};case"exiting":return{width:0,transition:"width ".concat(w,"ms ease-out")};case"exited":return{width:0}}};return l.createElement(W,{enter:!1,mountOnEnter:!0,unmountOnExit:!0,in:a,onExited:function(){var p=e.current;p&&(t==null||t(p))},timeout:w,nodeRef:e},function(f){return l.createElement("div",{ref:e,style:m({overflow:"hidden",whiteSpace:"nowrap"},d(f))},i)})},ge=["in","onExited"],Se=function(r){return function(i){var a=i.in,t=i.onExited,e=V(i,ge);return l.createElement(xe,{in:a,onExited:t},l.createElement(r,v({cropWithEllipsis:a},e)))}},Ce=Se,Me=function(r){return function(i){return l.createElement(z,v({component:r,duration:i.isMulti?w:1},i))}},Ve=Me,be=function(r){return function(i){return l.createElement(z,v({component:r},i))}},Oe=be,Te=["component"],Pe=["children"],ye=function(r){return function(i){return i.isMulti?l.createElement(Ne,v({component:r},i)):l.createElement(X,v({component:r},i))}},Ne=function(r){var i=r.component,a=V(r,Te),t=Re(a);return l.createElement(X,v({component:i},t))},Re=function(r){var i=r.children,a=V(r,Pe),t=a.isMulti,e=a.hasValue,n=a.innerProps,o=a.selectProps,s=o.components,c=o.controlShouldRenderValue,d=l.useState(t&&c&&e),f=D(d,2),p=f[0],P=f[1],y=l.useState(!1),_=D(y,2),$=_[0],j=_[1];l.useEffect(function(){e&&!p&&P(!0)},[e,p]),l.useEffect(function(){$&&!e&&p&&P(!1),j(!1)},[$,e,p]);var H=function(){return j(!0)},J=function(b){if(t&&l.isValidElement(b)){if(b.type===s.MultiValue)return l.cloneElement(b,{onExited:H});if(b.type===s.Placeholder&&p)return null}return b},Q=m(m({},n),{},{style:m(m({},n==null?void 0:n.style),{},{display:t&&e||p?"flex":"grid"})}),Y=m(m({},a),{},{innerProps:Q,children:l.Children.toArray(i).map(J)});return Y},Ae=ye,De=["Input","MultiValue","Placeholder","SingleValue","ValueContainer"],q=function(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},i=re({components:r}),a=i.Input,t=i.MultiValue,e=i.Placeholder,n=i.SingleValue,o=i.ValueContainer,s=V(i,De);return m({Input:ve(a),MultiValue:Ce(t),Placeholder:Ve(e),SingleValue:Oe(n),ValueContainer:Ae(o)},s)},T=q();T.Input;T.MultiValue;T.Placeholder;T.SingleValue;T.ValueContainer;var Ie=ie(q);const B=Ie(),we=({options:u,onChange:r,clear:i,autoClose:a,disable:t,placeholder:e,noOptionComponent:n,forwardRef:o,multi:s})=>{function c(d){r(d?d.value:"")}return R.jsx(R.Fragment,{children:R.jsx(ue,{ref:o,components:B,options:u,onChange:c,isClearable:i,isMulti:s,closeMenuOnSelect:a,isDisabled:t,placeholder:e,className:"w-full",noOptionsMessage:()=>n})})},ke=({options:u,onChange:r,clear:i,autoClose:a,disable:t,placeholder:e,noOptionComponent:n,getLabelFunction:o,getValueFunction:s,filterFunction:c,value:d,forwardRef:f,multi:p})=>{function P(y){r(y?y[d]:"")}return R.jsx(ae,{ref:f,components:B,cacheOptions:!0,defaultOptions:!0,loadOptions:u,getOptionLabel:o,getOptionValue:s,filterOption:c,onChange:P,isClearable:i,isMulti:p,closeMenuOnSelect:a,isDisabled:t,placeholder:e,className:"w-full",noOptionsMessage:()=>n})},je={Normal:we,Async:ke};export{je as M};
