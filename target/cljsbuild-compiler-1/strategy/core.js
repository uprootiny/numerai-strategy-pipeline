// Compiled by ClojureScript 1.10.520 {:static-fns true, :optimize-constants true}
goog.provide('strategy.core');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('reagent.core');
goog.require('re_frame.core');
goog.require('cljs.reader');
goog.require('cljs_time.core');
goog.require('cljs_time.format');
goog.require('ajax.core');
if((typeof strategy !== 'undefined') && (typeof strategy.core !== 'undefined') && (typeof strategy.core.app_state !== 'undefined')){
} else {
strategy.core.app_state = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$projects,cljs.core.PersistentVector.EMPTY,cljs.core.cst$kw$current_DASH_view,cljs.core.cst$kw$kanban,cljs.core.cst$kw$stream_DASH_active,false,cljs.core.cst$kw$system_DASH_data,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$notifications,cljs.core.PersistentVector.EMPTY,cljs.core.cst$kw$filters,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$rules,cljs.core.PersistentHashSet.EMPTY,cljs.core.cst$kw$tags,cljs.core.PersistentHashSet.EMPTY], null),cljs.core.cst$kw$selected_DASH_projects,cljs.core.PersistentHashSet.EMPTY], null));
}
strategy.core.initial_projects = new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$id,"topoi",cljs.core.cst$kw$name,"TDA Mathematical Visualization",cljs.core.cst$kw$status,cljs.core.cst$kw$in_DASH_progress,cljs.core.cst$kw$priority,cljs.core.cst$kw$high,cljs.core.cst$kw$progress,(90),cljs.core.cst$kw$tags,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$elixir,null,cljs.core.cst$kw$math,null,cljs.core.cst$kw$topology,null], null), null)], null),new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$id,"strategy",cljs.core.cst$kw$name,"Strategy Dashboard",cljs.core.cst$kw$status,cljs.core.cst$kw$in_DASH_progress,cljs.core.cst$kw$priority,cljs.core.cst$kw$high,cljs.core.cst$kw$progress,(85),cljs.core.cst$kw$tags,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$clojurescript,null,cljs.core.cst$kw$management,null], null), null)], null),new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$id,"numerai",cljs.core.cst$kw$name,"Numerai TDA Integration",cljs.core.cst$kw$status,cljs.core.cst$kw$in_DASH_progress,cljs.core.cst$kw$priority,cljs.core.cst$kw$high,cljs.core.cst$kw$progress,(70),cljs.core.cst$kw$tags,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$ml,null,cljs.core.cst$kw$finance,null,cljs.core.cst$kw$topology,null], null), null)], null),new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$id,"graph",cljs.core.cst$kw$name,"Graph Canvas",cljs.core.cst$kw$status,cljs.core.cst$kw$deployed,cljs.core.cst$kw$priority,cljs.core.cst$kw$medium,cljs.core.cst$kw$progress,(100),cljs.core.cst$kw$tags,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$visualization,null,cljs.core.cst$kw$network,null], null), null)], null),new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$id,"hyperstitious",cljs.core.cst$kw$name,"Art Showcase",cljs.core.cst$kw$status,cljs.core.cst$kw$deployed,cljs.core.cst$kw$priority,cljs.core.cst$kw$medium,cljs.core.cst$kw$progress,(100),cljs.core.cst$kw$tags,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$art,null,cljs.core.cst$kw$creative,null], null), null)], null),new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$id,"cljs-revival",cljs.core.cst$kw$name,"CLJS Project Revival",cljs.core.cst$kw$status,cljs.core.cst$kw$testing,cljs.core.cst$kw$priority,cljs.core.cst$kw$high,cljs.core.cst$kw$progress,(60),cljs.core.cst$kw$tags,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$clojurescript,null,cljs.core.cst$kw$infrastructure,null], null), null)], null),new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$id,"electric-agents",cljs.core.cst$kw$name,"Electric Multi-Agent System",cljs.core.cst$kw$status,cljs.core.cst$kw$backlog,cljs.core.cst$kw$priority,cljs.core.cst$kw$medium,cljs.core.cst$kw$progress,(30),cljs.core.cst$kw$tags,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$clojure,null,cljs.core.cst$kw$agents,null], null), null)], null),new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$id,"post-mortem",cljs.core.cst$kw$name,"Project Post-Mortem Analysis",cljs.core.cst$kw$status,cljs.core.cst$kw$backlog,cljs.core.cst$kw$priority,cljs.core.cst$kw$low,cljs.core.cst$kw$progress,(10),cljs.core.cst$kw$tags,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$analysis,null,cljs.core.cst$kw$cleanup,null], null), null)], null),new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$id,"vessel-server",cljs.core.cst$kw$name,"Vessel Server",cljs.core.cst$kw$status,cljs.core.cst$kw$needs_DASH_attention,cljs.core.cst$kw$priority,cljs.core.cst$kw$medium,cljs.core.cst$kw$progress,(40),cljs.core.cst$kw$tags,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$clojure,null,cljs.core.cst$kw$infrastructure,null], null), null)], null),new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$id,"alpha-etudes",cljs.core.cst$kw$name,"Alpha Etudes",cljs.core.cst$kw$status,cljs.core.cst$kw$needs_DASH_attention,cljs.core.cst$kw$priority,cljs.core.cst$kw$low,cljs.core.cst$kw$progress,(25),cljs.core.cst$kw$tags,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$experiments,null], null), null)], null)], null);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(strategy.core.app_state,cljs.core.assoc,cljs.core.cst$kw$projects,strategy.core.initial_projects);
strategy.core.now = (function strategy$core$now(){
return cljs_time.core.now();
});
strategy.core.format_time = (function strategy$core$format_time(time){
return cljs_time.format.unparse(cljs_time.format.formatter.cljs$core$IFn$_invoke$arity$1("HH:mm:ss"),time);
});
strategy.core.add_notification = (function strategy$core$add_notification(message,type){
var notification = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$id,cljs.core.random_uuid(),cljs.core.cst$kw$message,message,cljs.core.cst$kw$type,type,cljs.core.cst$kw$timestamp,strategy.core.now()], null);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(strategy.core.app_state,cljs.core.update,cljs.core.cst$kw$notifications,cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([notification], 0));

