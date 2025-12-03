# Emma Security Engineer - Usage Examples

This directory contains practical examples demonstrating how to use Emma for security analysis, STRIDE threat modeling, and CMMC compliance auditing.

## Prerequisites

```bash
# Install dependencies
npm install

# Run tests to verify Emma is working
npm test
```

## Examples Overview

### 1. Basic Security Review (`01-basic-review.ts`)

**What it does**: Demonstrates simple code review for vulnerability detection.

**Use cases**:
- Quick security scan of code snippets
- Identify common vulnerabilities (SQL injection, XSS, missing authentication)
- Get CMMC practice mappings
- Receive mitigation guidance and secure code examples

**Run it**:
```bash
npx ts-node examples/01-basic-review.ts
```

**Expected output**:
```
=== Emma Security Review - Basic Example ===

Example 1: Analyzing code for SQL Injection...
❌ Vulnerability Detected!
   Name: SQL Injection - String Concatenation
   STRIDE Category: Tampering
   Severity: Critical
   OWASP: A03
   CMMC Practice: SI.L2-3.14.6 (System and Information Integrity)
   Description: Check the validity of all input...

   Mitigation: Use parameterized queries or prepared statements...

   Secure Code Example:
   const query = "SELECT * FROM users WHERE id = ?"
   const result = await db.execute(query, [req.params.id])
```

---

### 2. Multi-Agent Standup (`02-multi-agent-standup.ts`)

**What it does**: Orchestrates a team standup where Emma provides security perspective alongside other agents.

**Use cases**:
- Feature planning with security, business, capacity, and testing perspectives
- Team decision synthesis
- Conflict detection between agent recommendations
- Record decisions to project context

**Agents involved**:
- **Emma** (Security): Vulnerability detection, STRIDE, CMMC compliance
- **Mary** (Business): User value, UX impact
- **Bob** (Capacity): Timeline, effort estimates
- **Murat** (Testing): Test coverage, edge cases

**Run it**:
```bash
npx ts-node examples/02-multi-agent-standup.ts
```

**Expected output**:
```
=== Emma Security Review - Multi-Agent Standup ===

Scenario: Reviewing user authentication implementation

Participants: Emma, Mary, Bob, Murat

👤 Emma (Security Engineer):
   Focus: security
   Vulnerability: SQL Injection - String Concatenation
   STRIDE Category: Tampering
   Severity: Critical
   CMMC Practice: SI.L2-3.14.6
   OWASP Reference: A03

   Recommendations:
   1. Use parameterized queries or prepared statements...
   2. Validate and sanitize all user inputs
   3. Implement input validation middleware

👤 Mary (Business Analyst):
   Focus: business_value
   Analysis: Authentication is core to user experience...
   Recommendation: Prioritize security fixes before launch

👤 Bob (Capacity Planner):
   Focus: capacity_planning
   Analysis: Security fixes estimated at 2-3 days...
   Recommendation: Schedule remediation sprint

👤 Murat (Test Engineer):
   Focus: testing
   Analysis: Need security test cases for SQL injection...
   Recommendation: Add penetration testing to QA plan

🤝 Team Synthesis:
   Team recommendation based on all perspectives

✅ No conflicts - Team is aligned

📝 Recording decision to project context...
   ✅ Decision recorded to examples/output/project-context.md
```

---

### 3. STRIDE Threat Modeling (`03-stride-analysis.ts`)

**What it does**: Performs comprehensive STRIDE threat analysis to identify all security threats.

**Use cases**:
- Comprehensive threat modeling
- Identify threats across all 6 STRIDE categories
- Prioritize threats by severity
- Generate remediation timelines

**STRIDE Categories**:
- **S**poofing: Identity theft, credential theft
- **T**ampering: Data modification attacks
- **R**epudiation: Inability to prove actions occurred
- **I**nformation Disclosure: Data exposure
- **D**enial of Service: Resource exhaustion
- **E**levation of Privilege: Unauthorized access escalation

**Run it**:
```bash
npx ts-node examples/03-stride-analysis.ts
```

**Expected output**:
```
=== Emma Security Review - STRIDE Threat Modeling ===

Scenario: Analyzing payment transfer endpoint

Primary Vulnerability: SQL Injection - Template Literals
STRIDE Category: Tampering
Severity: Critical
OWASP: A03
CMMC Practice: SI.L2-3.14.6 (System and Information Integrity)

Total Threats Detected: 3

[Tampering] - 1 threat(s)
────────────────────────────────────────────────────────────

  1. SQL Injection - Template Literals
     Severity: Critical
     CMMC Practice: SI.L2-3.14.6
     Mitigation: Use parameterized queries with proper escaping

[Elevation of Privilege] - 2 threat(s)
────────────────────────────────────────────────────────────

  1. Missing Authentication Check
     Severity: Critical
     CMMC Practice: AC.L2-3.1.1
     Mitigation: Add authentication middleware...

  2. Missing Authorization Check
     Severity: Critical
     CMMC Practice: AC.L2-3.1.2
     Mitigation: Verify user owns the account...

📊 STRIDE Threat Model Summary:

Priority: Immediate Action Required
────────────────────────────────────────────────────────────
🔴 Critical: 3 threat(s)
   - SQL Injection - Template Literals
   - Missing Authentication Check
   - Missing Authorization Check

⏰ Recommended Timeline:

   Immediate (Today):
   - Fix: SQL Injection - Template Literals
   - Fix: Missing Authentication Check
   - Fix: Missing Authorization Check
```

