# Project Context: Task Manager SaaS

**Project Name**: TaskFlow
**Team**: Solo developer
**Timeline**: 8 weeks to MVP
**Status**: Sprint 3 of 8 (Week 4)

---

## Project Overview

**Vision**: Simple, agile-focused task management for solo developers and small teams

**Target Users**:
- **Primary**: Solo developers (freelancers, indie hackers)
- **Secondary**: Small teams (2-5 people)

**Pain Point**: Existing task managers are either too simple (todo lists) or too complex (enterprise project management). Solo developers need agile features (sprints, story points, burndown) without enterprise overhead.

**Solution**: Lightweight task manager with built-in agile features (sprints, velocity tracking, MoSCoW prioritization)

**Success Metrics**:
1. 50 users in first month
2. 70% weekly active users (retention)
3. <2 second page load (performance)
4. 0 critical security vulnerabilities

---

## Architecture

```
┌─────────────┐
│   Frontend  │  Next.js 14, React 18, TailwindCSS
└──────┬──────┘
       │
       │ HTTPS (TLS 1.3)
       │
┌──────▼──────┐
│   Backend   │  Node.js, Express, PostgreSQL
│   API       │
└──────┬──────┘
       │
       │
┌──────▼──────┐
│  Database   │  PostgreSQL 15
└─────────────┘
```

**Tech Stack**:
- Frontend: Next.js 14, React 18, TypeScript, TailwindCSS
- Backend: Node.js 20, Express 4.18, TypeScript
- Database: PostgreSQL 15
- Auth: Passport.js (email/password + MFA)
- Hosting: Vercel (frontend), Railway (backend + DB)

---

## Decisions Made

### Decision 1: Defer OAuth2 to v1.1, ship email/password + MFA for MVP
**Date**: 2025-12-02
**Participants**: Mary (Business Analyst), Clay (Scrum Master), Hefley (Test Architect), Daniel (Security Engineer)

**Context**: Deciding authentication approach for MVP

**Decision**: Use email/password with MFA (TOTP) for MVP. Defer OAuth2 (Google, GitHub) to v1.1.

**Rationale**:
- **User Value (Mary)**: Solo developers (primary persona) don't need OAuth2 for initial adoption. MoSCoW: Should Have (not Must Have)
- **Timeline (Clay)**: OAuth2 adds 21 story points (3 weeks delay) due to dependencies (HTTPS setup, Redis session management)
- **Testing (Hefley)**: OAuth2 testing is complex and flaky (external API mocking, 26 tests vs 10 tests, 5 days vs 2 days)
- **Security (Daniel)**: Email/password + MFA meets CMMC Level 2 requirements. OAuth2 adds attack surface (3 endpoints vs 1) without critical security benefit

**Implementation**:
- ✅ Bcrypt password hashing, 12 rounds minimum (IA.L2-3.5.10)
- ✅ Password policy: 12+ characters, complexity requirements (IA.L2-3.5.7)
- ✅ Rate limiting: 5 login attempts per minute per IP (AC.L2-3.1.7)
- ✅ MFA using TOTP (Google Authenticator, Authy) (IA.L2-3.5.1)
- ✅ HTTPS enforcement with redirect (SC.L2-3.13.8)
- ✅ Authentication audit logging (AU.L2-3.3.1)

**Trade-offs**:
- ✅ Gain: Ship MVP on time (Week 8), simpler security, faster testing, no external dependencies
- ⚠️ Lose: No one-click OAuth signup (acceptable for tech-savvy primary persona)

**Status**: Approved, implemented in Sprint 3-4

---

### Decision 2: Use PostgreSQL over MongoDB
**Date**: 2025-11-25
**Participants**: Clay (Scrum Master), Hefley (Test Architect), Daniel (Security Engineer)

**Context**: Choosing database for task management (relational vs document store)

**Decision**: Use PostgreSQL 15 (relational database)

