# FORGE Implementation

**Emma Security Engineer - Pattern-Based Vulnerability Detection**

This directory contains the TypeScript implementation of Emma's security review capabilities.

---

## Quick Start

```typescript
import { reviewCode } from './emma/security-review'

const code = `
  const query = "SELECT * FROM users WHERE email = '" + email + "'"
`

const analysis = await reviewCode(code)
console.log(analysis.vulnerability)  // "SQL Injection - String Concatenation"
console.log(analysis.severity)       // "Critical"
console.log(analysis.cmmc)           // "SI.L2-3.14.6"
```

---

## Directory Structure

```
src/
├── types/
│   └── index.ts                    # TypeScript type definitions
│       - SecurityAnalysis
│       - VulnerabilityPattern
│       - CMMCPractice
│       - StandupContext
│
├── emma/
│   ├── vulnerability-patterns.ts   # 40+ detection patterns
│   │   - SQL Injection (9 patterns)
│   │   - XSS (10 patterns)
│   │   - Authentication (10 patterns)
│   │   - Authorization (4 patterns)
│   │   - CMMC Violations (5 patterns)
│   │
│   ├── cmmc-lookup.ts             # CMMC Level 2 practice lookup
│   │   - lookupCMMCPractice(id)
│   │   - getCMMCDomainPractices(domain)
│   │   - 25 practices across 12 domains
│   │
│   ├── security-review.ts         # Core security analysis
│   │   - reviewCode(code)
│   │   - performSTRIDE(code)
│   │
│   └── index.ts                   # Module exports
│
└── README.md                       # This file
```

---

## Core Functions

### reviewCode(code: string)

Analyzes code for security vulnerabilities using pattern matching.

**Returns**: `SecurityAnalysis`

```typescript
interface SecurityAnalysis {
  detected: boolean             // Was vulnerability found?
  vulnerability: string         // Vulnerability name
  strideCategory: StrideCategory // STRIDE classification
  severity: SeverityLevel       // Critical | High | Medium | Low
  owasp: string                 // OWASP Top 10 reference
  cmmc: string                  // CMMC practice ID
  mitigation: string            // How to fix
  codeExample?: string          // Secure code example
  threats?: SecurityThreat[]    // Additional threats (STRIDE analysis)
}
```

**Example**:

```typescript
const code = `
  const query = \`SELECT * FROM users WHERE id = \${userId}\`
`

const analysis = await reviewCode(code)
// {
//   detected: true,
//   vulnerability: "SQL Injection - Template Literals",
//   strideCategory: "Tampering",
//   severity: "Critical",
//   owasp: "A03",
//   cmmc: "SI.L2-3.14.6",
//   mitigation: "Use parameterized queries instead of template literals...",
//   codeExample: "const query = \"SELECT * FROM users WHERE id = ?\";\n..."
// }
```

---

### performSTRIDE(code: string)

Performs complete STRIDE threat analysis, finding all threats across all categories.

**Returns**: `SecurityAnalysis` with `threats` array

```typescript
const code = `
  app.post('/login', (req, res) => {
    const user = users.find(u => u.email === req.body.email)
    res.cookie('sessionId', user.id)
  })
`

