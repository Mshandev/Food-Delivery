# Vulnerability Report

## No Brute-Force / Rate-Limit Protection on Login

| Field | Value |
|-------|-------|
| **Severity** | Medium |
| **CVSS v3.1** | 5.3 (Higher when chained with account enumeration) |
| **Category** | Broken Authentication |
| **CWE** | CWE-307: Improper Restriction of Excessive Authentication Attempts |
| **OWASP Top 10** | A07:2021 – Identification and Authentication Failures |
| **Endpoint** | `POST /api/user/login` |

---

## Description

The login endpoint does not implement any protection against repeated authentication attempts. An attacker can continuously submit invalid credentials without triggering rate limiting, account lockout, request throttling, or CAPTCHA challenges.

This enables automated password guessing attacks against valid user accounts. When combined with account enumeration vulnerabilities, the likelihood of successful account compromise increases significantly.

---

## Root Cause

The authentication endpoint lacks controls to limit repeated failed login attempts, including:

- No per-IP request throttling
- No per-account rate limiting
- No temporary account lockout
- No exponential backoff
- No CAPTCHA after repeated failures

---

## Affected Endpoint

```http
POST /api/user/login
```

---

## Reproduction Steps

### 1. Send multiple failed login attempts

```bash
for i in $(seq 1 15); do
  curl -s -o /dev/null -w "%{http_code} " \
    -X POST https://target.com/api/user/login \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"admin@gmail.com\",\"password\":\"wrong$i\"}"
done
```

---

### 2. Observe the response

Example output:

```text
200 200 200 200 200 200 200 200 200 200 200 200 200 200 200
```

---

### 3. Expected Behavior

After several failed authentication attempts, the application should:

- Return **HTTP 429 Too Many Requests**
- Temporarily lock the account
- Delay subsequent authentication attempts
- Require CAPTCHA verification

---

### 4. Actual Behavior

The server accepts unlimited authentication attempts and continues processing login requests without restriction.

---

## Evidence

**Request**

```http
POST /api/user/login HTTP/1.1
Content-Type: application/json

{
  "email": "admin@gmail.com",
  "password": "wrong1"
}
```

Repeated with different passwords:

```text
wrong1
wrong2
wrong3
...
wrong15
```

**Responses**

```text
200 200 200 200 200 200 200 200
200 200 200 200 200 200 200
```

No:

- HTTP 429
- Account lockout
- CAPTCHA challenge
- Increasing response delay

---

## Security Impact

An attacker can automate password guessing against known user accounts.

Potential consequences include:

- Online brute-force attacks
- Credential stuffing
- Password spraying
- Account takeover
- Increased risk when user enumeration is present
- Increased effectiveness of leaked credential attacks

When combined with user enumeration, the attack becomes significantly more practical because attackers can target confirmed valid accounts.

---

## Risk Assessment

| Metric | Value |
|---------|-------|
| Attack Vector | Network |
| Attack Complexity | Low |
| Privileges Required | None |
| User Interaction | None |
| Confidentiality Impact | Low |
| Integrity Impact | Low |
| Availability Impact | Low |

**Estimated CVSS v3.1:** **5.3 (Medium)**

---

## Remediation

Implement layered authentication protections:

### 1. Rate Limiting

Apply per-IP and per-account limits.

Example:

- 5 failed attempts per account
- 15-minute window
- Return HTTP 429 when exceeded

Example using Express:

```javascript
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false
});

app.use("/api/user/login", loginLimiter);
```

---

### 2. Account Lockout

Temporarily lock accounts after repeated failures.

Example:

- 5 failed attempts
- 15-minute lockout
- Notify the user of suspicious activity

---

### 3. Exponential Backoff

Increase the delay after each failed login attempt to slow automated attacks.

---

### 4. CAPTCHA

Require CAPTCHA (such as Cloudflare Turnstile or hCaptcha) after several consecutive failures.

---

### 5. Logging and Monitoring

Generate alerts for:

- Multiple failed logins
- Password spraying patterns
- Distributed brute-force attempts
- Repeated failures against the same account

---

## Verification

After remediation:

- More than five failed attempts should return **HTTP 429 Too Many Requests**.
- Accounts should be temporarily locked after repeated failures.
- CAPTCHA should be required after exceeding the threshold.
- Security monitoring should record brute-force attempts.

---

## References

- OWASP Authentication Cheat Sheet
- OWASP ASVS V2 Authentication
- CWE-307: Improper Restriction of Excessive Authentication Attempts
- OWASP Top 10 2021 – A07: Identification and Authentication Failures
