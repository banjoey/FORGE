# PAI Architecture & Agile Integration Strategy

**Date**: 2025-12-02
**Purpose**: Understand how PAI works and design FORGE enhancements that fit PAI's philosophy

---

## How PAI Actually Works

### Core Architecture

```
PAI = Agents + Skills + Workflows + Hooks + History

┌─────────────────────────────────────────┐
│  AGENTS (Personality/Role Definitions)  │
│  (.claude/agents/*.md)                  │
│                                         │
│  - engineer.md      (Atlas)             │
│  - architect.md     (Atlas)             │
│  - designer.md                          │
│  - researcher.md                        │
│  - pentester.md                         │
│  - claude-researcher.md                 │
│  - gemini-researcher.md                 │
│  - perplexity-researcher.md             │
└─────────────────────────────────────────┘
              ↓
         Uses Skills
              ↓
┌─────────────────────────────────────────┐
│  SKILLS (Capabilities/Tools)            │
│  (.claude/skills/*)                     │
│                                         │
│  - CORE          (System foundation)    │
│  - research      (Research workflows)   │
│  - observability (Agent monitoring)     │
│  - fabric        (Pattern selection)    │
│  - system-createcli (CLI generation)    │
│  - prompting     (Best practices)       │
│  - brightdata    (Web scraping)         │
│  - etc.                                 │
└─────────────────────────────────────────┘
              ↓
      Contains Workflows
              ↓
┌─────────────────────────────────────────┐
│  WORKFLOWS (Specific Processes)         │
│  (.claude/skills/*/workflows/*.md)      │
│                                         │
│  - research/conduct.md                  │
│  - research/fabric.md                   │
│  - research/perplexity-research.md      │
│  - etc.                                 │
└─────────────────────────────────────────┘
```

### The PAI Philosophy

**"I (Claude) BECOME the agent, and USE skills as capabilities"**

#### This is DIFFERENT from BMAD:

| PAI Model | BMAD Model |
|-----------|------------|
| Claude transforms into the agent role | Multiple distinct agent personalities |
| Skills are invoked as tools | Agents have menu-driven workflows |
| One agent active at a time | Party mode brings multiple agents together |
| Agent definitions are instructions for Claude | Agents are separate entities coordinated by Master |

### How It Works in Practice

**User invokes an agent:**
```bash
# User types:
@architect "Create a PRD for user authentication"

# What happens:
1. Claude reads architect.md
2. Loads CORE skill for PAI context
3. Becomes "Atlas, Principal Software Architect"
4. Follows architect's methodology and standards
5. Creates comprehensive PRD with implementation checklists
```

**Agent uses a skill:**
```
Inside architect.md instructions:
"When you need research, use: Skill('research')"

# What happens:
1. Claude (as architect) invokes research skill
2. Research skill loads its workflows
3. Architect follows research workflow
4. Returns results to continue PRD creation
```

### Key PAI Components

#### 1. **Agents Are Role Definitions**

Agents tell Claude:
- WHO you are (identity, expertise)
- HOW you think (philosophy, principles)
- WHAT standards you follow (methodology)
- HOW you communicate (style, format)

**Example (engineer.md):**
```markdown
You are Atlas, an elite Principal Software Engineer...

## Engineering Philosophy
- Code Quality First
- Security by Design
- Test-Driven Approach
- Documentation Standards

## Core Competencies
- Code Implementation
- System Integration
- Debugging & Problem Solving
- Security Implementation
- Quality Assurance & Testing
```

#### 2. **Skills Are Capabilities**

Skills provide:
- Specific workflows (step-by-step processes)
- Tool integrations (MCP servers, APIs)
- Specialized knowledge (prompting patterns, fabric patterns)
- Reusable functionality (CLI creation, research, etc.)

**Example (CORE skill):**
- Auto-loads at session start
- Provides PAI identity and context
- Defines mandatory response format
- Workflow routing rules

#### 3. **CORE Skill is the Foundation**

**Every PAI agent starts by loading CORE:**

```markdown
# MANDATORY FIRST ACTION - DO THIS IMMEDIATELY
1. LOAD CONTEXT BOOTLOADER FILE!
   - Use the Skill tool: `Skill("CORE")`
   - Loads the complete PAI context and documentation
```