**Rationale**:
- **Data Model (Clay)**: Task relationships are relational (tasks → sprints → projects → users). PostgreSQL foreign keys enforce data integrity.
- **Testing (Hefley)**: PostgreSQL transactions enable reliable integration tests. Rollback on failure.
- **Security (Daniel)**: PostgreSQL has robust access control, parameterized queries prevent SQL injection (SI.L2-3.14.6)

**Alternatives Considered**:
- MongoDB: Good for flexible schemas, but task data is structured (sprints, users, tasks have fixed fields)

**Implementation**:
- PostgreSQL 15 hosted on Railway
- Schema: Users, Projects, Sprints, Tasks, Comments
- Migrations: node-pg-migrate
- ORM: Kysely (type-safe query builder)

**Trade-offs**:
- ✅ Gain: Strong data integrity, ACID transactions, mature ecosystem
- ⚠️ Lose: Flexibility for schema changes (acceptable - task data is well-defined)

**Status**: Approved, PostgreSQL set up in Sprint 1

---

### Decision 3: Defer real-time collaboration to v1.1
**Date**: 2025-11-28
**Participants**: Mary (Business Analyst), Clay (Scrum Master), Hefley (Test Architect), Daniel (Security Engineer)

**Context**: Should MVP include real-time collaboration (multiple users editing same task simultaneously)?

**Decision**: Defer real-time collaboration to v1.1. Focus MVP on solo developer experience.

**Rationale**:
- **User Value (Mary)**: Primary persona is solo developers (not teams). Real-time collaboration is valuable for v1.1 (team features) but not Must Have for MVP.
- **Timeline (Clay)**: Real-time collaboration requires WebSockets, Redis pub/sub, conflict resolution → 13 story points (2 weeks)
- **Testing (Hefley)**: Real-time features are hard to test: race conditions, connection drops, conflict resolution edge cases → 3 weeks testing
- **Security (Daniel)**: WebSockets add attack surface: connection hijacking, authorization per message, DoS via connection flood → 5 additional CMMC practices

**Implementation (MVP)**:
- Simple CRUD API (REST)
- Optimistic locking (version field on tasks)
- Refresh on conflict (user sees "Task updated, please refresh")

**Implementation (v1.1)**:
- WebSockets (Socket.io)
- Redis pub/sub for multi-server synchronization
- Operational Transform (OT) for conflict resolution

**Trade-offs**:
- ✅ Gain: Ship MVP 2 weeks faster, simpler security, easier testing
- ⚠️ Lose: Can't market to teams initially (acceptable - v1.1 target)

**Status**: Approved, real-time deferred to v1.1 backlog

---

## Security Reviews

### Security Review 1: Authentication API (STRIDE)
**Date**: 2025-12-02
**Reviewer**: Daniel (Security Engineer)
**Scope**: `/api/auth/*` endpoints (login, signup, logout, MFA)

**STRIDE Analysis**:

| Threat Category | Threat | Severity | Mitigation | CMMC Practice |
|-----------------|--------|----------|------------|---------------|
| **Spoofing** | Weak passwords | High | Password policy (12+ chars, complexity) | IA.L2-3.5.7 |
| **Tampering** | SQL injection | Critical | Parameterized queries (Kysely), input validation | SI.L2-3.14.6 |
| **Repudiation** | No login audit trail | Medium | Log all auth events (success, failure, IP) | AU.L2-3.3.1 |
| **Info Disclosure** | Passwords in logs | Critical | Never log passwords, use bcrypt | IA.L2-3.5.10 |
| **Denial of Service** | Brute force login | High | Rate limiting (5 attempts/min per IP) | AC.L2-3.1.7 |
| **Elevation of Privilege** | Session hijacking | High | HttpOnly cookies, Secure flag, SameSite=Strict | SC.L2-3.13.8 |

