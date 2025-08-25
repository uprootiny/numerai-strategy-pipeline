// Compiled by ClojureScript 1.10.520 {:static-fns true, :optimize-constants true}
goog.provide('re_frame.fx');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('re_frame.router');
goog.require('re_frame.db');
goog.require('re_frame.interceptor');
goog.require('re_frame.interop');
goog.require('re_frame.events');
goog.require('re_frame.registrar');
goog.require('re_frame.loggers');
goog.require('re_frame.trace');
re_frame.fx.kind = cljs.core.cst$kw$fx;
if(cljs.core.truth_((re_frame.registrar.kinds.cljs$core$IFn$_invoke$arity$1 ? re_frame.registrar.kinds.cljs$core$IFn$_invoke$arity$1(re_frame.fx.kind) : re_frame.registrar.kinds.call(null,re_frame.fx.kind)))){
} else {
throw (new Error("Assert failed: (re-frame.registrar/kinds kind)"));
}
re_frame.fx.reg_fx = (function re_frame$fx$reg_fx(id,handler){
return re_frame.registrar.register_handler(re_frame.fx.kind,id,handler);
});
/**
 * An interceptor whose `:after` actions the contents of `:effects`. As a result,
 *   this interceptor is Domino 3.
 * 
 *   This interceptor is silently added (by reg-event-db etc) to the front of
 *   interceptor chains for all events.
 * 
 *   For each key in `:effects` (a map), it calls the registered `effects handler`
 *   (see `reg-fx` for registration of effect handlers).
 * 
 *   So, if `:effects` was:
 *    {:dispatch  [:hello 42]
 *     :db        {...}
 *     :undo      "set flag"}
 * 
 *   it will call the registered effect handlers for each of the map's keys:
 *   `:dispatch`, `:undo` and `:db`. When calling each handler, provides the map
 *   value for that key - so in the example above the effect handler for :dispatch
 *   will be given one arg `[:hello 42]`.
 * 
 *   You cannot rely on the ordering in which effects are executed, other than that
 *   `:db` is guaranteed to be executed first.
 */
re_frame.fx.do_fx = re_frame.interceptor.__GT_interceptor.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$id,cljs.core.cst$kw$do_DASH_fx,cljs.core.cst$kw$after,(function re_frame$fx$do_fx_after(context){
if(re_frame.trace.is_trace_enabled_QMARK_()){
var _STAR_current_trace_STAR__orig_val__8663 = re_frame.trace._STAR_current_trace_STAR_;
var _STAR_current_trace_STAR__temp_val__8664 = re_frame.trace.start_trace(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$op_DASH_type,cljs.core.cst$kw$event_SLASH_do_DASH_fx], null));
re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__temp_val__8664;

try{try{var effects = cljs.core.cst$kw$effects.cljs$core$IFn$_invoke$arity$1(context);
var effects_without_db = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(effects,cljs.core.cst$kw$db);
var temp__5735__auto___8699 = cljs.core.cst$kw$db.cljs$core$IFn$_invoke$arity$1(effects);
if(cljs.core.truth_(temp__5735__auto___8699)){
var new_db_8700 = temp__5735__auto___8699;
var fexpr__8665_8701 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,cljs.core.cst$kw$db,false);
(fexpr__8665_8701.cljs$core$IFn$_invoke$arity$1 ? fexpr__8665_8701.cljs$core$IFn$_invoke$arity$1(new_db_8700) : fexpr__8665_8701.call(null,new_db_8700));
} else {
}

var seq__8666 = cljs.core.seq(effects_without_db);
var chunk__8667 = null;
var count__8668 = (0);
var i__8669 = (0);
while(true){
if((i__8669 < count__8668)){
var vec__8676 = chunk__8667.cljs$core$IIndexed$_nth$arity$2(null,i__8669);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8676,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8676,(1),null);
var temp__5733__auto___8702 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5733__auto___8702)){
var effect_fn_8703 = temp__5733__auto___8702;
(effect_fn_8703.cljs$core$IFn$_invoke$arity$1 ? effect_fn_8703.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_8703.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$warn,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__8704 = seq__8666;
var G__8705 = chunk__8667;
var G__8706 = count__8668;
var G__8707 = (i__8669 + (1));
seq__8666 = G__8704;
chunk__8667 = G__8705;
count__8668 = G__8706;
i__8669 = G__8707;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq(seq__8666);
if(temp__5735__auto__){
var seq__8666__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__8666__$1)){
var c__4550__auto__ = cljs.core.chunk_first(seq__8666__$1);
var G__8708 = cljs.core.chunk_rest(seq__8666__$1);
var G__8709 = c__4550__auto__;
var G__8710 = cljs.core.count(c__4550__auto__);
var G__8711 = (0);
seq__8666 = G__8708;
chunk__8667 = G__8709;
count__8668 = G__8710;
i__8669 = G__8711;
continue;
} else {
var vec__8679 = cljs.core.first(seq__8666__$1);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8679,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8679,(1),null);
var temp__5733__auto___8712 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5733__auto___8712)){
var effect_fn_8713 = temp__5733__auto___8712;
(effect_fn_8713.cljs$core$IFn$_invoke$arity$1 ? effect_fn_8713.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_8713.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$warn,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__8714 = cljs.core.next(seq__8666__$1);
var G__8715 = null;
var G__8716 = (0);
var G__8717 = (0);
seq__8666 = G__8714;
chunk__8667 = G__8715;
count__8668 = G__8716;
i__8669 = G__8717;
continue;
}
} else {
return null;
}
}
break;
}
}finally {if(re_frame.trace.is_trace_enabled_QMARK_()){
var end__8462__auto___8718 = re_frame.interop.now();
var duration__8463__auto___8719 = (end__8462__auto___8718 - cljs.core.cst$kw$start.cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(re_frame.trace.traces,cljs.core.conj,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(re_frame.trace._STAR_current_trace_STAR_,cljs.core.cst$kw$duration,duration__8463__auto___8719,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$end,re_frame.interop.now()], 0)));

re_frame.trace.run_tracing_callbacks_BANG_(end__8462__auto___8718);
} else {
}
}}finally {re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__orig_val__8663;
}} else {
var effects = cljs.core.cst$kw$effects.cljs$core$IFn$_invoke$arity$1(context);
var effects_without_db = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(effects,cljs.core.cst$kw$db);
var temp__5735__auto___8720 = cljs.core.cst$kw$db.cljs$core$IFn$_invoke$arity$1(effects);
if(cljs.core.truth_(temp__5735__auto___8720)){
var new_db_8721 = temp__5735__auto___8720;
var fexpr__8682_8722 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,cljs.core.cst$kw$db,false);
(fexpr__8682_8722.cljs$core$IFn$_invoke$arity$1 ? fexpr__8682_8722.cljs$core$IFn$_invoke$arity$1(new_db_8721) : fexpr__8682_8722.call(null,new_db_8721));
} else {
}