return setTimeout(((function (notification){
return (function (){
var G__9205 = cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(notification);
return (strategy.core.remove_notification.cljs$core$IFn$_invoke$arity$1 ? strategy.core.remove_notification.cljs$core$IFn$_invoke$arity$1(G__9205) : strategy.core.remove_notification.call(null,G__9205));
});})(notification))
,(3000));
});
strategy.core.remove_notification = (function strategy$core$remove_notification(id){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(strategy.core.app_state,cljs.core.update,cljs.core.cst$kw$notifications,(function (notifications){
return cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__9206_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(p1__9206_SHARP_),id);
}),notifications);
}));
});
strategy.core.fetch_system_data = (function strategy$core$fetch_system_data(){
return ajax.core.GET.cljs$core$IFn$_invoke$arity$variadic("/ecosystem-data.json",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$handler,(function (response){
var data = ((typeof response === 'string')?cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(response):response);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(strategy.core.app_state,cljs.core.assoc,cljs.core.cst$kw$system_DASH_data,data);

return (strategy.core.update_projects_from_system.cljs$core$IFn$_invoke$arity$1 ? strategy.core.update_projects_from_system.cljs$core$IFn$_invoke$arity$1(data) : strategy.core.update_projects_from_system.call(null,data));
}),cljs.core.cst$kw$error_DASH_handler,(function (error){
return strategy.core.add_notification("System sync failed",cljs.core.cst$kw$error);
})], null)], 0));
});
strategy.core.update_projects_from_system = (function strategy$core$update_projects_from_system(data){
var temp__5735__auto__ = cljs.core.cst$kw$projects.cljs$core$IFn$_invoke$arity$1(data);
if(cljs.core.truth_(temp__5735__auto__)){
var projects_data = temp__5735__auto__;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(strategy.core.app_state,cljs.core.update,cljs.core.cst$kw$projects,((function (projects_data,temp__5735__auto__){
return (function (projects){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (projects_data,temp__5735__auto__){
return (function (project){
var sys_key = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(project)),".uprootiny.dev"].join('');
var sys_project = cljs.core.get.cljs$core$IFn$_invoke$arity$2(projects_data,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(sys_key));
if(cljs.core.truth_(sys_project)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(project,cljs.core.cst$kw$status,(function (){var G__9207 = cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(sys_project);
switch (G__9207) {
case "ready":
return cljs.core.cst$kw$deployed;

break;
case "broken":
return cljs.core.cst$kw$backlog;

break;
case "pending":
return cljs.core.cst$kw$in_DASH_progress;

break;
default:
return cljs.core.cst$kw$testing;

}
})(),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$progress,(function (){var G__9208 = cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(sys_project);
switch (G__9208) {
case "ready":
return (100);

break;
case "pending":
return (20);

break;
default:
return (50);

}
})()], 0));
} else {
return project;
}
});})(projects_data,temp__5735__auto__))
,projects);
});})(projects_data,temp__5735__auto__))
);
} else {
return null;
}
});
strategy.core.analyze_project_topology = (function strategy$core$analyze_project_topology(){
var projects = cljs.core.cst$kw$projects.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(strategy.core.app_state));
var project_graph = (strategy.core.build_project_dependency_graph.cljs$core$IFn$_invoke$arity$1 ? strategy.core.build_project_dependency_graph.cljs$core$IFn$_invoke$arity$1(projects) : strategy.core.build_project_dependency_graph.call(null,projects));
var tda_metrics = (strategy.core.compute_project_tda_metrics.cljs$core$IFn$_invoke$arity$1 ? strategy.core.compute_project_tda_metrics.cljs$core$IFn$_invoke$arity$1(project_graph) : strategy.core.compute_project_tda_metrics.call(null,project_graph));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(strategy.core.app_state,cljs.core.assoc,cljs.core.cst$kw$tda_DASH_analysis,tda_metrics);

return strategy.core.add_notification(["TDA Analysis: \u03B2\u2080=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$betti_DASH_0.cljs$core$IFn$_invoke$arity$1(tda_metrics))," \u03B2\u2081=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$betti_DASH_1.cljs$core$IFn$_invoke$arity$1(tda_metrics))].join(''),cljs.core.cst$kw$info);
});
strategy.core.build_project_dependency_graph = (function strategy$core$build_project_dependency_graph(projects){
var project_ids = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$id,projects);
var adjacency_matrix = (function (){var iter__4523__auto__ = ((function (project_ids){
return (function strategy$core$build_project_dependency_graph_$_iter__9211(s__9212){
return (new cljs.core.LazySeq(null,((function (project_ids){
return (function (){
var s__9212__$1 = s__9212;
while(true){
var temp__5735__auto__ = cljs.core.seq(s__9212__$1);
if(temp__5735__auto__){
var s__9212__$2 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(s__9212__$2)){
var c__4521__auto__ = cljs.core.chunk_first(s__9212__$2);
var size__4522__auto__ = cljs.core.count(c__4521__auto__);
var b__9214 = cljs.core.chunk_buffer(size__4522__auto__);
if((function (){var i__9213 = (0);
while(true){
if((i__9213 < size__4522__auto__)){
var p1 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__4521__auto__,i__9213);
cljs.core.chunk_append(b__9214,(function (){var iter__4523__auto__ = ((function (i__9213,p1,c__4521__auto__,size__4522__auto__,b__9214,s__9212__$2,temp__5735__auto__,project_ids){
return (function strategy$core$build_project_dependency_graph_$_iter__9211_$_iter__9215(s__9216){
return (new cljs.core.LazySeq(null,((function (i__9213,p1,c__4521__auto__,size__4522__auto__,b__9214,s__9212__$2,temp__5735__auto__,project_ids){
return (function (){
var s__9216__$1 = s__9216;
while(true){
var temp__5735__auto____$1 = cljs.core.seq(s__9216__$1);
if(temp__5735__auto____$1){
var s__9216__$2 = temp__5735__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__9216__$2)){
var c__4521__auto____$1 = cljs.core.chunk_first(s__9216__$2);
var size__4522__auto____$1 = cljs.core.count(c__4521__auto____$1);
var b__9218 = cljs.core.chunk_buffer(size__4522__auto____$1);
if((function (){var i__9217 = (0);
while(true){
if((i__9217 < size__4522__auto____$1)){
var p2 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__4521__auto____$1,i__9217);
cljs.core.chunk_append(b__9218,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p1,p2))?(0):cljs.core.count(clojure.set.intersection.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(p1),cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(p2)))));

var G__9223 = (i__9217 + (1));
i__9217 = G__9223;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__9218),strategy$core$build_project_dependency_graph_$_iter__9211_$_iter__9215(cljs.core.chunk_rest(s__9216__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__9218),null);
}
} else {
var p2 = cljs.core.first(s__9216__$2);
return cljs.core.cons(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p1,p2))?(0):cljs.core.count(clojure.set.intersection.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(p1),cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(p2)))),strategy$core$build_project_dependency_graph_$_iter__9211_$_iter__9215(cljs.core.rest(s__9216__$2)));
}
} else {
return null;
}
break;
}
});})(i__9213,p1,c__4521__auto__,size__4522__auto__,b__9214,s__9212__$2,temp__5735__auto__,project_ids))
,null,null));
});})(i__9213,p1,c__4521__auto__,size__4522__auto__,b__9214,s__9212__$2,temp__5735__auto__,project_ids))
;
return iter__4523__auto__(projects);
})());

var G__9224 = (i__9213 + (1));
i__9213 = G__9224;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__9214),strategy$core$build_project_dependency_graph_$_iter__9211(cljs.core.chunk_rest(s__9212__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__9214),null);
}
} else {
var p1 = cljs.core.first(s__9212__$2);
return cljs.core.cons((function (){var iter__4523__auto__ = ((function (p1,s__9212__$2,temp__5735__auto__,project_ids){
return (function strategy$core$build_project_dependency_graph_$_iter__9211_$_iter__9219(s__9220){
return (new cljs.core.LazySeq(null,((function (p1,s__9212__$2,temp__5735__auto__,project_ids){
return (function (){
var s__9220__$1 = s__9220;
while(true){
var temp__5735__auto____$1 = cljs.core.seq(s__9220__$1);
if(temp__5735__auto____$1){
var s__9220__$2 = temp__5735__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__9220__$2)){
var c__4521__auto__ = cljs.core.chunk_first(s__9220__$2);
var size__4522__auto__ = cljs.core.count(c__4521__auto__);
var b__9222 = cljs.core.chunk_buffer(size__4522__auto__);
if((function (){var i__9221 = (0);
while(true){
if((i__9221 < size__4522__auto__)){
var p2 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__4521__auto__,i__9221);
cljs.core.chunk_append(b__9222,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p1,p2))?(0):cljs.core.count(clojure.set.intersection.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(p1),cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(p2)))));

var G__9225 = (i__9221 + (1));
i__9221 = G__9225;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__9222),strategy$core$build_project_dependency_graph_$_iter__9211_$_iter__9219(cljs.core.chunk_rest(s__9220__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__9222),null);
}
} else {
var p2 = cljs.core.first(s__9220__$2);
return cljs.core.cons(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p1,p2))?(0):cljs.core.count(clojure.set.intersection.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(p1),cljs.core.cst$kw$tags.cljs$core$IFn$_invoke$arity$1(p2)))),strategy$core$build_project_dependency_graph_$_iter__9211_$_iter__9219(cljs.core.rest(s__9220__$2)));
}
} else {
return null;
}
break;
}
});})(p1,s__9212__$2,temp__5735__auto__,project_ids))
,null,null));
});})(p1,s__9212__$2,temp__5735__auto__,project_ids))
;
return iter__4523__auto__(projects);
})(),strategy$core$build_project_dependency_graph_$_iter__9211(cljs.core.rest(s__9212__$2)));
}
} else {
return null;
}
break;
}
});})(project_ids))
,null,null));
});})(project_ids))
;
return iter__4523__auto__(projects);
})();
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$nodes,projects,cljs.core.cst$kw$adjacency,adjacency_matrix], null);
});
strategy.core.compute_project_tda_metrics = (function strategy$core$compute_project_tda_metrics(graph){
var nodes = cljs.core.cst$kw$nodes.cljs$core$IFn$_invoke$arity$1(graph);
var edges = cljs.core.count(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (nodes){
return (function (p1__9226_SHARP_){
return (p1__9226_SHARP_ > (0));
});})(nodes))
,cljs.core.flatten(cljs.core.cst$kw$adjacency.cljs$core$IFn$_invoke$arity$1(graph))));
var components = (strategy.core.estimate_connected_components.cljs$core$IFn$_invoke$arity$1 ? strategy.core.estimate_connected_components.cljs$core$IFn$_invoke$arity$1(graph) : strategy.core.estimate_connected_components.call(null,graph));
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$betti_DASH_0,components,cljs.core.cst$kw$betti_DASH_1,(function (){var x__4219__auto__ = (0);
var y__4220__auto__ = (((edges - cljs.core.count(nodes)) - components) - (-1));
return ((x__4219__auto__ > y__4220__auto__) ? x__4219__auto__ : y__4220__auto__);
})(),cljs.core.cst$kw$total_DASH_complexity,(edges + ((2) * components)),cljs.core.cst$kw$clustering_DASH_coefficient,(edges / (function (){var x__4219__auto__ = (1);
var y__4220__auto__ = (cljs.core.count(nodes) * (cljs.core.count(nodes) - (1)));
return ((x__4219__auto__ > y__4220__auto__) ? x__4219__auto__ : y__4220__auto__);
})())], null);
});
strategy.core.estimate_connected_components = (function strategy$core$estimate_connected_components(graph){
var x__4219__auto__ = (1);
var y__4220__auto__ = cljs.core.count(cljs.core.group_by(cljs.core.cst$kw$priority,cljs.core.cst$kw$nodes.cljs$core$IFn$_invoke$arity$1(graph)));
return ((x__4219__auto__ > y__4220__auto__) ? x__4219__auto__ : y__4220__auto__);
});
strategy.core.toggle_stream = (function strategy$core$toggle_stream(){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(strategy.core.app_state,cljs.core.update,cljs.core.cst$kw$stream_DASH_active,cljs.core.not);

if(cljs.core.truth_(cljs.core.cst$kw$stream_DASH_active.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(strategy.core.app_state)))){
strategy.core.add_notification("Stream mode activated",cljs.core.cst$kw$info);

setInterval(strategy.core.fetch_system_data,(3000));

return setInterval(strategy.core.analyze_project_topology,(10000));
} else {
return strategy.core.add_notification("Stream mode deactivated",cljs.core.cst$kw$info);
}
});
strategy.core.build_all = (function strategy$core$build_all(){
strategy.core.add_notification("Build triggered for all projects",cljs.core.cst$kw$info);

return setTimeout((function (){
strategy.core.fetch_system_data();

return strategy.core.add_notification("Build process completed",cljs.core.cst$kw$success);
}),(3000));
});
strategy.core.deploy_pending = (function strategy$core$deploy_pending(){
strategy.core.add_notification("Deployment started",cljs.core.cst$kw$info);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(strategy.core.app_state,cljs.core.update,cljs.core.cst$kw$projects,(function (projects){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (project){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(project),cljs.core.cst$kw$testing)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(project,cljs.core.cst$kw$status,cljs.core.cst$kw$deployed,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$progress,(100)], 0));
} else {
return project;
}
}),projects);
}));

