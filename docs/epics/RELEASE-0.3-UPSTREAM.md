# FORGE Release 0.3 - Customization & Upstream Contribution

**Status**: Planning
**Goal**: Make FORGE shareable - customizable, team-ready, upstream-contributable
**Timeline**: 3-4 weeks (26 story points)
**Owner**: @banjoey
**Depends On**: Release 0.2 (enterprise features validated)
**Created**: 2025-12-02

---

## Executive Summary

**Release 0.1 Delivers**: Core standup with 1 skill + 3 agents (validated)
**Release 0.2 Delivers**: Enterprise security + testing (CMMC + ATDD)
**Release 0.3 Delivers**: Customization + upstream contribution (shareable)

### Why This Release?

After proving FORGE's value internally (0.1) and adding enterprise rigor (0.2), Release 0.3 makes FORGE shareable:

1. **De-personalize PAI** - Remove hardcoded "Kai"/"Daniel" references
2. **Make customizable** - Users configure assistant name, identity
3. **Team deployment** - Support multiple users with shared context
4. **Upstream contribution** - Prepare PRs for Dan's PAI repository
5. **Public announcement** - Share FORGE with the community

### Business Value

**For FORGE Users**:
- Feels like YOUR assistant, not someone else's
- Professional for business use (no "Who is Kai?" confusion)
- Easy team deployment (3+ developers using same standards)

**For PAI Community**:
- Skills contributed upstream (AgilePm, Security, TestArchitect)
- Standup orchestration pattern shared
- Makes PAI more adoptable for teams

**For Your Career**:
- First major OSS contribution
- Demonstrated: system design, agile execution, community engagement
- Portfolio piece: "I built multi-agent standup for PAI"

---

## Release 0.3 Scope

### EPIC-004: PAI Customization (Complete - 23 points)

**Story 4.1: Assistant Name Configuration** (3 points)
- During installation: "What would you like to name your assistant?"
- Stored in `PAI_ASSISTANT_NAME` environment variable
- All prompts use `{{assistant_name}}` template
- Default: User's first name + "AI" (e.g., "JamesAI")

**Story 4.2: User Identity Configuration** (3 points)
- During installation: "What's your name?"
- Stored in `PAI_USER_NAME` environment variable
- User profile: `~/.pai/profile.json`
- Agents reference user by name

**Story 4.3: De-Personalize Core System** (8 points)
- Audit all files for "Kai", "Daniel", "Miessler" references
- Replace with templates: `{{assistant_name}}`, `{{user_name}}`
- Keep attribution in LICENSE and README (credit Dan)
- Update CORE skill, agent files, documentation

**Story 4.4: Team Configuration Support** (3 points)
- Support `team-config.json` for shared context
- Team members reference shared: tech stack, coding standards, security baseline
- Individual config overrides team config

**Story 4.5: Company Branding Support** (2 points)
- Support company name, logo, color scheme
- Company context loaded: values, mission, tech philosophy
- Example: "ACME Engineering AI Assistant powered by PAI"

**Story 4.6: Installation Wizard** (2 points)
- Interactive CLI wizard on first run
- Prompts: name, assistant name, company, preferences
- Creates `~/.pai/profile.json`
- Runs `pai doctor` validation

**Story 4.7: Configurable Affirmation Levels** (2 points)
- During installation: "Choose your preferred communication style"
- Options:
  - **Supportive** (default): Uses affirmations like "Great question!", "You're right"
  - **Professional**: Neutral tone, minimal affirmations
  - **Direct**: Concise, no affirmations (just facts)
- Stored in `PAI_TONE_PREFERENCE` in profile.json
- All agent prompts adapt based on preference
- Example: "You're absolutely right" → "That's correct" (Professional) → "Correct" (Direct)
- User can change later: `forge config set tone professional`

### NEW: Upstream Contribution Prep (5 points)

