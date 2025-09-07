#!/usr/bin/env bb

(ns claude-router.main
  (:require [babashka.json :as json]
            [babashka.fs :as fs]
            [babashka.process :as process]
            [clojure.string :as str]
            [clojure.java.io :as io]
            [org.httpkit.server :as server]))

;; === Financial Vessels Vision Alignment ===
;; The gap between current Claude router and financial vessels vision:
;;
;; CURRENT STATE: Project context switching with technical focus
;; VISION STATE: Strategic financial optimization across revenue streams
;;
;; GAP ANALYSIS:
;; - Technical routing ✅ (implemented)
;; - Financial vessel mapping ✅ (partially implemented)  
;; - Revenue stream optimization ❌ (missing)
;; - Strategic value calculation ❌ (missing)
;; - Cross-vessel synergy detection ❌ (missing)
;; - Attention flow optimization ❌ (missing - key for Predict-O-Matic parable)

(def financial-vessels
  "Financial vessels configuration - mapping projects to strategic value"
  {:numerai {:vessel-type :ml-prediction-engine
             :revenue-stream :tournament-winnings
             :strategic-value 0.85
             :attention-multiplier 3.2
             :synergies [:pythia :backtesting]
             :path "/var/www/strategy.uprootiny.dev/numerai-pipeline"}
   
   :pythia {:vessel-type :trading-analysis-platform  
            :revenue-stream :strategy-optimization
            :strategic-value 0.90
            :attention-multiplier 2.8
            :synergies [:numerai :rust :haskell]
            :path "/tmp/pythia-demo"}
   
   :backtesting {:vessel-type :strategy-validation-engine
                 :revenue-stream :risk-assessment
                 :strategic-value 0.75
                 :attention-multiplier 2.1
                 :synergies [:numerai :pythia :phoenix]
                 :path "/var/www/elixir-backtesting-engine.uprootiny.dev"}
   
   :phoenix {:vessel-type :real-time-interface
             :revenue-stream :user-engagement
             :strategic-value 0.65
             :attention-multiplier 1.8
             :synergies [:backtesting :docs]
             :path "/var/www/phoenix-live"}
   
   :rust {:vessel-type :performance-optimization
          :revenue-stream :efficiency-gains
          :strategic-value 0.70
          :attention-multiplier 2.5
          :synergies [:numerai :pythia]
          :path "/var/www/performance-monitor-rs"}
   
   :haskell {:vessel-type :mathematical-modeling
             :revenue-stream :advanced-algorithms
             :strategic-value 0.80
             :attention-multiplier 2.3
             :synergies [:numerai :pythia :rust]
             :path "/var/www/repositories/numerai-haskell-tournament"}})

