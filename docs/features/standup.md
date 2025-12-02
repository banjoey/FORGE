# Feature: Standup (Multi-Agent Collaboration)

**Status**: Planning
**Priority**: High
**Target**: PAI Enhancement

## Objective

Enable multi-agent collaboration where specialized AI agents work together on complex tasks, inspired by BMAD METHOD v6.

## Motivation

Complex tasks benefit from specialized expertise:
- PM perspective for requirements
- Architect for system design
- Engineer for implementation
- QA for testing strategy
- Security expert for threat modeling

## BMAD's Approach

BMAD METHOD v6 provides "standup":
- 19 specialized agents
- 50+ guided workflows
- Single-project scope
- Predefined team compositions

## FORGE Enhancement

Build on BMAD's concept with PAI-specific improvements:

### Key Differentiators

1. **Cross-Project Context**
   - Agents remember work across multiple projects
   - PM sees entire product portfolio
   - Consistent architectural decisions

2. **Persistent Agent Memory**
   - Agents maintain personality/expertise
   - Learn from previous interactions
   - Build institutional knowledge

3. **Dynamic Team Composition**
   - Summon agents as needed
   - Not locked to predefined teams
   - Create custom agent roles

## Proposed Implementation

### Agent Registry

```yaml
agents:
  pm:
    role: Product Manager
    expertise: Requirements, roadmapping, stakeholder communication
    context: All company projects

  architect:
    role: Software Architect
    expertise: System design, patterns, scalability
    context: Technical decisions across projects

  security:
    role: Security Engineer
    expertise: Threat modeling, secure coding, compliance
    context: Security posture company-wide
```

### Workflow Example

```
User: "Design user authentication for Project X"

Standup Activates:
1. PM Agent: Clarifies requirements, user stories
2. Architect Agent: Proposes architecture (OAuth2, JWT, etc.)
3. Security Agent: Reviews for vulnerabilities
4. Engineer Agent: Implements chosen approach
5. QA Agent: Designs test strategy
```

### PAI Integration

- Extend PAI's skill system with agent definitions
- Use PAI's Task tool for agent coordination
- Store agent context in PAI knowledge base
- Leverage PAI's MCP integration for data access

## Technical Design

### Agent Definition Format

```markdown
# Agent: Product Manager

## Role
Product Manager for company product portfolio

## Expertise
- Requirements gathering and documentation
- User story creation
- Roadmap planning
- Stakeholder communication
- Product strategy

## Context Access
- All project repositories
- Company product documentation
- User feedback databases (via MCP)
- Market research

## Collaboration Protocol
- Always starts by understanding business goals
- Asks clarifying questions before technical decisions
- Documents decisions in PRD format
- Coordinates with architect on feasibility
```

### Invocation Syntax

```
User: "Standup: pm, architect, security"
# Brings three agents into the conversation

User: "PM: Should we build feature X?"
# Directs question to specific agent

User: "All agents: review this design"
# Collaborative review
```

## Challenges

1. **Context Management**: How much history does each agent maintain?
2. **Cost**: Multiple agent invocations = more API calls
3. **Coordination**: Preventing agents from talking over each other
4. **State**: How do agents "remember" across sessions?

## Prototype Plan

### Phase 1: Single Agent Extension
- [ ] Create one specialized agent (PM) in PAI
- [ ] Test context preservation
- [ ] Validate usefulness

### Phase 2: Multi-Agent Coordination
- [ ] Add 2-3 more agents
- [ ] Build coordination layer
- [ ] Test collaboration patterns

### Phase 3: Full Standup
- [ ] Complete agent roster
- [ ] Dynamic team composition
- [ ] Cross-project context

## Success Criteria

- [ ] Can invoke multiple specialized agents
- [ ] Agents maintain distinct personalities/expertise
- [ ] Context shared appropriately across projects
- [ ] Measurably better outcomes than single-agent

## Timeline

- Phase 1: 2-3 weeks
- Phase 2: 3-4 weeks
- Phase 3: 2-3 weeks
- **Total**: ~2-3 months

## Related Docs

- `repos/BMAD-METHOD/` (reference study)
- `experiments/standup-prototype/` (to be created)

## Open Questions

1. Should standup be PAI core or a separate skill package?
2. How to handle agent context without exploding costs?
3. What's the ideal number of agents for different task types?
4. Should agents have voting/consensus mechanisms?

---

**Next Steps**: Study BMAD's agent definitions and workflow patterns
