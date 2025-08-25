// Compiled by ClojureScript 1.10.520 {:static-fns true, :optimize-constants true}
goog.provide('clojure.data');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('clojure.set');
/**
 * Internal helper for diff.
 */
clojure.data.atom_diff = (function clojure$data$atom_diff(a,b){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(a,b)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,null,a], null);
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [a,b,null], null);
}
});
/**
 * Convert an associative-by-numeric-index collection into
 * an equivalent vector, with nil for any missing keys
 */
clojure.data.vectorize = (function clojure$data$vectorize(m){
if(cljs.core.seq(m)){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (result,p__8829){
var vec__8830 = p__8829;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8830,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8830,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(result,k,v);
}),cljs.core.vec(cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,cljs.core.keys(m)),null)),m);
} else {
return null;
}
});
/**
 * Diff associative things a and b, comparing only the key k.
 */
clojure.data.diff_associative_key = (function clojure$data$diff_associative_key(a,b,k){
var va = cljs.core.get.cljs$core$IFn$_invoke$arity$2(a,k);
var vb = cljs.core.get.cljs$core$IFn$_invoke$arity$2(b,k);
var vec__8833 = clojure.data.diff(va,vb);
var a_STAR_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8833,(0),null);
var b_STAR_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8833,(1),null);
var ab = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__8833,(2),null);
var in_a = cljs.core.contains_QMARK_(a,k);
var in_b = cljs.core.contains_QMARK_(b,k);
var same = ((in_a) && (in_b) && ((((!((ab == null)))) || ((((va == null)) && ((vb == null)))))));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((((in_a) && ((((!((a_STAR_ == null)))) || ((!(same)))))))?cljs.core.PersistentArrayMap.createAsIfByAssoc([k,a_STAR_]):null),((((in_b) && ((((!((b_STAR_ == null)))) || ((!(same)))))))?cljs.core.PersistentArrayMap.createAsIfByAssoc([k,b_STAR_]):null),((same)?cljs.core.PersistentArrayMap.createAsIfByAssoc([k,ab]):null)], null);
});
/**
 * Diff associative things a and b, comparing only keys in ks (if supplied).
 */
clojure.data.diff_associative = (function clojure$data$diff_associative(var_args){
var G__8837 = arguments.length;
switch (G__8837) {
case 2:
return clojure.data.diff_associative.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return clojure.data.diff_associative.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

clojure.data.diff_associative.cljs$core$IFn$_invoke$arity$2 = (function (a,b){
return clojure.data.diff_associative.cljs$core$IFn$_invoke$arity$3(a,b,clojure.set.union.cljs$core$IFn$_invoke$arity$2(cljs.core.keys(a),cljs.core.keys(b)));
});

clojure.data.diff_associative.cljs$core$IFn$_invoke$arity$3 = (function (a,b,ks){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (diff1,diff2){
return cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.merge,diff1,diff2));
}),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,null,null], null),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$3(clojure.data.diff_associative_key,a,b),ks));
});

clojure.data.diff_associative.cljs$lang$maxFixedArity = 3;

clojure.data.diff_sequential = (function clojure$data$diff_sequential(a,b){
return cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.data.vectorize,clojure.data.diff_associative.cljs$core$IFn$_invoke$arity$3(((cljs.core.vector_QMARK_(a))?a:cljs.core.vec(a)),((cljs.core.vector_QMARK_(b))?b:cljs.core.vec(b)),cljs.core.range.cljs$core$IFn$_invoke$arity$1((function (){var x__4219__auto__ = cljs.core.count(a);
var y__4220__auto__ = cljs.core.count(b);
return ((x__4219__auto__ > y__4220__auto__) ? x__4219__auto__ : y__4220__auto__);
})()))));
});
clojure.data.diff_set = (function clojure$data$diff_set(a,b){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.not_empty(clojure.set.difference.cljs$core$IFn$_invoke$arity$2(a,b)),cljs.core.not_empty(clojure.set.difference.cljs$core$IFn$_invoke$arity$2(b,a)),cljs.core.not_empty(clojure.set.intersection.cljs$core$IFn$_invoke$arity$2(a,b))], null);
});

/**
 * Implementation detail. Subject to change.
 * @interface
 */
clojure.data.EqualityPartition = function(){};

/**
 * Implementation detail. Subject to change.
 */
clojure.data.equality_partition = (function clojure$data$equality_partition(x){
if((((!((x == null)))) && ((!((x.clojure$data$EqualityPartition$equality_partition$arity$1 == null)))))){
return x.clojure$data$EqualityPartition$equality_partition$arity$1(x);
} else {
var x__4433__auto__ = (((x == null))?null:x);
var m__4434__auto__ = (clojure.data.equality_partition[goog.typeOf(x__4433__auto__)]);
if((!((m__4434__auto__ == null)))){
return (m__4434__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4434__auto__.cljs$core$IFn$_invoke$arity$1(x) : m__4434__auto__.call(null,x));
} else {
var m__4431__auto__ = (clojure.data.equality_partition["_"]);
if((!((m__4431__auto__ == null)))){
return (m__4431__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4431__auto__.cljs$core$IFn$_invoke$arity$1(x) : m__4431__auto__.call(null,x));
} else {
throw cljs.core.missing_protocol("EqualityPartition.equality-partition",x);
}
}
}
});


