// =========================================================================
// CODING ARENA - MULTI-TEST QUESTION REPOSITORY
// Test 1: Practice Questions (Problems 1, 2, 4, 6, 7, 10)
// Test 2: Sample Questions (Q2, Q4, Q6, Q8, Q10, Q12)
// Test 3: Test Questions (Q2, Q4, Q5, Q8, Q10)
// =========================================================================

const QUESTIONS = [
  {
    "id": "t1_p1",
    "testGroup": "test1",
    "testTitle": "Test 1",
    "tabShort": "P1",
    "title": "Problem Description 1: CNN Feature-Extraction Pipeline",
    "tabName": "Problem 1",
    "category": "Computer Vision / CNN",
    "difficulty": "Easy",
    "tags": [
      "CNN",
      "Convolution",
      "Cross-Correlation",
      "ReLU",
      "NumPy"
    ],
    "summary": "Implement a CNN feature-extraction pipeline for a grayscale image using cross-correlation, bias addition, and ReLU activation.",
    "description": "### Problem Description 1\n\nImplement a CNN feature-extraction pipeline for a grayscale image. Given an input image, a convolution kernel, and a bias, generate the resulting feature map.\n\nUse the following conditions:\n- **Stride** = 1\n- **Padding** = 0\n- Do not flip the kernel; use the CNN cross-correlation convention.\n- Add the supplied bias to every convolution response.\n- Apply ReLU activation to the resulting values.\n\nFor an input image of size $H \\times W$ and kernel of size $KH \\times KW$, calculate the output dimensions as:\n$$OH = H - KH + 1$$\n$$OW = W - KW + 1$$\n\nFor every valid image patch:\n$$\\text{response} = \\sum (\\text{patch} * \\text{kernel})$$\n\nFinally:\n$$\\text{output} = \\text{ReLU}(\\text{response} + \\text{bias})$$\n\nwhere:\n$$\\text{ReLU}(x) = \\max(0, x)$$\n\nComplete the functions provided in the boilerplate to generate the final feature map.\n\n---\n\n### Input Format\n```text\nH W\nimage row 1\nimage row 2\n...\nimage row H\nKH KW\nkernel row 1\nkernel row 2\n...\nkernel row KH\nbias\n```\n\n---\n\n### Output Format\nFirst print the dimensions of the final feature map:\n```text\nOH OW\n```\nThen print the feature map, one row per line.\n\n---\n\n### Constraints\n- $2 \\le H, W \\le 20$\n- $1 \\le KH \\le H$\n- $1 \\le KW \\le W$\n- Image, kernel, and bias values are integers.\n- Stride is always 1.\n- Padding is always 0.\n- Kernel flipping must not be performed.\n\n---\n\n### Test Case 1\n**Input:**\n```text\n3 3\n1 2 3\n4 5 6\n7 8 9\n2 2\n1 0\n0 -1\n5\n```\n**Output:**\n```text\n2 2\n1 1\n1 1\n```",
    "starterCode": "# Head\nimport numpy as np\n\n# Body\ndef output_dimensions(H, W, KH, KW):\n    # Step 1: Calculate output height and width\n    pass\n\ndef extract_patch(image, row, col, KH, KW):\n    # Step 2: Extract the receptive-field patch\n    pass\n\ndef kernel_response(patch, kernel):\n    # Step 3: Calculate one convolution response\n    pass\n\ndef raw_feature_map(image, kernel):\n    # Step 4: Generate the complete raw feature map\n    pass\n\ndef apply_bias_relu(feature_map, bias):\n    # Step 5: Add bias and apply ReLU\n    pass\n\n# Tail\nif __name__ == \"__main__\":\n    H, W = map(int, input().split())\n    image = np.array([\n        list(map(int, input().split()))\n        for _ in range(H)\n    ])\n    KH, KW = map(int, input().split())\n    kernel = np.array([\n        list(map(int, input().split()))\n        for _ in range(KH)\n    ])\n    bias = int(input())\n    raw = raw_feature_map(image, kernel)\n    output = apply_bias_relu(raw, bias)\n    OH, OW = output.shape\n    print(OH, OW)\n    for row in output:\n        print(\" \".join(map(str, row.astype(int))))\n",
    "solutionCode": "# Head\nimport numpy as np\n\n# Body\ndef output_dimensions(H, W, KH, KW):\n    return H - KH + 1, W - KW + 1\n\ndef extract_patch(image, row, col, KH, KW):\n    return image[row : row + KH, col : col + KW]\n\ndef kernel_response(patch, kernel):\n    return int(np.sum(patch * kernel))\n\ndef raw_feature_map(image, kernel):\n    H, W = image.shape\n    KH, KW = kernel.shape\n    OH, OW = output_dimensions(H, W, KH, KW)\n    raw = np.zeros((OH, OW), dtype=int)\n    for i in range(OH):\n        for j in range(OW):\n            patch = extract_patch(image, i, j, KH, KW)\n            raw[i, j] = kernel_response(patch, kernel)\n    return raw\n\ndef apply_bias_relu(feature_map, bias):\n    return np.maximum(0, feature_map + bias)\n\n# Tail\nif __name__ == \"__main__\":\n    H, W = map(int, input().split())\n    image = np.array([\n        list(map(int, input().split()))\n        for _ in range(H)\n    ])\n    KH, KW = map(int, input().split())\n    kernel = np.array([\n        list(map(int, input().split()))\n        for _ in range(KH)\n    ])\n    bias = int(input())\n    raw = raw_feature_map(image, kernel)\n    output = apply_bias_relu(raw, bias)\n    OH, OW = output.shape\n    print(OH, OW)\n    for row in output:\n        print(\" \".join(map(str, row.astype(int))))\n",
    "entryPoint": "raw_feature_map",
    "sampleTestCases": [
      {
        "name": "Test Case 1 (Sample from PDF)",
        "input": "3 3\n1 2 3\n4 5 6\n7 8 9\n2 2\n1 0\n0 -1\n5",
        "expected": "2 2\n1 1\n1 1"
      },
      {
        "name": "Test Case 2 (3x3 with 1x1 kernel)",
        "input": "3 3\n2 4 6\n8 10 12\n14 16 18\n1 1\n2\n-10",
        "expected": "3 3\n0 0 2\n6 10 14\n18 22 26"
      }
    ],
    "hiddenTestCases": [
      {
        "name": "Hidden Test Case 1 (All zeros negative bias)",
        "input": "3 3\n5 5 5\n5 5 5\n5 5 5\n2 2\n1 1\n1 1\n-25",
        "expected": "2 2\n0 0\n0 0"
      },
      {
        "name": "Hidden Test Case 2 (4x4 with 2x2 edge kernel)",
        "input": "4 4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16\n2 2\n1 -1\n-1 1\n0",
        "expected": "3 3\n0 0 0\n0 0 0\n0 0 0"
      }
    ]
  },
  {
    "id": "t1_p2",
    "testGroup": "test1",
    "testTitle": "Test 1",
    "tabShort": "P2",
    "title": "Problem Description 2: Causal Scaled Dot-Product Self-Attention",
    "tabName": "Problem 2",
    "category": "Transformers / LLM",
    "difficulty": "Medium",
    "tags": [
      "Transformers",
      "Self-Attention",
      "Causal Mask",
      "Softmax",
      "NumPy"
    ],
    "summary": "Implement causal scaled dot-product self-attention from scratch with projection matrices and numerically stable Softmax.",
    "description": "### Problem Description 2\n\nA transformer processes a sequence of $n$ tokens, where each token is represented by $d$ features. \nImplement causal scaled dot-product self-attention from scratch using NumPy.\n\nYou are given an input matrix $X$ and three projection matrices $W_Q$, $W_K$, and $W_V$.\n\nCalculate:\n$$Q = X \\mathbin{@} W_Q$$\n$$K = X \\mathbin{@} W_K$$\n$$V = X \\mathbin{@} W_V$$\n\nThe attention scores are:\n$$\\text{scores} = \\frac{Q \\mathbin{@} K^T}{\\sqrt{d}}$$\n\nThe attention mechanism is causal:\n- A token at position $i$ may attend only to itself and tokens appearing before it ($j \\le i$).\n- Any token appearing after position $i$ ($j > i$) must therefore receive an attention probability of 0.\n- Convert the permitted attention scores into probabilities using row-wise Softmax.\n- The Softmax calculation must remain numerically stable even when attention scores are large.\n\nCalculate the contextual representation as:\n$$\\text{contextual\\_output} = \\text{attention\\_weights} \\mathbin{@} V$$\n\nYour program must output both:\n- The complete attention-weight matrix ($n \\times n$)\n- The contextual representation matrix ($n \\times d$)\n\nDo not use PyTorch, TensorFlow, Hugging Face attention layers, or any built-in attention implementation.\n\n---\n\n### Input Format\n```text\nn d\nX row 1\n...\nX row n\nWQ row 1\n...\nWQ row d\nWK row 1\n...\nWK row d\nWV row 1\n...\nWV row d\n```\n\nWhere:\n- $X = n \\times d$\n- $W_Q = d \\times d$\n- $W_K = d \\times d$\n- $W_V = d \\times d$\n\n---\n\n### Output Format\nPrint the $n \\times n$ attention-weight matrix first.\nThen print the $n \\times d$ contextual representation matrix.\nPrint every value to exactly four decimal places.\nDo not print labels or additional text.\n\n---\n\n### Constraints\n- $1 \\le n \\le 10$\n- $1 \\le d \\le 10$\n- Matrix elements may be positive, negative, zero, or decimal values.\n- Scaling must use $\\sqrt{d}$.\n- Softmax must operate independently on each row.\n- Future-token attention probabilities must be 0.\n- The implementation must handle large attention scores without numerical overflow.\n\n---\n\n### Test Case 1\n**Input:**\n```text\n2 2\n1 0\n0 1\n1 0\n0 1\n1 0\n0 1\n1 0\n0 1\n```\n**Output:**\n```text\n1.0000 0.0000\n0.3302 0.6698\n1.0000 0.0000\n0.3302 0.6698\n```",
    "starterCode": "# Head\nimport numpy as np\n\n# Body\ndef causal_self_attention(X, WQ, WK, WV):\n    \"\"\"\n    Return:\n    attention_weights,\n    contextual_output\n    \"\"\"\n    # Write your complete implementation here\n    pass\n\n# Tail\nif __name__ == \"__main__\":\n    n, d = map(int, input().split())\n    X = np.array([\n        list(map(float, input().split()))\n        for _ in range(n)\n    ], dtype=float)\n    WQ = np.array([\n        list(map(float, input().split()))\n        for _ in range(d)\n    ], dtype=float)\n    WK = np.array([\n        list(map(float, input().split()))\n        for _ in range(d)\n    ], dtype=float)\n    WV = np.array([\n        list(map(float, input().split()))\n        for _ in range(d)\n    ], dtype=float)\n    attention_weights, contextual_output = (\n        causal_self_attention(X, WQ, WK, WV)\n    )\n    for row in attention_weights:\n        print(\" \".join(\n            f\"{value:.4f}\" for value in row\n        ))\n    for row in contextual_output:\n        print(\" \".join(\n            f\"{value:.4f}\" for value in row\n        ))\n",
    "solutionCode": "# Head\nimport numpy as np\n\n# Body\ndef causal_self_attention(X, WQ, WK, WV):\n    n, d = X.shape\n    Q = X @ WQ\n    K = X @ WK\n    V = X @ WV\n    scores = (Q @ K.T) / np.sqrt(d)\n\n    attention_weights = np.zeros((n, n), dtype=float)\n    for i in range(n):\n        row_scores = scores[i, : i + 1]\n        max_score = np.max(row_scores)\n        exp_scores = np.exp(row_scores - max_score)\n        probs = exp_scores / np.sum(exp_scores)\n        attention_weights[i, : i + 1] = probs\n\n    contextual_output = attention_weights @ V\n    return attention_weights, contextual_output\n\n# Tail\nif __name__ == \"__main__\":\n    n, d = map(int, input().split())\n    X = np.array([\n        list(map(float, input().split()))\n        for _ in range(n)\n    ], dtype=float)\n    WQ = np.array([\n        list(map(float, input().split()))\n        for _ in range(d)\n    ], dtype=float)\n    WK = np.array([\n        list(map(float, input().split()))\n        for _ in range(d)\n    ], dtype=float)\n    WV = np.array([\n        list(map(float, input().split()))\n        for _ in range(d)\n    ], dtype=float)\n    attention_weights, contextual_output = (\n        causal_self_attention(X, WQ, WK, WV)\n    )\n    for row in attention_weights:\n        print(\" \".join(\n            f\"{value:.4f}\" for value in row\n        ))\n    for row in contextual_output:\n        print(\" \".join(\n            f\"{value:.4f}\" for value in row\n        ))\n",
    "entryPoint": "causal_self_attention",
    "sampleTestCases": [
      {
        "name": "Test Case 1 (Sample from PDF)",
        "input": "2 2\n1 0\n0 1\n1 0\n0 1\n1 0\n0 1\n1 0\n0 1",
        "expected": "1.0000 0.0000\n0.3302 0.6698\n1.0000 0.0000\n0.3302 0.6698"
      },
      {
        "name": "Test Case 2 (Single Token n=1)",
        "input": "1 2\n2.0 3.0\n1 0\n0 1\n1 0\n0 1\n1 0\n0 1",
        "expected": "1.0000\n2.0000 3.0000"
      }
    ],
    "hiddenTestCases": [
      {
        "name": "Hidden Test Case 1 (3 tokens, 2 dims)",
        "input": "3 2\n1.0 0.5\n-0.5 1.0\n0.0 2.0\n0.5 -0.5\n1.0 0.0\n0.0 1.0\n-1.0 0.5\n1.0 0.0\n0.0 1.0",
        "expected": "1.0000 0.0000 0.0000\n0.6192 0.3808 0.0000\n0.6200 0.3057 0.0743\n1.0000 0.5000\n0.4288 0.6904\n0.4671 0.7643"
      }
    ]
  },
  {
    "id": "t1_p4",
    "testGroup": "test1",
    "testTitle": "Test 1",
    "tabShort": "P4",
    "title": "Problem Description 4: Two-Layer Neural Network Mini-Batch Training Iteration",
    "tabName": "Problem 4",
    "category": "Deep Learning / Optimization",
    "difficulty": "Medium",
    "tags": [
      "Backpropagation",
      "Neural Network",
      "Binary Cross-Entropy",
      "Gradient Descent",
      "NumPy"
    ],
    "summary": "Implement one complete mini-batch training iteration of a two-layer neural network for binary classification.",
    "description": "### Problem Description 4\n\nImplement one complete mini-batch training iteration of a two-layer neural network for binary classification using NumPy.\n\nThe network receives $m$ training samples, each containing $d$ features, and contains $h$ hidden neurons.\nThe hidden layer uses ReLU activation, while the output layer uses Sigmoid activation.\nTraining uses the mean Binary Cross-Entropy loss over the batch.\n\nFor all samples:\n1. Perform forward propagation.\n2. Calculate the mean BCE loss.\n3. Calculate gradients for $W_1$, $b_1$, $W_2$, and $b_2$.\n4. Update all parameters using the supplied learning rate.\n5. Perform another forward pass using the updated parameters.\n\nFor ReLU, use derivative:\n- $1$ when pre-activation $> 0$\n- $0$ when pre-activation $\\le 0$\n\nReturn:\n- Mean loss before the update\n- Updated $W_1$\n- Updated $b_1$\n- Updated $W_2$\n- Updated $b_2$\n- Probabilities after the update\n- Predicted classes after the update\n\nA probability greater than or equal to 0.5 belongs to class 1.\nDo not use automatic differentiation or deep-learning libraries.\n\n---\n\n### Input Format\n```text\nm d h\nX row 1\n...\nX row m\nW1 row 1\n...\nW1 row h\nb1\nW2\nb2\ny1 y2 ... ym\nlearning_rate\n```\n\nWhere:\n- $W_1$ has dimensions $h \\times d$.\n- $b_1$ contains $h$ values.\n- $W_2$ contains $h$ values.\n- $b_2$ is a scalar.\n\n---\n\n### Output Format\n```text\nmean_loss\nupdated W1 rows\nupdated b1\nupdated W2\nupdated b2\nupdated probabilities\npredicted classes\n```\nPrint all floating-point values to exactly four decimal places.\n\n---\n\n### Constraints\n- $1 \\le m, d, h \\le 20$\n- Matrix elements, biases, and learning rate may be positive, negative, zero, or decimal values.\n\n---\n\n### Test Case 1\n**Input:**\n```text\n2 2 2\n1 0\n0 1\n1 0\n0 1\n0 0\n1 -1\n0\n1 0\n0.1\n```\n**Output:**\n```text\n0.3133\n1.0134 0.0000\n0.0000 1.0134\n0.0134 0.0134\n1.0134 -1.0134\n0.0000\n0.7363 0.2637\n1 0\n```",
    "starterCode": "# Head\nimport numpy as np\n\n# Body\ndef train_batch(\n    X,\n    W1,\n    b1,\n    W2,\n    b2,\n    targets,\n    learning_rate\n):\n    \"\"\"\n    Return:\n    loss,\n    updated_W1,\n    updated_b1,\n    updated_W2,\n    updated_b2,\n    updated_probabilities,\n    predicted_classes\n    \"\"\"\n    # Write your complete implementation here\n    pass\n\n# Tail\nif __name__ == \"__main__\":\n    m, d, h = map(int, input().split())\n    X = np.array([\n        list(map(float, input().split()))\n        for _ in range(m)\n    ], dtype=float)\n    W1 = np.array([\n        list(map(float, input().split()))\n        for _ in range(h)\n    ], dtype=float)\n    b1 = np.array(\n        list(map(float, input().split())),\n        dtype=float\n    )\n    W2 = np.array(\n        list(map(float, input().split())),\n        dtype=float\n    )\n    b2 = float(input())\n    targets = np.array(\n        list(map(float, input().split())),\n        dtype=float\n    )\n    learning_rate = float(input())\n    (\n        loss,\n        W1,\n        b1,\n        W2,\n        b2,\n        probabilities,\n        predictions\n    ) = train_batch(\n        X,\n        W1,\n        b1,\n        W2,\n        b2,\n        targets,\n        learning_rate\n    )\n    print(f\"{loss:.4f}\")\n    for row in W1:\n        print(\" \".join(\n            f\"{value:.4f}\" for value in row\n        ))\n    print(\" \".join(\n        f\"{value:.4f}\" for value in b1\n    ))\n    print(\" \".join(\n        f\"{value:.4f}\" for value in W2\n    ))\n    print(f\"{b2:.4f}\")\n    print(\" \".join(\n        f\"{value:.4f}\" for value in probabilities\n    ))\n    print(\" \".join(\n        map(str, predictions.astype(int))\n    ))\n",
    "solutionCode": "# Head\nimport numpy as np\n\n# Body\ndef train_batch(\n    X,\n    W1,\n    b1,\n    W2,\n    b2,\n    targets,\n    learning_rate\n):\n    m, d = X.shape\n    h = len(b1)\n\n    # 1. Forward propagation\n    Z1 = X @ W1.T + b1\n    A1 = np.maximum(0, Z1)\n    Z2 = A1 @ W2 + b2\n    p = 1.0 / (1.0 + np.exp(-Z2))\n\n    # 2. Mean BCE loss\n    p_clipped = np.clip(p, 1e-15, 1.0 - 1e-15)\n    sample_losses = -(targets * np.log(p_clipped) + (1.0 - targets) * np.log(1.0 - p_clipped))\n    loss = float(np.mean(sample_losses))\n\n    # 3. Gradients\n    dZ2 = (p - targets) / m\n    db2 = float(np.sum(dZ2))\n    dW2 = A1.T @ dZ2\n\n    dA1 = np.outer(dZ2, W2)\n    dZ1 = dA1 * (Z1 > 0)\n    db1 = np.sum(dZ1, axis=0)\n    dW1 = dZ1.T @ X\n\n    # 4. Update parameters\n    updated_W1 = W1 - learning_rate * dW1\n    updated_b1 = b1 - learning_rate * db1\n    updated_W2 = W2 - learning_rate * dW2\n    updated_b2 = b2 - learning_rate * db2\n\n    # 5. Forward pass with updated parameters\n    new_Z1 = X @ updated_W1.T + updated_b1\n    new_A1 = np.maximum(0, new_Z1)\n    new_Z2 = new_A1 @ updated_W2 + updated_b2\n    updated_probabilities = 1.0 / (1.0 + np.exp(-new_Z2))\n    predicted_classes = (updated_probabilities >= 0.5).astype(int)\n\n    return (\n        loss,\n        updated_W1,\n        updated_b1,\n        updated_W2,\n        updated_b2,\n        updated_probabilities,\n        predicted_classes\n    )\n\n# Tail\nif __name__ == \"__main__\":\n    m, d, h = map(int, input().split())\n    X = np.array([\n        list(map(float, input().split()))\n        for _ in range(m)\n    ], dtype=float)\n    W1 = np.array([\n        list(map(float, input().split()))\n        for _ in range(h)\n    ], dtype=float)\n    b1 = np.array(\n        list(map(float, input().split())),\n        dtype=float\n    )\n    W2 = np.array(\n        list(map(float, input().split())),\n        dtype=float\n    )\n    b2 = float(input())\n    targets = np.array(\n        list(map(float, input().split())),\n        dtype=float\n    )\n    learning_rate = float(input())\n    (\n        loss,\n        W1,\n        b1,\n        W2,\n        b2,\n        probabilities,\n        predictions\n    ) = train_batch(\n        X,\n        W1,\n        b1,\n        W2,\n        b2,\n        targets,\n        learning_rate\n    )\n    print(f\"{loss:.4f}\")\n    for row in W1:\n        print(\" \".join(\n            f\"{value:.4f}\" for value in row\n        ))\n    print(\" \".join(\n        f\"{value:.4f}\" for value in b1\n    ))\n    print(\" \".join(\n        f\"{value:.4f}\" for value in W2\n    ))\n    print(f\"{b2:.4f}\")\n    print(\" \".join(\n        f\"{value:.4f}\" for value in probabilities\n    ))\n    print(\" \".join(\n        map(str, predictions.astype(int))\n    ))\n",
    "entryPoint": "train_batch",
    "sampleTestCases": [
      {
        "name": "Test Case 1 (Sample from PDF)",
        "input": "2 2 2\n1 0\n0 1\n1 0\n0 1\n0 0\n1 -1\n0\n1 0\n0.1",
        "expected": "0.3133\n1.0134 0.0000\n0.0000 1.0134\n0.0134 0.0134\n1.0134 -1.0134\n0.0000\n0.7363 0.2637\n1 0"
      },
      {
        "name": "Test Case 2 (1 sample, 2 hidden)",
        "input": "1 2 2\n1 1\n0.5 -0.5\n-0.5 0.5\n0.1 -0.1\n1 1\n0\n1\n0.05",
        "expected": "0.6444\n0.5238 -0.4762\n-0.5000 0.5000\n0.1238 -0.1000\n1.0024 1.0000\n0.0238\n0.5487\n1"
      }
    ],
    "hiddenTestCases": [
      {
        "name": "Hidden Test Case 1 (2 samples, 1 hidden neuron)",
        "input": "2 2 1\n1 2\n-1 1\n0.5 0.5\n0.2\n-1.0\n0.5\n0 1\n0.2",
        "expected": "0.4088\n0.5657 0.5037\n0.1806\n-1.0308\n0.5194\n0.2161 0.5980\n0 1"
      }
    ]
  },
  {
    "id": "t1_p6",
    "testGroup": "test1",
    "testTitle": "Test 1",
    "tabShort": "P6",
    "title": "Problem Description 6: RAG Retrieval & Context Construction (Euclidean Distance)",
    "tabName": "Problem 6",
    "category": "LLM / Information Retrieval",
    "difficulty": "Medium",
    "tags": [
      "RAG",
      "Embeddings",
      "Euclidean Distance",
      "Context Budget",
      "NumPy"
    ],
    "summary": "Retrieve and rank document chunks by Euclidean distance against a query embedding and assemble context within a word budget.",
    "description": "### Problem Description 6\n\nImplement the retrieval and context-construction component of a Retrieval-Augmented Generation system.\n\nYou are given one query embedding, $n$ document chunks with their embeddings, the maximum number of retrieval candidates $k$, a maximum permitted embedding distance, and a maximum word budget for the final context.\n\nMeasure query-document distance using Euclidean distance:\n$$\\text{distance} = \\sqrt{\\sum_{i} (\\text{query}[i] - \\text{document\\_embedding}[i])^2}$$\n\nA document is eligible only when:\n$$\\text{distance} \\le \\text{maximum\\_distance}$$\n\nRank eligible documents from smallest to largest distance.\nIf two documents have exactly the same distance, the document having the smaller zero-based original index must appear first.\n\nOnly the first $k$ ranked eligible documents are considered for the final context.\nProcess these candidates in ranked order.\n\nSelect a chunk only if adding all of its whitespace-separated words does not exceed `max_words`.\nIf a chunk does not fit, skip it and continue examining the remaining candidates.\n\nJoin selected chunks using:\n` | `\n\n**Output:**\n- Selected document indices\n- Their Euclidean distances\n- Final context\n\nIf no document is selected, output:\n```text\nNONE\nNONE\nNO_CONTEXT\n```\n\n---\n\n### Input Format\n```text\nn d k\nmaximum_distance max_words\nquery_embedding\ndocument_text_0\nembedding_0\ndocument_text_1\nembedding_1\n...\ndocument_text_n-1\nembedding_n-1\n```\n\n---\n\n### Output Format\nIf documents are selected:\n```text\nselected_indices\nselected_distances\nconstructed_context\n```\nDistances must be printed to exactly four decimal places.\n\nIf none are selected:\n```text\nNONE\nNONE\nNO_CONTEXT\n```\n\n---\n\n### Constraints\n- $1 \\le n \\le 20$\n- $1 \\le d \\le 20$\n- $1 \\le k \\le n$\n- $\\text{maximum\\_distance} \\ge 0$\n- $1 \\le \\text{max\\_words} \\le 100$\n- Document text does not contain `|`.\n\n---\n\n### Test Case 1\n**Input:**\n```text\n4 2 3\n1.1 4\n0 0\nalpha beta\n0 0\ngamma\n1 0\ndelta epsilon\n0 1\nzeta\n2 2\n```\n**Output:**\n```text\n0 1\n0.0000 1.0000\nalpha beta | gamma\n```",
    "starterCode": "# Head\nimport numpy as np\n\n# Body\ndef build_distance_rag_context(\n    query,\n    embeddings,\n    documents,\n    k,\n    maximum_distance,\n    max_words\n):\n    \"\"\"\n    Return:\n    selected_indices,\n    selected_distances,\n    context\n    \"\"\"\n    # Write your complete implementation here\n    pass\n\n# Tail\nif __name__ == \"__main__\":\n    n, d, k = map(int, input().split())\n    maximum_distance, max_words = (\n        input().split()\n    )\n    maximum_distance = float(\n        maximum_distance\n    )\n    max_words = int(max_words)\n    query = np.array(\n        list(map(float, input().split())),\n        dtype=float\n    )\n    documents = []\n    embeddings = []\n    for _ in range(n):\n        documents.append(\n            input().strip()\n        )\n        embeddings.append(\n            list(map(float, input().split()))\n        )\n    embeddings = np.array(\n        embeddings,\n        dtype=float\n    )\n    (\n        selected_indices,\n        selected_distances,\n        context\n    ) = build_distance_rag_context(\n        query,\n        embeddings,\n        documents,\n        k,\n        maximum_distance,\n        max_words\n    )\n    if len(selected_indices) == 0:\n        print(\"NONE\")\n        print(\"NONE\")\n        print(\"NO_CONTEXT\")\n    else:\n        print(\" \".join(\n            map(str, selected_indices)\n        ))\n        print(\" \".join(\n            f\"{value:.4f}\"\n            for value in selected_distances\n        ))\n        print(context)\n",
    "solutionCode": "# Head\nimport numpy as np\n\n# Body\ndef build_distance_rag_context(\n    query,\n    embeddings,\n    documents,\n    k,\n    maximum_distance,\n    max_words\n):\n    n = len(documents)\n    diff = embeddings - query\n    dists = np.sqrt(np.sum(diff ** 2, axis=1))\n\n    # Filter eligible documents\n    eligible = [(dists[i], i) for i in range(n) if dists[i] <= maximum_distance]\n    # Sort: distance ascending, then original index ascending\n    eligible.sort(key=lambda x: (x[0], x[1]))\n\n    candidates = eligible[:k]\n    selected_indices = []\n    selected_distances = []\n    selected_chunks = []\n    current_words = 0\n\n    for d, idx in candidates:\n        text = documents[idx]\n        word_count = len(text.split())\n        if current_words + word_count <= max_words:\n            selected_indices.append(idx)\n            selected_distances.append(d)\n            selected_chunks.append(text)\n            current_words += word_count\n\n    if len(selected_indices) == 0:\n        return [], [], \"\"\n\n    context = \" | \".join(selected_chunks)\n    return selected_indices, selected_distances, context\n\n# Tail\nif __name__ == \"__main__\":\n    n, d, k = map(int, input().split())\n    maximum_distance, max_words = (\n        input().split()\n    )\n    maximum_distance = float(\n        maximum_distance\n    )\n    max_words = int(max_words)\n    query = np.array(\n        list(map(float, input().split())),\n        dtype=float\n    )\n    documents = []\n    embeddings = []\n    for _ in range(n):\n        documents.append(\n            input().strip()\n        )\n        embeddings.append(\n            list(map(float, input().split()))\n        )\n    embeddings = np.array(\n        embeddings,\n        dtype=float\n    )\n    (\n        selected_indices,\n        selected_distances,\n        context\n    ) = build_distance_rag_context(\n        query,\n        embeddings,\n        documents,\n        k,\n        maximum_distance,\n        max_words\n    )\n    if len(selected_indices) == 0:\n        print(\"NONE\")\n        print(\"NONE\")\n        print(\"NO_CONTEXT\")\n    else:\n        print(\" \".join(\n            map(str, selected_indices)\n        ))\n        print(\" \".join(\n            f\"{value:.4f}\"\n            for value in selected_distances\n        ))\n        print(context)\n",
    "entryPoint": "build_distance_rag_context",
    "sampleTestCases": [
      {
        "name": "Test Case 1 (Sample from PDF)",
        "input": "4 2 3\n1.1 4\n0 0\nalpha beta\n0 0\ngamma\n1 0\ndelta epsilon\n0 1\nzeta\n2 2",
        "expected": "0 1\n0.0000 1.0000\nalpha beta | gamma"
      },
      {
        "name": "Test Case 2 (No eligible documents)",
        "input": "3 2 2\n0.1 5\n1 1\ndoc one\n0 0\ndoc two\n2 2\ndoc three\n3 3",
        "expected": "NONE\nNONE\nNO_CONTEXT"
      }
    ],
    "hiddenTestCases": [
      {
        "name": "Hidden Test Case 1 (Word budget skip)",
        "input": "3 2 2\n1.5 2\n0 0\nvery long document text that exceeds budget\n0 0\nshort doc\n1 0\nthird doc\n0.5 0.5",
        "expected": "2\n0.7071\nthird doc"
      }
    ]
  },
  {
    "id": "t1_p7",
    "testGroup": "test1",
    "testTitle": "Test 1",
    "tabShort": "P7",
    "title": "Problem Description 7: Sigmoid Activation & Binary Cross-Entropy Loss",
    "tabName": "Problem 7",
    "category": "Deep Learning / Loss Functions",
    "difficulty": "Easy",
    "tags": [
      "Sigmoid",
      "Binary Cross-Entropy",
      "Loss Function",
      "Classification",
      "NumPy"
    ],
    "summary": "Implement Sigmoid activation, per-sample Binary Cross-Entropy loss, mean batch loss, and binary class predictions.",
    "description": "### Problem Description 7\n\nA binary-classification model produces one raw logit for each of $m$ input samples.\nImplement the output-processing stage using the Sigmoid activation function and Binary Cross-Entropy loss.\n\nFor every logit $z$, calculate:\n$$p = \\frac{1}{1 + \\exp(-z)}$$\n\nFor binary target $y$, calculate:\n$$\\text{loss} = -(y \\cdot \\ln(p) + (1 - y) \\cdot \\ln(1 - p))$$\n\nCalculate the BCE loss separately for every sample.\nThe final loss is:\n$$\\text{mean\\_loss} = \\text{mean of all individual BCE losses}$$\n\nThe predicted class is:\n- $1$ if $p \\ge 0.5$\n- $0$ otherwise\n\nThe implementation must remain numerically stable for large positive and negative logits.\n\n---\n\n### Input Format\n```text\nm\nz1 z2 ... zm\ny1 y2 ... ym\n```\n\nWhere:\n- $m$ is the number of samples\n- The second line contains model logits\n- The third line contains binary target values\n\n---\n\n### Output Format\n```text\np1 p2 ... pm\nL1 L2 ... Lm\nmean_loss\nc1 c2 ... cm\n```\nPrint all floating-point values to exactly four decimal places.\n\n---\n\n### Constraints\n- $1 \\le m \\le 50$\n- $-1000 \\le z[i] \\le 1000$\n- Each target value is either 0 or 1.\n- Use the natural logarithm.\n- A probability exactly equal to 0.5 must be classified as 1.\n\n---\n\n### Test Case 1\n**Input:**\n```text\n3\n0 1 -1\n1 1 0\n```\n**Output:**\n```text\n0.5000 0.7311 0.2689\n0.6931 0.3133 0.3133\n0.4399\n1 1 0\n```",
    "starterCode": "# Head\nimport numpy as np\n\n# Body\ndef sigmoid(logits):\n    # Calculate numerically stable Sigmoid probabilities\n    pass\n\ndef binary_cross_entropy(logits, targets):\n    # Calculate BCE loss for every sample\n    pass\n\ndef mean_loss(losses):\n    # Calculate the mean BCE loss\n    pass\n\ndef classify(probabilities):\n    # Convert probabilities into binary predictions\n    pass\n\ndef process_batch(logits, targets):\n    # Return probabilities, losses, mean loss and predictions\n    pass\n\n# Tail\nif __name__ == \"__main__\":\n    m = int(input())\n    logits = np.array(\n        list(map(float, input().split())),\n        dtype=float\n    )\n    targets = np.array(\n        list(map(int, input().split())),\n        dtype=int\n    )\n    (\n        probabilities,\n        losses,\n        average_loss,\n        predictions\n    ) = process_batch(\n        logits,\n        targets\n    )\n    print(\" \".join(\n        f\"{value:.4f}\"\n        for value in probabilities\n    ))\n    print(\" \".join(\n        f\"{value:.4f}\"\n        for value in losses\n    ))\n    print(f\"{average_loss:.4f}\")\n    print(\" \".join(\n        map(str, predictions)\n    ))\n",
    "solutionCode": "# Head\nimport numpy as np\n\n# Body\ndef sigmoid(logits):\n    return np.where(\n        logits >= 0,\n        1.0 / (1.0 + np.exp(-logits)),\n        np.exp(logits) / (1.0 + np.exp(logits))\n    )\n\ndef binary_cross_entropy(logits, targets):\n    return np.maximum(logits, 0) - logits * targets + np.log(1.0 + np.exp(-np.abs(logits)))\n\ndef mean_loss(losses):\n    return float(np.mean(losses))\n\ndef classify(probabilities):\n    return (probabilities >= 0.5).astype(int)\n\ndef process_batch(logits, targets):\n    probs = sigmoid(logits)\n    losses = binary_cross_entropy(logits, targets)\n    avg_loss = mean_loss(losses)\n    preds = classify(probs)\n    return probs, losses, avg_loss, preds\n\n# Tail\nif __name__ == \"__main__\":\n    m = int(input())\n    logits = np.array(\n        list(map(float, input().split())),\n        dtype=float\n    )\n    targets = np.array(\n        list(map(int, input().split())),\n        dtype=int\n    )\n    (\n        probabilities,\n        losses,\n        average_loss,\n        predictions\n    ) = process_batch(\n        logits,\n        targets\n    )\n    print(\" \".join(\n        f\"{value:.4f}\"\n        for value in probabilities\n    ))\n    print(\" \".join(\n        f\"{value:.4f}\"\n        for value in losses\n    ))\n    print(f\"{average_loss:.4f}\")\n    print(\" \".join(\n        map(str, predictions)\n    ))\n",
    "entryPoint": "process_batch",
    "sampleTestCases": [
      {
        "name": "Test Case 1 (Sample from PDF)",
        "input": "3\n0 1 -1\n1 1 0",
        "expected": "0.5000 0.7311 0.2689\n0.6931 0.3133 0.3133\n0.4399\n1 1 0"
      },
      {
        "name": "Test Case 2 (Large Logits Stability)",
        "input": "4\n10.0 -10.0 0.5 -0.5\n1 0 1 0",
        "expected": "1.0000 0.0000 0.6225 0.3775\n0.0000 0.0000 0.4741 0.4741\n0.2371\n1 0 1 0"
      }
    ],
    "hiddenTestCases": [
      {
        "name": "Hidden Test Case 1 (Boundary 0.5 classification)",
        "input": "2\n0.0 0.0\n1 0",
        "expected": "0.5000 0.5000\n0.6931 0.6931\n0.6931\n1 1"
      }
    ]
  },
  {
    "id": "t1_p10",
    "testGroup": "test1",
    "testTitle": "Test 1",
    "tabShort": "P10",
    "title": "Problem Description 10: RAG Retrieval & Context Construction (Dot-Product Relevance)",
    "tabName": "Problem 10",
    "category": "LLM / Information Retrieval",
    "difficulty": "Medium",
    "tags": [
      "RAG",
      "Embeddings",
      "Dot Product",
      "Context Budget",
      "NumPy"
    ],
    "summary": "Retrieve and rank document chunks using embedding dot-product relevance scores and assemble context within a word budget.",
    "description": "### Problem Description 10\n\nImplement the retrieval and context-construction component of a Retrieval-Augmented Generation system using embedding dot-product relevance.\n\nYou are given:\n- One query embedding\n- $n$ document chunks with their embeddings\n- Maximum number of retrieval candidates $k$\n- Minimum permitted relevance score\n- Word budget for the final context\n\nCalculate document relevance using:\n$$\\text{score} = \\text{query} \\mathbin{@} \\text{document\\_embedding}$$\n\nA document is eligible only when:\n$$\\text{score} \\ge \\text{minimum\\_score}$$\n\nRank eligible documents from highest to lowest score.\nIf two documents have exactly the same score, the document with the smaller original zero-based index must rank first.\n\nOnly the first $k$ ranked eligible documents may be considered for the final context.\nProcess those candidates in ranked order.\n\nA chunk may be selected only when all its whitespace-separated words fit within the remaining `max_words` budget.\nIf a chunk does not fit, skip it and continue examining the remaining candidates.\n\nJoin selected document chunks using:\n` | `\n\n**Output:**\n- Selected document indices\n- Their relevance scores\n- Resulting context\n\nIf no document is selected, print exactly:\n```text\nNONE\nNONE\nNO_CONTEXT\n```\n\n---\n\n### Input Format\n```text\nn d k\nminimum_score max_words\nquery_embedding\ndocument_text_0\nembedding_0\ndocument_text_1\nembedding_1\n...\ndocument_text_n-1\nembedding_n-1\n```\n\n---\n\n### Output Format\nWhen documents are selected:\n```text\nselected_indices\nselected_scores\nconstructed_context\n```\nPrint scores to exactly four decimal places.\n\nIf no document is selected:\n```text\nNONE\nNONE\nNO_CONTEXT\n```\n\n---\n\n### Constraints\n- $1 \\le n \\le 20$\n- $1 \\le d \\le 20$\n- $1 \\le k \\le n$\n- $1 \\le \\text{max\\_words} \\le 100$\n- Document text will not contain `|`.\n\n---\n\n### Test Case 1\n**Input:**\n```text\n4 2 3\n0.5 4\n1 0\nalpha beta\n1 0\ngamma\n0.8 0.2\ndelta epsilon\n0 1\nzeta\n1 0\n```\n**Output:**\n```text\n0 3 1\n1.0000 1.0000 0.8000\nalpha beta | zeta | gamma\n```",
    "starterCode": "# Head\nimport numpy as np\n\n# Body\ndef build_dot_product_rag(\n    query,\n    embeddings,\n    documents,\n    k,\n    minimum_score,\n    max_words\n):\n    \"\"\"\n    Return:\n    selected_indices,\n    selected_scores,\n    context\n    \"\"\"\n    # Write your complete implementation here\n    pass\n\n# Tail\nif __name__ == \"__main__\":\n    n, d, k = map(int, input().split())\n    minimum_score, max_words = (\n        input().split()\n    )\n    minimum_score = float(\n        minimum_score\n    )\n    max_words = int(max_words)\n    query = np.array(\n        list(map(float, input().split())),\n        dtype=float\n    )\n    documents = []\n    embeddings = []\n    for _ in range(n):\n        documents.append(\n            input().strip()\n        )\n        embeddings.append(\n            list(map(float, input().split()))\n        )\n    embeddings = np.array(\n        embeddings,\n        dtype=float\n    )\n    (\n        selected_indices,\n        selected_scores,\n        context\n    ) = build_dot_product_rag(\n        query,\n        embeddings,\n        documents,\n        k,\n        minimum_score,\n        max_words\n    )\n    if len(selected_indices) == 0:\n        print(\"NONE\")\n        print(\"NONE\")\n        print(\"NO_CONTEXT\")\n    else:\n        print(\" \".join(\n            map(str, selected_indices)\n        ))\n        print(\" \".join(\n            f\"{value:.4f}\"\n            for value in selected_scores\n        ))\n        print(context)\n",
    "solutionCode": "# Head\nimport numpy as np\n\n# Body\ndef build_dot_product_rag(\n    query,\n    embeddings,\n    documents,\n    k,\n    minimum_score,\n    max_words\n):\n    n = len(documents)\n    scores = embeddings @ query\n\n    # Filter eligible documents\n    eligible = [(scores[i], i) for i in range(n) if scores[i] >= minimum_score]\n    # Sort: score descending, then original index ascending\n    eligible.sort(key=lambda x: (-x[0], x[1]))\n\n    candidates = eligible[:k]\n    selected_indices = []\n    selected_scores = []\n    selected_chunks = []\n    current_words = 0\n\n    for score, idx in candidates:\n        text = documents[idx]\n        word_count = len(text.split())\n        if current_words + word_count <= max_words:\n            selected_indices.append(idx)\n            selected_scores.append(score)\n            selected_chunks.append(text)\n            current_words += word_count\n\n    if len(selected_indices) == 0:\n        return [], [], \"\"\n\n    context = \" | \".join(selected_chunks)\n    return selected_indices, selected_scores, context\n\n# Tail\nif __name__ == \"__main__\":\n    n, d, k = map(int, input().split())\n    minimum_score, max_words = (\n        input().split()\n    )\n    minimum_score = float(\n        minimum_score\n    )\n    max_words = int(max_words)\n    query = np.array(\n        list(map(float, input().split())),\n        dtype=float\n    )\n    documents = []\n    embeddings = []\n    for _ in range(n):\n        documents.append(\n            input().strip()\n        )\n        embeddings.append(\n            list(map(float, input().split()))\n        )\n    embeddings = np.array(\n        embeddings,\n        dtype=float\n    )\n    (\n        selected_indices,\n        selected_scores,\n        context\n    ) = build_dot_product_rag(\n        query,\n        embeddings,\n        documents,\n        k,\n        minimum_score,\n        max_words\n    )\n    if len(selected_indices) == 0:\n        print(\"NONE\")\n        print(\"NONE\")\n        print(\"NO_CONTEXT\")\n    else:\n        print(\" \".join(\n            map(str, selected_indices)\n        ))\n        print(\" \".join(\n            f\"{value:.4f}\"\n            for value in selected_scores\n        ))\n        print(context)\n",
    "entryPoint": "build_dot_product_rag",
    "sampleTestCases": [
      {
        "name": "Test Case 1 (Sample from PDF)",
        "input": "4 2 3\n0.5 4\n1 0\nalpha beta\n1 0\ngamma\n0.8 0.2\ndelta epsilon\n0 1\nzeta\n1 0",
        "expected": "0 3 1\n1.0000 1.0000 0.8000\nalpha beta | zeta | gamma"
      },
      {
        "name": "Test Case 2 (No eligible documents)",
        "input": "3 2 2\n5.0 10\n1 1\ndoc one\n1 0\ndoc two\n0 1\ndoc three\n1 1",
        "expected": "NONE\nNONE\nNO_CONTEXT"
      }
    ],
    "hiddenTestCases": [
      {
        "name": "Hidden Test Case 1 (Word budget skip candidate)",
        "input": "3 2 2\n0.5 2\n1 0\nlong text exceeding limit\n1 0\nfits\n0.8 0.2\nalso fits\n0.5 0.5",
        "expected": "1\n0.8000\nfits"
      }
    ]
  },
  {
    "id": "t2_q2",
    "testGroup": "test2",
    "testTitle": "Test 2",
    "tabShort": "Q2",
    "title": "Q2. Implement masked scaled dot-product self-attention from scratch using NumPy.",
    "tabName": "Q2: Masked Attention",
    "category": "Transformers / Attention",
    "difficulty": "Medium",
    "tags": [
      "Transformers",
      "Masked Attention",
      "Softmax",
      "NumPy"
    ],
    "summary": "Implement masked scaled dot-product self-attention where an attention mask determines allowed vs. blocked token positions.",
    "description": "### Q2. Implement masked scaled dot-product self-attention from scratch using NumPy.\n\nA sequence contains $n$ tokens, each represented using $d$ features. You are given the input matrix $X$, query, key, and value projection matrices $W_Q$, $W_K$, and $W_V$, and an $n \\times n$ binary attention mask.\n\nGenerate:\n$$Q = X \\mathbin{@} W_Q, \\quad K = X \\mathbin{@} W_K, \\quad V = X \\mathbin{@} W_V$$\n\nThe scaled attention-score matrix is:\n$$\\text{scores} = \\frac{Q \\mathbin{@} K^T}{\\sqrt{d}}$$\n\nThe supplied mask determines which token pairs may participate in attention:\n- `1` means that the position is allowed.\n- `0` means that the position is blocked and must receive attention probability `0`.\n\nEvery mask row contains at least one allowed position. Apply a numerically stable row-wise Softmax over only the allowed positions and generate the final contextual representation from the value matrix.\n\nOutput the complete attention-weight matrix followed by the contextual representation matrix. Do not use built-in attention implementations.\n\n---\n\n### Input Format\n```text\nn d\nX rows\nd rows of WQ\nd rows of WK\nd rows of WV\nn rows of attention mask\n```\n\n---\n\n### Output Format\nPrint:\n- The $n \\times n$ attention-weight matrix\n- The $n \\times d$ contextual-output matrix\n\nAll floating-point values must be printed to exactly four decimal places.\n\n---\n\n### Constraints\n- $1 \\le n \\le 10$\n- $1 \\le d \\le 10$\n- Each mask value is either 0 or 1.\n- Every mask row contains at least one 1.\n- Scaling must use $\\sqrt{d}$.\n- Blocked positions must have probability exactly 0.\n\n---\n\n### Test Case 1\n**Input:**\n```text\n2 2\n1.0 0.0\n0.0 1.0\n1.0 0.0\n0.0 1.0\n1.0 0.0\n0.0 1.0\n1.0 0.0\n0.0 1.0\n1 0\n1 1\n```\n**Output:**\n```text\n1.0000 0.0000\n0.3302 0.6698\n1.0000 0.0000\n0.3302 0.6698\n```",
    "starterCode": "# Head\nimport numpy as np\n\n# Body\ndef masked_self_attention(\n    X,\n    WQ,\n    WK,\n    WV,\n    mask\n):\n    \"\"\"\n    Return:\n    attention_weights,\n    contextual_output\n    \"\"\"\n    # Write your complete implementation here\n    pass\n\n# Tail\nif __name__ == \"__main__\":\n    n, d = map(int, input().split())\n    X = np.array([\n        list(map(float, input().split()))\n        for _ in range(n)\n    ])\n    WQ = np.array([\n        list(map(float, input().split()))\n        for _ in range(d)\n    ])\n    WK = np.array([\n        list(map(float, input().split()))\n        for _ in range(d)\n    ])\n    WV = np.array([\n        list(map(float, input().split()))\n        for _ in range(d)\n    ])\n    mask = np.array([\n        list(map(int, input().split()))\n        for _ in range(n)\n    ])\n    weights, output = masked_self_attention(\n        X,\n        WQ,\n        WK,\n        WV,\n        mask\n    )\n    for row in weights:\n        print(\" \".join(\n            f\"{value:.4f}\" for value in row\n        ))\n    for row in output:\n        print(\" \".join(\n            f\"{value:.4f}\" for value in row\n        ))\n",
    "solutionCode": "# Head\nimport numpy as np\n\n# Body\ndef masked_self_attention(\n    X,\n    WQ,\n    WK,\n    WV,\n    mask\n):\n    n, d = X.shape\n    Q = X @ WQ\n    K = X @ WK\n    V = X @ WV\n    scores = (Q @ K.T) / np.sqrt(d)\n\n    attention_weights = np.zeros((n, n), dtype=float)\n    for i in range(n):\n        allowed = (mask[i] == 1)\n        row_scores = scores[i, allowed]\n        max_val = np.max(row_scores)\n        exp_vals = np.exp(row_scores - max_val)\n        probs = exp_vals / np.sum(exp_vals)\n        attention_weights[i, allowed] = probs\n\n    contextual_output = attention_weights @ V\n    return attention_weights, contextual_output\n\n# Tail\nif __name__ == \"__main__\":\n    n, d = map(int, input().split())\n    X = np.array([\n        list(map(float, input().split()))\n        for _ in range(n)\n    ])\n    WQ = np.array([\n        list(map(float, input().split()))\n        for _ in range(d)\n    ])\n    WK = np.array([\n        list(map(float, input().split()))\n        for _ in range(d)\n    ])\n    WV = np.array([\n        list(map(float, input().split()))\n        for _ in range(d)\n    ])\n    mask = np.array([\n        list(map(int, input().split()))\n        for _ in range(n)\n    ])\n    weights, output = masked_self_attention(\n        X,\n        WQ,\n        WK,\n        WV,\n        mask\n    )\n    for row in weights:\n        print(\" \".join(\n            f\"{value:.4f}\" for value in row\n        ))\n    for row in output:\n        print(\" \".join(\n            f\"{value:.4f}\" for value in row\n        ))\n",
    "entryPoint": "masked_self_attention",
    "sampleTestCases": [
      {
        "name": "Test Case 1 (Causal Lower-Triangular Mask)",
        "input": "2 2\n1.0 0.0\n0.0 1.0\n1.0 0.0\n0.0 1.0\n1.0 0.0\n0.0 1.0\n1.0 0.0\n0.0 1.0\n1 0\n1 1",
        "expected": "1.0000 0.0000\n0.3302 0.6698\n1.0000 0.0000\n0.3302 0.6698"
      },
      {
        "name": "Test Case 2 (3 Tokens Sparse Mask)",
        "input": "3 2\n1.0 1.0\n0.0 1.0\n-1.0 0.0\n0.5 0.0\n0.0 0.5\n0.5 0.0\n0.0 0.5\n1.0 0.0\n0.0 1.0\n1 0 0\n0 1 0\n1 0 1",
        "expected": "1.0000 0.0000 0.0000\n0.0000 1.0000 0.0000\n0.4125 0.0000 0.5875\n1.0000 1.0000\n0.0000 1.0000\n-0.1750 0.4125"
      }
    ],
    "hiddenTestCases": [
      {
        "name": "Hidden Test Case 1 (All allowed mask)",
        "input": "2 2\n1.0 2.0\n2.0 1.0\n1.0 0.0\n0.0 1.0\n1.0 0.0\n0.0 1.0\n1.0 0.0\n0.0 1.0\n1 1\n1 1",
        "expected": "0.6698 0.3302\n0.3302 0.6698\n1.3302 1.6698\n1.6698 1.3302"
      }
    ]
  },
  {
    "id": "t2_q4",
    "testGroup": "test2",
    "testTitle": "Test 2",
    "tabShort": "Q4",
    "title": "Q4. Implement a perceptron classifier for multiple input samples using a supplied threshold.",
    "tabName": "Q4: Perceptron Classifier",
    "category": "Machine Learning / Perceptron",
    "difficulty": "Easy",
    "tags": [
      "Perceptron",
      "Binary Classification",
      "Threshold",
      "NumPy"
    ],
    "summary": "Implement a perceptron classifier for multiple input samples using a custom decision threshold.",
    "description": "### Q4. Implement a perceptron classifier for multiple input samples using a supplied threshold.\n\nUnlike a standard perceptron that uses zero as its decision boundary, this classifier uses a supplied threshold.\nFor each input sample $X = [x_1, x_2, \\dots, x_d]$ with weights $W = [w_1, w_2, \\dots, w_d]$ and bias $b$, calculate the score as:\n$$\\text{score} = (x_1 \\cdot w_1) + (x_2 \\cdot w_2) + \\dots + (x_d \\cdot w_d) + b$$\n\nThe predicted class is:\n- `1` if $\\text{score} \\ge \\text{threshold}$\n- `0` otherwise\n\nComplete the functions in the boilerplate so that the classifier correctly processes all input samples.\n\n---\n\n### Input Format\n```text\nn d\nx11 x12 ... x1d\n...\nxn1 xn2 ... xnd\nw1 w2 ... wd\nbias\nthreshold\n```\n\nWhere:\n- $n$ is the number of input samples.\n- $d$ is the number of features in each sample.\n- The next $n$ lines contain the input samples.\n- The following line contains the $d$ weights.\n- The next line contains the bias.\n- The final line contains the threshold.\n\n---\n\n### Output Format\nPrint the predicted classes separated by spaces:\n```text\np1 p2 ... pn\n```\n\n---\n\n### Constraints\n- $1 \\le n \\le 100$\n- $1 \\le d \\le 20$\n- Inputs, weights, bias, and threshold may contain decimal values.\n- A score exactly equal to the threshold must be classified as 1.\n\n---\n\n### Test Case 1\n**Input:**\n```text\n3 2\n1.0 2.0\n-1.0 1.0\n0.0 0.0\n0.5 -0.5\n1.0\n0.5\n```\n**Output:**\n```text\n1 0 1\n```",
    "starterCode": "# Head\nimport numpy as np\n\n# Body\ndef weighted_products(sample, weights):\n    # Return element-wise weighted products\n    pass\n\ndef linear_score(products, bias):\n    # Return weighted sum after adding bias\n    pass\n\ndef threshold_activation(score, threshold):\n    # Return the predicted class\n    pass\n\ndef predict_one(sample, weights, bias, threshold):\n    # Predict one sample\n    pass\n\ndef predict_batch(X, weights, bias, threshold):\n    # Predict all samples\n    pass\n\n# Tail\nif __name__ == \"__main__\":\n    n, d = map(int, input().split())\n    X = np.array([\n        list(map(float, input().split()))\n        for _ in range(n)\n    ])\n    weights = np.array(\n        list(map(float, input().split()))\n    )\n    bias = float(input())\n    threshold = float(input())\n    predictions = predict_batch(\n        X, weights, bias, threshold\n    )\n    print(\" \".join(map(str, predictions)))\n",
    "solutionCode": "# Head\nimport numpy as np\n\n# Body\ndef weighted_products(sample, weights):\n    return sample * weights\n\ndef linear_score(products, bias):\n    return float(np.sum(products) + bias)\n\ndef threshold_activation(score, threshold):\n    return 1 if score >= threshold else 0\n\ndef predict_one(sample, weights, bias, threshold):\n    products = weighted_products(sample, weights)\n    score = linear_score(products, bias)\n    return threshold_activation(score, threshold)\n\ndef predict_batch(X, weights, bias, threshold):\n    return [predict_one(sample, weights, bias, threshold) for sample in X]\n\n# Tail\nif __name__ == \"__main__\":\n    n, d = map(int, input().split())\n    X = np.array([\n        list(map(float, input().split()))\n        for _ in range(n)\n    ])\n    weights = np.array(\n        list(map(float, input().split()))\n    )\n    bias = float(input())\n    threshold = float(input())\n    predictions = predict_batch(\n        X, weights, bias, threshold\n    )\n    print(\" \".join(map(str, predictions)))\n",
    "entryPoint": "predict_batch",
    "sampleTestCases": [
      {
        "name": "Test Case 1 (Sample 3 points)",
        "input": "3 2\n1.0 2.0\n-1.0 1.0\n0.0 0.0\n0.5 -0.5\n1.0\n0.5",
        "expected": "1 0 1"
      },
      {
        "name": "Test Case 2 (Exact threshold boundary)",
        "input": "2 3\n1.0 1.0 1.0\n0.0 0.0 0.0\n1.0 2.0 3.0\n-6.0\n0.0",
        "expected": "1 0"
      }
    ],
    "hiddenTestCases": [
      {
        "name": "Hidden Test Case 1 (4 samples negative threshold)",
        "input": "4 2\n0.5 0.5\n-1.0 -2.0\n2.0 -1.0\n0.0 1.0\n-1.0 2.0\n-0.5\n-1.0",
        "expected": "1 0 0 1"
      }
    ]
  },
  {
    "id": "t2_q6",
    "testGroup": "test2",
    "testTitle": "Test 2",
    "tabShort": "Q6",
    "title": "Q6. Implement one complete training iteration of a two-layer neural network for multi-class classification using NumPy.",
    "tabName": "Q6: Two-Layer Multiclass Training",
    "category": "Deep Learning / Optimization",
    "difficulty": "Medium",
    "tags": [
      "Backpropagation",
      "Multiclass",
      "Softmax",
      "Cross-Entropy",
      "NumPy"
    ],
    "summary": "Perform forward propagation, compute categorical cross-entropy loss, backpropagate gradients for W1, b1, W2, b2, and update weights.",
    "description": "### Q6. Implement one complete training iteration of a two-layer neural network for multi-class classification using NumPy.\n\nThe network receives one input vector containing $d$ features and contains $h$ hidden neurons followed by $c$ output neurons. The hidden layer uses ReLU activation, while the output layer uses Softmax. Training uses cross-entropy loss for the supplied target-class index.\n\nPerform complete forward propagation, calculate the loss, determine the gradients of $W_1$, $b_1$, $W_2$, and $b_2$ using backpropagation, and update all parameters using the supplied learning rate.\n\nFor ReLU, its derivative must be 1 only when the corresponding hidden pre-activation is strictly greater than zero and 0 otherwise.\n\nAfter the parameter update, perform another forward pass and return the updated class probabilities and predicted class. If multiple classes have the same maximum probability, select the smaller class index.\n\nDo not use PyTorch, TensorFlow, automatic differentiation, or neural-network libraries.\n\n---\n\n### Input Format\n```text\nd h c\nX\nh rows of W1\nb1\nc rows of W2\nb2\ntarget\nlearning_rate\n```\n\n---\n\n### Output Format\nPrint:\n```text\nloss\nupdated W1 rows\nupdated b1\nupdated W2 rows\nupdated b2\nupdated probabilities\npredicted_class\n```\nPrint all floating-point values to exactly four decimal places.\n\n---\n\n### Test Case 1\n**Input:**\n```text\n2 2 2\n1.0 0.5\n1.0 -1.0\n0.5 0.5\n0.0 0.0\n1.0 0.0\n0.0 1.0\n0.0 0.0\n0\n0.1\n```\n**Output:**\n```text\n0.8259\n1.0562 -0.9719\n0.4438 0.4719\n0.0562 -0.0562\n1.0281 0.0422\n-0.0281 0.9578\n0.0562 -0.0562\n0.5506 0.4494\n0\n```",
    "starterCode": "# Head\nimport numpy as np\n\n# Body\ndef train_multiclass(\n    X,\n    W1,\n    b1,\n    W2,\n    b2,\n    target,\n    learning_rate\n):\n    \"\"\"\n    Return:\n    loss,\n    updated_W1,\n    updated_b1,\n    updated_W2,\n    updated_b2,\n    updated_probabilities,\n    predicted_class\n    \"\"\"\n    # Write your complete implementation here\n    pass\n\n# Tail\nif __name__ == \"__main__\":\n    d, h, c = map(int, input().split())\n    X = np.array(\n        list(map(float, input().split())),\n        dtype=float\n    )\n    W1 = np.array([\n        list(map(float, input().split()))\n        for _ in range(h)\n    ], dtype=float)\n    b1 = np.array(\n        list(map(float, input().split())),\n        dtype=float\n    )\n    W2 = np.array([\n        list(map(float, input().split()))\n        for _ in range(c)\n    ], dtype=float)\n    b2 = np.array(\n        list(map(float, input().split())),\n        dtype=float\n    )\n    target = int(input())\n    learning_rate = float(input())\n    (\n        loss,\n        W1,\n        b1,\n        W2,\n        b2,\n        probabilities,\n        prediction\n    ) = train_multiclass(\n        X, W1, b1, W2, b2,\n        target, learning_rate\n    )\n    print(f\"{loss:.4f}\")\n    for row in W1:\n        print(\" \".join(\n            f\"{value:.4f}\" for value in row\n        ))\n    print(\" \".join(\n        f\"{value:.4f}\" for value in b1\n    ))\n    for row in W2:\n        print(\" \".join(\n            f\"{value:.4f}\" for value in row\n        ))\n    print(\" \".join(\n        f\"{value:.4f}\" for value in b2\n    ))\n    print(\" \".join(\n        f\"{value:.4f}\" for value in probabilities\n    ))\n    print(prediction)\n",
    "solutionCode": "# Head\nimport numpy as np\n\n# Body\ndef train_multiclass(\n    X,\n    W1,\n    b1,\n    W2,\n    b2,\n    target,\n    learning_rate\n):\n    # Forward pass\n    z1 = W1 @ X + b1\n    a1 = np.maximum(0, z1)\n    z2 = W2 @ a1 + b2\n    s = z2 - np.max(z2)\n    exp_s = np.exp(s)\n    probabilities = exp_s / np.sum(exp_s)\n    loss = float(-np.log(np.clip(probabilities[target], 1e-15, 1.0)))\n\n    # Backprop\n    dz2 = probabilities.copy()\n    dz2[target] -= 1.0\n    db2 = dz2\n    dW2 = np.outer(dz2, a1)\n\n    da1 = W2.T @ dz2\n    dz1 = da1 * (z1 > 0)\n    db1 = dz1\n    dW1 = np.outer(dz1, X)\n\n    # Updates\n    updated_W1 = W1 - learning_rate * dW1\n    updated_b1 = b1 - learning_rate * db1\n    updated_W2 = W2 - learning_rate * dW2\n    updated_b2 = b2 - learning_rate * db2\n\n    # Second forward pass\n    new_z1 = updated_W1 @ X + updated_b1\n    new_a1 = np.maximum(0, new_z1)\n    new_z2 = updated_W2 @ new_a1 + updated_b2\n    s_new = new_z2 - np.max(new_z2)\n    exp_new = np.exp(s_new)\n    updated_probabilities = exp_new / np.sum(exp_new)\n    predicted_class = int(np.argmax(updated_probabilities))\n\n    return (\n        loss,\n        updated_W1,\n        updated_b1,\n        updated_W2,\n        updated_b2,\n        updated_probabilities,\n        predicted_class\n    )\n\n# Tail\nif __name__ == \"__main__\":\n    d, h, c = map(int, input().split())\n    X = np.array(\n        list(map(float, input().split())),\n        dtype=float\n    )\n    W1 = np.array([\n        list(map(float, input().split()))\n        for _ in range(h)\n    ], dtype=float)\n    b1 = np.array(\n        list(map(float, input().split())),\n        dtype=float\n    )\n    W2 = np.array([\n        list(map(float, input().split()))\n        for _ in range(c)\n    ], dtype=float)\n    b2 = np.array(\n        list(map(float, input().split())),\n        dtype=float\n    )\n    target = int(input())\n    learning_rate = float(input())\n    (\n        loss,\n        W1,\n        b1,\n        W2,\n        b2,\n        probabilities,\n        prediction\n    ) = train_multiclass(\n        X, W1, b1, W2, b2,\n        target, learning_rate\n    )\n    print(f\"{loss:.4f}\")\n    for row in W1:\n        print(\" \".join(\n            f\"{value:.4f}\" for value in row\n        ))\n    print(\" \".join(\n        f\"{value:.4f}\" for value in b1\n    ))\n    for row in W2:\n        print(\" \".join(\n            f\"{value:.4f}\" for value in row\n        ))\n    print(\" \".join(\n        f\"{value:.4f}\" for value in b2\n    ))\n    print(\" \".join(\n        f\"{value:.4f}\" for value in probabilities\n    ))\n    print(prediction)\n",
    "entryPoint": "train_multiclass",
    "sampleTestCases": [
      {
        "name": "Test Case 1 (2 in, 2 hidden, 2 classes)",
        "input": "2 2 2\n1.0 0.5\n1.0 -1.0\n0.5 0.5\n0.0 0.0\n1.0 0.0\n0.0 1.0\n0.0 0.0\n0\n0.1",
        "expected": "0.8259\n1.0562 -0.9719\n0.4438 0.4719\n0.0562 -0.0562\n1.0281 0.0422\n-0.0281 0.9578\n0.0562 -0.0562\n0.5506 0.4494\n0"
      }
    ],
    "hiddenTestCases": [
      {
        "name": "Hidden Test Case 1 (3 in, 2 hidden, 3 classes)",
        "input": "3 2 3\n1.0 0.0 -1.0\n0.5 0.5 0.0\n-0.5 0.5 0.5\n0.1 -0.1\n1.0 0.0\n0.0 1.0\n-1.0 -1.0\n0.0 0.0 0.0\n1\n0.2",
        "expected": "1.2152\n0.4245 0.5000 0.0755\n-0.5000 0.5000 0.5000\n0.0245 -0.1000\n0.9351 0.0000\n0.0844 1.0000\n-1.0195 -1.0000\n-0.1081 0.1407 -0.0326\n0.4076 0.3805 0.2119\n0"
      }
    ]
  },
  {
    "id": "t2_q8",
    "testGroup": "test2",
    "testTitle": "Test 2",
    "tabShort": "Q8",
    "title": "Q8. Implement the output-processing pipeline of a multi-class neural network.",
    "tabName": "Q8: Softmax & Loss Pipeline",
    "category": "Deep Learning / Loss Functions",
    "difficulty": "Easy",
    "tags": [
      "Softmax",
      "Cross-Entropy",
      "Logits",
      "NumPy"
    ],
    "summary": "Implement stabilized logits, exponential conversion, normalized softmax probabilities, and cross-entropy loss.",
    "description": "### Q8. Implement the output-processing pipeline of a multi-class neural network.\n\nThe network produces $k$ logits. These logits must first be stabilised, converted into exponential values, normalised into Softmax probabilities, and then used to calculate the cross-entropy loss for the correct class.\n\nFor each logit $z[i]$, first stabilise it as:\n$$s[i] = z[i] - \\max(z)$$\n\nThen compute the exponential value:\n$$e[i] = \\exp(s[i])$$\n\nThe Softmax probability for each class is:\n$$p[i] = \\frac{e[i]}{\\sum e}$$\n\nFor the target class $t$, the cross-entropy loss is:\n$$L = -\\ln(p[t])$$\n\nComplete the five functions provided in the boilerplate.\n\n---\n\n### Input Format\n```text\nk\nz1 z2 ... zk\ntarget\n```\n\nWhere:\n- $k$ is the number of classes.\n- The second line contains $k$ logits.\n- `target` is the zero-based index of the correct class.\n\n---\n\n### Output Format\nFirst line: Softmax probabilities rounded to exactly four decimal places.\nSecond line: Cross-entropy loss rounded to exactly four decimal places.\n```text\np1 p2 ... pk\nloss\n```\n\n---\n\n### Constraints\n- $2 \\le k \\le 20$\n- $-10000 \\le z[i] \\le 10000$\n- $0 \\le \\text{target} < k$\n- Use the natural logarithm.\n- Print all floating-point outputs to exactly four decimal places.\n\n---\n\n### Test Case 1\n**Input:**\n```text\n3\n2.0 1.0 0.1\n0\n```\n**Output:**\n```text\n0.6590 0.2424 0.0986\n0.4170\n```",
    "starterCode": "# Head\nimport numpy as np\n\n# Body\ndef stabilize_logits(logits):\n    # Step 1: Subtract the maximum logit\n    pass\n\ndef compute_exponentials(stable_logits):\n    # Step 2: Compute exponential values\n    pass\n\ndef normalize_softmax(exp_values):\n    # Step 3: Convert exponential values to probabilities\n    pass\n\ndef target_probability(probabilities, target):\n    # Step 4: Return the target-class probability\n    pass\n\ndef cross_entropy_loss(probability):\n    # Step 5: Compute cross-entropy loss\n    pass\n\n# Tail\nif __name__ == \"__main__\":\n    k = int(input())\n    logits = np.array(\n        list(map(float, input().split()))\n    )\n    target = int(input())\n    stable = stabilize_logits(logits)\n    exp_values = compute_exponentials(stable)\n    probabilities = normalize_softmax(exp_values)\n    probability = target_probability(\n        probabilities, target\n    )\n    loss = cross_entropy_loss(probability)\n    print(\" \".join(\n        f\"{p:.4f}\" for p in probabilities\n    ))\n    print(f\"{loss:.4f}\")\n",
    "solutionCode": "# Head\nimport numpy as np\n\n# Body\ndef stabilize_logits(logits):\n    return logits - np.max(logits)\n\ndef compute_exponentials(stable_logits):\n    return np.exp(stable_logits)\n\ndef normalize_softmax(exp_values):\n    return exp_values / np.sum(exp_values)\n\ndef target_probability(probabilities, target):\n    return probabilities[target]\n\ndef cross_entropy_loss(probability):\n    return -np.log(probability)\n\n# Tail\nif __name__ == \"__main__\":\n    k = int(input())\n    logits = np.array(\n        list(map(float, input().split()))\n    )\n    target = int(input())\n    stable = stabilize_logits(logits)\n    exp_values = compute_exponentials(stable)\n    probabilities = normalize_softmax(exp_values)\n    probability = target_probability(\n        probabilities, target\n    )\n    loss = cross_entropy_loss(probability)\n    print(\" \".join(\n        f\"{p:.4f}\" for p in probabilities\n    ))\n    print(f\"{loss:.4f}\")\n",
    "entryPoint": "normalize_softmax",
    "sampleTestCases": [
      {
        "name": "Test Case 1 (Sample 3 logits)",
        "input": "3\n2.0 1.0 0.1\n0",
        "expected": "0.6590 0.2424 0.0986\n0.4170"
      },
      {
        "name": "Test Case 2 (Large Logits Stability)",
        "input": "4\n1000.0 999.0 998.0 990.0\n1",
        "expected": "0.6652 0.2447 0.0900 0.0000\n1.4076"
      }
    ],
    "hiddenTestCases": [
      {
        "name": "Hidden Test Case 1 (Uniform logits)",
        "input": "4\n5.0 5.0 5.0 5.0\n2",
        "expected": "0.2500 0.2500 0.2500 0.2500\n1.3863"
      }
    ]
  },
  {
    "id": "t2_q10",
    "testGroup": "test2",
    "testTitle": "Test 2",
    "tabShort": "Q10",
    "title": "Q10. Implement a two-head self-attention mechanism from scratch using NumPy.",
    "tabName": "Q10: Two-Head Self-Attention",
    "category": "Transformers / Multi-Head Attention",
    "difficulty": "Medium",
    "tags": [
      "Multi-Head Attention",
      "Transformers",
      "Self-Attention",
      "NumPy"
    ],
    "summary": "Implement a 2-head self-attention mechanism with Q, K, V projection, independent head attention, concatenation, and output projection WO.",
    "description": "### Q10. Implement a two-head self-attention mechanism from scratch using NumPy.\n\nThe input contains $n$ token representations of dimension $d$, where $d$ is always even. Query, key, and value representations are generated using the supplied $d \\times d$ projection matrices $W_Q$, $W_K$, and $W_V$.\n\nThe projected representations must be divided equally into two attention heads, each having dimension $d/2$. Each head independently calculates scaled dot-product attention using its own portion of the query, key, and value representations. Scaling must use the square root of the head dimension: $\\sqrt{d/2}$.\n\nSoftmax must operate row-wise and must be implemented in a numerically stable manner.\n\nThe contextual representations produced by the two heads are concatenated in their original head order and transformed using the supplied output projection matrix $W_O$.\n\nYour program must output:\n- Attention-weight matrix of Head 1 ($n \\times n$)\n- Attention-weight matrix of Head 2 ($n \\times n$)\n- Final contextual representation after concatenation and output projection ($n \\times d$)\n\nDo not use any built-in multi-head-attention implementation.\n\n---\n\n### Input Format\n```text\nn d\nX rows\nd rows of WQ\nd rows of WK\nd rows of WV\nd rows of WO\n```\n\n---\n\n### Output Format\nPrint the $n \\times n$ Head-1 attention matrix, followed by the $n \\times n$ Head-2 attention matrix, followed by the final $n \\times d$ output matrix.\nPrint every floating-point value to exactly four decimal places.\n\n---\n\n### Constraints\n- $1 \\le n \\le 10$\n- $2 \\le d \\le 10$\n- $d$ is even.\n- Each head has dimension $d/2$.\n- Softmax operates independently for every row of every head.\n- Scaling uses $\\sqrt{d/2}$.\n\n---\n\n### Test Case 1\n**Input:**\n```text\n2 2\n1.0 0.0\n0.0 1.0\n1.0 0.0\n0.0 1.0\n1.0 0.0\n0.0 1.0\n1.0 0.0\n0.0 1.0\n1.0 0.0\n0.0 1.0\n```\n**Output:**\n```text\n0.7311 0.2689\n0.5000 0.5000\n0.5000 0.5000\n0.2689 0.7311\n0.7311 0.5000\n0.5000 0.7311\n```",
    "starterCode": "# Head\nimport numpy as np\n\n# Body\ndef two_head_self_attention(\n    X,\n    WQ,\n    WK,\n    WV,\n    WO\n):\n    \"\"\"\n    Return:\n    head1_weights,\n    head2_weights,\n    final_output\n    \"\"\"\n    # Write your complete implementation here\n    pass\n\n# Tail\nif __name__ == \"__main__\":\n    n, d = map(int, input().split())\n    X = np.array([\n        list(map(float, input().split()))\n        for _ in range(n)\n    ], dtype=float)\n    WQ = np.array([\n        list(map(float, input().split()))\n        for _ in range(d)\n    ], dtype=float)\n    WK = np.array([\n        list(map(float, input().split()))\n        for _ in range(d)\n    ], dtype=float)\n    WV = np.array([\n        list(map(float, input().split()))\n        for _ in range(d)\n    ], dtype=float)\n    WO = np.array([\n        list(map(float, input().split()))\n        for _ in range(d)\n    ], dtype=float)\n    head1, head2, output = (\n        two_head_self_attention(\n            X, WQ, WK, WV, WO\n        )\n    )\n    for row in head1:\n        print(\" \".join(\n            f\"{value:.4f}\" for value in row\n        ))\n    for row in head2:\n        print(\" \".join(\n            f\"{value:.4f}\" for value in row\n        ))\n    for row in output:\n        print(\" \".join(\n            f\"{value:.4f}\" for value in row\n        ))\n",
    "solutionCode": "# Head\nimport numpy as np\n\n# Body\ndef two_head_self_attention(\n    X,\n    WQ,\n    WK,\n    WV,\n    WO\n):\n    n, d = X.shape\n    Q = X @ WQ\n    K = X @ WK\n    V = X @ WV\n    dk = d // 2\n\n    # Head 1\n    Q1, K1, V1 = Q[:, :dk], K[:, :dk], V[:, :dk]\n    s1 = (Q1 @ K1.T) / np.sqrt(dk)\n    head1_weights = np.zeros((n, n), dtype=float)\n    for i in range(n):\n        row = s1[i] - np.max(s1[i])\n        e = np.exp(row)\n        head1_weights[i] = e / np.sum(e)\n    ctx1 = head1_weights @ V1\n\n    # Head 2\n    Q2, K2, V2 = Q[:, dk:], K[:, dk:], V[:, dk:]\n    s2 = (Q2 @ K2.T) / np.sqrt(dk)\n    head2_weights = np.zeros((n, n), dtype=float)\n    for i in range(n):\n        row = s2[i] - np.max(s2[i])\n        e = np.exp(row)\n        head2_weights[i] = e / np.sum(e)\n    ctx2 = head2_weights @ V2\n\n    # Concatenate & Project\n    concat = np.hstack([ctx1, ctx2])\n    final_output = concat @ WO\n    return head1_weights, head2_weights, final_output\n\n# Tail\nif __name__ == \"__main__\":\n    n, d = map(int, input().split())\n    X = np.array([\n        list(map(float, input().split()))\n        for _ in range(n)\n    ], dtype=float)\n    WQ = np.array([\n        list(map(float, input().split()))\n        for _ in range(d)\n    ], dtype=float)\n    WK = np.array([\n        list(map(float, input().split()))\n        for _ in range(d)\n    ], dtype=float)\n    WV = np.array([\n        list(map(float, input().split()))\n        for _ in range(d)\n    ], dtype=float)\n    WO = np.array([\n        list(map(float, input().split()))\n        for _ in range(d)\n    ], dtype=float)\n    head1, head2, output = (\n        two_head_self_attention(\n            X, WQ, WK, WV, WO\n        )\n    )\n    for row in head1:\n        print(\" \".join(\n            f\"{value:.4f}\" for value in row\n        ))\n    for row in head2:\n        print(\" \".join(\n            f\"{value:.4f}\" for value in row\n        ))\n    for row in output:\n        print(\" \".join(\n            f\"{value:.4f}\" for value in row\n        ))\n",
    "entryPoint": "two_head_self_attention",
    "sampleTestCases": [
      {
        "name": "Test Case 1 (2 tokens, d=2)",
        "input": "2 2\n1.0 0.0\n0.0 1.0\n1.0 0.0\n0.0 1.0\n1.0 0.0\n0.0 1.0\n1.0 0.0\n0.0 1.0\n1.0 0.0\n0.0 1.0",
        "expected": "0.7311 0.2689\n0.5000 0.5000\n0.5000 0.5000\n0.2689 0.7311\n0.7311 0.5000\n0.5000 0.7311"
      }
    ],
    "hiddenTestCases": [
      {
        "name": "Hidden Test Case 1 (3 tokens, d=4)",
        "input": "3 4\n1.0 0.0 1.0 0.0\n0.0 1.0 0.0 1.0\n1.0 1.0 0.0 0.0\n1.0 0.0 0.0 0.0\n0.0 1.0 0.0 0.0\n0.0 0.0 1.0 0.0\n0.0 0.0 0.0 1.0\n1.0 0.0 0.0 0.0\n0.0 1.0 0.0 0.0\n0.0 0.0 1.0 0.0\n0.0 0.0 0.0 1.0\n1.0 0.0 0.0 0.0\n0.0 1.0 0.0 0.0\n0.0 0.0 1.0 0.0\n0.0 0.0 0.0 1.0\n1.0 0.0 0.0 0.0\n0.0 1.0 0.0 0.0\n0.0 0.0 1.0 0.0\n0.0 0.0 0.0 1.0",
        "expected": "0.4011 0.1978 0.4011\n0.1978 0.4011 0.4011\n0.2483 0.2483 0.5035\n0.5035 0.2483 0.2483\n0.2483 0.5035 0.2483\n0.3333 0.3333 0.3333\n0.8022 0.5989 0.5035 0.2483\n0.5989 0.8022 0.2483 0.5035\n0.7517 0.7517 0.3333 0.3333"
      }
    ]
  },
  {
    "id": "t2_q12",
    "testGroup": "test2",
    "testTitle": "Test 2",
    "tabShort": "Q12",
    "title": "Q12. Implement one complete training step of a two-layer neural network for binary classification using NumPy.",
    "tabName": "Q12: Two-Layer Binary Training",
    "category": "Deep Learning / Optimization",
    "difficulty": "Medium",
    "tags": [
      "Neural Network",
      "Backpropagation",
      "Binary Cross-Entropy",
      "NumPy"
    ],
    "summary": "Implement forward pass with ReLU and Sigmoid, BCE loss, parameter gradients, SGD updates, and second forward pass.",
    "description": "### Q12. Implement one complete training step of a two-layer neural network for binary classification using NumPy.\n\nThe network contains:\n- $d$ input features\n- $h$ neurons in one hidden layer\n- ReLU activation in the hidden layer\n- One Sigmoid output neuron\n- Binary Cross-Entropy loss\n- Gradient Descent for parameter updates\n\nYou must implement the complete computation manually. Do not use PyTorch, TensorFlow, automatic differentiation, or neural-network libraries.\n\n---\n\n### Input Format\n```text\nd h\nx1 x2 ... xd\nW1 row 1\n...\nW1 row h\nb11 b12 ... b1h\nw21 w22 ... w2h\nb2\ny\nlearning_rate\n```\n\nWhere:\n- $d$ = number of input features\n- $h$ = number of hidden neurons\n- $X$ contains $d$ input values\n- $W_1$ is an $h \\times d$ matrix\n- $b_1$ contains $h$ hidden-layer biases\n- $W_2$ contains $h$ output-layer weights\n- $b_2$ is the output-layer bias\n- $y$ is either 0 or 1\n- `learning_rate` is the Gradient Descent learning rate\n\n---\n\n### Output Format\nPrint the following in order:\n```text\nloss\nupdated W1 row 1\n...\nupdated W1 row h\nupdated b1\nupdated W2\nupdated b2\nupdated_probability\npredicted_class\n```\nPrint all floating-point values to exactly four decimal places.\n\n---\n\n### Constraints\n- $1 \\le d \\le 10$\n- $1 \\le h \\le 10$\n- $y$ is either 0 or 1\n- $0 < \\text{learning\\_rate} \\le 1$\n- Inputs, weights, and biases may be positive, negative, or zero.\n- Use ReLU derivative 0 when the pre-activation is exactly zero.\n\n---\n\n### Test Case 1\n**Input:**\n```text\n2 2\n1.0 1.0\n1.0 0.0\n0.0 1.0\n0.0 0.0\n1.0 -1.0\n0.0\n1\n0.1\n```\n**Output:**\n```text\n0.6931\n1.0500 0.0500\n-0.0500 0.9500\n0.0500 -0.0500\n1.0500 -0.9500\n0.0500\n0.6106\n1\n```",
    "starterCode": "# Head\nimport numpy as np\n\n# Body\ndef train_one_step(X, W1, b1, W2, b2, y, learning_rate):\n    \"\"\"\n    Perform one complete neural-network training step.\n    Return:\n    loss,\n    updated_W1,\n    updated_b1,\n    updated_W2,\n    updated_b2,\n    updated_probability,\n    predicted_class\n    \"\"\"\n    # Write your complete solution here\n    pass\n\n# Tail\nif __name__ == \"__main__\":\n    d, h = map(int, input().split())\n    X = np.array(\n        list(map(float, input().split())),\n        dtype=float\n    )\n    W1 = np.array([\n        list(map(float, input().split()))\n        for _ in range(h)\n    ], dtype=float)\n    b1 = np.array(\n        list(map(float, input().split())),\n        dtype=float\n    )\n    W2 = np.array(\n        list(map(float, input().split())),\n        dtype=float\n    )\n    b2 = float(input())\n    y = int(input())\n    learning_rate = float(input())\n    (\n        loss,\n        W1,\n        b1,\n        W2,\n        b2,\n        probability,\n        prediction\n    ) = train_one_step(\n        X, W1, b1, W2, b2,\n        y, learning_rate\n    )\n    print(f\"{loss:.4f}\")\n    for row in W1:\n        print(\" \".join(\n            f\"{value:.4f}\" for value in row\n        ))\n    print(\" \".join(\n        f\"{value:.4f}\" for value in b1\n    ))\n    print(\" \".join(\n        f\"{value:.4f}\" for value in W2\n    ))\n    print(f\"{b2:.4f}\")\n    print(f\"{probability:.4f}\")\n    print(prediction)\n",
    "solutionCode": "# Head\nimport numpy as np\n\n# Body\ndef train_one_step(X, W1, b1, W2, b2, y, learning_rate):\n    # Forward pass\n    z1 = W1 @ X + b1\n    a1 = np.maximum(0, z1)\n    z2 = float(W2 @ a1 + b2)\n    p = 1.0 / (1.0 + np.exp(-z2))\n    p_cl = np.clip(p, 1e-15, 1.0 - 1e-15)\n    loss = float(-(y * np.log(p_cl) + (1.0 - y) * np.log(1.0 - p_cl)))\n\n    # Gradients\n    dz2 = p - y\n    db2 = dz2\n    dW2 = dz2 * a1\n\n    da1 = dz2 * W2\n    dz1 = da1 * (z1 > 0)\n    db1 = dz1\n    dW1 = np.outer(dz1, X)\n\n    # Updates\n    updated_W1 = W1 - learning_rate * dW1\n    updated_b1 = b1 - learning_rate * db1\n    updated_W2 = W2 - learning_rate * dW2\n    updated_b2 = b2 - learning_rate * db2\n\n    # Second forward pass\n    new_z1 = updated_W1 @ X + updated_b1\n    new_a1 = np.maximum(0, new_z1)\n    new_z2 = float(updated_W2 @ new_a1 + updated_b2)\n    updated_probability = 1.0 / (1.0 + np.exp(-new_z2))\n    predicted_class = 1 if updated_probability >= 0.5 else 0\n\n    return (\n        loss,\n        updated_W1,\n        updated_b1,\n        updated_W2,\n        updated_b2,\n        updated_probability,\n        predicted_class\n    )\n\n# Tail\nif __name__ == \"__main__\":\n    d, h = map(int, input().split())\n    X = np.array(\n        list(map(float, input().split())),\n        dtype=float\n    )\n    W1 = np.array([\n        list(map(float, input().split()))\n        for _ in range(h)\n    ], dtype=float)\n    b1 = np.array(\n        list(map(float, input().split())),\n        dtype=float\n    )\n    W2 = np.array(\n        list(map(float, input().split())),\n        dtype=float\n    )\n    b2 = float(input())\n    y = int(input())\n    learning_rate = float(input())\n    (\n        loss,\n        W1,\n        b1,\n        W2,\n        b2,\n        probability,\n        prediction\n    ) = train_one_step(\n        X, W1, b1, W2, b2,\n        y, learning_rate\n    )\n    print(f\"{loss:.4f}\")\n    for row in W1:\n        print(\" \".join(\n            f\"{value:.4f}\" for value in row\n        ))\n    print(\" \".join(\n        f\"{value:.4f}\" for value in b1\n    ))\n    print(\" \".join(\n        f\"{value:.4f}\" for value in W2\n    ))\n    print(f\"{b2:.4f}\")\n    print(f\"{probability:.4f}\")\n    print(prediction)\n",
    "entryPoint": "train_one_step",
    "sampleTestCases": [
      {
        "name": "Test Case 1 (Single Step Binary Classification)",
        "input": "2 2\n1.0 1.0\n1.0 0.0\n0.0 1.0\n0.0 0.0\n1.0 -1.0\n0.0\n1\n0.1",
        "expected": "0.6931\n1.0500 0.0500\n-0.0500 0.9500\n0.0500 -0.0500\n1.0500 -0.9500\n0.0500\n0.6106\n1"
      }
    ],
    "hiddenTestCases": [
      {
        "name": "Hidden Test Case 1 (Negative bias and y=0)",
        "input": "2 2\n0.5 0.5\n0.5 -0.5\n-0.5 0.5\n0.1 -0.1\n1.0 1.0\n-0.5\n0\n0.2",
        "expected": "0.5130\n0.4599 -0.5401\n-0.5000 0.5000\n0.0197 -0.1000\n0.9920 1.0000\n-0.5803\n0.3589\n0"
      }
    ]
  },
  {
    "id": "t3_q2",
    "testGroup": "test3",
    "testTitle": "Test 3",
    "tabShort": "Q2",
    "title": "Q2. Implement the output-processing stage of a multi-class neural network for a batch of samples.",
    "tabName": "Q2: Softmax & CE Loss",
    "category": "Deep Learning / Classification",
    "difficulty": "Easy",
    "tags": [
      "Softmax",
      "Cross-Entropy",
      "Neural Networks",
      "NumPy"
    ],
    "summary": "Convert batch logits into numerically stable Softmax probabilities and compute the mean cross-entropy loss for target classes.",
    "description": "### Q2. Implement the output-processing stage of a multi-class neural network for a batch of samples.\n\nThe network provides $m$ rows of logits, where each row corresponds to one sample and contains $k$ class scores.\nConvert every row independently into Softmax probabilities using a numerically stable implementation.\n\nFor each sample, first find the maximum logit in that row.\nThen compute the stabilised exponential value for each class:\n$$e_i = \\exp(z_i - \\max(z))$$\n\nThe Softmax probability for each class is:\n$$p_i = \\frac{e_i}{\\sum e}$$\n\nFor the correct target class $t$, the cross-entropy loss is:\n$$\\text{loss} = -\\ln(p_t)$$\n\nCompute this loss separately for each sample.\nThe final loss is the mean cross-entropy loss across all $m$ samples:\n$$\\text{mean loss} = -\\frac{1}{m} \\sum_{s=1}^m \\ln(p_{s, t_s})$$\n\nYour program must output the Softmax probability matrix followed by the mean loss.\n\n---\n\n### Input Format\n```text\nm k\nlogits row 1\nlogits row 2\n...\nlogits row m\ntarget1 target2 ... targetm\n```\n\nWhere:\n- $m$ is the number of samples.\n- $k$ is the number of classes.\n- Each of the next $m$ lines contains $k$ logits.\n- The final line contains the target class index for each sample.\n- Class indices are zero-based.\n\n---\n\n### Output Format\nPrint $m$ rows of Softmax probabilities.\nAfter the probability rows, print the mean cross-entropy loss.\nAll floating-point values must be printed to exactly four decimal places.\n\n---\n\n### Constraints\n- $1 \\le m \\le 20$\n- $2 \\le k \\le 20$\n- $-10000 \\le \\text{logit} \\le 10000$\n- $0 \\le \\text{target} < k$\n- Use the natural logarithm.\n- Softmax computation must be numerically stable.\n\n---\n\n### Test Case 1\n**Input:**\n```text\n2 3\n2.0 1.0 0.1\n1.0 3.0 2.0\n0 1\n```\n**Output:**\n```text\n0.6590 0.2424 0.0986\n0.0900 0.6652 0.2447\n0.4158\n```",
    "starterCode": "# HEAD\nimport numpy as np\n\n# BODY\ndef stabilize_logits(logits):\n    # Stabilise each row independently\n    pass\n\ndef compute_exponentials(stable_logits):\n    # Compute exponential values\n    pass\n\ndef normalize_rows(exp_values):\n    # Convert rows into Softmax probabilities\n    pass\n\ndef target_probabilities(probabilities, targets):\n    # Return probability assigned to each target class\n    pass\n\ndef mean_cross_entropy(target_probs):\n    # Return mean cross-entropy loss\n    pass\n\n# TAIL\nif __name__ == \"__main__\":\n    m, k = map(int, input().split())\n    logits = np.array([\n        list(map(float, input().split()))\n        for _ in range(m)\n    ])\n    targets = np.array(\n        list(map(int, input().split()))\n    )\n    stable = stabilize_logits(logits)\n    exp_values = compute_exponentials(stable)\n    probabilities = normalize_rows(exp_values)\n    correct_probs = target_probabilities(\n        probabilities,\n        targets\n    )\n    loss = mean_cross_entropy(correct_probs)\n    for row in probabilities:\n        print(\" \".join(\n            f\"{value:.4f}\" for value in row\n        ))\n    print(f\"{loss:.4f}\")\n",
    "solutionCode": "# HEAD\nimport numpy as np\n\n# BODY\ndef stabilize_logits(logits):\n    return logits - np.max(logits, axis=1, keepdims=True)\n\ndef compute_exponentials(stable_logits):\n    return np.exp(stable_logits)\n\ndef normalize_rows(exp_values):\n    return exp_values / np.sum(exp_values, axis=1, keepdims=True)\n\ndef target_probabilities(probabilities, targets):\n    m = probabilities.shape[0]\n    return probabilities[np.arange(m), targets]\n\ndef mean_cross_entropy(target_probs):\n    return -np.mean(np.log(target_probs))\n\n# TAIL\nif __name__ == \"__main__\":\n    m, k = map(int, input().split())\n    logits = np.array([\n        list(map(float, input().split()))\n        for _ in range(m)\n    ])\n    targets = np.array(\n        list(map(int, input().split()))\n    )\n    stable = stabilize_logits(logits)\n    exp_values = compute_exponentials(stable)\n    probabilities = normalize_rows(exp_values)\n    correct_probs = target_probabilities(\n        probabilities,\n        targets\n    )\n    loss = mean_cross_entropy(correct_probs)\n    for row in probabilities:\n        print(\" \".join(\n            f\"{value:.4f}\" for value in row\n        ))\n    print(f\"{loss:.4f}\")\n",
    "entryPoint": "mean_cross_entropy",
    "sampleTestCases": [
      {
        "name": "Test Case 1 (Sample Multi-sample)",
        "input": "2 3\n2.0 1.0 0.1\n1.0 3.0 2.0\n0 1",
        "expected": "0.6590 0.2424 0.0986\n0.0900 0.6652 0.2447\n0.4123"
      },
      {
        "name": "Test Case 2 (Extreme Magnitude Stability)",
        "input": "2 2\n1000.0 999.0\n-500.0 -502.0\n0 1",
        "expected": "0.7311 0.2689\n0.8808 0.1192\n1.2201"
      }
    ],
    "hiddenTestCases": [
      {
        "name": "Hidden Test Case 1 (3 Samples 4 Classes)",
        "input": "3 4\n1.5 2.5 0.5 3.5\n0.0 0.0 0.0 0.0\n-1.0 2.0 -3.0 4.0\n3 0 1",
        "expected": "0.0871 0.2369 0.0321 0.6439\n0.2500 0.2500 0.2500 0.2500\n0.0059 0.1184 0.0008 0.8749\n1.3200"
      }
    ]
  },
  {
    "id": "t3_q4",
    "testGroup": "test3",
    "testTitle": "Test 3",
    "tabShort": "Q4",
    "title": "Q4. Implement a convolutional feature-extraction operation for a grayscale image using zero padding.",
    "tabName": "Q4: Padded Convolution",
    "category": "Computer Vision / CNN",
    "difficulty": "Medium",
    "tags": [
      "CNN",
      "Zero Padding",
      "Convolution",
      "ReLU",
      "NumPy"
    ],
    "summary": "Zero-pad a grayscale image by P rows and columns, compute 2D cross-correlation feature map, add bias, and apply ReLU.",
    "description": "### Q4. Implement a convolutional feature-extraction operation for a grayscale image using zero padding.\n\nYou are given an $H \\times W$ image, a $KH \\times KW$ kernel, padding size $P$, and a bias. Surround the image with $P$ rows and columns of zeros before applying the kernel.\n\nUse:\n- **stride** = 1\n- **zero padding** = $P$\n- CNN cross-correlation convention; do not flip the kernel\n- ReLU activation after adding the bias\n\nThe output dimensions are:\n$$OH = H + 2P - KH + 1$$\n$$OW = W + 2P - KW + 1$$\n\nFor every valid location, compute the sum of element-wise products between the padded image patch and kernel, add the bias, and apply:\n$$\\text{ReLU}(x) = \\max(0, x)$$\n\nReturn the final feature map.\n\n---\n\n### Input Format\n```text\nH W\nimage row 1\n...\nimage row H\nKH KW\nkernel row 1\n...\nkernel row KH\nP\nbias\n```\n\n---\n\n### Output Format\nFirst print:\n```text\nOH OW\n```\nThen print the resulting feature map with integers separated by spaces.\n\n---\n\n### Constraints\n- $1 \\le H, W \\le 20$\n- $1 \\le KH, KW \\le 10$\n- $0 \\le P \\le 5$\n- Output dimensions will always be positive.\n- Input, kernel, padding, and bias values are integers.\n\n---\n\n### Test Case 1\n**Input:**\n```text\n3 3\n1 2 3\n4 5 6\n7 8 9\n2 2\n1 0\n0 1\n1\n2\n```\n**Output:**\n```text\n4 4\n3 2 3 2\n2 7 8 5\n6 13 14 8\n2 9 10 2\n```",
    "starterCode": "# HEAD\nimport numpy as np\n\n# BODY\ndef pad_image(image, padding):\n    # Apply zero padding\n    pass\n\ndef output_dimensions(H, W, KH, KW, padding):\n    # Calculate output dimensions\n    pass\n\ndef kernel_response(patch, kernel):\n    # Calculate one convolution response\n    pass\n\ndef raw_feature_map(image, kernel, padding):\n    # Generate raw padded convolution feature map\n    pass\n\ndef apply_bias_relu(feature_map, bias):\n    # Add bias and apply ReLU\n    pass\n\n# TAIL\nif __name__ == \"__main__\":\n    H, W = map(int, input().split())\n    image = np.array([\n        list(map(int, input().split()))\n        for _ in range(H)\n    ])\n    KH, KW = map(int, input().split())\n    kernel = np.array([\n        list(map(int, input().split()))\n        for _ in range(KH)\n    ])\n    padding = int(input())\n    bias = int(input())\n    raw = raw_feature_map(\n        image,\n        kernel,\n        padding\n    )\n    output = apply_bias_relu(\n        raw,\n        bias\n    )\n    OH, OW = output.shape\n    print(OH, OW)\n    for row in output:\n        print(\" \".join(\n            map(str, row.astype(int))\n        ))\n",
    "solutionCode": "# HEAD\nimport numpy as np\n\n# BODY\ndef pad_image(image, padding):\n    if padding == 0:\n        return image\n    return np.pad(image, padding, mode='constant', constant_values=0)\n\ndef output_dimensions(H, W, KH, KW, padding):\n    OH = H + 2 * padding - KH + 1\n    OW = W + 2 * padding - KW + 1\n    return OH, OW\n\ndef kernel_response(patch, kernel):\n    return np.sum(patch * kernel)\n\ndef raw_feature_map(image, kernel, padding):\n    padded = pad_image(image, padding)\n    H, W = image.shape\n    KH, KW = kernel.shape\n    OH, OW = output_dimensions(H, W, KH, KW, padding)\n    raw = np.zeros((OH, OW), dtype=int)\n    for r in range(OH):\n        for c in range(OW):\n            patch = padded[r : r + KH, c : c + KW]\n            raw[r, c] = kernel_response(patch, kernel)\n    return raw\n\ndef apply_bias_relu(feature_map, bias):\n    return np.maximum(0, feature_map + bias)\n\n# TAIL\nif __name__ == \"__main__\":\n    H, W = map(int, input().split())\n    image = np.array([\n        list(map(int, input().split()))\n        for _ in range(H)\n    ])\n    KH, KW = map(int, input().split())\n    kernel = np.array([\n        list(map(int, input().split()))\n        for _ in range(KH)\n    ])\n    padding = int(input())\n    bias = int(input())\n    raw = raw_feature_map(\n        image,\n        kernel,\n        padding\n    )\n    output = apply_bias_relu(\n        raw,\n        bias\n    )\n    OH, OW = output.shape\n    print(OH, OW)\n    for row in output:\n        print(\" \".join(\n            map(str, row.astype(int))\n        ))\n",
    "entryPoint": "raw_feature_map",
    "sampleTestCases": [
      {
        "name": "Test Case 1 (3x3 with P=1)",
        "input": "3 3\n1 2 3\n4 5 6\n7 8 9\n2 2\n1 0\n0 1\n1\n2",
        "expected": "4 4\n3 4 5 2\n6 8 10 5\n9 14 16 8\n2 9 10 11"
      },
      {
        "name": "Test Case 2 (2x2 with P=0 and negative bias)",
        "input": "2 2\n5 10\n15 20\n1 1\n2\n0\n-25",
        "expected": "2 2\n0 0\n5 15"
      }
    ],
    "hiddenTestCases": [
      {
        "name": "Hidden Test Case 1 (3x3 with P=2 and 3x3 kernel)",
        "input": "3 3\n1 1 1\n1 1 1\n1 1 1\n3 3\n1 0 1\n0 1 0\n1 0 1\n2\n-2",
        "expected": "5 5\n0 0 0 0 0\n0 0 1 0 0\n0 1 3 1 0\n0 0 1 0 0\n0 0 0 0 0"
      }
    ]
  },
  {
    "id": "t3_q5",
    "testGroup": "test3",
    "testTitle": "Test 3",
    "tabShort": "Q5",
    "title": "Q5. Implement a perceptron prediction pipeline for multiple input samples.",
    "tabName": "Q5: Perceptron Pipeline",
    "category": "Machine Learning / Perceptron",
    "difficulty": "Easy",
    "tags": [
      "Perceptron",
      "Linear Classifier",
      "Step Activation",
      "NumPy"
    ],
    "summary": "Compute weighted products, add bias, and apply binary step activation (1 if score >= 0 else 0) across a batch of samples.",
    "description": "### Q5. Implement a perceptron prediction pipeline for multiple input samples.\n\nFor each sample, first multiply every input feature by its corresponding weight. Sum these weighted values, add the bias, and apply the perceptron step activation to obtain the predicted class.\n\nFor an input sample $X = [x_1, x_2, \\dots, x_d]$, weights $W = [w_1, w_2, \\dots, w_d]$, and bias $b$, compute:\n$$z = (x_1 \\cdot w_1) + (x_2 \\cdot w_2) + \\dots + (x_d \\cdot w_d) + b$$\n\nThe perceptron prediction is:\n- **1** if $z \\ge 0$\n- **0** if $z < 0$\n\nComplete the five functions provided in the boilerplate so that the entire prediction pipeline works correctly.\n\n---\n\n### Input Format\n```text\nn d\nx11 x12 ... x1d\nx21 x22 ... x2d\n...\nxn1 xn2 ... xnd\nw1 w2 ... wd\nbias\n```\n\nWhere:\n- $n$ is the number of input samples.\n- $d$ is the number of features in each sample.\n- The next $n$ lines contain the input samples (each with $d$ values).\n- The next line contains the $d$ weights.\n- The last line contains the bias value.\n\n---\n\n### Output Format\nPrint the predicted classes for all $n$ samples, separated by spaces, on a single line:\n```text\np1 p2 ... pn\n```\n\n---\n\n### Constraints\n- $1 \\le n \\le 100$\n- $1 \\le d \\le 20$\n- Input values, weights, and bias may be integers or decimal (floating-point) values.\n- A linear score exactly equal to 0 must be classified as 1.\n\n---\n\n### Test Case 1\n**Input:**\n```text\n3 2\n1.0 2.0\n-1.0 -2.0\n0.0 0.0\n0.5 -0.5\n0.5\n```\n**Output:**\n```text\n1 1 1\n```",
    "starterCode": "# HEAD\nimport numpy as np\n\n# BODY\ndef weighted_products(sample, weights):\n    # Step 1: Return feature-wise weighted products\n    pass\n\ndef linear_score(products, bias):\n    # Step 2: Sum the weighted products and add bias\n    pass\n\ndef step_activation(score):\n    # Step 3: Return 1 if score >= 0, otherwise 0\n    pass\n\ndef predict_one(sample, weights, bias):\n    # Step 4: Predict one sample\n    pass\n\ndef predict_batch(X, weights, bias):\n    # Step 5: Predict all samples\n    pass\n\n# TAIL\nif __name__ == \"__main__\":\n    n, d = map(int, input().split())\n    X = np.array([\n        list(map(float, input().split()))\n        for _ in range(n)\n    ])\n    weights = np.array(\n        list(map(float, input().split()))\n    )\n    bias = float(input())\n    predictions = predict_batch(X, weights, bias)\n    print(\" \".join(map(str, predictions)))\n",
    "solutionCode": "# HEAD\nimport numpy as np\n\n# BODY\ndef weighted_products(sample, weights):\n    return sample * weights\n\ndef linear_score(products, bias):\n    return np.sum(products) + bias\n\ndef step_activation(score):\n    return 1 if score >= 0 else 0\n\ndef predict_one(sample, weights, bias):\n    prods = weighted_products(sample, weights)\n    score = linear_score(prods, bias)\n    return step_activation(score)\n\ndef predict_batch(X, weights, bias):\n    return [predict_one(sample, weights, bias) for sample in X]\n\n# TAIL\nif __name__ == \"__main__\":\n    n, d = map(int, input().split())\n    X = np.array([\n        list(map(float, input().split()))\n        for _ in range(n)\n    ])\n    weights = np.array(\n        list(map(float, input().split()))\n    )\n    bias = float(input())\n    predictions = predict_batch(X, weights, bias)\n    print(\" \".join(map(str, predictions)))\n",
    "entryPoint": "predict_batch",
    "sampleTestCases": [
      {
        "name": "Test Case 1 (3 Samples 2D)",
        "input": "3 2\n1.0 2.0\n-1.0 -2.0\n0.0 0.0\n0.5 -0.5\n0.5",
        "expected": "1 1 1"
      },
      {
        "name": "Test Case 2 (Threshold & Negatives)",
        "input": "4 2\n2.0 3.0\n-4.0 1.0\n1.0 -5.0\n-2.0 -2.0\n1.5 -1.0\n-1.0",
        "expected": "0 0 1 0"
      }
    ],
    "hiddenTestCases": [
      {
        "name": "Hidden Test Case 1 (Boundary Zero Case)",
        "input": "2 3\n2.0 0.0 -1.0\n-1.0 1.0 0.0\n1.0 2.0 2.0\n0.0",
        "expected": "1 1"
      }
    ]
  },
  {
    "id": "t3_q8",
    "testGroup": "test3",
    "testTitle": "Test 3",
    "tabShort": "Q8",
    "title": "Q8. Implement convolution over a grayscale image using a configurable stride.",
    "tabName": "Q8: Strided Convolution",
    "category": "Computer Vision / CNN",
    "difficulty": "Medium",
    "tags": [
      "CNN",
      "Strided Convolution",
      "Cross-Correlation",
      "ReLU",
      "NumPy"
    ],
    "summary": "Compute strided 2D cross-correlation over a grayscale image with no padding, add bias, and apply ReLU activation.",
    "description": "### Q8. Implement convolution over a grayscale image using a configurable stride.\n\nGiven an $H \\times W$ image, a $KH \\times KW$ kernel, stride $S$, and bias, calculate the convolution feature map using:\n- no padding;\n- CNN cross-correlation convention, so the kernel is not flipped;\n- the specified stride;\n- bias addition followed by ReLU activation.\n\nThe output dimensions are:\n$$OH = \\lfloor (H - KH) / S \\rfloor + 1$$\n$$OW = \\lfloor (W - KW) / S \\rfloor + 1$$\n\nFor every valid kernel position, calculate the element-wise product sum. Add the bias and apply:\n$$\\text{ReLU}(x) = \\max(0, x)$$\n\n---\n\n### Input Format\n```text\nH W\nimage rows\nKH KW\nkernel rows\nstride\nbias\n```\n\n---\n\n### Output Format\nFirst print:\n```text\nOH OW\n```\nThen print the resulting feature map.\n\n---\n\n### Constraints\n- $1 \\le H, W \\le 20$\n- $1 \\le KH \\le H$\n- $1 \\le KW \\le W$\n- $1 \\le \\text{stride} \\le 5$\n- Image, kernel, and bias values are integers.\n\n---\n\n### Test Case 1\n**Input:**\n```text\n4 4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16\n2 2\n1 1\n1 1\n2\n-10\n```\n**Output:**\n```text\n2 2\n4 12\n36 44\n```",
    "starterCode": "# HEAD\nimport numpy as np\n\n# BODY\ndef output_dimensions(H, W, KH, KW, stride):\n    # Calculate output dimensions\n    pass\n\ndef extract_patch(image, row, col, KH, KW, stride):\n    # Extract the required patch\n    pass\n\ndef kernel_response(patch, kernel):\n    # Calculate one kernel response\n    pass\n\ndef strided_feature_map(image, kernel, stride):\n    # Generate the raw feature map\n    pass\n\ndef apply_bias_relu(feature_map, bias):\n    # Add bias and apply ReLU\n    pass\n\n# TAIL\nif __name__ == \"__main__\":\n    H, W = map(int, input().split())\n    image = np.array([\n        list(map(int, input().split()))\n        for _ in range(H)\n    ])\n    KH, KW = map(int, input().split())\n    kernel = np.array([\n        list(map(int, input().split()))\n        for _ in range(KH)\n    ])\n    stride = int(input())\n    bias = int(input())\n    raw = strided_feature_map(\n        image, kernel, stride\n    )\n    output = apply_bias_relu(\n        raw, bias\n    )\n    OH, OW = output.shape\n    print(OH, OW)\n    for row in output:\n        print(\" \".join(\n            map(str, row.astype(int))\n        ))\n",
    "solutionCode": "# HEAD\nimport numpy as np\n\n# BODY\ndef output_dimensions(H, W, KH, KW, stride):\n    OH = (H - KH) // stride + 1\n    OW = (W - KW) // stride + 1\n    return OH, OW\n\ndef extract_patch(image, row, col, KH, KW, stride):\n    r_start = row * stride\n    c_start = col * stride\n    return image[r_start : r_start + KH, c_start : c_start + KW]\n\ndef kernel_response(patch, kernel):\n    return np.sum(patch * kernel)\n\ndef strided_feature_map(image, kernel, stride):\n    H, W = image.shape\n    KH, KW = kernel.shape\n    OH, OW = output_dimensions(H, W, KH, KW, stride)\n    raw = np.zeros((OH, OW), dtype=int)\n    for r in range(OH):\n        for c in range(OW):\n            patch = extract_patch(image, r, c, KH, KW, stride)\n            raw[r, c] = kernel_response(patch, kernel)\n    return raw\n\ndef apply_bias_relu(feature_map, bias):\n    return np.maximum(0, feature_map + bias)\n\n# TAIL\nif __name__ == \"__main__\":\n    H, W = map(int, input().split())\n    image = np.array([\n        list(map(int, input().split()))\n        for _ in range(H)\n    ])\n    KH, KW = map(int, input().split())\n    kernel = np.array([\n        list(map(int, input().split()))\n        for _ in range(KH)\n    ])\n    stride = int(input())\n    bias = int(input())\n    raw = strided_feature_map(\n        image, kernel, stride\n    )\n    output = apply_bias_relu(\n        raw, bias\n    )\n    OH, OW = output.shape\n    print(OH, OW)\n    for row in output:\n        print(\" \".join(\n            map(str, row.astype(int))\n        ))\n",
    "entryPoint": "strided_feature_map",
    "sampleTestCases": [
      {
        "name": "Test Case 1 (4x4 Stride 2)",
        "input": "4 4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16\n2 2\n1 1\n1 1\n2\n-10",
        "expected": "2 2\n4 12\n36 44"
      },
      {
        "name": "Test Case 2 (5x5 Stride 2 with 3x3 kernel)",
        "input": "5 5\n1 1 1 1 1\n1 2 2 2 1\n1 2 3 2 1\n1 2 2 2 1\n1 1 1 1 1\n3 3\n1 0 1\n0 1 0\n1 0 1\n2\n0",
        "expected": "2 2\n8 8\n8 8"
      }
    ],
    "hiddenTestCases": [
      {
        "name": "Hidden Test Case 1 (Stride 1 Identity kernel)",
        "input": "3 3\n2 4 6\n8 10 12\n14 16 18\n1 1\n2\n1\n-5",
        "expected": "3 3\n0 3 7\n11 15 19\n23 27 31"
      }
    ]
  },
  {
    "id": "t3_q10",
    "testGroup": "test3",
    "testTitle": "Test 3",
    "tabShort": "Q10",
    "title": "Q10. Implement a bipolar perceptron classifier for multiple input samples.",
    "tabName": "Q10: Bipolar Perceptron",
    "category": "Machine Learning / Perceptron",
    "difficulty": "Easy",
    "tags": [
      "Perceptron",
      "Bipolar Classifier",
      "Activation Function",
      "NumPy"
    ],
    "summary": "Compute linear score and apply bipolar step activation (1 if score >= 0 else -1) across multiple input samples.",
    "description": "### Q10. Implement a bipolar perceptron classifier for multiple input samples.\n\nFor each input sample:\n$$X = [x_1, x_2, \\dots, x_d]$$\nwith weights:\n$$W = [w_1, w_2, \\dots, w_d]$$\nand bias $b$, calculate the score as:\n$$\\text{score} = (x_1 \\cdot w_1) + (x_2 \\cdot w_2) + \\dots + (x_d \\cdot w_d) + b$$\n\nUnlike a binary perceptron that produces 0 and 1, this classifier uses bipolar outputs:\n- **Return 1** if $\\text{score} \\ge 0$\n- **Return -1** if $\\text{score} < 0$\n\nComplete the functions provided in the boilerplate so that all input samples are classified correctly.\n\n---\n\n### Input Format\n```text\nn d\nx11 x12 ... x1d\nx21 x22 ... x2d\n...\nxn1 xn2 ... xnd\nw1 w2 ... wd\nbias\n```\n\nWhere:\n- $n$ is the number of input samples.\n- $d$ is the number of features in each sample.\n- The next $n$ lines contain the input samples.\n- The following line contains the $d$ weights.\n- The final line contains the bias.\n\n---\n\n### Output Format\nPrint the predicted classes separated by spaces:\n```text\np1 p2 ... pn\n```\n\n---\n\n### Constraints\n- $1 \\le n \\le 100$\n- $1 \\le d \\le 20$\n- Input values, weights, and bias may be integers or decimals.\n- A score exactly equal to 0 must produce class 1.\n\n---\n\n### Test Case 1\n**Input:**\n```text\n3 2\n1.0 2.0\n-2.0 -2.0\n0.0 0.0\n1.0 -1.0\n0.0\n```\n**Output:**\n```text\n-1 1 1\n```",
    "starterCode": "# HEAD\nimport numpy as np\n\n# BODY\ndef weighted_products(sample, weights):\n    # Return feature-wise weighted products\n    pass\n\ndef linear_score(products, bias):\n    # Return weighted sum after adding bias\n    pass\n\ndef bipolar_activation(score):\n    # Return either 1 or -1\n    pass\n\ndef predict_one(sample, weights, bias):\n    # Predict one sample\n    pass\n\ndef predict_batch(X, weights, bias):\n    # Predict all samples\n    pass\n\n# TAIL\nif __name__ == \"__main__\":\n    n, d = map(int, input().split())\n    X = np.array([\n        list(map(float, input().split()))\n        for _ in range(n)\n    ])\n    weights = np.array(\n        list(map(float, input().split()))\n    )\n    bias = float(input())\n    predictions = predict_batch(\n        X, weights, bias\n    )\n    print(\" \".join(map(str, predictions)))\n",
    "solutionCode": "# HEAD\nimport numpy as np\n\n# BODY\ndef weighted_products(sample, weights):\n    return sample * weights\n\ndef linear_score(products, bias):\n    return np.sum(products) + bias\n\ndef bipolar_activation(score):\n    return 1 if score >= 0 else -1\n\ndef predict_one(sample, weights, bias):\n    prods = weighted_products(sample, weights)\n    score = linear_score(prods, bias)\n    return bipolar_activation(score)\n\ndef predict_batch(X, weights, bias):\n    return [predict_one(sample, weights, bias) for sample in X]\n\n# TAIL\nif __name__ == \"__main__\":\n    n, d = map(int, input().split())\n    X = np.array([\n        list(map(float, input().split()))\n        for _ in range(n)\n    ])\n    weights = np.array(\n        list(map(float, input().split()))\n    )\n    bias = float(input())\n    predictions = predict_batch(\n        X, weights, bias\n    )\n    print(\" \".join(map(str, predictions)))\n",
    "entryPoint": "predict_batch",
    "sampleTestCases": [
      {
        "name": "Test Case 1 (Sample Bipolar)",
        "input": "3 2\n1.0 2.0\n-2.0 -2.0\n0.0 0.0\n1.0 -1.0\n0.0",
        "expected": "-1 1 1"
      },
      {
        "name": "Test Case 2 (Zero Boundary and Multi-features)",
        "input": "4 3\n1.0 0.0 0.0\n0.0 1.0 0.0\n-1.0 -1.0 -1.0\n2.0 -3.0 1.0\n0.5 0.5 0.5\n-0.5",
        "expected": "1 1 -1 -1"
      }
    ],
    "hiddenTestCases": [
      {
        "name": "Hidden Test Case 1 (Decimals and Negative Bias)",
        "input": "3 2\n0.5 1.5\n-1.5 -0.5\n2.0 2.0\n1.2 -0.8\n-1.0",
        "expected": "-1 -1 -1"
      }
    ]
  }
];
