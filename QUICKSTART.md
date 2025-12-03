# FORGE Quickstart Guide

Get started with FORGE in 10 minutes. This guide walks you through installation, personalization, and your first multi-agent standup.

---

## Prerequisites

- **PAI installed**: FORGE extends [Personal AI Infrastructure (PAI)](https://github.com/danielmiessler/pai)
- **Claude Code CLI**: Running and configured
- **macOS or Linux**: Tested on macOS, should work on Linux

---

## Installation (5 minutes)

### 1. Clone FORGE

```bash
cd ~/src  # or your preferred location
git clone https://github.com/yourusername/FORGE.git
cd FORGE
```

### 2. Run Installation

```bash
./install.sh
```

**Installation will prompt you for**:
- ✅ Your name
- ✅ Assistant name (default: FORGE)

**Example**:
```
? What's your name? Sarah
? What would you like to name your assistant? Atlas
```

### 3. Verify Installation

```bash
ls ~/.claude/skills
# Should see: AgilePm, Daniel, Security, Standup, TestArchitect

ls ~/.claude/agents
# Should see: Amy, Clay, Daniel, Hefley, Mary
```

**Your profile**: `~/.pai/profile.json`

```json
{
  "user": { "name": "Sarah" },
  "assistant": { "name": "Atlas" }
}
```

---

## Your First Standup (3 minutes)

Let's review a feature using multi-agent collaboration.

### Example: Review Authentication Feature

```bash
claude
```

Then in Claude Code:

```
Use the Standup skill to review this authentication design:

Feature: User login with email/password
- POST /api/auth/login endpoint
- JWT token generation
- Session storage in Redis
- Password hashing with bcrypt
```

**What happens**:
1. **Smart roster selection**: Standup auto-suggests Daniel (Security), Clay (Tech Lead), Amy (QA)
2. **Multi-perspective review**:
   - Daniel: "Add MFA for privileged accounts, ensure JWT secret is not hardcoded"
   - Clay: "Estimate 6 hours for implementation, Redis adds complexity"
   - Amy: "Need 25 tests: 15 unit, 8 integration, 2 E2E"
3. **Synthesis**: Team consensus with actionable recommendations

**Expected output**: Multi-agent analysis with security, timeline, and testing perspectives all considered.

---

## Security Scan with Daniel (2 minutes)

Daniel scans code for 50+ vulnerability patterns (SQL injection, XSS, hardcoded secrets, etc.).

### Example: Scan Authentication Code

```
Use the Daniel skill to scan this login code:

const login = async (req, res) => {
  const { email, password } = req.body
  const query = "SELECT * FROM users WHERE email = '" + email + "'"
  const user = await db.query(query)
  // ...
}
```

**What happens**:
1. Daniel detects SQL injection vulnerability
2. Severity: **Critical**
3. CMMC mapping: `SI.L2-3.14.6` (Input Validation)
4. Mitigation: "Use parameterized queries"
5. Secure code example provided

**Output**: Security analysis with CMMC compliance mapping and remediation guidance.

---

## Common Workflows

### 1. Create PRD for New Feature

```
Use the AgilePm skill to create a PRD for user authentication system
```

**Output**: Comprehensive PRD with:
- Executive summary
- System architecture (Mermaid diagram)
- Feature breakdown (MoSCoW prioritized)
- Implementation checklist (story points)

### 2. STRIDE Threat Modeling

```
Use the Daniel skill to perform STRIDE analysis on payment processing API
```

**Output**: Threats across all 6 STRIDE categories:
- Spoofing, Tampering, Repudiation
- Information Disclosure, Denial of Service, Elevation of Privilege
- Priority rankings (Critical/High/Medium/Low)
- CMMC practice references

### 3. Custom Roster Standup

```
Use the Standup skill with roster: Daniel, Clay

Review this database migration script for security issues.
```

**Output**: Focused analysis from Security Engineer + Tech Lead only.

### 4. Test Strategy Creation

```
Use the TestArchitect skill to create test strategy for user authentication
```

**Output**: Test coverage plan:
- Unit tests: 90% coverage for auth
- Integration tests: API endpoint testing
- E2E tests: Full login flow
- Security tests: OWASP scenarios

---

## Personalization

### Change Your Name

Edit `~/.pai/profile.json`:

```json
{
  "user": {
    "name": "Your New Name",
    "preferred_name": "Preferred Name"
  },
  "assistant": {
    "name": "Assistant Name"
  }
}
```

### Customize Agent Roster

Default agents:
- **Daniel**: Security Engineer
- **Mary**: Business Analyst
- **Clay**: Tech Lead
- **Hefley**: Product Manager
- **Amy**: QA Lead

**Override in standup**:
```
Use Standup with roster: Daniel, Amy
```

### Create Custom Agents

Use the template: `templates/custom-agent-template.md`

Example custom agents:
- Financial Analyst
- Compliance Officer
- UX Designer
- DevOps Engineer

Place in: `.claude/agents/YourAgent/agent.md`

---

## Advanced Usage

### Multi-Agent Code Review

```
Run standup with Daniel, Clay to review this PR:

[paste code or PR link]
```

### CMMC Compliance Audit

```
Use Daniel skill to generate CMMC audit trail for security review
```

**Output**: Assessor-ready audit document with:
- All vulnerabilities mapped to CMMC practices
- Evidence of security controls
- Remediation timeline

### Sprint Planning

```
Use AgilePm skill to organize these stories into sprints:

[list of user stories]
```

**Output**: `sprint-status.yaml` with sprint assignments, velocity tracking, burndown.

---

## Tips & Tricks

### 1. Smart Roster Selection

Standup automatically suggests the right experts:

| Feature Type | Auto-Suggested Roster |
|--------------|----------------------|
| Authentication | Daniel, Mary, Clay, Hefley, Amy (full team) |
| Security | Daniel, Clay, Amy |
| UX | Mary, Daniel, Clay, Amy |
| Database | Daniel, Clay, Amy |

### 2. Question Context Override

Questions override feature patterns:
- "How long?" → Clay, Hefley, Amy (planning team)
- "How many tests?" → Amy, Daniel, Clay (testing team)
- "Should we build this?" → Hefley, Mary, Clay (prioritization team)

### 3. Manual Override

Force specific roster:
```
Use Standup with roster: Daniel, Clay, Amy
```

### 4. Profile-Based Responses

Agents personalize responses using your profile:
- "For Sarah's workflow..." (uses your name from profile)
- "Atlas recommends..." (uses your assistant name)

---

## Troubleshooting

### Skills Not Loading

```bash
ls ~/.claude/skills/
# Check if FORGE skills are present
```

**Fix**: Re-run `./install.sh`

### Agents Not Found

```bash
ls ~/.claude/agents/
# Check if agents are symlinked/copied
```

**Fix**: Check symlinks with `ls -la ~/.claude/agents/`

### Profile Not Working

```bash
cat ~/.pai/profile.json
# Verify JSON is valid
```

**Fix**: Edit and fix JSON syntax errors

### Permission Denied

```bash
chmod +x install.sh
./install.sh
```

---

## Next Steps

1. **Read the PRD**: `docs/PRD-FORGE.md` - Full feature documentation
2. **Explore Examples**: `examples/` - Sample workflows
3. **Check Architecture**: `ARCHITECTURE.md` - System design
4. **Contribute**: `CONTRIBUTING.md` - Development guide

---

## Getting Help

- **GitHub Issues**: [Report bugs or request features](https://github.com/yourusername/FORGE/issues)
- **Documentation**: Check `docs/` for detailed guides
- **PAI Community**: [Join PAI discussions](https://github.com/danielmiessler/pai)

---

## What's Next?

Now that you're set up, try:

1. ✅ **Run your first standup** - Review a real feature with your team
2. ✅ **Scan your codebase** - Use Daniel to find security issues
3. ✅ **Create a PRD** - Use AgilePm for your next project
4. ✅ **Customize agents** - Add domain-specific experts to your team

**Welcome to FORGE! Your personalized AI development laboratory is ready.**

---

*FORGE is built on [Personal AI Infrastructure (PAI)](https://github.com/danielmiessler/pai) by Daniel Miessler*