**Story U-1: Prepare Skills for Upstream PR** (2 points)
- **Goal**: Submit AgilePm, Security, TestArchitect skills to Dan's PAI
- **Acceptance Criteria**:
  - [ ] Skills comply 100% with PAI Createskill standards
  - [ ] Skills tested in ≥2 real projects
  - [ ] Documentation complete (README per skill, examples)
  - [ ] No FORGE-specific dependencies
  - [ ] License headers (MIT, attribution to FORGE)
  - [ ] PR description written (value prop, usage examples)

**Story U-2: Prepare Standup Orchestration for Upstream** (2 points)
- **Goal**: Submit Standup skill to PAI (if Dan interested)
- **Acceptance Criteria**:
  - [ ] Standup skill standalone (works without FORGE)
  - [ ] Clear value proposition documented
  - [ ] A/B test results included (proof of 2x better outcomes)
  - [ ] Works with PAI's existing agents (architect, engineer)
  - [ ] PR description written

**Story U-3: Engage Dan & PAI Community** (1 point)
- **Goal**: Get feedback before submitting PRs
- **Acceptance Criteria**:
  - [ ] Reach out to Dan (email or GitHub discussion)
  - [ ] Share FORGE vision, ask for feedback
  - [ ] Confirm: Is Dan interested in these contributions?
  - [ ] Address any concerns before PR submission
  - [ ] Build relationship with PAI community

---

## Sprint Breakdown

### Sprint 1 (Weeks 1-2): De-Personalization & Configuration

**Goal**: Make PAI customizable
**Story Points**: 14 points

**Stories**:
- 4.1: Assistant Name Configuration (3 pts)
- 4.2: User Identity Configuration (3 pts)
- 4.3: De-Personalize Core System (8 pts) ← LARGEST

**Deliverables**:
- Template system: `{{assistant_name}}`, `{{user_name}}` throughout PAI
- Environment variables: `PAI_ASSISTANT_NAME`, `PAI_USER_NAME`
- Profile file: `~/.pai/profile.json`
- Audit complete: Zero hardcoded "Kai"/"Daniel" in core (except attribution)

**Validation**:
- Create 3 test profiles (different names, companies)
- Verify prompts render correctly with all 3 profiles
- No hardcoded personal references leak through

---

### Sprint 2 (Weeks 3-4): Team Support & Installation Wizard

**Goal**: Make FORGE team-ready and customizable
**Story Points**: 14 points

**Stories**:
- 4.4: Team Configuration Support (3 pts)
- 4.5: Company Branding Support (2 pts)
- 4.6: Installation Wizard (2 pts)
- 4.7: Configurable Affirmation Levels (2 pts) ← NEW
- **U-1**: Prepare Skills for Upstream (2 pts)
- **U-2**: Prepare Standup for Upstream (2 pts)
- **U-3**: Engage Dan & Community (1 pt)

**Deliverables**:
- `team-config.json` support
- Company branding options (name, logo, color)
- Installation wizard CLI
- Skills ready for upstream PR
- Standup ready for upstream PR (if Dan interested)
- Initial contact with Dan

**Validation**:
- Deploy FORGE to 3 team members
- Each member has personalized assistant
- All share team standards (tech stack, CMMC baseline)
- Installation wizard completes in <5 minutes
- Skills work standalone (no FORGE dependencies)

---

## Definition of Done (Release 0.3)

### Technical Complete
- [ ] All 6 customization stories implemented
- [ ] Template system functional (`{{assistant_name}}`, etc.)
- [ ] Profile.json created during installation
- [ ] Team configuration supported
- [ ] Installation wizard functional
- [ ] Code committed to FORGE repo

### De-Personalization Complete
- [ ] Zero hardcoded "Kai" references (except attribution)
- [ ] Zero hardcoded "Daniel" references (except attribution/credit)
- [ ] All CORE skill prompts use templates
- [ ] All agent files use templates
- [ ] Attribution preserved in LICENSE, README, docs

