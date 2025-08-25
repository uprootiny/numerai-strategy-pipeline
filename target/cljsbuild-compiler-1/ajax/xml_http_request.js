// Compiled by ClojureScript 1.10.520 {:static-fns true, :optimize-constants true}
goog.provide('ajax.xml_http_request');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('ajax.protocols');
goog.require('goog.string');
ajax.xml_http_request.ready_state = (function ajax$xml_http_request$ready_state(e){
var G__6653 = e.target.readyState;
var fexpr__6652 = new cljs.core.PersistentArrayMap(null, 6, [(0),cljs.core.cst$kw$not_DASH_initialized,(1),cljs.core.cst$kw$connection_DASH_established,(2),cljs.core.cst$kw$request_DASH_received,(3),cljs.core.cst$kw$processing_DASH_request,(4),cljs.core.cst$kw$response_DASH_ready,cljs.core.cst$kw$cljs$analyzer_SLASH_analyzed,true], null);
return (fexpr__6652.cljs$core$IFn$_invoke$arity$1 ? fexpr__6652.cljs$core$IFn$_invoke$arity$1(G__6653) : fexpr__6652.call(null,G__6653));
});
ajax.xml_http_request.append = (function ajax$xml_http_request$append(current,next){
if(cljs.core.truth_(current)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(current),", ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(next)].join('');
} else {
return next;
}
});
ajax.xml_http_request.process_headers = (function ajax$xml_http_request$process_headers(header_str){
if(cljs.core.truth_(header_str)){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (headers,header_line){
if(cljs.core.truth_(goog.string.isEmptyOrWhitespace(header_line))){
return headers;
} else {
var key_value = goog.string.splitLimit(header_line,": ",(2));
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(headers,(key_value[(0)]),ajax.xml_http_request.append,(key_value[(1)]));
}
}),cljs.core.PersistentArrayMap.EMPTY,header_str.split("\r\n"));
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
});
ajax.xml_http_request.xmlhttprequest = (((typeof goog !== 'undefined') && (typeof goog.global !== 'undefined') && (typeof goog.global.XMLHttpRequest !== 'undefined'))?goog.global.XMLHttpRequest:(((typeof require !== 'undefined'))?(function (){var req = require;
return (req.cljs$core$IFn$_invoke$arity$1 ? req.cljs$core$IFn$_invoke$arity$1("xmlhttprequest") : req.call(null,"xmlhttprequest")).XMLHttpRequest;
})():null));
ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxImpl$ = cljs.core.PROTOCOL_SENTINEL;

ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxImpl$_js_ajax_request$arity$3 = (function (this$,p__6655,handler){
var map__6656 = p__6655;
var map__6656__$1 = (((((!((map__6656 == null))))?(((((map__6656.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6656.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__6656):map__6656);
var uri = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6656__$1,cljs.core.cst$kw$uri);
var method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6656__$1,cljs.core.cst$kw$method);
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6656__$1,cljs.core.cst$kw$body);
var headers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6656__$1,cljs.core.cst$kw$headers);
var timeout = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__6656__$1,cljs.core.cst$kw$timeout,(0));
var with_credentials = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__6656__$1,cljs.core.cst$kw$with_DASH_credentials,false);
var response_format = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6656__$1,cljs.core.cst$kw$response_DASH_format);
var this$__$1 = this;
this$__$1.withCredentials = with_credentials;

this$__$1.onreadystatechange = ((function (this$__$1,map__6656,map__6656__$1,uri,method,body,headers,timeout,with_credentials,response_format){
return (function (p1__6654_SHARP_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$response_DASH_ready,ajax.xml_http_request.ready_state(p1__6654_SHARP_))){
return (handler.cljs$core$IFn$_invoke$arity$1 ? handler.cljs$core$IFn$_invoke$arity$1(this$__$1) : handler.call(null,this$__$1));
} else {
return null;
}
});})(this$__$1,map__6656,map__6656__$1,uri,method,body,headers,timeout,with_credentials,response_format))
;

this$__$1.open(method,uri,true);

this$__$1.timeout = timeout;

var temp__5735__auto___6674 = cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(response_format);
if(cljs.core.truth_(temp__5735__auto___6674)){
var response_type_6675 = temp__5735__auto___6674;
this$__$1.responseType = cljs.core.name(response_type_6675);
} else {
}

var seq__6658_6676 = cljs.core.seq(headers);
var chunk__6659_6677 = null;
var count__6660_6678 = (0);
var i__6661_6679 = (0);
while(true){
if((i__6661_6679 < count__6660_6678)){
var vec__6668_6680 = chunk__6659_6677.cljs$core$IIndexed$_nth$arity$2(null,i__6661_6679);
var k_6681 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6668_6680,(0),null);
var v_6682 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6668_6680,(1),null);
this$__$1.setRequestHeader(k_6681,v_6682);


var G__6683 = seq__6658_6676;
var G__6684 = chunk__6659_6677;
var G__6685 = count__6660_6678;
var G__6686 = (i__6661_6679 + (1));
seq__6658_6676 = G__6683;
chunk__6659_6677 = G__6684;
count__6660_6678 = G__6685;
i__6661_6679 = G__6686;
continue;
} else {
var temp__5735__auto___6687 = cljs.core.seq(seq__6658_6676);
if(temp__5735__auto___6687){
var seq__6658_6688__$1 = temp__5735__auto___6687;
if(cljs.core.chunked_seq_QMARK_(seq__6658_6688__$1)){
var c__4550__auto___6689 = cljs.core.chunk_first(seq__6658_6688__$1);
var G__6690 = cljs.core.chunk_rest(seq__6658_6688__$1);
var G__6691 = c__4550__auto___6689;
var G__6692 = cljs.core.count(c__4550__auto___6689);
var G__6693 = (0);
seq__6658_6676 = G__6690;
chunk__6659_6677 = G__6691;
count__6660_6678 = G__6692;
i__6661_6679 = G__6693;
continue;
} else {
var vec__6671_6694 = cljs.core.first(seq__6658_6688__$1);
var k_6695 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6671_6694,(0),null);
var v_6696 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6671_6694,(1),null);
this$__$1.setRequestHeader(k_6695,v_6696);


var G__6697 = cljs.core.next(seq__6658_6688__$1);
var G__6698 = null;
var G__6699 = (0);
var G__6700 = (0);
seq__6658_6676 = G__6697;
chunk__6659_6677 = G__6698;
count__6660_6678 = G__6699;
i__6661_6679 = G__6700;
continue;
}
} else {
}
}
break;
}

this$__$1.send((function (){var or__4131__auto__ = body;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return "";
}
})());

return this$__$1;
});

ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxRequest$ = cljs.core.PROTOCOL_SENTINEL;

ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxRequest$_abort$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.abort();
});

ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$ = cljs.core.PROTOCOL_SENTINEL;

ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_body$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.response;
});

ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_status$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.status;
});

ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_status_text$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.statusText;
});

ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_get_all_headers$arity$1 = (function (this$){
var this$__$1 = this;
return ajax.xml_http_request.process_headers(this$__$1.getAllResponseHeaders());
});

ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_get_response_header$arity$2 = (function (this$,header){
var this$__$1 = this;
return this$__$1.getResponseHeader(header);
});

ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_was_aborted$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),this$__$1.readyState);
});
