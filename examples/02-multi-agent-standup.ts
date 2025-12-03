/**
 * Example 2: Multi-Agent Standup
 *
 * This example demonstrates how to orchestrate a multi-agent standup where
 * Emma provides security perspective alongside Mary (Business), Bob (Capacity),
 * and Murat (Testing).
 */

import { runStandup } from '../src/standup/orchestrator'

async function multiAgentStandup() {
  console.log('=== Emma Security Review - Multi-Agent Standup ===\n')

  // Scenario: Team is discussing a new user authentication feature
  console.log('Scenario: Reviewing user authentication implementation\n')

  const codeSnippet = `
    app.post('/login', async (req, res) => {
      const { email, password } = req.body
      const user = await db.query("SELECT * FROM users WHERE email = '" + email + "'")

      if (user && user.password === password) {
        const token = jwt.sign({ userId: user.id }, 'my-secret-key')
        res.json({ token, user })
      } else {
        res.status(401).json({ error: 'Invalid credentials' })
      }
    })
  `

  const result = await runStandup({
    feature: 'User authentication system',
    roster: ['Emma', 'Mary', 'Bob', 'Murat'],
    codeSnippet,
    description: 'Login endpoint for user authentication'
  })

  console.log(`Participants: ${result.participants.join(', ')}\n`)

  // Emma's Security Perspective
  if (result.Emma) {
    console.log('👤 Emma (Security Engineer):')
    console.log(`   Focus: ${result.Emma.focus}`)
    console.log(`   Vulnerability: ${result.Emma.vulnerability}`)
    console.log(`   STRIDE Category: ${result.Emma.strideCategory}`)
    console.log(`   Severity: ${result.Emma.severity}`)
    console.log(`   CMMC Practice: ${result.Emma.cmmc}`)
    console.log(`   OWASP Reference: ${result.Emma.owaspReference}`)
    console.log(`\n   Recommendations:`)
    result.Emma.recommendations?.forEach((rec, i) => {
      console.log(`   ${i + 1}. ${rec}`)
    })
    console.log('')
  }

  // Mary's Business Perspective
  if (result.Mary) {
    console.log('👤 Mary (Business Analyst):')
    console.log(`   Focus: ${result.Mary.focus}`)
    console.log(`   Analysis: ${result.Mary.analysis}`)
    console.log(`   Recommendation: ${result.Mary.recommendation}`)
    console.log('')
  }

  // Bob's Capacity Perspective
  if (result.Bob) {
    console.log('👤 Bob (Capacity Planner):')
    console.log(`   Focus: ${result.Bob.focus}`)
    console.log(`   Analysis: ${result.Bob.analysis}`)
    console.log(`   Recommendation: ${result.Bob.recommendation}`)
    console.log('')
  }

  // Murat's Testing Perspective
  if (result.Murat) {
    console.log('👤 Murat (Test Engineer):')
    console.log(`   Focus: ${result.Murat.focus}`)
    console.log(`   Analysis: ${result.Murat.analysis}`)
    console.log(`   Recommendation: ${result.Murat.recommendation}`)
    console.log('')
  }

  // Team Synthesis
  if (result.synthesis) {
    console.log('🤝 Team Synthesis:')
    console.log(`   ${result.synthesis.decision}`)
    console.log('')
  }

  // Check for conflicts
  if (result.conflicts && result.conflicts.length > 0) {
    console.log('⚠️  Conflicts Detected:')
    result.conflicts.forEach((conflict, i) => {
      console.log(`   ${i + 1}. ${conflict}`)
    })
    console.log('')
  } else {
    console.log('✅ No conflicts - Team is aligned\n')
  }

  // Record decision to project context
  console.log('📝 Recording decision to project context...')
  const decisionPath = 'examples/output/project-context.md'
  await result.recordDecision?.(decisionPath)
  console.log(`   ✅ Decision recorded to ${decisionPath}`)

  console.log('\n' + '='.repeat(60))
}

// Run the example
multiAgentStandup().catch(console.error)
