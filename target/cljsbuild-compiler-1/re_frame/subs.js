// Compiled by ClojureScript 1.10.520 {:static-fns true, :optimize-constants true}
goog.provide('re_frame.subs');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('re_frame.db');
goog.require('re_frame.interop');
goog.require('re_frame.loggers');
goog.require('re_frame.utils');
goog.require('re_frame.registrar');
goog.require('re_frame.trace');
re_frame.subs.kind = cljs.core.cst$kw$sub;
if(cljs.core.truth_((re_frame.registrar.kinds.cljs$core$IFn$_invoke$arity$1 ? re_frame.registrar.kinds.cljs$core$IFn$_invoke$arity$1(re_frame.subs.kind) : re_frame.registrar.kinds.call(null,re_frame.subs.kind)))){
} else {
throw (new Error("Assert failed: (re-frame.registrar/kinds kind)"));
}
re_frame.subs.query__GT_reaction = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
/**
 * calls `on-dispose` for each cached item, 
 * which will cause the value to be removed from the cache
 */
re_frame.subs.clear_subscription_cache_BANG_ = (function re_frame$subs$clear_subscription_cache_BANG_(){
var seq__8980_8996 = cljs.core.seq(cljs.core.deref(re_frame.subs.query__GT_reaction));
var chunk__8981_8997 = null;
var count__8982_8998 = (0);
var i__8983_8999 = (0);
while(true){
if((i__8983_8999 < count__8982_8998)){
var vec__8990_9000 = chunk__8981_8997.cljs$core$IIndexed$_nth$arity$2(null,i__8983_8999);
var k_9001 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8990_9000,(0),null);
var rxn_9002 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8990_9000,(1),null);
re_frame.interop.dispose_BANG_(rxn_9002);


var G__9003 = seq__8980_8996;
var G__9004 = chunk__8981_8997;
var G__9005 = count__8982_8998;
var G__9006 = (i__8983_8999 + (1));
seq__8980_8996 = G__9003;
chunk__8981_8997 = G__9004;
count__8982_8998 = G__9005;
i__8983_8999 = G__9006;
continue;
} else {
var temp__5735__auto___9007 = cljs.core.seq(seq__8980_8996);
if(temp__5735__auto___9007){
var seq__8980_9008__$1 = temp__5735__auto___9007;
if(cljs.core.chunked_seq_QMARK_(seq__8980_9008__$1)){
var c__4550__auto___9009 = cljs.core.chunk_first(seq__8980_9008__$1);
var G__9010 = cljs.core.chunk_rest(seq__8980_9008__$1);
var G__9011 = c__4550__auto___9009;
var G__9012 = cljs.core.count(c__4550__auto___9009);
var G__9013 = (0);
seq__8980_8996 = G__9010;
chunk__8981_8997 = G__9011;
count__8982_8998 = G__9012;
i__8983_8999 = G__9013;
continue;
} else {
var vec__8993_9014 = cljs.core.first(seq__8980_9008__$1);
var k_9015 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8993_9014,(0),null);
var rxn_9016 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8993_9014,(1),null);
re_frame.interop.dispose_BANG_(rxn_9016);


var G__9017 = cljs.core.next(seq__8980_9008__$1);
var G__9018 = null;
var G__9019 = (0);
var G__9020 = (0);
seq__8980_8996 = G__9017;
chunk__8981_8997 = G__9018;
count__8982_8998 = G__9019;
i__8983_8999 = G__9020;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(cljs.core.not_empty(cljs.core.deref(re_frame.subs.query__GT_reaction)))){
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$warn,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: The subscription cache isn't empty after being cleared"], 0));
} else {
return null;
}
});
/**
 * Unregisters all existing subscription handlers
 */
re_frame.subs.clear_all_handlers_BANG_ = (function re_frame$subs$clear_all_handlers_BANG_(){
re_frame.registrar.clear_handlers.cljs$core$IFn$_invoke$arity$1(re_frame.subs.kind);

return re_frame.subs.clear_subscription_cache_BANG_();
});
/**
 * cache the reaction r
 */