return strategy.core.add_notification("Deployment completed",cljs.core.cst$kw$success);
});
strategy.core.health_check = (function strategy$core$health_check(){
strategy.core.add_notification("Health check running",cljs.core.cst$kw$info);

return strategy.core.fetch_system_data();
});
strategy.core.cascade_lifecycle = (function strategy$core$cascade_lifecycle(){
strategy.core.add_notification("Cascade lifecycle initiated",cljs.core.cst$kw$info);

return setTimeout((function (){
strategy.core.fetch_system_data();

if(cljs.core.truth_(cljs.core.cst$kw$stream_DASH_active.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(strategy.core.app_state)))){
} else {
strategy.core.toggle_stream();
}

return strategy.core.add_notification("Cascade completed",cljs.core.cst$kw$success);
}),(2000));
});
strategy.core.status_color = (function strategy$core$status_color(status){
var G__9227 = status;
var G__9227__$1 = (((G__9227 instanceof cljs.core.Keyword))?G__9227.fqn:null);
switch (G__9227__$1) {
case "deployed":
return "#4ade80";

break;
case "in-progress":
return "#007acc";

break;
case "testing":
return "#fbbf24";

break;
case "backlog":
return "#6b7280";

break;
case "needs-attention":
return "#f87171";

break;
default:
return "#666";

}
});
strategy.core.priority_color = (function strategy$core$priority_color(priority){
var G__9229 = priority;
var G__9229__$1 = (((G__9229 instanceof cljs.core.Keyword))?G__9229.fqn:null);
switch (G__9229__$1) {
case "high":
return "#f87171";

break;
case "medium":
return "#fbbf24";

break;
case "low":
return "#4ade80";

break;
default:
return "#666";

}
});
strategy.core.notification_component = (function strategy$core$notification_component(notification){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$notification,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$key,cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(notification),cljs.core.cst$kw$class,["notification-",cljs.core.name(cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(notification))].join(''),cljs.core.cst$kw$style,cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$animation,cljs.core.cst$kw$color,cljs.core.cst$kw$font_DASH_size,cljs.core.cst$kw$top,cljs.core.cst$kw$background,cljs.core.cst$kw$border_DASH_left,cljs.core.cst$kw$z_DASH_index,cljs.core.cst$kw$padding,cljs.core.cst$kw$right,cljs.core.cst$kw$position,cljs.core.cst$kw$border_DASH_radius],["slideIn 0.3s ease","#e0e0e0","12px","20px","#333",["3px solid ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__9232 = cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(notification);
var G__9232__$1 = (((G__9232 instanceof cljs.core.Keyword))?G__9232.fqn:null);
switch (G__9232__$1) {
case "error":
return "#f87171";

break;
case "success":
return "#4ade80";

break;
case "info":
return "#007acc";

break;
default:
return "#666";

}
})())].join(''),(1000),"12px 20px","20px","fixed","4px"])], null),cljs.core.cst$kw$message.cljs$core$IFn$_invoke$arity$1(notification)], null);
});
strategy.core.toolbar_component = (function strategy$core$toolbar_component(){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$toolbar,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$grid_DASH_column,"1 / -1",cljs.core.cst$kw$background,"#2a2a2a",cljs.core.cst$kw$display,"flex",cljs.core.cst$kw$align_DASH_items,"center",cljs.core.cst$kw$padding,"0 20px",cljs.core.cst$kw$border_DASH_bottom,"1px solid #444"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h1,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$color,"#fff",cljs.core.cst$kw$font_DASH_size,"16px",cljs.core.cst$kw$font_DASH_weight,"600"], null)], null),"Strategy"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$live_DASH_indicator,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$width,"8px",cljs.core.cst$kw$height,"8px",cljs.core.cst$kw$background,"#4ade80",cljs.core.cst$kw$border_DASH_radius,"50%",cljs.core.cst$kw$margin_DASH_left,"10px",cljs.core.cst$kw$animation,"pulse 2s infinite"], null)], null)], null),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$toolbar_DASH_actions,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$margin_DASH_left,"auto",cljs.core.cst$kw$display,"flex",cljs.core.cst$kw$gap,"10px"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$class,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$current_DASH_view.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(strategy.core.app_state)),cljs.core.cst$kw$kanban))?"active":null),cljs.core.cst$kw$on_DASH_click,(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(strategy.core.app_state,cljs.core.assoc,cljs.core.cst$kw$current_DASH_view,cljs.core.cst$kw$kanban);
})], null),"Kanban"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$class,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$current_DASH_view.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(strategy.core.app_state)),cljs.core.cst$kw$gantt))?"active":null),cljs.core.cst$kw$on_DASH_click,(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(strategy.core.app_state,cljs.core.assoc,cljs.core.cst$kw$current_DASH_view,cljs.core.cst$kw$gantt);
})], null),"Gantt"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$class,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$current_DASH_view.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(strategy.core.app_state)),cljs.core.cst$kw$network))?"active":null),cljs.core.cst$kw$on_DASH_click,(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(strategy.core.app_state,cljs.core.assoc,cljs.core.cst$kw$current_DASH_view,cljs.core.cst$kw$network);
})], null),"Network"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$class,(cljs.core.truth_(cljs.core.cst$kw$stream_DASH_active.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(strategy.core.app_state)))?"active":null),cljs.core.cst$kw$on_DASH_click,strategy.core.toggle_stream], null),(cljs.core.truth_(cljs.core.cst$kw$stream_DASH_active.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(strategy.core.app_state)))?"Stop":"Stream")], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,strategy.core.fetch_system_data], null),"Sync"], null)], null)], null);
});
strategy.core.project_item = (function strategy$core$project_item(project){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$project_DASH_item,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$key,cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(project),cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$background,"#333",cljs.core.cst$kw$padding,"12px",cljs.core.cst$kw$margin_DASH_bottom,"8px",cljs.core.cst$kw$border_DASH_radius,"4px",cljs.core.cst$kw$cursor,"move",cljs.core.cst$kw$border_DASH_left,["3px solid ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(strategy.core.priority_color(cljs.core.cst$kw$priority.cljs$core$IFn$_invoke$arity$1(project)))].join(''),cljs.core.cst$kw$transition,"all 0.2s"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$project_DASH_name,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$font_DASH_weight,"600",cljs.core.cst$kw$font_DASH_size,"13px",cljs.core.cst$kw$margin_DASH_bottom,"4px"], null)], null),cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(project)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$project_DASH_status,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$font_DASH_size,"11px",cljs.core.cst$kw$color,"#aaa"], null)], null),[cljs.core.name(cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(project))," \u2022 ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$progress.cljs$core$IFn$_invoke$arity$1(project)),"%"].join('')], null)], null);
});
strategy.core.sidebar_component = (function strategy$core$sidebar_component(){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$sidebar,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$background,"#252525",cljs.core.cst$kw$padding,"20px",cljs.core.cst$kw$overflow_DASH_y,"auto"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h2,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$color,"#fff",cljs.core.cst$kw$font_DASH_size,"14px",cljs.core.cst$kw$margin_DASH_bottom,"15px"], null)], null),"PROJECTS"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div_SHARP_project_DASH_list,(function (){var iter__4523__auto__ = (function strategy$core$sidebar_component_$_iter__9234(s__9235){
return (new cljs.core.LazySeq(null,(function (){
var s__9235__$1 = s__9235;
while(true){
var temp__5735__auto__ = cljs.core.seq(s__9235__$1);
if(temp__5735__auto__){
var s__9235__$2 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(s__9235__$2)){
var c__4521__auto__ = cljs.core.chunk_first(s__9235__$2);
var size__4522__auto__ = cljs.core.count(c__4521__auto__);
var b__9237 = cljs.core.chunk_buffer(size__4522__auto__);
if((function (){var i__9236 = (0);
while(true){
if((i__9236 < size__4522__auto__)){
var project = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__4521__auto__,i__9236);
cljs.core.chunk_append(b__9237,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [strategy.core.project_item,project], null));

var G__9238 = (i__9236 + (1));
i__9236 = G__9238;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__9237),strategy$core$sidebar_component_$_iter__9234(cljs.core.chunk_rest(s__9235__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__9237),null);
}
} else {
var project = cljs.core.first(s__9235__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [strategy.core.project_item,project], null),strategy$core$sidebar_component_$_iter__9234(cljs.core.rest(s__9235__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4523__auto__(cljs.core.cst$kw$projects.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(strategy.core.app_state)));
})()], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h2,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$color,"#fff",cljs.core.cst$kw$font_DASH_size,"14px",cljs.core.cst$kw$margin_DASH_bottom,"15px",cljs.core.cst$kw$margin_DASH_top,"30px"], null)], null),"ACTIONS"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$width,"100%",cljs.core.cst$kw$margin_DASH_bottom,"8px"], null),cljs.core.cst$kw$on_DASH_click,strategy.core.build_all], null),"BUILD"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$width,"100%",cljs.core.cst$kw$margin_DASH_bottom,"8px"], null),cljs.core.cst$kw$on_DASH_click,strategy.core.deploy_pending], null),"DEPLOY"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$width,"100%",cljs.core.cst$kw$margin_DASH_bottom,"8px"], null),cljs.core.cst$kw$on_DASH_click,strategy.core.health_check], null),"CHECK"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$width,"100%",cljs.core.cst$kw$margin_DASH_bottom,"8px"], null),cljs.core.cst$kw$on_DASH_click,(function (){
return window.open("http://graph.uprootiny.dev","_blank");
})], null),"GRAPH"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$width,"100%",cljs.core.cst$kw$margin_DASH_bottom,"8px"], null),cljs.core.cst$kw$on_DASH_click,strategy.core.analyze_project_topology], null),"TDA ANALYZE"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$width,"100%"], null),cljs.core.cst$kw$on_DASH_click,strategy.core.cascade_lifecycle], null),"CASCADE"], null)], null);
});
strategy.core.kanban_column = (function strategy$core$kanban_column(status,projects){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$kanban_DASH_column,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$background,"#252525",cljs.core.cst$kw$border_DASH_radius,"8px",cljs.core.cst$kw$padding,"15px",cljs.core.cst$kw$border,"2px solid transparent"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$kanban_DASH_header,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$font_DASH_weight,"600",cljs.core.cst$kw$font_DASH_size,"13px",cljs.core.cst$kw$margin_DASH_bottom,"15px",cljs.core.cst$kw$text_DASH_align,"center",cljs.core.cst$kw$color,"#fff"], null)], null),cljs.core.name(status)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$kanban_DASH_items,(function (){var iter__4523__auto__ = (function strategy$core$kanban_column_$_iter__9240(s__9241){
return (new cljs.core.LazySeq(null,(function (){
var s__9241__$1 = s__9241;
while(true){
var temp__5735__auto__ = cljs.core.seq(s__9241__$1);
if(temp__5735__auto__){
var s__9241__$2 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(s__9241__$2)){
var c__4521__auto__ = cljs.core.chunk_first(s__9241__$2);
var size__4522__auto__ = cljs.core.count(c__4521__auto__);
var b__9243 = cljs.core.chunk_buffer(size__4522__auto__);
if((function (){var i__9242 = (0);
while(true){
if((i__9242 < size__4522__auto__)){
var project = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__4521__auto__,i__9242);
cljs.core.chunk_append(b__9243,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$kanban_DASH_item,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$key,cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(project),cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$background,"#333",cljs.core.cst$kw$padding,"10px",cljs.core.cst$kw$margin_DASH_bottom,"8px",cljs.core.cst$kw$border_DASH_radius,"4px",cljs.core.cst$kw$cursor,"move",cljs.core.cst$kw$font_DASH_size,"12px",cljs.core.cst$kw$border_DASH_left,["3px solid ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(strategy.core.priority_color(cljs.core.cst$kw$priority.cljs$core$IFn$_invoke$arity$1(project)))].join('')], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$font_DASH_weight,"600",cljs.core.cst$kw$margin_DASH_bottom,"4px"], null)], null),cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(project)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$font_DASH_size,"11px",cljs.core.cst$kw$color,"#aaa"], null)], null),["Progress: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$progress.cljs$core$IFn$_invoke$arity$1(project)),"%"].join('')], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$width,"100%",cljs.core.cst$kw$height,"3px",cljs.core.cst$kw$background,"#444",cljs.core.cst$kw$border_DASH_radius,"1px",cljs.core.cst$kw$margin_DASH_top,"4px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$width,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$progress.cljs$core$IFn$_invoke$arity$1(project)),"%"].join(''),cljs.core.cst$kw$height,"100%",cljs.core.cst$kw$background,"#007acc",cljs.core.cst$kw$border_DASH_radius,"1px"], null)], null)], null)], null)], null));

var G__9244 = (i__9242 + (1));
i__9242 = G__9244;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__9243),strategy$core$kanban_column_$_iter__9240(cljs.core.chunk_rest(s__9241__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__9243),null);
}
} else {
var project = cljs.core.first(s__9241__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$kanban_DASH_item,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$key,cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(project),cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$background,"#333",cljs.core.cst$kw$padding,"10px",cljs.core.cst$kw$margin_DASH_bottom,"8px",cljs.core.cst$kw$border_DASH_radius,"4px",cljs.core.cst$kw$cursor,"move",cljs.core.cst$kw$font_DASH_size,"12px",cljs.core.cst$kw$border_DASH_left,["3px solid ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(strategy.core.priority_color(cljs.core.cst$kw$priority.cljs$core$IFn$_invoke$arity$1(project)))].join('')], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$font_DASH_weight,"600",cljs.core.cst$kw$margin_DASH_bottom,"4px"], null)], null),cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(project)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$font_DASH_size,"11px",cljs.core.cst$kw$color,"#aaa"], null)], null),["Progress: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$progress.cljs$core$IFn$_invoke$arity$1(project)),"%"].join('')], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$width,"100%",cljs.core.cst$kw$height,"3px",cljs.core.cst$kw$background,"#444",cljs.core.cst$kw$border_DASH_radius,"1px",cljs.core.cst$kw$margin_DASH_top,"4px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$width,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$progress.cljs$core$IFn$_invoke$arity$1(project)),"%"].join(''),cljs.core.cst$kw$height,"100%",cljs.core.cst$kw$background,"#007acc",cljs.core.cst$kw$border_DASH_radius,"1px"], null)], null)], null)], null)], null),strategy$core$kanban_column_$_iter__9240(cljs.core.rest(s__9241__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4523__auto__(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (iter__4523__auto__){
return (function (p1__9239_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(p1__9239_SHARP_),status);
});})(iter__4523__auto__))
,projects));
})()], null)], null);
});
strategy.core.kanban_view = (function strategy$core$kanban_view(){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$kanban_DASH_board,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$display,"grid",cljs.core.cst$kw$grid_DASH_template_DASH_columns,"repeat(5, 1fr)",cljs.core.cst$kw$gap,"15px",cljs.core.cst$kw$padding,"20px",cljs.core.cst$kw$height,"100%"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [strategy.core.kanban_column,cljs.core.cst$kw$backlog,cljs.core.cst$kw$projects.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(strategy.core.app_state))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [strategy.core.kanban_column,cljs.core.cst$kw$in_DASH_progress,cljs.core.cst$kw$projects.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(strategy.core.app_state))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [strategy.core.kanban_column,cljs.core.cst$kw$testing,cljs.core.cst$kw$projects.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(strategy.core.app_state))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [strategy.core.kanban_column,cljs.core.cst$kw$needs_DASH_attention,cljs.core.cst$kw$projects.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(strategy.core.app_state))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [strategy.core.kanban_column,cljs.core.cst$kw$deployed,cljs.core.cst$kw$projects.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(strategy.core.app_state))], null)], null);
});
strategy.core.gantt_view = (function strategy$core$gantt_view(){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$gantt_DASH_view,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$padding,"20px",cljs.core.cst$kw$color,"#e0e0e0"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"Gantt Chart View"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,"Interactive timeline visualization coming soon..."], null)], null);
});
strategy.core.network_view = (function strategy$core$network_view(){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$network_DASH_view,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$padding,"20px",cljs.core.cst$kw$color,"#e0e0e0"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"Network View"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,"Project dependency graph coming soon..."], null)], null);
});
strategy.core.main_view = (function strategy$core$main_view(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$main_DASH_view,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$background,"#1e1e1e",cljs.core.cst$kw$position,"relative",cljs.core.cst$kw$overflow,"hidden"], null)], null),(function (){var G__9245 = cljs.core.cst$kw$current_DASH_view.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(strategy.core.app_state));
var G__9245__$1 = (((G__9245 instanceof cljs.core.Keyword))?G__9245.fqn:null);
switch (G__9245__$1) {
case "kanban":
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [strategy.core.kanban_view], null);

break;
case "gantt":
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [strategy.core.gantt_view], null);

