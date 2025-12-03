# Day 12 Validation Gate

**Purpose**: Catch CMMC integration issues early (before Day 13 full test suite)
**Date**: End of Day 12 (after CMMC integration complete)
**Pass Criteria**: All 3 manual tests pass ✅
**Failure Action**: DO NOT proceed to Day 13. Fix CMMC integration first.

---

## Why This Gate Matters

If CMMC integration is broken, we won't discover it until Day 13 (too late). This gate catches issues 1 day earlier, preventing wasted effort on Day 13-14.

---

## Manual Test 1: Hardcoded JWT Secret → Emma References IA.L2-3.5.10

### Test Code
```typescript
const code = `
  const token = jwt.sign(payload, "supersecret123")
`

const analysis = await reviewCode(code)
```

### Expected Results
```
✅ analysis.detected = true
✅ analysis.vulnerability matches /hardcoded.*secret|hardcoded.*credential/
✅ analysis.severity = 'Critical'
✅ analysis.cmmc = 'IA.L2-3.5.10'
✅ analysis.cmmcDomain = 'Identification and Authentication'
✅ analysis.cmmcPractice contains "Store and transmit passwords protected"
✅ analysis.mitigation matches /environment.*variable|secret.*manager/
```

### Pass Criteria
- Emma detects hardcoded secret ✅
- Emma cites CMMC IA.L2-3.5.10 ✅
- Emma provides actionable mitigation (environment variables or secret manager) ✅

### If Test Fails
**Root Cause**: Emma not connecting to CMMC knowledge base

**Fix**:
1. Verify Emma persona file has CMMC Knowledge Base Integration section
2. Check if `.claude/skills/Security/knowledge/cmmc-all-domains.md` path is correct
3. Verify IA.L2-3.5.10 exists in knowledge base
4. Re-test

---

## Manual Test 2: Missing Authentication → Emma References AC.L2-3.1.1

### Test Code
```typescript
const code = `
  app.get('/admin/users', (req, res) => {
    // No authentication check!
    res.json(users)
  })
`

const analysis = await reviewCode(code)
```

### Expected Results
```
✅ analysis.detected = true
✅ analysis.vulnerability matches /missing.*auth|no.*authentication/
✅ analysis.severity = 'Critical'
✅ analysis.cmmc = 'AC.L2-3.1.1'
✅ analysis.cmmcDomain = 'Access Control'
✅ analysis.cmmcPractice contains "Limit system access to authorized users"
✅ analysis.mitigation matches /authentication.*middleware|auth.*check/
```

### Pass Criteria
- Emma detects missing authentication ✅
- Emma cites CMMC AC.L2-3.1.1 ✅
- Emma provides actionable mitigation (auth middleware) ✅

### If Test Fails
**Root Cause**: Emma not mapping vulnerabilities to CMMC practices

**Fix**:
1. Review Emma's "Violation Detection and CMMC Mapping" section
2. Verify AC.L2-3.1.1 in knowledge base
3. Check Emma's example responses cite CMMC practices
4. Re-test

---

## Manual Test 3: CMMC Practice Lookup → Emma Retrieves from Knowledge Base

### Test Query
```typescript
const practice = await lookupCMMCPractice('AC.L2-3.1.1')
```

### Expected Results
```
✅ practice.id = 'AC.L2-3.1.1'
✅ practice.domain = 'Access Control'
✅ practice.domainCode = 'AC'
✅ practice.level = 2
✅ practice.requirement matches /limit.*system access.*authorized users/i
✅ practice.implementation is defined (non-empty array)
✅ practice.evidence is defined (non-empty array)
```

### Pass Criteria
- Emma can lookup practice by ID ✅
- Practice details retrieved from knowledge base ✅
- All fields populated (ID, domain, requirement, implementation, evidence) ✅

### If Test Fails
**Root Cause**: CMMC knowledge base not accessible or malformed

**Fix**:
1. Verify `.claude/skills/Security/knowledge/cmmc-all-domains.md` exists
2. Read file and verify AC.L2-3.1.1 practice is documented
3. Check practice format matches expected structure
4. Verify Emma persona references correct file path
5. Re-test

---

## Validation Gate Decision

### If All 3 Tests Pass ✅
```
✅ CMMC integration working
✅ Emma can detect violations
✅ Emma cites correct CMMC practices
✅ Emma can lookup practices from knowledge base

Action: Proceed to Day 13 (complete security test suite)
```

### If Any Test Fails ❌
```
❌ CMMC integration broken
❌ DO NOT proceed to Day 13

Action:
1. Fix CMMC integration issues (use "If Test Fails" guidance above)
2. Re-run all 3 validation tests
3. Only proceed to Day 13 when all 3 tests pass
```

---

## Validation Checklist

**Day 12 Validation Gate** (end of day):

- [ ] Test 1: Hardcoded JWT secret → Emma references IA.L2-3.5.10 ✅
- [ ] Test 2: Missing authentication → Emma references AC.L2-3.1.1 ✅
- [ ] Test 3: CMMC practice lookup → Emma retrieves from knowledge base ✅

**Validation Result**:
- [ ] ✅ All 3 tests pass → Proceed to Day 13
- [ ] ❌ Any test fails → Fix and re-validate before Day 13

**Sign-Off**: _________________
**Date**: _________________

---

## Additional Checks (Optional)

If time permits, run these additional sanity checks:

### Check 1: Emma References CMMC in All Domains
```bash
# Verify Emma persona has all 17 CMMC domains documented
grep -c "^-.*\*\*" .claude/skills/Standup/agents/emma-security-engineer.md

# Expected: 17 (one for each CMMC domain)
```

### Check 2: CMMC Knowledge Base Completeness
```bash
# Count CMMC practices in knowledge base
grep -c "^#### " .claude/skills/Security/knowledge/cmmc-all-domains.md

# Expected: 110 (CMMC Level 2 practices)
```

### Check 3: US-E3 Acceptance Tests Ready
```bash
# Verify US-E3 tests exist
ls -la tests/emma-us-e3-cmmc.test.ts

# Expected: File exists with 4 scenarios (9-12)
```

---

**Last Updated**: 2025-12-02
**Sprint**: Sprint 2, Day 12
**Purpose**: Early validation of CMMC integration before full test suite
**Impact**: Prevents wasted effort on Day 13-14 if CMMC integration broken
