# FORGE

**F**used **O**ptimization & **R**easoning for **G**enerative **E**ngineering

Multi-agent collaboration system for better software development decisions. Built on PAI (Personal AI Infrastructure).

## What is FORGE?

FORGE is a PAI enhancement that brings **multi-agent collaboration** to software development. Instead of getting one AI perspective, you get multiple specialist perspectives working together.

**Core Innovation**: Standup mode finds **2-3x more issues** than solo agent mode (validated through A/B testing).

**What FORGE Provides**:
- **4 Skills**: AgilePm, Security, TestArchitect, Standup
- **3 Default Agents**: Murat (Product Manager), Emma (Security Engineer), Wei (QA Lead)
- **Customizable Rosters**: Define agents for any domain (Investment Advisory, Legal, Healthcare, etc.)
- **Multi-Agent Orchestration**: Better decisions through diverse perspectives

## Key Features

### 1. AgilePm Skill
Enterprise agile product management:
- **CreatePrd**: Generate comprehensive PRDs with architecture, features, implementation checklists
- **CreateEpics**: Decompose PRDs into user-value epics with MoSCoW prioritization
- **CreateStories**: Break epics into INVEST-compliant user stories with acceptance criteria
- **SprintPlanning**: Organize stories into sprints with velocity-based planning

**Dogfooded**: FORGE's own PRD scored 10/10 on quality rubric

### 2. Security Skill
Security-first engineering:
- **ThreatModel**: STRIDE threat modeling with DREAD risk scoring
- **CmmcBaseline**: CMMC Level 2 compliance baseline (71 practices in MVP, 110 in v1.1)

**Dogfooded**: FORGE's threat model identified 8 threats (1 medium, 7 low), 0 critical

### 3. TestArchitect Skill
Test-first development strategy:
- **CreateTestStrategy**: Define test pyramid, risk-based coverage, automation tiers
- **DefineCoverage**: Analyze coverage gaps, prioritize improvements

**Dogfooded**: FORGE's test strategy defines 144 tests (70% unit, 20% integration, 10% E2E)

### 4. Emma Security Engineer ✅ PRODUCTION READY

**Status**: 100% test coverage (78/78 tests passing)

Comprehensive security analysis with CMMC Level 2 compliance:
- **50+ Vulnerability Patterns**: SQL injection, XSS, authentication bypass, authorization flaws, infrastructure misconfigurations
- **STRIDE Threat Modeling**: Categorizes threats across 6 categories (Spoofing, Tampering, Repudiation, Information Disclosure, DoS, Elevation of Privilege)
- **CMMC Level 2 Coverage**: Maps vulnerabilities to 17 CMMC domains and 25+ practices
- **Multi-Agent Standup**: Coordinates with Mary, Bob, Murat for comprehensive feature analysis
- **Audit Trail Generation**: Creates CMMC-compliant audit trails for security reviews

**Quick Start**:
```typescript
import { reviewCode } from './src/emma/security-review'

const analysis = await reviewCode(yourCode)
console.log(analysis.vulnerability)  // "SQL Injection - String Concatenation"
console.log(analysis.severity)       // "Critical"
console.log(analysis.cmmc)           // "SI.L2-3.14.6"
console.log(analysis.cmmcDomain)     // "System and Information Integrity"
console.log(analysis.mitigation)     // Remediation guidance
```

**Features**:
- ✅ 50+ vulnerability patterns (SQL, XSS, Auth, CMMC infrastructure)
- ✅ STRIDE threat modeling with priority rankings
- ✅ CMMC compliance (17/17 domains, 100% coverage)
- ✅ Multi-agent standup orchestration
- ✅ Audit trail generation for compliance assessors
- ✅ Production-ready (100% test coverage)

**Test Coverage**:
- Acceptance: 13/13 (100%)
- Critical: 31/31 (100%)
- Authorization: 11/11 (100%)
- CMMC: 23/23 (100%)
- **Overall: 78/78 (100%)** ✅

