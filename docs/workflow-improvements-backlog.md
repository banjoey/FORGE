# Workflow Improvements Backlog

**Purpose**: Track meta-improvements to FORGE workflows and agent behaviors

**Scope**: Internal optimizations, process improvements, usability enhancements

---

## Active Improvements

### WF-1: Proactive Action Item Capture (2 points)

**Priority**: Must Have (critical - prevents forgotten tasks)

**Problem**:
When standups, planning sessions, or PRD reviews generate action items, Claude doesn't proactively ask to add them to the todo list. Items can be forgotten unless user manually requests tracking.

**User Requirement** (2025-12-02):
> "I just don't want anything to get forgotten. That's the CRITICAL part of this. We need to capture everything for implementation."

**Solution**:
After any session that generates action items (standup, planning, PRD review):

```
Claude: "This session identified 5 action items:
  1. Update Emma PRD with MoSCoW prioritization
  2. Write Given-When-Then acceptance criteria for US-E1, E2, E3
  3. Create security issue test suite (100 vulnerabilities)
  4. Update sprint plan (2 sprints, 3 weeks)
  5. Define measurement framework for 90% detection rate

Should I add these to the todo list?

I can prioritize them as:
  - High priority: Items 2, 5 (blockers for development)
  - Medium priority: Items 1, 4 (planning updates)
  - Low priority: Item 3 (can be done in parallel)

Or you can tell me how to prioritize them."
```

**Workflow Changes**:

1. **RunStandup.md** (Step 6: Update Project Context):
   - Add Step 6b: "Offer to add action items to todo list"
   - Prompt format: List items, suggest prioritization, ask for confirmation

2. **AgilePm Workflows** (CreatePrd, CreateEpics, CreateStories, SprintPlanning):
   - Add final step: "Capture action items from this session"
   - Prompt user to confirm todo list additions

3. **General Pattern** (all planning/review sessions):
   - At end of session: "Identified N action items. Add to todo list?"
   - User can: Accept all, reject all, or customize prioritization

**Benefits**:
- ✅ Nothing gets forgotten (critical requirement)
- ✅ User stays in control (explicit confirmation)
- ✅ Suggested prioritization (helpful, not prescriptive)
- ✅ Consistent workflow (all sessions behave the same)

**Effort**: 2 story points
- 1 pt: Update RunStandup.md, AgilePm workflows with action item capture step
- 1 pt: Test across multiple session types (standup, PRD review, sprint planning)

**Acceptance Criteria**:
- [ ] After standup: Claude asks "Should I add these 5 action items to todo list?"
- [ ] After PRD review: Claude asks "Should I add these 3 action items to todo list?"
- [ ] User can accept all, reject all, or customize prioritization
- [ ] No action items are lost (100% capture rate)
- [ ] Todo list reflects user's prioritization choices

**Validation**:
- Test: Run standup, generate 5 action items → Claude asks for confirmation
- Test: User rejects all items → Nothing added to todo list
- Test: User accepts with custom priority → Todo list reflects custom order

---

## Future Improvements (Not Yet Prioritized)

*(Add workflow improvements here as they're identified)*

---

**Last Updated**: 2025-12-02
**Total Active**: 1 improvement (2 points)
**Status**: WF-1 is the first critical improvement identified
