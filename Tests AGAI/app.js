// =========================================================================
// CODING ARENA - CORE APPLICATION LOGIC
// Light Yellow Night Mode Theme, Slidebar Drawer, Pyodide WASM & Plain Normal Text
// =========================================================================

let pyodideInstance = null;
let monacoEditor = null;
let currentQuestionIndex = 0;
let currentTestcaseIndex = 0;
let userCustomCases = {}; // Map of qId -> custom text input
let questionProgress = {}; // Map of qId -> 'solved' | 'attempted' | 'unattempted'
let sessionDrafts = {}; // Map of qId -> temporary in-memory draft
let isSettingCodeProgrammatically = false;

// -------------------------------------------------------------------------
// 1. INITIALIZATION & SPLIT PANES
// -------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  try {
    initSplitPanes();
  } catch (e) {
    console.warn("Split.js init warning:", e);
  }

  loadStoredProgress();
  populateQuestionDropdown();
  setupUIEventListeners();
  setupSlidebarListeners();

  // Restore last active question if available
  let initialQIdx = 0;
  try {
    const savedIdx = localStorage.getItem("ai_arena_current_q");
    if (savedIdx !== null) {
      const parsed = parseInt(savedIdx, 10);
      if (!isNaN(parsed) && typeof QUESTIONS !== "undefined" && parsed >= 0 && parsed < QUESTIONS.length) {
        initialQIdx = parsed;
      }
    }
  } catch (e) {}

  loadQuestion(initialQIdx);

  // Initialize sub-engines
  initMonacoEditor();
  initPyodideEngine();
});

let horizontalSplit = null;
let verticalSplit = null;
let isConsoleMinimized = true;
let previousConsoleSizes = [60, 40];

function initSplitPanes() {
  if (typeof Split === "undefined") return;

  const leftPane = document.getElementById("left-pane");
  const rightPane = document.getElementById("right-pane");
  if (leftPane && rightPane) {
    horizontalSplit = Split(["#left-pane", "#right-pane"], {
      sizes: [44, 56],
      minSize: [320, 380],
      gutterSize: 6,
      snapOffset: 0
    });
  }

  const editorPane = document.getElementById("editor-pane");
  const consolePane = document.getElementById("console-pane");
  if (editorPane && consolePane) {
    verticalSplit = Split(["#editor-pane", "#console-pane"], {
      direction: "vertical",
      sizes: [96, 4],
      minSize: [160, 36],
      gutterSize: 6,
      snapOffset: 0
    });
  }
}

function toggleConsoleMinimize() {
  if (!verticalSplit) return;
  const icon = document.getElementById("console-toggle-icon");
  const btn = document.getElementById("toggle-console-btn");

  if (!isConsoleMinimized) {
    previousConsoleSizes = verticalSplit.getSizes();
    if (previousConsoleSizes[1] < 10) previousConsoleSizes = [60, 40];
    verticalSplit.setSizes([96, 4]);
    isConsoleMinimized = true;
    if (icon) icon.className = "fa-solid fa-chevron-up text-xs text-amber-800";
    if (btn) btn.title = "Expand Console";
  } else {
    verticalSplit.setSizes(previousConsoleSizes);
    isConsoleMinimized = false;
    if (icon) icon.className = "fa-solid fa-chevron-down text-xs text-warmMuted";
    if (btn) btn.title = "Minimize Console";
  }

  if (monacoEditor) {
    setTimeout(() => monacoEditor.layout(), 50);
  }
}

function restoreConsoleIfMinimized() {
  if (isConsoleMinimized && verticalSplit) {
    toggleConsoleMinimize();
  }
}

const STORAGE_KEY_PROGRESS = "ai_arena_progress";
const STORAGE_KEY_DRAFTS = "ai_arena_drafts";
const STORAGE_KEY_CUSTOM_CASES = "ai_arena_custom_cases";
const STORAGE_KEY_CURRENT_Q = "ai_arena_current_q";

function loadStoredProgress() {
  questionProgress = {};
  sessionDrafts = {};
  userCustomCases = {};

  try {
    const savedProgress = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      if (parsed && typeof parsed === "object") {
        questionProgress = parsed;
      }
    }
  } catch (e) {
    console.warn("Failed to load progress from localStorage:", e);
  }

  try {
    const savedDrafts = localStorage.getItem(STORAGE_KEY_DRAFTS);
    if (savedDrafts) {
      const parsed = JSON.parse(savedDrafts);
      if (parsed && typeof parsed === "object") {
        sessionDrafts = parsed;
      }
    }
  } catch (e) {
    console.warn("Failed to load drafts from localStorage:", e);
  }

  // Backward compatibility / individual keys fallback
  if (typeof QUESTIONS !== "undefined") {
    QUESTIONS.forEach((q) => {
      if (!sessionDrafts[q.id]) {
        try {
          const individual = localStorage.getItem(`v5_code_${q.id}`) || localStorage.getItem(`ai_arena_code_${q.id}`);
          if (individual) {
            sessionDrafts[q.id] = individual;
          }
        } catch (e) {}
      }
    });
  }

  try {
    const savedCases = localStorage.getItem(STORAGE_KEY_CUSTOM_CASES);
    if (savedCases) {
      const parsed = JSON.parse(savedCases);
      if (parsed && typeof parsed === "object") {
        userCustomCases = parsed;
      }
    }
  } catch (e) {}
}

function showSaveIndicator() {
  const saveStatus = document.getElementById("save-status");
  if (saveStatus) {
    saveStatus.classList.remove("opacity-0");
    saveStatus.classList.add("opacity-100");
    if (saveStatus._fadeTimer) clearTimeout(saveStatus._fadeTimer);
    saveStatus._fadeTimer = setTimeout(() => {
      saveStatus.classList.remove("opacity-100");
      saveStatus.classList.add("opacity-0");
    }, 1200);
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(questionProgress));
    localStorage.setItem(STORAGE_KEY_DRAFTS, JSON.stringify(sessionDrafts));
    localStorage.setItem(STORAGE_KEY_CUSTOM_CASES, JSON.stringify(userCustomCases));
    localStorage.setItem(STORAGE_KEY_CURRENT_Q, String(currentQuestionIndex));
    showSaveIndicator();
  } catch (e) {
    console.warn("Failed to save progress to localStorage:", e);
  }
}

let codeSaveDebounceTimer = null;
function handleCodeChange() {
  if (isSettingCodeProgrammatically) return;
  if (typeof QUESTIONS === "undefined") return;
  const curQ = QUESTIONS[currentQuestionIndex];
  if (!curQ || !monacoEditor) return;

  const val = monacoEditor.getValue();
  sessionDrafts[curQ.id] = val;

  if (codeSaveDebounceTimer) clearTimeout(codeSaveDebounceTimer);
  codeSaveDebounceTimer = setTimeout(() => {
    saveProgress();
  }, 400);
}

// -------------------------------------------------------------------------
// 2. SLIDEBAR DRAWER NAVIGATION
// -------------------------------------------------------------------------
let currentTestGroup = "test1";
let slidebarFilter = "all";
let slidebarSearchQuery = "";