(defn calculate-vessel-portfolio-value
  "Calculate total portfolio value with synergy multipliers"
  [active-vessels]
  (let [base-values (map #(get-in financial-vessels [% :strategic-value]) active-vessels)
        synergy-bonus (/ (count (distinct (mapcat #(get-in financial-vessels [% :synergies]) active-vessels)))
                        10.0)]
    (+ (reduce + base-values) synergy-bonus)))

(defn detect-optimal-context
  "Detect optimal context based on file/content and strategic value"
  [file-path content-hint]
  (let [;; Simple pattern matching for demo
        context-scores 
        (cond
          (str/includes? file-path "numerai") {:context :numerai :confidence 0.95}
          (str/includes? file-path "pythia") {:context :pythia :confidence 0.90}
          (str/includes? file-path ".py") {:context :numerai :confidence 0.70}
          (str/includes? file-path ".ex") {:context :phoenix :confidence 0.85}
          (str/includes? file-path ".hs") {:context :haskell :confidence 0.90}
          (str/includes? file-path ".rs") {:context :rust :confidence 0.90}
          :else {:context :numerai :confidence 0.50})]
    
    ;; Apply strategic value weighting
    (update context-scores :confidence 
            #(* % (get-in financial-vessels [(:context context-scores) :strategic-value])))))

(defn switch-vessel-context
  "Switch to financial vessel context with strategic optimization"
  [vessel-key]
  (when-let [vessel (get financial-vessels vessel-key)]
    (let [switch-cmd ["bash" "../.claude/claude_router.sh" "switch" (name vessel-key)]
          result (process/shell {:out :string :err :string} switch-cmd)]
      
      (if (zero? (:exit result))
        {:success true
         :vessel vessel-key
         :vessel-type (:vessel-type vessel)
         :strategic-value (:strategic-value vessel)
         :attention-multiplier (:attention-multiplier vessel)
         :synergies (:synergies vessel)
         :output (:out result)}
        {:success false
         :error (:err result)}))))

(defn get-financial-vessels-status
  "Get comprehensive financial vessels strategic overview"
  []
  (let [active-vessels (keys financial-vessels)
        portfolio-value (calculate-vessel-portfolio-value active-vessels)
        total-attention (reduce + (map #(get-in financial-vessels [% :attention-multiplier]) active-vessels))
        
        ;; Group by vessel type for strategic analysis
        vessel-types (group-by #(get-in financial-vessels [% :vessel-type]) active-vessels)
        
        ;; Calculate cross-vessel synergies
        all-synergies (distinct (mapcat #(get-in financial-vessels [% :synergies]) active-vessels))
        synergy-network-density (/ (count all-synergies) (count active-vessels))]
    
    {:portfolio-value portfolio-value
     :total-attention-capacity total-attention
     :vessel-types vessel-types
     :synergy-network-density synergy-network-density
     :strategic-recommendation 
     (cond 
       (> portfolio-value 4.0) "OPTIMIZE: Focus on highest-value vessels"
       (> portfolio-value 2.5) "EXPAND: Add complementary vessels" 
       :else "BUILD: Strengthen core vessel capabilities")
     
     :attention-flow-optimization
     {:primary-attention-sink (apply max-key #(get-in financial-vessels [% :attention-multiplier]) active-vessels)
      :underutilized-vessels (filter #(< (get-in financial-vessels [% :attention-multiplier]) 2.0) active-vessels)
      :synergy-opportunities all-synergies}
     
     :predict-o-matic-alignment
     {:current-state "Technical routing with financial mapping"
      :vision-state "Strategic attention flow optimization"
      :alignment-score (/ portfolio-value 6.0) ;; Normalized to max possible
      :next-phase "Implement attention flow dynamics and value stream optimization"}}))

;; === HTTP API Endpoints ===

(defn api-projects [_request]
  {:status 200
   :headers {"content-type" "application/json"
             "access-control-allow-origin" "*"}
   :body (json/encode financial-vessels)})

(defn api-switch-context [request]
  (let [vessel-key (keyword (get-in request [:path-params :vessel]))
        result (switch-vessel-context vessel-key)]
    {:status (if (:success result) 200 500)
     :headers {"content-type" "application/json"
               "access-control-allow-origin" "*"}
     :body (json/encode result)}))

(defn api-vessels-status [_request]
  {:status 200
   :headers {"content-type" "application/json"
             "access-control-allow-origin" "*"}
   :body (json/encode (get-financial-vessels-status))})

(defn api-detect-context [request]
  (let [params (:query-params request)
        file-path (get params "path" "")
        content-hint (get params "content" "")
        detection-result (detect-optimal-context file-path content-hint)]
    {:status 200
     :headers {"content-type" "application/json"
               "access-control-allow-origin" "*"}
     :body (json/encode detection-result)}))

(defn serve-static [request]
  (let [path (str/replace (:uri request) #"^/" "")
        file-path (if (empty? path) "index.html" path)]
    (if (fs/exists? file-path)
      {:status 200
       :headers {"content-type" (cond
                                  (str/ends-with? file-path ".html") "text/html"
                                  (str/ends-with? file-path ".css") "text/css"
                                  (str/ends-with? file-path ".js") "application/javascript"
                                  :else "text/plain")}
       :body (slurp file-path)}
      {:status 404 :body "Not found"})))

(defn handler [request]
  (let [uri (:uri request)]
    (cond
      (= uri "/api/projects") (api-projects request)
      (str/starts-with? uri "/api/switch-context/") (api-switch-context request)
      (= uri "/api/vessels-status") (api-vessels-status request)
      (= uri "/api/detect-context") (api-detect-context request)
      :else (serve-static request))))

;; === Main Entry Point ===

(defn -main [& _args]
  (println "🌐 Claude Router (Babashka) - Financial Vessels Edition")
  (println "📊 Portfolio Value:" (calculate-vessel-portfolio-value (keys financial-vessels)))
  (println "🎯 Predict-O-Matic Alignment:" 
           (get-in (get-financial-vessels-status) [:predict-o-matic-alignment :alignment-score]))
  
  (println "\n🚀 Starting server on port 8889...")
  
  (http/exec 
   {:port 8889
    :host "0.0.0.0" 
    :handler handler}))

;; Run if called directly
(when (= *file* (System/getProperty "babashka.file"))
  (-main))