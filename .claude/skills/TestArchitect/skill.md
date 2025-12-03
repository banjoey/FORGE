---
name: TestArchitect
description: Test-first development strategy for PAI projects. USE WHEN user needs test strategy, coverage analysis, ATDD workflows, risk-based testing, or quality gates. Ensures tests are written before code, not after bugs appear.
---

# TestArchitect

Test strategy before code: prevent defects through acceptance test-driven development (ATDD).

## Workflow Routing

| Workflow | When to Use | Output |
|----------|-------------|--------|
| CreateTestStrategy | Planning new feature or sprint | Comprehensive test strategy with test types and coverage targets |
| DefineCoverage | Analyzing existing code or setting quality gates | Coverage analysis report with gaps and improvement plan |

## Examples

### Example 1: Create test strategy for feature
```
User: "Create test strategy for user authentication"
Skill loads: TestArchitect → CreateTestStrategy workflow
Output: Test types (unit/integration/E2E), coverage targets (90% for auth), test scenarios
```

### Example 2: Analyze test coverage gaps
```
User: "Analyze test coverage for the payment module"
Skill loads: TestArchitect → DefineCoverage workflow
Output: Coverage report (65% → 85% target), gap analysis, improvement plan
```

### Example 3: Define tests for user story
```
User: "What tests do we need for password reset feature?"
Skill loads: TestArchitect → CreateTestStrategy workflow (focused on password reset)
Output: Test scenarios (happy path, expired token, invalid email, etc.)
```

## Integration

- Works with AgilePm skill (adds test requirements to user stories)
- Works with Security skill (security test scenarios from threat model)
- Follows test pyramid (70% unit, 20% integration, 10% E2E)
- Generates test-strategy.md and coverage reports

## Methodology

This skill follows test-first principles:
- ATDD (Acceptance Test-Driven Development)
- Test Pyramid (Martin Fowler)
- Risk-based testing (ISO 29119)
- Coverage targets by risk (Critical: 90%, High: 80%, Medium: 70%, Low: 50%)

Based on industry standards: ATDD, Test Pyramid, Risk-Based Testing, TDD.
