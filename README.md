# 🧠 AI & Deep Learning Systems Coding Arena

An interactive, in-browser coding platform and Python execution playground featuring foundational Deep Learning, Neural Network, and Machine Learning algorithm challenges.

---

### 🌐 Live Interactive Demo
Experience the platform in action directly in your browser without local setup:  
👉 **https://mock-tests-agai.onrender.com**

👉**https://mock-tests-agai.vercel.app/**

And to view in localhost offline
```cmd
cd /d "c:\Users\Asus\Desktop\Tests AGAI" && python server.py
```

---

---

## 🚀 Features

- **⚡ In-Browser Python WASM Engine (Pyodide)**:
  - Run and test Python code directly in your browser with zero latency.
  - Safe, sandboxed execution with client-side **NumPy** support.
  - Captures `sys.stdin` / `sys.stdout` streams, execution time, and formatted tracebacks.

- **💻 Monaco Code Editor (VS Code in Browser)**:
  - **Auto-Closing Brackets & Quotes**: Automatically balances `()`, `{}`, `[]`, `""`, and `''`.
  - **Syntax Highlighting & IntelliSense**: Python keywords, autocomplete, and bracket pair colorization.
  - **Customizable Themes**: VS Code Dark+, GitHub Dark, Monokai, High Contrast, and Warm Light.
  - **Slidebar Drawer & Top Tabs**: Seamless 1-click navigation between all test questions.

- **🧪 Testcase Suite & Evaluator**:
  - Sample test cases with Expected vs. Actual output comparison.
  - **Hidden Test Case Validation**: Submit solutions to run against test suites including edge cases and ties.
  - **Official Solutions**: Inspect reference implementations and import them into the editor with one click.

---

## 📚 Question Bank (Test 1)

| # | Question | Difficulty | Core Topics |
|---|---|---|---|
| **Q1** | **Activation Functions** | Easy | Sigmoid, Tanh, ReLU, and Numerically Stable Softmax |
| **Q2** | **MLP Forward Pass** | Easy | Single-Hidden-Layer Multi-Layer Perceptron with ReLU & Linear Output |
| **Q3** | **Softmax & Cross-Entropy Loss** | Easy | Stable Softmax, Categorical Cross-Entropy, Argmax Prediction |
| **Q4** | **Linear Neuron Gradient Descent** | Easy | Full-batch GD, MSE Loss, Analytical Gradients & Weight Updates |
| **Q5** | **Two-Layer Multiclass Neural Net** | Medium | ReLU Hidden Layer, Softmax Output, Cross-Entropy Loss |
| **Q6** | **Binary Classification Neural Net** | Medium | Sigmoid Hidden & Output, Binary Cross-Entropy, Backpropagation |
| **Q7** | **Multiclass Linear Classifier** | Medium | Mini-batch Gradient Descent, Softmax Cross-Entropy, Matrix Updates |

---

## 💻 Local Quick Start

### Option 1: Run with Python Server (Recommended)
```bash
python server.py
```
This automatically binds to port **`3090`** (or the next available port) and opens `http://localhost:3090/index.html` in your browser.

> **One-liner for Windows CMD**:
> ```cmd
> python -m http.server 3090
> ```

---


---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Shift + Enter` | **Run** Active Test Case |
| `Ctrl + Enter` | **Submit Solution** (Evaluates All Test Cases) |
| `Ctrl + S` | Prevent accidental browser save dialog |

