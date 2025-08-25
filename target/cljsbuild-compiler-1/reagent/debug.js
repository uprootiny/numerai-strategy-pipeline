// Compiled by ClojureScript 1.10.520 {:static-fns true, :optimize-constants true}
goog.provide('reagent.debug');
goog.require('cljs.core');
goog.require('cljs.core.constants');
reagent.debug.has_console = (typeof console !== 'undefined');
reagent.debug.tracking = false;
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.warnings !== 'undefined')){
} else {
reagent.debug.warnings = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.track_console !== 'undefined')){
} else {
reagent.debug.track_console = (function (){var o = ({});
o.warn = ((function (o){
return (function() { 
var G__5890__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$warn], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__5890 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__5891__i = 0, G__5891__a = new Array(arguments.length -  0);
while (G__5891__i < G__5891__a.length) {G__5891__a[G__5891__i] = arguments[G__5891__i + 0]; ++G__5891__i;}
  args = new cljs.core.IndexedSeq(G__5891__a,0,null);
} 
return G__5890__delegate.call(this,args);};
G__5890.cljs$lang$maxFixedArity = 0;
G__5890.cljs$lang$applyTo = (function (arglist__5892){
var args = cljs.core.seq(arglist__5892);
return G__5890__delegate(args);
});
G__5890.cljs$core$IFn$_invoke$arity$variadic = G__5890__delegate;
return G__5890;
})()
;})(o))
;

o.error = ((function (o){
return (function() { 
var G__5893__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$error], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__5893 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__5894__i = 0, G__5894__a = new Array(arguments.length -  0);
while (G__5894__i < G__5894__a.length) {G__5894__a[G__5894__i] = arguments[G__5894__i + 0]; ++G__5894__i;}
  args = new cljs.core.IndexedSeq(G__5894__a,0,null);
} 
return G__5893__delegate.call(this,args);};
G__5893.cljs$lang$maxFixedArity = 0;
G__5893.cljs$lang$applyTo = (function (arglist__5895){
var args = cljs.core.seq(arglist__5895);
return G__5893__delegate(args);
});
G__5893.cljs$core$IFn$_invoke$arity$variadic = G__5893__delegate;
return G__5893;
})()
;})(o))
;

return o;
})();
}
reagent.debug.track_warnings = (function reagent$debug$track_warnings(f){
reagent.debug.tracking = true;

cljs.core.reset_BANG_(reagent.debug.warnings,null);

(f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));

var warns = cljs.core.deref(reagent.debug.warnings);
cljs.core.reset_BANG_(reagent.debug.warnings,null);

reagent.debug.tracking = false;

return warns;
});