function setupSlidebarListeners() {
  const slidebar = document.getElementById("slidebar");
  const overlay = document.getElementById("slidebar-overlay");
  const toggleBtn = document.getElementById("slidebar-toggle-btn");
  const closeBtn = document.getElementById("close-slidebar-btn");

  function openSlidebar() {
    if (slidebar) slidebar.classList.add("open");
    if (overlay) overlay.classList.add("active");
    renderSlidebar();
    setTimeout(() => {
      if (typeof QUESTIONS !== "undefined" && QUESTIONS[currentQuestionIndex]) {
        const curQ = QUESTIONS[currentQuestionIndex];
        const activeCard = document.getElementById(`slidebar-card-${curQ.id}`);
        if (activeCard) {
          activeCard.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }
      }
    }, 100);
  }

  function closeSlidebar() {
    if (slidebar) slidebar.classList.remove("open");
    if (overlay) overlay.classList.remove("active");
  }

  if (toggleBtn) toggleBtn.onclick = openSlidebar;
  if (closeBtn) closeBtn.onclick = closeSlidebar;
  if (overlay) overlay.onclick = closeSlidebar;

  // Search Input inside Slidebar
  const searchInput = document.getElementById("slidebar-search-input");
  if (searchInput) {
    searchInput.oninput = (e) => {
      slidebarSearchQuery = e.target.value;
      renderSlidebar();
    };
  }

  // Quick Filter Pills inside Slidebar
  const filterKeys = ["all", "test1", "test2", "test3"];
  filterKeys.forEach((key) => {
    const btn = document.getElementById(`slidebar-filter-${key}`);
    if (btn) {
      btn.onclick = () => {
        slidebarFilter = key;
        filterKeys.forEach((k) => {
          const b = document.getElementById(`slidebar-filter-${k}`);
          if (b) {
            if (k === key) {
              b.className = "slidebar-filter-btn active flex-1 py-1 text-[11px] font-bold rounded-md text-center transition cursor-pointer";
            } else {
              b.className = "slidebar-filter-btn flex-1 py-1 text-[11px] font-semibold rounded-md text-center transition cursor-pointer";
            }
          }
        });
        renderSlidebar();
      };
    }
  });

  // Top Nav Test Switcher Pills
  const pillTest1 = document.getElementById("test-pill-test1");
  const pillTest2 = document.getElementById("test-pill-test2");
  const pillTest3 = document.getElementById("test-pill-test3");

  if (pillTest1) {
    pillTest1.onclick = () => {
      if (currentTestGroup !== "test1" && typeof QUESTIONS !== "undefined") {
        const firstIdx = QUESTIONS.findIndex((q) => (q.testGroup || "test1") === "test1");
        if (firstIdx !== -1) loadQuestion(firstIdx);
      }
    };
  }

  if (pillTest2) {
    pillTest2.onclick = () => {
      if (currentTestGroup !== "test2" && typeof QUESTIONS !== "undefined") {
        const firstIdx = QUESTIONS.findIndex((q) => q.testGroup === "test2");
        if (firstIdx !== -1) loadQuestion(firstIdx);
      }
    };
  }

  if (pillTest3) {
    pillTest3.onclick = () => {
      if (currentTestGroup !== "test3" && typeof QUESTIONS !== "undefined") {
        const firstIdx = QUESTIONS.findIndex((q) => q.testGroup === "test3");
        if (firstIdx !== -1) loadQuestion(firstIdx);
      }
    };
  }

  renderSlidebar();
}

