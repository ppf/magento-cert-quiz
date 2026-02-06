# Adobe Commerce Architect Quiz - 70 New Questions Plan

## Overview
- **Current Questions**: 51 (Q1-51)
- **New Questions**: 70 (Q52-121)
- **Total After**: 121 questions
- **Exam Coverage**: AD0-E722 (Design 46%, Review 32%, Configure & Deploy 22%)

---

## BATCH 1: Dependency Injection & Architecture (Q52-60) - 9 Questions

| ID | Topic | Difficulty | Key Concept |
|----|-------|------------|-------------|
| 52 | Factory vs Repository pattern | Medium | When to use each pattern |
| 53 | di.xml argument replacement | Medium | Constructor argument override |
| 54 | Interceptor generation | Hard | Plugin class hierarchy |
| 55 | ObjectManager anti-pattern | Medium | Why direct usage is wrong |
| 56 | Shared vs non-shared instances | Medium | Singleton behavior |
| 57 | VirtualType usage | Medium | When to use virtual types |
| 58 | Proxy classes | Hard | Lazy loading dependencies |
| 59 | Preference vs Plugin | Medium | When to use each |
| 60 | Composite pattern in DI | Hard | Multiple implementations |

**Verification Sources**:
- https://developer.adobe.com/commerce/php/development/components/dependency-injection/
- Magento 2 source code patterns

---

## BATCH 2: Service Contracts & API Design (Q61-72) - 12 Questions

| ID | Topic | Difficulty | Key Concept |
|----|-------|------------|-------------|
| 61 | Data interface design | Medium | Getters/setters pattern |
| 62 | SearchCriteria usage | Hard | Filter groups, sorting |
| 63 | Extension attributes vs custom | Medium | When to use each |
| 64 | @api annotation | Medium | Backward compatibility |
| 65 | REST endpoint error handling | Medium | Exception mapping |
| 66 | Bulk API implementation | Hard | Async bulk operations |
| 67 | API versioning | Medium | Version strategies |
| 68 | webapi.xml configuration | Medium | Route definitions |
| 69 | ACL for API resources | Medium | Resource permissions |
| 70 | SOAP vs REST selection | Medium | When to use each |
| 71 | API authentication methods | Hard | OAuth, token, session |
| 72 | Custom API response format | Medium | Result processors |

**Verification Sources**:
- https://developer.adobe.com/commerce/php/development/components/web-api/
- https://developer.adobe.com/commerce/webapi/get-started/

---

## BATCH 3: GraphQL & Headless Commerce (Q73-82) - 10 Questions

| ID | Topic | Difficulty | Key Concept |
|----|-------|------------|-------------|
| 73 | GraphQL schema extension | Medium | Extending types |
| 74 | GraphQL resolver implementation | Medium | DataProvider pattern |
| 75 | GraphQL caching strategy | Hard | Cache identity providers |
| 76 | GraphQL mutations | Medium | Input types, return types |
| 77 | GraphQL batch resolvers | Hard | Performance optimization |
| 78 | PWA Studio architecture | Medium | Peregrine, Venia |
| 79 | Headless checkout flow | Hard | Cart/checkout API |
| 80 | GraphQL authorization | Medium | @resolver directive |
| 81 | Custom GraphQL endpoint | Medium | schema.graphqls |
| 82 | GraphQL error handling | Medium | Exception types |

**Verification Sources**:
- https://developer.adobe.com/commerce/webapi/graphql/
- https://developer.adobe.com/commerce/pwa-studio/

---

## BATCH 4: Message Queue & Async Operations (Q83-88) - 6 Questions

| ID | Topic | Difficulty | Key Concept |
|----|-------|------------|-------------|
| 83 | Message queue topology | Hard | Exchange, queue, binding |
| 84 | Async vs sync consumers | Medium | When to use each |
| 85 | RabbitMQ configuration | Medium | env.php settings |
| 86 | Bulk operations queue | Hard | Async bulk API |
| 87 | Deferred operations | Medium | Deferred total calculation |
| 88 | Queue consumer retry | Hard | Poison message handling |

**Verification Sources**:
- https://developer.adobe.com/commerce/php/development/components/message-queues/

---

## BATCH 5: Adobe Commerce Cloud (Q89-100) - 12 Questions

