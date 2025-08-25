// Compiled by ClojureScript 1.10.520 {:static-fns true, :optimize-constants true}
goog.provide('re_frame.utils');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('re_frame.loggers');
/**
 * Dissociates an entry from a nested associative structure returning a new
 *   nested structure. keys is a sequence of keys. Any empty maps that result
 *   will not be present in the new structure.
 *   The key thing is that 'm' remains identical? to itself if the path was never present
 */
re_frame.utils.dissoc_in = (function re_frame$utils$dissoc_in(m,p__8598){
var vec__8599 = p__8598;
var seq__8600 = cljs.core.seq(vec__8599);
var first__8601 = cljs.core.first(seq__8600);
var seq__8600__$1 = cljs.core.next(seq__8600);
var k = first__8601;
var ks = seq__8600__$1;
var keys = vec__8599;
if(ks){
var temp__5733__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,k);
if(cljs.core.truth_(temp__5733__auto__)){
var nextmap = temp__5733__auto__;
var newmap = (re_frame.utils.dissoc_in.cljs$core$IFn$_invoke$arity$2 ? re_frame.utils.dissoc_in.cljs$core$IFn$_invoke$arity$2(nextmap,ks) : re_frame.utils.dissoc_in.call(null,nextmap,ks));
if(cljs.core.seq(newmap)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,k,newmap);
} else {
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(m,k);
}
} else {
return m;
}
} else {
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(m,k);
}
});
re_frame.utils.first_in_vector = (function re_frame$utils$first_in_vector(v){
if(cljs.core.vector_QMARK_(v)){
return cljs.core.first(v);
} else {
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$error,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: expected a vector, but got:",v], 0));
}
});
/**
 * Like apply, but f takes keyword arguments and the last argument is
 *   not a seq but a map with the arguments for f
 */
re_frame.utils.apply_kw = (function re_frame$utils$apply_kw(var_args){
var args__4736__auto__ = [];
var len__4730__auto___8604 = arguments.length;
var i__4731__auto___8605 = (0);
while(true){
if((i__4731__auto___8605 < len__4730__auto___8604)){
args__4736__auto__.push((arguments[i__4731__auto___8605]));

var G__8606 = (i__4731__auto___8605 + (1));
i__4731__auto___8605 = G__8606;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((1) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((1)),(0),null)):null);
return re_frame.utils.apply_kw.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4737__auto__);
});

re_frame.utils.apply_kw.cljs$core$IFn$_invoke$arity$variadic = (function (f,args){
if(cljs.core.map_QMARK_(cljs.core.last(args))){
} else {
throw (new Error("Assert failed: (map? (last args))"));
}

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.concat,cljs.core.butlast(args),cljs.core.last(args)));
});

re_frame.utils.apply_kw.cljs$lang$maxFixedArity = (1);

/** @this {Function} */
re_frame.utils.apply_kw.cljs$lang$applyTo = (function (seq8602){
var G__8603 = cljs.core.first(seq8602);
var seq8602__$1 = cljs.core.next(seq8602);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__8603,seq8602__$1);
});

