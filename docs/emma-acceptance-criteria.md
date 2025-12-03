# Emma Agent: Acceptance Criteria (ATDD)

**Purpose**: Given-When-Then scenarios for Emma (Security Engineer) agent
**Stories**: US-E1, US-E2, US-E3
**Format**: ATDD (Acceptance Test-Driven Development)

---

## Testing Strategy for Non-Deterministic LLM Outputs

**Challenge**: Emma is an AI agent (LLM-based). Her responses aren't deterministic. If we ask Emma to review authentication 10 times, she might phrase threats differently each time.

**Solution** (from Murat's standup review): Use **semantic similarity** instead of exact string matching.

### Approach 1: Semantic Similarity (Embedding-Based)

```typescript
import { cosineSimilarity, getEmbedding } from './embeddings'

// Instead of exact match
expect(result.Emma.threats).toContain('credential theft')  // ❌ Brittle

// Use semantic similarity
const threats = result.Emma.threats
const hasAuthThreat = threats.some(threat =>
  cosineSimilarity(
    getEmbedding(threat),
    getEmbedding('authentication threats')
  ) > 0.8  // 80% similarity threshold
)
expect(hasAuthThreat).toBe(true)  // ✅ Flexible
```

### Approach 2: Keyword Presence (Simpler)

```typescript
// Match any authentication-related keyword
const threatsText = result.Emma.threats.join(' ').toLowerCase()
expect(threatsText).toMatch(/credential|authentication|spoofing|bypass/i)  // ✅ Flexible
```

### Approach 3: STRIDE Category Matching

```typescript
// Verify Emma identifies the right STRIDE category
expect(result.Emma.strideCategory).toBe('Spoofing')  // ✅ More deterministic
expect(result.Emma.severity).toBe('Critical')        // ✅ More deterministic
```

**Recommended Approach**: Use **Approach 3** (STRIDE category + severity) for most tests, fall back to **Approach 2** (keyword matching) for threat descriptions.

---

## US-E1: Emma Participates in Security Standups (5 points)

### Scenario 1: Emma joins standup on authentication feature

**Given**: User runs standup to design authentication feature
**And**: Roster includes Mary, Bob, Murat, Emma
**When**: RunStandup workflow executes
**Then**: Emma provides security perspective
**And**: Emma identifies authentication threats
**And**: Emma recommends security controls (MFA, password hashing, etc.)
**And**: Emma references CMMC practices (IA domain)

**Test Implementation** (Updated with semantic similarity):
```typescript
// Test: Emma participates in standup
describe('US-E1: Emma participates in standup', () => {
  test('Emma provides security perspective on auth feature', async () => {
    const context = {
      feature: 'User authentication',
      roster: ['Mary', 'Bob', 'Murat', 'Emma']
    }

    const result = await runStandup(context)

    // Deterministic checks
    expect(result.participants).toContain('Emma')
    expect(result.Emma.strideCategories).toContain('Spoofing')  // ✅ STRIDE category
    expect(result.Emma.cmmcReferences).toContain('IA.L2-3.5.10')

    // Flexible keyword matching (not exact strings)
    const threatsText = result.Emma.threats.join(' ').toLowerCase()
    expect(threatsText).toMatch(/credential|authentication|spoofing|password/)

    const recsText = result.Emma.recommendations.join(' ').toLowerCase()
    expect(recsText).toMatch(/mfa|multi-factor|two-factor|2fa/)
  })
})
```

---

### Scenario 2: Emma defers to Mary on UX questions

**Given**: Standup discusses 2FA user experience
**And**: Question is about UX (not security)
**When**: Emma is asked "Should we require 2FA on every login?"
**Then**: Emma defers to Mary (Business Analyst)
**And**: Emma says "From a security perspective, more frequent 2FA is better, but Mary can advise on user friction."

**Test Implementation**:
```typescript
// Test: Emma defers outside security domain
test('Emma defers to Mary on UX questions', async () => {
  const context = {
    question: 'Should we require 2FA on every login?',
    domain: 'UX'
  }

  const result = await emma.respond(context)

  expect(result.defer).toBe(true)
  expect(result.deferTo).toBe('Mary')
  expect(result.response).toContain('From a security perspective')
  expect(result.response).toContain('Mary can advise')
})
```

---

### Scenario 3: Emma provides actionable recommendations

**Given**: Developer proposes login API
**And**: Login uses HTTP (not HTTPS)
**When**: Emma reviews the API design
**Then**: Emma identifies "credentials in transit" threat
**And**: Emma recommends HTTPS with TLS 1.3
**And**: Emma provides implementation guidance (certificate setup, HSTS header)
**And**: Emma does NOT say vague "this is insecure" (must be actionable)

**Test Implementation**:
```typescript
// Test: Emma provides actionable recommendations
test('Emma provides actionable security recommendations', async () => {
  const apiDesign = {
    endpoint: '/login',
    protocol: 'HTTP',  // Insecure!
    auth: 'password'
  }

  const result = await emma.reviewAPI(apiDesign)

  expect(result.threats).toContain('credentials in transit')
  expect(result.recommendations).toContain('HTTPS')
  expect(result.recommendations).toContain('TLS 1.3')
  expect(result.implementation).toContain('certificate')
  expect(result.vague).toBe(false)  // Must be actionable
})
```

---

### Scenario 4: Emma logs decisions in project-context.md

**Given**: Emma recommends bcrypt for password hashing
**And**: Team agrees to use bcrypt (cost factor 12)
**When**: Decision is recorded
**Then**: `project-context.md` is updated
**And**: Decision includes Emma's rationale
**And**: Decision references CMMC practice (IA.L2-3.5.10)
**And**: Decision includes date, participants, status

**Test Implementation**:
```typescript
// Test: Emma's decisions are logged
test('Emma decisions logged in project-context.md', async () => {
  const decision = {
    title: 'Use bcrypt for password hashing',
    emmaRecommendation: 'bcrypt with cost factor 12',
    cmmcPractice: 'IA.L2-3.5.10'
  }

  await recordDecision(decision)

  const projectContext = await readFile('docs/project-context.md')
  expect(projectContext).toContain('bcrypt')
  expect(projectContext).toContain('cost factor 12')
  expect(projectContext).toContain('IA.L2-3.5.10')
  expect(projectContext).toContain('Emma')
  expect(projectContext).toMatch(/\d{4}-\d{2}-\d{2}/)  // Date
})
```

---

## US-E2: Emma Performs STRIDE Threat Modeling (8 points)

### Scenario 5: Emma performs complete STRIDE analysis

**Given**: Developer designs payment processing API
**When**: Emma performs threat model
**Then**: Emma analyzes all 6 STRIDE categories:
  - **S**poofing: Attacker impersonates payment processor
  - **T**ampering: Attacker modifies payment amount
  - **R**epudiation: User denies making payment
  - **I**nformation Disclosure: Credit card data leaked
  - **D**enial of Service: Payment API overloaded
  - **E**levation of Privilege: Attacker processes unauthorized payments
**And**: Emma provides mitigation for each threat
**And**: Emma prioritizes threats (Critical/High/Medium/Low)

**Test Implementation**:
```typescript
// Test: Emma performs complete STRIDE
test('Emma analyzes all 6 STRIDE categories', async () => {
  const feature = {
    type: 'Payment Processing API',
    dataFlow: ['User', 'API', 'Stripe', 'Database']
  }

  const threatModel = await emma.performSTRIDE(feature)

  // All 6 STRIDE categories analyzed
  expect(threatModel.spoofing).toBeDefined()
  expect(threatModel.tampering).toBeDefined()
  expect(threatModel.repudiation).toBeDefined()
  expect(threatModel.informationDisclosure).toBeDefined()
  expect(threatModel.denialOfService).toBeDefined()
  expect(threatModel.elevationOfPrivilege).toBeDefined()

  // Each threat has mitigation
  Object.values(threatModel).forEach(threat => {
    expect(threat.mitigation).toBeDefined()
    expect(threat.priority).toMatch(/Critical|High|Medium|Low/)
  })
})
```

---

### Scenario 6: Emma identifies SQL injection (Tampering)

**Given**: Developer proposes user search API
**And**: API uses string concatenation:
```javascript
query = "SELECT * FROM users WHERE email = '" + userEmail + "'"
```
**When**: Emma reviews API
**Then**: Emma identifies SQL injection (STRIDE: Tampering)
**And**: Emma classifies as Critical (OWASP A03, CMMC IA.L2-3.5.10)
**And**: Emma recommends parameterized queries
**And**: Emma provides code example:
```javascript
query = "SELECT * FROM users WHERE email = ?"
db.execute(query, [userEmail])
```

**Test Implementation**:
```typescript
// Test: Emma identifies SQL injection
test('Emma identifies SQL injection vulnerability', async () => {
  const apiCode = `
    const query = "SELECT * FROM users WHERE email = '" + userEmail + "'"
    const result = await db.execute(query)
  `

  const analysis = await emma.reviewCode(apiCode)

  expect(analysis.vulnerabilities).toContain('SQL injection')
  expect(analysis.strideCategory).toBe('Tampering')
  expect(analysis.severity).toBe('Critical')
  expect(analysis.owasp).toBe('A03')
  expect(analysis.cmmc).toBe('IA.L2-3.5.10')
  expect(analysis.mitigation).toContain('parameterized queries')
  expect(analysis.codeExample).toContain('db.execute(query, [userEmail])')
})
```

---

### Scenario 7: Emma prioritizes threats by risk

**Given**: Emma identifies 10 threats in payment API
**When**: Emma prioritizes threats
**Then**: Emma assigns risk levels:
  - Critical: SQL injection, hardcoded secrets (immediate fix)
  - High: Missing rate limiting, weak password policy (fix in sprint)
  - Medium: No CSRF token, verbose error messages (fix in 30 days)
  - Low: Missing security headers, verbose logs (backlog)
**And**: Emma recommends fixing Critical/High in current sprint

**Test Implementation**:
```typescript
// Test: Emma prioritizes threats
test('Emma prioritizes threats by risk level', async () => {
  const threats = await emma.identifyThreats(paymentAPI)

  const critical = threats.filter(t => t.risk === 'Critical')
  const high = threats.filter(t => t.risk === 'High')
  const medium = threats.filter(t => t.risk === 'Medium')

  expect(critical.length).toBeGreaterThan(0)
  expect(critical[0].timeline).toBe('immediate')
  expect(high[0].timeline).toBe('current sprint')
  expect(medium[0].timeline).toBe('30 days')
})
```

---

### Scenario 8: Emma documents threat model

**Given**: Emma completes STRIDE analysis for payment API
**When**: Threat model is documented
**Then**: `docs/threat-models/payment-api-stride.md` is created
**And**: Document includes:
  - Data flow diagram (User → API → Stripe → DB)
  - All 6 STRIDE categories with threats
  - Mitigations for each threat
  - Risk prioritization (Critical/High/Medium/Low)
  - CMMC practice references
  - Date, participants, status

**Test Implementation**:
```typescript
// Test: Emma documents threat model
test('Emma creates threat model document', async () => {
  await emma.documentThreatModel(paymentAPI)

  const threatModel = await readFile('docs/threat-models/payment-api-stride.md')

  expect(threatModel).toContain('Data Flow')
  expect(threatModel).toContain('Spoofing')
  expect(threatModel).toContain('Tampering')
  expect(threatModel).toContain('Mitigation')
  expect(threatModel).toContain('CMMC')
  expect(threatModel).toMatch(/\d{4}-\d{2}-\d{2}/)
})
```

---

## US-E3: Emma Enforces CMMC Level 2 Compliance (5 points)

### Scenario 9: Emma looks up CMMC practice

**Given**: Developer asks "What is AC.L2-3.1.1?"
**When**: Emma looks up practice
**Then**: Emma responds with:
  - Practice ID: AC.L2-3.1.1
  - Domain: Access Control (AC)
  - Description: "Limit system access to authorized users"
  - Implementation: Role-based access control (RBAC), principle of least privilege
  - Assessment: How to verify compliance

**Test Implementation**:
```typescript
// Test: Emma looks up CMMC practice
test('Emma retrieves CMMC practice details', async () => {
  const practice = await emma.lookupCMMC('AC.L2-3.1.1')

  expect(practice.id).toBe('AC.L2-3.1.1')
  expect(practice.domain).toBe('Access Control')
  expect(practice.description).toContain('authorized users')
  expect(practice.implementation).toContain('RBAC')
  expect(practice.assessment).toBeDefined()
})
```

---

### Scenario 10: Emma identifies CMMC violation

**Given**: Developer designs API with no access control
**And**: All users can access all endpoints (public)
**When**: Emma reviews API
**Then**: Emma identifies AC.L2-3.1.1 violation
**And**: Emma classifies as Critical (CMMC audit failure)
**And**: Emma recommends RBAC implementation
**And**: Emma provides example:
```javascript
if (user.role !== 'admin') {
  return res.status(403).json({ error: 'Forbidden' })
}
```

**Test Implementation**:
```typescript
// Test: Emma identifies CMMC violation
test('Emma identifies CMMC AC.L2-3.1.1 violation', async () => {
  const api = {
    endpoint: '/admin/users',
    accessControl: false  // No access control!
  }

  const analysis = await emma.reviewAPI(api)

  expect(analysis.cmmcViolations).toContain('AC.L2-3.1.1')
  expect(analysis.severity).toBe('Critical')
  expect(analysis.auditImpact).toBe('failure')
  expect(analysis.mitigation).toContain('RBAC')
  expect(analysis.codeExample).toContain('user.role')
})
```

---

### Scenario 11: Emma enforces all 17 CMMC domains

**Given**: Developer designs complete application
**When**: Emma performs CMMC baseline review
**Then**: Emma checks all 17 domains:
  - AC (Access Control): 22 practices
  - AT (Awareness Training): 4 practices
  - AU (Audit & Accountability): 9 practices
  - CA (Security Assessment): 3 practices
  - CM (Configuration Management): 9 practices
  - CP (Contingency Planning): 4 practices
  - IA (Identification & Authentication): 11 practices
  - IR (Incident Response): 3 practices
  - MA (Maintenance): 6 practices
  - MP (Media Protection): 7 practices
  - PE (Physical Protection): 6 practices
  - PS (Personnel Security): 2 practices
  - RA (Risk Assessment): 5 practices
  - RE (Recovery): 1 practice
  - SA (System Acquisition): 5 practices
  - SC (System Communications): 23 practices
  - SI (System Integrity): 17 practices
**And**: Emma identifies gaps in each domain
**And**: Emma prioritizes gaps by risk

**Test Implementation**:
```typescript
// Test: Emma reviews all 17 CMMC domains
test('Emma performs comprehensive CMMC baseline', async () => {
  const baseline = await emma.performCMMCBaseline(application)

  // All 17 domains reviewed
  const domains = Object.keys(baseline.domains)
  expect(domains).toHaveLength(17)
  expect(domains).toContain('AC')
  expect(domains).toContain('IA')
  expect(domains).toContain('SC')
  // ... all 17 domains

  // Total 110 practices checked
  const totalPractices = Object.values(baseline.domains)
    .reduce((sum, domain) => sum + domain.practices.length, 0)
  expect(totalPractices).toBe(110)

  // Gaps identified and prioritized
  expect(baseline.gaps).toBeDefined()
  expect(baseline.gaps[0].priority).toMatch(/Critical|High|Medium|Low/)
})
```

---

### Scenario 12: Emma provides CMMC audit trail

**Given**: Emma makes 10 CMMC recommendations during project
**When**: CMMC audit occurs
**Then**: `docs/project-context.md` has audit trail:
  - All CMMC decisions logged (date, practice, rationale)
  - Emma's recommendations for each practice
  - Implementation status (complete, in progress, deferred)
  - Evidence (code references, documentation)
**And**: Auditor can trace all 110 practices

**Test Implementation**:
```typescript
// Test: Emma provides audit trail
test('Emma creates CMMC audit trail', async () => {
  // Simulate 10 CMMC recommendations
  for (let i = 0; i < 10; i++) {
    await emma.recommend({
      practice: `AC.L2-3.1.${i}`,
      recommendation: 'Implement RBAC'
    })
  }

  const auditTrail = await emma.generateAuditTrail()

  expect(auditTrail.decisions).toHaveLength(10)
  expect(auditTrail.decisions[0].practice).toMatch(/AC\.L2/)
  expect(auditTrail.decisions[0].date).toBeDefined()
  expect(auditTrail.decisions[0].status).toMatch(/complete|in progress|deferred/)
  expect(auditTrail.decisions[0].evidence).toBeDefined()
})
```

---

## Test Suite Summary

**US-E1 (Standup participation)**: 4 scenarios
1. Emma joins standup
2. Emma defers to other agents
3. Emma provides actionable recommendations
4. Emma logs decisions

**US-E2 (STRIDE threat modeling)**: 4 scenarios
5. Emma performs complete STRIDE
6. Emma identifies SQL injection
7. Emma prioritizes threats
8. Emma documents threat model

**US-E3 (CMMC enforcement)**: 4 scenarios
9. Emma looks up CMMC practice
10. Emma identifies CMMC violation
11. Emma enforces all 17 domains
12. Emma provides audit trail

**Total**: 12 acceptance scenarios

---

## Validation Checklist

Before merging Emma agent:
- [ ] All 12 scenarios have automated tests
- [ ] All tests pass (100% pass rate)
- [ ] Emma catches ≥90% of security test suite (100 vulnerabilities)
- [ ] Emma provides actionable recommendations (not vague)
- [ ] Emma references CMMC practices correctly (100% accuracy)
- [ ] Emma defers to other agents outside security domain
- [ ] Threat models documented in `docs/threat-models/`
- [ ] Audit trail in `docs/project-context.md`

---

**Last Updated**: 2025-12-02 (Updated after standup review)
**ATDD Compliance**: ✅ All acceptance criteria in Given-When-Then format
**Test Coverage**: 12 scenarios (US-E1: 4, US-E2: 4, US-E3: 4)
**Testing Strategy**: Semantic similarity / keyword matching for LLM outputs (Murat's recommendation)

---

## Implementation Notes

**All test implementations should follow this pattern**:
1. ✅ **Use deterministic checks** for structured outputs (STRIDE category, CMMC ID, severity)
2. ✅ **Use keyword matching** for free-text outputs (threat descriptions, recommendations)
3. ❌ **Avoid exact string matching** (LLM outputs vary between runs)

**Example Pattern**:
```typescript
// ✅ GOOD: Deterministic + flexible
expect(result.Emma.strideCategory).toBe('Tampering')  // Deterministic
expect(result.Emma.threats.join(' ')).toMatch(/sql|injection|tampering/)  // Flexible

// ❌ BAD: Exact string matching
expect(result.Emma.threats).toContain('SQL injection vulnerability')  // Brittle
```