re_frame.subs.cache_and_return = (function re_frame$subs$cache_and_return(query_v,dynv,r){
var cache_key = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [query_v,dynv], null);
re_frame.interop.add_on_dispose_BANG_(r,((function (cache_key){
return (function (){
if(re_frame.trace.is_trace_enabled_QMARK_()){
var _STAR_current_trace_STAR__orig_val__9021 = re_frame.trace._STAR_current_trace_STAR_;
var _STAR_current_trace_STAR__temp_val__9022 = re_frame.trace.start_trace(new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$operation,re_frame.utils.first_in_vector(query_v),cljs.core.cst$kw$op_DASH_type,cljs.core.cst$kw$sub_SLASH_dispose,cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$query_DASH_v,query_v,cljs.core.cst$kw$reaction,re_frame.interop.reagent_id(r)], null)], null));
re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__temp_val__9022;

try{try{return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(re_frame.subs.query__GT_reaction,((function (_STAR_current_trace_STAR__orig_val__9021,_STAR_current_trace_STAR__temp_val__9022,cache_key){
return (function (query_cache){
if(((cljs.core.contains_QMARK_(query_cache,cache_key)) && ((r === cljs.core.get.cljs$core$IFn$_invoke$arity$2(query_cache,cache_key))))){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(query_cache,cache_key);
} else {
return query_cache;
}
});})(_STAR_current_trace_STAR__orig_val__9021,_STAR_current_trace_STAR__temp_val__9022,cache_key))
);
}finally {if(re_frame.trace.is_trace_enabled_QMARK_()){
var end__8462__auto___9023 = re_frame.interop.now();
var duration__8463__auto___9024 = (end__8462__auto___9023 - cljs.core.cst$kw$start.cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(re_frame.trace.traces,cljs.core.conj,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(re_frame.trace._STAR_current_trace_STAR_,cljs.core.cst$kw$duration,duration__8463__auto___9024,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$end,re_frame.interop.now()], 0)));

re_frame.trace.run_tracing_callbacks_BANG_(end__8462__auto___9023);
} else {
}
}}finally {re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__orig_val__9021;
}} else {
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(re_frame.subs.query__GT_reaction,((function (cache_key){
return (function (query_cache){
if(((cljs.core.contains_QMARK_(query_cache,cache_key)) && ((r === cljs.core.get.cljs$core$IFn$_invoke$arity$2(query_cache,cache_key))))){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(query_cache,cache_key);
} else {
return query_cache;
}
});})(cache_key))
);
}
});})(cache_key))
);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(re_frame.subs.query__GT_reaction,((function (cache_key){
return (function (query_cache){
if(re_frame.interop.debug_enabled_QMARK_){
if(cljs.core.contains_QMARK_(query_cache,cache_key)){
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$warn,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: Adding a new subscription to the cache while there is an existing subscription in the cache",cache_key], 0));
} else {
}
} else {
}

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(query_cache,cache_key,r);
});})(cache_key))
);

if(re_frame.trace.is_trace_enabled_QMARK_()){
var new_trace__8464__auto___9025 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.update.cljs$core$IFn$_invoke$arity$4(re_frame.trace._STAR_current_trace_STAR_,cljs.core.cst$kw$tags,cljs.core.merge,cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$reaction,re_frame.interop.reagent_id(r)], null)], null))),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$reaction,re_frame.interop.reagent_id(r)], null)], null),cljs.core.cst$kw$tags)], 0));
re_frame.trace._STAR_current_trace_STAR_ = new_trace__8464__auto___9025;

} else {
}

return r;
});
re_frame.subs.cache_lookup = (function re_frame$subs$cache_lookup(var_args){
var G__9027 = arguments.length;
switch (G__9027) {
case 1:
return re_frame.subs.cache_lookup.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return re_frame.subs.cache_lookup.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

re_frame.subs.cache_lookup.cljs$core$IFn$_invoke$arity$1 = (function (query_v){
return re_frame.subs.cache_lookup.cljs$core$IFn$_invoke$arity$2(query_v,cljs.core.PersistentVector.EMPTY);
});

re_frame.subs.cache_lookup.cljs$core$IFn$_invoke$arity$2 = (function (query_v,dyn_v){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frame.subs.query__GT_reaction),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [query_v,dyn_v], null));
});

re_frame.subs.cache_lookup.cljs$lang$maxFixedArity = 2;

re_frame.subs.subscribe = (function re_frame$subs$subscribe(var_args){
var G__9030 = arguments.length;
switch (G__9030) {
case 1:
return re_frame.subs.subscribe.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return re_frame.subs.subscribe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

re_frame.subs.subscribe.cljs$core$IFn$_invoke$arity$1 = (function (query){
if(re_frame.trace.is_trace_enabled_QMARK_()){
var _STAR_current_trace_STAR__orig_val__9031 = re_frame.trace._STAR_current_trace_STAR_;
var _STAR_current_trace_STAR__temp_val__9032 = re_frame.trace.start_trace(new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$operation,re_frame.utils.first_in_vector(query),cljs.core.cst$kw$op_DASH_type,cljs.core.cst$kw$sub_SLASH_create,cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$query_DASH_v,query], null)], null));
re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__temp_val__9032;

try{try{var temp__5733__auto__ = re_frame.subs.cache_lookup.cljs$core$IFn$_invoke$arity$1(query);
if(cljs.core.truth_(temp__5733__auto__)){
var cached = temp__5733__auto__;
if(re_frame.trace.is_trace_enabled_QMARK_()){
var new_trace__8464__auto___9042 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.update.cljs$core$IFn$_invoke$arity$4(re_frame.trace._STAR_current_trace_STAR_,cljs.core.cst$kw$tags,cljs.core.merge,cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$cached_QMARK_,true,cljs.core.cst$kw$reaction,re_frame.interop.reagent_id(cached)], null)], null))),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$cached_QMARK_,true,cljs.core.cst$kw$reaction,re_frame.interop.reagent_id(cached)], null)], null),cljs.core.cst$kw$tags)], 0));
re_frame.trace._STAR_current_trace_STAR_ = new_trace__8464__auto___9042;

} else {
}

