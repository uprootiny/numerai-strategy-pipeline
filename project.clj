(defproject strategy-dashboard "0.1.0"
  :description "Reactive strategy dashboard with ClojureScript"
  :dependencies [[org.clojure/clojure "1.10.1"]
                 [org.clojure/clojurescript "1.10.520"]
                 [reagent "0.10.0"]
                 [re-frame "1.2.0"]
                 [hiccup "1.0.5"]
                 [cljs-ajax "0.8.4"]
                 [bidi "2.1.6"]
                 [day8.re-frame/http-fx "0.2.4"]
                 [com.andrewmcveigh/cljs-time "0.5.2"]]
  
  :plugins [[lein-cljsbuild "1.1.8"]
            [lein-figwheel "0.5.20"]]
  
  :clean-targets ^{:protect false} ["resources/public/js/compiled"
                                    "target"]
  
  :figwheel {:css-dirs ["resources/public/css"]}
  
  :cljsbuild {:builds
              [{:id "dev"
                :source-paths ["src"]
                :figwheel {:on-jsload "strategy.core/on-js-reload"}
                :compiler {:main strategy.core
                           :asset-path "js/compiled/out"
                           :output-to "resources/public/js/compiled/strategy.js"
                           :output-dir "resources/public/js/compiled/out"
                           :source-map-timestamp true
                           :preloads [devtools.preload]}}
               
               {:id "min"
                :source-paths ["src"]
                :compiler {:main strategy.core
                           :output-to "resources/public/js/compiled/strategy.js"
                           :optimizations :advanced
                           :pretty-print false}}]}
  
  :profiles {:dev {:dependencies [[binaryage/devtools "1.0.7"]
                                  [figwheel-sidecar "0.5.20"]
                                  [cider/piggieback "0.5.3"]]
                   :source-paths ["src" "dev"]
                   :repl-options {:nrepl-middleware [cider.piggieback/wrap-cljs-repl]}}})