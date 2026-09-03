# 🧠 AI & Deep Learning Systems Coding Arena

An interactive, in-browser coding platform and Python execution playground featuring foundational Deep Learning, Neural Network, and Machine Learning algorithm challenges.

---

### 🌐 Live Interactive Demo
Experience the platform in action directly in your browser without local setup:  
👉 **https://mock-tests-agai.onrender.com**

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

### Option 2: Run with Docker
```bash
# 1. Build the Docker image
docker build -t ai-coding-arena .

# 2. Run the container
docker run -d -p 3090:3090 --name ai-coding-arena ai-coding-arena
```
Open **`http://localhost:3090/index.html`** in your browser.

---

## 📤 Push to GitHub

1. **Initialize Git repository** (in your project folder):
   ```bash
   git init
   git add .
   git commit -m "feat: AI & Deep Learning Coding Arena"
   ```

2. **Create a new repository on GitHub** (e.g. `ai-coding-arena`).

3. **Set the main branch and push**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
   git push -u origin main
   ```

---

## 🌐 Deploy to Render

You can deploy to **[Render](https://render.com/)** using either of the two methods below:

### Method A: Deploy via Docker (Web Service)
1. Go to your **[Render Dashboard](https://dashboard.render.com/)**.
2. Click **New +** $\rightarrow$ **Web Service**.
3. Connect your GitHub repository.
4. Render will automatically detect the **`Dockerfile`**.
5. Configure the settings:
   - **Name**: `ai-coding-arena`
   - **Environment**: `Docker`
   - **Region**: Any (e.g., `Oregon (US West)`)
   - **Branch**: `main`
   - **Plan**: `Free`
6. Click **Deploy Web Service**.

> Render automatically routes external HTTPS traffic to the container using the dynamic `$PORT` environment variable handled in `server.py`.

---

### Method B: Deploy as a Static Site (Fastest & Free)
Since the application executes Python client-side using WebAssembly (Pyodide), it can run completely as a static site without backend container overhead!

1. Go to your **[Render Dashboard](https://dashboard.render.com/)**.
2. Click **New +** $\rightarrow$ **Static Site**.
3. Connect your GitHub repository.
4. Configure the settings:
   - **Name**: `ai-coding-arena`
   - **Branch**: `main`
   - **Build Command**: *(leave empty)*
   - **Publish Directory**: `.` *(current directory)*
5. Click **Create Static Site**.

Your live URL will be ready in seconds (e.g. `https://ai-coding-arena.onrender.com`).

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Shift + Enter` | **Run** Active Test Case |
| `Ctrl + Enter` | **Submit Solution** (Evaluates All Test Cases) |
| `Ctrl + S` | Prevent accidental browser save dialog |

