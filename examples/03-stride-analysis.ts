/**
 * Example 3: STRIDE Threat Modeling
 *
 * This example demonstrates how to use Emma for comprehensive STRIDE threat
 * modeling, which identifies all security threats across 6 categories.
 */

import { performSTRIDE } from '../src/daniel/security-review'
import type { StrideCategory } from '../src/types'

async function strideAnalysis() {
  console.log('=== Emma Security Review - STRIDE Threat Modeling ===\n')

  // Example: Payment transfer endpoint with multiple vulnerabilities
  console.log('Scenario: Analyzing payment transfer endpoint\n')

  const codeSnippet = `
    app.post('/api/transfer', async (req, res) => {
      const { fromAccount, toAccount, amount } = req.body

      // Transfer money
      await db.query(\`
        UPDATE accounts
        SET balance = balance - \${amount}
        WHERE id = \${fromAccount}
      \`)

      await db.query(\`
        UPDATE accounts
        SET balance = balance + \${amount}
        WHERE id = \${toAccount}
      \`)

      res.json({ success: true, message: 'Transfer completed' })
    })
  `

  const analysis = await performSTRIDE(codeSnippet)

  if (analysis.detected) {
    console.log(`Primary Vulnerability: ${analysis.vulnerability}`)
    console.log(`STRIDE Category: ${analysis.strideCategory}`)
    console.log(`Severity: ${analysis.severity}`)
    console.log(`OWASP: ${analysis.owasp}`)
    console.log(`CMMC Practice: ${analysis.cmmc} (${analysis.cmmcDomain})`)
    console.log('')

    // Display all threats found across STRIDE categories
    if (analysis.threats && analysis.threats.length > 0) {
      console.log(`Total Threats Detected: ${analysis.threats.length}\n`)

      // Group threats by STRIDE category
      const threatsByCategory: Record<string, typeof analysis.threats> = {}

      analysis.threats.forEach(threat => {
        const category = threat.category as string
        if (!threatsByCategory[category]) {
          threatsByCategory[category] = []
        }
        threatsByCategory[category].push(threat)
      })

      // Display threats by STRIDE category
      const strideCategories: StrideCategory[] = [
        'Spoofing',
        'Tampering',
        'Repudiation',
        'Information Disclosure',
        'Denial of Service',
        'Elevation of Privilege'
      ]

      strideCategories.forEach(category => {
        const threats = threatsByCategory[category]
        if (threats && threats.length > 0) {
          console.log(`\n[${category}] - ${threats.length} threat(s)`)
          console.log('─'.repeat(60))

          threats.forEach((threat, index) => {
            console.log(`\n  ${index + 1}. ${threat.description}`)
            console.log(`     Severity: ${threat.severity}`)
            console.log(`     CMMC Practice: ${threat.cmmcPractice}`)
            console.log(`     Mitigation: ${threat.mitigation}`)
          })
        }
      })

      console.log('\n' + '='.repeat(60))

      // Threat Model Summary
      console.log('\n📊 STRIDE Threat Model Summary:\n')

      console.log('Priority: Immediate Action Required')
      console.log('─'.repeat(60))

      const criticalThreats = analysis.threats.filter(t => t.severity === 'Critical')
      const highThreats = analysis.threats.filter(t => t.severity === 'High')
      const mediumThreats = analysis.threats.filter(t => t.severity === 'Medium')

      console.log(`🔴 Critical: ${criticalThreats.length} threat(s)`)
      criticalThreats.forEach(t => console.log(`   - ${t.description}`))

      console.log(`\n🟠 High: ${highThreats.length} threat(s)`)
      highThreats.forEach(t => console.log(`   - ${t.description}`))

      console.log(`\n🟡 Medium: ${mediumThreats.length} threat(s)`)
      mediumThreats.forEach(t => console.log(`   - ${t.description}`))

      console.log('\n' + '='.repeat(60))

      // Recommended Timeline
      console.log('\n⏰ Recommended Timeline:\n')
      console.log(`   Immediate (Today):`)
      criticalThreats.forEach(t => console.log(`   - Fix: ${t.description}`))

      console.log(`\n   This Week:`)
      highThreats.forEach(t => console.log(`   - Fix: ${t.description}`))

      console.log(`\n   This Month:`)
      mediumThreats.forEach(t => console.log(`   - Fix: ${t.description}`))
    }
  } else {
    console.log('✅ No threats detected across STRIDE categories')
    console.log(`   ${analysis.mitigation}`)
  }

  console.log('\n' + '='.repeat(60))
}

// Run the example
strideAnalysis().catch(console.error)