/**
 * Implementation detail. Subject to change.
 * @interface
 */
clojure.data.Diff = function(){};

/**
 * Implementation detail. Subject to change.
 */
clojure.data.diff_similar = (function clojure$data$diff_similar(a,b){
if((((!((a == null)))) && ((!((a.clojure$data$Diff$diff_similar$arity$2 == null)))))){
return a.clojure$data$Diff$diff_similar$arity$2(a,b);
} else {
var x__4433__auto__ = (((a == null))?null:a);
var m__4434__auto__ = (clojure.data.diff_similar[goog.typeOf(x__4433__auto__)]);
if((!((m__4434__auto__ == null)))){
return (m__4434__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4434__auto__.cljs$core$IFn$_invoke$arity$2(a,b) : m__4434__auto__.call(null,a,b));
} else {
var m__4431__auto__ = (clojure.data.diff_similar["_"]);
if((!((m__4431__auto__ == null)))){
return (m__4431__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4431__auto__.cljs$core$IFn$_invoke$arity$2(a,b) : m__4431__auto__.call(null,a,b));
} else {
throw cljs.core.missing_protocol("Diff.diff-similar",a);
}
}
}
});

goog.object.set(clojure.data.EqualityPartition,"null",true);

var G__8839_8863 = clojure.data.equality_partition;
var G__8840_8864 = "null";
var G__8841_8865 = ((function (G__8839_8863,G__8840_8864){
return (function (x){
return cljs.core.cst$kw$atom;
});})(G__8839_8863,G__8840_8864))
;
goog.object.set(G__8839_8863,G__8840_8864,G__8841_8865);

goog.object.set(clojure.data.EqualityPartition,"string",true);

var G__8842_8866 = clojure.data.equality_partition;
var G__8843_8867 = "string";
var G__8844_8868 = ((function (G__8842_8866,G__8843_8867){
return (function (x){
return cljs.core.cst$kw$atom;
});})(G__8842_8866,G__8843_8867))
;
goog.object.set(G__8842_8866,G__8843_8867,G__8844_8868);

goog.object.set(clojure.data.EqualityPartition,"number",true);

var G__8845_8869 = clojure.data.equality_partition;
var G__8846_8870 = "number";
var G__8847_8871 = ((function (G__8845_8869,G__8846_8870){
return (function (x){
return cljs.core.cst$kw$atom;
});})(G__8845_8869,G__8846_8870))
;
goog.object.set(G__8845_8869,G__8846_8870,G__8847_8871);

goog.object.set(clojure.data.EqualityPartition,"array",true);

var G__8848_8872 = clojure.data.equality_partition;
var G__8849_8873 = "array";
var G__8850_8874 = ((function (G__8848_8872,G__8849_8873){
return (function (x){
return cljs.core.cst$kw$sequential;
});})(G__8848_8872,G__8849_8873))
;
goog.object.set(G__8848_8872,G__8849_8873,G__8850_8874);

goog.object.set(clojure.data.EqualityPartition,"function",true);

var G__8851_8875 = clojure.data.equality_partition;
var G__8852_8876 = "function";
var G__8853_8877 = ((function (G__8851_8875,G__8852_8876){
return (function (x){
return cljs.core.cst$kw$atom;
});})(G__8851_8875,G__8852_8876))
;
goog.object.set(G__8851_8875,G__8852_8876,G__8853_8877);

goog.object.set(clojure.data.EqualityPartition,"boolean",true);

var G__8854_8878 = clojure.data.equality_partition;
var G__8855_8879 = "boolean";
var G__8856_8880 = ((function (G__8854_8878,G__8855_8879){
return (function (x){
return cljs.core.cst$kw$atom;
});})(G__8854_8878,G__8855_8879))
;
goog.object.set(G__8854_8878,G__8855_8879,G__8856_8880);

goog.object.set(clojure.data.EqualityPartition,"_",true);

