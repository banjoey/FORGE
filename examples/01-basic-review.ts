/**
 * Example 1: Basic Security Review
 *
 * This example demonstrates how to use Emma for a simple code security review.
 * It analyzes a code snippet and reports any vulnerabilities found.
 */

import { reviewCode } from '../src/emma/security-review'

async function basicReview() {
  console.log('=== Emma Security Review - Basic Example ===\n')

  // Example 1: SQL Injection vulnerability
  console.log('Example 1: Analyzing code for SQL Injection...')
  const vulnerableCode1 = `
    app.get('/api/user/:id', async (req, res) => {
      const userId = req.params.id
      const query = "SELECT * FROM users WHERE id = " + userId
      const user = await db.query(query)
      res.json(user)
    })
  `

  const analysis1 = await reviewCode(vulnerableCode1)

  if (analysis1.detected) {
    console.log('❌ Vulnerability Detected!')
    console.log(`   Name: ${analysis1.vulnerability}`)
    console.log(`   STRIDE Category: ${analysis1.strideCategory}`)
    console.log(`   Severity: ${analysis1.severity}`)
    console.log(`   OWASP: ${analysis1.owasp}`)
    console.log(`   CMMC Practice: ${analysis1.cmmc} (${analysis1.cmmcDomain})`)
    console.log(`   Description: ${analysis1.cmmcPractice}`)
    console.log(`\n   Mitigation: ${analysis1.mitigation}`)

    if (analysis1.codeExample) {
      console.log(`\n   Secure Code Example:\n${analysis1.codeExample}`)
    }
  } else {
    console.log('✅ No vulnerabilities detected')
  }

  console.log('\n' + '='.repeat(60) + '\n')

  // Example 2: Missing authentication
  console.log('Example 2: Analyzing code for missing authentication...')
  const vulnerableCode2 = `
    app.get('/admin/users', async (req, res) => {
      const users = await db.query("SELECT * FROM users")
      res.json(users)
    })
  `

  const analysis2 = await reviewCode(vulnerableCode2)

  if (analysis2.detected) {
    console.log('❌ Vulnerability Detected!')
    console.log(`   Name: ${analysis2.vulnerability}`)
    console.log(`   STRIDE Category: ${analysis2.strideCategory}`)
    console.log(`   Severity: ${analysis2.severity}`)
    console.log(`   OWASP: ${analysis2.owasp}`)
    console.log(`   CMMC Practice: ${analysis2.cmmc} (${analysis2.cmmcDomain})`)
    console.log(`\n   Mitigation: ${analysis2.mitigation}`)

    if (analysis2.codeExample) {
      console.log(`\n   Secure Code Example:\n${analysis2.codeExample}`)
    }
  } else {
    console.log('✅ No vulnerabilities detected')
  }

  console.log('\n' + '='.repeat(60) + '\n')

  // Example 3: Secure code (should pass)
  console.log('Example 3: Analyzing secure code...')
  const secureCode = `
    const authMiddleware = async (req, res, next) => {
      const token = req.headers.authorization?.split(' ')[1]
      if (!token) return res.status(401).json({ error: 'Unauthorized' })
      try {
        req.user = await verifyToken(token)
        next()
      } catch (err) {
        res.status(401).json({ error: 'Invalid token' })
      }
    }

    app.get('/admin/users', authMiddleware, async (req, res) => {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' })
      }
      const query = "SELECT * FROM users WHERE organization_id = ?"
      const users = await db.execute(query, [req.user.orgId])
      res.json(users)
    })
  `

  const analysis3 = await reviewCode(secureCode)

  if (analysis3.detected) {
    console.log('❌ Vulnerability Detected!')
    console.log(`   Name: ${analysis3.vulnerability}`)
    console.log(`   Severity: ${analysis3.severity}`)
  } else {
    console.log('✅ No vulnerabilities detected - Code appears secure!')
    console.log(`   ${analysis3.mitigation}`)
  }

  console.log('\n' + '='.repeat(60))
}

// Run the example
basicReview().catch(console.error)