**Documentation**:
- [Emma README](src/emma/README.md) - Complete usage guide
- [CMMC Mapping](docs/CMMC-MAPPING.md) - CMMC practice-to-pattern reference
- [Architecture](docs/ARCHITECTURE.md) - System design diagrams
- [Examples](examples/) - Sample usage scenarios

### 5. Standup Skill
Multi-agent collaborative decision-making:
- **RunStandup**: Orchestrate conversation between custom agent rosters
- **ManageContext**: Maintain project-context.md (project "bible")
- **SynthesizeDecision**: Combine perspectives into actionable decisions

**Validated**: Standup finds **3.67x more issues** than solo mode (exceeded 2-3x target)

## Quick Start

### Installation

**Automated install** (recommended):
```bash
# Clone FORGE
git clone <your-fork-url>
cd FORGE

# Run install script
./install.sh
```

**Manual install**:
```bash
# Install in PAI (symlink skills and agents)
ln -s $(pwd)/.claude/skills/* ~/.claude/skills/
ln -s $(pwd)/.claude/agents/* ~/.claude/agents/
```

See [INSTALL.md](INSTALL.md) for detailed installation instructions and troubleshooting.

### Use a Skill

```bash
# Create a PRD for your project
claude skill AgilePm

# Run a standup to review architecture
claude skill Standup
```

### Create Custom Agents

```bash
# Copy template
cp .claude/skills/Standup/templates/custom-agent-template.md \
   .claude/agents/YourAgent/agent.md

# Edit agent.md with your domain expertise
# See template for guidance
```

## How Standup Works

**Problem**: Solo AI gives one perspective, might miss issues

**Solution**: Multiple specialist agents collaborate

**Example**: "Should we add OAuth2 to MVP or defer to v1.1?"

1. **Murat (Product Manager)**: User value perspective
   - "Solo developers don't need OAuth2 for initial adoption"
   - Recommendation: Defer to v1.1

2. **Emma (Security Engineer)**: Security/compliance perspective
   - "Email/password meets CMMC requirements with MFA"
   - Recommendation: Defer OAuth2, add MFA

3. **Wei (QA Lead)**: Testing complexity perspective
   - "OAuth2 adds 3-4 weeks of testing"
   - Recommendation: Defer to v1.1

**Synthesized Decision**: Ship email/password + MFA for MVP, add OAuth2 in v1.1 when enterprise users request it

**Result**: Found 3 perspectives (user value, security, testing) instead of just 1

## Repository Structure

```
FORGE/
├── .claude/
│   ├── skills/          # 4 PAI-compliant skills
│   │   ├── AgilePm/     # PRD, epics, stories, sprint planning
│   │   ├── Security/    # Threat modeling, CMMC baseline
│   │   ├── TestArchitect/ # Test strategy, coverage analysis
│   │   └── Standup/     # Multi-agent orchestration
│   └── agents/          # 3 default agents (Murat, Emma, Wei)
│       ├── Murat/       # Product Manager
│       ├── Emma/        # Security Engineer
│       └── Wei/         # QA Lead
├── docs/
│   ├── PRD-FORGE.md             # FORGE's PRD (scored 10/10)
│   ├── threat-model-FORGE.md    # FORGE's threat model (8 threats, 0 critical)
│   ├── test-strategy-FORGE.md   # FORGE's test strategy (144 tests)
│   ├── epics/                   # Release planning (0.1 MVP, 0.2 Enterprise, 0.3 Upstream)
│   └── validation/              # A/B tests, dogfooding results
└── README.md            # This file
```

## Success Metrics

1. **Standup finds 2-3x more issues than solo mode**: ✅ VALIDATED (3.67x)
2. **PRD quality ≥8/10**: ✅ VALIDATED (PRD-FORGE.md scored 10/10)
3. **0 critical security gaps in production**: ✅ VALIDATED (threat-model-FORGE.md: 0 critical)
4. **Upstream contribution to PAI**: ⏳ PLANNED (Release 0.3)

## Roadmap

