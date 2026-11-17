# Acceptance history

Read only when an earlier owner decision or validation scope matters. Linear and individual package notes contain detailed evidence. These records do not prove current deployment or physical-device behavior.

| Owner confirmation | Recorded scope |
| --- | --- |
| 2026-10-11, MOS-1 | Existing feed MVP accepted; original iPhone/PWA fixes confirmed |
| 2026-10-12 | Portrait–landscape–portrait recovery confirmed; installed iPhone still rotates despite the manifest hint |
| 2026-10-14/15, MOS-24 | Development desktop/iPhone Safari and installed development PWA authentication; production desktop and installed iPhone/PWA auth confirmed on October 15 |
| 2026-10-21, MOS-23/MOS-17 | Account entry/shell and original device-local resume accepted; MOS-205 later superseded cross-reload navigation persistence |
| 2026-10-22, MOS-14/22/15/16/13 | Explicit progress, account synchronization/section controls and aggregates, read-only completed review, soft 2:1 continuous ordering accepted in the recorded phone/desktop workflows |
| 2026-10-23/24, MOS-33/MOS-32 | Profile/My learning separation and compact chapter controls/dark presentation accepted |
| 2026-10-26, MOS-205 | Fresh feed after true reload selected and implementation accepted; ordinary same-runtime state remains stable |
| 2026-10-26, MOS-203 | Minor transparent action-icon overlap accepted; does not waive other layout/accessibility requirements |
| 2026-11-01/08/15/17, MOS-40/41/42/43 | fe-1.4–1.7 publication approvals; see each package for device/validation scope. fe-1.6 explicitly includes an iPhone check; fe-1.7 confirmation names no device/browser |

For content baselines, use the affected package's dated README/COVERAGE/PLAN. Historical inventories and screenshots describe their original tree; do not rewrite them as fresh verification. Source handbook approval is separate from Mosaic acceptance.

## Earlier live authentication evidence

On October 15, 2026, 16 live development API/database checks passed using two isolated fixture users and signed fixture sessions: guest denial, valid sessions, server-derived ownership despite a different query user ID, identity isolation, forged signatures, unknown tokens, expiry, cross-origin sign-out rejection without revocation, external callback rejection, untrusted hosts, sign-out deletion/cookie expiry, revoked cookies, a cancellation callback with valid OAuth state, state replay rejection, and no session after cancellation. The fixture records were removed and their absence verified. The cancellation check used the application's real OAuth initialization and simulated the provider's `access_denied` callback; it did not complete Google's consent UI or prove account switching at Google. A browser check confirmed the cancellation message, retry button, and guest link. The owner confirmed account selection and switching between both test Google accounts in the installed development PWA on October 15, 2026. After deployment, the owner confirmed the production desktop and installed iPhone/PWA checks and accepted MOS-24 on October 15, 2026. The agent did not exercise Google consent UI; its cancellation evidence is the simulated callback described above. Detailed task evidence is recorded in Linear.