return cached;
} else {
var query_id = re_frame.utils.first_in_vector(query);
var handler_fn = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$2(re_frame.subs.kind,query_id);
if(re_frame.trace.is_trace_enabled_QMARK_()){
var new_trace__8464__auto___9043 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.update.cljs$core$IFn$_invoke$arity$4(re_frame.trace._STAR_current_trace_STAR_,cljs.core.cst$kw$tags,cljs.core.merge,cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$cached_QMARK_,false], null)], null))),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$cached_QMARK_,false], null)], null),cljs.core.cst$kw$tags)], 0));
re_frame.trace._STAR_current_trace_STAR_ = new_trace__8464__auto___9043;

} else {
}

if((handler_fn == null)){
if(re_frame.trace.is_trace_enabled_QMARK_()){
var new_trace__8464__auto___9044 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.update.cljs$core$IFn$_invoke$arity$4(re_frame.trace._STAR_current_trace_STAR_,cljs.core.cst$kw$tags,cljs.core.merge,cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$error,true], null))),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$error,true], null),cljs.core.cst$kw$tags)], 0));
re_frame.trace._STAR_current_trace_STAR_ = new_trace__8464__auto___9044;

} else {
}

return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$error,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["re-frame: no subscription handler registered for: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(query_id),". Returning a nil subscription."].join('')], 0));
} else {
return re_frame.subs.cache_and_return(query,cljs.core.PersistentVector.EMPTY,(handler_fn.cljs$core$IFn$_invoke$arity$2 ? handler_fn.cljs$core$IFn$_invoke$arity$2(re_frame.db.app_db,query) : handler_fn.call(null,re_frame.db.app_db,query)));
}
}
}finally {if(re_frame.trace.is_trace_enabled_QMARK_()){
var end__8462__auto___9045 = re_frame.interop.now();
var duration__8463__auto___9046 = (end__8462__auto___9045 - cljs.core.cst$kw$start.cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(re_frame.trace.traces,cljs.core.conj,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(re_frame.trace._STAR_current_trace_STAR_,cljs.core.cst$kw$duration,duration__8463__auto___9046,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$end,re_frame.interop.now()], 0)));

re_frame.trace.run_tracing_callbacks_BANG_(end__8462__auto___9045);
} else {
}
}}finally {re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__orig_val__9031;
}} else {
var temp__5733__auto__ = re_frame.subs.cache_lookup.cljs$core$IFn$_invoke$arity$1(query);
if(cljs.core.truth_(temp__5733__auto__)){
var cached = temp__5733__auto__;
if(re_frame.trace.is_trace_enabled_QMARK_()){
var new_trace__8464__auto___9047 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.update.cljs$core$IFn$_invoke$arity$4(re_frame.trace._STAR_current_trace_STAR_,cljs.core.cst$kw$tags,cljs.core.merge,cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$cached_QMARK_,true,cljs.core.cst$kw$reaction,re_frame.interop.reagent_id(cached)], null)], null))),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$cached_QMARK_,true,cljs.core.cst$kw$reaction,re_frame.interop.reagent_id(cached)], null)], null),cljs.core.cst$kw$tags)], 0));
re_frame.trace._STAR_current_trace_STAR_ = new_trace__8464__auto___9047;

} else {
}

return cached;
} else {
var query_id = re_frame.utils.first_in_vector(query);
var handler_fn = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$2(re_frame.subs.kind,query_id);
if(re_frame.trace.is_trace_enabled_QMARK_()){
var new_trace__8464__auto___9048 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.update.cljs$core$IFn$_invoke$arity$4(re_frame.trace._STAR_current_trace_STAR_,cljs.core.cst$kw$tags,cljs.core.merge,cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$cached_QMARK_,false], null)], null))),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$cached_QMARK_,false], null)], null),cljs.core.cst$kw$tags)], 0));
re_frame.trace._STAR_current_trace_STAR_ = new_trace__8464__auto___9048;

} else {
}

if((handler_fn == null)){
if(re_frame.trace.is_trace_enabled_QMARK_()){
var new_trace__8464__auto___9049 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.update.cljs$core$IFn$_invoke$arity$4(re_frame.trace._STAR_current_trace_STAR_,cljs.core.cst$kw$tags,cljs.core.merge,cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$error,true], null))),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$error,true], null),cljs.core.cst$kw$tags)], 0));
re_frame.trace._STAR_current_trace_STAR_ = new_trace__8464__auto___9049;

} else {
}

return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$error,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["re-frame: no subscription handler registered for: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(query_id),". Returning a nil subscription."].join('')], 0));
} else {
return re_frame.subs.cache_and_return(query,cljs.core.PersistentVector.EMPTY,(handler_fn.cljs$core$IFn$_invoke$arity$2 ? handler_fn.cljs$core$IFn$_invoke$arity$2(re_frame.db.app_db,query) : handler_fn.call(null,re_frame.db.app_db,query)));
}
}
}
});

re_frame.subs.subscribe.cljs$core$IFn$_invoke$arity$2 = (function (query,dynv){
if(re_frame.trace.is_trace_enabled_QMARK_()){
var _STAR_current_trace_STAR__orig_val__9033 = re_frame.trace._STAR_current_trace_STAR_;
var _STAR_current_trace_STAR__temp_val__9034 = re_frame.trace.start_trace(new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$operation,re_frame.utils.first_in_vector(query),cljs.core.cst$kw$op_DASH_type,cljs.core.cst$kw$sub_SLASH_create,cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$query_DASH_v,query,cljs.core.cst$kw$dyn_DASH_v,dynv], null)], null));
re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__temp_val__9034;

