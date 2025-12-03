/**
 * Example 4: CMMC Compliance Audit
 *
 * This example demonstrates how to use Emma to generate a CMMC Level 2
 * compliance audit trail for a comprehensive feature review.
 */

import { runStandup } from '../src/standup/orchestrator'
import { promises as fs } from 'fs'

async function cmmcAudit() {
  console.log('=== Emma Security Review - CMMC Compliance Audit ===\n')

  // Scenario: Comprehensive review of e-commerce checkout flow
  console.log('Scenario: CMMC Level 2 compliance audit for e-commerce checkout\n')

  const result = await runStandup({
    feature: 'E-commerce checkout flow',
    roster: ['Emma'],
    description: 'Multi-component checkout system with payment processing',
    designDoc: {
      components: [
        'API Gateway',
        'Authentication Service',
        'Payment Service',
        'Order Database',
        'Audit Logging',
        'Backup System'
      ],
      dataFlow: 'User → API Gateway → Auth → Payment Service → Database',
      sensitiveData: ['Credit cards', 'PII', 'Order history']
    }
  })

  console.log('Emma\'s Security Analysis:\n')

  if (result.Emma) {
    console.log(`Focus: ${result.Emma.focus}`)

    // CMMC Practices Checked
    if (result.Emma.cmmcPracticesChecked) {
      console.log(`\nCMMC Practices Checked: ${result.Emma.cmmcPracticesChecked.length} practices across multiple domains\n`)

      // Group by domain
      const practicesByDomain: Record<string, typeof result.Emma.cmmcPracticesChecked> = {}

      result.Emma.cmmcPracticesChecked.forEach(practice => {
        const domain = practice.domainCode
        if (!practicesByDomain[domain]) {
          practicesByDomain[domain] = []
        }
        practicesByDomain[domain].push(practice)
      })

      // Display by domain
      Object.entries(practicesByDomain).forEach(([domain, practices]) => {
        console.log(`   ${domain}: ${practices.map(p => p.id).join(', ')}`)
      })
    }

    // CMMC Violations Found
    if (result.Emma.cmmcViolations && result.Emma.cmmcViolations.length > 0) {
      console.log(`\n\n⚠️  CMMC Violations Found: ${result.Emma.cmmcViolations.length}\n`)

      result.Emma.cmmcViolations.forEach((violation, index) => {
        console.log(`${index + 1}. ${violation.description}`)
        console.log(`   Practice: ${violation.practice} (${violation.domainCode})`)
        console.log(`   Severity: ${violation.severity}`)
        console.log(`   Status: ${violation.status}`)
        console.log(`   Remediation: ${violation.remediation}`)
        console.log('')
      })
    } else {
      console.log('\n\n✅ No CMMC violations detected\n')
    }

    // Recommendations
    if (result.Emma.recommendations && result.Emma.recommendations.length > 0) {
      console.log('📋 Security Recommendations:\n')
      result.Emma.recommendations.forEach((rec, i) => {
        console.log(`   ${i + 1}. ${rec}`)
      })
      console.log('')
    }
  }

  console.log('='.repeat(60))

  // Generate CMMC Audit Trail Document
  console.log('\n📄 Generating CMMC Audit Trail Document...\n')

  const auditPath = 'examples/output/cmmc-audit-trail.md'

  await result.recordAuditTrail?.(auditPath)

  console.log(`✅ Audit trail generated: ${auditPath}`)

  // Read and display the audit trail
  try {
    const auditContent = await fs.readFile(auditPath, 'utf-8')
    console.log('\n' + '='.repeat(60))
    console.log('Audit Trail Contents:')
    console.log('='.repeat(60) + '\n')
    console.log(auditContent)
  } catch (err) {
    console.log(`   (File will be created at: ${auditPath})`)
  }

  console.log('\n' + '='.repeat(60))

  // Compliance Summary
  console.log('\n📊 CMMC Compliance Summary:\n')

  const totalPractices = result.Emma?.cmmcPracticesChecked?.length || 0
  const violations = result.Emma?.cmmcViolations?.length || 0
  const passingPractices = totalPractices - violations

  const complianceRate = totalPractices > 0
    ? ((passingPractices / totalPractices) * 100).toFixed(1)
    : '0.0'

  console.log(`   Total Practices Checked: ${totalPractices}`)
  console.log(`   Passing: ${passingPractices}`)
  console.log(`   Violations: ${violations}`)
  console.log(`   Compliance Rate: ${complianceRate}%`)

  if (parseFloat(complianceRate) >= 90) {
    console.log(`\n   ✅ CMMC Level 2 Compliance: PASSING (≥90%)`)
  } else if (parseFloat(complianceRate) >= 70) {
    console.log(`\n   ⚠️  CMMC Level 2 Compliance: NEEDS IMPROVEMENT (70-89%)`)
  } else {
    console.log(`\n   ❌ CMMC Level 2 Compliance: FAILING (<70%)`)
  }

  console.log('\n' + '='.repeat(60))

  // Next Steps
  console.log('\n📋 Next Steps:\n')

  if (violations > 0) {
    console.log('   1. Review all violations listed above')
    console.log('   2. Prioritize remediation by severity (Critical → High → Medium)')
    console.log('   3. Implement recommended mitigations')
    console.log('   4. Re-run audit to verify compliance')
    console.log('   5. Document evidence for each CMMC practice')
  } else {
    console.log('   1. Document evidence for all CMMC practices')
    console.log('   2. Prepare for external CMMC assessment')
    console.log('   3. Schedule periodic audits (monthly recommended)')
    console.log('   4. Maintain audit trail for assessor review')
  }

  console.log('\n' + '='.repeat(60))
}

// Run the example
cmmcAudit().catch(console.error)
