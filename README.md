# Analisador Sintático LL(1)

Este é um analisador sintático produzido como trabalho para a matéria de **Compiladores**.

## Gramática utilizada

S ::= cAc | aB A ::= bS | aB | ε B ::= bAc | aCc C ::= aB | bA

## Exemplos de Sentenças para testar

### ✅ Sentenças aceitas:
- `caabcc`
- `cc`
- `aabc`
- `ababcc`

### ❌ Sentenças erradas:
- `aaaacc`
- `bbbcac`
- `abababa`
- `ccc`
- `caaxxxxbcc`