try{try{var temp__5733__auto__ = re_frame.subs.cache_lookup.cljs$core$IFn$_invoke$arity$2(query,dynv);
if(cljs.core.truth_(temp__5733__auto__)){
var cached = temp__5733__auto__;
if(re_frame.trace.is_trace_enabled_QMARK_()){
var new_trace__8464__auto___9050 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.update.cljs$core$IFn$_invoke$arity$4(re_frame.trace._STAR_current_trace_STAR_,cljs.core.cst$kw$tags,cljs.core.merge,cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$cached_QMARK_,true,cljs.core.cst$kw$reaction,re_frame.interop.reagent_id(cached)], null)], null))),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$cached_QMARK_,true,cljs.core.cst$kw$reaction,re_frame.interop.reagent_id(cached)], null)], null),cljs.core.cst$kw$tags)], 0));
re_frame.trace._STAR_current_trace_STAR_ = new_trace__8464__auto___9050;

} else {
}

return cached;
} else {
var query_id = re_frame.utils.first_in_vector(query);
var handler_fn = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$2(re_frame.subs.kind,query_id);
if(re_frame.trace.is_trace_enabled_QMARK_()){
var new_trace__8464__auto___9051 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.update.cljs$core$IFn$_invoke$arity$4(re_frame.trace._STAR_current_trace_STAR_,cljs.core.cst$kw$tags,cljs.core.merge,cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$cached_QMARK_,false], null)], null))),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$cached_QMARK_,false], null)], null),cljs.core.cst$kw$tags)], 0));
re_frame.trace._STAR_current_trace_STAR_ = new_trace__8464__auto___9051;

} else {
}

if(re_frame.interop.debug_enabled_QMARK_){
var temp__5735__auto___9052 = cljs.core.not_empty(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(re_frame.interop.ratom_QMARK_,dynv));
if(cljs.core.truth_(temp__5735__auto___9052)){
var not_reactive_9053 = temp__5735__auto___9052;
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$warn,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: your subscription's dynamic parameters that don't implement IReactiveAtom:",not_reactive_9053], 0));
} else {
}
} else {
}

if((handler_fn == null)){
if(re_frame.trace.is_trace_enabled_QMARK_()){
var new_trace__8464__auto___9054 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.update.cljs$core$IFn$_invoke$arity$4(re_frame.trace._STAR_current_trace_STAR_,cljs.core.cst$kw$tags,cljs.core.merge,cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$error,true], null))),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$error,true], null),cljs.core.cst$kw$tags)], 0));
re_frame.trace._STAR_current_trace_STAR_ = new_trace__8464__auto___9054;

} else {
}

return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$error,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["re-frame: no subscription handler registered for: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(query_id),". Returning a nil subscription."].join('')], 0));
} else {
var dyn_vals = re_frame.interop.make_reaction(((function (query_id,handler_fn,temp__5733__auto__,_STAR_current_trace_STAR__orig_val__9033,_STAR_current_trace_STAR__temp_val__9034){
return (function (){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.deref,dynv);
});})(query_id,handler_fn,temp__5733__auto__,_STAR_current_trace_STAR__orig_val__9033,_STAR_current_trace_STAR__temp_val__9034))
);
var sub = re_frame.interop.make_reaction(((function (dyn_vals,query_id,handler_fn,temp__5733__auto__,_STAR_current_trace_STAR__orig_val__9033,_STAR_current_trace_STAR__temp_val__9034){
return (function (){
var G__9035 = re_frame.db.app_db;
var G__9036 = query;
var G__9037 = cljs.core.deref(dyn_vals);
return (handler_fn.cljs$core$IFn$_invoke$arity$3 ? handler_fn.cljs$core$IFn$_invoke$arity$3(G__9035,G__9036,G__9037) : handler_fn.call(null,G__9035,G__9036,G__9037));
});})(dyn_vals,query_id,handler_fn,temp__5733__auto__,_STAR_current_trace_STAR__orig_val__9033,_STAR_current_trace_STAR__temp_val__9034))
);
return re_frame.subs.cache_and_return(query,dynv,re_frame.interop.make_reaction(((function (dyn_vals,sub,query_id,handler_fn,temp__5733__auto__,_STAR_current_trace_STAR__orig_val__9033,_STAR_current_trace_STAR__temp_val__9034){
return (function (){
return cljs.core.deref(cljs.core.deref(sub));
});})(dyn_vals,sub,query_id,handler_fn,temp__5733__auto__,_STAR_current_trace_STAR__orig_val__9033,_STAR_current_trace_STAR__temp_val__9034))
));
}
}
}finally {if(re_frame.trace.is_trace_enabled_QMARK_()){
var end__8462__auto___9055 = re_frame.interop.now();
var duration__8463__auto___9056 = (end__8462__auto___9055 - cljs.core.cst$kw$start.cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(re_frame.trace.traces,cljs.core.conj,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(re_frame.trace._STAR_current_trace_STAR_,cljs.core.cst$kw$duration,duration__8463__auto___9056,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$end,re_frame.interop.now()], 0)));

re_frame.trace.run_tracing_callbacks_BANG_(end__8462__auto___9055);
} else {
}
}}finally {re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__orig_val__9033;
}} else {
var temp__5733__auto__ = re_frame.subs.cache_lookup.cljs$core$IFn$_invoke$arity$2(query,dynv);
if(cljs.core.truth_(temp__5733__auto__)){
var cached = temp__5733__auto__;
if(re_frame.trace.is_trace_enabled_QMARK_()){
var new_trace__8464__auto___9057 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.update.cljs$core$IFn$_invoke$arity$4(re_frame.trace._STAR_current_trace_STAR_,cljs.core.cst$kw$tags,cljs.core.merge,cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$cached_QMARK_,true,cljs.core.cst$kw$reaction,re_frame.interop.reagent_id(cached)], null)], null))),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$cached_QMARK_,true,cljs.core.cst$kw$reaction,re_frame.interop.reagent_id(cached)], null)], null),cljs.core.cst$kw$tags)], 0));
re_frame.trace._STAR_current_trace_STAR_ = new_trace__8464__auto___9057;

} else {
}