---

### 4. CMMC Compliance Audit (`04-cmmc-audit.ts`)

**What it does**: Generates a CMMC Level 2 compliance audit trail for feature review.

**Use cases**:
- CMMC Level 2 compliance auditing
- Generate compliance documentation for assessors
- Track compliance rate across 17 CMMC domains
- Identify compliance gaps and remediation steps

**Run it**:
```bash
npx ts-node examples/04-cmmc-audit.ts
```

**Expected output**:
```
=== Emma Security Review - CMMC Compliance Audit ===

Scenario: CMMC Level 2 compliance audit for e-commerce checkout

Emma's Security Analysis:

Focus: security

CMMC Practices Checked: 10 practices across multiple domains

   AC: AC.L2-3.1.1
   IA: IA.L2-3.5.10
   SC: SC.L2-3.13.8
   SI: SI.L2-3.14.6
   AU: AU.L2-3.3.1
   CM: CM.L2-3.4.3
   CP: CP.L2-3.6.1
   IR: IR.L2-3.6.1
   RA: RA.L2-3.11.2
   SA: SA.L2-3.13.3

✅ No CMMC violations detected

📋 Security Recommendations:

   1. Ensure all API endpoints have authentication
   2. Use HTTPS for all communications
   3. Implement audit logging for all transactions
   4. Schedule regular security assessments

📄 Generating CMMC Audit Trail Document...

✅ Audit trail generated: examples/output/cmmc-audit-trail.md

📊 CMMC Compliance Summary:

   Total Practices Checked: 10
   Passing: 10
   Violations: 0
   Compliance Rate: 100.0%

   ✅ CMMC Level 2 Compliance: PASSING (≥90%)

📋 Next Steps:

   1. Document evidence for all CMMC practices
   2. Prepare for external CMMC assessment
   3. Schedule periodic audits (monthly recommended)
   4. Maintain audit trail for assessor review
```

**Generated audit trail** (`examples/output/cmmc-audit-trail.md`):
```markdown
# CMMC Level 2 Audit Trail

**Date**: 2025-12-04
**Feature**: E-commerce checkout flow
**Participants**: Emma

## CMMC Practices Checked (10 domains)
- AC.L2-3.1.1 (Access Control)
- IA.L2-3.5.10 (Identification and Authentication)
- SC.L2-3.13.8 (System and Communications Protection)
- SI.L2-3.14.6 (System and Information Integrity)
- AU.L2-3.3.1 (Audit and Accountability)
- CM.L2-3.4.3 (Configuration Management)
- CP.L2-3.6.1 (Contingency Planning)
- IR.L2-3.6.1 (Incident Response)
- RA.L2-3.11.2 (Risk Assessment)
- SA.L2-3.13.3 (System and Services Acquisition)

## Violations Found
*None*

## Decisions
- All CMMC practices reviewed and compliant
- Proceed with implementation
- Schedule security review before deployment
```

---

## Output Files

Examples generate output files in `examples/output/`:

- **`project-context.md`**: Decision log from multi-agent standups
- **`cmmc-audit-trail.md`**: CMMC compliance audit documentation

These files are created automatically when you run the examples. You can review them to see how Emma formats decisions and audit trails.

## Creating Your Own Examples

To create your own security analysis:

```typescript
import { reviewCode } from '../src/emma/security-review'

async function myCustomAnalysis() {
  const code = `
    // Your code here
  `

  const analysis = await reviewCode(code)

  if (analysis.detected) {
    console.log('Vulnerability:', analysis.vulnerability)
    console.log('Severity:', analysis.severity)
    console.log('CMMC:', analysis.cmmc)
    console.log('Mitigation:', analysis.mitigation)
  }
}

myCustomAnalysis()
```

## Integration Examples

### CI/CD Integration

```yaml
# .github/workflows/security-scan.yml
name: Emma Security Scan

on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Run Emma Security Scan
        run: npx ts-node examples/01-basic-review.ts
```

### Pre-commit Hook

```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "Running Emma security scan..."
npx ts-node examples/01-basic-review.ts

if [ $? -ne 0 ]; then
  echo "Security vulnerabilities detected! Commit blocked."
  exit 1
fi
```

## Additional Resources

- **[Emma README](../src/emma/README.md)**: Complete API reference
- **[CMMC Mapping](../docs/CMMC-MAPPING.md)**: CMMC practice-to-pattern mapping
- **[Architecture](../docs/ARCHITECTURE.md)**: System design and flows
- **[Test Suite](../tests/)**: Comprehensive test examples

## Support

For questions or issues:
1. Check the [documentation](../docs/)
2. Review [test examples](../tests/)
3. Open an issue in the FORGE repository

---

**Happy Secure Coding!** 🔒
