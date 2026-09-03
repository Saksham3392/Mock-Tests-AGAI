// =========================================================================
// CODING ARENA - QUESTION REPOSITORY
// Contains Question 4: Linear Neuron Gradient Descent
// =========================================================================

const QUESTIONS = [
  {
    "id": "q1",
    "title": "Question 1",
    "tabName": "Test 1",
    "category": "Deep Learning",
    "difficulty": "Easy",
    "tags": [
      "Activation Functions",
      "Sigmoid",
      "Tanh",
      "ReLU",
      "Softmax",
      "NumPy"
    ],
    "summary": "Implement four commonly used neural-network activation operations (Sigmoid, Tanh, ReLU, and Softmax) for a 1D vector.",
    "description": `Implement four commonly used neural-network activation operations for a one-dimensional input vector.

For each input value x, calculate Sigmoid, Tanh, and ReLU:
\`\`\`text
sigmoid(x) = 1 / (1 + exp(-x))
tanh(x) = (exp(x) - exp(-x)) / (exp(x) + exp(-x))
relu(x) = max(0, x)
\`\`\`

Also calculate Softmax probabilities over the complete vector:
\`\`\`text
softmax(x_i) = exp(x_i) / sum(exp(x_j))
\`\`\`

The Softmax implementation must be numerically stable. Subtract the largest input value before exponentiation.
Complete the functions provided in the boilerplate using NumPy.
Do not use PyTorch, TensorFlow, or ready-made deep-learning activation functions.

**Input Format**
\`\`\`text
n
x1 x2 ... xn
\`\`\`

where:
- n is the number of values.
- The second line contains n real-valued values.

**Output Format**
Print four lines in this order:
\`\`\`text
sigmoid values
tanh values
relu values
softmax values
\`\`\`

Print every value to exactly four decimal places.

**Constraints**
- 1 <= n <= 100
- -1000 <= xi <= 1000
- Values may be integers or decimals.
- Softmax must be numerically stable.
- Output values must preserve the original input order.

**Test Case 1**

**Input Parameters:**
\`\`\`text
5
-2 -1 0 1 2
\`\`\`

**Expected Output:**
\`\`\`text
0.1192 0.2689 0.5000 0.7311 0.8808
-0.9640 -0.7616 0.0000 0.7616 0.9640
0.0000 0.0000 0.0000 1.0000 2.0000
0.0117 0.0317 0.0861 0.2341 0.6364
\`\`\``,
    "starterCode": `import numpy as np

n = int(input().strip())
x = np.array(list(map(float, input().split())), dtype=float)

def sigmoid(values):
    # Write your code here
    pass

def tanh_activation(values):
    # Write your code here
    pass

def relu(values):
    # Write your code here
    pass

def softmax(values):
    # Write your code here
    pass



sigmoid_values = sigmoid(x)
tanh_values = tanh_activation(x)
relu_values = relu(x)
softmax_values = softmax(x)

print(" ".join(f"{value:.4f}" for value in sigmoid_values))
print(" ".join(f"{value:.4f}" for value in tanh_values))
print(" ".join(f"{value:.4f}" for value in relu_values))
print(" ".join(f"{value:.4f}" for value in softmax_values))
`,
    "solutionCode": `import numpy as np

n = int(input().strip())
x = np.array(list(map(float, input().split())), dtype=float)

def sigmoid(values):
    # Write your code here
    return 1 / (1 + np.exp(-values))

def tanh_activation(values):
    # Write your code here
    return np.tanh(values)

def relu(values):
    # Write your code here
    return np.maximum(0, values)

def softmax(values):
    # Write your code here
    e = np.exp(values - np.max(values))
    return e / np.sum(e)



sigmoid_values = sigmoid(x)
tanh_values = tanh_activation(x)
relu_values = relu(x)
softmax_values = softmax(x)

print(" ".join(f"{value:.4f}" for value in sigmoid_values))
print(" ".join(f"{value:.4f}" for value in tanh_values))
print(" ".join(f"{value:.4f}" for value in relu_values))
print(" ".join(f"{value:.4f}" for value in softmax_values))
`,
    "entryPoint": "softmax",
    "sampleTestCases": [
      {
        "name": "Test Case 1 (Sample)",
        "input": "5\n-2 -1 0 1 2",
        "expected": "0.1192 0.2689 0.5000 0.7311 0.8808\n-0.9640 -0.7616 0.0000 0.7616 0.9640\n0.0000 0.0000 0.0000 1.0000 2.0000\n0.0117 0.0317 0.0861 0.2341 0.6364"
      },
      {
        "name": "Test Case 2 (3 values)",
        "input": "3\n0.0 1.0 -1.0",
        "expected": "0.5000 0.7311 0.2689\n0.0000 0.7616 -0.7616\n0.0000 1.0000 0.0000\n0.2447 0.6652 0.0900"
      }
    ],
    "hiddenTestCases": [
      {
        "name": "Hidden Test Case 1",
        "input": "4\n10.0 -10.0 5.0 -5.0",
        "expected": "1.0000 0.0000 0.9933 0.0067\n1.0000 -1.0000 0.9999 -0.9999\n10.0000 0.0000 5.0000 0.0000\n0.9933 0.0000 0.0067 0.0000"
      }
    ]
  },
  {
    "id": "q2",
    "title": "Question 2",
    "tabName": "Test 1",
    "category": "Deep Learning",
    "difficulty": "Easy",
    "tags": [
      "Multi-Layer Perceptron",
      "Forward Pass",
      "ReLU",
      "Linear Layer",
      "NumPy"
    ],
    "summary": "Implement the forward pass of a single-hidden-layer Multi-Layer Perceptron for one input sample using NumPy.",
    "description": `Implement the forward pass of a single-hidden-layer Multi-Layer Perceptron for one input sample.
The network contains:
- d input features
- h hidden neurons
- o output neurons

First calculate the hidden-layer pre-activation:
\`\`\`text
Z1 = X @ W1 + b1
\`\`\`

Apply ReLU activation:
\`\`\`text
H = max(0, Z1)
\`\`\`

Then calculate the output layer:
\`\`\`text
Y = H @ W2 + b2
\`\`\`

No activation function is applied to the output layer.
Complete the functions provided in the boilerplate using NumPy.

**Input Format**
\`\`\`text
d h o
x1 x2 ... xd
W1 row 1
...
W1 row d
b1
W2 row 1
...
W2 row h
b2
\`\`\`

Where:
- W1 has dimensions d x h
- b1 contains h values
- W2 has dimensions h x o
- b2 contains o values

**Output Format**
Print two lines:
\`\`\`text
hidden_layer_values
output_layer_values
\`\`\`

Print every value to exactly four decimal places.

**Constraints**
- 1 <= d <= 20
- 1 <= h <= 20
- 1 <= o <= 20
- Input values, weights, and biases may be integers or decimal values.

**Test Case 1**

**Input Parameters:**
\`\`\`text
2 3 2
1 2
1 -1 0.5
0.5 1 -1
0 0.5 1
1 0
-1 2
0.5 -0.5
0.2 -0.2
\`\`\`

**Expected Output:**
\`\`\`text
2.0000 1.5000 0.0000
0.7000 2.8000
\`\`\``,
    "starterCode": `import numpy as np

d, h, o = map(int, input().split())

x = np.array(list(map(float, input().split())), dtype=float)

W1 = np.array(
    [list(map(float, input().split())) for _ in range(d)],
    dtype=float
)

b1 = np.array(list(map(float, input().split())), dtype=float)

W2 = np.array(
    [list(map(float, input().split())) for _ in range(h)],
    dtype=float
)

b2 = np.array(list(map(float, input().split())), dtype=float)

def relu(values):
    # Write your code here
    pass

def hidden_forward(x, weights, bias):
    # Write your code here
    pass

def output_forward(hidden, weights, bias):
    # Write your code here
    pass

def mlp_forward(x, W1, b1, W2, b2):
    # Write your code here
    pass



hidden, output = mlp_forward(x, W1, b1, W2, b2)

print(" ".join(f"{value:.4f}" for value in hidden))
print(" ".join(f"{value:.4f}" for value in output))
`,
    "solutionCode": `import numpy as np

d, h, o = map(int, input().split())

x = np.array(list(map(float, input().split())), dtype=float)

W1 = np.array(
    [list(map(float, input().split())) for _ in range(d)],
    dtype=float
)

b1 = np.array(list(map(float, input().split())), dtype=float)

W2 = np.array(
    [list(map(float, input().split())) for _ in range(h)],
    dtype=float
)

b2 = np.array(list(map(float, input().split())), dtype=float)

def relu(values):
    # Write your code here
    return np.maximum(0, values)

def hidden_forward(x, weights, bias):
    # Write your code here
    return relu(x @ weights + bias)

def output_forward(hidden, weights, bias):
    # Write your code here
    return hidden @ weights + bias

def mlp_forward(x, W1, b1, W2, b2):
    # Write your code here
    h = hidden_forward(x, W1, b1)
    return h, output_forward(h, W2, b2)



hidden, output = mlp_forward(x, W1, b1, W2, b2)

print(" ".join(f"{value:.4f}" for value in hidden))
print(" ".join(f"{value:.4f}" for value in output))
`,
    "entryPoint": "mlp_forward",
    "sampleTestCases": [
      {
        "name": "Test Case 1 (Sample)",
        "input": "2 3 2\n1 2\n1 -1 0.5\n0.5 1 -1\n0 0.5 1\n1 0\n-1 2\n0.5 -0.5\n0.2 -0.2",
        "expected": "2.0000 1.5000 0.0000\n0.7000 2.8000"
      },
      {
        "name": "Test Case 2 (2 in, 2 hidden, 1 out)",
        "input": "2 2 1\n1.0 -1.0\n0.5 0.5\n-0.5 0.5\n0.0 1.0\n1.0\n-1.0\n0.5",
        "expected": "1.0000 1.0000\n0.5000"
      }
    ],
    "hiddenTestCases": [
      {
        "name": "Hidden Test Case 1",
        "input": "1 2 2\n2.0\n1.0 -1.0\n-0.5 0.5\n0.5 -0.5\n1.0 2.0\n0.0 0.0",
        "expected": "1.5000 0.0000\n0.7500 -0.7500"
      }
    ]
  },
  {
    "id": "q3",
    "title": "Question 3",
    "tabName": "Test 1",
    "category": "Machine Learning",
    "difficulty": "Easy",
    "tags": [
      "Softmax",
      "Cross-Entropy",
      "Classification",
      "NumPy"
    ],
    "summary": "Implement a multiclass prediction pipeline using numerically stable Softmax and Cross-Entropy Loss.",
    "description": `Implement a multiclass prediction pipeline using Softmax and Cross-Entropy Loss.
You are given raw class scores called logits for n samples and c classes.
For every sample, first make Softmax numerically stable by subtracting the largest logit in that row:
\`shifted = logits - maximum_logit\`

Then calculate:
\`\`\`text
exp_values = exp(shifted)
probabilities = exp_values / sum(exp_values)
\`\`\`

For a sample with correct class y, its cross-entropy loss is:
\`\`\`text
loss = -log(probability_of_correct_class)
\`\`\`

The final loss is the mean loss over all samples.
The predicted class is the index containing the highest probability.
Class indices start from 0.
If two or more classes have equal maximum probabilities, choose the smallest class index.

**Input Format**
\`\`\`text
n c
logit row 1
logit row 2
...
logit row n
y1 y2 ... yn
\`\`\`

**Output Format**
Print two lines:
\`\`\`text
mean_cross_entropy_loss
predicted_classes
\`\`\`

Print the loss to exactly four decimal places.

**Constraints**
1 <= n <= 100
2 <= c <= 20
0 <= yi < c

Softmax must be numerically stable.

**Test Case 1**

**Input Parameters:**
\`\`\`text
2 3
1 2 3
2 1 0
2 0
\`\`\`

**Expected Output:**
\`\`\`text
0.4076
2 0
\`\`\``,
    "starterCode": `import numpy as np

n, c = map(int, input().split())

logits = np.array(
    [list(map(float, input().split())) for _ in range(n)],
    dtype=float
)

labels = np.array(list(map(int, input().split())), dtype=int)

def stable_softmax(logits):
    # Write your code here
    pass

def cross_entropy_loss(probabilities, labels):
    # Write your code here
    pass

def predict_classes(probabilities):
    # Write your code here
    pass



probabilities = stable_softmax(logits)
loss = cross_entropy_loss(probabilities, labels)
predictions = predict_classes(probabilities)

print(f"{loss:.4f}")
print(" ".join(map(str, predictions)))
`,
    "solutionCode": `import numpy as np

n, c = map(int, input().split())

logits = np.array(
    [list(map(float, input().split())) for _ in range(n)],
    dtype=float
)

labels = np.array(list(map(int, input().split())), dtype=int)

def stable_softmax(logits):
    # Write your code here
    e = np.exp(logits - np.max(logits, axis=1, keepdims=True))
    return e / np.sum(e, axis=1, keepdims=True)

def cross_entropy_loss(probabilities, labels):
    # Write your code here
    return -np.mean(np.log(probabilities[np.arange(len(labels)), labels]))

def predict_classes(probabilities):
    # Write your code here
    return np.argmax(probabilities, axis=1)



probabilities = stable_softmax(logits)
loss = cross_entropy_loss(probabilities, labels)
predictions = predict_classes(probabilities)

print(f"{loss:.4f}")
print(" ".join(map(str, predictions)))
`,
    "entryPoint": "predict_classes",
    "sampleTestCases": [
      {
        "name": "Test Case 1 (Sample)",
        "input": "2 3\n1 2 3\n2 1 0\n2 0",
        "expected": "0.4076\n2 0"
      },
      {
        "name": "Test Case 2 (3 samples, 2 classes)",
        "input": "3 2\n2.0 1.0\n0.5 1.5\n1.0 1.0\n0 1 0",
        "expected": "0.4399\n0 1 0"
      }
    ],
    "hiddenTestCases": [
      {
        "name": "Hidden Test Case 1 (4 samples, 3 classes, tie-break)",
        "input": "4 3\n1.5 0.5 2.0\n0.0 2.5 1.0\n3.0 1.0 0.0\n1.0 1.0 1.0\n2 1 0 2",
        "expected": "0.5347\n2 1 0 0"
      }
    ]
  },
  {
    "id": "q4",
    "title": "Question 4",
    "tabName": "Test 1",
    "category": "Machine Learning",
    "difficulty": "Easy",
    "tags": [
      "Gradient Descent",
      "Linear Regression",
      "MSE Loss",
      "NumPy"
    ],
    "summary": "Implement one full-batch Gradient Descent update for a single linear neuron.",
    "description": `Implement one full-batch Gradient Descent update for a single linear neuron.
For every training sample, calculate the prediction:
prediction = w * x + b

Calculate Mean Squared Error:
error = prediction - target
MSE = mean(error ** 2)

Calculate the weight gradient:
dw = (2 / n) * sum(error * x)

Calculate the bias gradient:
db = (2 / n) * sum(error)

Update the parameters using the learning rate:
new_w = w - learning_rate * dw
new_b = b - learning_rate * db

Perform exactly one Gradient Descent update.

**Input Format**
\`\`\`text
n
x1 y1
x2 y2
...
xn yn
w
b
learning_rate
\`\`\`

**Output Format**
Print three lines:
loss_before_update
updated_weight
updated_bias

Print every value to exactly four decimal places.

**Constraints**
1 <= n <= 100
0 < learning_rate <= 1

All input values may be integers or decimals.

**Test Case 1**

**Input Parameters:**
\`\`\`text
3
1 2
2 4
3 6
0
0
0.1
\`\`\`

**Expected Output:**
\`\`\`text
18.6667
1.8667
0.8000
\`\`\``,
    "starterCode": `import numpy as np

n = int(input())

data = np.array(
    [list(map(float, input().split())) for _ in range(n)],
    dtype=float
)

x = data[:, 0]
y = data[:, 1]

w = float(input())
b = float(input())
learning_rate = float(input())

def predict(x, w, b):
    # Write your code here
    pass

def mse_loss(predictions, targets):
    # Write your code here
    pass

def compute_gradients(x, targets, predictions):
    # Write your code here
    pass

def gradient_descent_step(x, targets, w, b, learning_rate):
    # Write your code here
    pass





loss, new_w, new_b = gradient_descent_step(
    x, y, w, b, learning_rate
)

print(f"{loss:.4f}")
print(f"{new_w:.4f}")
print(f"{new_b:.4f}")
`,
    "solutionCode": `import numpy as np

n = int(input())

data = np.array(
    [list(map(float, input().split())) for _ in range(n)],
    dtype=float
)

x = data[:, 0]
y = data[:, 1]

w = float(input())
b = float(input())
learning_rate = float(input())

def predict(x, w, b):
    # Write your code here
    return w*x+b

def mse_loss(predictions, targets):
    # Write your code here
    return np.mean((predictions-targets)**2)

def compute_gradients(x, targets, predictions):
    # Write your code here
    n=len(targets)
    error=predictions-targets
    dw=(2/n)*np.sum(error*x)
    db=(2/n)*np.sum(error)
    return dw, db

def gradient_descent_step(x, targets, w, b, learning_rate):
    # Write your code here
    predictions=predict(x,w,b)
    loss=mse_loss(predictions, targets)
    dw, db = compute_gradients(x, targets, predictions)
    new_w = w - learning_rate*dw
    new_b = b - learning_rate * db
    return loss, new_w, new_b



loss, new_w, new_b = gradient_descent_step(
    x, y, w, b, learning_rate
)

print(f"{loss:.4f}")
print(f"{new_w:.4f}")
print(f"{new_b:.4f}")
`,
    "entryPoint": "gradient_descent_step",
    "sampleTestCases": [
      {
        "name": "Test Case 1 (Sample)",
        "input": "3\n1 2\n2 4\n3 6\n0\n0\n0.1",
        "expected": "18.6667\n1.8667\n0.8000"
      },
      {
        "name": "Test Case 2",
        "input": "2\n1.0 3.0\n2.0 5.0\n1.0\n0.5\n0.05",
        "expected": "4.2500\n1.3250\n0.7000"
      }
    ],
    "hiddenTestCases": [
      {
        "name": "Hidden Test Case 1",
        "input": "4\n1 1\n2 2\n3 3\n4 4\n0.5\n0.0\n0.01",
        "expected": "1.8750\n0.5750\n0.0250"
      }
    ]
  },
  {
    "id": "q5",
    "title": "Question 5",
    "tabName": "Test 1",
    "category": "Deep Learning",
    "difficulty": "Medium",
    "tags": [
      "Neural Network",
      "ReLU",
      "Softmax",
      "Cross-Entropy",
      "NumPy"
    ],
    "summary": "Implement the complete forward prediction pipeline of a two-layer multiclass neural network using NumPy.",
    "description": `Implement the complete forward prediction pipeline of a two-layer multiclass neural network using NumPy.
The input contains n samples.

Calculate the first layer:
\`\`\`text
Z1 = X @ W1 + b1
\`\`\`

Apply ReLU:
\`\`\`text
H = max(0, Z1)
\`\`\`

Calculate the output logits:
\`\`\`text
Z2 = H @ W2 + b2
\`\`\`

Convert the logits into probabilities using numerically stable row-wise Softmax.
For each row:
\`\`\`text
shifted = logits - maximum_logit
exp_values = exp(shifted)
probabilities = exp_values / sum(exp_values)
\`\`\`

Using the supplied labels, calculate mean categorical cross-entropy loss:
\`\`\`text
sample_loss = -log(probability_of_correct_class)
mean_loss = mean(sample_loss)
\`\`\`

The predicted class is the index containing the highest probability.
Class indices start from 0.

**Input Format**
\`\`\`text
n d h c
X row 1
...
X row n
W1 row 1
...
W1 row d
b1
W2 row 1
...
W2 row h
b2
y1 y2 ... yn
\`\`\`

**Output Format**
First print the complete n x c probability matrix.
Then print:
\`\`\`text
mean_cross_entropy_loss
predicted_classes
\`\`\`

Print all probabilities and the loss to exactly four decimal places.

**Constraints**
1 <= n <= 20
1 <= d <= 10
1 <= h <= 10
2 <= c <= 10
0 <= yi < c

Do not use PyTorch, TensorFlow, or ready-made neural-network layers.

**Test Case 1**

**Input Parameters:**
\`\`\`text
2 2 2 3
1 0
0 1
1 -1
0.5 1
0 0.5
1 0 -1
-1 1 0.5
0.1 0 -0.1
0 1
\`\`\`

**Expected Output:**
\`\`\`text
0.6927 0.2306 0.0768
0.0672 0.7408 0.1920
0.3336
0 1
\`\`\``,
    "starterCode": `import numpy as np

n, d, h, c = map(int, input().split())

X = np.array(
    [list(map(float, input().split())) for _ in range(n)],
    dtype=float
)

W1 = np.array(
    [list(map(float, input().split())) for _ in range(d)],
    dtype=float
)

b1 = np.array(list(map(float, input().split())), dtype=float)

W2 = np.array(
    [list(map(float, input().split())) for _ in range(h)],
    dtype=float
)

b2 = np.array(list(map(float, input().split())), dtype=float)

labels = np.array(list(map(int, input().split())), dtype=int)

def relu(values):
    # Write your code here
    pass

def stable_softmax(logits):
    # Write your code here
    pass

def forward_network(X, W1, b1, W2, b2):
    # Write your code here
    pass

def cross_entropy_loss(probabilities, labels):
    # Write your code here
    pass

def predict_classes(probabilities):
    # Write your code here
    pass



probabilities = forward_network(X, W1, b1, W2, b2)
loss = cross_entropy_loss(probabilities, labels)
predictions = predict_classes(probabilities)

for row in probabilities:
    print(" ".join(f"{value:.4f}" for value in row))

print(f"{loss:.4f}")
print(" ".join(map(str, predictions)))
`,
    "solutionCode": `import numpy as np

n, d, h, c = map(int, input().split())

X = np.array(
    [list(map(float, input().split())) for _ in range(n)],
    dtype=float
)

W1 = np.array(
    [list(map(float, input().split())) for _ in range(d)],
    dtype=float
)

b1 = np.array(list(map(float, input().split())), dtype=float)

W2 = np.array(
    [list(map(float, input().split())) for _ in range(h)],
    dtype=float
)

b2 = np.array(list(map(float, input().split())), dtype=float)

labels = np.array(list(map(int, input().split())), dtype=int)

def relu(values):
    # Write your code here
    return np.maximum(0, values)

def stable_softmax(logits):
    # Write your code here
    e = np.exp(logits - logits.max(1, keepdims=True))
    return e/e.sum(1, keepdims=True)

def forward_network(X, W1, b1, W2, b2):
    # Write your code here
    return stable_softmax(np.maximum(0, X @ W1 + b1) @ W2 + b2)

def cross_entropy_loss(probabilities, labels):
    # Write your code here
    return -np.log(probabilities[range(len(labels)), labels]).mean()

def predict_classes(probabilities):
    # Write your code here
    return probabilities.argmax(1)



probabilities = forward_network(X, W1, b1, W2, b2)
loss = cross_entropy_loss(probabilities, labels)
predictions = predict_classes(probabilities)

for row in probabilities:
    print(" ".join(f"{value:.4f}" for value in row))

print(f"{loss:.4f}")
print(" ".join(map(str, predictions)))
`,
    "entryPoint": "forward_network",
    "sampleTestCases": [
      {
        "name": "Test Case 1 (Sample)",
        "input": "2 2 2 3\n1 0\n0 1\n1 -1\n0.5 1\n0 0.5\n1 0 -1\n-1 1 0.5\n0.1 0 -0.1\n0 1",
        "expected": "0.6927 0.2306 0.0768\n0.0672 0.7408 0.1920\n0.3336\n0 1"
      },
      {
        "name": "Test Case 2 (1 sample, 2 classes)",
        "input": "1 2 2 2\n1.0 1.0\n0.5 -0.5\n0.5 -0.5\n0.0 0.0\n1.0 -1.0\n-1.0 1.0\n0.0 0.0\n0",
        "expected": "0.8808 0.1192\n0.1269\n0"
      }
    ],
    "hiddenTestCases": [
      {
        "name": "Hidden Test Case 1",
        "input": "2 2 2 3\n0 0\n1 1\n0 0\n0 0\n0 0\n0 0 0\n0 0 0\n0 0 0\n0 2",
        "expected": "0.3333 0.3333 0.3333\n0.3333 0.3333 0.3333\n1.0986\n0 0"
      }
    ]
  },
  {
    "id": "q6",
    "title": "Question 6",
    "tabName": "Test 1",
    "category": "Deep Learning",
    "difficulty": "Medium",
    "tags": [
      "Neural Network",
      "Backpropagation",
      "Binary Cross-Entropy",
      "Sigmoid",
      "NumPy"
    ],
    "summary": "Implement one complete training step for a binary-classification neural network.",
    "description": `Implement one complete training step for a binary-classification neural network.
The network contains:
- an input layer
- one hidden layer containing h neurons
- Sigmoid activation in the hidden layer
- one Sigmoid output neuron

**Forward Pass**
Calculate:

\`\`\`text
Z1 = X @ W1 + b1
A1 = sigmoid(Z1)

Z2 = A1 @ W2 + b2
A2 = sigmoid(Z2)
\`\`\`

Calculate mean Binary Cross-Entropy loss:

\`\`\`text
loss = -mean(
  y * log(A2) +
  (1 - y) * log(1 - A2)
)
\`\`\`

**Backward Pass**
Calculate:

\`\`\`text
dZ2 = (A2 - y) / n
dW2 = A1.T @ dZ2
db2 = sum(dZ2)

dA1 = dZ2 @ W2.T
dZ1 = dA1 * A1 * (1 - A1)

dW1 = X.T @ dZ1
db1 = sum(dZ1 across samples)
\`\`\`

**Update:**
\`\`\`text
W1 = W1 - learning_rate * dW1
b1 = b1 - learning_rate * db1
W2 = W2 - learning_rate * dW2
b2 = b2 - learning_rate * db2
\`\`\`

All gradients must be calculated using the original parameters from the forward pass.
Do not update W2 before using it to calculate dA1.
Perform exactly one training step.

**Input Format**
\`\`\`text
n d h
X row 1
...
X row n
y1 y2 ... yn
W1 row 1
...
W1 row d
b1
W2
b2
learning_rate
\`\`\`

W2 contains h values.

**Output Format**
Print:
\`\`\`text
loss_before_update
updated_W1
updated_b1
updated_W2
updated_b2
\`\`\`

Each row of W1 must be printed on a separate line.
Print every numeric value to exactly four decimal places.

**Constraints**
1 <= n <= 20
1 <= d <= 10
1 <= h <= 10
y is either 0 or 1
0 < learning_rate <= 1

**Test Case 1**

**Input Parameters:**
\`\`\`text
1 1 2
1
1
0 1
0 0
0.5 -0.5
0
0.2
\`\`\`

**Expected Output:**
\`\`\`text
0.7526
0.0132 0.9896
0.0132 -0.0104
0.5529 -0.4227
0.1058
\`\`\``,
    "starterCode": `import numpy as np

n, d, h = map(int, input().split())

X = np.array(
    [list(map(float, input().split())) for _ in range(n)],
    dtype=float
)

y = np.array(
    list(map(float, input().split())),
    dtype=float
).reshape(-1, 1)

W1 = np.array(
    [list(map(float, input().split())) for _ in range(d)],
    dtype=float
)

b1 = np.array(list(map(float, input().split())), dtype=float)

W2 = np.array(
    list(map(float, input().split())),
    dtype=float
).reshape(-1, 1)

b2 = float(input())
learning_rate = float(input())

def sigmoid(values):
    # Write your code here
    pass

def forward_pass(X, W1, b1, W2, b2):
    # Write your code here
    pass

def binary_cross_entropy(predictions, targets):
    # Write your code here
    pass

def backward_and_update(
    X, y, W1, b1, W2, b2,
    A1, A2, learning_rate
):
    # Write your code here
    pass

def train_step(
    X, y, W1, b1, W2, b2,
    learning_rate
):
    # Write your code here
    pass




loss, new_W1, new_b1, new_W2, new_b2 = train_step(
    X, y, W1, b1, W2, b2, learning_rate
)

print(f"{loss:.4f}")

for row in new_W1:
    print(" ".join(f"{value:.4f}" for value in row))

print(" ".join(f"{value:.4f}" for value in new_b1))
print(" ".join(f"{value:.4f}" for value in new_W2.ravel()))
print(f"{new_b2:.4f}")
`,
    "solutionCode": `import numpy as np

n, d, h = map(int, input().split())

X = np.array(
    [list(map(float, input().split())) for _ in range(n)],
    dtype=float
)

y = np.array(
    list(map(float, input().split())),
    dtype=float
).reshape(-1, 1)

W1 = np.array(
    [list(map(float, input().split())) for _ in range(d)],
    dtype=float
)

b1 = np.array(list(map(float, input().split())), dtype=float)

W2 = np.array(
    list(map(float, input().split())),
    dtype=float
).reshape(-1, 1)

b2 = float(input())
learning_rate = float(input())

def sigmoid(values):
    # Write your code here
    return 1/(1+np.exp(-values))

def forward_pass(X, W1, b1, W2, b2):
    # Write your code here
    A1 = sigmoid(X @ W1 + b1)
    A2 = sigmoid(A1 @ W2 + b2)
    return A1, A2

def binary_cross_entropy(predictions, targets):
    # Write your code here
    return -np.mean(
        targets * np.log(predictions) + (1-targets)*np.log(1 - predictions)
    )

def backward_and_update(
    X, y, W1, b1, W2, b2,
    A1, A2, learning_rate
):
    # Write your code here
    m = len(X)
    
    dZ2 = A2 - y
    dZ1 = (dZ2 @ W2.T)*A1*(1-A1)
    
    W1 -= (learning_rate/m)*(X.T@dZ1)
    b1 -= (learning_rate/m)*dZ1.sum(axis=0)
    W2 -= (learning_rate/m)*(A1.T @ dZ2)
    b2 -= (learning_rate/m)*dZ2.sum()
    
    return W1, b1, W2, b2

def train_step(
    X, y, W1, b1, W2, b2,
    learning_rate
):
    # Write your code here
    A1, A2 = forward_pass(X, W1, b1, W2, b2)
    loss = binary_cross_entropy(A2, y)
    return loss, *backward_and_update(X, y, W1, b1, W2, b2, A1, A2, learning_rate)



loss, new_W1, new_b1, new_W2, new_b2 = train_step(
    X, y, W1, b1, W2, b2, learning_rate
)

print(f"{loss:.4f}")

for row in new_W1:
    print(" ".join(f"{value:.4f}" for value in row))

print(" ".join(f"{value:.4f}" for value in new_b1))
print(" ".join(f"{value:.4f}" for value in new_W2.ravel()))
print(f"{new_b2:.4f}")
`,
    "entryPoint": "train_step",
    "sampleTestCases": [
      {
        "name": "Test Case 1 (Sample: 1 sample, 1 feature, 2 hidden)",
        "input": "1 1 2\n1\n1\n0 1\n0 0\n0.5 -0.5\n0\n0.2",
        "expected": "0.7526\n0.0132 0.9896\n0.0132 -0.0104\n0.5529 -0.4227\n0.1058"
      },
      {
        "name": "Test Case 2 (2 samples, 2 features, 2 hidden)",
        "input": "2 2 2\n1.0 0.5\n0.0 1.0\n1 0\n0.1 -0.2\n0.3 0.4\n0.1 0.1\n0.5 0.2\n-0.1\n0.1",
        "expected": "0.7116\n0.1026 -0.1989\n0.2978 0.3992\n0.0991 0.0997\n0.4951 0.1931\n-0.1077"
      }
    ],
    "hiddenTestCases": [
      {
        "name": "Hidden Test Case 1",
        "input": "1 1 2\n1\n0\n0 1\n0 0\n0.5 -0.5\n0\n0.2",
        "expected": "0.6370\n-0.0118 1.0093\n-0.0118 0.0093\n0.4529 -0.5689\n-0.0942"
      }
    ]
  },
  {
    "id": "q7",
    "title": "Question 7",
    "tabName": "Test 1",
    "category": "Machine Learning",
    "difficulty": "Medium",
    "tags": [
      "Gradient Descent",
      "Softmax",
      "Cross-Entropy",
      "NumPy"
    ],
    "summary": "Train a multiclass linear classifier using mini-batch gradient descent and softmax cross-entropy.",
    "description": `Implement training of a multiclass linear classifier using mini-batch Gradient Descent and Softmax Cross-Entropy.
The model contains a weight matrix w and bias vector b.
For each mini-batch, calculate:
logits = X_batch @ W + b

Apply numerically stable row-wise Softmax.
Convert the target labels into one-hot vectors.
Calculate:
dZ = (probabilities - one_hot_labels) / batch_sample_count

Then calculate:
dW = X_batch.T @ dZ
db = sum(dZ across samples)

Update:
W = W - learning_rate * dW
b = b - learning_rate * db

Process training samples in their original order.
Do not shuffle the dataset.
If the final mini-batch contains fewer samples than \`batch_size\`, divide its gradients by the actual number of samples in that final batch.
Repeat the complete process for the specified number of epochs.
After training, use the final parameters to predict the class of every original input sample.

**Input Format**
\`\`\`text
n d c
X row 1
...
X row n
y1 y2 ... yn
W row 1
...
W row d
b
learning_rate epochs batch_size
\`\`\`

**Output Format**
Print:
1. Final d x c weight matrix
2. Final bias vector
3. Predicted classes for all original samples

Print weights and biases to exactly four decimal places.

**Constraints**
1 <= n <= 50
1 <= d <= 10
2 <= c <= 10
1 <= batch_size <= n
1 <= epochs <= 20
0 <= yi < c

Do not shuffle samples between epochs.

**Test Case 1**

**Input Parameters:**
\`\`\`text
4 2 2
1 0
0 1
1 1
2 0
0 1 1 0
0 0
0 0
0 0
0.1 1 2
\`\`\`

**Expected Output:**
\`\`\`text
0.0475 -0.0475
-0.0500 0.0500
-0.0012 0.0012
0 1 1 0
\`\`\``,
    "starterCode": `import numpy as np

n, d, c = map(int, input().split())

X = np.array(
    [list(map(float, input().split())) for _ in range(n)],
    dtype=float
)

labels = np.array(
    list(map(int, input().split())),
    dtype=int
)

W = np.array(
    [list(map(float, input().split())) for _ in range(d)],
    dtype=float
)

b = np.array(
    list(map(float, input().split())),
    dtype=float
)

learning_rate, epochs, batch_size = input().split()

learning_rate = float(learning_rate)
epochs = int(epochs)
batch_size = int(batch_size)

def stable_softmax(logits):
    # Write your code here
    pass

def one_hot(labels, num_classes):
    # Write your code here
    pass

def train_classifier(
    X, labels, W, b,
    learning_rate, epochs, batch_size
):
    # Write your code here
    pass

def predict(X, W, b):
    # Write your code here
    pass








W, b = train_classifier(
    X,
    labels,
    W,
    b,
    learning_rate,
    epochs,
    batch_size
)

predictions = predict(X, W, b)

for row in W:
    print(" ".join(f"{value:.4f}" for value in row))

print(" ".join(f"{value:.4f}" for value in b))
print(" ".join(map(str, predictions)))
`,
    "solutionCode": `import numpy as np

n, d, c = map(int, input().split())

X = np.array(
    [list(map(float, input().split())) for _ in range(n)],
    dtype=float
)

labels = np.array(
    list(map(int, input().split())),
    dtype=int
)

W = np.array(
    [list(map(float, input().split())) for _ in range(d)],
    dtype=float
)

b = np.array(
    list(map(float, input().split())),
    dtype=float
)

learning_rate, epochs, batch_size = input().split()

learning_rate = float(learning_rate)
epochs = int(epochs)
batch_size = int(batch_size)

def stable_softmax(logits):
    # Write your code here
    exps = np.exp(logits - np.max(logits, axis=1, keepdims=True))
    return exps / np.sum(exps, axis=1, keepdims=True)

def one_hot(labels, num_classes):
    # Write your code here
    return np.eye(num_classes)[labels]

def train_classifier(
    X, labels, W, b,
    learning_rate, epochs, batch_size
):
    # Write your code here
    n = len(X)
    num_classes = W.shape[1]
    Y = one_hot(labels, num_classes)
    for _ in range(epochs):
        for i in range(0, n, batch_size):
            xb = X[i:i+batch_size]
            yb = Y[i:i+batch_size]
            probs = stable_softmax(xb @ W + b)
            dZ = (probs - yb) / len(xb)
            W -= learning_rate * (xb.T @ dZ)
            b -= learning_rate * np.sum(dZ, axis=0)
    return W, b

def predict(X, W, b):
    # Write your code here
    return np.argmax(stable_softmax(X @ W + b), axis=1)

W, b = train_classifier(
    X,
    labels,
    W,
    b,
    learning_rate,
    epochs,
    batch_size
)

predictions = predict(X, W, b)

for row in W:
    print(" ".join(f"{value:.4f}" for value in row))

print(" ".join(f"{value:.4f}" for value in b))
print(" ".join(map(str, predictions)))
`,
    "entryPoint": "train_classifier",
    "sampleTestCases": [
      {
        "name": "Test Case 1 (Sample: 4 samples, 2 features, 2 classes)",
        "input": "4 2 2\n1 0\n0 1\n1 1\n2 0\n0 1 1 0\n0 0\n0 0\n0 0\n0.1 1 2",
        "expected": "0.0475 -0.0475\n-0.0500 0.0500\n-0.0012 0.0012\n0 1 1 0"
      },
      {
        "name": "Test Case 2 (3 samples, 2 features, 3 classes)",
        "input": "3 2 3\n1.0 2.0\n-1.0 1.0\n0.5 -0.5\n0 1 2\n0.1 -0.1 0.0\n0.0 0.2 -0.2\n0.0 0.0 0.0\n0.05 2 2",
        "expected": "0.1291 -0.1629 0.0339\n0.0659 0.1996 -0.2656\n-0.0178 -0.0212 0.0390\n0 1 2"
      }
    ],
    "hiddenTestCases": [
      {
        "name": "Hidden Test Case 1 (5 samples, 3 features, 2 classes)",
        "input": "5 3 2\n1 0 1\n0 1 0\n1 1 0\n0 0 1\n1 0 0\n0 1 1 0 0\n0.1 -0.1\n0.2 -0.2\n-0.1 0.1\n0.0 0.0\n0.05 3 3",
        "expected": "0.1252 -0.1252\n0.1380 -0.1380\n-0.0359 0.0359\n0.0356 -0.0356\n0 0 0 1 0"
      }
    ]
  }
];