break;
case "network":
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [strategy.core.network_view], null);

break;
default:
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [strategy.core.kanban_view], null);

}
})()], null);
});
strategy.core.metrics_panel = (function strategy$core$metrics_panel(){
var projects = cljs.core.cst$kw$projects.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(strategy.core.app_state));
var total = cljs.core.count(projects);
var deployed = cljs.core.count(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (projects,total){
return (function (p1__9247_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(p1__9247_SHARP_),cljs.core.cst$kw$deployed);
});})(projects,total))
,projects));
var in_progress = cljs.core.count(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (projects,total,deployed){
return (function (p1__9248_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(p1__9248_SHARP_),cljs.core.cst$kw$in_DASH_progress);
});})(projects,total,deployed))
,projects));
var backlog = cljs.core.count(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (projects,total,deployed,in_progress){
return (function (p1__9249_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(p1__9249_SHARP_),cljs.core.cst$kw$backlog);
});})(projects,total,deployed,in_progress))
,projects));
var needs_attention = cljs.core.count(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (projects,total,deployed,in_progress,backlog){
return (function (p1__9250_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(p1__9250_SHARP_),cljs.core.cst$kw$needs_DASH_attention);
});})(projects,total,deployed,in_progress,backlog))
,projects));
var tda_analysis = cljs.core.cst$kw$tda_DASH_analysis.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(strategy.core.app_state));
return new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$metrics_DASH_panel,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$display,"grid",cljs.core.cst$kw$grid_DASH_template_DASH_columns,"repeat(auto-fit, minmax(100px, 1fr))",cljs.core.cst$kw$gap,"10px",cljs.core.cst$kw$padding,"15px",cljs.core.cst$kw$background,"#252525"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$metric,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$text_DASH_align,"center",cljs.core.cst$kw$padding,"10px",cljs.core.cst$kw$background,"#333",cljs.core.cst$kw$border_DASH_radius,"4px"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$metric_DASH_value,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$font_DASH_size,"20px",cljs.core.cst$kw$font_DASH_weight,"bold",cljs.core.cst$kw$color,"#007acc"], null)], null),total], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$metric_DASH_label,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$font_DASH_size,"11px",cljs.core.cst$kw$color,"#aaa",cljs.core.cst$kw$margin_DASH_top,"4px"], null)], null),"Total"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$metric,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$text_DASH_align,"center",cljs.core.cst$kw$padding,"10px",cljs.core.cst$kw$background,"#333",cljs.core.cst$kw$border_DASH_radius,"4px"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$metric_DASH_value,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$font_DASH_size,"20px",cljs.core.cst$kw$font_DASH_weight,"bold",cljs.core.cst$kw$color,"#4ade80"], null)], null),deployed], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$metric_DASH_label,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$font_DASH_size,"11px",cljs.core.cst$kw$color,"#aaa",cljs.core.cst$kw$margin_DASH_top,"4px"], null)], null),"Live"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$metric,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$text_DASH_align,"center",cljs.core.cst$kw$padding,"10px",cljs.core.cst$kw$background,"#333",cljs.core.cst$kw$border_DASH_radius,"4px"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$metric_DASH_value,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$font_DASH_size,"20px",cljs.core.cst$kw$font_DASH_weight,"bold",cljs.core.cst$kw$color,"#007acc"], null)], null),in_progress], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$metric_DASH_label,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$font_DASH_size,"11px",cljs.core.cst$kw$color,"#aaa",cljs.core.cst$kw$margin_DASH_top,"4px"], null)], null),"Active"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$metric,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$text_DASH_align,"center",cljs.core.cst$kw$padding,"10px",cljs.core.cst$kw$background,"#333",cljs.core.cst$kw$border_DASH_radius,"4px"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$metric_DASH_value,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$font_DASH_size,"20px",cljs.core.cst$kw$font_DASH_weight,"bold",cljs.core.cst$kw$color,"#f87171"], null)], null),needs_attention], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$metric_DASH_label,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$font_DASH_size,"11px",cljs.core.cst$kw$color,"#aaa",cljs.core.cst$kw$margin_DASH_top,"4px"], null)], null),"Issues"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$metric,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$text_DASH_align,"center",cljs.core.cst$kw$padding,"10px",cljs.core.cst$kw$background,"#333",cljs.core.cst$kw$border_DASH_radius,"4px"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$metric_DASH_value,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$font_DASH_size,"20px",cljs.core.cst$kw$font_DASH_weight,"bold",cljs.core.cst$kw$color,"#6b7280"], null)], null),backlog], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$metric_DASH_label,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$font_DASH_size,"11px",cljs.core.cst$kw$color,"#aaa",cljs.core.cst$kw$margin_DASH_top,"4px"], null)], null),"Queue"], null)], null),(cljs.core.truth_(tda_analysis)?new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$metric,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$text_DASH_align,"center",cljs.core.cst$kw$padding,"10px",cljs.core.cst$kw$background,"#333",cljs.core.cst$kw$border_DASH_radius,"4px"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$metric_DASH_value,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$font_DASH_size,"16px",cljs.core.cst$kw$font_DASH_weight,"bold",cljs.core.cst$kw$color,"#fbbf24"], null)], null),["\u03B2\u2080=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$betti_DASH_0.cljs$core$IFn$_invoke$arity$1(tda_analysis))].join('')], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$metric_DASH_label,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$font_DASH_size,"11px",cljs.core.cst$kw$color,"#aaa",cljs.core.cst$kw$margin_DASH_top,"4px"], null)], null),"TDA \u03B2\u2080"], null)], null):null),(cljs.core.truth_(tda_analysis)?new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$metric,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$text_DASH_align,"center",cljs.core.cst$kw$padding,"10px",cljs.core.cst$kw$background,"#333",cljs.core.cst$kw$border_DASH_radius,"4px"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$metric_DASH_value,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$font_DASH_size,"16px",cljs.core.cst$kw$font_DASH_weight,"bold",cljs.core.cst$kw$color,"#fbbf24"], null)], null),["\u03B2\u2081=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$betti_DASH_1.cljs$core$IFn$_invoke$arity$1(tda_analysis))].join('')], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$metric_DASH_label,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$font_DASH_size,"11px",cljs.core.cst$kw$color,"#aaa",cljs.core.cst$kw$margin_DASH_top,"4px"], null)], null),"TDA \u03B2\u2081"], null)], null):null)], null);
});
strategy.core.timeline_component = (function strategy$core$timeline_component(){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$timeline_DASH_container,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$background,"#252525",cljs.core.cst$kw$padding,"20px",cljs.core.cst$kw$overflow_DASH_y,"auto"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h2,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$margin_DASH_bottom,"15px",cljs.core.cst$kw$color,"#fff",cljs.core.cst$kw$font_DASH_size,"14px"], null)], null),"Recent Activity"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$timeline,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$timeline_DASH_item,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$display,"flex",cljs.core.cst$kw$align_DASH_items,"center",cljs.core.cst$kw$padding,"8px 0",cljs.core.cst$kw$border_DASH_bottom,"1px solid #333"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$timeline_DASH_time,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$width,"80px",cljs.core.cst$kw$font_DASH_size,"11px",cljs.core.cst$kw$color,"#888"], null)], null),strategy.core.format_time(strategy.core.now())], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$timeline_DASH_event,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$flex,"1",cljs.core.cst$kw$font_DASH_size,"12px"], null)], null),"System synchronized"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$timeline_DASH_status,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$width,"60px",cljs.core.cst$kw$text_DASH_align,"right",cljs.core.cst$kw$font_DASH_size,"11px",cljs.core.cst$kw$color,"#4ade80"], null)], null),"success"], null)], null)], null)], null);
});
strategy.core.app = (function strategy$core$app(){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$margin,"0",cljs.core.cst$kw$padding,"0",cljs.core.cst$kw$box_DASH_sizing,"border-box"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$style,"\n    * { margin: 0; padding: 0; box-sizing: border-box; }\n    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #1a1a1a; color: #e0e0e0; overflow: hidden; }\n    .btn { background: #444; color: #e0e0e0; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 12px; transition: background 0.2s; }\n    .btn:hover { background: #555; }\n    .btn.active { background: #007acc; }\n    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }\n    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }\n   "], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$notifications,(function (){var iter__4523__auto__ = (function strategy$core$app_$_iter__9251(s__9252){
return (new cljs.core.LazySeq(null,(function (){
var s__9252__$1 = s__9252;
while(true){
var temp__5735__auto__ = cljs.core.seq(s__9252__$1);
if(temp__5735__auto__){
var s__9252__$2 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(s__9252__$2)){
var c__4521__auto__ = cljs.core.chunk_first(s__9252__$2);
var size__4522__auto__ = cljs.core.count(c__4521__auto__);
var b__9254 = cljs.core.chunk_buffer(size__4522__auto__);
if((function (){var i__9253 = (0);
while(true){
if((i__9253 < size__4522__auto__)){
var notification = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__4521__auto__,i__9253);
cljs.core.chunk_append(b__9254,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [strategy.core.notification_component,notification], null));

var G__9255 = (i__9253 + (1));
i__9253 = G__9255;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__9254),strategy$core$app_$_iter__9251(cljs.core.chunk_rest(s__9252__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__9254),null);
}
} else {
var notification = cljs.core.first(s__9252__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [strategy.core.notification_component,notification], null),strategy$core$app_$_iter__9251(cljs.core.rest(s__9252__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4523__auto__(cljs.core.cst$kw$notifications.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(strategy.core.app_state)));
})()], null),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$app_DASH_grid,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$display,"grid",cljs.core.cst$kw$grid_DASH_template_DASH_columns,"300px 1fr 300px",cljs.core.cst$kw$grid_DASH_template_DASH_rows,"50px 1fr 200px",cljs.core.cst$kw$height,"100vh",cljs.core.cst$kw$gap,"1px",cljs.core.cst$kw$background,"#333"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [strategy.core.toolbar_component], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [strategy.core.sidebar_component], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [strategy.core.main_view], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [strategy.core.metrics_panel], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [strategy.core.timeline_component], null)], null)], null);
});
strategy.core.mount_root = (function strategy$core$mount_root(){
return reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [strategy.core.app], null),document.getElementById("app"));
});
strategy.core.init = (function strategy$core$init(){
strategy.core.mount_root();

return strategy.core.fetch_system_data();
});
strategy.core.on_js_reload = (function strategy$core$on_js_reload(){
return strategy.core.mount_root();
});
strategy.core.init();
