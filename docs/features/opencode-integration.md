# Feature: opencode.ai Integration

**Status**: Planning
**Priority**: High
**Target**: PAI Core

## Objective

Make PAI platform-agnostic by adding support for opencode.ai as an alternative to Claude Code.

## Motivation

- Expand PAI's reach beyond Claude Code users
- Demonstrate PAI's architectural flexibility
- Support users who prefer different AI platforms
- Contribute meaningfully to PAI's ecosystem

## Current State

PAI is built on Claude Code (Anthropic):
- Uses Claude-specific APIs and tools
- Relies on Claude Code's file structure (.claude/)
- Skills and agents designed for Claude Code environment

## Challenges

1. **Tool Compatibility**: opencode.ai may have different tool APIs
2. **File Structure**: Different config/skill organization
3. **Agent System**: Adapter layer needed for cross-platform agents
4. **MCP Integration**: Different implementation approaches

## Proposed Approach

### Phase 1: Analysis (Current)
- [ ] Study opencode.ai architecture
- [ ] Document differences from Claude Code
- [ ] Identify compatibility challenges
- [ ] Design adapter pattern

### Phase 2: Prototype
- [ ] Create minimal PAI skill for opencode
- [ ] Test basic agent communication
- [ ] Validate file operations
- [ ] Document findings in experiments/

### Phase 3: Implementation
- [ ] Develop platform abstraction layer
- [ ] Create opencode.ai adapter
- [ ] Migrate core PAI skills
- [ ] Update documentation

### Phase 4: Testing
- [ ] Test in real opencode environment
- [ ] Validate all PAI features work
- [ ] Get community feedback

### Phase 5: Contribution
- [ ] Submit PR to danielmiessler/PAI
- [ ] Create migration guide
- [ ] Support community adoption

## Success Criteria

- [ ] PAI skills work in both Claude Code and opencode.ai
- [ ] No degradation of Claude Code functionality
- [ ] Clear documentation for both platforms
- [ ] Community validation

## Timeline

- Analysis: 1-2 weeks
- Prototype: 1-2 weeks
- Implementation: 3-4 weeks
- Testing: 1 week
- **Total**: ~2 months

## Open Questions

1. Does opencode.ai support MCP servers?
2. How does opencode handle skill/agent definitions?
3. What's the opencode equivalent of Claude Code's Task tool?
4. Will Dan want this in PAI core or as a separate adapter repo?

## Related Docs

- `experiments/opencode-adapter/` (to be created)
- `repos/opencode/` (reference implementation)

---

**Next Steps**: Begin Phase 1 analysis by studying opencode architecture
