# EPIC-004: PAI Customization & De-Personalization

**Status**: Planning
**Priority**: Medium
**Target Release**: FORGE v0.2 (after core features)
**Owner**: @banjoey
**Created**: 2025-12-02
**Depends On**: None (can run in parallel with other epics)

---

## Epic Overview

Make PAI customizable for different users and teams by removing hardcoded references to "Kai" and "Daniel Miessler" and replacing them with configurable user identity and system naming. Enable teams to personalize their AI infrastructure without forking the entire codebase.

## Business Value

**Current Problem:**
- PAI hardcoded as "Kai" (Daniel Miessler's Digital Assistant)
- References to "Daniel" throughout documentation and prompts
- Not suitable for teams or commercial use without extensive search/replace
- Confusing for new users ("Who is Kai? Why does it mention Daniel?")

**Desired State:**
- User configures assistant name during setup
- System references are templated and replaced dynamically
- No hardcoded personal references in core system
- Easy to customize for individuals, teams, or companies
- Professional appearance for business use

**Value:**
- Teams can adopt PAI without awkward personalizations
- Users feel ownership ("This is MY assistant, not Dan's")
- Easier to contribute upstream (no personal refs to remove)
- Professional for company/client demos
- Maintains Dan's vision while enabling adoption

---

## User Stories

### Story 4.1: Assistant Name Configuration

**As a** new PAI user
**I want** to name my digital assistant
**So that** it feels personal to me, not someone else's system

**Acceptance Criteria:**
- [ ] During installation, prompt: "What would you like to name your assistant?"
- [ ] Default suggestion: User's first name + "AI" (e.g., "JamesAI")
- [ ] Stored in environment variable: `PAI_ASSISTANT_NAME`
- [ ] All system prompts use `${PAI_ASSISTANT_NAME}` template
- [ ] Agent files reference `${PAI_ASSISTANT_NAME}` instead of "Kai"
- [ ] Constitution and CORE skill use templated name
- [ ] User can change name later: `pai config set assistant-name "NewName"`
- [ ] Name displayed in CLI welcome message

**Example:**
```bash
# During setup
? What would you like to name your assistant? Atlas

# Result
PAI_ASSISTANT_NAME=Atlas

# In prompts
"You are Atlas, [user]'s digital assistant..."
# Instead of
"You are Kai, Daniel's digital assistant..."
```

**Technical Notes:**
- Template syntax: `{{assistant_name}}` or `${PAI_ASSISTANT_NAME}`
- Update all agent files
- Update CORE skill
- Update Constitution
- Update README and documentation

---

### Story 4.2: User Identity Configuration

**As a** PAI user
**I want** the system to know MY name and context
**So that** agents personalize responses for me

**Acceptance Criteria:**
- [ ] During installation, prompt: "What's your name?"
- [ ] Stored in environment variable: `PAI_USER_NAME`
- [ ] Prompts use `${PAI_USER_NAME}` instead of hardcoded names
- [ ] User profile created: `~/.pai/profile.json`
  ```json
  {
    "user_name": "James",
    "assistant_name": "Atlas",
    "company": "ACME Corp",
    "role": "Staff Engineer",
    "preferences": {
      "voice_enabled": true,
      "observability": true
    }
  }
  ```
- [ ] Agents reference user by name in responses
- [ ] Configuration command: `pai config profile`
- [ ] Profile used in COMPLETED messages and history

**Example:**
```
Instead of: "Kai, Daniel's digital assistant..."
Use: "Atlas, James's digital assistant..."

Instead of: "For Daniel's workflow..."
Use: "For James's workflow..."
```

---

### Story 4.3: De-Personalize Core System

**As a** contributor or team lead
**I want** PAI core free of personal references
**So that** it's professional and generalizable

**Acceptance Criteria:**
- [ ] Audit all files for "Kai", "Daniel", "Miessler" references
- [ ] Replace with templates or remove:
  - Agent files: Use `{{assistant_name}}`
  - Documentation: Use "PAI" or "your assistant"
  - Examples: Use "User" or "Developer"
  - Constitution: Template all personal refs
- [ ] Keep attribution in LICENSE and README (credit Dan appropriately)
- [ ] Keep links to Dan's blog (sources of wisdom, not identity)
- [ ] Update example prompts to be generic
- [ ] No personal email addresses or GitHub handles in core (move to config)

**Files to Update:**
```
.claude/agents/*.md          → Replace "Kai" with {{assistant_name}}
.claude/skills/CORE/*.md     → Template personal references
.claude/hooks/*.ts           → Use environment variables
docs/                        → Generic language
README.md                    → Preserve attribution, template usage
CONSTITUTION.md              → Template philosophy to user's context
```

**Example Changes:**
```markdown
# Before
"You are Kai, Daniel Miessler's Digital Assistant system..."

# After
"You are {{assistant_name}}, {{user_name}}'s Digital Assistant system..."

# Before
"Daniel prefers concise, actionable outputs..."

# After
"Your user prefers concise, actionable outputs..."

# License/Attribution (KEEP)
"Created by Daniel Miessler - https://danielmiessler.com"
"Based on Personal AI Infrastructure (PAI) by Daniel Miessler"
```

---

### Story 4.4: Team Configuration Support

**As a** team lead deploying PAI for my team
**I want** shared configuration and team-specific settings
**So that** all team members have consistent experience

**Acceptance Criteria:**
- [ ] Support team configuration file: `team-config.json`
  ```json
  {
    "team_name": "Engineering Team",
    "company": "ACME Corp",
    "shared_context": {
      "tech_stack": ["TypeScript", "React", "PostgreSQL"],
      "coding_standards": "~/.pai/team/coding-standards.md",
      "security_baseline": "~/.pai/team/cmmc-baseline.md"
    },
    "agent_defaults": {
      "model": "sonnet",
      "voice_enabled": false
    }
  }
  ```
- [ ] Team members reference shared context automatically
- [ ] Individual config overrides team config
- [ ] Team standards loaded in CORE skill
- [ ] Command: `pai config team --file team-config.json`
- [ ] Support for different teams: work, personal, side-projects

**Example:**
```
Team member A: Uses "Atlas" assistant, loads team tech stack
Team member B: Uses "Sage" assistant, same team tech stack
Both: Reference shared coding standards and CMMC baseline
```

**Use Case:**
```
Your company has 5 developers
- Each has personalized assistant name
- All share: CMMC baseline, approved tech stack, coding standards
- Personal preferences: voice, observability, response format
```

---

### Story 4.5: Company Branding Support

**As a** company using PAI
**I want** to brand the system for our organization
**So that** it aligns with company identity

**Acceptance Criteria:**
- [ ] Support company name in config
- [ ] Support company logo in web interfaces (observability dashboard)
- [ ] Support company color scheme (terminal, web UI)
- [ ] Company context loaded: values, mission, tech philosophy
- [ ] Agents can reference company standards
- [ ] Example: "ACME Engineering AI Assistant powered by PAI"
- [ ] White-label option (hide PAI branding for clients)

**Configuration:**
```json
{
  "company": {
    "name": "ACME Corporation",
    "branding": {
      "primary_color": "#1E40AF",
      "logo_path": "~/.pai/company/logo.png"
    },
    "context": {
      "values": "~/.pai/company/values.md",
      "tech_philosophy": "~/.pai/company/tech-stack.md",
      "security_policy": "~/.pai/company/cmmc-baseline.md"
    }
  }
}
```

---

### Story 4.6: Installation Wizard

**As a** first-time PAI user
**I want** a guided setup wizard
**So that** I configure my system correctly from the start

**Acceptance Criteria:**
- [ ] Interactive CLI wizard on first run
- [ ] Prompts:
  1. "What's your name?" → PAI_USER_NAME
  2. "What would you like to name your assistant?" → PAI_ASSISTANT_NAME
  3. "Company name (optional)?" → PAI_COMPANY
  4. "Enable voice feedback? (y/n)" → VOICE_ENABLED
  5. "Enable observability dashboard? (y/n)" → OBSERVABILITY_ENABLED
  6. "Your role (optional): Developer/PM/Designer/Other?" → PAI_USER_ROLE
- [ ] Creates `~/.pai/profile.json`
- [ ] Sets environment variables
- [ ] Runs validation: `pai doctor`
- [ ] Shows welcome message with personalized name
- [ ] Can re-run: `pai setup --reconfigure`

**Example Flow:**
```bash
$ pai setup

🎉 Welcome to PAI - Personal AI Infrastructure!

Let's personalize your system:

? What's your name? James
? What would you like to name your assistant? Atlas
? Company name (optional): ACME Corp
? Enable voice feedback? Yes
? Enable observability dashboard? Yes
? Your role: Staff Engineer

✅ Configuration saved to ~/.pai/profile.json

Your assistant "Atlas" is ready! Try:
  atlas create a CLI tool for...
  @architect design a system for...
  pai party-mode brainstorm ideas
```

---

## Dependencies

**External:**
- PAI codebase understanding
- Environment variable system
- JSON configuration parsing

**Internal:**
- Understanding of where personal refs exist
- Template system for dynamic replacement
- Configuration persistence

---

## Definition of Done

**For Epic:**
- [ ] All 6 user stories completed
- [ ] PAI fully de-personalized (no Kai/Daniel refs in core)
- [ ] Installation wizard functional
- [ ] User/assistant name templating works
- [ ] Team configuration supported
- [ ] Company branding optional
- [ ] Documentation updated
- [ ] Tested with multiple user configs
- [ ] Backwards compatible (existing users can migrate)
- [ ] PR ready for upstream PAI

**For Each Story:**
- [ ] Configuration option implemented
- [ ] Environment variables set correctly
- [ ] Templates replace hardcoded values
- [ ] Tested with different configurations
- [ ] Documentation updated
- [ ] Examples provided

---

## Technical Implementation Notes

### Configuration File Structure

```json
// ~/.pai/profile.json
{
  "version": "1.0",
  "user": {
    "name": "James Barkley",
    "preferred_name": "James",
    "email": "james@example.com",
    "role": "Staff Engineer"
  },
  "assistant": {
    "name": "Atlas",
    "personality": "professional",
    "model_preference": "sonnet"
  },
  "company": {
    "name": "ACME Corporation",
    "team": "Platform Engineering",
    "context_path": "~/.pai/company/"
  },
  "preferences": {
    "voice_enabled": true,
    "voice_rate": 260,
    "observability": true,
    "response_format": "structured",
    "color_scheme": "dark"
  },
  "paths": {
    "global_context": "~/.pai/global-context/",
    "team_standards": "~/.pai/team/",
    "projects": "~/projects/"
  }
}
```

### Environment Variables

```bash
# Core Identity
export PAI_USER_NAME="James"
export PAI_ASSISTANT_NAME="Atlas"
export PAI_COMPANY="ACME Corp"
export PAI_USER_ROLE="Staff Engineer"

# Paths
export PAI_DIR="~/.pai"
export PAI_PROFILE="~/.pai/profile.json"
export PAI_GLOBAL_CONTEXT="~/.pai/global-context"

# Preferences
export VOICE_ENABLED="true"
export OBSERVABILITY_ENABLED="true"
```

### Template Replacement

```typescript
// utils/template.ts
function replaceTemplates(content: string, profile: Profile): string {
  return content
    .replace(/\{\{user_name\}\}/g, profile.user.name)
    .replace(/\{\{assistant_name\}\}/g, profile.assistant.name)
    .replace(/\{\{company\}\}/g, profile.company?.name || "your organization")
    .replace(/\{\{user_role\}\}/g, profile.user.role || "user");
}

// Load agent with templating
function loadAgent(agentPath: string): string {
  const rawContent = fs.readFileSync(agentPath, 'utf-8');
  const profile = loadProfile();
  return replaceTemplates(rawContent, profile);
}
```

---

## Success Metrics

**Quantitative:**
- Zero hardcoded "Kai" references in core system
- Zero hardcoded "Daniel" references (except attribution)
- Installation wizard completion rate >95%
- <5 minutes to personalize PAI
- Configuration persists across sessions
- 100% template replacement accuracy

**Qualitative:**
- Users feel ownership of their assistant
- Teams can deploy without awkward personalizations
- Professional appearance for business use
- Easy to understand configuration
- Clear distinction: PAI (framework) vs. user's instance

---

## Risks & Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Break existing PAI installations | High | Medium | Backwards compatibility, migration script |
| Miss some personal references | Low | Medium | Comprehensive audit, grep for names |
| Template system too complex | Medium | Low | Keep simple, use env vars + JSON |
| Users confused by configuration | Medium | Medium | Clear wizard, good defaults, documentation |
| Lose attribution to Dan | Low | Low | Preserve in LICENSE, README, docs |

---

## Migration Path for Existing Users

```bash
# Detect existing PAI installation
if [ -f ~/.claude/skills/CORE/CONSTITUTION.md ]; then
  echo "Existing PAI detected. Would you like to migrate? (y/n)"

  # If yes:
  # 1. Backup current config
  # 2. Run setup wizard
  # 3. Migrate custom skills
  # 4. Update agent files with templates
  # 5. Test installation
fi
```

---

## Timeline Estimate

**Story Points Total:** 21 points

**Week 1:**
- Story 4.1: Assistant Name (3 points)
- Story 4.2: User Identity (3 points)
- Story 4.3: De-Personalize Core (8 points) ← LARGEST

**Week 2:**
- Story 4.4: Team Configuration (3 points)
- Story 4.5: Company Branding (2 points)
- Story 4.6: Installation Wizard (2 points)

**Week 3: Testing & Migration**
- Audit all files
- Test different configurations
- Migration script for existing users
- Documentation update

**Total Timeline:** 3 weeks

---

## Next Steps

1. **Audit Current State** - Grep for "Kai", "Daniel", "Miessler"
2. **Design Template System** - How to replace dynamically
3. **Create Profile Schema** - JSON structure for config
4. **Build Installation Wizard** - Interactive setup
5. **Update Core Files** - Replace hardcoded refs with templates
6. **Test Configurations** - Multiple users, teams, companies
7. **Migration Script** - For existing PAI users
8. **Documentation** - Setup guide, configuration reference

---

## Attribution Preservation

**IMPORTANT:** While de-personalizing, we MUST preserve attribution to Dan Miessler:

### Keep in LICENSE
```
MIT License
Copyright (c) 2024 Daniel Miessler
```

### Keep in README
```
# Personal AI Infrastructure (PAI)

Created by Daniel Miessler
https://danielmiessler.com
https://github.com/danielmiessler/PAI

FORGE is a fork/extension of PAI adding:
- Party mode multi-agent collaboration
- Enterprise security and testing skills
- Team collaboration features
```

### Keep in Documentation
- Link to Dan's blog posts explaining PAI philosophy
- Credit Dan's vision and architecture
- Reference his articles in skill documentation

**Remove:**
- Hardcoded "Kai" as assistant name (make configurable)
- Hardcoded "Daniel" as user name (make configurable)
- Personal workflow examples (make generic or templated)

---

## Planning Sessions & Backlog Ideas

### Session 2025-12-03: Rapid Deployment Plan

**Context**: Need to deploy FORGE to teammates today with basic personalization

**Decision**: Implement Option A - Minimal MVP (4-6 hours)
- ✅ Stories 4.1 + 4.2 (names only, not full profile)
- ✅ Simple install.sh wizard
- ✅ Template FORGE-specific files
- ✅ Basic QUICKSTART.md
- ⏸ Defer: Team config, company branding, full PAI audit

**Deployment Target**: EOD 2025-12-03

### Backlog: "Create Team" Skill Idea

**Proposed**: New skill for team setup and management

**User Story**:
> As a team lead deploying FORGE to my team
> I want a simple workflow to create team configuration
> So that I don't have to manually edit JSON files

**Possible Workflows**:
1. **CreateTeam** - Interactive wizard to set up team profile
   ```
   User: "Create a team configuration for Platform Engineering"
   Skill: Prompts for team name, members, tech stack, standards
   Output: team-config.json + shared context files
   ```

2. **AddTeamMember** - Add new member to existing team
   ```
   User: "Add Sarah to the Platform team"
   Skill: Creates member profile, links to team config
   Output: Updated team roster, member onboarding docs
   ```

3. **TeamStandards** - Define shared standards (coding, security, testing)
   ```
   User: "Define our team's security baseline"
   Skill: Guides through CMMC requirements, creates baseline
   Output: cmmc-baseline.md, security checklist
   ```

**Integration Points**:
- Works with AgilePm (team velocity, capacity planning)
- Works with Security (shared security baseline)
- Works with Standup (team roster defaults)
- Generates team-context.md (shared knowledge base)

**Story Points**: 8 points (2-3 days)
- CreateTeam workflow: 3 pts
- Team config persistence: 2 pts
- Integration with existing skills: 2 pts
- Documentation: 1 pt

**Priority**: Medium (after basic personalization works)

**Notes**:
- Consider whether this should be:
  - A) Separate skill (CreateTeam)
  - B) Part of AgilePm skill (team planning workflows)
  - C) CORE skill extension (system configuration)
- Team config should layer on top of personal config:
  ```
  Personal config (James, Atlas)
  + Team config (Platform Team, tech stack, standards)
  = Full context for agent
  ```

**Related to Story 4.4**: Team Configuration Support
- This skill would be the **user-facing interface** for Story 4.4
- Story 4.4 = Infrastructure (JSON schema, loading, templating)
- CreateTeam skill = Workflow (guided setup, validation, documentation)

---

**Make PAI yours while honoring Dan's incredible work!**
