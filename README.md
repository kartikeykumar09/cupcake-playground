# 🧁 Cupcake Policy Playground

> **A visual playground to explore and test "Policy-as-Code" for AI Agents.**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-live-green.svg)

## 🔍 Overview

**Cupcake Policy Playground** is an interactive web application designed to demonstrate the capabilities of **[Cupcake](https://github.com/eqtylab/cupcake)**, a native policy-layer for AI coding agents. 

As AI agents become more autonomous, ensuring they act securely and within boundaries is critical. Cupcake intercepts agent actions (like file writes, git pushes, or deployments) and evaluates them against strict policies before allowing them to proceed.

This playground allows developers to:
1.  **Write Policies**: Create security rules using a simplified Rego-like logic.
2.  **Simulate Agents**: Mock an AI agent attempting actions in different environments (e.g., specific branches, CI states).
3.  **Visualize Decisions**: See standard "Allow", "Block", or "Modify" decisions in real-time with a transparent explanation.

## ✨ Features

*   **🛡️ Policy Editor**: 
    *   Write and edit security policies.
    *   Load preset examples like "Block Push to Main", "Protect Secrets", and "Require CI Pass".
*   **🤖 Agent Simulator**: 
    *   Mock various agent actions (`git_push`, `read_file`, `deploy`).
    *   Toggle environmental context signals (Git Branch, CI Status).
*   **👁️ Decision Visualizer**: 
    *   Cyberpunk-themed "Security Console" aesthetic.
    *   Real-time animation of the policy evaluation process.
    *   Clear visual feedback for Allowed vs. Blocked actions.

## 🛠️ Tech Stack

*   **Framework**: React + Vite (TypeScript)
*   **Styling**: Vanilla CSS (Custom Cyber-Security Theme)
*   **Icons**: Lucide React
*   **Animations**: Framer Motion

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/kartikeykumar09/cupcake-playground.git
    cd cupcake-playground
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Visit `http://localhost:5173` to start experimenting.

## 📚 How It Works (Simulation)

In this playground, the "Cupcake Engine" is simulated using a lightweight TypeScript pattern-matcher that mimics the logic of Open Policy Agent (OPA). 

1.  **Select a Policy**: Choose "Block Push to Main".
2.  **Configure the Agent**: Set the action to `git_push` and the branch to `main`.
3.  **Run Simulation**: Click "Evaluate Action".
4.  **Observe**: The system intercepts the action, checks the policy, and returns a **BLOCKED** decision because the policy forbids pushing directly to main.

## 🔗 Related Projects

*   **[eqtylab/cupcake](https://github.com/eqtylab/cupcake)** - The original Policy-as-Code tool for AI Agents.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
