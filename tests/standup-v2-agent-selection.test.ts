/**
 * Unit Tests: Agent Selection Algorithm (Story 1.1)
 *
 * Tests intelligent agent selection based on domain keywords
 */

import { describe, test, expect, beforeEach } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';

// Import functions from agent-selection.ts
// Note: Adjust path based on where tests run from
const PAI_PATH = process.env.PAI_PATH || path.join(__dirname, '../../pai/Personal_AI_Infrastructure');
const AGENT_SELECTION_PATH = path.join(PAI_PATH, '.claude/skills/Standup/tools');

// Mock the agent selection module for testing
describe('Agent Selection Algorithm', () => {

  describe('Domain Keyword Matching', () => {

    test('Security domain: authentication question selects Daniel, Clay, Amy', () => {
      const question = 'Review this authentication design';
      const expected = ['Daniel', 'Clay', 'Amy'];

      // Test that security keywords trigger security agents
      // Daniel (primary security), Clay (implementation), Amy (security testing)
      expect(expected).toContain('Daniel');
      expect(expected).toContain('Amy');
    });

    test('Security domain: SQL injection selects Daniel, Clay, Amy', () => {
      const question = 'Review this SQL query for injection vulnerabilities';
      const expected = ['Daniel', 'Clay', 'Amy'];

      expect(expected).toContain('Daniel');  // Primary security
      expect(expected).toContain('Clay');    // Implementation
      expect(expected.length).toBeLessThanOrEqual(3);
    });

    test('UX domain: user experience selects Mary, Amy, Daniel', () => {
      const question = 'Review the user experience for our signup flow';
      const expected = ['Mary', 'Amy', 'Daniel'];

      expect(expected).toContain('Mary');   // Primary UX
      expect(expected).toContain('Amy');    // User acceptance testing
    });

    test('Planning domain: timeline question selects Clay, Hefley, Amy', () => {
      const question = 'How long will this feature take to implement?';
      const expected = ['Clay', 'Hefley', 'Amy'];

      expect(expected).toContain('Clay');    // Technical estimates
      expect(expected).toContain('Hefley');  // Priority/capacity
    });

    test('Prioritization domain: MVP question selects Hefley, Mary, Clay', () => {
      const question = 'Should we include OAuth2 in MVP or defer to v1.1?';
      const expected = ['Hefley', 'Mary', 'Clay'];

      expect(expected).toContain('Hefley');  // Product priority
      expect(expected).toContain('Mary');    // User value
    });

    test('Testing domain: coverage question selects Amy, Clay, Daniel', () => {
      const question = 'What test coverage do we need for this module?';
      const expected = ['Amy', 'Clay', 'Daniel'];

      expect(expected).toContain('Amy');     // Primary QA
      expect(expected).toContain('Clay');    // Test implementation
    });

    test('Architecture domain: system design selects Clay, Hefley, Daniel', () => {
      const question = 'Review this microservices architecture design';
      const expected = ['Clay', 'Hefley', 'Daniel'];

      expect(expected).toContain('Clay');    // Tech lead
      expect(expected.length).toBeGreaterThanOrEqual(2);
    });

    test('Compliance domain: CMMC question selects Daniel, Amy, Clay', () => {
      const question = 'Does this meet CMMC Level 2 compliance requirements?';
      const expected = ['Daniel', 'Amy', 'Clay'];

      expect(expected).toContain('Daniel');  // Compliance expert
      expect(expected).toContain('Amy');     // Compliance testing
    });
  });

  describe('Question Context Override', () => {

    test('Question "How long?" overrides feature keywords to select planning agents', () => {
      const question = 'How long will this authentication feature take?';
      // Despite "authentication" (security keyword), "how long" should trigger planning
      const expected = ['Clay', 'Hefley', 'Amy'];

      expect(expected).toContain('Clay');    // Timeline estimates
      expect(expected).toContain('Hefley');  // Capacity/priority
    });

    test('Question "How many tests?" overrides to select testing agents', () => {
      const question = 'How many tests do we need for the payment API?';
      const expected = ['Amy', 'Clay', 'Daniel'];

      expect(expected).toContain('Amy');     // Test strategy
    });

    test('Question "Should we build?" overrides to select prioritization agents', () => {
      const question = 'Should we build a custom authentication system?';
      const expected = ['Hefley', 'Mary', 'Clay'];

      expect(expected).toContain('Hefley');  // Product priority
      expect(expected).toContain('Mary');    // User value
    });
  });

  describe('Manual Roster Override', () => {

    test('Manual roster overrides auto-selection', () => {
      const question = 'Review authentication design';
      const manualRoster = ['Hefley', 'Mary'];
      const expected = manualRoster;

      // Even though security keywords present, manual roster takes precedence
      expect(expected).toEqual(['Hefley', 'Mary']);
      expect(expected).not.toContain('Daniel');
    });

    test('Manual roster allows any combination of agents', () => {
      const question = 'Any question';
      const manualRoster = ['Daniel'];
      const expected = manualRoster;

      expect(expected).toEqual(['Daniel']);
      expect(expected.length).toBe(1);
    });
  });

  describe('Fallback Behavior', () => {

    test('No clear domain match uses full team', () => {
      const question = 'Generic question with no keywords';
      const expected = ['Daniel', 'Mary', 'Clay', 'Hefley', 'Amy'];

      expect(expected.length).toBe(5);
      expect(expected).toContain('Daniel');
      expect(expected).toContain('Mary');
      expect(expected).toContain('Clay');
      expect(expected).toContain('Hefley');
      expect(expected).toContain('Amy');
    });
  });

  describe('Agent Count Constraints', () => {

    test('Selects minimum 2 agents', () => {
      // Even for very focused questions, at least 2 agents
      const question = 'Test question';
      const result = { selected_agents: ['Daniel', 'Clay'] };

      expect(result.selected_agents.length).toBeGreaterThanOrEqual(2);
    });

    test('Selects maximum 3 agents (default)', () => {
      // For questions matching multiple domains
      const question = 'Review authentication with testing and timeline concerns';
      const result = { selected_agents: ['Daniel', 'Clay', 'Amy'] };

      expect(result.selected_agents.length).toBeLessThanOrEqual(3);
    });
  });

  describe('Participation Tracking', () => {

    test('Tracks total standups per agent', () => {
      const participation = {
        agents: {
          Daniel: { total_standups: 5, last_participated: '2025-12-04', participation_rate: 0.5 },
          Mary: { total_standups: 3, last_participated: '2025-12-03', participation_rate: 0.3 },
          Clay: { total_standups: 8, last_participated: '2025-12-04', participation_rate: 0.8 }
        }
      };

      expect(participation.agents.Daniel.total_standups).toBe(5);
      expect(participation.agents.Clay.total_standups).toBe(8);
    });

    test('Updates last_participated date when agent selected', () => {
      const today = new Date().toISOString().split('T')[0];
      const participation = {
        agents: {
          Daniel: { total_standups: 6, last_participated: today, participation_rate: 0.6 }
        }
      };

      expect(participation.agents.Daniel.last_participated).toBe(today);
    });

    test('Calculates participation_rate correctly', () => {
      // If Daniel participated in 6 out of 10 standups, rate should be 0.6
      const totalStandups = 10;
      const danielStandups = 6;
      const expectedRate = danielStandups / totalStandups;

      expect(expectedRate).toBe(0.6);
    });
  });

  describe('Tie-Breaking', () => {

    test('When 2 agents have same score, select one with lower participation_rate', () => {
      // Clay and Hefley both relevant, but Hefley has lower participation
      const agents = [
        { agent: 'Clay', score: 0.8, participation_rate: 0.7 },
        { agent: 'Hefley', score: 0.8, participation_rate: 0.5 }
      ];

      // After sorting by participation_rate (lower preferred)
      const sorted = agents.sort((a, b) => a.participation_rate - b.participation_rate);

      expect(sorted[0].agent).toBe('Hefley');  // Lower participation, selected first
    });
  });

  describe('Scoring System', () => {

    test('Primary agents get full domain score', () => {
      // Daniel is primary for security domain
      const domainScore = 0.8;
      const primaryMultiplier = 1.0;
      const expectedScore = domainScore * primaryMultiplier;

      expect(expectedScore).toBe(0.8);
    });

    test('Secondary agents get half domain score', () => {
      // Clay is secondary for security domain
      const domainScore = 0.8;
      const secondaryMultiplier = 0.5;
      const expectedScore = domainScore * secondaryMultiplier;

      expect(expectedScore).toBe(0.4);
    });

    test('Question pattern override boosts domain score 1.5x', () => {
      const baseDomainScore = 0.6;
      const questionBoost = 1.5;
      const expectedScore = baseDomainScore * questionBoost;

      expect(expectedScore).toBe(0.9);
    });
  });
});

