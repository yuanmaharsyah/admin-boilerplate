# Security Policy

## Reporting a vulnerability

Please **do not** open a public issue for a security problem.

Report it privately through GitHub: open the [Security tab](https://github.com/yuanmaharsyah/admin-boilerplate/security) of this repository and choose **Report a vulnerability**. Include what an attacker can do, the affected version (`composer show yuanmaharsyah/admin-core`) and the steps to reproduce it.

You get an answer within 7 days. A confirmed problem is fixed in a patch release of every supported version, and you are credited in the release notes unless you prefer not to be.

## Supported versions

| Version | Supported |
|---|---|
| 1.x | ✅ |
| < 1.0 | ❌ |

## Scope

The package `yuanmaharsyah/admin-core` and the skeleton `yuanmaharsyah/admin-skeleton`: authentication, RBAC (levels, permissions, Super Admin), the audit log and its masking, file attachments, exports, settings and site access. A problem caused by a project's own module code or server setup is out of scope, but tell us if the boilerplate made the mistake easy to make.