| ID | Topic | Difficulty | Key Concept |
|----|-------|------------|-------------|
| 89 | .magento.app.yaml | Medium | Application configuration |
| 90 | .magento.env.yaml | Medium | Environment variables |
| 91 | routes.yaml configuration | Medium | Multi-domain routing |
| 92 | services.yaml | Medium | Service versions |
| 93 | Build vs Deploy phase | Hard | What runs when |
| 94 | SCD_STRATEGY options | Medium | quick, compact, standard |
| 95 | Zero-downtime deployment | Hard | Requirements |
| 96 | Environment variables hierarchy | Medium | Override order |
| 97 | Fastly VCL snippets | Hard | Custom caching rules |
| 98 | New Relic configuration | Medium | APM setup |
| 99 | Cloud database relations | Medium | MySQL, Redis, ES |
| 100 | Post-deploy hooks | Medium | Warming, health checks |

**Verification Sources**:
- https://experienceleague.adobe.com/docs/commerce-cloud-service/user-guide/overview.html
- https://experienceleague.adobe.com/docs/commerce-cloud-service/user-guide/configure/app/

---

## BATCH 6: Caching & Performance (Q101-110) - 10 Questions

| ID | Topic | Difficulty | Key Concept |
|----|-------|------------|-------------|
| 101 | Varnish VCL customization | Hard | Backend selection, TTL |
| 102 | Redis cache configuration | Medium | Cache vs session vs FPC |
| 103 | Full Page Cache hole punching | Hard | ESI, private content |
| 104 | Cache tags and invalidation | Medium | Identity interface |
| 105 | Block caching strategies | Medium | Cacheable blocks |
| 106 | Database query optimization | Hard | Profiler, explain |
| 107 | Indexer optimization | Medium | Partial reindex |
| 108 | Static content optimization | Medium | Minification, bundling |
| 109 | Image optimization | Medium | Resize, WebP |
| 110 | Lazy loading patterns | Medium | Deferred initialization |

**Verification Sources**:
- https://developer.adobe.com/commerce/php/development/cache/
- https://experienceleague.adobe.com/docs/commerce-operations/performance-best-practices/

---

## BATCH 7: Security (Q111-116) - 6 Questions

| ID | Topic | Difficulty | Key Concept |
|----|-------|------------|-------------|
| 111 | CSP implementation | Hard | Content Security Policy |
| 112 | Two-factor authentication | Medium | 2FA providers |
| 113 | SQL injection prevention | Medium | Prepared statements |
| 114 | XSS prevention | Medium | Escaper usage |
| 115 | CSRF protection | Medium | Form keys |
| 116 | Admin security hardening | Medium | Session, URL |

**Verification Sources**:
- https://developer.adobe.com/commerce/php/development/security/

---

## BATCH 8: Testing & Code Quality (Q117-121) - 5 Questions

| ID | Topic | Difficulty | Key Concept |
|----|-------|------------|-------------|
| 117 | Integration vs Unit tests | Medium | Boundaries |
| 118 | MFTF test structure | Hard | Action groups, sections |
| 119 | PHPStan configuration | Medium | Level settings |
| 120 | Test fixtures | Medium | Data isolation |
| 121 | API functional tests | Hard | WebAPI testing |

**Verification Sources**:
- https://developer.adobe.com/commerce/testing/guide/

---

## Implementation Order

1. **Batch 1** (Q52-60): DI & Architecture - Foundation concepts
2. **Batch 2** (Q61-72): Service Contracts - API design
3. **Batch 3** (Q73-82): GraphQL - Headless commerce
4. **Batch 4** (Q83-88): Message Queue - Async patterns
5. **Batch 5** (Q89-100): Cloud - Deployment & infrastructure
6. **Batch 6** (Q101-110): Caching - Performance
7. **Batch 7** (Q111-116): Security - Protection patterns
8. **Batch 8** (Q117-121): Testing - Quality assurance

---

## Quality Checklist (Per Question)

- [ ] Only ONE correct answer interpretation
- [ ] All distractors are plausible but definitively wrong
- [ ] Explanation states WHY correct and WHY others wrong
- [ ] Code example is syntactically correct M2 code
- [ ] Verified against official Adobe/Magento documentation
- [ ] Tests architect-level decision making (not just syntax)

---

## Verification Strategy

Before adding each batch:
1. Cross-reference with Adobe DevDocs
2. Verify code patterns against Magento 2.4.x core
3. Check that answer is unambiguous
4. Ensure difficulty is appropriate (Medium/Hard only for architect)