**Risk Score**: 6 threats identified
- **Critical**: 2 (SQL injection, passwords in logs)
- **High**: 3 (weak passwords, brute force, session hijacking)
- **Medium**: 1 (audit trail)

**Mitigations Applied**:
- ✅ Kysely query builder (parameterized queries)
- ✅ Bcrypt password hashing (12 rounds)
- ✅ Password policy enforcement (zod validation)
- ✅ Rate limiting middleware (express-rate-limit)
- ✅ HttpOnly + Secure + SameSite cookies
- ✅ Winston logging (never log passwords)

**Status**: All Critical and High threats mitigated. Ready for deployment.

---

### Security Review 2: CMMC Baseline
**Date**: 2025-12-02
**Reviewer**: Daniel (Security Engineer)
**Scope**: MVP features (authentication, task management)

**CMMC Level 2 Compliance** (71 practices assessed):

**Compliant Practices** (6/6 critical):
- ✅ **AC.L2-3.1.1**: Authorized access only (authentication required for all task endpoints)
- ✅ **AC.L2-3.1.7**: Rate limiting on authentication (5 attempts/min per IP)
- ✅ **IA.L2-3.5.7**: Password complexity (12+ chars, uppercase, lowercase, number, special)
- ✅ **IA.L2-3.5.10**: Protected passwords (bcrypt hashing, never logged)
- ✅ **SC.L2-3.13.8**: HTTPS enforcement (TLS 1.3, HSTS headers)
- ✅ **SI.L2-3.14.6**: Input validation (zod schemas on all API endpoints)

**Pending Practices** (deferred to v1.1):
- ⏳ **IA.L2-3.5.1**: MFA (TOTP implementation in Sprint 4)
- ⏳ **AU.L2-3.3.1**: Comprehensive audit logging (authentication complete, need task CRUD logging)

**Non-Applicable Practices** (infrastructure-level, not code-level):
- **PE.L2-3.10.x**: Physical protection (Railway hosting responsibility)
- **MA.L2-3.7.x**: Maintenance (dependency updates, patching)

**Compliance Status**: 6/6 critical practices compliant. 2 pending (MFA, audit logging) in Sprint 4.

**Status**: Baseline met for MVP launch. Full CMMC Level 2 compliance by v1.1.

---

## Architecture Decisions

### ADR-001: Microservices vs Monolith
**Date**: 2025-11-20
**Status**: Approved

**Context**: Choosing architecture pattern for MVP

**Decision**: Start with monolith (single Express API), refactor to microservices in v2.0 if needed

**Rationale**:
- **Simplicity**: Solo developer, 8-week timeline → monolith ships faster
- **YAGNI**: Don't need microservices until scale demands it (v2.0 target: 10K+ users)
- **Testing**: Monolith easier to test (integration tests run locally, no service mesh)

**Consequences**:
- ✅ Faster development (1 codebase, 1 deployment)
- ⚠️ Harder to scale independently (acceptable for MVP <1K users)

---

### ADR-002: REST vs GraphQL
**Date**: 2025-11-22
**Status**: Approved

**Context**: Choosing API paradigm

**Decision**: Use REST for MVP

**Rationale**:
- **Simplicity**: REST is simpler to implement and test (standard HTTP verbs)
- **Caching**: REST plays well with HTTP caching (GET requests cacheable)
- **Tooling**: REST has mature tooling (Postman, curl, OpenAPI)

**Alternatives Considered**:
- GraphQL: Good for flexible queries, but adds complexity (schema, resolvers, N+1 queries)

**Consequences**:
- ✅ Faster development, easier to debug
- ⚠️ Over-fetching (fetch entire task object even if only need title) - acceptable for MVP

---

## Sprint Status

### Sprint 3 (Current)
**Goal**: Implement authentication (email/password + MFA)
**Duration**: Week 4-5
**Story Points**: 10 points