return cached;
} else {
var query_id = re_frame.utils.first_in_vector(query);
var handler_fn = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$2(re_frame.subs.kind,query_id);
if(re_frame.trace.is_trace_enabled_QMARK_()){
var new_trace__8464__auto___9058 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.update.cljs$core$IFn$_invoke$arity$4(re_frame.trace._STAR_current_trace_STAR_,cljs.core.cst$kw$tags,cljs.core.merge,cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$cached_QMARK_,false], null)], null))),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$cached_QMARK_,false], null)], null),cljs.core.cst$kw$tags)], 0));
re_frame.trace._STAR_current_trace_STAR_ = new_trace__8464__auto___9058;

} else {
}

if(re_frame.interop.debug_enabled_QMARK_){
var temp__5735__auto___9059 = cljs.core.not_empty(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(re_frame.interop.ratom_QMARK_,dynv));
if(cljs.core.truth_(temp__5735__auto___9059)){
var not_reactive_9060 = temp__5735__auto___9059;
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$warn,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: your subscription's dynamic parameters that don't implement IReactiveAtom:",not_reactive_9060], 0));
} else {
}
} else {
}

if((handler_fn == null)){
if(re_frame.trace.is_trace_enabled_QMARK_()){
var new_trace__8464__auto___9061 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.update.cljs$core$IFn$_invoke$arity$4(re_frame.trace._STAR_current_trace_STAR_,cljs.core.cst$kw$tags,cljs.core.merge,cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$error,true], null))),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$error,true], null),cljs.core.cst$kw$tags)], 0));
re_frame.trace._STAR_current_trace_STAR_ = new_trace__8464__auto___9061;

} else {
}

return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$error,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["re-frame: no subscription handler registered for: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(query_id),". Returning a nil subscription."].join('')], 0));
} else {
var dyn_vals = re_frame.interop.make_reaction(((function (query_id,handler_fn,temp__5733__auto__){
return (function (){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.deref,dynv);
});})(query_id,handler_fn,temp__5733__auto__))
);
var sub = re_frame.interop.make_reaction(((function (dyn_vals,query_id,handler_fn,temp__5733__auto__){
return (function (){
var G__9038 = re_frame.db.app_db;
var G__9039 = query;
var G__9040 = cljs.core.deref(dyn_vals);
return (handler_fn.cljs$core$IFn$_invoke$arity$3 ? handler_fn.cljs$core$IFn$_invoke$arity$3(G__9038,G__9039,G__9040) : handler_fn.call(null,G__9038,G__9039,G__9040));
});})(dyn_vals,query_id,handler_fn,temp__5733__auto__))
);
return re_frame.subs.cache_and_return(query,dynv,re_frame.interop.make_reaction(((function (dyn_vals,sub,query_id,handler_fn,temp__5733__auto__){
return (function (){
return cljs.core.deref(cljs.core.deref(sub));
});})(dyn_vals,sub,query_id,handler_fn,temp__5733__auto__))
));
}
}
}
});

re_frame.subs.subscribe.cljs$lang$maxFixedArity = 2;

/**
 * Returns a new version of 'm' in which 'f' has been applied to each value.
 *   (map-vals inc {:a 4, :b 2}) => {:a 5, :b 3}
 */
re_frame.subs.map_vals = (function re_frame$subs$map_vals(f,m){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.empty(m),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p__9062){
var vec__9063 = p__9062;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9063,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9063,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,(f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(v) : f.call(null,v))], null);
})),m);
});
/**
 * Runs f over signals. Signals may take several
 *   forms, this function handles all of them.
 */
re_frame.subs.map_signals = (function re_frame$subs$map_signals(f,signals){
if(cljs.core.sequential_QMARK_(signals)){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(f,signals);
} else {
if(cljs.core.map_QMARK_(signals)){
return re_frame.subs.map_vals(f,signals);
} else {
if(re_frame.interop.deref_QMARK_(signals)){
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(signals) : f.call(null,signals));
} else {
return cljs.core.List.EMPTY;

}
}
}
});
/**
 * Coerces x to a seq if it isn't one already
 */
