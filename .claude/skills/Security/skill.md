---
name: Security
description: Proactive security engineering for PAI projects. USE WHEN user needs threat modeling, CMMC compliance baseline, security requirements, vulnerability analysis, or security-first design. Prevents security issues during design, not after deployment.
---

# Security

Shift-left security: identify and mitigate threats before code is written.

## Workflow Routing

| Workflow | When to Use | Output |
|----------|-------------|--------|
| ThreatModel | Designing new feature or system | Threat model document with STRIDE threats and mitigations |
| CmmcBaseline | Starting DoD/government project | CMMC Level 2 compliance baseline with gap analysis |

## Examples

### Example 1: Threat model a new feature
```
User: "Threat model the user login feature"
Skill loads: Security → ThreatModel workflow
Output: STRIDE threats identified (spoofing, tampering, etc.) with mitigations
```

### Example 2: Generate CMMC baseline
```
User: "Create CMMC baseline for our e-commerce app"
Skill loads: Security → CmmcBaseline workflow
Output: CMMC practices mapped to features, gap analysis, compliance roadmap
```

### Example 3: Security review for user story
```
User: "Add security requirements to this user story: file upload"
Skill loads: Security → ThreatModel workflow (focused on file upload)
Output: Security threats (malware, XXE, path traversal) + mitigations
```

## Integration

- Works with AgilePm skill (adds security reqs to user stories)
- Works with TestArchitect skill (security test scenarios from threat model)
- Generates threat-model.md for project documentation
- Maps to CMMC practices for compliance

## Methodology

This skill follows security-first principles:
- Threat model during design (not after deployment)
- STRIDE methodology (Microsoft's threat modeling framework)
- CMMC Level 2 baseline (110 practices for DoD contractors)
- Risk-based prioritization (fix critical threats first)

Based on industry standards: STRIDE, OWASP Top 10, CMMC Model v2.0.