var G__8857_8881 = clojure.data.equality_partition;
var G__8858_8882 = "_";
var G__8859_8883 = ((function (G__8857_8881,G__8858_8882){
return (function (x){
if((((!((x == null))))?(((((x.cljs$lang$protocol_mask$partition0$ & (1024))) || ((cljs.core.PROTOCOL_SENTINEL === x.cljs$core$IMap$))))?true:(((!x.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IMap,x):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IMap,x))){
return cljs.core.cst$kw$map;
} else {
if((((!((x == null))))?(((((x.cljs$lang$protocol_mask$partition0$ & (4096))) || ((cljs.core.PROTOCOL_SENTINEL === x.cljs$core$ISet$))))?true:(((!x.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.ISet,x):false)):cljs.core.native_satisfies_QMARK_(cljs.core.ISet,x))){
return cljs.core.cst$kw$set;
} else {
if((((!((x == null))))?(((((x.cljs$lang$protocol_mask$partition0$ & (16777216))) || ((cljs.core.PROTOCOL_SENTINEL === x.cljs$core$ISequential$))))?true:(((!x.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.ISequential,x):false)):cljs.core.native_satisfies_QMARK_(cljs.core.ISequential,x))){
return cljs.core.cst$kw$sequential;
} else {
return cljs.core.cst$kw$atom;

}
}
}
});})(G__8857_8881,G__8858_8882))
;
goog.object.set(G__8857_8881,G__8858_8882,G__8859_8883);
goog.object.set(clojure.data.Diff,"null",true);

var G__8884_8908 = clojure.data.diff_similar;
var G__8885_8909 = "null";
var G__8886_8910 = ((function (G__8884_8908,G__8885_8909){
return (function (a,b){
return clojure.data.atom_diff(a,b);
});})(G__8884_8908,G__8885_8909))
;
goog.object.set(G__8884_8908,G__8885_8909,G__8886_8910);

goog.object.set(clojure.data.Diff,"string",true);

var G__8887_8911 = clojure.data.diff_similar;
var G__8888_8912 = "string";
var G__8889_8913 = ((function (G__8887_8911,G__8888_8912){
return (function (a,b){
return clojure.data.atom_diff(a,b);
});})(G__8887_8911,G__8888_8912))
;
goog.object.set(G__8887_8911,G__8888_8912,G__8889_8913);

goog.object.set(clojure.data.Diff,"number",true);

var G__8890_8914 = clojure.data.diff_similar;
var G__8891_8915 = "number";
var G__8892_8916 = ((function (G__8890_8914,G__8891_8915){
return (function (a,b){
return clojure.data.atom_diff(a,b);
});})(G__8890_8914,G__8891_8915))
;
goog.object.set(G__8890_8914,G__8891_8915,G__8892_8916);

goog.object.set(clojure.data.Diff,"array",true);

var G__8893_8917 = clojure.data.diff_similar;
var G__8894_8918 = "array";
var G__8895_8919 = ((function (G__8893_8917,G__8894_8918){
return (function (a,b){
return clojure.data.diff_sequential(a,b);
});})(G__8893_8917,G__8894_8918))
;
goog.object.set(G__8893_8917,G__8894_8918,G__8895_8919);

goog.object.set(clojure.data.Diff,"function",true);

var G__8896_8920 = clojure.data.diff_similar;
var G__8897_8921 = "function";
var G__8898_8922 = ((function (G__8896_8920,G__8897_8921){
return (function (a,b){
return clojure.data.atom_diff(a,b);
});})(G__8896_8920,G__8897_8921))
;
goog.object.set(G__8896_8920,G__8897_8921,G__8898_8922);

goog.object.set(clojure.data.Diff,"boolean",true);

var G__8899_8923 = clojure.data.diff_similar;
var G__8900_8924 = "boolean";
var G__8901_8925 = ((function (G__8899_8923,G__8900_8924){
return (function (a,b){
return clojure.data.atom_diff(a,b);
});})(G__8899_8923,G__8900_8924))
;
goog.object.set(G__8899_8923,G__8900_8924,G__8901_8925);

goog.object.set(clojure.data.Diff,"_",true);

var G__8902_8926 = clojure.data.diff_similar;
var G__8903_8927 = "_";
var G__8904_8928 = ((function (G__8902_8926,G__8903_8927){
return (function (a,b){
var fexpr__8906 = (function (){var G__8907 = clojure.data.equality_partition(a);
var G__8907__$1 = (((G__8907 instanceof cljs.core.Keyword))?G__8907.fqn:null);
switch (G__8907__$1) {
case "atom":
return clojure.data.atom_diff;

break;
case "set":
return clojure.data.diff_set;

break;
case "sequential":
return clojure.data.diff_sequential;

break;
case "map":
return clojure.data.diff_associative;

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__8907__$1)].join('')));

}
})();
return (fexpr__8906.cljs$core$IFn$_invoke$arity$2 ? fexpr__8906.cljs$core$IFn$_invoke$arity$2(a,b) : fexpr__8906.call(null,a,b));
});})(G__8902_8926,G__8903_8927))
;
goog.object.set(G__8902_8926,G__8903_8927,G__8904_8928);
/**
 * Recursively compares a and b, returning a tuple of
 *   [things-only-in-a things-only-in-b things-in-both].
 *   Comparison rules:
 * 
 *   * For equal a and b, return [nil nil a].
 *   * Maps are subdiffed where keys match and values differ.
 *   * Sets are never subdiffed.
 *   * All sequential things are treated as associative collections
 *  by their indexes, with results returned as vectors.
 *   * Everything else (including strings!) is treated as
 *  an atom and compared for equality.
 */
clojure.data.diff = (function clojure$data$diff(a,b){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(a,b)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,null,a], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(clojure.data.equality_partition(a),clojure.data.equality_partition(b))){
return clojure.data.diff_similar(a,b);
} else {
return clojure.data.atom_diff(a,b);
}
}
});
