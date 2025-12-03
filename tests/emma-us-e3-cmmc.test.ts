/**
 * Acceptance Tests: US-E3 - Emma Enforces CMMC Compliance
 *
 * User Story:
 * As a developer building software for DoD contractors
 * I want Emma to enforce CMMC Level 2 compliance (110 practices)
 * So that I meet DoD cybersecurity requirements
 */

import { describe, test, expect } from '@jest/globals'
import { runStandup } from '../src/standup/orchestrator'
import { lookupCMMCPractice } from '../src/emma/cmmc'
import { StandupContext, StandupResult, CMMCPractice } from '../src/types'

describe('US-E3: Emma Enforces CMMC Compliance (5 points)', () => {

  /**
   * Scenario 9: Emma looks up CMMC practice by ID
   *
   * Given: Developer asks "What is CMMC AC.L2-3.1.1?"
   * When: Emma looks up practice
   * Then: Emma returns practice definition:
   *   - ID: AC.L2-3.1.1
   *   - Domain: Access Control (AC)
   *   - Requirement: "Limit system access to authorized users"
   *   - Implementation guidance
   *   - Evidence requirements
   * And: Emma can look up any of 110 Level 2 practices
   */
  test('Scenario 9: Emma looks up CMMC practice by ID', async () => {
    // Test Case 1: Access Control practice
    const practice1: CMMCPractice = await lookupCMMCPractice('AC.L2-3.1.1')

    expect(practice1.id).toBe('AC.L2-3.1.1')
    expect(practice1.domain).toBe('Access Control')
    expect(practice1.domainCode).toBe('AC')
    expect(practice1.level).toBe(2)
    expect(practice1.requirement).toMatch(/limit.*system access.*authorized users/i)
    expect(practice1.implementation).toBeDefined()
    expect(practice1.implementation.length).toBeGreaterThan(20)  // Non-trivial guidance
    expect(practice1.evidence).toBeDefined()

    // Test Case 2: Identification and Authentication practice
    const practice2: CMMCPractice = await lookupCMMCPractice('IA.L2-3.5.10')

    expect(practice2.id).toBe('IA.L2-3.5.10')
    expect(practice2.domain).toBe('Identification and Authentication')
    expect(practice2.domainCode).toBe('IA')
    expect(practice2.requirement).toMatch(/protect.*authentication.*password/i)

    // Test Case 3: System and Communications Protection practice
    const practice3: CMMCPractice = await lookupCMMCPractice('SC.L2-3.13.8')

    expect(practice3.id).toBe('SC.L2-3.13.8')
    expect(practice3.domainCode).toBe('SC')
    expect(practice3.requirement).toMatch(/transmission confidentiality|protect.*transit/i)

    // Test Case 4: System and Information Integrity practice
    const practice4: CMMCPractice = await lookupCMMCPractice('SI.L2-3.14.6')

    expect(practice4.id).toBe('SI.L2-3.14.6')
    expect(practice4.domainCode).toBe('SI')
    expect(practice4.requirement).toMatch(/input validation|malicious.*input/i)

    // Verify Emma can look up any of the 110 practices (spot check 4 of 110)
    // Full validation: All 110 practices accessible from knowledge base
  })

  /**
   * Scenario 10: Emma detects CMMC violation
   *
   * Given: Developer proposes code that violates CMMC
   * When: Emma reviews code
   * Then: Emma identifies CMMC violation
   * And: Emma cites specific CMMC practice violated
   * And: Emma provides remediation guidance
   *
   * Test Cases:
   * 1. Missing authentication → Violates AC.L2-3.1.1
   * 2. Hardcoded password → Violates IA.L2-3.5.10
   * 3. HTTP (not HTTPS) → Violates SC.L2-3.13.8
   * 4. No input validation → Violates SI.L2-3.14.6
   */
  test('Scenario 10: Emma detects CMMC violations', async () => {
    // Violation 1: Missing authentication
    const missingAuthCode = `
      app.get('/admin/users', async (req, res) => {
        // No authentication check!
        const users = await db.query("SELECT * FROM users")
        res.json(users)
      })
    `

    const context1: StandupContext = {
      feature: 'Admin API endpoint',
      codeSnippet: missingAuthCode,
      roster: ['Mary', 'Bob', 'Murat', 'Emma']
    }

    const result1: StandupResult = await runStandup(context1)

    expect(result1.Emma.cmmcViolations).toBeDefined()
    expect(result1.Emma.cmmcViolations.length).toBeGreaterThan(0)

    const authViolation = result1.Emma.cmmcViolations.find(v =>
      v.practice.startsWith('AC.L2-3.1')
    )
    expect(authViolation).toBeDefined()
    expect(authViolation?.severity).toBe('Critical')
    expect(authViolation?.remediation).toMatch(/authentication.*middleware|require.*auth/i)

    // Violation 2: Hardcoded password
    const hardcodedPasswordCode = `
      const ADMIN_PASSWORD = "admin123"
      if (password === ADMIN_PASSWORD) {
        return generateToken(user)
      }
    `

    const context2: StandupContext = {
      feature: 'Authentication logic',
      codeSnippet: hardcodedPasswordCode,
      roster: ['Mary', 'Bob', 'Murat', 'Emma']
    }

    const result2: StandupResult = await runStandup(context2)

    const passwordViolation = result2.Emma.cmmcViolations.find(v =>
      v.practice.startsWith('IA.L2-3.5')
    )
    expect(passwordViolation).toBeDefined()
    expect(passwordViolation?.severity).toBe('Critical')
    expect(passwordViolation?.remediation).toMatch(/environment.*variable|secret.*manager|bcrypt/i)

    // Violation 3: HTTP (not HTTPS)
    const httpCode = `
      app.listen(80, () => {
        console.log('Server running on HTTP')
      })
    `

    const context3: StandupContext = {
      feature: 'Server configuration',
      codeSnippet: httpCode,
      roster: ['Mary', 'Bob', 'Murat', 'Emma']
    }

    const result3: StandupResult = await runStandup(context3)

    const httpsViolation = result3.Emma.cmmcViolations.find(v =>
      v.practice.startsWith('SC.L2-3.13')
    )
    expect(httpsViolation).toBeDefined()
    expect(httpsViolation?.remediation).toMatch(/https|tls|ssl/i)

    // Violation 4: No input validation
    const noValidationCode = `
      const query = "SELECT * FROM users WHERE email = '" + req.body.email + "'"
    `

    const context4: StandupContext = {
      feature: 'Database query',
      codeSnippet: noValidationCode,
      roster: ['Mary', 'Bob', 'Murat', 'Emma']
    }

    const result4: StandupResult = await runStandup(context4)

    const validationViolation = result4.Emma.cmmcViolations.find(v =>
      v.practice.startsWith('SI.L2-3.14')
    )
    expect(validationViolation).toBeDefined()
    expect(validationViolation?.remediation).toMatch(/parameterized|prepared.*statement|validate/i)
  })

  /**
   * Scenario 11: Emma enforces all 17 CMMC domains
   *
   * Given: Emma performs comprehensive security review
   * When: Emma analyzes feature across all security domains
   * Then: Emma checks practices from all 17 CMMC domains:
   *   1. AC - Access Control
   *   2. AT - Awareness and Training
   *   3. AU - Audit and Accountability
   *   4. CA - Assessment, Authorization, and Monitoring
   *   5. CM - Configuration Management
   *   6. CP - Contingency Planning
   *   7. IA - Identification and Authentication
   *   8. IR - Incident Response
   *   9. MA - Maintenance
   *   10. MP - Media Protection
   *   11. PE - Physical Protection
   *   12. PS - Personnel Security
   *   13. RA - Risk Assessment
   *   14. RE - Recovery
   *   15. SA - System and Services Acquisition
   *   16. SC - System and Communications Protection
   *   17. SI - System and Information Integrity
   * And: Emma prioritizes Critical domains (AC, IA, SC, SI, AU)
   */
  test('Scenario 11: Emma enforces all 17 CMMC domains', async () => {
    const comprehensiveFeature = {
      name: 'Enterprise Authentication System',
      components: [
        'User authentication',
        'Database storage',
        'API endpoints',
        'Audit logging',
        'Configuration management',
        'Incident response',
        'Backup and recovery'
      ],
      sensitivity: 'High',
      dataHandled: ['user credentials', 'PII', 'audit logs']
    }

    const context: StandupContext = {
      feature: 'Enterprise Authentication System',
      description: 'Complete auth system with audit, backup, incident response',
      designDoc: comprehensiveFeature,
      roster: ['Mary', 'Bob', 'Murat', 'Emma']
    }

    const result: StandupResult = await runStandup(context)

    // Emma should check practices from all 17 domains
    const domainsChecked = new Set(
      result.Emma.cmmcPracticesChecked.map(p => p.domainCode)
    )

    // Critical domains (must be checked)
    expect(domainsChecked).toContain('AC')  // Access Control
    expect(domainsChecked).toContain('IA')  // Identification and Authentication
    expect(domainsChecked).toContain('SC')  // System and Communications Protection
    expect(domainsChecked).toContain('SI')  // System and Information Integrity
    expect(domainsChecked).toContain('AU')  // Audit and Accountability

    // High-priority domains (should be checked for comprehensive review)
    expect(domainsChecked).toContain('CM')  // Configuration Management
    expect(domainsChecked).toContain('IR')  // Incident Response
    expect(domainsChecked).toContain('CP')  // Contingency Planning
    expect(domainsChecked).toContain('RE')  // Recovery

    // At least 10 of 17 domains should be checked for comprehensive feature
    expect(domainsChecked.size).toBeGreaterThanOrEqual(10)

    // Emma should prioritize Critical domain violations
    const criticalViolations = result.Emma.cmmcViolations.filter(v =>
      ['AC', 'IA', 'SC', 'SI', 'AU'].includes(v.domainCode) &&
      v.severity === 'Critical'
    )

    expect(criticalViolations.length).toBeGreaterThan(0)

    // Emma should recommend fixing Critical domains first
    const priorityRec = result.Emma.recommendations.find(rec =>
      rec.toLowerCase().match(/critical.*first|ac\.|ia\.|sc\.|si\.|au\./)
    )
    expect(priorityRec).toBeDefined()
  })

  /**
   * Scenario 12: Emma creates CMMC audit trail
   *
   * Given: Emma identifies CMMC violations during standup
   * When: Standup completes
   * Then: Emma logs CMMC audit trail to project-context.md:
   *   - Date and participants
   *   - CMMC practices checked
   *   - Violations found (practice ID, severity, remediation)
   *   - Decisions made (accepted risk, remediation plan)
   *   - Status (Open, In Progress, Resolved)
   * And: Audit trail is structured for CMMC compliance reporting
   */
  test('Scenario 12: Emma creates CMMC audit trail', async () => {
    const sqlInjectionCode = `
      const query = "SELECT * FROM users WHERE id = " + userId
      const result = await db.execute(query)
    `

    const context: StandupContext = {
      feature: 'User lookup API',
      codeSnippet: sqlInjectionCode,
      roster: ['Mary', 'Bob', 'Murat', 'Emma'],
      projectContext: 'docs/project-context.md'
    }

    const result: StandupResult = await runStandup(context)

    // Emma should create audit trail entry
    expect(result.Emma.auditTrail).toBeDefined()

    const auditEntry = result.Emma.auditTrail

    // Audit trail should include metadata
    expect(auditEntry.date).toMatch(/\d{4}-\d{2}-\d{2}/)  // ISO date
    expect(auditEntry.participants).toEqual(['Mary', 'Bob', 'Murat', 'Emma'])
    expect(auditEntry.feature).toBe('User lookup API')

    // Audit trail should document CMMC practices checked
    expect(auditEntry.practicesChecked).toBeDefined()
    expect(auditEntry.practicesChecked.length).toBeGreaterThan(0)
    expect(auditEntry.practicesChecked).toContain('SI.L2-3.14.6')  // Input validation

    // Audit trail should document violations found
    expect(auditEntry.violationsFound).toBeDefined()
    expect(auditEntry.violationsFound.length).toBeGreaterThan(0)

    const sqlInjectionViolation = auditEntry.violationsFound.find(v =>
      v.practice === 'SI.L2-3.14.6'
    )

    expect(sqlInjectionViolation).toBeDefined()
    expect(sqlInjectionViolation?.severity).toBe('Critical')
    expect(sqlInjectionViolation?.description).toMatch(/sql injection|input validation/i)
    expect(sqlInjectionViolation?.remediation).toMatch(/parameterized|prepared/i)
    expect(sqlInjectionViolation?.status).toBe('Open')

    // Audit trail should include decisions made
    expect(auditEntry.decisions).toBeDefined()

    // Record audit trail to project-context.md
    await result.recordAuditTrail('docs/project-context.md')

    // Read project-context.md and verify audit trail is logged
    const fs = require('fs').promises
    const projectContext = await fs.readFile('docs/project-context.md', 'utf-8')

    // Verify CMMC audit trail section exists
    expect(projectContext).toMatch(/CMMC.*Audit.*Trail|Security.*Review/i)
    expect(projectContext).toContain('SI.L2-3.14.6')
    expect(projectContext).toContain('SQL injection')
    expect(projectContext).toContain('Parameterized')
    expect(projectContext).toMatch(/\d{4}-\d{2}-\d{2}/)  // Date
    expect(projectContext).toMatch(/Status.*Open|In Progress|Resolved/i)

    // Verify audit trail is structured for CMMC reporting
    // (Should be machine-readable, not just prose)
    const auditTrailSection = projectContext.match(/## CMMC Audit Trail[\s\S]*?(?=##|$)/)
    expect(auditTrailSection).toBeDefined()
  })

})