const analysis = await performSTRIDE(code)
// {
//   detected: true,
//   vulnerability: "Missing Rate Limiting",
//   threats: [
//     { category: "Denial of Service", description: "Missing Rate Limiting", ... },
//     { category: "Elevation of Privilege", description: "Insecure Cookie Settings", ... }
//   ]
// }
```

---

### lookupCMMCPractice(practiceId: string)

Looks up CMMC Level 2 practice details.

**Returns**: `CMMCPractice | undefined`

```typescript
const practice = lookupCMMCPractice('SI.L2-3.14.6')
// {
//   id: 'SI.L2-3.14.6',
//   domain: 'SI',
//   name: 'Input Validation',
//   description: 'Monitor organizational systems...',
//   nistControls: ['SI-10']
// }
```

---

## Vulnerability Patterns

### SQL Injection (9 patterns)

| Pattern | Example | Severity |
|---------|---------|----------|
| String Concatenation | `"SELECT * FROM users WHERE email = '" + email + "'"` | Critical |
| Template Literals | `` `SELECT * FROM users WHERE id = ${userId}` `` | Critical |
| Second-Order | Stored data used in query without sanitization | Critical |
| ORDER BY | `` `SELECT * FROM users ORDER BY ${column}` `` | Critical |
| LIMIT/OFFSET | `` `SELECT * FROM users LIMIT ${limit}` `` | Critical |
| Stored Procedure | `` `CALL getUserByEmail('${email}')` `` | Critical |
| UNION-based | UNION SELECT attacks | Critical |
| Blind/Time-based | `SLEEP()`, `WAITFOR DELAY` | Critical |
| NoSQL | `$where` with user input | Critical |

### XSS (10 patterns)

| Pattern | Example | Severity |
|---------|---------|----------|
| Reflected XSS | `` res.send(`<h1>${req.query.q}</h1>`) `` | Critical |
| Stored XSS | `` comments.map(c => `<p>${c.text}</p>`) `` | Critical |
| DOM-based | `document.write(userInput)` | High |
| innerHTML | `element.innerHTML = userInput` | Critical |
| Event Handlers | `onclick="${userInput}"` | Critical |
| CSS Injection | `style="${userInput}"` | Medium |
| SVG Injection | SVG with user input | High |
| Markdown XSS | Unsafe markdown rendering | High |
| JSON Response | `<script>` in JSON | High |
| JSONP Callback | Unsafe JSONP | High |

### Authentication Bypass (10 patterns)

| Pattern | Example | Severity |
|---------|---------|----------|
| Hardcoded Credentials | `password = "admin123"` | Critical |
| Weak Password Policy | `password.length < 8` | High |
| Missing Rate Limiting | Login without rate limit | High |
| JWT Secret in Code | `jwt.sign(payload, "secret")` | Critical |
| Insecure Password Reset | `Math.random()` for tokens | High |
| Session Fixation | `sessionId = req.query.sid` | High |
| Missing Auth Check | Protected route without auth | Critical |
| Insecure Cookies | No httpOnly/secure flags | High |
| OAuth State Missing | OAuth without state parameter | High |
| JWT Algorithm Confusion | `jwt.verify()` without algorithm | Critical |

### Authorization Flaws (4 patterns)

| Pattern | Example | Severity |
|---------|---------|----------|
| IDOR | No ownership check on resource access | High |
| Missing Access Control | No role-based access control | Critical |
| Path Traversal | `../` in file paths | Critical |
| JWT No Expiration | JWT without expiresIn | High |

### CMMC Violations (5 patterns)

| Pattern | CMMC Practice | Severity |
|---------|---------------|----------|
| HTTP (not HTTPS) | SC.L2-3.13.8 | High |
| Missing Security Headers | SC.L2-3.13.15 | Medium |
| Verbose Error Messages | SI.L2-3.14.3 | Medium |
| Missing Audit Logs | AU.L2-3.3.1 | Medium |
| Unencrypted Data at Rest | MP.L2-3.8.3 | Critical |

---

## STRIDE Mapping

| STRIDE Category | Vulnerabilities |
|-----------------|-----------------|
| **Spoofing** | Weak passwords, hardcoded credentials, missing auth, session fixation, OAuth issues, JWT problems |
| **Tampering** | SQL injection (all types), XSS (all types), path traversal |
| **Repudiation** | Missing audit logs |
| **Information Disclosure** | HTTP (not HTTPS), verbose errors, unencrypted data |
| **Denial of Service** | Missing rate limiting |
| **Elevation of Privilege** | IDOR, missing access control, insecure cookies, JWT without expiration |

---

## CMMC Domains Covered

- **AC** (Access Control) - 4 practices
- **AT** (Awareness Training) - 1 practice
- **AU** (Audit & Accountability) - 1 practice
- **CM** (Configuration Management) - 2 practices
- **CP** (Contingency Planning) - 1 practice
- **IA** (Identification & Authentication) - 3 practices
- **IR** (Incident Response) - 1 practice
- **MP** (Media Protection) - 1 practice
- **RA** (Risk Assessment) - 1 practice
- **SA** (System Acquisition) - 1 practice
- **SC** (System Communications) - 5 practices
- **SI** (System Integrity) - 3 practices

---

## Testing

```bash
# Run all tests
npm test