### Team Deployment Complete
- [ ] ≥3 team members using FORGE
- [ ] Each member has unique profile
- [ ] Shared team standards working
- [ ] Installation time <5 minutes per user
- [ ] No conflicts between personal and team config

### Upstream Contribution Complete
- [ ] Skills ready for PR (100% PAI-compliant)
- [ ] Standup ready for PR (if Dan wants it)
- [ ] Dan contacted and feedback received
- [ ] ≥1 PR submitted to upstream PAI
- [ ] Community engagement positive

### Public Launch Complete
- [ ] FORGE publicly announced (blog post, social media)
- [ ] GitHub repo public
- [ ] README.md polished
- [ ] Examples and demos available
- [ ] Community feedback collected

---

## Migration Path for Existing Users

**If someone has PAI already installed:**

```bash
# FORGE installation wizard detects existing PAI
$ forge setup

Existing PAI installation detected at ~/.claude/

Would you like to:
1. Migrate to FORGE (keeps your data, adds FORGE features)
2. Fresh install (backup current PAI first)
3. Cancel

> 1

Migrating existing PAI to FORGE...

✅ Backed up current PAI to ~/.claude.backup/
✅ Installed FORGE skills (AgilePm, Security, TestArchitect)
✅ Installed FORGE agents (PM, Security, SM, Test Architect, Analyst)
✅ Installed Standup orchestration

Now let's personalize your assistant:

? What's your name? James
? What would you like to name your assistant? Atlas
? Company name (optional): ACME Corp

✅ Profile created: ~/.pai/profile.json
✅ Templates updated (all references now use "Atlas" and "James")

Your assistant "Atlas" is ready! Try:
  atlas create a PRD for...
  standup: design authentication system
  @pm what's the business value of...
```

---

## Upstream Contribution Strategy

### What to Contribute

**Definitely Submit**:
1. **AgilePm skill** - Clear value, no controversial dependencies
2. **Security skill** - CMMC is specialized but valuable
3. **TestArchitect skill** - ATDD is industry best practice

**Maybe Submit (Ask Dan First)**:
1. **Standup orchestration** - Novel but complex, may not fit Dan's vision
2. **Agent personalities** - Depends if Dan wants more agents in PAI

**Don't Submit**:
1. **Customization system** - Only if Dan wants PAI customizable
2. **FORGE-specific tooling** - Keep in FORGE repo

### Engagement Approach

**Phase 1: Introduce**
- Email/DM to Dan: "Built FORGE on top of PAI, would love feedback"
- Share vision: Multi-agent standup for better decisions
- Ask: "Would you be interested in upstream contributions?"

**Phase 2: Share**
- Send links to FORGE repo (docs, demos)
- Share A/B test results: "Standup finds 2x more issues"
- Offer: "Happy to contribute skills back to PAI"

**Phase 3: Contribute**
- Submit skills as PRs (if Dan interested)
- Be responsive to feedback
- Iterate based on Dan's vision
- Don't push if Dan prefers PAI stay minimal

### PR Structure (Skills)

**Title**: `feat: Add AgilePm skill for structured agile workflows`

**Description**:
```markdown
## Summary
Adds AgilePm skill with 4 workflows: PRD creation, epic decomposition, user story generation, sprint planning.

## Value Proposition
- Generate comprehensive PRDs in <5 minutes
- Break down features into user-value epics
- Create testable user stories with acceptance criteria
- Plan sprints with realistic story points

## Testing
- Used on 3+ real projects
- PRD quality validated by senior developers
- Story generation tested with real sprints

## Compliance
- ✅ TitleCase naming
- ✅ Single-line USE WHEN description
- ✅ Examples section (3 patterns)
- ✅ Workflow Routing table
- ✅ tools/ directory

## Attribution
Built as part of FORGE project (github.com/banjoey/FORGE)
Based on BMAD METHOD patterns adapted for PAI
```

---

## Success Metrics (Release 0.3)

