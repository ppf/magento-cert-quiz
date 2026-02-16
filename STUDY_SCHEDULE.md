# AD0-E722 — 14-Day Study Schedule

**Exam:** Adobe Commerce Architect (AD0-E722)
**Questions available:** 210 (quiz app)
**Daily time:** 1-2 hours
**Format:** 60 multiple-choice, 120 minutes, ~62% passing

---

## Exam Weight Distribution

| Section | Weight | Questions in Bank |
|---------|--------|-------------------|
| 1. Design Solutions (46%) | ~28 of 60 questions | 97 |
| 2. Review Solutions (32%) | ~19 of 60 questions | 67 |
| 3. Configure & Deploy (22%) | ~13 of 60 questions | 46 |

---

## Week 1: Foundation & Design (Days 1-7)

### Day 1 — DI & Architecture Core
**Focus:** Dependency Injection, Plugins, Preferences
**Study (45 min):**
- `di.xml` argument replacement, shared vs non-shared instances
- Factory vs Repository pattern decisions
- Plugin (interceptor) limitations & generation
- VirtualType and Proxy classes

**Quiz (30 min):** Categories → Dependency Injection, Plugins & DI (14 questions)
**Review (15 min):** Read explanations for wrong answers, note patterns

---

### Day 2 — Service Contracts & API Design
**Focus:** Service layer, data interfaces, extension attributes
**Study (45 min):**
- Data interface design (getters/setters)
- SearchCriteria: filter groups, sorting, pagination
- Extension attributes vs custom attributes
- `@api` annotation & backward compatibility

**Quiz (30 min):** Categories → Service Contracts, Extension Attributes, API & Web Services (8 questions)
**Review (15 min):** Focus on when to use each pattern

---

### Day 3 — GraphQL & Headless
**Focus:** Schema extension, resolvers, caching, mutations
**Study (45 min):**
- `schema.graphqls` extension patterns
- Resolver implementation & DataProvider pattern
- GraphQL caching (cache identity providers)
- Batch resolvers for performance
- Authorization with `@resolver` directive

**Quiz (30 min):** Category → GraphQL (12 questions)
**Review (15 min):** Compare REST vs GraphQL decision criteria

---

### Day 4 — Message Queues & Async
**Focus:** Topology, consumers, RabbitMQ, bulk operations
**Study (45 min):**
- Exchange → Queue → Binding topology
- Async vs sync consumer selection
- `env.php` RabbitMQ configuration
- Bulk API async operations
- Poison message handling & retry

**Quiz (30 min):** Categories → Message Queue, Message Queues (7 questions)
**Review (15 min):** Draw topology diagrams from memory

---

### Day 5 — Integration Architecture
**Focus:** ERP/CRM integration patterns, event-driven, middleware
**Study (45 min):**
- Middleware vs direct integration tradeoffs
- Event-driven integration with message queues
- Idempotent API design for retry safety
- Integration testing strategies
- Error handling & circuit breaker patterns

**Quiz (30 min):** Category → Integration Architecture (8 questions)
**Review (15 min):** Map integration patterns to real-world scenarios

---

### Day 6 — Checkout, Orders & Payment
**Focus:** Checkout flow architecture, totals, payment gateway
**Study (45 min):**
- Quote → Order conversion pipeline
- Total collectors: sort order, dependencies
- Payment gateway integration (vault, tokenization)
- Order state machine customization
- Inventory reservation during checkout

**Quiz (30 min):** Categories → Checkout & Order Flow Architecture, Checkout & Orders, Order Management, Payment Integration, Shipping (12 questions)
**Review (15 min):** Trace full checkout flow end-to-end

---

### Day 7 — Week 1 Review & Weak Areas
**Full review day (90 min):**
1. Run full quiz: ALL Design section categories (97 questions, timed)
2. Track score per category
3. Identify bottom 3 categories → re-read explanations
4. Re-take wrong questions only

**Goal:** ≥70% on Design section categories

---

## Week 2: Review + Deploy + Exam Prep (Days 8-14)

### Day 8 — Code Review & Refactoring
**Focus:** Anti-patterns, SOLID violations, refactoring decisions
**Study (45 min):**
- God class identification → decomposition strategy
- Plugin chain analysis for performance
- Observer vs plugin selection criteria
- SOLID principle violations in M2 context
- When to refactor vs extend

**Quiz (30 min):** Category → Code Review & Refactoring (10 questions)
**Review (15 min):** Practice identifying issues in code snippets

---

### Day 9 — Troubleshooting & Security
**Focus:** Root cause analysis, debug tools, security hardening
**Study (45 min):**
- Systematic debugging: logs → xdebug → profiler
- Memory leak identification in observers/plugins
- CSP implementation, XSS/CSRF/SQL injection prevention
- 2FA providers, admin security hardening
- Form key validation

**Quiz (30 min):** Categories → Troubleshooting & Root Cause Analysis, Security, Logging & Debugging (17 questions)
**Review (15 min):** Create mental decision tree for common issues