**CORE provides:**
- PAI identity (who is Kai's Digital Assistant system)
- Response format standards (SUMMARY/ANALYSIS/ACTIONS/etc.)
- Workflow routing (when to use which skill)
- System constitution and principles
- History system integration
- Hook system integration

#### 4. **Hooks Capture Work Automatically**

Hooks are event-driven automation:
- Tool execution hooks (after Read, Write, Edit, Bash)
- Prompt submission hooks (before user prompt is processed)
- Capture session history automatically
- Manage state and context

#### 5. **History System (UOCS)**

Universal Output Capture System:
- Auto-documents everything
- Captures all agent work
- Stores in structured format
- Enables context retrieval

---

## BMAD vs. PAI: Fundamental Difference

### BMAD's Approach: Multiple Agents in Conversation

```
User: "Design authentication system"
         ↓
   Master Agent
         ↓
   Brings in:
   - PM (John)
   - Architect (Winston)
   - Security (Sam)
         ↓
   Party Mode Conversation:
   📋 John: What are the business requirements?
   🏗️ Winston: I'm thinking OAuth2...
   🔐 Sam: CMMC Level 2 requires MFA...
```

**User sees multiple distinct personalities talking.**

### PAI's Approach: Claude Transforms Into Role

```
User: @architect "Design authentication system"
         ↓
   Claude reads architect.md
         ↓
   Claude BECOMES Atlas (Principal Architect)
         ↓
   May invoke skills:
   - Skill("research") for competitive analysis
   - Skill("CORE") for PAI context
         ↓
   Returns comprehensive PRD as Atlas
```

**User sees Claude speaking AS the architect.**

---

## Your Question: How to Add Agile Workflows?

### The PAI-Consistent Approach

**Option 1: Enhance Existing Architect Agent ✅ RECOMMENDED**

```markdown
# architect.md (enhanced)

You are Atlas, Principal Software Architect...

## NEW: Agile Workflow Support

When creating PRDs, you follow agile methodology:

1. **Epic Definition** - Group related features
2. **User Story Decomposition** - Break epics into stories
3. **Acceptance Criteria** - Define "done" for each story
4. **Sprint Planning Support** - Organize stories by priority

### Use Agile Skill
When user requests agile workflow:
- Invoke: Skill("agile-pm")
- Follow structured PRD → Epics → Stories pipeline
```

**Why this works:**
- ✅ Consistent with PAI's "I become the agent" model
- ✅ Architect already creates PRDs
- ✅ Skills extend capabilities without changing identity
- ✅ No confusion about "who is speaking"

**Option 2: Create Separate PM + SM Agents ❌ LESS CONSISTENT**

```
.claude/agents/
├── engineer.md
├── architect.md
├── pm.md           ← New: Product Manager
├── scrum-master.md ← New: Scrum Master
```

**Why this is problematic:**
- ❌ User has to switch between @architect, @pm, @sm
- ❌ Breaks natural flow ("Now switch to PM agent...")
- ❌ Doesn't match PAI's current design pattern
- ❌ Creates confusion: "Am I talking to architect or PM?"

**Option 3: Create "Agile PM" Skill ✅✅ MOST PAI-CONSISTENT**

```
.claude/skills/agile-pm/
├── skill.md                 (Main skill definition)
├── workflows/
│   ├── create-prd.md        (PRD creation workflow)
│   ├── create-epics.md      (Epic decomposition)
│   ├── create-stories.md    (User story generation)
│   ├── sprint-planning.md   (Sprint organization)
│   ├── retrospective.md     (Team retrospective)
│   └── course-correction.md (When things drift)
└── templates/
    ├── prd-template.md
    ├── epic-template.md
    └── story-template.md
```

**How it works:**

```
User: @architect "Create authentication PRD using agile workflow"
         ↓
Claude (as architect):
"I'll use agile methodology for this PRD"
         ↓
Invokes: Skill("agile-pm")
         ↓
Follows workflow: agile-pm/workflows/create-prd.md
         ↓
Creates PRD with Epics and Stories structured
         ↓
Returns comprehensive deliverable
```

**Why this is BEST:**
- ✅ Architect remains the "speaker"
- ✅ Agile-pm is a capability/tool, not a personality
- ✅ Reusable across agents (engineer can also use agile-pm)
- ✅ Matches PAI's skills-as-tools philosophy
- ✅ No agent switching confusion
- ✅ Workflows provide the rigor you want

---

## FORGE Enhancement Strategy

### Phase 1: Create Agile PM Skill

**Structure:**
```
.claude/skills/agile-pm/
├── skill.md                    # Skill definition
├── METHODOLOGY.md              # Agile principles for AI
├── workflows/
│   ├── 01-create-prd.md        # Structured PRD creation
│   ├── 02-create-epics.md      # Epic decomposition
│   ├── 03-create-stories.md    # User story generation
│   ├── 04-sprint-planning.md   # Sprint organization
│   ├── 05-retrospective.md     # Team retrospectives
│   ├── 06-course-correction.md # Drift detection/correction
│   └── 07-validation.md        # Second-pass validation
├── templates/
│   ├── prd-template.md         # PRD structure
│   ├── epic-template.md        # Epic format
│   ├── story-template.md       # User story format
│   ├── sprint-status.yaml      # Sprint tracking
│   └── project-context.md      # Project "bible"
└── knowledge/
    ├── user-story-patterns.md  # Good story patterns
    ├── epic-sizing.md          # How to size epics
    └── acceptance-criteria.md  # Writing good criteria
```

**skill.md:**
```markdown
---
name: agile-pm
description: Agile product management workflows for structured PRD creation, epic decomposition, user story generation, and sprint planning. Provides enterprise-grade rigor for software development.
---

# Agile PM Skill

Provides structured agile workflows for product development:

## Workflows Available

1. **create-prd** - Create comprehensive Product Requirements Document
2. **create-epics** - Decompose PRD into user-value epics
3. **create-stories** - Break epics into implementable user stories
4. **sprint-planning** - Organize stories into sprints
5. **validation** - Second-pass validation with fresh context
6. **retrospective** - Team retrospective facilitation
7. **course-correction** - Detect and correct project drift

## When to Use

- Creating new product features
- Green-field projects needing structured planning
- Enterprise projects requiring agile rigor
- Multi-sprint development efforts
- Distributed team coordination

## Integration

This skill is designed to work with:
- **Architect agent** - PRD creation and system design
- **Engineer agent** - Story implementation
- **Test Architect skill** (future) - Test strategy for stories
- **Security skill** (future) - Security requirements per story

## Philosophy

Agile rigor IMPROVES AI performance by:
- **Reducing context windows** - Epics/stories are focused
- **Improving clarity** - Acceptance criteria are specific
- **Enabling validation** - Clear "done" definitions
- **Supporting collaboration** - Stories are distribution units
```

### Phase 2: Enhance Architect Agent

**Modify architect.md to reference agile-pm:**

```markdown
## NEW: Agile Product Management

When creating PRDs for agile projects, use the agile-pm skill:

### Standard PRD Creation
For simple/quick projects:
- Create comprehensive PRD document
- Include all sections from PRD template
- Provide implementation checklists

### Agile PRD Creation
For enterprise/multi-sprint projects:
1. Invoke: Skill("agile-pm")
2. Follow workflow: create-prd.md
3. Creates PRD with epic decomposition
4. Generates user stories with acceptance criteria
5. Provides sprint planning recommendations

### When to Use Agile Workflow
- Green-field projects
- Multi-month development efforts
- Distributed teams (multiple agents/developers)
- Enterprise projects requiring audit trails
- CMMC/compliance projects needing documentation
```

### Phase 3: Create Security Skill (Not Agent!)

```
.claude/skills/security/
├── skill.md                       # Security skill definition
├── knowledge/
│   ├── cmmc-level-2-practices.md  # CMMC baseline
│   ├── cmmc-level-3-practices.md  # CMMC enhanced
│   ├── stride-threat-modeling.md  # Threat modeling
│   ├── owasp-top-10.md            # OWASP patterns
│   └── secure-architecture.md     # Secure design patterns
├── workflows/
│   ├── threat-model.md            # STRIDE analysis
│   ├── security-review.md         # Code/architecture review
│   ├── cmmc-baseline.md           # Initialize CMMC project
│   ├── compliance-check.md        # Verify CMMC controls
│   └── infrastructure-security.md # IaC security review
└── templates/
    ├── security-baseline.md       # Project security standards
    ├── threat-model-template.md   # STRIDE template
    └── cmmc-ssp-template.md       # System Security Plan
```

**Architect and Engineer both use security skill:**

```markdown
## architect.md
When designing systems:
1. Invoke: Skill("security")
2. Follow workflow: threat-model.md
3. Include security architecture in PRD

## engineer.md
Before implementing code:
1. Invoke: Skill("security")
2. Follow workflow: security-review.md
3. Validate against OWASP and CMMC
```

### Phase 4: Create Test Architect Skill

```
.claude/skills/test-architect/
├── skill.md
├── knowledge/
│   ├── atdd-patterns.md           # Acceptance Test Driven Dev
│   ├── risk-based-testing.md      # Risk-based approach
│   ├── playwright-patterns.md     # E2E testing
│   └── ci-cd-quality-gates.md     # Pipeline integration
├── workflows/
│   ├── test-strategy.md           # Overall test approach
│   ├── atdd.md                    # Generate tests FIRST
│   ├── test-automation.md         # Comprehensive test suite
│   └── ci-integration.md          # CI/CD setup
└── templates/
    ├── test-plan-template.md
    └── test-scenario-template.md
```

---

## The Beauty of This Approach

### Your Concern: "I want rigor without caring about extra steps"

**PAI Skills Solve This Perfectly:**

```
User: @architect "Create auth system PRD with full agile workflow"

Claude (as architect):
1. Loads agile-pm skill
2. Follows create-prd.md workflow (11 steps)
3. Auto-generates:
   - Comprehensive PRD
   - Epic decomposition
   - User stories with acceptance criteria
   - Acceptance criteria for each story
   - Sprint planning recommendations
4. Invokes security skill
5. Runs threat-model.md workflow
6. Adds security requirements to stories
7. Invokes test-architect skill
8. Generates test scenarios for each story
9. Returns complete package

User: [Receives production-ready deliverable]
```

**You don't see the steps. You just get the output.**

The workflows ensure:
- ✅ All steps are followed rigorously
- ✅ Nothing is skipped
- ✅ Consistency across projects
- ✅ Epic/story structure reduces context window confusion
- ✅ Acceptance criteria provide clear "done" definitions

### Skills Are Composable

```
Architect uses:
├── Skill("CORE")          # PAI foundation
├── Skill("agile-pm")      # Product workflows
├── Skill("security")      # Threat modeling
├── Skill("test-architect")# Test strategy
└── Skill("research")      # Competitive analysis

Engineer uses:
├── Skill("CORE")          # PAI foundation
├── Skill("agile-pm")      # Story implementation
├── Skill("security")      # Code security review
└── Skill("test-architect")# Test automation
```

**Same skills, different contexts!**

---

## Cross-Project Context: Your Innovation

**The Problem BMAD Has:**
```
Project A/
└── project-context.md     # Locked to Project A

Project B/
└── project-context.md     # Locked to Project B

PM agent only sees current project context.
```

**FORGE Solution with PAI:**

```
~/.pai/
├── global-context/
│   ├── company-standards.md      # Your company's rules
│   ├── cmmc-baseline.md          # Security baseline
│   ├── tech-stack-approved.md    # Approved technologies
│   └── architecture-patterns.md  # Standard patterns
├── projects/
│   ├── project-a/
│   │   └── context.md            # Project A specifics
│   ├── project-b/
│   │   └── context.md            # Project B specifics
└── agent-memory/
    ├── architect-learnings.md    # What architect learned
    ├── engineer-learnings.md     # What engineer learned
    └── security-learnings.md     # Security patterns discovered
```

**Agile-PM skill loads:**
1. Global context (company CMMC baseline)
2. Project context (this project's decisions)
3. Agent memory (patterns from ALL projects)

**This is your killer feature that BMAD can't do!**

---

## Recommendation

### Build Skills, Not Agents

**For FORGE, create:**

1. **agile-pm skill** ⭐⭐⭐⭐⭐
   - PRD → Epics → Stories workflows
   - Sprint planning
   - Validation workflows
   - Retrospectives

2. **security skill** ⭐⭐⭐⭐⭐
   - CMMC compliance focus
   - Threat modeling
   - Security reviews (code + infrastructure)
   - Compliance tracking

3. **test-architect skill** ⭐⭐⭐⭐⭐
   - ATDD workflows
   - Risk-based testing
   - CI/CD quality gates
   - Test automation

4. **cross-project-context skill** ⭐⭐⭐⭐
   - Global context management
   - Project-specific context
   - Agent memory across projects
   - **YOUR INNOVATION**

### Enhance Existing Agents

**Modify PAI's agents to use your skills:**

```markdown
# architect.md (enhanced)
- Add: Skill("agile-pm") for PRD workflows
- Add: Skill("security") for threat modeling
- Add: Skill("test-architect") for test strategy

# engineer.md (enhanced)
- Add: Skill("agile-pm") for story implementation
- Add: Skill("security") for code review
- Add: Skill("test-architect") for test automation
```

### Why This Wins

**For you:**
- ✅ Get the agile rigor you want
- ✅ Skills do all the work autonomously
- ✅ Don't care about extra steps (you don't see them)
- ✅ Consistent quality across projects
- ✅ CMMC compliance baked in

**For Dan/PAI:**
- ✅ Consistent with PAI's existing architecture
- ✅ Skills are reusable across agents
- ✅ No confusing agent switching
- ✅ Enterprise-grade capabilities
- ✅ Easy to adopt incrementally

**For the community:**
- ✅ Skills can be used independently
- ✅ Clear separation of concerns
- ✅ Composable and extensible
- ✅ Well-documented workflows

---

## Implementation Plan

### Month 1: Agile PM Skill

**Week 1-2: Design**
- Study BMAD's PRD/Epic/Story workflows
- Adapt for PAI's skill architecture
- Create workflow markdown files
- Design templates

**Week 3: Prototype**
- Build in experiments/agile-pm-skill/
- Test with real project
- Iterate based on results

**Week 4: Integration**
- Add to PAI fork
- Enhance architect.md to use it
- Document usage patterns
- Test end-to-end

### Month 2: Security Skill

**Week 1-2: CMMC Focus**
- Create knowledge base (CMMC L2/L3)
- Design threat modeling workflow
- Build compliance checking workflow
- Infrastructure security patterns

**Week 3: Integration**
- Connect with agile-pm (security per story)
- Test with architect and engineer
- Validate CMMC coverage

**Week 4: Polish**
- Documentation
- Examples
- Prepare for PR

### Month 3: Test Architect Skill + Cross-Project Context

**Week 1-2: Test Architect**
- Adapt BMAD's TEA patterns
- ATDD workflow
- Risk-based testing
- CI/CD integration

**Week 3: Cross-Project Context**
- Global context structure
- Project context integration
- Agent memory system
- **YOUR INNOVATION**

**Week 4: First PR to PAI**
- Submit agile-pm skill
- Excellent documentation
- Real-world examples
- Community feedback

---

## Answer to Your Question

> "Should we have a PM, or should you have a PM skill that gets loaded and you become that?"

**Answer: PM Skill that existing agents load**

**NOT:**
```
@pm "Create epic for authentication"        ← Separate PM agent
@architect "Now create architecture"        ← Switch to architect
@scrum-master "Plan sprint"                 ← Switch again
```

**INSTEAD:**
```
@architect "Create auth PRD with agile workflow"

# Architect automatically:
- Loads agile-pm skill
- Follows PRD workflow
- Creates epics and stories
- Returns complete deliverable

# You get everything, no switching!
```

---

## The PAI Way

**PAI Philosophy:**
- Agents are WHO speaks (identity/personality)
- Skills are WHAT they can do (capabilities)
- Workflows are HOW they do it (processes)

**FORGE enhancements should be skills:**
- agile-pm → Capability to do agile workflows
- security → Capability to do security analysis
- test-architect → Capability to do testing
- cross-project-context → Capability to remember across projects

**All usable by existing agents (architect, engineer, etc.)**

This gives you:
- ✅ The rigor and quality of BMAD's workflows
- ✅ The simplicity of PAI's agent model
- ✅ The flexibility to compose capabilities
- ✅ The innovation of cross-project context

**Perfect synthesis of BMAD + PAI!**