**Stories**:
- ✅ [5 pts] US-001: User signup with email/password
- ✅ [3 pts] US-002: User login with rate limiting
- ⏳ [2 pts] US-003: Add MFA (TOTP) to login flow

**Burndown**:
- Planned: 10 points
- Completed: 8 points
- Remaining: 2 points
- **Status**: On track (Day 3 of 10)

---

### Sprint 4 (Next)
**Goal**: Task CRUD + Sprint management
**Duration**: Week 6-7
**Story Points**: 13 points

**Stories**:
- [ ] [5 pts] US-004: Create/edit/delete tasks
- [ ] [3 pts] US-005: Assign tasks to sprints
- [ ] [3 pts] US-006: Sprint burndown chart
- [ ] [2 pts] US-007: Task filtering (by sprint, status, assignee)

---

## Quality Gates

### Gate 1: Authentication Security (Week 5)
**Status**: ✅ PASSED

**Criteria**:
- ✅ All Critical STRIDE threats mitigated
- ✅ CMMC practices compliant (AC.L2-3.1.1, IA.L2-3.5.7, IA.L2-3.5.10, SC.L2-3.13.8)
- ✅ Rate limiting functional (tested with 10 rapid login attempts)
- ✅ Passwords never logged (audit log review passed)

---

### Gate 2: MVP Feature Complete (Week 8)
**Status**: ⏳ PENDING

**Criteria**:
- [ ] All Must Have features complete (authentication, task CRUD, sprints)
- [ ] 0 Critical vulnerabilities (STRIDE analysis)
- [ ] Performance <2 second page load (Lighthouse score ≥90)
- [ ] CMMC baseline met (6 critical practices)

---

## Constraints

### Timeline Constraints
- **MVP Deadline**: Week 8 (December 15, 2025)
- **No Extensions**: Solo project, personal deadline

### Resource Constraints
- **Team**: Solo developer (10 story points/week capacity)
- **Budget**: $50/month (Vercel free tier + Railway hobby tier)

### Technical Constraints
- **Browser Support**: Chrome, Firefox, Safari (latest 2 versions)
- **Mobile**: Responsive design (not native apps)

---

## Risks and Mitigations

### Risk 1: OAuth Provider Downtime (Deferred to v1.1)
**Probability**: Medium
**Impact**: High (users can't login)
**Mitigation**: Use email/password for MVP (no external dependencies)

### Risk 2: Database Scale (>10K users)
**Probability**: Low (MVP target: 50 users)
**Impact**: High (slow queries)
**Mitigation**: PostgreSQL indexes, connection pooling, monitor query performance

### Risk 3: Security Vulnerability Discovery
**Probability**: Medium
**Impact**: Critical
**Mitigation**: STRIDE threat modeling, CMMC compliance, security review before each release

---

## Lessons Learned

### Lesson 1: Multi-Agent Standups Catch Hidden Complexity
**Context**: Dogfooded standup for OAuth2 decision
**Finding**: Solo decision would have missed 5 story points of dependencies (HTTPS, Redis)
**Impact**: Prevented 3-week delay by catching hidden work early
**Action**: Continue using standup for all high-stakes decisions

### Lesson 2: Defer Non-Critical Features Early
**Context**: Deferred OAuth2 and real-time collaboration to v1.1
**Finding**: Focus on core value (task management) prevents scope creep
**Impact**: Freed 34 story points (5 weeks) for core features
**Action**: Ruthless MoSCoW prioritization (Mary's expertise)

### Lesson 3: Security by Design Prevents Rework
**Context**: STRIDE analysis early (Sprint 2) caught issues before implementation
**Finding**: Fixing security issues post-implementation takes 3x longer
**Impact**: Saved 2 weeks by catching CMMC gaps early
**Action**: STRIDE + CMMC review for all features before coding

---

**Last Updated**: 2025-12-02
**Sprint**: 3 of 8
**Next Standup**: Week 5 (Sprint 4 planning)