function renderSlidebar() {
  const container = document.getElementById("slidebar-content");
  if (!container || typeof QUESTIONS === "undefined") return;

  const testGroups = [
    { key: "test1", title: "Test 1 · Practice Questions", icon: "fa-flask" },
    { key: "test2", title: "Test 2 · Sample Questions", icon: "fa-brain" },
    { key: "test3", title: "Test 3 · Test Questions", icon: "fa-cubes" }
  ];

  let totalQuestionsCount = QUESTIONS.length;
  let solvedCount = 0;

  QUESTIONS.forEach((q) => {
    if (questionProgress[q.id] === "solved") solvedCount++;
  });

  // Update Footer Progress
  const progressCountElem = document.getElementById("slidebar-progress-count");
  const progressBarElem = document.getElementById("slidebar-progress-bar");
  if (progressCountElem) {
    progressCountElem.innerText = `${solvedCount} / ${totalQuestionsCount} Solved`;
  }
  if (progressBarElem) {
    const pct = totalQuestionsCount > 0 ? (solvedCount / totalQuestionsCount) * 100 : 0;
    progressBarElem.style.width = `${pct}%`;
  }

  let html = "";

  testGroups.forEach(({ key, title, icon }) => {
    if (slidebarFilter !== "all" && slidebarFilter !== key) return;

    let groupQuestions = QUESTIONS.map((q, idx) => ({ q, idx })).filter(item => (item.q.testGroup || "test1") === key);

    if (slidebarSearchQuery.trim()) {
      const qLower = slidebarSearchQuery.toLowerCase().trim();
      groupQuestions = groupQuestions.filter(({ q }) => {
        return (
          q.title.toLowerCase().includes(qLower) ||
          q.tabShort.toLowerCase().includes(qLower) ||
          (q.tabName && q.tabName.toLowerCase().includes(qLower)) ||
          (q.summary && q.summary.toLowerCase().includes(qLower)) ||
          (q.tags && q.tags.some(t => t.toLowerCase().includes(qLower)))
        );
      });
    }

    if (groupQuestions.length === 0 && slidebarSearchQuery.trim()) {
      return;
    }

    const groupSolved = QUESTIONS.filter(q => (q.testGroup || "test1") === key && questionProgress[q.id] === "solved").length;
    const groupTotal = QUESTIONS.filter(q => (q.testGroup || "test1") === key).length;

    html += `
      <div class="space-y-2">
        <div class="flex items-center justify-between px-1">
          <span class="text-xs font-bold text-warmText uppercase tracking-wider flex items-center gap-1.5">
            <i class="fa-solid ${icon} text-warmAccent"></i>
            <span>${title}</span>
          </span>
          <span class="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 font-semibold px-2 py-0.5 rounded-full">
            ${groupSolved}/${groupTotal} Solved
          </span>
        </div>
        <div class="space-y-2">
    `;

    groupQuestions.forEach(({ q, idx }) => {
      const isActive = idx === currentQuestionIndex;
      const status = questionProgress[q.id] || "unattempted";
      const totalCases = (q.sampleTestCases ? q.sampleTestCases.length : 0) + (q.hiddenTestCases ? q.hiddenTestCases.length : 0);

      const diffBadge = q.difficulty === "Easy"
        ? "bg-emerald-100 text-emerald-900 border-emerald-300"
        : q.difficulty === "Hard"
        ? "bg-rose-100 text-rose-900 border-rose-300"
        : "bg-amber-100 text-amber-900 border-amber-300";

      const statusBadge = status === "solved"
        ? `<span class="font-bold text-emerald-800 flex items-center gap-1"><i class="fa-solid fa-check text-[10px]"></i> Solved</span>`
        : status === "attempted"
        ? `<span class="font-bold text-amber-800">Attempted</span>`
        : `<span class="font-medium text-warmMuted">Unattempted</span>`;

      html += `
        <div id="slidebar-card-${q.id}" data-qindex="${idx}" class="slidebar-question-card p-3 rounded-lg cursor-pointer transition shadow-xs ${
          isActive
            ? "bg-amber-50/90 border-2 border-warmAccent shadow-sm"
            : "bg-warmCard border border-warmBorder hover:border-warmAccent/70 hover:bg-warmHover/50"
        }">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-xs font-bold text-warmText flex items-center gap-1.5">
              <span class="w-5 h-5 rounded ${isActive ? 'bg-amber-300 text-amber-950 font-black' : 'bg-amber-100 text-amber-900 font-extrabold'} flex items-center justify-center text-[10px]">${q.tabShort}</span>
              <span class="truncate max-w-[175px]">${q.tabName || q.title}</span>
            </span>
            <div class="flex items-center space-x-1.5">
              ${isActive ? '<span class="text-[9px] bg-amber-200 text-amber-950 font-bold px-1.5 py-0.2 rounded">Active</span>' : ''}
              <span class="text-[10px] ${diffBadge} border font-semibold px-1.5 py-0.5 rounded">
                ${q.difficulty}
              </span>
            </div>
          </div>
          <p class="text-[11px] text-warmTextSecondary leading-snug line-clamp-2 mb-2">
            ${q.summary || q.title}
          </p>
          <div class="pt-2 border-t border-warmBorder/70 flex items-center justify-between text-[11px] text-warmTextSecondary">
            <span class="flex items-center gap-1 text-[10px] text-warmMuted">
              <i class="fa-solid fa-layer-group text-warmAccent"></i>
              <span>${totalCases} Test Cases</span>
            </span>
            <span id="slidebar-status-${q.id}">${statusBadge}</span>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  });

  if (!html.trim()) {
    html = `
      <div class="p-8 text-center text-warmMuted text-xs space-y-2">
        <i class="fa-solid fa-magnifying-glass text-xl text-warmMuted/60"></i>
        <p class="font-bold text-warmText">No questions found</p>
        <p class="text-[11px] text-warmMuted">No questions match "${slidebarSearchQuery}". Try another keyword or switch filter.</p>
      </div>
    `;
  }

  container.innerHTML = html;

  // Bind click events on all rendered question cards
  container.querySelectorAll(".slidebar-question-card").forEach((card) => {
    card.onclick = () => {
      const qIdx = parseInt(card.getAttribute("data-qindex"), 10);
      if (!isNaN(qIdx)) {
        loadQuestion(qIdx);
        closeSlidebar();
      }
    };
  });
}

function renderQuestionTabs(group = "test1") {
  currentTestGroup = group;

  // Update Test Pills
  const pills = {
    test1: { btn: document.getElementById("test-pill-test1"), iconClass: "fa-solid fa-flask" },
    test2: { btn: document.getElementById("test-pill-test2"), iconClass: "fa-solid fa-brain" },
    test3: { btn: document.getElementById("test-pill-test3"), iconClass: "fa-solid fa-cubes" }
  };

  Object.entries(pills).forEach(([key, { btn, iconClass }]) => {
    if (!btn) return;
    const icon = btn.querySelector("i");
    if (key === group) {
      btn.className = "px-2.5 py-1 text-xs font-bold rounded-md transition flex items-center gap-1.5 bg-amber-200 text-amber-950 border border-amber-400 shadow-xs cursor-pointer";
      if (icon) icon.className = `${iconClass} text-warmAccent`;
    } else {
      btn.className = "px-2.5 py-1 text-xs font-semibold rounded-md transition flex items-center gap-1.5 text-warmTextSecondary hover:text-warmText hover:bg-warmHover cursor-pointer";
      if (icon) icon.className = `${iconClass} text-warmMuted`;
    }
  });

  // Populate Question Tabs for active Test
  const container = document.getElementById("top-question-tabs");
  if (!container || typeof QUESTIONS === "undefined") return;
  container.innerHTML = "";

  const groupQuestions = QUESTIONS.map((q, idx) => ({ q, idx })).filter((item) => (item.q.testGroup || "test1") === group);

  groupQuestions.forEach(({ q, idx }) => {
    const btn = document.createElement("button");
    const isActive = idx === currentQuestionIndex;
    btn.className = isActive ? "test-tab-btn active" : "test-tab-btn";
    btn.title = q.title;

    const shortBadgeClass = isActive
      ? "text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-bold"
      : "text-[10px] bg-warmCard text-warmTextSecondary border border-warmBorder px-1.5 py-0.2 rounded font-bold";

    const isSolved = questionProgress[q.id] === "solved";
    const statusIcon = isSolved ? `<i class="fa-solid fa-check text-[10px] text-emerald-600 mr-1"></i>` : "";

    btn.innerHTML = `
      <span class="flex items-center">${statusIcon}${q.tabName || q.tabShort}</span>
      <span class="${shortBadgeClass}">${q.tabShort}</span>
    `;

    btn.onclick = () => loadQuestion(idx);
    container.appendChild(btn);
  });
}

// -------------------------------------------------------------------------
// 3. PYODIDE (PYTHON 3 WASM RUNNER)
// -------------------------------------------------------------------------
let stdoutLogs = [];

async function initPyodideEngine() {
  const statusPill = document.getElementById("engine-status");
  const statusText = document.getElementById("engine-status-text");

  try {
    if (typeof loadPyodide === "undefined") {
      console.warn("loadPyodide is not defined from CDN.");
      if (statusText) statusText.innerText = "Python Ready";
      return;
    }

    if (statusText) statusText.innerText = "Loading Python...";
    pyodideInstance = await loadPyodide({
      stdout: (text) => {
        stdoutLogs.push(text);
        appendStdout(text);
      },
      stderr: (text) => {
        stdoutLogs.push(text);
        appendStdout(text);
      }
    });

    if (statusText) statusText.innerText = "Loading NumPy...";
    try {
      await pyodideInstance.loadPackage("numpy");
    } catch (npErr) {
      console.warn("NumPy package load warning:", npErr);
    }

    if (statusPill) {
      statusPill.className = "flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-medium";
      const dot = statusPill.querySelector("span");
      if (dot) dot.className = "w-2 h-2 rounded-full bg-emerald-600";
    }
    if (statusText) statusText.innerText = "Python 3.11 + NumPy Ready";
  } catch (err) {
    console.error("Failed to initialize Pyodide:", err);
    if (statusPill) {
      statusPill.className = "flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-900 text-xs font-medium";
      const dot = statusPill.querySelector("span");
      if (dot) dot.className = "w-2 h-2 rounded-full bg-rose-600";
    }
    if (statusText) statusText.innerText = "Engine Error";
  }
}

function appendStdout(text) {
  const stdoutElem = document.getElementById("stdout-output");
  if (stdoutElem) {
    stdoutElem.textContent += text + "\n";
  }
}

function clearStdout() {
  stdoutLogs = [];
  const stdoutElem = document.getElementById("stdout-output");
  if (stdoutElem) {
    stdoutElem.textContent = "";
  }
}

// -------------------------------------------------------------------------
// 4. MONACO EDITOR SETUP (WARM LIGHT YELLOW THEME)
// -------------------------------------------------------------------------
function initMonacoEditor() {
  if (typeof require === "undefined") {
    console.warn("Monaco require loader is not ready.");
    return;
  }

  require.config({ paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs" } });

  require(["vs/editor/editor.main"], function () {
    const container = document.getElementById("monaco-container");
    if (!container) return;

    // Define vibrant colorful editor theme exactly matching user's screenshot
    monaco.editor.defineTheme("screenshot-colorful", {
      base: "vs-dark",
      inherit: false,
      rules: [
        { token: "", foreground: "f8f8f2", background: "21252b" },
        { token: "keyword", foreground: "ff79c6", fontStyle: "bold" },
        { token: "keyword.python", foreground: "ff79c6", fontStyle: "bold" },
        { token: "keyword.control", foreground: "ff79c6", fontStyle: "bold" },
        { token: "storage", foreground: "ff79c6", fontStyle: "bold" },
        { token: "operator", foreground: "ff79c6", fontStyle: "bold" },
        { token: "operator.python", foreground: "ff79c6", fontStyle: "bold" },
        { token: "type", foreground: "8be9fd", fontStyle: "bold" },
        { token: "type.python", foreground: "8be9fd" },
        { token: "function", foreground: "50fa7b", fontStyle: "bold" },
        { token: "identifier.function", foreground: "50fa7b", fontStyle: "bold" },
        { token: "string", foreground: "f1fa8c" },
        { token: "string.escape", foreground: "ff79c6" },
        { token: "number", foreground: "ffb86c", fontStyle: "bold" },
        { token: "number.float", foreground: "ffb86c", fontStyle: "bold" },
        { token: "comment", foreground: "6272a4", fontStyle: "italic" },
        { token: "variable", foreground: "f8f8f2" },
        { token: "variable.parameter", foreground: "f8f8f2" },
        { token: "constant", foreground: "8be9fd", fontStyle: "bold" },
        { token: "delimiter", foreground: "f8f8f2" },
        { token: "delimiter.bracket", foreground: "f8f8f2" }
      ],
      colors: {
        "editor.background": "#21252b",
        "editor.foreground": "#f8f8f2",
        "editorLineNumber.foreground": "#5c6370",
        "editorLineNumber.activeForeground": "#abb2bf",
        "editor.lineHighlightBackground": "#282c34",
        "editorCursor.foreground": "#528bff",
        "editor.selectionBackground": "#3e445180",
        "editorGutter.background": "#1e2227",
        "editorBracketMatch.background": "#3e4451",
        "editorBracketMatch.border": "#528bff",
        "editorBracketHighlight.foreground1": "#f1fa8c",
        "editorBracketHighlight.foreground2": "#ff79c6",
        "editorBracketHighlight.foreground3": "#8be9fd"
      }
    });

    const q = (typeof QUESTIONS !== "undefined" && QUESTIONS[currentQuestionIndex]) ? QUESTIONS[currentQuestionIndex] : null;
    let initialCode = "";
    if (q) {
      const draftCode = sessionDrafts[q.id];
      const hasDraft = typeof draftCode === "string" && draftCode.trim().length > 0;
      initialCode = hasDraft ? draftCode : q.starterCode;
    }

    monacoEditor = monaco.editor.create(container, {
      value: initialCode,
      language: "python",
      theme: "screenshot-colorful",
      fontSize: 13.5,
      fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
      fontLigatures: true,
      tabSize: 4,
      insertSpaces: true,
      automaticLayout: true,
      scrollBeyondLastLine: false,
      minimap: { enabled: false },
      lineNumbers: "on",
      bracketPairColorization: { enabled: true },
      autoClosingBrackets: "always",
      autoClosingQuotes: "always",
      autoSurround: "brackets",
      suggestOnTriggerCharacters: true,
      quickSuggestions: { other: true, comments: false, strings: false },
      formatOnPaste: true,
      formatOnType: true,
      padding: { top: 12, bottom: 12 }
    });

    monacoEditor.onDidChangeCursorPosition((e) => {
      const posElem = document.getElementById("cursor-pos");
      if (posElem) {
        posElem.innerText = `Ln ${e.position.lineNumber}, Col ${e.position.column}`;
      }
    });

    monacoEditor.onDidChangeModelContent(() => {
      handleCodeChange();
    });
  });
}

// -------------------------------------------------------------------------
// 5. QUESTION RENDERING & PLAIN NORMAL TEXT
// -------------------------------------------------------------------------
function formatMathFallback(formula) {
  return formula
    .replace(/\\text\{([^}]+)\}/g, "$1")
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "($1 / $2)")
    .replace(/\\times/g, "×")
    .replace(/\\mathbin\{@\}/g, "@")
    .replace(/\\alpha/g, "α")
    .replace(/\\beta/g, "β")
    .replace(/\\gamma/g, "γ")
    .replace(/\\sqrt\{([^}]+)\}/g, "√($1)")
    .replace(/\\sum_\{([^}]+)\}\^\{([^}]+)\}/g, "Σ_{$1}^$2")
    .replace(/\\sum/g, "Σ")
    .replace(/\\ge/g, "≥")
    .replace(/\\le/g, "≤")
    .replace(/\\max/g, "max")
    .replace(/\\in/g, "∈");
}

function renderFormattedMarkdown(markdownText, containerElem) {
  if (!containerElem || !markdownText) return;

  try {
    const mathBlocks = [];
    // 1. Protect Display Math $$...$$ and \[...\]
    let protectedText = markdownText.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
      mathBlocks.push({ type: "display", formula: formula.trim() });
      return `%%%MATH_BLOCK_${mathBlocks.length - 1}%%%`;
    }).replace(/\\\[([\s\S]*?)\\\]/g, (match, formula) => {
      mathBlocks.push({ type: "display", formula: formula.trim() });
      return `%%%MATH_BLOCK_${mathBlocks.length - 1}%%%`;
    });

    // 2. Protect Inline Math $...$ and \(...\)
    protectedText = protectedText.replace(/\$([^\$\n\r]+?)\$/g, (match, formula) => {
      mathBlocks.push({ type: "inline", formula: formula.trim() });
      return `%%%MATH_INLINE_${mathBlocks.length - 1}%%%`;
    }).replace(/\\\(([\s\S]*?)\\\)/g, (match, formula) => {
      mathBlocks.push({ type: "inline", formula: formula.trim() });
      return `%%%MATH_INLINE_${mathBlocks.length - 1}%%%`;
    });

    // 3. Convert Markdown to HTML via marked (with breaks: true to preserve exact line-by-line layout)
    let html = "";
    if (typeof marked !== "undefined") {
      if (typeof marked.parse === "function") {
        html = marked.parse(protectedText, { breaks: true, gfm: true });
      } else if (typeof marked === "function") {
        html = marked(protectedText, { breaks: true, gfm: true });
      }
    } else {
      html = `<div class="whitespace-pre-wrap font-sans text-warmText">${protectedText}</div>`;
    }

    html = html.replace(/<p>\s*(%%%MATH_BLOCK_\d+%%%)\s*<\/p>/g, "$1");

    // 4. Render protected math with KaTeX
    html = html.replace(/%%%MATH_BLOCK_(\d+)%%%/g, (match, id) => {
      const item = mathBlocks[parseInt(id, 10)];
      if (!item) return match;
      if (typeof katex !== "undefined") {
        try {
          const rendered = katex.renderToString(item.formula, { displayMode: true, throwOnError: false });
          return `<div class="katex-display-box my-2.5 py-1 text-center overflow-x-auto text-warmText">${rendered}</div>`;
        } catch (e) {
          console.warn("KaTeX parse warning:", e);
        }
      }
      const cleanFallback = formatMathFallback(item.formula);
      return `<div class="katex-display-box my-2.5 py-1 text-center overflow-x-auto text-warmText font-mono text-[14px] font-semibold">${cleanFallback}</div>`;
    });

    html = html.replace(/%%%MATH_INLINE_(\d+)%%%/g, (match, id) => {
      const item = mathBlocks[parseInt(id, 10)];
      if (!item) return match;
      if (typeof katex !== "undefined") {
        try {
          const rendered = katex.renderToString(item.formula, { displayMode: false, throwOnError: false });
          return `<span class="katex-inline text-warmText">${rendered}</span>`;
        } catch (e) {
          console.warn("KaTeX inline warning:", e);
        }
      }
      const cleanFallback = formatMathFallback(item.formula);
      return `<span class="text-warmText font-mono font-medium">${cleanFallback}</span>`;
    });

    containerElem.innerHTML = html;

    // Apply colorful syntax highlighting to code blocks
    if (typeof hljs !== "undefined") {
      containerElem.querySelectorAll("pre code").forEach((block) => {
        try {
          hljs.highlightElement(block);
        } catch (e) {}
      });
    }
  } catch (err) {
    console.error("renderFormattedMarkdown error:", err);
    containerElem.innerHTML = `<div class="whitespace-pre-wrap font-sans text-warmText">${markdownText}</div>`;
  }
}

function populateQuestionDropdown() {
  const select = document.getElementById("question-select");
  if (!select || typeof QUESTIONS === "undefined") return;
  select.innerHTML = "";

  QUESTIONS.forEach((q, idx) => {
    const opt = document.createElement("option");
    opt.value = idx;
    const status = questionProgress[q.id] === "solved" ? "✓ " : "";
    opt.textContent = `${status}${q.title}`;
    select.appendChild(opt);
  });
}

function loadQuestion(index) {
  if (typeof QUESTIONS === "undefined" || index < 0 || index >= QUESTIONS.length) return;

  // 1. CRITICAL: Save current question's code before switching to new question!
  if (monacoEditor && typeof QUESTIONS !== "undefined" && QUESTIONS[currentQuestionIndex]) {
    const prevQ = QUESTIONS[currentQuestionIndex];
    if (prevQ) {
      const currentCode = monacoEditor.getValue();
      sessionDrafts[prevQ.id] = currentCode;
    }
  }

  // Clear debounce timer and immediately persist drafts and progress
  if (codeSaveDebounceTimer) {
    clearTimeout(codeSaveDebounceTimer);
    codeSaveDebounceTimer = null;
  }
  saveProgress();

  currentQuestionIndex = index;
  currentTestcaseIndex = 0;

  const q = QUESTIONS[currentQuestionIndex];
  if (!q) return;

  const select = document.getElementById("question-select");
  if (select) select.value = index;

  // Title, Difficulty, Tags
  const titleElem = document.getElementById("problem-title");
  if (titleElem) titleElem.innerText = q.title;

  const diffBadge = document.getElementById("problem-difficulty-badge");
  if (diffBadge) {
    diffBadge.innerText = q.difficulty;
    diffBadge.className = "text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300";
  }

  // Tags
  const tagsContainer = document.getElementById("problem-tags");
  if (tagsContainer) {
    tagsContainer.innerHTML = "";
    (q.tags || []).forEach((tag) => {
      const t = document.createElement("span");
      t.className = "text-[11px] px-2 py-0.5 rounded bg-warmCard text-warmTextSecondary border border-warmBorder font-medium";
      t.innerText = tag;
      tagsContainer.appendChild(t);
    });
  }

  // Markdown Description
  const mdContainer = document.getElementById("problem-markdown");
  if (mdContainer) {
    renderFormattedMarkdown(q.description, mdContainer);
  }

  // Hints
  const hintsContainer = document.getElementById("hints-container");
  if (hintsContainer) {
    if (q.hints && q.hints.length > 0) {
      hintsContainer.innerHTML = q.hints.map((h, i) => `
        <details class="bg-warmCard border border-warmBorder rounded-lg p-3 text-xs text-warmText group" ${i === 0 ? "open" : ""}>
          <summary class="cursor-pointer font-semibold text-amber-800 hover:text-amber-900 flex items-center justify-between list-none">
            <span class="flex items-center space-x-2">
              <i class="fa-regular fa-lightbulb text-amber-600"></i>
              <span>${h.title}</span>
            </span>
            <i class="fa-solid fa-chevron-down text-[10px] text-warmMuted group-open:rotate-180 transition-transform"></i>
          </summary>
          <div class="hint-body mt-2.5 text-warmText pl-3 border-l-2 border-amber-400 leading-relaxed font-sans">
            ${h.content}
          </div>
        </details>
      `).join("");
    } else {
      hintsContainer.innerHTML = `
        <div class="p-3 bg-warmCard border border-warmBorder rounded-lg text-xs text-warmMuted">
          No additional hints available for this problem.
        </div>
      `;
    }
  }

  // Status Badge
  updateQuestionStatusBadge();

  // Load Session Draft or Starter Code into Monaco
  if (monacoEditor) {
    const draftCode = sessionDrafts[q.id];
    const hasValidDraft = typeof draftCode === "string" && draftCode.length > 0;
    
    isSettingCodeProgrammatically = true;
    monacoEditor.setValue(hasValidDraft ? draftCode : q.starterCode);
    isSettingCodeProgrammatically = false;
  }

  // Reset Results tab
  const resBadge = document.getElementById("results-badge");
  if (resBadge) resBadge.classList.add("hidden");
  
  const resCards = document.getElementById("results-cards-container");
  if (resCards) resCards.innerHTML = "";

  const resHeadline = document.getElementById("results-headline");
  if (resHeadline) resHeadline.innerText = "Run code to see test results";

  const resSubtext = document.getElementById("results-subtext");
  if (resSubtext) resSubtext.innerText = "Supports sample & hidden grading test suites.";

  const resIcon = document.getElementById("results-status-icon");
  if (resIcon) resIcon.innerHTML = "";

  const execTime = document.getElementById("execution-time");
  if (execTime) execTime.classList.add("hidden");

  switchConsoleTab("testcases");
  renderTestcasePills();

  // Update Top Navigation active tab and Slidebar active cards
  currentTestGroup = q.testGroup || "test1";
  renderQuestionTabs(currentTestGroup);

  // Re-render slidebar to update active card highlight and status badges
  renderSlidebar();

  // Update Question Counter
  const counter = document.getElementById("question-progress-counter");
  if (counter) {
    const groupQuestions = QUESTIONS.filter((item) => (item.testGroup || "test1") === currentTestGroup);
    const groupIdx = groupQuestions.findIndex((item) => item.id === q.id) + 1;
    const testLabel = q.testTitle || (currentTestGroup === "test1" ? "Test 1" : currentTestGroup === "test2" ? "Test 2" : "Test 3");
    counter.innerText = `${testLabel} · Question ${groupIdx} of ${groupQuestions.length}`;
  }
}

function updateQuestionStatusBadge() {
  if (typeof QUESTIONS === "undefined") return;
  const q = QUESTIONS[currentQuestionIndex];
  if (!q) return;

  const badge = document.getElementById("q-status-badge");
  const status = questionProgress[q.id] || "unattempted";

  if (status === "solved") {
    if (badge) {
      badge.className = "text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-semibold";
      badge.innerText = "Solved ✓";
    }
  } else if (status === "attempted") {
    if (badge) {
      badge.className = "text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-semibold";
      badge.innerText = "Attempted";
    }
  } else {
    if (badge) {
      badge.className = "text-xs px-2.5 py-0.5 rounded-full bg-warmCard text-warmMuted border border-warmBorder font-medium";
      badge.innerText = "Unattempted";
    }
  }

  // Update individual question statuses in slidebar
  renderSlidebar();
}

// -------------------------------------------------------------------------
// 6. TEST CASES RENDERING & SELECTION
// -------------------------------------------------------------------------
function renderTestcasePills() {
  if (typeof QUESTIONS === "undefined") return;
  const q = QUESTIONS[currentQuestionIndex];
  if (!q) return;

  const container = document.getElementById("testcase-pills");
  if (!container) return;
  container.innerHTML = "";

  (q.sampleTestCases || []).forEach((tc, idx) => {
    const btn = document.createElement("button");
    const isActive = idx === currentTestcaseIndex;
    btn.className = `px-3 py-1 text-xs rounded-md transition font-medium ${
      isActive
        ? "bg-amber-200 text-amber-950 border border-amber-400 font-semibold shadow-sm"
        : "bg-warmCard text-warmTextSecondary border border-warmBorder hover:bg-warmHover hover:text-warmText"
    }`;
    btn.textContent = `Case ${idx + 1}`;
    btn.onclick = () => selectTestcase(idx);
    container.appendChild(btn);
  });

  // Custom Test Case Tab
  const customBtn = document.createElement("button");
  const isCustomActive = currentTestcaseIndex === (q.sampleTestCases ? q.sampleTestCases.length : 0);
  customBtn.className = `px-3 py-1 text-xs rounded-md transition font-medium flex items-center space-x-1 ${
    isCustomActive
      ? "bg-amber-200 text-amber-950 border border-amber-400 font-semibold shadow-sm"
      : "bg-warmCard text-warmTextSecondary border border-warmBorder hover:bg-warmHover hover:text-warmText"
  }`;
  customBtn.innerHTML = `<i class="fa-solid fa-plus text-[10px]"></i><span>Custom Case</span>`;
  customBtn.onclick = () => selectTestcase(q.sampleTestCases ? q.sampleTestCases.length : 0);
  container.appendChild(customBtn);

  updateTestcaseEditor();
}

function selectTestcase(idx) {
  currentTestcaseIndex = idx;
  renderTestcasePills();
}

function updateTestcaseEditor() {
  if (typeof QUESTIONS === "undefined") return;
  const q = QUESTIONS[currentQuestionIndex];
  if (!q) return;

  const editor = document.getElementById("testcase-json-editor");
  const hint = document.getElementById("custom-case-hint");
  if (!editor) return;

  if (currentTestcaseIndex < (q.sampleTestCases ? q.sampleTestCases.length : 0)) {
    const tc = q.sampleTestCases[currentTestcaseIndex];
    editor.value = typeof tc.input === "string" ? tc.input : JSON.stringify(tc.input, null, 2);
    editor.readOnly = true;
    editor.classList.add("opacity-90");
    if (hint) hint.classList.add("hidden");
  } else {
    // Custom case
    editor.readOnly = false;
    editor.classList.remove("opacity-90");
    if (hint) hint.classList.remove("hidden");

    if (userCustomCases[q.id]) {
      editor.value = userCustomCases[q.id];
    } else {
      const defaultSample = q.sampleTestCases && q.sampleTestCases[0] ? q.sampleTestCases[0].input : "";
      editor.value = typeof defaultSample === "string" ? defaultSample : JSON.stringify(defaultSample, null, 2);
    }
  }
}

// -------------------------------------------------------------------------
// 7. CODE EXECUTION & TESTCASE RUNNER
// -------------------------------------------------------------------------
async function runCode(isSubmitMode = false) {
  if (!pyodideInstance) {
    alert("Python Pyodide engine is still loading. Please wait 2 seconds.");
    return;
  }

  if (typeof QUESTIONS === "undefined") return;
  const q = QUESTIONS[currentQuestionIndex];
  if (!q) return;

  restoreConsoleIfMinimized();
  switchConsoleTab("results");

  const userCode = monacoEditor ? monacoEditor.getValue() : q.starterCode;
  sessionDrafts[q.id] = userCode;
  saveProgress();

  const runBtn = document.getElementById("run-code-btn");
  const submitBtn = document.getElementById("submit-code-btn");
  if (runBtn) runBtn.disabled = true;
  if (submitBtn) submitBtn.disabled = true;

  const headline = document.getElementById("results-headline");
  const subtext = document.getElementById("results-subtext");
  const statusIcon = document.getElementById("results-status-icon");
  const cardsContainer = document.getElementById("results-cards-container");
  const timeElem = document.getElementById("execution-time");

  if (headline) headline.innerText = isSubmitMode ? "Evaluating All Test Cases..." : "Running Active Test Case...";
  if (subtext) subtext.innerText = "Executing in isolated Pyodide WebAssembly sandbox...";
  if (statusIcon) statusIcon.innerHTML = `<i class="fa-solid fa-spinner fa-spin text-amber-800 text-lg"></i>`;
  if (cardsContainer) cardsContainer.innerHTML = "";
  if (timeElem) timeElem.classList.add("hidden");

  const startTime = performance.now();

  try {
    let testCasesToRun = [];
    if (isSubmitMode) {
      testCasesToRun = [...(q.sampleTestCases || []), ...(q.hiddenTestCases || [])];
    } else {
      if (currentTestcaseIndex < (q.sampleTestCases ? q.sampleTestCases.length : 0)) {
        testCasesToRun = [q.sampleTestCases[currentTestcaseIndex]];
      } else {
        // Custom case
        const customInputStr = document.getElementById("testcase-json-editor").value;
        userCustomCases[q.id] = customInputStr;
        testCasesToRun = [{ name: "Custom Case", input: customInputStr, expected: null }];
      }
    }

    let allPassed = true;
    const testResults = [];

    for (let i = 0; i < testCasesToRun.length; i++) {
      const tc = testCasesToRun[i];
      const result = await executeSingleTestCase(q, userCode, tc.input);

      let passed = false;
      if (tc.expected !== null && tc.expected !== undefined) {
        passed = compareOutputs(result.output, tc.expected);
      } else {
        passed = !result.error;
      }

      if (!passed) allPassed = false;

      testResults.push({
        name: tc.name,
        input: tc.input,
        expected: tc.expected,
        actual: result.output,
        error: result.error,
        passed: passed
      });
    }

    const duration = Math.round(performance.now() - startTime);
    if (timeElem) {
      timeElem.innerText = `${duration} ms`;
      timeElem.classList.remove("hidden");
    }

    renderTestResults(testResults, isSubmitMode, allPassed);

    if (!isSubmitMode) {
      if (questionProgress[q.id] !== "solved") {
        questionProgress[q.id] = "attempted";
      }
    } else {
      if (allPassed) {
        questionProgress[q.id] = "solved";
      } else {
        if (questionProgress[q.id] !== "solved") {
          questionProgress[q.id] = "attempted";
        }
      }
    }
    saveProgress();
    populateQuestionDropdown();
    updateQuestionStatusBadge();
    renderSlidebar();
    renderQuestionTabs(currentTestGroup);

  } catch (err) {
    if (headline) headline.innerText = "Execution Error";
    if (subtext) subtext.innerText = err.message || "An error occurred during execution.";
    if (statusIcon) statusIcon.innerHTML = `<i class="fa-solid fa-circle-exclamation text-rose-600 text-lg"></i>`;
    if (cardsContainer) {
      cardsContainer.innerHTML = `
        <div class="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-900 text-xs font-mono whitespace-pre-wrap">
          ${err.message || String(err)}
        </div>
      `;
    }
  } finally {
    if (runBtn) runBtn.disabled = false;
    if (submitBtn) submitBtn.disabled = false;
  }
}

async function executeSingleTestCase(q, userCode, testInput) {
  const inputStr = typeof testInput === "string" ? testInput : JSON.stringify(testInput);

  const runnerScript = `
import json, sys, io

# Set standard input with test case input string
sys.stdin = io.StringIO('''${inputStr.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}''')

# Intercept stdout to capture the output printed
_stdout_buf = io.StringIO()
_orig_stdout = sys.stdout
sys.stdout = _stdout_buf

_final_output = None

try:
${userCode.split('\n').map(line => '    ' + line).join('\n')}

    sys.stdout = _orig_stdout
    _printed = _stdout_buf.getvalue().strip()
    _final_output = _printed
finally:
    sys.stdout = _orig_stdout

_final_output
`;

  try {
    const rawResult = await pyodideInstance.runPythonAsync(runnerScript);
    return { output: rawResult, error: null };
  } catch (pyErr) {
    return { output: null, error: pyErr.message || String(pyErr) };
  }
}

function compareOutputs(actual, expected) {
  if (actual === expected) return true;
  if (actual === null || expected === null) return false;
  if (actual === undefined || expected === undefined) return false;

  const actStr = String(actual).trim();
  const expStr = String(expected).trim();
  if (actStr === expStr) return true;

  // Token-by-token comparison with numeric tolerance for float values
  const actTokens = actStr.split(/\s+/).filter(Boolean);
  const expTokens = expStr.split(/\s+/).filter(Boolean);

  if (actTokens.length === expTokens.length && actTokens.length > 0) {
    let allMatch = true;
    for (let i = 0; i < actTokens.length; i++) {
      const aNum = parseFloat(actTokens[i]);
      const eNum = parseFloat(expTokens[i]);
      if (!isNaN(aNum) && !isNaN(eNum)) {
        if (Math.abs(aNum - eNum) > 1e-3) {
          allMatch = false;
          break;
        }
      } else if (actTokens[i] !== expTokens[i]) {
        allMatch = false;
        break;
      }
    }
    if (allMatch) return true;
  }

  return false;
}

function renderTestResults(results, isSubmitMode, allPassed) {
  const headline = document.getElementById("results-headline");
  const subtext = document.getElementById("results-subtext");
  const statusIcon = document.getElementById("results-status-icon");
  const cardsContainer = document.getElementById("results-cards-container");
  const resultsBadge = document.getElementById("results-badge");

  if (!cardsContainer) return;
  cardsContainer.innerHTML = "";

  const passedCount = results.filter((r) => r.passed).length;
  const totalCount = results.length;

  if (resultsBadge) resultsBadge.classList.remove("hidden");

  if (allPassed) {
    if (headline) headline.innerText = isSubmitMode ? "Accepted! All Test Cases Passed 🎉" : "Test Case Passed! ✓";
    if (subtext) subtext.innerText = isSubmitMode ? `Solved ${passedCount}/${totalCount} test cases successfully.` : "Your solution passed the active test case.";
    if (statusIcon) statusIcon.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-600 text-xl"></i>`;
    if (resultsBadge) {
      resultsBadge.className = "text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-emerald-100 text-emerald-900 border border-emerald-300";
      resultsBadge.innerText = `${passedCount}/${totalCount}`;
    }
  } else {
    if (headline) headline.innerText = isSubmitMode ? "Some Test Cases Failed" : "Test Case Failed ✗";
    if (subtext) subtext.innerText = `Passed ${passedCount} of ${totalCount} test cases. Check diffs below.`;
    if (statusIcon) statusIcon.innerHTML = `<i class="fa-solid fa-circle-xmark text-rose-600 text-xl"></i>`;
    if (resultsBadge) {
      resultsBadge.className = "text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-rose-100 text-rose-900 border border-rose-300";
      resultsBadge.innerText = `${passedCount}/${totalCount}`;
    }
  }

  results.forEach((r, idx) => {
    const card = document.createElement("div");
    card.className = `p-3 rounded-lg border text-xs space-y-2 ${
      r.passed
        ? "bg-emerald-50/70 border-emerald-300 text-warmText"
        : "bg-rose-50/70 border-rose-300 text-warmText"
    }`;

    let statusHtml = r.passed
      ? `<span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold border border-emerald-300 flex items-center space-x-1"><i class="fa-solid fa-check text-[10px]"></i><span>Passed</span></span>`
      : `<span class="px-2 py-0.5 rounded bg-rose-100 text-rose-900 font-bold border border-rose-300 flex items-center space-x-1"><i class="fa-solid fa-xmark text-[10px]"></i><span>Failed</span></span>`;

    let contentHtml = "";

    if (r.error) {
      contentHtml = `
        <div class="space-y-1">
          <span class="text-rose-800 font-semibold">Runtime Error / Traceback:</span>
          <pre class="bg-warmBg p-2 rounded border border-rose-200 text-rose-900 font-mono whitespace-pre-wrap">${r.error}</pre>
        </div>
      `;
    } else {
      contentHtml = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
          <div>
            <span class="text-warmTextSecondary font-medium">Expected Output:</span>
            <pre class="bg-warmBg p-2 rounded border border-warmBorder font-mono text-[11px] text-warmText mt-1 overflow-x-auto">${
              r.expected !== null ? r.expected : "N/A (Custom Test)"
            }</pre>
          </div>
          <div>
            <span class="${r.passed ? "text-emerald-800" : "text-rose-800"} font-medium">Your Output:</span>
            <pre class="bg-warmBg p-2 rounded border ${
              r.passed ? "border-emerald-300 text-emerald-950" : "border-rose-300 text-rose-950"
            } font-mono text-[11px] mt-1 overflow-x-auto">${r.actual || ""}</pre>
          </div>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="font-semibold text-warmText">${r.name || `Case ${idx + 1}`}</span>
        ${statusHtml}
      </div>
      ${contentHtml}
    `;

    cardsContainer.appendChild(card);
  });
}

// -------------------------------------------------------------------------
// 8. TAB NAVIGATION & UI EVENT LISTENERS
// -------------------------------------------------------------------------
function setupUIEventListeners() {
  // Left Panel Tabs
  const tabDesc = document.getElementById("tab-desc");
  if (tabDesc) tabDesc.onclick = () => switchLeftTab("desc");

  const tabHints = document.getElementById("tab-hints");
  if (tabHints) tabHints.onclick = () => switchLeftTab("hints");

  // Console Tabs
  const tabTC = document.getElementById("tab-testcases");
  if (tabTC) {
    tabTC.onclick = () => {
      restoreConsoleIfMinimized();
      switchConsoleTab("testcases");
    };
  }

  const tabRes = document.getElementById("tab-results");
  if (tabRes) {
    tabRes.onclick = () => {
      restoreConsoleIfMinimized();
      switchConsoleTab("results");
    };
  }

  const tabStdout = document.getElementById("tab-stdout");
  if (tabStdout) {
    tabStdout.onclick = () => {
      restoreConsoleIfMinimized();
      switchConsoleTab("stdout");
    };
  }

  // Question Selector
  const qSelect = document.getElementById("question-select");
  if (qSelect) {
    qSelect.onchange = (e) => {
      loadQuestion(parseInt(e.target.value, 10));
    };
  }

  const prevBtn = document.getElementById("prev-q-btn");
  if (prevBtn) {
    prevBtn.onclick = () => {
      if (currentQuestionIndex > 0) loadQuestion(currentQuestionIndex - 1);
    };
  }
  const bottomPrevBtn = document.getElementById("bottom-prev-btn");
  if (bottomPrevBtn) {
    bottomPrevBtn.onclick = () => {
      if (currentQuestionIndex > 0) loadQuestion(currentQuestionIndex - 1);
    };
  }

  const nextBtn = document.getElementById("next-q-btn");
  if (nextBtn) {
    nextBtn.onclick = () => {
      if (typeof QUESTIONS !== "undefined" && currentQuestionIndex < QUESTIONS.length - 1) {
        loadQuestion(currentQuestionIndex + 1);
      }
    };
  }
  const bottomNextBtn = document.getElementById("bottom-next-btn");
  if (bottomNextBtn) {
    bottomNextBtn.onclick = () => {
      if (typeof QUESTIONS !== "undefined" && currentQuestionIndex < QUESTIONS.length - 1) {
        loadQuestion(currentQuestionIndex + 1);
      }
    };
  }

  // Reset Starter Code
  const resetBtn = document.getElementById("reset-code-btn");
  if (resetBtn) {
    resetBtn.onclick = () => {
      if (typeof QUESTIONS === "undefined") return;
      const q = QUESTIONS[currentQuestionIndex];
      if (!q) return;
      delete sessionDrafts[q.id];
      try {
        localStorage.removeItem(`v5_code_${q.id}`);
        localStorage.removeItem(`ai_arena_code_${q.id}`);
      } catch (e) {}
      saveProgress();
      if (monacoEditor) {
        isSettingCodeProgrammatically = true;
        monacoEditor.setValue(q.starterCode);
        isSettingCodeProgrammatically = false;
      }
    };
  }

  // Reset All
  const resetAllBtn = document.getElementById("reset-all-btn");
  if (resetAllBtn) {
    resetAllBtn.onclick = () => {
      const confirmed = confirm("Reset all progress and stored code back to Unattempted?");
      if (!confirmed) return;
      questionProgress = {};
      sessionDrafts = {};
      userCustomCases = {};
      try {
        localStorage.removeItem(STORAGE_KEY_PROGRESS);
        localStorage.removeItem(STORAGE_KEY_DRAFTS);
        localStorage.removeItem(STORAGE_KEY_CUSTOM_CASES);
        localStorage.removeItem(STORAGE_KEY_CURRENT_Q);
        if (typeof QUESTIONS !== "undefined") {
          QUESTIONS.forEach((q) => {
            localStorage.removeItem(`v5_code_${q.id}`);
            localStorage.removeItem(`ai_arena_code_${q.id}`);
          });
        }
      } catch (e) {}
      populateQuestionDropdown();
      loadQuestion(currentQuestionIndex);
      renderSlidebar();
      renderQuestionTabs(currentTestGroup);
    };
  }

  // Format Code & Copy Code
  const formatBtn = document.getElementById("format-code-btn");
  if (formatBtn) {
    formatBtn.onclick = () => {
      if (monacoEditor) {
        monacoEditor.getAction("editor.action.formatDocument").run();
      }
    };
  }

  const copyBtn = document.getElementById("copy-code-btn");
  if (copyBtn) {
    copyBtn.onclick = () => {
      if (monacoEditor) {
        navigator.clipboard.writeText(monacoEditor.getValue()).then(() => {
          copyBtn.innerHTML = `<i class="fa-solid fa-check text-xs text-emerald-600"></i>`;
          setTimeout(() => {
            copyBtn.innerHTML = `<i class="fa-regular fa-copy text-xs"></i>`;
          }, 1500);
        });
      }
    };
  }

  // Solution Modal
  const solBtn = document.getElementById("view-solution-btn");
  if (solBtn) solBtn.onclick = openSolutionModal;

  const closeSolModal = document.getElementById("close-solution-modal");
  if (closeSolModal) closeSolModal.onclick = closeSolutionModal;

  const dismissSolModal = document.getElementById("dismiss-solution-btn");
  if (dismissSolModal) dismissSolModal.onclick = closeSolutionModal;

  const insertSolBtn = document.getElementById("insert-solution-btn");
  if (insertSolBtn) {
    insertSolBtn.onclick = () => {
      if (typeof QUESTIONS === "undefined") return;
      const q = QUESTIONS[currentQuestionIndex];
      if (q && monacoEditor) {
        sessionDrafts[q.id] = q.solutionCode;
        saveProgress();
        isSettingCodeProgrammatically = true;
        monacoEditor.setValue(q.solutionCode);
        isSettingCodeProgrammatically = false;
      }
      closeSolutionModal();
    };
  }

  // Run & Submit Buttons
  const runBtn = document.getElementById("run-code-btn");
  if (runBtn) runBtn.onclick = () => runCode(false);

  const submitBtn = document.getElementById("submit-code-btn");
  if (submitBtn) submitBtn.onclick = () => runCode(true);

  // Clear Output
  const clearBtn = document.getElementById("clear-console-btn");
  if (clearBtn) clearBtn.onclick = clearStdout;

  // Toggle Console Minimize
  const toggleConsoleBtn = document.getElementById("toggle-console-btn");
  if (toggleConsoleBtn) toggleConsoleBtn.onclick = toggleConsoleMinimize;

  // Custom Test Case input autosave
  const customTcEditor = document.getElementById("testcase-json-editor");
  if (customTcEditor) {
    customTcEditor.addEventListener("input", () => {
      if (typeof QUESTIONS !== "undefined" && QUESTIONS[currentQuestionIndex]) {
        const q = QUESTIONS[currentQuestionIndex];
        userCustomCases[q.id] = customTcEditor.value;
        saveProgress();
      }
    });
  }

  // Keyboard Shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      runCode(false);
    } else if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      runCode(true);
    }
  });
}

function switchLeftTab(tabName) {
  const tabs = ["desc"];
  tabs.forEach((t) => {
    const btn = document.getElementById(`tab-${t}`);
    const content = document.getElementById(`content-${t}`);
    if (btn && content) {
      if (t === tabName) {
        btn.className = "tab-active px-3 py-2 text-warmText font-semibold transition flex items-center space-x-1.5";
        content.classList.remove("hidden");
      } else {
        btn.className = "px-3 py-2 text-warmTextSecondary font-medium hover:text-warmText transition flex items-center space-x-1.5";
        content.classList.add("hidden");
      }
    }
  });
}

function switchConsoleTab(tabName) {
  const tabs = ["testcases", "results", "stdout"];
  tabs.forEach((t) => {
    const btn = document.getElementById(`tab-${t}`);
    const content = document.getElementById(`content-${t}`);
    if (btn && content) {
      if (t === tabName) {
        btn.className = "tab-active px-3 py-1.5 text-warmText font-semibold transition flex items-center space-x-1.5";
        content.classList.remove("hidden");
      } else {
        btn.className = "px-3 py-1.5 text-warmTextSecondary font-medium hover:text-warmText transition flex items-center space-x-1.5";
        content.classList.add("hidden");
      }
    }
  });
}

function openSolutionModal() {
  if (typeof QUESTIONS === "undefined") return;
  const q = QUESTIONS[currentQuestionIndex];
  if (!q) return;

  const title = document.getElementById("modal-solution-title");
  if (title) title.innerText = `${q.title} - Official Solution`;

  const code = document.getElementById("modal-solution-code");
  if (code) {
    code.textContent = q.solutionCode;
    if (typeof hljs !== "undefined") {
      try {
        delete code.dataset.highlighted;
        hljs.highlightElement(code);
      } catch (e) {}
    }
  }

  const modal = document.getElementById("solution-modal");
  if (modal) modal.classList.remove("hidden");
}

function closeSolutionModal() {
  const modal = document.getElementById("solution-modal");
  if (modal) modal.classList.add("hidden");
}

window.addEventListener("load", () => {
  if (typeof QUESTIONS !== "undefined" && QUESTIONS[currentQuestionIndex]) {
    const q = QUESTIONS[currentQuestionIndex];
    const mdContainer = document.getElementById("problem-markdown");
    if (mdContainer) {
      renderFormattedMarkdown(q.description, mdContainer);
    }
  }
});

window.addEventListener("beforeunload", () => {
  if (monacoEditor && typeof QUESTIONS !== "undefined" && QUESTIONS[currentQuestionIndex]) {
    const curQ = QUESTIONS[currentQuestionIndex];
    if (curQ) {
      sessionDrafts[curQ.id] = monacoEditor.getValue();
    }
  }
  saveProgress();
});