### Quantitative
- [ ] Zero "Kai" references in core system (except attribution)
- [ ] Installation wizard completion rate >95%
- [ ] <5 minutes to personalize FORGE
- [ ] ≥3 team members deployed successfully
- [ ] ≥1 PR submitted to upstream PAI
- [ ] Skills tested on ≥5 projects total

### Qualitative
- [ ] Users feel ownership ("This is MY assistant, not Dan's")
- [ ] Team deployment is easy (no complex setup)
- [ ] Professional appearance for business use
- [ ] Dan provides positive feedback on contributions
- [ ] Community engagement is positive (GitHub stars, discussions)
- [ ] Attribution to Dan is clear and respectful

---

## Risks & Mitigation (Release 0.3)

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **Break existing PAI installs** | High | Low | Migration script, backup existing, thorough testing |
| **Miss some personal references** | Low | Medium | Comprehensive grep audit, external review |
| **Dan rejects contributions** | Medium | Low | Engage early, align with his vision, accept decision |
| **Template system too complex** | Medium | Low | Keep simple (env vars + JSON), document well |
| **Users confused by customization** | Low | Low | Clear wizard, good defaults, examples |

---

## Timeline Estimate

**Story Points Total**: 28 points (23 customization + 5 upstream prep)

**Week-by-Week**:
- Weeks 1-2: De-personalization + configuration (14 pts)
- Weeks 3-4: Team support + upstream prep (14 pts)

**Total**: 28 points / 8 points per week = 3.5 weeks (round to 3-4 weeks)

---

## How This Completes FORGE Vision

**Releases Combined (0.1 + 0.2 + 0.3)**:

✅ **Core Innovation** (0.1): Standup multi-agent conversation
✅ **Enterprise Rigor** (0.2): CMMC security + ATDD testing
✅ **Shareability** (0.3): Customizable, team-ready, upstream-contributable

**Total FORGE**:
- **Story Points**: 166 (60 + 78 + 28)
- **Timeline**: 20-24 weeks (~5-6 months)
- **Capabilities**: 3 skills, 6 agents, full standup, CMMC compliance, test-first
- **Adoption**: Solo developer, teams, upstream PAI

---

## After Release 0.3

**FORGE is Complete** - What's Next?

### Option 1: Maintain & Evolve
- Keep FORGE updated with PAI upstream changes
- Add more skills (data-analysis, ml-ops, devops)
- Add more agents (DevOps, Data Scientist, Designer)
- Expand CMMC to Level 3 (additional 20 practices)

### Option 2: New Projects
- Apply lessons learned to next OSS contribution
- Build on top of FORGE (domain-specific forks)
- Share knowledge (blog posts, talks, tutorials)

### Option 3: Community Growth
- Build FORGE community (contributors, users)
- Create FORGE marketplace (share custom skills/agents)
- Host workshops (how to build PAI skills)

---

## Comparison: Full FORGE Journey

| Milestone | Duration | Scope | Outcome |
|-----------|----------|-------|---------|
| **Planning** | 1 week | Epic creation, reviews, MVP planning | This document |
| **Release 0.1** | 8-10 weeks | 1 skill + 3 agents + core standup | Hypothesis validated ✅ |
| **Release 0.2** | 8-10 weeks | 2 skills + 3 agents + enterprise features | CMMC + ATDD ready ✅ |
| **Release 0.3** | 3-4 weeks | Customization + upstream contribution | Shareable ✅ |
| **TOTAL** | 20-25 weeks | 166 story points | FORGE complete ✅ |

---

**Next Steps (After Release 0.2 Complete)**:

1. **Review 0.3 Scope**: Is customization still a priority?
2. **Contact Dan**: Gauge interest in upstream contributions
3. **Start Sprint 1**: De-personalize PAI core
4. **Plan Public Launch**: Blog post, social media, community engagement

---

**FORGE Release 0.3: Make it yours, share it with the world!**