re_frame.subs.to_seq = (function re_frame$subs$to_seq(x){
if(cljs.core.sequential_QMARK_(x)){
return x;
} else {
return (new cljs.core.List(null,x,null,(1),null));
}
});
re_frame.subs.deref_input_signals = (function re_frame$subs$deref_input_signals(signals,query_id){
var dereffed_signals = re_frame.subs.map_signals(cljs.core.deref,signals);
if(cljs.core.sequential_QMARK_(signals)){
cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.deref,signals);
} else {
if(cljs.core.map_QMARK_(signals)){
re_frame.subs.map_vals(cljs.core.deref,signals);
} else {
if(re_frame.interop.deref_QMARK_(signals)){
cljs.core.deref(signals);
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$error,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: in the reg-sub for",query_id,", the input-signals function returns:",signals], 0));

}
}
}

if(re_frame.trace.is_trace_enabled_QMARK_()){
var new_trace__8464__auto___9066 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.update.cljs$core$IFn$_invoke$arity$4(re_frame.trace._STAR_current_trace_STAR_,cljs.core.cst$kw$tags,cljs.core.merge,cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$input_DASH_signals,cljs.core.doall.cljs$core$IFn$_invoke$arity$1(re_frame.subs.to_seq(re_frame.subs.map_signals(re_frame.interop.reagent_id,signals)))], null)], null))),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$input_DASH_signals,cljs.core.doall.cljs$core$IFn$_invoke$arity$1(re_frame.subs.to_seq(re_frame.subs.map_signals(re_frame.interop.reagent_id,signals)))], null)], null),cljs.core.cst$kw$tags)], 0));
re_frame.trace._STAR_current_trace_STAR_ = new_trace__8464__auto___9066;

} else {
}

return dereffed_signals;
});
re_frame.subs.reg_sub = (function re_frame$subs$reg_sub(var_args){
var args__4736__auto__ = [];
var len__4730__auto___9087 = arguments.length;
var i__4731__auto___9088 = (0);
while(true){
if((i__4731__auto___9088 < len__4730__auto___9087)){
args__4736__auto__.push((arguments[i__4731__auto___9088]));

var G__9089 = (i__4731__auto___9088 + (1));
i__4731__auto___9088 = G__9089;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((1) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((1)),(0),null)):null);
return re_frame.subs.reg_sub.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4737__auto__);
});

re_frame.subs.reg_sub.cljs$core$IFn$_invoke$arity$variadic = (function (query_id,args){
var computation_fn = cljs.core.last(args);
var input_args = cljs.core.butlast(args);
var err_header = ["re-frame: reg-sub for ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(query_id),", "].join('');
var inputs_fn = (function (){var G__9069 = cljs.core.count(input_args);
switch (G__9069) {
case (0):
return ((function (G__9069,computation_fn,input_args,err_header){
return (function() {
var G__9091 = null;
var G__9091__1 = (function (_){
return re_frame.db.app_db;
});
var G__9091__2 = (function (_,___$1){
return re_frame.db.app_db;
});
G__9091 = function(_,___$1){
switch(arguments.length){
case 1:
return G__9091__1.call(this,_);
case 2:
return G__9091__2.call(this,_,___$1);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__9091.cljs$core$IFn$_invoke$arity$1 = G__9091__1;
G__9091.cljs$core$IFn$_invoke$arity$2 = G__9091__2;
return G__9091;
})()
;})(G__9069,computation_fn,input_args,err_header))

break;
case (1):
var f = cljs.core.first(input_args);
if(cljs.core.fn_QMARK_(f)){
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$error,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([err_header,"2nd argument expected to be an inputs function, got:",f], 0));
}

return f;

break;
case (2):
var vec__9070 = input_args;
var marker = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9070,(0),null);
var vec = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__9070,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$_LT__DASH_,marker)){
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$error,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([err_header,"expected :<-, got:",marker], 0));
}

return ((function (vec__9070,marker,vec,G__9069,computation_fn,input_args,err_header){
return (function() {
var re_frame$subs$inp_fn = null;
var re_frame$subs$inp_fn__1 = (function (_){
return re_frame.subs.subscribe.cljs$core$IFn$_invoke$arity$1(vec);
});
var re_frame$subs$inp_fn__2 = (function (_,___$1){
return re_frame.subs.subscribe.cljs$core$IFn$_invoke$arity$1(vec);
});
re_frame$subs$inp_fn = function(_,___$1){
switch(arguments.length){
case 1:
return re_frame$subs$inp_fn__1.call(this,_);
case 2:
return re_frame$subs$inp_fn__2.call(this,_,___$1);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
re_frame$subs$inp_fn.cljs$core$IFn$_invoke$arity$1 = re_frame$subs$inp_fn__1;
re_frame$subs$inp_fn.cljs$core$IFn$_invoke$arity$2 = re_frame$subs$inp_fn__2;
return re_frame$subs$inp_fn;
})()
;})(vec__9070,marker,vec,G__9069,computation_fn,input_args,err_header))

break;
default:
var pairs = cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),input_args);
var markers = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,pairs);
var vecs = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.last,pairs);
if(((cljs.core.every_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$_LT__DASH_,null], null), null),markers)) && (cljs.core.every_QMARK_(cljs.core.vector_QMARK_,vecs)))){
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$error,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([err_header,"expected pairs of :<- and vectors, got:",pairs], 0));
}

