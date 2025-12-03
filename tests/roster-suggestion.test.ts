/**
 * Tests: Smart Roster Suggestion
 *
 * User Story:
 * As a developer running a standup
 * I want smart roster suggestions based on feature context
 * So that I get the right expertise without manually selecting agents
 */

import { describe, test, expect } from '@jest/globals'
import { suggestRoster, runStandup } from '../src/standup/orchestrator'
import { StandupContext } from '../src/types'

describe('Smart Roster Suggestion', () => {

  /**
   * Authentication features should get full team
   * (Critical feature needs all perspectives: security, UX, timeline, priority, testing)
   */
  test('Authentication feature → Full team (Daniel, Mary, Clay, Hefley, Amy)', () => {
    expect(suggestRoster('User authentication')).toEqual(['Daniel', 'Mary', 'Clay', 'Hefley', 'Amy'])
    expect(suggestRoster('Login API')).toEqual(['Daniel', 'Mary', 'Clay', 'Hefley', 'Amy'])
    expect(suggestRoster('OAuth2 integration')).toEqual(['Daniel', 'Mary', 'Clay', 'Hefley', 'Amy'])
    expect(suggestRoster('Password reset flow')).toEqual(['Daniel', 'Mary', 'Clay', 'Hefley', 'Amy'])
    expect(suggestRoster('Two-factor authentication')).toEqual(['Daniel', 'Mary', 'Clay', 'Hefley', 'Amy'])
    expect(suggestRoster('MFA setup')).toEqual(['Daniel', 'Mary', 'Clay', 'Hefley', 'Amy'])
    expect(suggestRoster('Session management')).toEqual(['Daniel', 'Mary', 'Clay', 'Hefley', 'Amy'])
  })

  /**
   * Security features should get security-focused team
   * (Daniel for security analysis, Clay for implementation, Amy for security testing)
   */
  test('Security feature → Security team (Daniel, Clay, Amy)', () => {
    expect(suggestRoster('Security audit')).toEqual(['Daniel', 'Clay', 'Amy'])
    expect(suggestRoster('Vulnerability assessment')).toEqual(['Daniel', 'Clay', 'Amy'])
    expect(suggestRoster('SQL injection fix')).toEqual(['Daniel', 'Clay', 'Amy'])
    expect(suggestRoster('XSS prevention')).toEqual(['Daniel', 'Clay', 'Amy'])
    expect(suggestRoster('CSRF protection')).toEqual(['Daniel', 'Clay', 'Amy'])
    expect(suggestRoster('Threat modeling')).toEqual(['Daniel', 'Clay', 'Amy'])
  })

  /**
   * UX features should get UX-focused team
   * (Mary for UX analysis, Daniel for security review, Clay for implementation, Amy for testing)
   */
  test('UX feature → UX team (Mary, Daniel, Clay, Amy)', () => {
    expect(suggestRoster('User experience improvements')).toEqual(['Mary', 'Daniel', 'Clay', 'Amy'])
    expect(suggestRoster('UI redesign')).toEqual(['Mary', 'Daniel', 'Clay', 'Amy'])
    expect(suggestRoster('Interface navigation')).toEqual(['Mary', 'Daniel', 'Clay', 'Amy'])
    expect(suggestRoster('Design system')).toEqual(['Mary', 'Daniel', 'Clay', 'Amy'])
    expect(suggestRoster('Usability testing')).toEqual(['Mary', 'Daniel', 'Clay', 'Amy'])
  })

  /**
   * Database features should get database-focused team
   * (Daniel for SQL injection, Clay for implementation, Amy for testing)
   */
  test('Database feature → Database team (Daniel, Clay, Amy)', () => {
    expect(suggestRoster('Database schema design')).toEqual(['Daniel', 'Clay', 'Amy'])
    expect(suggestRoster('SQL query optimization')).toEqual(['Daniel', 'Clay', 'Amy'])
    expect(suggestRoster('Database migration')).toEqual(['Daniel', 'Clay', 'Amy'])
  })

  /**
   * Architecture features should get architecture-focused team
   * (Clay for tech lead, Mary for user impact, Hefley for priority, Amy for testing)
   */
  test('Architecture feature → Architecture team (Clay, Mary, Hefley, Amy)', () => {
    expect(suggestRoster('System architecture')).toEqual(['Clay', 'Mary', 'Hefley', 'Amy'])
    expect(suggestRoster('Design pattern selection')).toEqual(['Clay', 'Mary', 'Hefley', 'Amy'])
    expect(suggestRoster('Refactoring plan')).toEqual(['Clay', 'Mary', 'Hefley', 'Amy'])
    expect(suggestRoster('Technical debt reduction')).toEqual(['Clay', 'Mary', 'Hefley', 'Amy'])
    expect(suggestRoster('Microservices architecture')).toEqual(['Clay', 'Mary', 'Hefley', 'Amy'])
  })

  /**
   * Testing features should get QA-focused team
   * (Amy for QA lead, Daniel for security tests, Clay for implementation)
   */
  test('Testing feature → QA team (Amy, Daniel, Clay)', () => {
    expect(suggestRoster('Test strategy')).toEqual(['Amy', 'Daniel', 'Clay'])
    expect(suggestRoster('QA automation')).toEqual(['Amy', 'Daniel', 'Clay'])
    expect(suggestRoster('Quality assurance')).toEqual(['Amy', 'Daniel', 'Clay'])
    expect(suggestRoster('Code coverage')).toEqual(['Amy', 'Daniel', 'Clay'])
  })

  /**
   * Timeline/capacity questions should get planning team
   * (Clay for estimates, Hefley for priority, Amy for test time)
   */
  test('Timeline question → Planning team (Clay, Hefley, Amy)', () => {
    expect(suggestRoster('Timeline estimate')).toEqual(['Clay', 'Hefley', 'Amy'])
    expect(suggestRoster('Capacity planning')).toEqual(['Clay', 'Hefley', 'Amy'])
    expect(suggestRoster('How long will this take?', 'How long will this take?')).toEqual(['Clay', 'Hefley', 'Amy'])
  })

  /**
   * Prioritization questions should get prioritization team
   * (Hefley for product, Mary for UX, Clay for tech feasibility)
   */
  test('Prioritization question → Prioritization team (Hefley, Mary, Clay)', () => {
    expect(suggestRoster('Priority assessment')).toEqual(['Hefley', 'Mary', 'Clay'])
    expect(suggestRoster('Business value')).toEqual(['Hefley', 'Mary', 'Clay'])
    expect(suggestRoster('Product roadmap')).toEqual(['Hefley', 'Mary', 'Clay'])
    expect(suggestRoster('MVP features')).toEqual(['Hefley', 'Mary', 'Clay'])
    expect(suggestRoster('Should we build this?', 'Should we build this?')).toEqual(['Hefley', 'Mary', 'Clay'])
  })

  /**
   * Unknown features should get full team by default
   */
  test('Unknown feature → Full team (default)', () => {
    expect(suggestRoster('Some random feature')).toEqual(['Daniel', 'Mary', 'Clay', 'Hefley', 'Amy'])
    expect(suggestRoster('Mystery task')).toEqual(['Daniel', 'Mary', 'Clay', 'Hefley', 'Amy'])
  })

  /**
   * When no roster provided, runStandup should use smart defaults
   */
  test('No roster provided → Uses smart default', async () => {
    const context: StandupContext = {
      feature: 'User authentication API'
      // No roster specified
    }

    const result = await runStandup(context)

    // Should suggest full team for authentication feature
    expect(result.participants).toEqual(['Daniel', 'Mary', 'Clay', 'Hefley', 'Amy'])
  })

  /**
   * When roster explicitly provided, runStandup should use it (override)
   */
  test('Explicit roster provided → Uses provided roster', async () => {
    const context: StandupContext = {
      feature: 'User authentication API',
      roster: ['Daniel', 'Clay']  // Explicit override - only Daniel and Clay
    }

    const result = await runStandup(context)

    // Should use provided roster (not smart default)
    expect(result.participants).toEqual(['Daniel', 'Clay'])
  })

  /**
   * Question context should influence roster suggestion
   */
  test('Question context influences roster', () => {
    // Testing question → QA team
    expect(suggestRoster('Login API', 'How many tests do we need?')).toEqual(['Amy', 'Daniel', 'Clay'])

    // Timeline question → Planning team
    expect(suggestRoster('Login API', 'How long will this take?')).toEqual(['Clay', 'Hefley', 'Amy'])

    // Prioritization question → Prioritization team
    expect(suggestRoster('Login API', 'Should we build this feature?')).toEqual(['Hefley', 'Mary', 'Clay'])
  })

  /**
   * Case-insensitive matching
   */
  test('Case-insensitive feature matching', () => {
    expect(suggestRoster('USER AUTHENTICATION')).toEqual(['Daniel', 'Mary', 'Clay', 'Hefley', 'Amy'])
    expect(suggestRoster('Security Audit')).toEqual(['Daniel', 'Clay', 'Amy'])
    expect(suggestRoster('UX Design')).toEqual(['Mary', 'Daniel', 'Clay', 'Amy'])
  })

})
