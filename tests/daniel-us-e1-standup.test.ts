/**
 * Acceptance Tests: US-E1 - Emma Participates in Security Standups
 *
 * User Story:
 * As a developer designing a security-sensitive feature
 * I want Emma to participate in standup and provide security perspective
 * So that I catch security issues early (before coding)
 */

import { describe, test, expect } from '@jest/globals'
import { runStandup } from '../src/standup/orchestrator'
import { StandupContext, StandupResult } from '../src/types'

describe('US-E1: Emma Participates in Security Standups (5 points)', () => {

  /**
   * Scenario 1: Emma joins standup on authentication feature
   *
   * Given: User runs standup to design authentication feature
   * And: Roster includes Mary, Bob, Murat, Emma
   * When: RunStandup workflow executes
   * Then: Emma provides security perspective
   * And: Emma identifies authentication threats
   * And: Emma recommends security controls (MFA, password hashing, etc.)
   * And: Emma references CMMC practices (IA domain)
   */
  test('Scenario 1: Emma joins standup on authentication feature', async () => {
    const context: StandupContext = {
      feature: 'User authentication API',
      description: 'POST /api/login endpoint with email/password',
      roster: ['Mary', 'Bob', 'Murat', 'Emma']
    }

    const result: StandupResult = await runStandup(context)

    // Deterministic checks
    expect(result.participants).toContain('Emma')
    expect(result.Emma.strideCategories).toContain('Spoofing')  // Auth is primarily Spoofing threat
    expect(result.Emma.cmmcReferences).toContain('IA.L2-3.5.10')  // Password protection

    // Flexible keyword matching (not exact strings - LLM outputs vary)
    const threatsText = result.Emma.threats.join(' ').toLowerCase()
    expect(threatsText).toMatch(/credential|authentication|spoofing|password/)

    const recsText = result.Emma.recommendations.join(' ').toLowerCase()
    expect(recsText).toMatch(/mfa|multi-factor|two-factor|2fa|bcrypt|hash/)

    // Emma should provide actionable recommendations (not vague)
    expect(result.Emma.recommendations.some(rec =>
      rec.length > 20  // Non-trivial recommendations
    )).toBe(true)
  })

  /**
   * Scenario 2: Emma defers to Mary on UX questions
   *
   * Given: Standup discusses 2FA user experience
   * And: Question is about UX (not security)
   * When: Emma is asked "Should we require 2FA on every login?"
   * Then: Emma defers to Mary (Business Analyst)
   * And: Emma says "From a security perspective, more frequent 2FA is better, but Mary can advise on user friction."
   */
  test('Scenario 2: Emma defers to Mary on UX questions', async () => {
    const context: StandupContext = {
      feature: 'Two-factor authentication UX',
      question: 'Should we require 2FA on every login or just once per 30 days?',
      roster: ['Mary', 'Bob', 'Murat', 'Emma'],
      questionFor: 'Emma'  // Specifically asking Emma
    }

    const result: StandupResult = await runStandup(context)

    // Emma should acknowledge this is UX question (outside her domain)
    const emmaResponse = result.Emma.response.toLowerCase()
    expect(emmaResponse).toMatch(/mary|business|ux|user experience|defer/)

    // Emma should still provide security perspective
    expect(emmaResponse).toMatch(/security perspective|from a security/)

    // Emma should not make final UX decision (that's Mary's domain)
    expect(result.Emma.deferTo).toBe('Mary')
  })

  /**
   * Scenario 3: Emma provides actionable recommendations
   *
   * Given: Developer proposes login API
   * And: Login uses HTTP (not HTTPS)
   * When: Emma reviews the API design
   * Then: Emma identifies "credentials in transit" threat
   * And: Emma recommends HTTPS with TLS 1.3
   * And: Emma provides implementation guidance (certificate setup, HSTS header)
   * And: Emma does NOT say vague "this is insecure" (must be actionable)
   */
  test('Scenario 3: Emma provides actionable recommendations', async () => {
    const apiDesign = {
      endpoint: '/api/login',
      method: 'POST',
      protocol: 'HTTP',  // Insecure!
      auth: 'email+password'
    }

    const context: StandupContext = {
      feature: 'Login API design',
      designDoc: apiDesign,
      roster: ['Mary', 'Bob', 'Murat', 'Emma']
    }

    const result: StandupResult = await runStandup(context)

    // Emma should identify the HTTP threat
    const threatsText = result.Emma.threats.join(' ').toLowerCase()
    expect(threatsText).toMatch(/http|plaintext|transit|intercept|man-in-the-middle/)

    // Emma should recommend HTTPS/TLS
    const recsText = result.Emma.recommendations.join(' ').toLowerCase()
    expect(recsText).toMatch(/https|tls|ssl|encrypt/)

    // Emma should provide implementation guidance (actionable)
    const hasImplementationGuidance = result.Emma.recommendations.some(rec =>
      rec.toLowerCase().match(/certificate|hsts|tls 1\.3|configure/)
    )
    expect(hasImplementationGuidance).toBe(true)

    // Emma should reference CMMC practice
    expect(result.Emma.cmmcReferences).toContain('SC.L2-3.13.8')  // Transmission confidentiality

    // Emma should NOT be vague (no "this is insecure" without explanation)
    const isVague = result.Emma.recommendations.some(rec =>
      rec.toLowerCase() === 'this is insecure' || rec.toLowerCase() === 'fix this'
    )
    expect(isVague).toBe(false)
  })

  /**
   * Scenario 4: Emma logs decisions in project-context.md
   *
   * Given: Emma recommends bcrypt for password hashing
   * And: Team agrees to use bcrypt (cost factor 12)
   * When: Decision is recorded
   * Then: project-context.md is updated
   * And: Decision includes Emma's rationale
   * And: Decision references CMMC practice (IA.L2-3.5.10)
   * And: Decision includes date, participants, status
   */
  test('Scenario 4: Emma decisions logged in project-context.md', async () => {
    const decision = {
      title: 'Use bcrypt for password hashing',
      emmaRecommendation: 'bcrypt with cost factor 12',
      cmmcPractice: 'IA.L2-3.5.10',
      participants: ['Mary', 'Bob', 'Murat', 'Emma']
    }

    const context: StandupContext = {
      feature: 'Password hashing implementation',
      decision: decision,
      roster: decision.participants
    }

    const result: StandupResult = await runStandup(context)

    // Record decision in project-context.md
    await result.recordDecision('docs/project-context.md')

    // Read project-context.md and verify decision is logged
    const fs = require('fs').promises
    const projectContext = await fs.readFile('docs/project-context.md', 'utf-8')

    expect(projectContext).toContain('bcrypt')
    expect(projectContext).toContain('cost factor 12')
    expect(projectContext).toContain('IA.L2-3.5.10')
    expect(projectContext).toContain('Emma')
    expect(projectContext).toMatch(/\d{4}-\d{2}-\d{2}/)  // Date (YYYY-MM-DD)
    expect(projectContext).toMatch(/Status.*Approved|Complete|In Progress/i)
  })

})
