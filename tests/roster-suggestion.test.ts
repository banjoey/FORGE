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
  test('Authentication feature → Full team (Emma, Mary, Bob, Murat, Wei)', () => {
    expect(suggestRoster('User authentication')).toEqual(['Emma', 'Mary', 'Bob', 'Murat', 'Wei'])
    expect(suggestRoster('Login API')).toEqual(['Emma', 'Mary', 'Bob', 'Murat', 'Wei'])
    expect(suggestRoster('OAuth2 integration')).toEqual(['Emma', 'Mary', 'Bob', 'Murat', 'Wei'])
    expect(suggestRoster('Password reset flow')).toEqual(['Emma', 'Mary', 'Bob', 'Murat', 'Wei'])
    expect(suggestRoster('Two-factor authentication')).toEqual(['Emma', 'Mary', 'Bob', 'Murat', 'Wei'])
    expect(suggestRoster('MFA setup')).toEqual(['Emma', 'Mary', 'Bob', 'Murat', 'Wei'])
    expect(suggestRoster('Session management')).toEqual(['Emma', 'Mary', 'Bob', 'Murat', 'Wei'])
  })

  /**
   * Security features should get security-focused team
   * (Emma for security analysis, Bob for implementation, Wei for security testing)
   */
  test('Security feature → Security team (Emma, Bob, Wei)', () => {
    expect(suggestRoster('Security audit')).toEqual(['Emma', 'Bob', 'Wei'])
    expect(suggestRoster('Vulnerability assessment')).toEqual(['Emma', 'Bob', 'Wei'])
    expect(suggestRoster('SQL injection fix')).toEqual(['Emma', 'Bob', 'Wei'])
    expect(suggestRoster('XSS prevention')).toEqual(['Emma', 'Bob', 'Wei'])
    expect(suggestRoster('CSRF protection')).toEqual(['Emma', 'Bob', 'Wei'])
    expect(suggestRoster('Threat modeling')).toEqual(['Emma', 'Bob', 'Wei'])
  })

  /**
   * UX features should get UX-focused team
   * (Mary for UX analysis, Emma for security review, Bob for implementation, Wei for testing)
   */
  test('UX feature → UX team (Mary, Emma, Bob, Wei)', () => {
    expect(suggestRoster('User experience improvements')).toEqual(['Mary', 'Emma', 'Bob', 'Wei'])
    expect(suggestRoster('UI redesign')).toEqual(['Mary', 'Emma', 'Bob', 'Wei'])
    expect(suggestRoster('Interface navigation')).toEqual(['Mary', 'Emma', 'Bob', 'Wei'])
    expect(suggestRoster('Design system')).toEqual(['Mary', 'Emma', 'Bob', 'Wei'])
    expect(suggestRoster('Usability testing')).toEqual(['Mary', 'Emma', 'Bob', 'Wei'])
  })

  /**
   * Database features should get database-focused team
   * (Emma for SQL injection, Bob for implementation, Wei for testing)
   */
  test('Database feature → Database team (Emma, Bob, Wei)', () => {
    expect(suggestRoster('Database schema design')).toEqual(['Emma', 'Bob', 'Wei'])
    expect(suggestRoster('SQL query optimization')).toEqual(['Emma', 'Bob', 'Wei'])
    expect(suggestRoster('Database migration')).toEqual(['Emma', 'Bob', 'Wei'])
  })

  /**
   * Architecture features should get architecture-focused team
   * (Bob for tech lead, Mary for user impact, Murat for priority, Wei for testing)
   */
  test('Architecture feature → Architecture team (Bob, Mary, Murat, Wei)', () => {
    expect(suggestRoster('System architecture')).toEqual(['Bob', 'Mary', 'Murat', 'Wei'])
    expect(suggestRoster('Design pattern selection')).toEqual(['Bob', 'Mary', 'Murat', 'Wei'])
    expect(suggestRoster('Refactoring plan')).toEqual(['Bob', 'Mary', 'Murat', 'Wei'])
    expect(suggestRoster('Technical debt reduction')).toEqual(['Bob', 'Mary', 'Murat', 'Wei'])
    expect(suggestRoster('Microservices architecture')).toEqual(['Bob', 'Mary', 'Murat', 'Wei'])
  })

  /**
   * Testing features should get QA-focused team
   * (Wei for QA lead, Emma for security tests, Bob for implementation)
   */
  test('Testing feature → QA team (Wei, Emma, Bob)', () => {
    expect(suggestRoster('Test strategy')).toEqual(['Wei', 'Emma', 'Bob'])
    expect(suggestRoster('QA automation')).toEqual(['Wei', 'Emma', 'Bob'])
    expect(suggestRoster('Quality assurance')).toEqual(['Wei', 'Emma', 'Bob'])
    expect(suggestRoster('Code coverage')).toEqual(['Wei', 'Emma', 'Bob'])
  })

  /**
   * Timeline/capacity questions should get planning team
   * (Bob for estimates, Murat for priority, Wei for test time)
   */
  test('Timeline question → Planning team (Bob, Murat, Wei)', () => {
    expect(suggestRoster('Timeline estimate')).toEqual(['Bob', 'Murat', 'Wei'])
    expect(suggestRoster('Capacity planning')).toEqual(['Bob', 'Murat', 'Wei'])
    expect(suggestRoster('How long will this take?', 'How long will this take?')).toEqual(['Bob', 'Murat', 'Wei'])
  })

  /**
   * Prioritization questions should get prioritization team
   * (Murat for product, Mary for UX, Bob for tech feasibility)
   */
  test('Prioritization question → Prioritization team (Murat, Mary, Bob)', () => {
    expect(suggestRoster('Priority assessment')).toEqual(['Murat', 'Mary', 'Bob'])
    expect(suggestRoster('Business value')).toEqual(['Murat', 'Mary', 'Bob'])
    expect(suggestRoster('Product roadmap')).toEqual(['Murat', 'Mary', 'Bob'])
    expect(suggestRoster('MVP features')).toEqual(['Murat', 'Mary', 'Bob'])
    expect(suggestRoster('Should we build this?', 'Should we build this?')).toEqual(['Murat', 'Mary', 'Bob'])
  })

  /**
   * Unknown features should get full team by default
   */
  test('Unknown feature → Full team (default)', () => {
    expect(suggestRoster('Some random feature')).toEqual(['Emma', 'Mary', 'Bob', 'Murat', 'Wei'])
    expect(suggestRoster('Mystery task')).toEqual(['Emma', 'Mary', 'Bob', 'Murat', 'Wei'])
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
    expect(result.participants).toEqual(['Emma', 'Mary', 'Bob', 'Murat', 'Wei'])
  })

  /**
   * When roster explicitly provided, runStandup should use it (override)
   */
  test('Explicit roster provided → Uses provided roster', async () => {
    const context: StandupContext = {
      feature: 'User authentication API',
      roster: ['Emma', 'Bob']  // Explicit override - only Emma and Bob
    }

    const result = await runStandup(context)

    // Should use provided roster (not smart default)
    expect(result.participants).toEqual(['Emma', 'Bob'])
  })

  /**
   * Question context should influence roster suggestion
   */
  test('Question context influences roster', () => {
    // Testing question → QA team
    expect(suggestRoster('Login API', 'How many tests do we need?')).toEqual(['Wei', 'Emma', 'Bob'])

    // Timeline question → Planning team
    expect(suggestRoster('Login API', 'How long will this take?')).toEqual(['Bob', 'Murat', 'Wei'])

    // Prioritization question → Prioritization team
    expect(suggestRoster('Login API', 'Should we build this feature?')).toEqual(['Murat', 'Mary', 'Bob'])
  })

  /**
   * Case-insensitive matching
   */
  test('Case-insensitive feature matching', () => {
    expect(suggestRoster('USER AUTHENTICATION')).toEqual(['Emma', 'Mary', 'Bob', 'Murat', 'Wei'])
    expect(suggestRoster('Security Audit')).toEqual(['Emma', 'Bob', 'Wei'])
    expect(suggestRoster('UX Design')).toEqual(['Mary', 'Emma', 'Bob', 'Wei'])
  })

})
