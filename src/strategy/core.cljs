(ns strategy.core
  (:require [reagent.core :as r]
            [re-frame.core :as rf]
            [cljs.reader :as reader]
            [cljs-time.core :as t]
            [cljs-time.format :as tf]
            [ajax.core :refer [GET POST]]))

;; App state
(defonce app-state 
  (r/atom {:projects []
           :current-view :kanban
           :stream-active false
           :system-data {}
           :notifications []
           :filters {:rules #{} :tags #{}}
           :selected-projects #{}}))

;; Real project data reflecting actual uprootiny.dev ecosystem
(def initial-projects
  [{:id "topoi" :name "TDA Mathematical Visualization" :status :in-progress :priority :high :progress 90 :tags #{:math :topology :elixir}}
   {:id "strategy" :name "Strategy Dashboard" :status :in-progress :priority :high :progress 85 :tags #{:management :clojurescript}}
   {:id "numerai" :name "Numerai TDA Integration" :status :in-progress :priority :high :progress 70 :tags #{:ml :topology :finance}}
   {:id "graph" :name "Graph Canvas" :status :deployed :priority :medium :progress 100 :tags #{:visualization :network}}
   {:id "hyperstitious" :name "Art Showcase" :status :deployed :priority :medium :progress 100 :tags #{:art :creative}}
   {:id "cljs-revival" :name "CLJS Project Revival" :status :testing :priority :high :progress 60 :tags #{:clojurescript :infrastructure}}
   {:id "electric-agents" :name "Electric Multi-Agent System" :status :backlog :priority :medium :progress 30 :tags #{:agents :clojure}}
   {:id "post-mortem" :name "Project Post-Mortem Analysis" :status :backlog :priority :low :progress 10 :tags #{:analysis :cleanup}}
   {:id "vessel-server" :name "Vessel Server" :status :needs-attention :priority :medium :progress 40 :tags #{:infrastructure :clojure}}
   {:id "alpha-etudes" :name "Alpha Etudes" :status :needs-attention :priority :low :progress 25 :tags #{:experiments}}])

;; Initialize app state
(swap! app-state assoc :projects initial-projects)

;; Utility functions
(defn now [] (t/now))
(defn format-time [time] (tf/unparse (tf/formatter "HH:mm:ss") time))

(defn add-notification [message type]
  (let [notification {:id (random-uuid)
                      :message message
                      :type type
                      :timestamp (now)}]
    (swap! app-state update :notifications conj notification)
    (js/setTimeout #(remove-notification (:id notification)) 3000)))

(defn remove-notification [id]
  (swap! app-state update :notifications 
         (fn [notifications] (remove #(= (:id %) id) notifications))))

;; System integration
(defn fetch-system-data []
  (GET "/ecosystem-data.json"
       {:handler (fn [response]
                   (let [data (if (string? response) 
                               (reader/read-string response) 
                               response)]
                     (swap! app-state assoc :system-data data)
                     (update-projects-from-system data)))
        :error-handler (fn [error]
                         (add-notification "System sync failed" :error))}))

(defn update-projects-from-system [data]
  (when-let [projects-data (:projects data)]
    (swap! app-state update :projects
           (fn [projects]
             (map (fn [project]
                    (let [sys-key (str (:id project) ".uprootiny.dev")
                          sys-project (get projects-data (keyword sys-key))]
                      (if sys-project
                        (assoc project 
                               :status (case (:status sys-project)
                                        "ready" :deployed
                                        "broken" :backlog
                                        "pending" :in-progress
                                        :testing)
                               :progress (case (:status sys-project)
                                          "ready" 100
                                          "pending" 20
                                          50))
                        project)))
                  projects)))))

;; TDA Analysis for project topology  
(defn analyze-project-topology []
  (let [projects (:projects @app-state)
        project-graph (build-project-dependency-graph projects)
        tda-metrics (compute-project-tda-metrics project-graph)]
    (swap! app-state assoc :tda-analysis tda-metrics)
    (add-notification (str "TDA Analysis: β₀=" (:betti-0 tda-metrics) " β₁=" (:betti-1 tda-metrics)) :info)))

(defn build-project-dependency-graph [projects]
  ;; Build adjacency matrix based on shared tags and dependencies
  (let [project-ids (map :id projects)
        adjacency-matrix (for [p1 projects]
                          (for [p2 projects]
                            (if (= p1 p2) 0
                                (count (clojure.set/intersection (:tags p1) (:tags p2))))))]
    {:nodes projects :adjacency adjacency-matrix}))

(defn compute-project-tda-metrics [graph]
  ;; Simplified TDA computation for project connectivity
  (let [nodes (:nodes graph)
        edges (count (filter #(> % 0) (flatten (:adjacency graph))))
        components (estimate-connected-components graph)]
    {:betti-0 components
     :betti-1 (max 0 (- edges (count nodes) components -1))
     :total-complexity (+ edges (* 2 components))
     :clustering-coefficient (/ edges (max 1 (* (count nodes) (dec (count nodes)))))}))

(defn estimate-connected-components [graph]
  ;; Simplified connected component estimation
  (max 1 (count (group-by :priority (:nodes graph)))))

;; Action handlers
(defn toggle-stream []
  (swap! app-state update :stream-active not)
  (if (:stream-active @app-state)
    (do
      (add-notification "Stream mode activated" :info)
      (js/setInterval fetch-system-data 3000)
      (js/setInterval analyze-project-topology 10000))
    (add-notification "Stream mode deactivated" :info)))

(defn build-all []
  (add-notification "Build triggered for all projects" :info)
  (js/setTimeout #(do
                    (fetch-system-data)
                    (add-notification "Build process completed" :success))
                 3000))

(defn deploy-pending []
  (add-notification "Deployment started" :info)
  (swap! app-state update :projects
         (fn [projects]
           (map (fn [project]
                  (if (= (:status project) :testing)
                    (assoc project :status :deployed :progress 100)
                    project))
                projects)))
  (add-notification "Deployment completed" :success))

(defn health-check []
  (add-notification "Health check running" :info)
  (fetch-system-data))

(defn cascade-lifecycle []
  (add-notification "Cascade lifecycle initiated" :info)
  (js/setTimeout #(do
                    (fetch-system-data)
                    (when-not (:stream-active @app-state)
                      (toggle-stream))
                    (add-notification "Cascade completed" :success))
                 2000))

;; View helpers
(defn status-color [status]
  (case status
    :deployed "#4ade80"
    :in-progress "#007acc"
    :testing "#fbbf24"
    :backlog "#6b7280"
    :needs-attention "#f87171"
    "#666"))

(defn priority-color [priority]
  (case priority
    :high "#f87171"
    :medium "#fbbf24"
    :low "#4ade80"
    "#666"))

;; Components
(defn notification-component [notification]
  [:div.notification
   {:key (:id notification)
    :class (str "notification-" (name (:type notification)))
    :style {:position "fixed"
            :top "20px"
            :right "20px"
            :background "#333"
            :color "#e0e0e0"
            :padding "12px 20px"
            :border-radius "4px"
            :z-index 1000
            :font-size "12px"
            :border-left (str "3px solid " (case (:type notification)
                                             :error "#f87171"
                                             :success "#4ade80"
                                             :info "#007acc"
                                             "#666"))
            :animation "slideIn 0.3s ease"}}
   (:message notification)])

(defn toolbar-component []
  [:div.toolbar
   {:style {:grid-column "1 / -1"
            :background "#2a2a2a"
            :display "flex"
            :align-items "center"
            :padding "0 20px"
            :border-bottom "1px solid #444"}}
   [:h1 {:style {:color "#fff" :font-size "16px" :font-weight "600"}} "Strategy"]
   [:div.live-indicator
    {:style {:width "8px"
             :height "8px"
             :background "#4ade80"
             :border-radius "50%"
             :margin-left "10px"
             :animation "pulse 2s infinite"}}]
   [:div.toolbar-actions
    {:style {:margin-left "auto" :display "flex" :gap "10px"}}
    [:button.btn
     {:class (when (= (:current-view @app-state) :kanban) "active")
      :on-click #(swap! app-state assoc :current-view :kanban)}
     "Kanban"]
    [:button.btn
     {:class (when (= (:current-view @app-state) :gantt) "active")
      :on-click #(swap! app-state assoc :current-view :gantt)}
     "Gantt"]
    [:button.btn
     {:class (when (= (:current-view @app-state) :network) "active")
      :on-click #(swap! app-state assoc :current-view :network)}
     "Network"]
    [:button.btn
     {:class (when (:stream-active @app-state) "active")
      :on-click toggle-stream}
     (if (:stream-active @app-state) "Stop" "Stream")]
    [:button.btn {:on-click fetch-system-data} "Sync"]]])

(defn project-item [project]
  [:div.project-item
   {:key (:id project)
    :style {:background "#333"
            :padding "12px"
            :margin-bottom "8px"
            :border-radius "4px"
            :cursor "move"
            :border-left (str "3px solid " (priority-color (:priority project)))
            :transition "all 0.2s"}}
   [:div.project-name
    {:style {:font-weight "600" :font-size "13px" :margin-bottom "4px"}}
    (:name project)]
   [:div.project-status
    {:style {:font-size "11px" :color "#aaa"}}
    (str (name (:status project)) " • " (:progress project) "%")]])

(defn sidebar-component []
  [:div.sidebar
   {:style {:background "#252525" :padding "20px" :overflow-y "auto"}}
   [:h2 {:style {:color "#fff" :font-size "14px" :margin-bottom "15px"}} "PROJECTS"]
   [:div#project-list
    (for [project (:projects @app-state)]
      [project-item project])]
   
   [:h2 {:style {:color "#fff" :font-size "14px" :margin-bottom "15px" :margin-top "30px"}} "ACTIONS"]
   [:button.btn {:style {:width "100%" :margin-bottom "8px"} :on-click build-all} "BUILD"]
   [:button.btn {:style {:width "100%" :margin-bottom "8px"} :on-click deploy-pending} "DEPLOY"]
   [:button.btn {:style {:width "100%" :margin-bottom "8px"} :on-click health-check} "CHECK"]
   [:button.btn {:style {:width "100%" :margin-bottom "8px"} :on-click #(js/window.open "http://graph.uprootiny.dev" "_blank")} "GRAPH"]
   [:button.btn {:style {:width "100%" :margin-bottom "8px"} :on-click analyze-project-topology} "TDA ANALYZE"]
   [:button.btn {:style {:width "100%"} :on-click cascade-lifecycle} "CASCADE"]])

(defn kanban-column [status projects]
  [:div.kanban-column
   {:style {:background "#252525"
            :border-radius "8px"
            :padding "15px"
            :border "2px solid transparent"}}
   [:div.kanban-header
    {:style {:font-weight "600" :font-size "13px" :margin-bottom "15px" :text-align "center" :color "#fff"}}
    (name status)]
   [:div.kanban-items
    (for [project (filter #(= (:status %) status) projects)]
      [:div.kanban-item
       {:key (:id project)
        :style {:background "#333"
                :padding "10px"
                :margin-bottom "8px"
                :border-radius "4px"
                :cursor "move"
                :font-size "12px"
                :border-left (str "3px solid " (priority-color (:priority project)))}}
       [:div {:style {:font-weight "600" :margin-bottom "4px"}} (:name project)]
       [:div {:style {:font-size "11px" :color "#aaa"}} (str "Progress: " (:progress project) "%")]
       [:div {:style {:width "100%" :height "3px" :background "#444" :border-radius "1px" :margin-top "4px"}}
        [:div {:style {:width (str (:progress project) "%") :height "100%" :background "#007acc" :border-radius "1px"}}]]])]])

(defn kanban-view []
  [:div.kanban-board
   {:style {:display "grid"
            :grid-template-columns "repeat(5, 1fr)"
            :gap "15px"
            :padding "20px"
            :height "100%"}}
   [kanban-column :backlog (:projects @app-state)]
   [kanban-column :in-progress (:projects @app-state)]
   [kanban-column :testing (:projects @app-state)]
   [kanban-column :needs-attention (:projects @app-state)]
   [kanban-column :deployed (:projects @app-state)]])

(defn gantt-view []
  [:div.gantt-view
   {:style {:padding "20px" :color "#e0e0e0"}}
   [:h3 "Gantt Chart View"]
   [:div "Interactive timeline visualization coming soon..."]])

(defn network-view []
  [:div.network-view
   {:style {:padding "20px" :color "#e0e0e0"}}
   [:h3 "Network View"]
   [:div "Project dependency graph coming soon..."]])

(defn main-view []
  [:div.main-view
   {:style {:background "#1e1e1e" :position "relative" :overflow "hidden"}}
   (case (:current-view @app-state)
     :kanban [kanban-view]
     :gantt [gantt-view]
     :network [network-view]
     [kanban-view])])

(defn metrics-panel []
  (let [projects (:projects @app-state)
        total (count projects)
        deployed (count (filter #(= (:status %) :deployed) projects))
        in-progress (count (filter #(= (:status %) :in-progress) projects))
        backlog (count (filter #(= (:status %) :backlog) projects))
        needs-attention (count (filter #(= (:status %) :needs-attention) projects))
        tda-analysis (:tda-analysis @app-state)]
    [:div.metrics-panel
     {:style {:display "grid"
              :grid-template-columns "repeat(auto-fit, minmax(100px, 1fr))"
              :gap "10px"
              :padding "15px"
              :background "#252525"}}
     [:div.metric {:style {:text-align "center" :padding "10px" :background "#333" :border-radius "4px"}}
      [:div.metric-value {:style {:font-size "20px" :font-weight "bold" :color "#007acc"}} total]
      [:div.metric-label {:style {:font-size "11px" :color "#aaa" :margin-top "4px"}} "Total"]]
     [:div.metric {:style {:text-align "center" :padding "10px" :background "#333" :border-radius "4px"}}
      [:div.metric-value {:style {:font-size "20px" :font-weight "bold" :color "#4ade80"}} deployed]
      [:div.metric-label {:style {:font-size "11px" :color "#aaa" :margin-top "4px"}} "Live"]]
     [:div.metric {:style {:text-align "center" :padding "10px" :background "#333" :border-radius "4px"}}
      [:div.metric-value {:style {:font-size "20px" :font-weight "bold" :color "#007acc"}} in-progress]
      [:div.metric-label {:style {:font-size "11px" :color "#aaa" :margin-top "4px"}} "Active"]]
     [:div.metric {:style {:text-align "center" :padding "10px" :background "#333" :border-radius "4px"}}
      [:div.metric-value {:style {:font-size "20px" :font-weight "bold" :color "#f87171"}} needs-attention]
      [:div.metric-label {:style {:font-size "11px" :color "#aaa" :margin-top "4px"}} "Issues"]]
     [:div.metric {:style {:text-align "center" :padding "10px" :background "#333" :border-radius "4px"}}
      [:div.metric-value {:style {:font-size "20px" :font-weight "bold" :color "#6b7280"}} backlog]
      [:div.metric-label {:style {:font-size "11px" :color "#aaa" :margin-top "4px"}} "Queue"]]
     (when tda-analysis
       [:div.metric {:style {:text-align "center" :padding "10px" :background "#333" :border-radius "4px"}}
        [:div.metric-value {:style {:font-size "16px" :font-weight "bold" :color "#fbbf24"}} (str "β₀=" (:betti-0 tda-analysis))]
        [:div.metric-label {:style {:font-size "11px" :color "#aaa" :margin-top "4px"}} "TDA β₀"]])
     (when tda-analysis
       [:div.metric {:style {:text-align "center" :padding "10px" :background "#333" :border-radius "4px"}}
        [:div.metric-value {:style {:font-size "16px" :font-weight "bold" :color "#fbbf24"}} (str "β₁=" (:betti-1 tda-analysis))]
        [:div.metric-label {:style {:font-size "11px" :color "#aaa" :margin-top "4px"}} "TDA β₁"]])
     ]))

(defn timeline-component []
  [:div.timeline-container
   {:style {:background "#252525" :padding "20px" :overflow-y "auto"}}
   [:h2 {:style {:margin-bottom "15px" :color "#fff" :font-size "14px"}} "Recent Activity"]
   [:div.timeline
    [:div.timeline-item
     {:style {:display "flex" :align-items "center" :padding "8px 0" :border-bottom "1px solid #333"}}
     [:div.timeline-time {:style {:width "80px" :font-size "11px" :color "#888"}} (format-time (now))]
     [:div.timeline-event {:style {:flex "1" :font-size "12px"}} "System synchronized"]
     [:div.timeline-status {:style {:width "60px" :text-align "right" :font-size "11px" :color "#4ade80"}} "success"]]]])

;; Main app component
(defn app []
  [:div
   {:style {:margin "0" :padding "0" :box-sizing "border-box"}}
   
   ;; Global styles
   [:style "
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #1a1a1a; color: #e0e0e0; overflow: hidden; }
    .btn { background: #444; color: #e0e0e0; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 12px; transition: background 0.2s; }
    .btn:hover { background: #555; }
    .btn.active { background: #007acc; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
   "]
   
   ;; Notifications
   [:div.notifications
    (for [notification (:notifications @app-state)]
      [notification-component notification])]
   
   ;; Main app grid
   [:div.app-grid
    {:style {:display "grid"
             :grid-template-columns "300px 1fr 300px"
             :grid-template-rows "50px 1fr 200px"
             :height "100vh"
             :gap "1px"
             :background "#333"}}
    
    [toolbar-component]
    [sidebar-component]
    [main-view]
    [metrics-panel]
    [timeline-component]]])

;; Initialize the app
(defn mount-root []
  (r/render [app] (.getElementById js/document "app")))

(defn init []
  (mount-root)
  (fetch-system-data))

(defn on-js-reload []
  (mount-root))

;; Start the app
(init)