var seq__8683 = cljs.core.seq(effects_without_db);
var chunk__8684 = null;
var count__8685 = (0);
var i__8686 = (0);
while(true){
if((i__8686 < count__8685)){
var vec__8693 = chunk__8684.cljs$core$IIndexed$_nth$arity$2(null,i__8686);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8693,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8693,(1),null);
var temp__5733__auto___8723 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5733__auto___8723)){
var effect_fn_8724 = temp__5733__auto___8723;
(effect_fn_8724.cljs$core$IFn$_invoke$arity$1 ? effect_fn_8724.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_8724.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$warn,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__8725 = seq__8683;
var G__8726 = chunk__8684;
var G__8727 = count__8685;
var G__8728 = (i__8686 + (1));
seq__8683 = G__8725;
chunk__8684 = G__8726;
count__8685 = G__8727;
i__8686 = G__8728;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq(seq__8683);
if(temp__5735__auto__){
var seq__8683__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__8683__$1)){
var c__4550__auto__ = cljs.core.chunk_first(seq__8683__$1);
var G__8729 = cljs.core.chunk_rest(seq__8683__$1);
var G__8730 = c__4550__auto__;
var G__8731 = cljs.core.count(c__4550__auto__);
var G__8732 = (0);
seq__8683 = G__8729;
chunk__8684 = G__8730;
count__8685 = G__8731;
i__8686 = G__8732;
continue;
} else {
var vec__8696 = cljs.core.first(seq__8683__$1);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8696,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8696,(1),null);
var temp__5733__auto___8733 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5733__auto___8733)){
var effect_fn_8734 = temp__5733__auto___8733;
(effect_fn_8734.cljs$core$IFn$_invoke$arity$1 ? effect_fn_8734.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_8734.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$warn,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__8735 = cljs.core.next(seq__8683__$1);
var G__8736 = null;
var G__8737 = (0);
var G__8738 = (0);
seq__8683 = G__8735;
chunk__8684 = G__8736;
count__8685 = G__8737;
i__8686 = G__8738;
continue;
}
} else {
return null;
}
}
break;
}
}
})], 0));
re_frame.fx.dispatch_later = (function re_frame$fx$dispatch_later(p__8739){
var map__8740 = p__8739;
var map__8740__$1 = (((((!((map__8740 == null))))?(((((map__8740.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__8740.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__8740):map__8740);
var effect = map__8740__$1;
var ms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8740__$1,cljs.core.cst$kw$ms);
var dispatch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__8740__$1,cljs.core.cst$kw$dispatch);
if(((cljs.core.empty_QMARK_(dispatch)) || ((!(typeof ms === 'number'))))){
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$error,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: ignoring bad :dispatch-later value:",effect], 0));
} else {
return re_frame.interop.set_timeout_BANG_(((function (map__8740,map__8740__$1,effect,ms,dispatch){
return (function (){
return re_frame.router.dispatch(dispatch);
});})(map__8740,map__8740__$1,effect,ms,dispatch))
,ms);
}
});
re_frame.fx.reg_fx(cljs.core.cst$kw$dispatch_DASH_later,(function (value){
if(cljs.core.map_QMARK_(value)){
return re_frame.fx.dispatch_later(value);
} else {
var seq__8742 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,value));
var chunk__8743 = null;
var count__8744 = (0);
var i__8745 = (0);
while(true){
if((i__8745 < count__8744)){
var effect = chunk__8743.cljs$core$IIndexed$_nth$arity$2(null,i__8745);
re_frame.fx.dispatch_later(effect);


var G__8746 = seq__8742;
var G__8747 = chunk__8743;
var G__8748 = count__8744;
var G__8749 = (i__8745 + (1));
seq__8742 = G__8746;
chunk__8743 = G__8747;
count__8744 = G__8748;
i__8745 = G__8749;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq(seq__8742);
if(temp__5735__auto__){
var seq__8742__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__8742__$1)){
var c__4550__auto__ = cljs.core.chunk_first(seq__8742__$1);
var G__8750 = cljs.core.chunk_rest(seq__8742__$1);
var G__8751 = c__4550__auto__;
var G__8752 = cljs.core.count(c__4550__auto__);
var G__8753 = (0);
seq__8742 = G__8750;
chunk__8743 = G__8751;
count__8744 = G__8752;
i__8745 = G__8753;
continue;
} else {
var effect = cljs.core.first(seq__8742__$1);
re_frame.fx.dispatch_later(effect);


var G__8754 = cljs.core.next(seq__8742__$1);
var G__8755 = null;
var G__8756 = (0);
var G__8757 = (0);
seq__8742 = G__8754;
chunk__8743 = G__8755;
count__8744 = G__8756;
i__8745 = G__8757;
continue;
}
} else {
return null;
}
}
break;
}
}
}));
re_frame.fx.reg_fx(cljs.core.cst$kw$fx,(function (seq_of_effects){
if((!(cljs.core.sequential_QMARK_(seq_of_effects)))){
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$error,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: \":fx\" effect expects a seq, but was given ",cljs.core.type(seq_of_effects)], 0));
} else {
var seq__8758 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,seq_of_effects));
var chunk__8759 = null;
var count__8760 = (0);
var i__8761 = (0);
while(true){
if((i__8761 < count__8760)){
var vec__8768 = chunk__8759.cljs$core$IIndexed$_nth$arity$2(null,i__8761);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8768,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8768,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$db,effect_key)){
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$warn,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: \":fx\" effect should not contain a :db effect"], 0));
} else {
}

