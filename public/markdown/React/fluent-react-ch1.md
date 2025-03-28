## 前言

這列文章是一邊閱讀《流暢的 React : 建構快速、高效、直覺的 Web 應用程式》，一邊做的筆記摘要。\
這本書比較適合用來了解 React 工作原理，而不是學習如何使用 React。由於主要是寫給自己看的筆記，所以會比較精簡，也會省略一些細節說明。

## 什麼是 MVC, MVVM？

### MVC 模式（Model-View-Controller）

MVC 是一種設計哲學，將應用程式分為三部分：Model, View, Controller。\
關鍵概念是解耦，讓 Model、View 和 Controller 各自專注於不同的職責。

**- Model:**

負責處理資料與業務邏輯。Model 不認識 View 和 Controller，可確保業務邏輯與 UI 隔離。

**- View:**

負責顯示 UI，將 Model 的數據呈現給使用者，並將使用者命令傳送給 Controller。\
 View 是被動的，也就是說，它會等等 Model 提供資料，不直接取得與保存資料；View 也不處理使用者互動，而是這項工作委託給 Controller。

**- Controller:**

Controller 是 Model 和 View 之間的介面。它處理從 View 接收的使用者輸入，處理它（可能更新 Model），並將輸出顯示至 View。

### MVVM 模式（Model-View-ViewModel）

MVVM 是傳統 MVC 模式的進化版，特別針對現代 UI 開發量身設計。

核心特性是數據綁定，它使得 Model 中的數據可以自動反映在 View 中，且用戶對 View 的操作可以自動更新 Model 中的數據。

**- Model:**

- 代表應用程式的資料和業務邏輯
- 負責提取、儲存、處理資料
- 與數據庫、API或其他外部資料來源進行溝通
- 不關心 UI

**- View:**

- 代表 UI
- 顯示 Model 中的數據並響應用戶的操作
- View 是被動的，不包含任何應用邏輯
- 綁定 ViewModel，透過資料綁定機制來自動反映變化

**- ViewModel:**

- Model 和 View 之間的橋樑
- 從 Model 獲取數據，並將數據格式化為 View 可以顯示的格式
- 處理使用者輸入

## React 如何改善了傳統 MVC, MVVM 模式？

React 在傳統的 MVVM 模式上進行了一些優化和改進，使得開發者能夠更高效地構建和維護應用。

**1. 組件化**

MVVM 的 ViewModel 往往會變得過於龐大，因為它需要處理所有相關 View 的邏輯。這導致代碼難以維護、重用。而且，View 和 ViewModel 之間的依賴關係複雜，修改一處可能影響多個地方。

React 的核心思想之一是以組件為基礎，每個組件都是完全獨立的單元，擁有自己的狀態和渲染邏輯。這種設計使得代碼更容易理解和維護，還提高了重用性。相比 MVVM 需要通過繼承或混入來重用代碼，React 的組件可以直接通過組合方式重用，更加靈活。

補充：混入（Mixin）是一種程式設計模式，用來在多個物件或類別之間共享可重用的行為或功能，而不需要透過繼承的方式來達成。

**2. 單向數據流**

在 MVVM 中，雙向綁定雖然方便，但當應用變得複雜時，數據的變化路徑會變得難以追蹤。

React 改善這個問題的方式是強制實施單向數據流，這種限制雖然寫起來可能較冗長，但使得數據流向變得清晰可預測，大大簡化了狀態管理和除錯過程。

**3. 宣告式程式設計**

在傳統的 MVC 或 MVVM 中，通常需要手動處理資料和畫面的同步，這會導致大量的樣板程式碼（boilerplate code）和潛在的錯誤。另外，在 MVC, MVVM 中，通常會使用指令式程式設計，即明確告訴系統「做什麼」來更新 UI。

而 React JSX 提供了更自然的聲明式 UI 開發方式，宣告式程式設計讓開發者只需要描述畫面「應該是什麼樣子」。這樣的做法讓程式碼更直觀，也容易進行維護。