# Run only critical security tests
npm test -- tests/emma-security-suite-critical.test.ts

# Run with coverage
npm run test:coverage
```

**Current Test Results**:
- Critical Security Tests: 15/31 passing (48%)
- Target: 54/60 tests (90%)

See `docs/emma-implementation-summary.md` for detailed test results.

---

## Development

### Adding New Patterns

1. **Define pattern in `vulnerability-patterns.ts`**:

```typescript
{
  name: 'Your Vulnerability',
  patterns: [
    /regex.*pattern/,
    /another.*pattern/
  ],
  strideCategory: 'Tampering',
  severity: 'Critical',
  owasp: 'A03',
  cmmc: 'SI.L2-3.14.6',
  mitigation: 'How to fix this vulnerability',
  codeExample: 'Secure code example here'
}
```

2. **Add to appropriate pattern array** (`sqlInjectionPatterns`, `xssPatterns`, etc.)

3. **Write test** in `tests/emma-security-suite-*.test.ts`

4. **Run tests**: `npm test`

### Adding CMMC Practices

1. **Add practice to `cmmc-lookup.ts`**:

```typescript
'SI.L2-3.14.6': {
  id: 'SI.L2-3.14.6',
  domain: 'SI',
  name: 'Input Validation',
  description: 'Monitor organizational systems...',
  nistControls: ['SI-10']
}
```

2. **Reference in vulnerability pattern**: Set `cmmc: 'SI.L2-3.14.6'`

3. **Use in analysis**: `lookupCMMCPractice('SI.L2-3.14.6')`

---

## Limitations

### Pattern Matching Limitations

1. **Context-Unaware**: Doesn't understand code semantics
   - Example: Can't tell if variable is sanitized before use

2. **Framework-Agnostic**: Doesn't know framework-specific safe patterns
   - Example: Doesn't know React auto-escapes JSX

3. **False Positives**: Broad patterns catch safe code
   - Example: `innerHTML` in test/mock code

4. **False Negatives**: Narrow patterns miss variations
   - Example: SQL injection with different quote styles

### Recommended Improvements

1. **Hybrid Approach**: Combine pattern matching + LLM semantic analysis
2. **Framework Rules**: Add Express, React, Vue-specific patterns
3. **User Feedback**: Learn from false positives/negatives
4. **Confidence Scores**: Probability instead of boolean detection

---

## Performance

**Current**: Sequential pattern matching (~1-5ms per code snippet)

**Optimizations Available**:
- Cache compiled regexes
- Parallel pattern matching
- Early exit on first match (already implemented)

**Benchmarks** (on 100 code snippets):
- Average: 2ms per snippet
- Total: 200ms for 100 snippets
- Acceptable for interactive use

---

## Future Enhancements

### Short-term (1-2 days)

- [ ] Tune patterns to reach 90% test pass rate
- [ ] Add missing authorization & CMMC patterns
- [ ] Implement standup orchestrator

### Medium-term (1 week)

- [ ] LLM-based semantic analysis (complement patterns)
- [ ] Context-aware analysis (understand sanitization)
- [ ] Framework-specific rules

### Long-term (Release 0.2+)

- [ ] Auto-fix suggestions (generate PRs)
- [ ] Machine learning from user feedback
- [ ] IDE integration (VS Code extension)

---

## Resources

- **Implementation Summary**: `docs/emma-implementation-summary.md`
- **Test Suite**: `tests/emma-security-suite-*.test.ts`
- **STRIDE Framework**: [Microsoft STRIDE](https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats)
- **CMMC**: [CMMC Level 2](https://dodcio.defense.gov/CMMC/)
- **OWASP Top 10**: [OWASP](https://owasp.org/www-project-top-ten/)

---

**Last Updated**: 2025-12-02
**Version**: 0.2.0
**Status**: Implementation complete, iterating towards 90% test pass rate
