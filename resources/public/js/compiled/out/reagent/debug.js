// Compiled by ClojureScript 1.11.121 {:optimizations :none}
goog.provide('reagent.debug');
goog.require('cljs.core');
reagent.debug.has_console = (typeof console !== 'undefined');
reagent.debug.tracking = false;
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.warnings !== 'undefined')){
} else {
reagent.debug.warnings = cljs.core.atom.call(null,null);
}
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.track_console !== 'undefined')){
} else {
reagent.debug.track_console = (function (){var o = ({});
(o.warn = (function() { 
var G__1372__delegate = function (args){
return cljs.core.swap_BANG_.call(null,reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"warn","warn",-436710552)], null),cljs.core.conj,cljs.core.apply.call(null,cljs.core.str,args));
};
var G__1372 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__1373__i = 0, G__1373__a = new Array(arguments.length -  0);
while (G__1373__i < G__1373__a.length) {G__1373__a[G__1373__i] = arguments[G__1373__i + 0]; ++G__1373__i;}
  args = new cljs.core.IndexedSeq(G__1373__a,0,null);
} 
return G__1372__delegate.call(this,args);};
G__1372.cljs$lang$maxFixedArity = 0;
G__1372.cljs$lang$applyTo = (function (arglist__1374){
var args = cljs.core.seq(arglist__1374);
return G__1372__delegate(args);
});
G__1372.cljs$core$IFn$_invoke$arity$variadic = G__1372__delegate;
return G__1372;
})()
);

(o.error = (function() { 
var G__1375__delegate = function (args){
return cljs.core.swap_BANG_.call(null,reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"error","error",-978969032)], null),cljs.core.conj,cljs.core.apply.call(null,cljs.core.str,args));
};
var G__1375 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__1376__i = 0, G__1376__a = new Array(arguments.length -  0);
while (G__1376__i < G__1376__a.length) {G__1376__a[G__1376__i] = arguments[G__1376__i + 0]; ++G__1376__i;}
  args = new cljs.core.IndexedSeq(G__1376__a,0,null);
} 
return G__1375__delegate.call(this,args);};
G__1375.cljs$lang$maxFixedArity = 0;
G__1375.cljs$lang$applyTo = (function (arglist__1377){
var args = cljs.core.seq(arglist__1377);
return G__1375__delegate(args);
});
G__1375.cljs$core$IFn$_invoke$arity$variadic = G__1375__delegate;
return G__1375;
})()
);

return o;
})();
}
reagent.debug.track_warnings = (function reagent$debug$track_warnings(f){
(reagent.debug.tracking = true);

cljs.core.reset_BANG_.call(null,reagent.debug.warnings,null);

f.call(null);

var warns = cljs.core.deref.call(null,reagent.debug.warnings);
cljs.core.reset_BANG_.call(null,reagent.debug.warnings,null);

(reagent.debug.tracking = false);

return warns;
});

//# sourceMappingURL=debug.js.map?rel=1756147041417