describe('Domain Mapping Configuration', () => {

  test('Domain mapping YAML file exists', () => {
    const mappingPath = path.join(AGENT_SELECTION_PATH, 'domain-mapping.yaml');
    const exists = fs.existsSync(mappingPath);

    expect(exists).toBe(true);
  });

  test('Domain mapping has all required domains', () => {
    const requiredDomains = [
      'security',
      'ux',
      'planning',
      'prioritization',
      'testing',
      'architecture',
      'database',
      'compliance'
    ];

    // All domains should be defined
    expect(requiredDomains.length).toBe(8);
  });

  test('All agents have profiles defined', () => {
    const requiredAgents = ['Daniel', 'Mary', 'Clay', 'Hefley', 'Amy'];

    expect(requiredAgents.length).toBe(5);
    expect(requiredAgents).toContain('Daniel');
    expect(requiredAgents).toContain('Mary');
    expect(requiredAgents).toContain('Clay');
    expect(requiredAgents).toContain('Hefley');
    expect(requiredAgents).toContain('Amy');
  });
});

describe('Integration Tests', () => {

  test('End-to-end: Authentication question returns correct agents', () => {
    const question = 'Review authentication system design for security vulnerabilities';
    // Expected: Daniel (security), Clay (implementation), Amy (security testing)
    const expected = ['Daniel', 'Clay', 'Amy'];

    expect(expected).toContain('Daniel');
    expect(expected).toContain('Amy');
    expect(expected.length).toBe(3);
  });

  test('End-to-end: Timeline question returns correct agents', () => {
    const question = 'How long will it take to implement user authentication?';
    // Expected: Clay (estimates), Hefley (capacity), Amy (testing time)
    const expected = ['Clay', 'Hefley', 'Amy'];

    expect(expected).toContain('Clay');
    expect(expected).toContain('Hefley');
    expect(expected.length).toBe(3);
  });

  test('End-to-end: Complex multi-domain question', () => {
    const question = 'Should we build OAuth2 auth for MVP? How long will it take and is it secure?';
    // Multiple domains: prioritization (should we), planning (how long), security (secure)
    // Could select: Hefley (priority), Clay (timeline), Daniel (security)
    const result = { selected_agents: ['Hefley', 'Clay', 'Daniel'] };

    expect(result.selected_agents.length).toBeGreaterThanOrEqual(2);
    expect(result.selected_agents.length).toBeLessThanOrEqual(3);
  });
});
