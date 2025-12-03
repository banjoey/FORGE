/**
 * Acceptance Tests: US-E2 - Emma Performs STRIDE Threat Modeling
 *
 * User Story:
 * As a developer designing an API or feature
 * I want Emma to analyze threats using STRIDE framework
 * So that I understand attack vectors and implement mitigations
 */

import { describe, test, expect } from '@jest/globals'
import { runStandup } from '../src/standup/orchestrator'
import { performSTRIDE } from '../src/emma/stride'
import { StandupContext, StandupResult, ThreatModel } from '../src/types'

describe('US-E2: Emma Performs STRIDE Threat Modeling (8 points)', () => {

  /**
   * Scenario 5: Emma performs complete STRIDE analysis
   *
   * Given: Developer designs payment processing API
   * When: Emma performs threat model
   * Then: Emma analyzes all 6 STRIDE categories:
   *   - Spoofing: Attacker impersonates payment processor
   *   - Tampering: Attacker modifies payment amount
   *   - Repudiation: User denies making payment
   *   - Information Disclosure: Credit card data leaked
   *   - Denial of Service: Payment API overloaded
   *   - Elevation of Privilege: Attacker processes unauthorized payments
   * And: Emma provides mitigation for each threat
   * And: Emma prioritizes threats (Critical/High/Medium/Low)
   */
  test('Scenario 5: Emma performs complete STRIDE analysis', async () => {
    const feature = {
      name: 'Payment Processing API',
      type: 'API',
      dataFlow: ['User', 'API', 'Stripe', 'Database'],
      handlesData: ['credit cards', 'payment amounts', 'user PII']
    }

    const threatModel: ThreatModel = await performSTRIDE(feature)

    // All 6 STRIDE categories analyzed
    expect(threatModel.spoofing).toBeDefined()
    expect(threatModel.tampering).toBeDefined()
    expect(threatModel.repudiation).toBeDefined()
    expect(threatModel.informationDisclosure).toBeDefined()
    expect(threatModel.denialOfService).toBeDefined()
    expect(threatModel.elevationOfPrivilege).toBeDefined()

    // Each threat has mitigation
    const categories = [
      threatModel.spoofing,
      threatModel.tampering,
      threatModel.repudiation,
      threatModel.informationDisclosure,
      threatModel.denialOfService,
      threatModel.elevationOfPrivilege
    ]

    categories.forEach(threat => {
      expect(threat.mitigation).toBeDefined()
      expect(threat.mitigation.length).toBeGreaterThan(10)  // Non-trivial mitigation
      expect(threat.priority).toMatch(/Critical|High|Medium|Low/)
    })

    // Payment processing should have Critical threats
    const hasCriticalThreats = categories.some(t => t.priority === 'Critical')
    expect(hasCriticalThreats).toBe(true)
  })

  /**
   * Scenario 6: Emma identifies SQL injection (Tampering)
   *
   * Given: Developer proposes user search API
   * And: API uses string concatenation:
   *      query = "SELECT * FROM users WHERE email = '" + userEmail + "'"
   * When: Emma reviews API
   * Then: Emma identifies SQL injection (STRIDE: Tampering)
   * And: Emma classifies as Critical (OWASP A03, CMMC IA.L2-3.5.10)
   * And: Emma recommends parameterized queries
   * And: Emma provides code example:
   *      query = "SELECT * FROM users WHERE email = ?"
   *      db.execute(query, [userEmail])
   */
  test('Scenario 6: Emma identifies SQL injection vulnerability', async () => {
    const apiCode = `
      // Vulnerable code
      const email = req.body.email
      const query = "SELECT * FROM users WHERE email = '" + email + "'"
      const result = await db.execute(query)
    `

    const context: StandupContext = {
      feature: 'User search API',
      codeSnippet: apiCode,
      roster: ['Mary', 'Bob', 'Murat', 'Emma']
    }

    const result: StandupResult = await runStandup(context)

    // Emma should identify SQL injection
    const threatsText = result.Emma.threats.join(' ').toLowerCase()
    expect(threatsText).toMatch(/sql injection|sql|injection/)

    // Emma should classify as Tampering (STRIDE category)
    expect(result.Emma.strideCategories).toContain('Tampering')

    // Emma should classify as Critical severity
    expect(result.Emma.severity).toBe('Critical')

    // Emma should reference OWASP A03
    expect(result.Emma.owaspReference).toBe('A03')

    // Emma should reference CMMC practice
    expect(result.Emma.cmmcReferences).toContain('SI.L2-3.14.6')  // Input validation

    // Emma should recommend parameterized queries
    const recsText = result.Emma.recommendations.join(' ').toLowerCase()
    expect(recsText).toMatch(/parameterized|prepared statement|placeholder/)

    // Emma should provide code example (actionable)
    const hasCodeExample = result.Emma.codeExamples && result.Emma.codeExamples.length > 0
    expect(hasCodeExample).toBe(true)

    if (hasCodeExample) {
      const codeExample = result.Emma.codeExamples[0].toLowerCase()
      expect(codeExample).toMatch(/\?|prepare|bind/)  // Parameterized query syntax
    }
  })

  /**
   * Scenario 7: Emma prioritizes threats by risk
   *
   * Given: Emma identifies 10 threats in payment API
   * When: Emma prioritizes threats
   * Then: Emma assigns risk levels:
   *   - Critical: SQL injection, hardcoded secrets (immediate fix)
   *   - High: Missing rate limiting, weak password policy (fix in sprint)
   *   - Medium: No CSRF token, verbose error messages (fix in 30 days)
   *   - Low: Missing security headers, verbose logs (backlog)
   * And: Emma recommends fixing Critical/High in current sprint
   */
  test('Scenario 7: Emma prioritizes threats by risk level', async () => {
    const feature = {
      name: 'Payment API',
      endpoints: [
        { path: '/api/payment', method: 'POST', vulnerabilities: ['sql_injection', 'no_rate_limiting'] },
        { path: '/api/refund', method: 'POST', vulnerabilities: ['hardcoded_secret', 'no_csrf'] }
      ]
    }

    const context: StandupContext = {
      feature: 'Payment API security review',
      designDoc: feature,
      roster: ['Mary', 'Bob', 'Murat', 'Emma']
    }

    const result: StandupResult = await runStandup(context)

    // Emma should identify multiple threats
    expect(result.Emma.threats.length).toBeGreaterThan(3)

    // Emma should categorize by risk level
    const critical = result.Emma.threats.filter(t => t.priority === 'Critical')
    const high = result.Emma.threats.filter(t => t.priority === 'High')
    const medium = result.Emma.threats.filter(t => t.priority === 'Medium')

    expect(critical.length).toBeGreaterThan(0)  // Should have Critical threats
    expect(high.length + medium.length).toBeGreaterThan(0)  // Should have High/Medium threats

    // Critical threats should have immediate timeline
    critical.forEach(threat => {
      expect(threat.timeline).toMatch(/immediate|same day|now|block/)
    })

    // High threats should be fixed in current sprint
    high.forEach(threat => {
      expect(threat.timeline).toMatch(/sprint|week|1-7 days/)
    })

    // Emma should recommend fixing Critical/High first
    const priorityRec = result.Emma.recommendations.find(rec =>
      rec.toLowerCase().match(/critical|high|priority|first/)
    )
    expect(priorityRec).toBeDefined()
  })

  /**
   * Scenario 8: Emma documents threat model
   *
   * Given: Emma completes STRIDE analysis for payment API
   * When: Threat model is documented
   * Then: docs/threat-models/payment-api-stride.md is created
   * And: Document includes:
   *   - Data flow diagram (User → API → Stripe → DB)
   *   - All 6 STRIDE categories with threats
   *   - Mitigations for each threat
   *   - Risk prioritization (Critical/High/Medium/Low)
   *   - CMMC practice references
   *   - Date, participants, status
   */
  test('Scenario 8: Emma creates threat model document', async () => {
    const feature = {
      name: 'Payment Processing API',
      dataFlow: ['User', 'API', 'Stripe', 'Database']
    }

    const threatModel: ThreatModel = await performSTRIDE(feature)

    // Document threat model
    await threatModel.saveToFile('docs/threat-models/payment-api-stride.md')

    // Read threat model document
    const fs = require('fs').promises
    const threatModelDoc = await fs.readFile(
      'docs/threat-models/payment-api-stride.md',
      'utf-8'
    )

    // Verify content
    expect(threatModelDoc).toContain('Data Flow')
    expect(threatModelDoc).toContain('User')
    expect(threatModelDoc).toContain('API')
    expect(threatModelDoc).toContain('Stripe')

    // All 6 STRIDE categories documented
    expect(threatModelDoc).toContain('Spoofing')
    expect(threatModelDoc).toContain('Tampering')
    expect(threatModelDoc).toContain('Repudiation')
    expect(threatModelDoc).toContain('Information Disclosure')
    expect(threatModelDoc).toContain('Denial of Service')
    expect(threatModelDoc).toContain('Elevation of Privilege')

    // Mitigations documented
    expect(threatModelDoc).toContain('Mitigation')

    // CMMC practices referenced
    expect(threatModelDoc).toMatch(/CMMC|IA\.L2|AC\.L2|SC\.L2/)

    // Metadata included
    expect(threatModelDoc).toMatch(/\d{4}-\d{2}-\d{2}/)  // Date
    expect(threatModelDoc).toMatch(/Critical|High|Medium|Low/)  // Risk levels
  })

  /**
   * Integration Test: Emma collaborates with other agents
   *
   * Given: Standup with Mary, Bob, Murat, Emma reviewing payment API
   * When: Each agent provides perspective
   * Then: Emma's security analysis complements other perspectives
   * And: No agent contradicts another (synthesis, not conflict)
   */
  test('Integration: Emma collaborates with Mary/Bob/Murat', async () => {
    const context: StandupContext = {
      feature: 'Payment processing API',
      description: 'Process credit card payments via Stripe',
      roster: ['Mary', 'Bob', 'Murat', 'Emma']
    }

    const result: StandupResult = await runStandup(context)

    // All 4 agents should participate
    expect(result.participants).toEqual(['Mary', 'Bob', 'Murat', 'Emma'])

    // Each agent should have provided perspective
    expect(result.Mary.recommendation).toBeDefined()
    expect(result.Bob.recommendation).toBeDefined()
    expect(result.Murat.recommendation).toBeDefined()
    expect(result.Emma.recommendation).toBeDefined()

    // Emma's security perspective should complement others
    // Mary focuses on user value
    expect(result.Mary.focus).toBe('user_value')
    // Bob focuses on capacity/timeline
    expect(result.Bob.focus).toBe('capacity')
    // Murat focuses on testing
    expect(result.Murat.focus).toBe('testing')
    // Emma focuses on security
    expect(result.Emma.focus).toBe('security')

    // Synthesis: Combined recommendation
    expect(result.synthesis).toBeDefined()
    expect(result.synthesis.decision).toBeDefined()

    // No conflicts (agents should complement, not contradict)
    expect(result.conflicts).toHaveLength(0)
  })

})