return ((function (pairs,markers,vecs,G__9069,computation_fn,input_args,err_header){
return (function() {
var re_frame$subs$inp_fn = null;
var re_frame$subs$inp_fn__1 = (function (_){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(re_frame.subs.subscribe,vecs);
});
var re_frame$subs$inp_fn__2 = (function (_,___$1){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(re_frame.subs.subscribe,vecs);
});
re_frame$subs$inp_fn = function(_,___$1){
switch(arguments.length){
case 1:
return re_frame$subs$inp_fn__1.call(this,_);
case 2:
return re_frame$subs$inp_fn__2.call(this,_,___$1);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
re_frame$subs$inp_fn.cljs$core$IFn$_invoke$arity$1 = re_frame$subs$inp_fn__1;
re_frame$subs$inp_fn.cljs$core$IFn$_invoke$arity$2 = re_frame$subs$inp_fn__2;
return re_frame$subs$inp_fn;
})()
;})(pairs,markers,vecs,G__9069,computation_fn,input_args,err_header))

}
})();
return re_frame.registrar.register_handler(re_frame.subs.kind,query_id,((function (computation_fn,input_args,err_header,inputs_fn){
return (function() {
var re_frame$subs$subs_handler_fn = null;
var re_frame$subs$subs_handler_fn__2 = (function (db,query_vec){
var subscriptions = (inputs_fn.cljs$core$IFn$_invoke$arity$2 ? inputs_fn.cljs$core$IFn$_invoke$arity$2(query_vec,null) : inputs_fn.call(null,query_vec,null));
var reaction_id = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var reaction = re_frame.interop.make_reaction(((function (subscriptions,reaction_id,computation_fn,input_args,err_header,inputs_fn){
return (function (){
if(re_frame.trace.is_trace_enabled_QMARK_()){
var _STAR_current_trace_STAR__orig_val__9073 = re_frame.trace._STAR_current_trace_STAR_;
var _STAR_current_trace_STAR__temp_val__9074 = re_frame.trace.start_trace(new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$operation,re_frame.utils.first_in_vector(query_vec),cljs.core.cst$kw$op_DASH_type,cljs.core.cst$kw$sub_SLASH_run,cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$query_DASH_v,query_vec,cljs.core.cst$kw$reaction,cljs.core.deref(reaction_id)], null)], null));
re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__temp_val__9074;

try{try{var subscription = (function (){var G__9075 = re_frame.subs.deref_input_signals(subscriptions,query_id);
var G__9076 = query_vec;
return (computation_fn.cljs$core$IFn$_invoke$arity$2 ? computation_fn.cljs$core$IFn$_invoke$arity$2(G__9075,G__9076) : computation_fn.call(null,G__9075,G__9076));
})();
if(re_frame.trace.is_trace_enabled_QMARK_()){
var new_trace__8464__auto___9092 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.update.cljs$core$IFn$_invoke$arity$4(re_frame.trace._STAR_current_trace_STAR_,cljs.core.cst$kw$tags,cljs.core.merge,cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,subscription], null)], null))),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,subscription], null)], null),cljs.core.cst$kw$tags)], 0));
re_frame.trace._STAR_current_trace_STAR_ = new_trace__8464__auto___9092;

} else {
}

return subscription;
}finally {if(re_frame.trace.is_trace_enabled_QMARK_()){
var end__8462__auto___9093 = re_frame.interop.now();
var duration__8463__auto___9094 = (end__8462__auto___9093 - cljs.core.cst$kw$start.cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(re_frame.trace.traces,cljs.core.conj,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(re_frame.trace._STAR_current_trace_STAR_,cljs.core.cst$kw$duration,duration__8463__auto___9094,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$end,re_frame.interop.now()], 0)));

re_frame.trace.run_tracing_callbacks_BANG_(end__8462__auto___9093);
} else {
}
}}finally {re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__orig_val__9073;
}} else {
var subscription = (function (){var G__9077 = re_frame.subs.deref_input_signals(subscriptions,query_id);
var G__9078 = query_vec;
return (computation_fn.cljs$core$IFn$_invoke$arity$2 ? computation_fn.cljs$core$IFn$_invoke$arity$2(G__9077,G__9078) : computation_fn.call(null,G__9077,G__9078));
})();
if(re_frame.trace.is_trace_enabled_QMARK_()){
var new_trace__8464__auto___9095 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.update.cljs$core$IFn$_invoke$arity$4(re_frame.trace._STAR_current_trace_STAR_,cljs.core.cst$kw$tags,cljs.core.merge,cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,subscription], null)], null))),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,subscription], null)], null),cljs.core.cst$kw$tags)], 0));
re_frame.trace._STAR_current_trace_STAR_ = new_trace__8464__auto___9095;

} else {
}

return subscription;
}
});})(subscriptions,reaction_id,computation_fn,input_args,err_header,inputs_fn))
);
cljs.core.reset_BANG_(reaction_id,re_frame.interop.reagent_id(reaction));

