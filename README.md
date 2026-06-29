<div align="center">

<br/>

```
⌥ CFGLab
```

# CFG Lab

**An interactive learning lab for Context-Free Grammars**

Master the formal language theory powering every compiler, parser, and programming language ever built — through interactive visualizations and hands-on exploration.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-cfglab.netlify.app-6366f1?style=for-the-badge&logo=netlify&logoColor=white)](https://cfglab.netlify.app/)
![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

<br/>

</div>

---

## Overview

CFG Lab is a single-page interactive learning experience for formal language theory. It walks through Context-Free Grammars from first principles to real-world applications, with animated derivations and a live parse tree builder powered by an Earley parser.

```
/* A grammar G = (V, Σ, R, S) */

S → NP VP        // sentence = noun phrase + verb phrase
E → E '+' T | T  // arithmetic expression
```

---

## Chapters

| # | Chapter | Description | Level |
|---|---------|-------------|-------|
| 01 | **What is a CFG?** | Intuition, motivation, and informal definition with real-world examples | `BEGINNER` |
| 02 | **Formal Definition** | The 4-tuple `(V, Σ, R, S)` and the structure of production rules | `CORE` |
| 03 | **Derivations** | Leftmost, rightmost, sentential forms — animate any custom grammar | `INTERACTIVE` |
| 04 | **Parse Trees** | Build and visualize parse trees for your own grammars and strings | `VISUAL` |
| 05 | **Applications** | Compilers, XML, NLP, and the real power of context-free languages | `REAL WORLD` |

---

## Features

### ⚡ Derivation Animator
Enter any grammar and target string and watch the derivation unfold step by step. Toggle between **leftmost** and **rightmost** derivation strategies. Comes pre-loaded with:
- `aⁿbⁿ` — the classic non-regular language
- Arithmetic expressions with operator precedence
- Balanced parentheses
- Palindromes over `{a, b}`
- If-then constructs

### 🌳 Parse Tree Builder
Visualize parse trees for any grammar and string using a full **Earley parser** — handles all CFGs including left-recursive and ambiguous grammars. Supports step-by-step animation or instant build.

### 📐 Formal Grammar Examples

```
// Arithmetic Expressions — encodes operator precedence
E → E '+' T | E '-' T | T
T → T '*' F | T '/' F | F
F → '(' E ')' | id

// Balanced Parentheses — impossible with regex
S → '(' S ')' | S S | ε

// Palindromes
S → 'a' S 'a' | 'b' S 'b' | 'a' | 'b' | ε

// aⁿbⁿ — proof CFLs strictly contain regular languages
S → 'a' S 'b' | ε
```

### 🌙 Dark / Light Mode
Full theme toggle with persistent preference.

---

## Concepts Covered

- **Chomsky Hierarchy** — Where CFGs sit (Type-2) relative to regular and context-sensitive languages
- **4-tuple definition** — `G = (V, Σ, R, S)` with interactive component breakdown
- **Derivation relation** — `αAγ ⇒ αβγ` and the language `L(G) = { w ∈ Σ* | S ⇒* w }`
- **Leftmost vs. Rightmost derivations** — and their correspondence to LL and LR parsers
- **Parse tree structure** — internal nodes, leaf nodes, yield, and the root invariant
- **Ambiguity** — when a string has two distinct parse trees
- **Pumping Lemma for CFLs** — with `{ aⁿbⁿcⁿ }` as a worked non-CFL example

---

## Real-World Applications

| Domain | How CFGs Are Used |
|--------|-------------------|
| ⚙️ Compilers | Every major language (Python, Java, C++) is defined by a CFG; LL/LR parsers build ASTs from it |
| 📄 XML / HTML | Well-formedness rules are context-free; DTD and XSD validate against CFG-like schemas |
| 🗣️ NLP | Constituency parsers (Stanford NLP) use phrase-structure grammars based on CFG formalisms |
| 🔍 Protocols | HTTP, JSON, and SQL use BNF/ABNF — CFG-based notation — to define message formats |
| 🎮 Game Dev | Grammar-based procedural generation; L-systems for plants and architectural layouts |
| 🛡️ Security | Static analyzers use grammar-based approaches for program structure analysis |

---

## Getting Started

CFG Lab is a fully static, dependency-free site. No build step required.

```bash
git clone https://github.com/your-username/cfg-lab.git
cd cfg-lab
open index.html
```

Or just visit **[cfglab.netlify.app](https://cfglab.netlify.app/)** directly.

---

## Usage Tips

- **Derivation Animator:** Tokens in the string field must be space-separated. Non-terminals use uppercase convention. Use `ε` or `eps` for the empty string.
- **Parse Tree Builder:** The Earley parser handles all CFGs, including left-recursive grammars — no CNF conversion needed.
- Use the **preset buttons** (`aⁿbⁿ`, `Arithmetic`, `Parens`, `Palindrome`) to explore common grammars instantly.

---

## Topics

`Formal Language Theory` · `Chomsky Hierarchy` · `Compiler Construction` · `Automata Theory` · `Parsing` · `Computer Science Education`

---

<div align="center">

Built with vanilla HTML, CSS, and JavaScript · Deployed on Netlify

**Author — [Gaurav Kumar](https://github.com/gaurav26kumar)**

</div>