---

### Day 10 — Testing & Customization
**Focus:** Test strategies, customization patterns
**Study (45 min):**
- Integration vs Unit test boundaries
- MFTF test structure (action groups, sections)
- PHPStan levels & configuration
- Extension point selection (plugin vs preference vs observer vs event)
- Theme fallback and override architecture

**Quiz (30 min):** Categories → Testing, Customization Architecture, Theme Development, Admin Customization (15 questions)
**Review (15 min):** When to use which customization approach

---

### Day 11 — Adobe Commerce Cloud
**Focus:** Cloud configuration, deployment, services
**Study (45 min):**
- `.magento.app.yaml` — application configuration
- `.magento.env.yaml` — environment variables & hierarchy
- `routes.yaml` — multi-domain routing
- `services.yaml` — service versions (MySQL, Redis, ES)
- Build vs Deploy phase: what runs when

**Quiz (30 min):** Categories → Adobe Commerce Cloud, Cloud Infrastructure, Deployment & Cloud (14 questions)
**Review (15 min):** Memorize file purposes and override hierarchy

---

### Day 12 — Caching, Performance & Deploy
**Focus:** Varnish, Redis, FPC, optimization, SCD
**Study (45 min):**
- Varnish VCL customization & TTL settings
- Redis: cache vs session vs FPC configuration
- Full Page Cache hole punching (ESI, private content sections)
- Cache tags & identity interface
- SCD strategies (quick, compact, standard)
- Zero-downtime deployment requirements
- Fastly VCL snippets

**Quiz (30 min):** Categories → Caching, Performance, Indexing, Web API (23 questions)
**Review (15 min):** Map caching layers and invalidation flow

---

### Day 13 — Multi-site, Catalog, B2B & Gaps
**Focus:** Multi-store, pricing, B2B, remaining topics
**Study (45 min):**
- Website → Store → Store View hierarchy
- Shared vs separate catalogs decision
- Price indexer architecture & custom price scopes
- B2B: Company accounts, shared catalogs, requisition lists, negotiable quotes
- Import/export, cron, MSI

**Quiz (30 min):** Categories → Multi-site Architecture, Catalog & Price Architecture, B2B Features, Multi-Store + remaining small categories (20 questions)
**Review (15 min):** Focus on architect-level decisions

---

### Day 14 — Final Exam Simulation
**Full exam simulation (120 min):**
1. **Warm-up (10 min):** Review notes from weakest areas
2. **Mock exam (90 min):** Run ALL 210 questions, strict timer
   - Use the quiz app with no category filter
   - Don't look at explanations during the test
3. **Review (20 min):**
   - Check score per section (Design/Review/Deploy)
   - Read explanations for ALL wrong answers
   - If <70% in any section → quick re-study those topics

**Pass criteria:** ≥65% overall, no section below 55%

---

## Daily Routine Template

```
[5 min]  Review yesterday's wrong answers (from notes)
[45 min] Study topic (docs + code examples)
[30 min] Quiz in app (relevant categories)
[15 min] Review wrong answers, note key insights
[5 min]  Quick self-test: can you explain 3 key concepts from today?
```

---

## Key Resources

| Resource | When to Use |
|----------|-------------|
| Quiz App (210 questions) | Daily practice + Day 7/14 mock exams |
| [Adobe Exam Guide](https://express.adobe.com/page/5jFBMTOkbGFhN/) | Verify topic coverage |
| [Adobe DevDocs](https://developer.adobe.com/commerce/php/development/) | Deep dives on weak areas |
| [Cloud Docs](https://experienceleague.adobe.com/docs/commerce-cloud-service/) | Days 11-12 cloud topics |
| Practice Exam (official) | Take on Day 10 or 11 as benchmark |

---

## Score Tracking

| Day | Section | Score | Notes |
|-----|---------|-------|-------|
| 1 | DI & Architecture | /14 | |
| 2 | Service Contracts & API | /8 | |
| 3 | GraphQL | /12 | |
| 4 | Message Queue | /7 | |
| 5 | Integration | /8 | |
| 6 | Checkout & Orders | /12 | |
| 7 | **Week 1 Review** | /97 | Design section |
| 8 | Code Review | /10 | |
| 9 | Troubleshooting & Security | /17 | |
| 10 | Testing & Customization | /15 | |
| 11 | Cloud | /14 | |
| 12 | Caching & Performance | /23 | |
| 13 | Multi-site, Catalog, B2B | /20 | |
| 14 | **Full Mock Exam** | /210 | All sections |

---

## Red Flags (Re-study if...)

- ❌ Score <60% on any daily quiz → re-read explanations + DevDocs
- ❌ Score <65% on Day 7 review → spend Day 8 morning on Design weak spots
- ❌ Score <60% on Day 14 mock → postpone exam, focus on weak sections
- ⚠️ Consistently wrong on "which approach" questions → review architect decision patterns
- ⚠️ Cloud/deploy questions weak → memorize yaml file purposes + build vs deploy phases
