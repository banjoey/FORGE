/**
 * Example 2: Multi-Agent Standup
 *
 * This example demonstrates how to orchestrate a multi-agent standup where
 * Daniel provides security perspective alongside Mary (Business), Clay (Capacity),
 * and Hefley (Testing).
 */

import { runStandup } from '../src/standup/orchestrator'

async function multiAgentStandup() {
  console.log('=== Daniel Security Review - Multi-Agent Standup ===\n')

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
    roster: ['Daniel', 'Mary', 'Clay', 'Hefley'],
    codeSnippet,
    description: 'Login endpoint for user authentication'
  })

  console.log(`Participants: ${result.participants.join(', ')}\n`)

  // Daniel's Security Perspective
  if (result.Daniel) {
    console.log('👤 Daniel (Security Engineer):')
    console.log(`   Focus: ${result.Daniel.focus}`)
    console.log(`   Vulnerability: ${result.Daniel.vulnerability}`)
    console.log(`   STRIDE Category: ${result.Daniel.strideCategory}`)
    console.log(`   Severity: ${result.Daniel.severity}`)
    console.log(`   CMMC Practice: ${result.Daniel.cmmc}`)
    console.log(`   OWASP Reference: ${result.Daniel.owaspReference}`)
    console.log(`\n   Recommendations:`)
    result.Daniel.recommendations?.forEach((rec, i) => {
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

  // Clay's Capacity Perspective
  if (result.Clay) {
    console.log('👤 Clay (Capacity Planner):')
    console.log(`   Focus: ${result.Clay.focus}`)
    console.log(`   Analysis: ${result.Clay.analysis}`)
    console.log(`   Recommendation: ${result.Clay.recommendation}`)
    console.log('')
  }

  // Hefley's Testing Perspective
  if (result.Hefley) {
    console.log('👤 Hefley (Test Engineer):')
    console.log(`   Focus: ${result.Hefley.focus}`)
    console.log(`   Analysis: ${result.Hefley.analysis}`)
    console.log(`   Recommendation: ${result.Hefley.recommendation}`)
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
