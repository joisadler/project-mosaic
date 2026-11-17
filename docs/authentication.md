# Authentication routes

Google/MongoDB configuration is optional; guests can browse. `/account` is the profile, `/learning` selection/progress/reset/shuffle, `/review` completed-card study and `/sign-in` independent auth/error recovery.

Read only for the affected operation:

| Operation | Instructions |
| --- | --- |
| Configure local/production, OAuth, Atlas, ngrok or phone entry | [Setup](authentication/setup.md) |
| Change sessions, handlers, ownership or account navigation | [Ownership/security contract](authentication/ownership.md) |
| Validate auth/provider/database/device behavior | [Verification](authentication/verification.md) |
| Change learning-state sync rather than authentication | [Progress synchronization](progress/synchronization.md) |

Keep guest access, separate development/production credentials and databases, host-only cookies and server-derived ownership. No secrets in Git/client props/logs/chat. See [history](history/accepted-milestones.md) only when an earlier acceptance scope matters; it is not current configuration verification.