var temp__5733__auto___8774 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5733__auto___8774)){
var effect_fn_8775 = temp__5733__auto___8774;
(effect_fn_8775.cljs$core$IFn$_invoke$arity$1 ? effect_fn_8775.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_8775.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$warn,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: in \":fx\" effect found ",effect_key," which has no associated handler. Ignoring."], 0));
}


var G__8776 = seq__8758;
var G__8777 = chunk__8759;
var G__8778 = count__8760;
var G__8779 = (i__8761 + (1));
seq__8758 = G__8776;
chunk__8759 = G__8777;
count__8760 = G__8778;
i__8761 = G__8779;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq(seq__8758);
if(temp__5735__auto__){
var seq__8758__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__8758__$1)){
var c__4550__auto__ = cljs.core.chunk_first(seq__8758__$1);
var G__8780 = cljs.core.chunk_rest(seq__8758__$1);
var G__8781 = c__4550__auto__;
var G__8782 = cljs.core.count(c__4550__auto__);
var G__8783 = (0);
seq__8758 = G__8780;
chunk__8759 = G__8781;
count__8760 = G__8782;
i__8761 = G__8783;
continue;
} else {
var vec__8771 = cljs.core.first(seq__8758__$1);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8771,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8771,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$db,effect_key)){
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$warn,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: \":fx\" effect should not contain a :db effect"], 0));
} else {
}

var temp__5733__auto___8784 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5733__auto___8784)){
var effect_fn_8785 = temp__5733__auto___8784;
(effect_fn_8785.cljs$core$IFn$_invoke$arity$1 ? effect_fn_8785.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_8785.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$warn,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: in \":fx\" effect found ",effect_key," which has no associated handler. Ignoring."], 0));
}