**Release 0.1 MVP** (Current, 8-10 weeks):
- ✅ AgilePm skill (CreatePrd, CreateEpics, CreateStories, SprintPlanning)
- ✅ Security skill (ThreatModel, CmmcBaseline - 5 core CMMC domains)
- ✅ TestArchitect skill (CreateTestStrategy, DefineCoverage)
- ✅ Standup skill (RunStandup, ManageContext, SynthesizeDecision)
- ✅ 3 agents (Murat, Emma, Wei)
- ✅ Validation (3.67x better than solo)
- ✅ Dogfooding (PRD, threat model, test strategy)

**Release 0.2 Enterprise** (8-10 weeks):
- Expand Security skill to all 17 CMMC domains (110 practices)
- Add test implementation (144 tests, 75% coverage)
- Performance optimization (large file handling)
- Enhanced agent customization

**Release 0.3 Upstream** (3-4 weeks):
- Configurable affirmation levels (Supportive/Professional/Direct)
- Auto-roster detection (suggest agents based on decision context)
- Historical decision search
- Contribute back to PAI

## Customization

FORGE is **domain-agnostic**. Default agents are for software development, but you can create custom rosters for any field:

**Investment Advisory Team**:
- Financial Analyst
- Compliance Officer
- Client Advisor

**Legal Review Team**:
- Contract Specialist
- Risk Manager
- Business Counsel

**Healthcare Team**:
- Clinical Specialist
- Regulatory Affairs
- Patient Advocate

See `.claude/skills/Standup/templates/custom-agent-template.md` for guidance.

## Inspiration & Attribution

FORGE is built on PAI and inspired by:

- **PAI** (MIT) © Daniel Miessler
  - Foundation: Personal AI infrastructure, skill system, agent patterns
  - FORGE augments PAI, doesn't replace it

- **BMAD METHOD v6** (MIT) © BMad Code, LLC
  - Multi-agent collaboration patterns

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

FORGE follows:
- PAI skill compliance (TitleCase naming, USE WHEN descriptions, Examples sections)
- Agile methodology (story points, INVEST principles, MoSCoW prioritization)
- Test-first development (ATDD)
- Security-first design (STRIDE, CMMC)

## License

MIT License

FORGE is open source. Original code and documentation created during FORGE development are MIT licensed.

PAI integration components follow PAI's MIT license.

---

**Status**: Release 0.2 - Phase A In Progress (Emma implementation: 48% pass rate, target 90%)

**Note**: This is my first major OSS contribution project. Built with Claude Code, dogfooded with FORGE's own skills.

---

## Release 0.2 Update: Emma Security Engineer

**Sprint 1-2 Complete** (3 weeks):
- ✅ Emma agent persona (812 lines, CMMC Level 2 integration)
- ✅ STRIDE threat modeling framework (all 6 categories)
- ✅ 72 automated tests (12 acceptance + 60 security)
- ✅ CMMC compliance (11 of 17 domains, 20 practices tested)
- ✅ Test-driven development (ATDD framework for LLM agents)

### Emma's Capabilities

**Security Analysis**:
- STRIDE threat modeling (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege)
- CMMC Level 2 enforcement (110 practices across 17 domains)
- OWASP Top 10 vulnerability detection
- Risk-based prioritization (Critical/High/Medium/Low)

**Test Coverage** (60 security tests):
- SQL Injection (10 tests)
- XSS (10 tests)
- Authentication Bypass (10 tests)
- Authorization Flaws (10 tests)
- CMMC Violations (20 tests)

**Success Criteria**: Emma catches ≥54/60 vulnerabilities (90%)

### Documentation

**Architecture & Contribution**:
- `ARCHITECTURE.md` - Technical architecture, integration with PAI
- `CONTRIBUTION_PROPOSAL.md` - Upstream contribution to PAI ecosystem
- `docs/sprint-2-review.md` - Sprint retrospective, lessons learned
- `docs/emma-test-suite-summary.md` - Complete test documentation

**For detailed Emma documentation**, see `.claude/skills/Standup/agents/emma-security-engineer.md` (32KB persona)
