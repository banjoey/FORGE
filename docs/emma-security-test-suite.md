# Emma Security Test Suite: 60 Known Vulnerabilities

**Purpose**: Validate Emma's 90% security issue detection rate
**Format**: 60 known vulnerabilities across 5 categories (Release 0.2 scope)
**Success Criteria**: Emma catches ≥54 of 60 issues (90%)

**Note**: Originally planned 100 tests, but reduced to 60 after standup review (Murat's recommendation: 60 CMMC tests in 1.5 days is unrealistic). Remaining 40 CMMC tests deferred to post-release.

---

## Test Suite Structure

**Categories** (Release 0.2):
1. SQL Injection (10 variants) - OWASP A03
2. Cross-Site Scripting / XSS (10 variants) - OWASP A03
3. Authentication Bypass (10 variants) - OWASP A07
4. Authorization Flaws (10 variants) - OWASP A01
5. CMMC Violations (20 practices - Critical domains only)

**Total**: 60 test cases (Release 0.2)

**Deferred to Post-Release** (40 tests):
- 40 additional CMMC practices (Medium/Low priority domains: AT, CA, CP, IR, MA, MP, PE, PS, RA, RE, SA, SI)

---

## Category 1: SQL Injection (10 variants) - OWASP A03

### Test 1.1: String Concatenation SQL Injection

**Vulnerable Code**:
```javascript
const query = "SELECT * FROM users WHERE email = '" + userEmail + "'"
const result = await db.execute(query)
```

**Attack Vector**: `userEmail = "' OR '1'='1"`
**Emma Should Detect**: SQL injection (Tampering)
**Emma Should Recommend**: Parameterized queries
**CMMC Practice**: IA.L2-3.5.10 (protect authentication)

---

### Test 1.2: Template Literal SQL Injection

**Vulnerable Code**:
```javascript
const query = `SELECT * FROM users WHERE id = ${userId}`
const result = await db.query(query)
```

**Attack Vector**: `userId = "1; DROP TABLE users;--"`
**Emma Should Detect**: SQL injection via template literal
**Emma Should Recommend**: Prepared statements

---

### Test 1.3: Second-Order SQL Injection

**Vulnerable Code**:
```javascript
// Store user input
await db.execute("INSERT INTO users (name) VALUES (?)", [userName])

// Later, retrieve and use without sanitization
const user = await db.query("SELECT name FROM users WHERE id = 1")
const query = "SELECT * FROM posts WHERE author = '" + user.name + "'"
```

**Attack Vector**: `userName = "admin'; DROP TABLE posts;--"`
**Emma Should Detect**: Second-order SQL injection
**Emma Should Recommend**: Sanitize all data (even from database)

---

### Test 1.4: ORDER BY SQL Injection

**Vulnerable Code**:
```javascript
const query = `SELECT * FROM users ORDER BY ${sortColumn}`
const result = await db.query(query)
```

**Attack Vector**: `sortColumn = "name; DELETE FROM users;--"`
**Emma Should Detect**: SQL injection in ORDER BY
**Emma Should Recommend**: Whitelist allowed columns

---

### Test 1.5: LIMIT/OFFSET SQL Injection

**Vulnerable Code**:
```javascript
const query = `SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`
```

**Attack Vector**: `limit = "10; DROP TABLE users;--"`
**Emma Should Detect**: SQL injection in LIMIT clause
**Emma Should Recommend**: Validate integers, use parameterized queries

---

### Test 1.6: Stored Procedure SQL Injection

**Vulnerable Code**:
```javascript
const query = `CALL getUserByEmail('${email}')`
```

**Attack Vector**: `email = "'); DROP TABLE users;--"`
**Emma Should Detect**: SQL injection in stored procedure
**Emma Should Recommend**: Parameterize stored procedure calls

---

### Test 1.7: UNION-Based SQL Injection

**Vulnerable Code**:
```javascript
const query = `SELECT id, name FROM users WHERE id = ${id}`
```

**Attack Vector**: `id = "1 UNION SELECT password, email FROM admin_users"`
**Emma Should Detect**: UNION-based SQL injection
**Emma Should Recommend**: Validate input type (integer)

---

### Test 1.8: Blind SQL Injection

**Vulnerable Code**:
```javascript
const query = `SELECT * FROM users WHERE id = ${id}`
const exists = (await db.query(query)).length > 0
return exists ? "User found" : "User not found"
```

**Attack Vector**: `id = "1 AND 1=1"` (always true) vs `id = "1 AND 1=2"` (always false)
**Emma Should Detect**: Blind SQL injection vulnerability
**Emma Should Recommend**: Parameterized queries, avoid exposing existence

---

### Test 1.9: Time-Based SQL Injection

**Vulnerable Code**:
```javascript
const query = `SELECT * FROM users WHERE username = '${username}'`
```

**Attack Vector**: `username = "admin' AND SLEEP(5)--"`
**Emma Should Detect**: Time-based blind SQL injection
**Emma Should Recommend**: Parameterized queries, query timeout limits

---

### Test 1.10: NoSQL Injection (MongoDB)

**Vulnerable Code**:
```javascript
const user = await db.collection('users').findOne({
  username: req.body.username,
  password: req.body.password
})
```

**Attack Vector**: `{"username": "admin", "password": {"$gt": ""}}`
**Emma Should Detect**: NoSQL injection
**Emma Should Recommend**: Sanitize objects, use strict schemas

---

## Category 2: Cross-Site Scripting / XSS (10 variants) - OWASP A03

### Test 2.1: Reflected XSS

**Vulnerable Code**:
```javascript
app.get('/search', (req, res) => {
  res.send(`<h1>Results for: ${req.query.q}</h1>`)
})
```

**Attack Vector**: `/search?q=<script>alert(document.cookie)</script>`
**Emma Should Detect**: Reflected XSS
**Emma Should Recommend**: HTML escaping, Content Security Policy
**CMMC Practice**: SC.L2-3.13.8 (protect boundary)

---

### Test 2.2: Stored XSS

**Vulnerable Code**:
```javascript
// Store comment
await db.execute("INSERT INTO comments (text) VALUES (?)", [comment])

// Display comment
const comments = await db.query("SELECT text FROM comments")
res.send(comments.map(c => `<p>${c.text}</p>`).join(''))
```

**Attack Vector**: `comment = "<script>fetch('/api/steal?cookie='+document.cookie)</script>"`
**Emma Should Detect**: Stored XSS
**Emma Should Recommend**: Sanitize on output, use templating engine

---

### Test 2.3: DOM-Based XSS

**Vulnerable Code**:
```javascript
// Client-side
const name = new URLSearchParams(window.location.search).get('name')
document.getElementById('greeting').innerHTML = `Hello ${name}`
```

**Attack Vector**: `/?name=<img src=x onerror=alert(1)>`
**Emma Should Detect**: DOM-based XSS
**Emma Should Recommend**: Use textContent, DOMPurify library

---

### Test 2.4: XSS via JavaScript Event Handlers

**Vulnerable Code**:
```javascript
res.send(`<img src="${imageUrl}">`)
```

**Attack Vector**: `imageUrl = "x onerror=alert(1)"`
**Emma Should Detect**: XSS via event handlers
**Emma Should Recommend**: Validate URLs, use img srcset whitelist

---

### Test 2.5: XSS via CSS

**Vulnerable Code**:
```javascript
res.send(`<div style="${userStyle}">Content</div>`)
```

**Attack Vector**: `userStyle = "background: url('javascript:alert(1)')"`
**Emma Should Detect**: XSS via CSS injection
**Emma Should Recommend**: Sanitize CSS, use CSS-in-JS library

---

### Test 2.6: XSS via SVG

**Vulnerable Code**:
```javascript
res.send(`<svg>${userSVG}</svg>`)
```

**Attack Vector**: `userSVG = "<script>alert(1)</script>"`
**Emma Should Detect**: XSS via SVG injection
**Emma Should Recommend**: Sanitize SVG, use SVG sanitizer library

---

### Test 2.7: XSS via Markdown

**Vulnerable Code**:
```javascript
const html = marked(userMarkdown)  // No sanitization
res.send(html)
```

**Attack Vector**: `userMarkdown = "[Click](javascript:alert(1))"`
**Emma Should Detect**: XSS via Markdown injection
**Emma Should Recommend**: Use DOMPurify after Markdown rendering

---

### Test 2.8: XSS via JSON Response

**Vulnerable Code**:
```javascript
res.send(`<script>var data = ${JSON.stringify(userData)}</script>`)
```

**Attack Vector**: `userData = {name: "</script><script>alert(1)</script>"}`
**Emma Should Detect**: XSS via JSON injection
**Emma Should Recommend**: Use separate script tag, Content-Type: application/json

---

### Test 2.9: XSS via Meta Refresh

**Vulnerable Code**:
```javascript
res.send(`<meta http-equiv="refresh" content="0;url=${redirectUrl}">`)
```

**Attack Vector**: `redirectUrl = "javascript:alert(1)"`
**Emma Should Detect**: XSS via meta refresh
**Emma Should Recommend**: Validate URL scheme (http/https only)

---

### Test 2.10: XSS via JSONP Callback

**Vulnerable Code**:
```javascript
app.get('/jsonp', (req, res) => {
  res.send(`${req.query.callback}(${JSON.stringify(data)})`)
})
```

**Attack Vector**: `/jsonp?callback=alert(1);foo`
**Emma Should Detect**: XSS via JSONP callback
**Emma Should Recommend**: Validate callback name (alphanumeric only), use CORS

---

## Category 3: Authentication Bypass (10 variants) - OWASP A07

### Test 3.1: Hardcoded Credentials

**Vulnerable Code**:
```javascript
const ADMIN_PASSWORD = "admin123"

if (password === ADMIN_PASSWORD) {
  return generateToken(user)
}
```

**Attack Vector**: Decompile code, find hardcoded password
**Emma Should Detect**: Hardcoded credentials
**Emma Should Recommend**: Environment variables, secrets manager
**CMMC Practice**: IA.L2-3.5.7 (strong passwords)

---

### Test 3.2: Weak Password Policy

**Vulnerable Code**:
```javascript
if (password.length >= 4) {
  // Create account
}
```

**Attack Vector**: Brute force with short passwords
**Emma Should Detect**: Weak password policy
**Emma Should Recommend**: 12+ chars, complexity requirements
**CMMC Practice**: IA.L2-3.5.7

---

### Test 3.3: No Rate Limiting on Login

**Vulnerable Code**:
```javascript
app.post('/login', async (req, res) => {
  const user = await db.findUser(req.body.username)
  if (bcrypt.compare(req.body.password, user.password)) {
    // Success
  }
})
```

**Attack Vector**: Brute force 1000 passwords/second
**Emma Should Detect**: No rate limiting
**Emma Should Recommend**: express-rate-limit, account lockout
**CMMC Practice**: AC.L2-3.1.7 (unsuccessful login attempts)

---

### Test 3.4: JWT Secret in Code

**Vulnerable Code**:
```javascript
const token = jwt.sign(payload, "supersecret123")
```

**Attack Vector**: Find secret in code, forge tokens
**Emma Should Detect**: Hardcoded JWT secret
**Emma Should Recommend**: Environment variable, rotate secrets

---

### Test 3.5: Insecure Password Reset

**Vulnerable Code**:
```javascript
app.post('/reset-password', async (req, res) => {
  const user = await db.findUser(req.body.email)
  // Send email with NEW password (not reset link)
  const newPassword = generateRandomPassword()
  await sendEmail(user.email, `Your new password: ${newPassword}`)
})
```

**Attack Vector**: Reset anyone's password, intercept email
**Emma Should Detect**: Insecure password reset
**Emma Should Recommend**: Time-limited reset tokens, HTTPS only

---

### Test 3.6: Session Fixation

**Vulnerable Code**:
```javascript
app.post('/login', (req, res) => {
  // Session ID not regenerated after login
  req.session.userId = user.id
})
```

**Attack Vector**: Set victim's session ID before login
**Emma Should Detect**: Session fixation vulnerability
**Emma Should Recommend**: Regenerate session ID after login

---

### Test 3.7: Missing Authentication Check

**Vulnerable Code**:
```javascript
app.get('/admin/users', async (req, res) => {
  // No authentication check!
  const users = await db.query("SELECT * FROM users")
  res.json(users)
})
```

**Attack Vector**: Access admin endpoints without login
**Emma Should Detect**: Missing authentication
**Emma Should Recommend**: Add auth middleware
**CMMC Practice**: AC.L2-3.1.1 (limit access)

---

### Test 3.8: Insecure "Remember Me"

**Vulnerable Code**:
```javascript
// Store plaintext userId in cookie
res.cookie('remember_me', user.id, { maxAge: 30 * 24 * 60 * 60 * 1000 })
```

**Attack Vector**: Modify cookie to impersonate any user
**Emma Should Detect**: Insecure remember me implementation
**Emma Should Recommend**: Signed cookies, token-based approach

---

### Test 3.9: OAuth State Parameter Missing

**Vulnerable Code**:
```javascript
app.get('/auth/callback', async (req, res) => {
  const { code } = req.query
  // No state parameter validation
  const token = await oauth.getToken(code)
})
```

**Attack Vector**: CSRF attack on OAuth callback
**Emma Should Detect**: Missing OAuth state parameter
**Emma Should Recommend**: Implement state parameter validation

---

### Test 3.10: JWT Algorithm Confusion

**Vulnerable Code**:
```javascript
const decoded = jwt.verify(token, publicKey)  // Accepts any algorithm
```

**Attack Vector**: Change algorithm to HS256, sign with public key
**Emma Should Detect**: JWT algorithm confusion vulnerability
**Emma Should Recommend**: Specify algorithm (RS256), reject 'none'

---

## Category 4: Authorization Flaws (10 variants) - OWASP A01

### Test 4.1: Missing Authorization Check

**Vulnerable Code**:
```javascript
app.delete('/posts/:id', async (req, res) => {
  // No check if user owns the post!
  await db.execute("DELETE FROM posts WHERE id = ?", [req.params.id])
})
```

**Attack Vector**: Delete any user's posts
**Emma Should Detect**: Missing authorization check (IDOR)
**Emma Should Recommend**: Verify ownership before delete
**CMMC Practice**: AC.L2-3.1.2 (least privilege)

---

### Test 4.2: Insecure Direct Object Reference (IDOR)

**Vulnerable Code**:
```javascript
app.get('/orders/:id', async (req, res) => {
  const order = await db.query("SELECT * FROM orders WHERE id = ?", [req.params.id])
  res.json(order)  // No ownership check!
})
```

**Attack Vector**: Iterate through order IDs, view any order
**Emma Should Detect**: IDOR vulnerability
**Emma Should Recommend**: Check if req.user.id === order.userId

---

### Test 4.3: Horizontal Privilege Escalation

**Vulnerable Code**:
```javascript
app.put('/users/:id', async (req, res) => {
  // User can update any user's profile
  await db.execute("UPDATE users SET name = ? WHERE id = ?",
    [req.body.name, req.params.id])
})
```

**Attack Vector**: Update other users' profiles
**Emma Should Detect**: Horizontal privilege escalation
**Emma Should Recommend**: Verify req.params.id === req.user.id

---

### Test 4.4: Vertical Privilege Escalation

**Vulnerable Code**:
```javascript
app.post('/users/:id/promote', async (req, res) => {
  // No admin check!
  await db.execute("UPDATE users SET role = 'admin' WHERE id = ?", [req.params.id])
})
```

**Attack Vector**: Regular user promotes themselves to admin
**Emma Should Detect**: Vertical privilege escalation
**Emma Should Recommend**: Check if req.user.role === 'admin'
**CMMC Practice**: AC.L2-3.1.5 (privilege escalation)

---

### Test 4.5: Path Traversal

**Vulnerable Code**:
```javascript
app.get('/files/:filename', (req, res) => {
  res.sendFile(`/uploads/${req.params.filename}`)
})
```

**Attack Vector**: `/files/../../../etc/passwd`
**Emma Should Detect**: Path traversal vulnerability
**Emma Should Recommend**: Validate filename, use path.basename()

---

### Test 4.6: Mass Assignment Vulnerability

**Vulnerable Code**:
```javascript
app.put('/profile', async (req, res) => {
  // User can set ANY field (including 'role')
  await db.execute("UPDATE users SET ? WHERE id = ?", [req.body, req.user.id])
})
```

**Attack Vector**: `{"role": "admin"}` in request body
**Emma Should Detect**: Mass assignment vulnerability
**Emma Should Recommend**: Whitelist allowed fields

---

### Test 4.7: Function-Level Access Control Missing

**Vulnerable Code**:
```javascript
// Admin function, but no admin check
function deleteAllUsers() {
  return db.execute("DELETE FROM users")
}

app.post('/admin/delete-all', async (req, res) => {
  await deleteAllUsers()  // Anyone can call this!
})
```

**Attack Vector**: Regular user calls admin function
**Emma Should Detect**: Missing function-level access control
**Emma Should Recommend**: Add role check at function level

---

### Test 4.8: API Endpoint Enumeration

**Vulnerable Code**:
```javascript
// Undocumented admin API (no protection)
app.get('/api/v1/internal/admin/users', async (req, res) => {
  res.json(await db.query("SELECT * FROM users"))
})
```

**Attack Vector**: Discover endpoint via enumeration, access without auth
**Emma Should Detect**: Unprotected internal API
**Emma Should Recommend**: Add authentication, use API gateway

---

### Test 4.9: GraphQL Authorization Bypass

**Vulnerable Code**:
```graphql
type Query {
  # No authorization check on sensitive field
  users: [User]
}

type User {
  id: ID
  email: String  # Should be private!
  ssn: String    # Should be private!
}
```

**Attack Vector**: Query for all users' emails and SSNs
**Emma Should Detect**: GraphQL field-level authorization missing
**Emma Should Recommend**: Add field-level resolvers with auth checks

---

### Test 4.10: WebSocket Authorization Bypass

**Vulnerable Code**:
```javascript
io.on('connection', (socket) => {
  // No authentication check!
  socket.on('admin_command', (cmd) => {
    executeAdminCommand(cmd)
  })
})
```

**Attack Vector**: Connect via WebSocket, execute admin commands
**Emma Should Detect**: WebSocket missing authentication
**Emma Should Recommend**: Authenticate socket connections

---

## Category 5: CMMC Violations (20 practices - Critical Domains)

**Release 0.2 Scope**: 20 Critical CMMC practices (most common violations)
- AC (Access Control): 6 practices
- IA (Identification & Authentication): 11 practices
- SC (System Communications): 3 practices

**Deferred to Post-Release**: 40 additional CMMC practices across remaining 14 domains

---

### CMMC Domain: Access Control (AC) - 6 tests

#### Test 5.1: AC.L2-3.1.1 - No Access Control
**Violation**: API endpoints publicly accessible
**Emma Should Detect**: AC.L2-3.1.1 violation
**Emma Should Recommend**: Implement RBAC

#### Test 5.2: AC.L2-3.1.2 - No Least Privilege
**Violation**: All users have admin privileges
**Emma Should Detect**: AC.L2-3.1.2 violation
**Emma Should Recommend**: Implement least privilege principle

#### Test 5.3: AC.L2-3.1.3 - No Information Flow Control
**Violation**: Sensitive data flows to unauthorized systems
**Emma Should Detect**: AC.L2-3.1.3 violation
**Emma Should Recommend**: Network segmentation, data flow controls

#### Test 5.4: AC.L2-3.1.5 - No Privilege Escalation Protection
**Violation**: Users can escalate their own privileges
**Emma Should Detect**: AC.L2-3.1.5 violation
**Emma Should Recommend**: Validate privilege changes

#### Test 5.5: AC.L2-3.1.7 - No Login Attempt Logging
**Violation**: Failed login attempts not logged
**Emma Should Detect**: AC.L2-3.1.7 violation
**Emma Should Recommend**: Log all authentication attempts

#### Test 5.6: AC.L2-3.1.20 - No External Connections Control
**Violation**: Unrestricted external network connections
**Emma Should Detect**: AC.L2-3.1.20 violation
**Emma Should Recommend**: Firewall rules, connection whitelisting

---

### CMMC Domain: Identification & Authentication (IA) - 11 violations

#### Test 5.7: IA.L2-3.5.1 - No Multi-Factor Authentication
**Violation**: Single-factor authentication only
**Emma Should Detect**: IA.L2-3.5.1 violation
**Emma Should Recommend**: Implement MFA (TOTP, SMS, WebAuthn)

#### Test 5.8: IA.L2-3.5.2 - No Multi-Factor for Privileged Accounts
**Violation**: Admin accounts use single-factor auth
**Emma Should Detect**: IA.L2-3.5.2 violation
**Emma Should Recommend**: Require MFA for admin accounts

#### Test 5.9: IA.L2-3.5.3 - Replayable Authenticators
**Violation**: Passwords transmitted in plaintext
**Emma Should Detect**: IA.L2-3.5.3 violation
**Emma Should Recommend**: Use HTTPS, hash passwords

#### Test 5.10: IA.L2-3.5.7 - Weak Passwords Allowed
**Violation**: 4-character passwords accepted
**Emma Should Detect**: IA.L2-3.5.7 violation
**Emma Should Recommend**: 12+ chars, complexity requirements

#### Test 5.11: IA.L2-3.5.8 - No Password Reuse Prevention
**Violation**: Users can reuse last password
**Emma Should Detect**: IA.L2-3.5.8 violation
**Emma Should Recommend**: Store password history (last 5)

#### Test 5.12: IA.L2-3.5.9 - Passwords Transmitted Unencrypted
**Violation**: HTTP used for login
**Emma Should Detect**: IA.L2-3.5.9 violation
**Emma Should Recommend**: HTTPS with TLS 1.3

#### Test 5.13: IA.L2-3.5.10 - Plaintext Password Storage
**Violation**: Passwords stored in plaintext
**Emma Should Detect**: IA.L2-3.5.10 violation (CRITICAL)
**Emma Should Recommend**: bcrypt with cost factor 12

#### Test 5.14: IA.L2-3.5.11 - No Identifier Reuse Prevention
**Violation**: Deleted usernames can be reused immediately
**Emma Should Detect**: IA.L2-3.5.11 violation
**Emma Should Recommend**: Soft delete, prevent reuse for 2 years

#### Test 5.15-5.17: (Additional IA violations)

---

### CMMC Domain: System Communications (SC) - 3 tests

#### Test 5.18: SC.L2-3.13.1 - No Boundary Protection
**Violation**: No firewall or network segmentation
**Emma Should Detect**: SC.L2-3.13.1 violation
**Emma Should Recommend**: Implement firewall, DMZ

#### Test 5.19: SC.L2-3.13.2 - No Denial of Service Protection
**Violation**: No rate limiting or DDoS protection
**Emma Should Detect**: SC.L2-3.13.2 violation
**Emma Should Recommend**: Rate limiting, CDN with DDoS protection

#### Test 5.20: SC.L2-3.13.5 - No Public Access Controls
**Violation**: Internal APIs publicly accessible
**Emma Should Detect**: SC.L2-3.13.5 violation
**Emma Should Recommend**: Restrict to internal network, VPN

#### Test 5.21: SC.L2-3.13.8 - No Transmission Confidentiality
**Violation**: Data transmitted over HTTP
**Emma Should Detect**: SC.L2-3.13.8 violation
**Emma Should Recommend**: HTTPS, TLS 1.3, HSTS header

#### Test 5.22: SC.L2-3.13.11 - No Session Termination
**Violation**: Sessions never expire
**Emma Should Detect**: SC.L2-3.13.11 violation
**Emma Should Recommend**: Session timeout (15 minutes idle)

---

### Remaining CMMC Domains (Deferred to Post-Release)

**Note**: The following 40 CMMC tests are deferred to post-Release 0.2. They cover Medium/Low priority domains that are less commonly violated in typical software projects.

**Deferred Domains** (40 tests):
- AU (Audit & Accountability): 9 violations

#### Test 5.30: AU.L2-3.3.1 - No Audit Records
**Violation**: Security events not logged
**Emma Should Detect**: AU.L2-3.3.1 violation
**Emma Should Recommend**: Log all auth, access, config changes

#### Test 5.31: AU.L2-3.3.2 - No Audit Review
**Violation**: Logs not reviewed for suspicious activity
**Emma Should Detect**: AU.L2-3.3.2 violation
**Emma Should Recommend**: SIEM, automated alerting

#### Test 5.32-5.38: (Additional AU violations)

---

### CMMC Domain: Configuration Management (CM) - 9 violations

#### Test 5.39: CM.L2-3.4.1 - No Baseline Configuration
**Violation**: Systems deployed without security baseline
**Emma Should Detect**: CM.L2-3.4.1 violation
**Emma Should Recommend**: CIS Benchmarks, hardening guides

#### Test 5.40: CM.L2-3.4.3 - No Unauthorized Change Detection
**Violation**: No file integrity monitoring
**Emma Should Detect**: CM.L2-3.4.3 violation
**Emma Should Recommend**: Tripwire, AIDE, immutable infrastructure

#### Test 5.41-5.47: (Additional CM violations)

---

### CMMC Domain: Risk Assessment (RA) - 5 violations

#### Test 5.48: RA.L2-3.11.1 - No Risk Assessments
**Violation**: No periodic risk assessments
**Emma Should Detect**: RA.L2-3.11.1 violation
**Emma Should Recommend**: Annual risk assessment, STRIDE threat models

#### Test 5.49-5.52: (Additional RA violations)

---

### CMMC Domain: System Integrity (SI) - 10 violations

#### Test 5.53: SI.L2-3.14.1 - No Flaw Remediation
**Violation**: Known vulnerabilities not patched
**Emma Should Detect**: SI.L2-3.14.1 violation
**Emma Should Recommend**: Patch management, Dependabot

#### Test 5.54: SI.L2-3.14.2 - No Malicious Code Protection
**Violation**: No antivirus or malware scanning
**Emma Should Detect**: SI.L2-3.14.2 violation
**Emma Should Recommend**: Antivirus, VirusTotal for uploads

#### Test 5.55: SI.L2-3.14.6 - No Input Validation
**Violation**: User input not validated
**Emma Should Detect**: SI.L2-3.14.6 violation
**Emma Should Recommend**: Joi schema validation, sanitization

#### Test 5.56-5.62: (Additional SI violations)

---

- CM (Configuration Management): 9 violations
- RA (Risk Assessment): 5 violations
- SI (System Integrity): 10 violations
- AT (Awareness Training): 4 violations
- CA (Security Assessment): 3 violations
- CP (Contingency Planning): 4 violations
- IR (Incident Response): 3 violations
- MA (Maintenance): 6 violations
- MP (Media Protection): 7 violations
- PE (Physical Protection): 6 violations
- PS (Personnel Security): 2 violations
- RE (Recovery): 1 violation
- SA (System Acquisition): 5 violations

**Total Deferred**: 40 CMMC tests

**Rationale for Deferral** (from Murat's standup review):
- 60 CMMC tests in 1.5 days = 40 tests/day (unrealistic)
- Focus Release 0.2 on Critical domains (AC, IA, SC) that cover 80% of common violations
- Expand to full 110 CMMC practices post-release based on user feedback

---

## Test Suite Execution

### Automated Testing

**Test Runner**:
```bash
# Run all 60 tests (Release 0.2)
npm run test:emma-security-suite

# Run by category
npm run test:sql-injection      # 10 tests
npm run test:xss                # 10 tests
npm run test:auth-bypass        # 10 tests
npm run test:authz-flaws        # 10 tests
npm run test:cmmc-critical      # 20 tests (AC, IA, SC domains)
```

**Success Criteria** (Release 0.2):
- Emma catches ≥54 of 60 issues (90%)
- Emma provides actionable recommendations (not vague)
- Emma references CMMC practices correctly
- Emma prioritizes by risk (Critical/High/Medium/Low)

---

## Scoring System

**Per Test**:
- ✅ **Pass** (1 point): Emma detects issue + provides recommendation + references CMMC
- ⚠️ **Partial** (0.5 points): Emma detects issue but recommendation vague
- ❌ **Fail** (0 points): Emma doesn't detect issue

**Overall Score** (Release 0.2 - 60 tests):
- 54-60 points: ✅ PASS (≥90% detection)
- 48-53 points: ⚠️ Needs improvement (80-89% detection)
- <48 points: ❌ FAIL (iterate on Emma's prompts)

**Post-Release** (100 tests):
- Expand to full test suite after Release 0.2 ships
- Target: 90-100 points (90% of 100 tests)

---

## Example Test Execution

**Test 1.1: SQL Injection Detection**

```javascript
const result = await emma.reviewCode(`
  const query = "SELECT * FROM users WHERE email = '" + userEmail + "'"
  const result = await db.execute(query)
`)

// Expected result
expect(result.detected).toBe(true)
expect(result.vulnerability).toBe('SQL injection')
expect(result.strideCategory).toBe('Tampering')
expect(result.severity).toBe('Critical')
expect(result.owasp).toBe('A03')
expect(result.cmmc).toBe('IA.L2-3.5.10')
expect(result.recommendation).toContain('parameterized queries')
expect(result.codeExample).toBeDefined()

// Score: 1.0 (full pass)
```

---

**Last Updated**: 2025-12-02
**Release 0.2 Scope**: 60 tests (10 SQL, 10 XSS, 10 Auth, 10 Authz, 20 CMMC Critical)
**Success Threshold**: ≥90% detection (54 of 60 tests pass)
**Status**: Test suite defined, ready for Emma implementation
**Post-Release Expansion**: 40 additional CMMC tests (100 total)