return reaction;
});
var re_frame$subs$subs_handler_fn__3 = (function (db,query_vec,dyn_vec){
var subscriptions = (inputs_fn.cljs$core$IFn$_invoke$arity$2 ? inputs_fn.cljs$core$IFn$_invoke$arity$2(query_vec,dyn_vec) : inputs_fn.call(null,query_vec,dyn_vec));
var reaction_id = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var reaction = re_frame.interop.make_reaction(((function (subscriptions,reaction_id,computation_fn,input_args,err_header,inputs_fn){
return (function (){
if(re_frame.trace.is_trace_enabled_QMARK_()){
var _STAR_current_trace_STAR__orig_val__9079 = re_frame.trace._STAR_current_trace_STAR_;
var _STAR_current_trace_STAR__temp_val__9080 = re_frame.trace.start_trace(new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$operation,re_frame.utils.first_in_vector(query_vec),cljs.core.cst$kw$op_DASH_type,cljs.core.cst$kw$sub_SLASH_run,cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$query_DASH_v,query_vec,cljs.core.cst$kw$dyn_DASH_v,dyn_vec,cljs.core.cst$kw$reaction,cljs.core.deref(reaction_id)], null)], null));
re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__temp_val__9080;

try{try{var subscription = (function (){var G__9081 = re_frame.subs.deref_input_signals(subscriptions,query_id);
var G__9082 = query_vec;
var G__9083 = dyn_vec;
return (computation_fn.cljs$core$IFn$_invoke$arity$3 ? computation_fn.cljs$core$IFn$_invoke$arity$3(G__9081,G__9082,G__9083) : computation_fn.call(null,G__9081,G__9082,G__9083));
})();
if(re_frame.trace.is_trace_enabled_QMARK_()){
var new_trace__8464__auto___9096 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.update.cljs$core$IFn$_invoke$arity$4(re_frame.trace._STAR_current_trace_STAR_,cljs.core.cst$kw$tags,cljs.core.merge,cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,subscription], null)], null))),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,subscription], null)], null),cljs.core.cst$kw$tags)], 0));
re_frame.trace._STAR_current_trace_STAR_ = new_trace__8464__auto___9096;

} else {
}

return subscription;
}finally {if(re_frame.trace.is_trace_enabled_QMARK_()){
var end__8462__auto___9097 = re_frame.interop.now();
var duration__8463__auto___9098 = (end__8462__auto___9097 - cljs.core.cst$kw$start.cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(re_frame.trace.traces,cljs.core.conj,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(re_frame.trace._STAR_current_trace_STAR_,cljs.core.cst$kw$duration,duration__8463__auto___9098,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$end,re_frame.interop.now()], 0)));

re_frame.trace.run_tracing_callbacks_BANG_(end__8462__auto___9097);
} else {
}
}}finally {re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__orig_val__9079;
}} else {
var subscription = (function (){var G__9084 = re_frame.subs.deref_input_signals(subscriptions,query_id);
var G__9085 = query_vec;
var G__9086 = dyn_vec;
return (computation_fn.cljs$core$IFn$_invoke$arity$3 ? computation_fn.cljs$core$IFn$_invoke$arity$3(G__9084,G__9085,G__9086) : computation_fn.call(null,G__9084,G__9085,G__9086));
})();
if(re_frame.trace.is_trace_enabled_QMARK_()){
var new_trace__8464__auto___9099 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.update.cljs$core$IFn$_invoke$arity$4(re_frame.trace._STAR_current_trace_STAR_,cljs.core.cst$kw$tags,cljs.core.merge,cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,subscription], null)], null))),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tags,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,subscription], null)], null),cljs.core.cst$kw$tags)], 0));
re_frame.trace._STAR_current_trace_STAR_ = new_trace__8464__auto___9099;

} else {
}

return subscription;
}
});})(subscriptions,reaction_id,computation_fn,input_args,err_header,inputs_fn))
);
cljs.core.reset_BANG_(reaction_id,re_frame.interop.reagent_id(reaction));

return reaction;
});
re_frame$subs$subs_handler_fn = function(db,query_vec,dyn_vec){
switch(arguments.length){
case 2:
return re_frame$subs$subs_handler_fn__2.call(this,db,query_vec);
case 3:
return re_frame$subs$subs_handler_fn__3.call(this,db,query_vec,dyn_vec);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
re_frame$subs$subs_handler_fn.cljs$core$IFn$_invoke$arity$2 = re_frame$subs$subs_handler_fn__2;
re_frame$subs$subs_handler_fn.cljs$core$IFn$_invoke$arity$3 = re_frame$subs$subs_handler_fn__3;
return re_frame$subs$subs_handler_fn;
})()
;})(computation_fn,input_args,err_header,inputs_fn))
);
});

re_frame.subs.reg_sub.cljs$lang$maxFixedArity = (1);

/** @this {Function} */
re_frame.subs.reg_sub.cljs$lang$applyTo = (function (seq9067){
var G__9068 = cljs.core.first(seq9067);
var seq9067__$1 = cljs.core.next(seq9067);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__9068,seq9067__$1);
});