var G__8786 = cljs.core.next(seq__8758__$1);
var G__8787 = null;
var G__8788 = (0);
var G__8789 = (0);
seq__8758 = G__8786;
chunk__8759 = G__8787;
count__8760 = G__8788;
i__8761 = G__8789;
continue;
}
} else {
return null;
}
}
break;
}
}
}));
re_frame.fx.reg_fx(cljs.core.cst$kw$dispatch,(function (value){
if((!(cljs.core.vector_QMARK_(value)))){
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$error,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: ignoring bad :dispatch value. Expected a vector, but got:",value], 0));
} else {
return re_frame.router.dispatch(value);
}
}));
re_frame.fx.reg_fx(cljs.core.cst$kw$dispatch_DASH_n,(function (value){
if((!(cljs.core.sequential_QMARK_(value)))){
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$error,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: ignoring bad :dispatch-n value. Expected a collection, but got:",value], 0));
} else {
var seq__8790 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,value));
var chunk__8791 = null;
var count__8792 = (0);
var i__8793 = (0);
while(true){
if((i__8793 < count__8792)){
var event = chunk__8791.cljs$core$IIndexed$_nth$arity$2(null,i__8793);
re_frame.router.dispatch(event);


var G__8794 = seq__8790;
var G__8795 = chunk__8791;
var G__8796 = count__8792;
var G__8797 = (i__8793 + (1));
seq__8790 = G__8794;
chunk__8791 = G__8795;
count__8792 = G__8796;
i__8793 = G__8797;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq(seq__8790);
if(temp__5735__auto__){
var seq__8790__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__8790__$1)){
var c__4550__auto__ = cljs.core.chunk_first(seq__8790__$1);
var G__8798 = cljs.core.chunk_rest(seq__8790__$1);
var G__8799 = c__4550__auto__;
var G__8800 = cljs.core.count(c__4550__auto__);
var G__8801 = (0);
seq__8790 = G__8798;
chunk__8791 = G__8799;
count__8792 = G__8800;
i__8793 = G__8801;
continue;
} else {
var event = cljs.core.first(seq__8790__$1);
re_frame.router.dispatch(event);


var G__8802 = cljs.core.next(seq__8790__$1);
var G__8803 = null;
var G__8804 = (0);
var G__8805 = (0);
seq__8790 = G__8802;
chunk__8791 = G__8803;
count__8792 = G__8804;
i__8793 = G__8805;
continue;
}
} else {
return null;
}
}
break;
}
}
}));
re_frame.fx.reg_fx(cljs.core.cst$kw$deregister_DASH_event_DASH_handler,(function (value){
var clear_event = cljs.core.partial.cljs$core$IFn$_invoke$arity$2(re_frame.registrar.clear_handlers,re_frame.events.kind);
if(cljs.core.sequential_QMARK_(value)){
var seq__8806 = cljs.core.seq(value);
var chunk__8807 = null;
var count__8808 = (0);
var i__8809 = (0);
while(true){
if((i__8809 < count__8808)){
var event = chunk__8807.cljs$core$IIndexed$_nth$arity$2(null,i__8809);
(clear_event.cljs$core$IFn$_invoke$arity$1 ? clear_event.cljs$core$IFn$_invoke$arity$1(event) : clear_event.call(null,event));


var G__8810 = seq__8806;
var G__8811 = chunk__8807;
var G__8812 = count__8808;
var G__8813 = (i__8809 + (1));
seq__8806 = G__8810;
chunk__8807 = G__8811;
count__8808 = G__8812;
i__8809 = G__8813;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq(seq__8806);
if(temp__5735__auto__){
var seq__8806__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__8806__$1)){
var c__4550__auto__ = cljs.core.chunk_first(seq__8806__$1);
var G__8814 = cljs.core.chunk_rest(seq__8806__$1);
var G__8815 = c__4550__auto__;
var G__8816 = cljs.core.count(c__4550__auto__);
var G__8817 = (0);
seq__8806 = G__8814;
chunk__8807 = G__8815;
count__8808 = G__8816;
i__8809 = G__8817;
continue;
} else {
var event = cljs.core.first(seq__8806__$1);
(clear_event.cljs$core$IFn$_invoke$arity$1 ? clear_event.cljs$core$IFn$_invoke$arity$1(event) : clear_event.call(null,event));


var G__8818 = cljs.core.next(seq__8806__$1);
var G__8819 = null;
var G__8820 = (0);
var G__8821 = (0);
seq__8806 = G__8818;
chunk__8807 = G__8819;
count__8808 = G__8820;
i__8809 = G__8821;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return (clear_event.cljs$core$IFn$_invoke$arity$1 ? clear_event.cljs$core$IFn$_invoke$arity$1(value) : clear_event.call(null,value));
}
}));
re_frame.fx.reg_fx(cljs.core.cst$kw$db,(function (value){
if((!((cljs.core.deref(re_frame.db.app_db) === value)))){
return cljs.core.reset_BANG_(re_frame.db.app_db,value);
} else {
return null;
}
}));
