// Compiled by ClojureScript 1.10.520 {:static-fns true, :optimize-constants true}
goog.provide('re_frame.trace');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('re_frame.interop');
goog.require('re_frame.loggers');
goog.require('goog.functions');
re_frame.trace.id = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
re_frame.trace._STAR_current_trace_STAR_ = null;
re_frame.trace.reset_tracing_BANG_ = (function re_frame$trace$reset_tracing_BANG_(){
return cljs.core.reset_BANG_(re_frame.trace.id,(0));
});

/** @define {boolean} */
goog.define("re_frame.trace.trace_enabled_QMARK_",false);
/**
 * See https://groups.google.com/d/msg/clojurescript/jk43kmYiMhA/IHglVr_TPdgJ for more details
 */
re_frame.trace.is_trace_enabled_QMARK_ = (function re_frame$trace$is_trace_enabled_QMARK_(){
return re_frame.trace.trace_enabled_QMARK_;
});
re_frame.trace.trace_cbs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
if((typeof re_frame !== 'undefined') && (typeof re_frame.trace !== 'undefined') && (typeof re_frame.trace.traces !== 'undefined')){
} else {
re_frame.trace.traces = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
}
if((typeof re_frame !== 'undefined') && (typeof re_frame.trace !== 'undefined') && (typeof re_frame.trace.next_delivery !== 'undefined')){
} else {
re_frame.trace.next_delivery = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
}
/**
 * Registers a tracing callback function which will receive a collection of one or more traces.
 *   Will replace an existing callback function if it shares the same key.
 */
re_frame.trace.register_trace_cb = (function re_frame$trace$register_trace_cb(key,f){
if(re_frame.trace.trace_enabled_QMARK_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frame.trace.trace_cbs,cljs.core.assoc,key,f);
} else {
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$warn,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Tracing is not enabled. Please set {\"re_frame.trace.trace_enabled_QMARK_\" true} in :closure-defines. See: https://github.com/day8/re-frame-10x#installation."], 0));
}
});
re_frame.trace.remove_trace_cb = (function re_frame$trace$remove_trace_cb(key){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(re_frame.trace.trace_cbs,cljs.core.dissoc,key);

return null;
});
re_frame.trace.next_id = (function re_frame$trace$next_id(){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(re_frame.trace.id,cljs.core.inc);
});
re_frame.trace.start_trace = (function re_frame$trace$start_trace(p__8484){
var map__8485 = p__8484;
var map__8485__$1 = (((((!((map__8485 == null))))?(((((map__8485.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__8485.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__8485):map__8485);
var operation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8485__$1,cljs.core.cst$kw$operation);
var op_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8485__$1,cljs.core.cst$kw$op_DASH_type);
var tags = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8485__$1,cljs.core.cst$kw$tags);
var child_of = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8485__$1,cljs.core.cst$kw$child_DASH_of);
return new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$id,re_frame.trace.next_id(),cljs.core.cst$kw$operation,operation,cljs.core.cst$kw$op_DASH_type,op_type,cljs.core.cst$kw$tags,tags,cljs.core.cst$kw$child_DASH_of,(function (){var or__4131__auto__ = child_of;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_);
}
})(),cljs.core.cst$kw$start,re_frame.interop.now()], null);
});
re_frame.trace.debounce_time = (50);
re_frame.trace.debounce = (function re_frame$trace$debounce(f,interval){
return goog.functions.debounce(f,interval);
});
re_frame.trace.schedule_debounce = re_frame.trace.debounce((function re_frame$trace$tracing_cb_debounced(){
var seq__8487_8511 = cljs.core.seq(cljs.core.deref(re_frame.trace.trace_cbs));
var chunk__8488_8512 = null;
var count__8489_8513 = (0);
var i__8490_8514 = (0);
while(true){
if((i__8490_8514 < count__8489_8513)){
var vec__8501_8515 = chunk__8488_8512.cljs$core$IIndexed$_nth$arity$2(null,i__8490_8514);
var k_8516 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8501_8515,(0),null);
var cb_8517 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8501_8515,(1),null);
try{var G__8505_8518 = cljs.core.deref(re_frame.trace.traces);
(cb_8517.cljs$core$IFn$_invoke$arity$1 ? cb_8517.cljs$core$IFn$_invoke$arity$1(G__8505_8518) : cb_8517.call(null,G__8505_8518));
}catch (e8504){var e_8519 = e8504;
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$error,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Error thrown from trace cb",k_8516,"while storing",cljs.core.deref(re_frame.trace.traces),e_8519], 0));
}

var G__8520 = seq__8487_8511;
var G__8521 = chunk__8488_8512;
var G__8522 = count__8489_8513;
var G__8523 = (i__8490_8514 + (1));
seq__8487_8511 = G__8520;
chunk__8488_8512 = G__8521;
count__8489_8513 = G__8522;
i__8490_8514 = G__8523;
continue;
} else {
var temp__5735__auto___8524 = cljs.core.seq(seq__8487_8511);
if(temp__5735__auto___8524){
var seq__8487_8525__$1 = temp__5735__auto___8524;
if(cljs.core.chunked_seq_QMARK_(seq__8487_8525__$1)){
var c__4550__auto___8526 = cljs.core.chunk_first(seq__8487_8525__$1);
var G__8527 = cljs.core.chunk_rest(seq__8487_8525__$1);
var G__8528 = c__4550__auto___8526;
var G__8529 = cljs.core.count(c__4550__auto___8526);
var G__8530 = (0);
seq__8487_8511 = G__8527;
chunk__8488_8512 = G__8528;
count__8489_8513 = G__8529;
i__8490_8514 = G__8530;
continue;
} else {
var vec__8506_8531 = cljs.core.first(seq__8487_8525__$1);
var k_8532 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8506_8531,(0),null);
var cb_8533 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8506_8531,(1),null);
try{var G__8510_8534 = cljs.core.deref(re_frame.trace.traces);
(cb_8533.cljs$core$IFn$_invoke$arity$1 ? cb_8533.cljs$core$IFn$_invoke$arity$1(G__8510_8534) : cb_8533.call(null,G__8510_8534));
}catch (e8509){var e_8535 = e8509;
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$error,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Error thrown from trace cb",k_8532,"while storing",cljs.core.deref(re_frame.trace.traces),e_8535], 0));
}

var G__8536 = cljs.core.next(seq__8487_8525__$1);
var G__8537 = null;
var G__8538 = (0);
var G__8539 = (0);
seq__8487_8511 = G__8536;
chunk__8488_8512 = G__8537;
count__8489_8513 = G__8538;
i__8490_8514 = G__8539;
continue;
}
} else {
}
}
break;
}

return cljs.core.reset_BANG_(re_frame.trace.traces,cljs.core.PersistentVector.EMPTY);
}),re_frame.trace.debounce_time);
re_frame.trace.run_tracing_callbacks_BANG_ = (function re_frame$trace$run_tracing_callbacks_BANG_(now){
if(((cljs.core.deref(re_frame.trace.next_delivery) - (25)) < now)){
(re_frame.trace.schedule_debounce.cljs$core$IFn$_invoke$arity$0 ? re_frame.trace.schedule_debounce.cljs$core$IFn$_invoke$arity$0() : re_frame.trace.schedule_debounce.call(null));

return cljs.core.reset_BANG_(re_frame.trace.next_delivery,(now + re_frame.trace.debounce_time));
} else {
return null;
}
});
