const fs = require('fs')
const path = require('path')

const questionsPath = path.join(__dirname, '..', 'server', 'data', 'questions.json')
const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'))

const categoryDomainMap = {
  'Dependency Injection': 'Design',
  'Plugins & DI': 'Design',
  'Service Contracts': 'Design',
  'Extension Attributes': 'Design',
  'API & Web Services': 'Design',
  'GraphQL': 'Design',
  'Message Queue': 'Design',
  'Message Queues': 'Design',
  'Integration Architecture': 'Design',
  'Checkout & Order Flow Architecture': 'Design',
  'Checkout & Orders': 'Design',
  'Order Management': 'Design',
  'Payment Integration': 'Design',
  'Shipping': 'Design',
  'B2B Features': 'Design',
  'Multi-site Architecture': 'Design',
  'Multi-Store': 'Design',
  'Catalog & Price Architecture': 'Design',
  'Catalog Rules': 'Design',
  'EAV & Attributes': 'Design',
  'MSI (Inventory)': 'Design',
  'JavaScript & Frontend': 'Design',
  'Theme Development': 'Design',
  'Admin Customization': 'Design',
  'Module Development': 'Design',
  'Events & Observers': 'Design',
  'Customization Architecture': 'Design',
  'Code Architecture': 'Design',

  'Code Review & Refactoring': 'Review',
  'Troubleshooting & Root Cause Analysis': 'Review',
  'Security': 'Review',
  'Testing': 'Review',
  'Logging & Debugging': 'Review',
  'Database': 'Review',
  'Configuration & XML': 'Review',

  'Adobe Commerce Cloud': 'ConfigureDeploy',
  'Cloud Infrastructure': 'ConfigureDeploy',
  'Deployment & Cloud': 'ConfigureDeploy',
  'Caching': 'ConfigureDeploy',
  'Performance': 'ConfigureDeploy',
  'Web API': 'ConfigureDeploy',
  'Indexing': 'ConfigureDeploy',
  'Session & Architecture': 'ConfigureDeploy',
  'Cron & Scheduling': 'ConfigureDeploy',
  'Import & Export': 'ConfigureDeploy',
  'Elasticsearch': 'ConfigureDeploy'
}

const categoryTagMap = {
  'Dependency Injection': ['di', 'interception', 'object-manager'],
  'Plugins & DI': ['plugins', 'di', 'extensibility'],
  'Service Contracts': ['service-contracts', 'api-design', 'backward-compatibility'],
  'Extension Attributes': ['extension-attributes', 'service-contracts'],
  'API & Web Services': ['integration-patterns', 'api-design'],
  'GraphQL': ['graphql', 'headless', 'resolver-patterns'],
  'Message Queue': ['message-queue', 'asynchronous-operations', 'rabbitmq'],
  'Message Queues': ['message-queue', 'asynchronous-operations'],
  'Integration Architecture': ['integration-patterns', 'middleware', 'idempotency'],
  'Checkout & Order Flow Architecture': ['checkout-architecture', 'totals', 'order-lifecycle'],
  'Checkout & Orders': ['checkout-architecture', 'order-lifecycle'],
  'Order Management': ['order-lifecycle', 'business-processes'],
  'Payment Integration': ['payment-gateway', 'checkout-architecture'],
  'Shipping': ['shipping-rates', 'fulfillment'],
  'B2B Features': ['b2b', 'company-accounts', 'shared-catalog'],
  'Multi-site Architecture': ['multi-site', 'scope-hierarchy'],
  'Multi-Store': ['multi-site', 'scope-hierarchy'],
  'Catalog & Price Architecture': ['catalog-pricing', 'indexing', 'rule-engine'],
  'Catalog Rules': ['catalog-pricing', 'rule-engine'],
  'EAV & Attributes': ['eav', 'catalog-modeling'],
  'MSI (Inventory)': ['msi', 'inventory-reservations'],
  'JavaScript & Frontend': ['frontend-architecture', 'ui-components'],
  'Theme Development': ['frontend-architecture', 'theme-fallback'],
  'Admin Customization': ['admin-ui', 'acl', 'ui-components'],
  'Module Development': ['module-architecture', 'upgrade-safe-customization'],
  'Events & Observers': ['events-observers', 'extensibility'],
  'Customization Architecture': ['customization-strategy', 'upgrade-safe-customization'],
  'Code Architecture': ['solid-principles', 'module-architecture'],

  'Code Review & Refactoring': ['code-review', 'refactoring', 'maintainability'],
  'Troubleshooting & Root Cause Analysis': ['troubleshooting', 'root-cause-analysis', 'production-debugging'],
  'Security': ['security-hardening', 'secure-coding', 'compliance'],
  'Testing': ['testing-strategy', 'integration-tests', 'mftf'],
  'Logging & Debugging': ['observability', 'logging', 'diagnostics'],
  'Database': ['database-design', 'query-optimization', 'data-integrity'],
  'Configuration & XML': ['xml-configuration', 'merge-rules', 'scope-configuration'],

  'Adobe Commerce Cloud': ['cloud-architecture', 'deployment-pipeline', 'environment-configuration'],
  'Cloud Infrastructure': ['cloud-architecture', 'services-configuration'],
  'Deployment & Cloud': ['deployment-strategy', 'release-safety'],
  'Caching': ['caching-strategy', 'fpc-varnish', 'cache-invalidation'],
  'Performance': ['performance-optimization', 'scalability'],
  'Web API': ['webapi', 'integration-security', 'async-bulk'],
  'Indexing': ['indexing', 'operational-readiness'],
  'Session & Architecture': ['session-management', 'distributed-architecture'],
  'Cron & Scheduling': ['cron', 'operational-reliability'],
  'Import & Export': ['data-migration', 'bulk-operations'],
  'Elasticsearch': ['search-architecture', 'catalog-performance']
}

const newQuestions = [
  {
    id: 175,
    category: 'Integration Architecture',
    difficulty: 'Hard',
    examDomain: 'Design',
    objectiveTags: ['integration-patterns', 'idempotency', 'event-driven-architecture'],
    question: 'A merchant runs Adobe Commerce with 120k SKUs and integrates with a PIM and ERP. During flash updates, the PIM can publish up to 30k product changes in 15 minutes. Business requires near-real-time storefront updates, no duplicate updates to ERP inventory, and graceful recovery if either side is down. Which architecture is the best fit?',
    options: [
      { id: 'A', text: 'Run a cron every 5 minutes that exports full product snapshots from Commerce to ERP and imports full PIM snapshots into Commerce.' },
      { id: 'B', text: 'Use synchronous REST calls in both directions for every product save, and fail the save if any downstream system times out.' },
      { id: 'C', text: 'Use an event-driven pattern with outbox + queue consumers, idempotency keys per change event, and retry/dead-letter handling at integration boundaries.' },
      { id: 'D', text: 'Replicate ERP and PIM tables into Commerce database and read them directly to avoid API overhead.' }
    ],
    correctAnswers: ['C'],
    explanation: 'C is correct because it decouples write latency from downstream availability, preserves ordered durable delivery, and enables replay. Outbox guarantees events are not lost after Commerce commits. Idempotency keys prevent duplicate side effects when retries occur. Dead-letter handling keeps poison payloads from blocking the pipeline while preserving auditability.\n\nA is wrong because full snapshots are expensive, create stale windows, and increase conflict risk. B is wrong because tight synchronous coupling makes product save availability depend on external uptime. D is wrong because cross-system table replication introduces ownership and consistency risks and breaks service boundaries.',
    codeExample: "// Pseudocode: event envelope with idempotency\n{\n  event_id: 'prod-1234-20260216T120301Z',\n  aggregate: 'product',\n  aggregate_id: 1234,\n  version: 981,\n  type: 'price.changed',\n  payload: { sku: 'SKU-1234', price: 99.00 }\n}"
  },
  {
    id: 176,
    category: 'Checkout & Order Flow Architecture',
    difficulty: 'Hard',
    examDomain: 'Design',
    objectiveTags: ['checkout-architecture', 'latency-budget', 'resilience-patterns'],
    question: 'At checkout, Adobe Commerce calls tax, fraud, and shipping providers. P95 checkout step load must stay below 2.5s. One provider intermittently spikes to 6s and occasionally times out. Orders must still place with auditable risk decisions and no hidden charge recalculation after order placement. What should the architect design?',
    options: [
      { id: 'A', text: 'Call providers sequentially and increase frontend timeout to 8 seconds to capture all responses.' },
      { id: 'B', text: 'Use parallel calls with per-provider timeouts, fail-open only for non-blocking checks, persist decision state on order, and queue post-order reconciliation tasks with explicit customer communication rules.' },
      { id: 'C', text: 'Skip external checks during checkout and run all checks after invoice creation.' },
      { id: 'D', text: 'Cache one global fraud/tax/shipping response per cart ID for 24 hours to avoid spikes.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct because it enforces a latency budget while preserving deterministic business behavior. Parallelization reduces wall-clock latency, per-provider timeouts avoid tail-latency collapse, and persisted decision snapshots prevent invisible post-order mutation. Async reconciliation is acceptable only when policy explicitly defines customer-visible outcomes.\n\nA degrades conversion and still fails under extended outages. C violates risk and taxation controls. D is unsafe because these responses depend on mutable inputs (address, items, promotions, fraud signals) and short-lived validity windows.',
    codeExample: "// Decision snapshot persisted to order extension attributes\n{\n  tax_quote_id: 'tax-8891',\n  fraud_result: 'manual_review',\n  shipping_rate_source: 'cached-fastest-warehouse-2',\n  policy_version: 'checkout-policy-v4'\n}"
  },

  {
    id: 177,
    category: 'Code Review & Refactoring',
    difficulty: 'Hard',
    examDomain: 'Review',
    objectiveTags: ['code-review', 'plugin-chain', 'error-handling'],
    question: 'During review of a custom module, you find an around plugin on `\nMagento\\Catalog\\Api\\ProductRepositoryInterface::save` that catches `\\Throwable`, logs it, and returns the original product object to keep UI flow smooth. Which assessment is most accurate?',
    options: [
      { id: 'A', text: 'Acceptable: admin users prefer no visible errors, and logging is enough for operations.' },
      { id: 'B', text: 'Risky but acceptable if the logger writes to a dedicated file with rotation.' },
      { id: 'C', text: 'Critical issue: swallowing exceptions hides write failures and can create data integrity drift between persisted and expected state.' },
      { id: 'D', text: 'Only a performance issue; change to a before plugin to reduce overhead.' }
    ],
    correctAnswers: ['C'],
    explanation: 'C is correct. Repository save is a transactional boundary; suppressing failures breaks caller guarantees and can trigger downstream corruption (index drift, stale cache assumptions, inconsistent integrations). Exceptions should be mapped or rethrown with context, not hidden.\n\nA and B prioritize UX over correctness and observability truth. D misidentifies the primary risk: this is not about plugin type overhead; it is about contract integrity.'
  },
  {
    id: 178,
    category: 'Code Review & Refactoring',
    difficulty: 'Hard',
    examDomain: 'Review',
    objectiveTags: ['refactoring', 'object-manager-anti-pattern', 'testability'],
    question: 'A service class injects five dependencies but still calls `ObjectManager::get()` inside a loop to resolve strategy classes based on product type. The author claims constructor injection is impossible because strategy count is dynamic. What is the best architect response?',
    options: [
      { id: 'A', text: 'Keep it: runtime lookup is normal when strategy sets are unknown at compile time.' },
      { id: 'B', text: 'Replace with service locator helper to avoid direct ObjectManager usage in business code.' },
      { id: 'C', text: 'Refactor to DI-configured strategy pool (array argument / virtual types) and resolve by key from injected map.' },
      { id: 'D', text: 'Use a global singleton registry to cache strategy instances after first lookup.' }
    ],
    correctAnswers: ['C'],
    explanation: 'C is correct because it preserves Magento DI, improves testability, and keeps extensibility declarative in `di.xml`. Strategy pools are the canonical approach for runtime selection with compile-time wiring.\n\nA and B normalize service locator anti-patterns that hide dependencies. D adds global mutable state and lifecycle ambiguity.'
  },
  {
    id: 179,
    category: 'Code Review & Refactoring',
    difficulty: 'Hard',
    examDomain: 'Review',
    objectiveTags: ['upgrade-safe-customization', 'preferences', 'conflict-analysis'],
    question: 'Two third-party modules define preferences for the same core class. A team proposes adding a third preference in your custom module to restore expected behavior. Which approach should the architect recommend?',
    options: [
      { id: 'A', text: 'Add a higher-priority preference and document module load order as a permanent fix.' },
      { id: 'B', text: 'Replace all preferences with one custom forked class in `app/code` for deterministic behavior.' },
      { id: 'C', text: 'Avoid preference stacking; isolate needed behavior via plugins, extension points, or composition and reduce preference surface area.' },
      { id: 'D', text: 'Disable one third-party module in production and re-enable after peak season.' }
    ],
    correctAnswers: ['C'],
    explanation: 'C is correct. Preference conflicts are brittle and high-risk in upgrades. Architects should minimize preferences and favor composable extension points where multiple modules can coexist.\n\nA and B increase long-term maintenance and upgrade risk. D is operationally unsafe and ignores root cause.'
  },
  {
    id: 180,
    category: 'Code Review & Refactoring',
    difficulty: 'Hard',
    examDomain: 'Review',
    objectiveTags: ['code-review', 'transaction-boundaries', 'performance'],
    question: 'A cron observer processes 80k rows in one DB transaction and dispatches external HTTP calls inside that transaction. Production shows lock waits and checkout slowdowns. What refactor is most appropriate?',
    options: [
      { id: 'A', text: 'Keep one transaction for consistency and increase MySQL lock timeout.' },
      { id: 'B', text: 'Split into bounded batches, keep DB transaction scope local to state change, and move HTTP side effects to async queue workers.' },
      { id: 'C', text: 'Disable cron during business hours and run once nightly.' },
      { id: 'D', text: 'Move job to frontend request/response so lock contention is visible immediately.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct. Long-lived transactions plus external I/O is a classic lock amplification anti-pattern. Batch processing with short transactions and queued side effects keeps OLTP contention low and improves recovery semantics.\n\nA hides symptoms. C increases business latency and does not scale. D worsens customer-facing reliability.'
  },
  {
    id: 181,
    category: 'Code Review & Refactoring',
    difficulty: 'Medium',
    examDomain: 'Review',
    objectiveTags: ['refactoring', 'solid-principles', 'maintainability'],
    question: 'You review a 1,200-line class that validates checkout inputs, calculates pricing, triggers integrations, builds email payloads, and writes audit logs. Which first refactoring move gives highest risk reduction with least functional disruption?',
    options: [
      { id: 'A', text: 'Rewrite it entirely into a new module to start clean.' },
      { id: 'B', text: 'Introduce an orchestrator that delegates to extracted collaborators with clear interfaces for validation, pricing, integration, and notifications.' },
      { id: 'C', text: 'Keep class intact and add comments documenting each region.' },
      { id: 'D', text: 'Convert all methods to static so they are easier to call from multiple entry points.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct because it incrementally introduces boundaries without destabilizing behavior. It enables targeted testing, clearer ownership, and safer iterative extraction.\n\nA is high-risk big-bang rewrite. C does not solve coupling. D increases global coupling and harms testability.'
  },
  {
    id: 182,
    category: 'Code Review & Refactoring',
    difficulty: 'Hard',
    examDomain: 'Review',
    objectiveTags: ['plugin-chain', 'execution-order', 'debuggability'],
    question: 'Checkout total calculation is modified by five plugins from different modules. Results differ between environments. Which review action is most effective first step?',
    options: [
      { id: 'A', text: 'Increase PHP memory and OPcache because plugin chains are memory-sensitive.' },
      { id: 'B', text: 'Map plugin execution order (`sortOrder` + module sequence), document before/around/after effects, and remove non-deterministic side effects from around plugins.' },
      { id: 'C', text: 'Replace all plugins with one preference for total collector class.' },
      { id: 'D', text: 'Cache total results globally per customer group to avoid recalculation.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct. Deterministic understanding of interception order is the prerequisite to fixing environment-specific behavior drift. Around plugins that mutate shared state often create hard-to-reason bugs and should be minimized.\n\nA is unrelated. C trades one conflict class for another. D risks stale totals and legal/compliance issues.'
  },
  {
    id: 183,
    category: 'Code Review & Refactoring',
    difficulty: 'Medium',
    examDomain: 'Review',
    objectiveTags: ['api-design', 'backward-compatibility', 'service-contracts'],
    question: 'A proposed change removes an existing method from an interface marked `@api` and replaces it with a new method signature. Release is planned as a patch update. What is the architect recommendation?',
    options: [
      { id: 'A', text: 'Approve if all internal modules are updated in the same release.' },
      { id: 'B', text: 'Approve only for Commerce Cloud projects where deployment is controlled.' },
      { id: 'C', text: 'Reject as backward-incompatible; introduce additive API changes and deprecate old behavior for a major-version path.' },
      { id: 'D', text: 'Allow removal if integration tests pass in CI.' }
    ],
    correctAnswers: ['C'],
    explanation: 'C is correct. `@api` contracts must preserve backward compatibility across supported versions. Breaking changes require major-version strategy with migration guidance.\n\nA, B, and D ignore third-party and external integration stability obligations.'
  },
  {
    id: 184,
    category: 'Code Review & Refactoring',
    difficulty: 'Hard',
    examDomain: 'Review',
    objectiveTags: ['cacheability', 'frontend-architecture', 'review-findings'],
    question: 'A code review finds `cacheable="false"` added to a layout block rendered on category pages to show customer-specific badges. Traffic is 4M page views/day with Varnish enabled. What is the correct review outcome?',
    options: [
      { id: 'A', text: 'Approve; correctness for customer data is more important than cache hit ratio.' },
      { id: 'B', text: 'Reject; move customer-specific badge data to private content sections or AJAX hydration to keep page-level FPC cacheable.' },
      { id: 'C', text: 'Approve but raise TTL to offset lower cacheability.' },
      { id: 'D', text: 'Approve and add Redis memory to absorb extra backend traffic.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct. Disabling cache at block level can collapse FPC effectiveness for high-traffic pages. Customer-specific fragments should be handled via private content or controlled client-side hydration.\n\nA, C, and D treat symptoms while preserving a structural anti-pattern.'
  },

  {
    id: 185,
    category: 'Troubleshooting & Root Cause Analysis',
    difficulty: 'Hard',
    examDomain: 'Review',
    objectiveTags: ['troubleshooting', 'idempotency', 'payments'],
    question: 'Payment provider retries webhook callbacks when it does not receive 200 within 3 seconds. During network jitter, duplicate invoices are created for some orders. Which root-cause fix is best?',
    options: [
      { id: 'A', text: 'Increase webhook timeout to 15 seconds and keep existing logic.' },
      { id: 'B', text: 'Apply a mutex lock around invoice creation only.' },
      { id: 'C', text: 'Implement idempotency keys from provider event IDs, persist processed-event ledger, and return fast acknowledgement before non-critical side effects.' },
      { id: 'D', text: 'Disable retries on the payment provider side.' }
    ],
    correctAnswers: ['C'],
    explanation: 'C is correct. Webhook handling must be idempotent under at-least-once delivery. Persisting event IDs and short-circuiting duplicates guarantees exactly-once business effect. Fast ACK reduces retry storms.\n\nA delays but does not remove duplicate risk. B alone is fragile across multi-node workers and restarts. D weakens reliability and typically cannot be fully controlled by the merchant.'
  },
  {
    id: 186,
    category: 'Troubleshooting & Root Cause Analysis',
    difficulty: 'Hard',
    examDomain: 'Review',
    objectiveTags: ['graphql', 'performance-diagnostics', 'n-plus-one'],
    question: 'GraphQL response time for product listing jumped from 450ms to 2.8s after adding custom fields. Profiler shows repeated repository calls per item. What is the most effective architectural correction?',
    options: [
      { id: 'A', text: 'Increase GraphQL HTTP cache TTL and accept slower uncached requests.' },
      { id: 'B', text: 'Refactor resolvers to batch-load data (data provider / batch resolver pattern) and prefetch required entities per page request.' },
      { id: 'C', text: 'Move all custom fields into synchronous REST calls from frontend after initial GraphQL response.' },
      { id: 'D', text: 'Disable custom fields for mobile traffic only.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct. The observed symptom is N+1 query behavior. Batch resolver/data provider patterns collapse repeated lookups into bounded queries and restore predictable scaling.\n\nA masks only cacheable traffic. C increases round trips and complexity. D is a business workaround, not an engineering fix.'
  },
  {
    id: 187,
    category: 'Troubleshooting & Root Cause Analysis',
    difficulty: 'Hard',
    examDomain: 'Review',
    objectiveTags: ['database-deadlocks', 'operational-debugging', 'checkout'],
    question: 'After peak launch, random checkout failures show SQL deadlocks involving inventory reservations and custom order attributes. Failures spike when async consumer lag grows. What should be prioritized first?',
    options: [
      { id: 'A', text: 'Raise MySQL deadlock timeout and retry at webserver layer.' },
      { id: 'B', text: 'Standardize lock acquisition order across involved writes, shorten transaction scope, and move non-transactional writes out of checkout transaction.' },
      { id: 'C', text: 'Disable inventory reservations to reduce write contention.' },
      { id: 'D', text: 'Route all writes to a replica during peak traffic.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct because deadlock frequency is reduced by deterministic lock ordering and minimal transaction scope. Checkout transactions should only include strictly required atomic writes.\n\nA may reduce visible errors but preserves contention. C breaks MSI correctness. D is invalid because replicas are read targets, not write consistency boundaries.'
  },
  {
    id: 188,
    category: 'Troubleshooting & Root Cause Analysis',
    difficulty: 'Medium',
    examDomain: 'Review',
    objectiveTags: ['cache-invalidation', 'catalog-pricing', 'root-cause-analysis'],
    question: 'Prices on PDP are occasionally stale for 3-5 minutes after merchandising updates, while cart shows correct totals. Indexers are up to date. Which issue is most likely?',
    options: [
      { id: 'A', text: 'Price index corruption due to customer group dimension mismatch.' },
      { id: 'B', text: 'FPC/edge cache invalidation lag for catalog price-related tags while cart totals are recalculated dynamically.' },
      { id: 'C', text: 'Session storage eviction in Redis database 2.' },
      { id: 'D', text: 'Checkout totals collector sort order conflict.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct. PDP often relies on cached content and tag-driven invalidation, while cart recalculates live totals from quote context. This symptom pattern points to cache invalidation timing rather than index correctness.\n\nA would usually show broader inconsistency. C affects session continuity, not deterministic price freshness. D affects cart/order computation, not isolated PDP staleness.'
  },
  {
    id: 189,
    category: 'Troubleshooting & Root Cause Analysis',
    difficulty: 'Hard',
    examDomain: 'Review',
    objectiveTags: ['message-queue', 'memory-leak', 'consumer-stability'],
    question: 'A long-running queue consumer starts at 250MB memory and grows to 1.8GB within two hours before being OOM-killed. Throughput drops over time. What investigation path is most appropriate?',
    options: [
      { id: 'A', text: 'Increase container memory limit to 3GB and monitor again.' },
      { id: 'B', text: 'Disable GC for better speed and rely on worker restarts nightly.' },
      { id: 'C', text: 'Profile object retention across message loop, clear per-message references, avoid static caches of payloads, and enforce controlled consumer max-messages restart policy.' },
      { id: 'D', text: 'Switch queue backend to database tables so memory pressure moves to MySQL.' }
    ],
    correctAnswers: ['C'],
    explanation: 'C is correct. The symptom indicates retention across message boundaries. Root-cause work includes leak profiling, loop-scope cleanup, and bounded worker lifecycle. Controlled restarts are acceptable guardrails, not substitutes for leak fixes.\n\nA and B are symptom treatments. D changes bottleneck location and can reduce queue scalability.'
  },
  {
    id: 190,
    category: 'Troubleshooting & Root Cause Analysis',
    difficulty: 'Hard',
    examDomain: 'Review',
    objectiveTags: ['cron', 'multi-node', 'race-condition'],
    question: 'In a three-node deployment, some cron tasks run twice and send duplicate customer emails. `cron_schedule` shows overlapping `running` states from different hosts. What is the correct architectural remediation?',
    options: [
      { id: 'A', text: 'Keep cron on all nodes and add host-level lock files under `/tmp`.' },
      { id: 'B', text: 'Designate a single cron runner node, keep process isolation for heavy groups, and enforce stale-job recovery settings (`schedule_lifetime`).' },
      { id: 'C', text: 'Reduce cron frequency from every minute to every fifteen minutes.' },
      { id: 'D', text: 'Move all cron tasks to synchronous admin-triggered actions.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct. Multi-node cron without strict ownership causes race conditions. Single runner with sane lifecycle settings preserves exactly-once operational intent.\n\nA fails on non-shared filesystems. C does not remove race conditions. D degrades reliability and operations.'
  },

  {
    id: 191,
    category: 'Security',
    difficulty: 'Hard',
    examDomain: 'Review',
    objectiveTags: ['security-hardening', 'ssrf', 'integration-boundaries'],
    question: 'A custom admin feature lets users configure a webhook URL for outbound notifications. Security review flags SSRF risk. Which mitigation set is architecturally correct?',
    options: [
      { id: 'A', text: 'Allow any HTTPS URL and rely on firewall egress rules only.' },
      { id: 'B', text: 'Validate against allowlist (host/domain), block private/link-local IP ranges after DNS resolution, enforce scheme/port constraints, and sign outbound payloads.' },
      { id: 'C', text: 'Encrypt webhook URL in database and keep runtime behavior unchanged.' },
      { id: 'D', text: 'Run requests through browser CORS checks to prevent internal calls.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct because SSRF defense requires strict destination validation and network boundary controls. DNS resolution checks and private-range denial are essential. Payload signing adds integrity for receivers.\n\nA is incomplete defense-in-depth. C protects at-rest secrecy but not request destination abuse. D misunderstands server-side request context.'
  },
  {
    id: 192,
    category: 'Security',
    difficulty: 'Hard',
    examDomain: 'Review',
    objectiveTags: ['csp', 'xss-prevention', 'frontend-security'],
    question: 'A third-party script is required on checkout confirmation page. Team proposes `Content-Security-Policy: script-src *` to avoid rollout risk. What should the architect approve?',
    options: [
      { id: 'A', text: 'Approve wildcard for one release and remove later.' },
      { id: 'B', text: 'Use strict host allowlist with nonce/hash strategy where possible, limit scope to required route, and monitor CSP violation reports.' },
      { id: 'C', text: 'Disable CSP in production and rely on WAF signatures.' },
      { id: 'D', text: 'Move script into inline HTML so CSP does not apply.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct. Checkout surfaces sensitive data and requires least-privilege script policy. Route-scoped CSP with reporting supports safe rollout and monitoring.\n\nA and C materially expand XSS blast radius. D is false; inline scripts are typically more restricted and require explicit policy controls.'
  },
  {
    id: 193,
    category: 'Security',
    difficulty: 'Medium',
    examDomain: 'Review',
    objectiveTags: ['api-security', 'least-privilege', 'token-management'],
    question: 'An integration token currently has full admin ACL and is used by a middleware service that only needs catalog read + order shipment creation. What is the best remediation?',
    options: [
      { id: 'A', text: 'Keep admin token but rotate weekly.' },
      { id: 'B', text: 'Create dedicated integration with minimum required ACL resources and separate tokens by environment/workload.' },
      { id: 'C', text: 'Use one token per developer machine for easier debugging.' },
      { id: 'D', text: 'Switch to customer token to reduce privileges automatically.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct because least privilege limits blast radius and supports auditability. Workload/environment separation reduces lateral risk.\n\nA improves hygiene but not privilege scope. C increases unmanaged credential sprawl. D changes auth model and does not match integration use case.'
  },
  {
    id: 194,
    category: 'Security',
    difficulty: 'Hard',
    examDomain: 'Review',
    objectiveTags: ['secrets-management', 'cloud-security', 'incident-response'],
    question: 'A production incident exposed an API key in application logs. Which architect-level response is most complete?',
    options: [
      { id: 'A', text: 'Delete logs from the server and continue with same key.' },
      { id: 'B', text: 'Rotate compromised secret immediately, revoke old credentials, scrub log sinks where feasible, add log redaction controls, and move secret retrieval to environment/secret store only.' },
      { id: 'C', text: 'Mask the key in frontend UI and keep backend logging unchanged.' },
      { id: 'D', text: 'Encrypt all logs at rest and treat incident as resolved.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct because response must include containment, credential invalidation, and prevention controls. Redaction and secret-store-only access reduce recurrence.\n\nA, C, and D leave active credential risk or ignore data already exfiltrated to downstream log systems.'
  },
  {
    id: 195,
    category: 'Security',
    difficulty: 'Hard',
    examDomain: 'Review',
    objectiveTags: ['secure-coding', 'input-validation', 'webapi'],
    question: 'A custom REST endpoint accepts arbitrary JSON and maps fields directly to a model `setData($payload)` before save. What is the strongest correction?',
    options: [
      { id: 'A', text: 'Keep dynamic mapping and add `strip_tags()` on all string values.' },
      { id: 'B', text: 'Define strict service contract DTO, explicit field whitelist/validation, server-side authorization checks, and reject unknown fields.' },
      { id: 'C', text: 'Rely on frontend form validation and continue server-side passthrough.' },
      { id: 'D', text: 'Base64-encode JSON before save to prevent injection.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct. Explicit contracts and boundary validation prevent mass assignment and privilege escalation vectors. Unknown-field rejection preserves API integrity.\n\nA is superficial sanitization. C trusts untrusted clients. D provides no security control.'
  },

  {
    id: 196,
    category: 'Testing',
    difficulty: 'Hard',
    examDomain: 'Review',
    objectiveTags: ['testing-strategy', 'risk-based-testing', 'checkout'],
    question: 'You are reviewing a checkout customization that modifies totals, payment method availability, and order placement observers. Team only wrote unit tests with mocks. What additional test set is most critical before release?',
    options: [
      { id: 'A', text: 'No additional tests; unit tests already validate business logic.' },
      { id: 'B', text: 'Add integration tests for totals/order placement and at least one end-to-end functional path to validate framework wiring and data persistence.' },
      { id: 'C', text: 'Add only visual regression tests on checkout pages.' },
      { id: 'D', text: 'Replace all unit tests with manual QA sign-off.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct. Checkout changes cross DI wiring, DB transactions, and framework orchestration that mocks cannot fully represent. Integration plus targeted E2E gives high-confidence coverage.\n\nA misses integration risk. C covers UI only. D reduces repeatability and safety.'
  },
  {
    id: 197,
    category: 'Testing',
    difficulty: 'Medium',
    examDomain: 'Review',
    objectiveTags: ['mftf', 'flaky-tests', 'stability'],
    question: 'An MFTF scenario fails intermittently after asynchronous index updates. Engineers inserted fixed `wait(20)` steps and failures dropped but CI time doubled. What is the better solution?',
    options: [
      { id: 'A', text: 'Keep fixed waits because stability is more important than speed.' },
      { id: 'B', text: 'Replace static waits with condition-based waits/assertions tied to UI state or backend completion signals.' },
      { id: 'C', text: 'Disable flaky test from pipeline and run weekly.' },
      { id: 'D', text: 'Convert MFTF test to unit test to remove browser timing variance.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct. Condition-based waits reduce nondeterminism and runtime while preserving intent.\n\nA accumulates pipeline latency and still flakes under variance. C hides risk. D changes test scope and no longer validates user workflow.'
  },
  {
    id: 198,
    category: 'Testing',
    difficulty: 'Hard',
    examDomain: 'Review',
    objectiveTags: ['contract-testing', 'service-contracts', 'backward-compatibility'],
    question: 'A module exposes a service contract consumed by three internal modules and one external integration. A refactor changes response field nullability. Which testing strategy best guards compatibility?',
    options: [
      { id: 'A', text: 'Only run unit tests for the refactored module.' },
      { id: 'B', text: 'Add contract/integration tests asserting schema and behavior invariants, including nullability expectations and extension attribute presence.' },
      { id: 'C', text: 'Run static analysis only because interfaces compile.' },
      { id: 'D', text: 'Rely on staging smoke test that checks HTTP 200 responses.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct. Compatibility depends on behavior guarantees, not compile success alone. Contract tests catch subtle serialization and nullability breaks before release.\n\nA, C, and D are insufficient for cross-module consumer safety.'
  },
  {
    id: 199,
    category: 'Testing',
    difficulty: 'Hard',
    examDomain: 'Review',
    objectiveTags: ['performance-testing', 'release-gates', 'regression-prevention'],
    question: 'A high-traffic merchant had repeated regressions where category page TTFB increased after feature releases. Which architect-level quality gate is most effective?',
    options: [
      { id: 'A', text: 'Manual spot checks in browser before deployment.' },
      { id: 'B', text: 'Automated performance baseline tests in CI with threshold gates for key paths and trend reporting over builds.' },
      { id: 'C', text: 'Post-release monitoring only; rollback if issue appears.' },
      { id: 'D', text: 'Enforce PHP code style stricter rules.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct. Reliable prevention requires pre-release quantitative gates plus historical trend visibility.\n\nA and C are reactive. D improves consistency but does not detect runtime performance regressions.'
  },

  {
    id: 200,
    category: 'Database',
    difficulty: 'Hard',
    examDomain: 'Review',
    objectiveTags: ['database-design', 'query-optimization', 'reporting'],
    question: 'A custom admin report joins `sales_order`, `sales_order_item`, and two EAV tables and now takes 35 seconds on production data. Business needs sub-3-second response for date-range reports. Which option is best?',
    options: [
      { id: 'A', text: 'Run the same query on every request and increase MySQL buffer sizes.' },
      { id: 'B', text: 'Introduce a purpose-built denormalized reporting table/materialized snapshot updated asynchronously, with indexed query dimensions.' },
      { id: 'C', text: 'Use `SELECT *` and paginate at PHP layer to reduce DB time.' },
      { id: 'D', text: 'Move report generation into frontend JavaScript loops.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct for operational reporting at scale. OLTP schemas are not optimized for heavy analytical joins; asynchronous projection tables are standard architecture for fast reads.\n\nA may help marginally but does not change complexity class. C and D worsen data transfer and processing overhead.'
  },
  {
    id: 201,
    category: 'Database',
    difficulty: 'Medium',
    examDomain: 'Review',
    objectiveTags: ['index-strategy', 'query-plan', 'database-review'],
    question: 'A query filtering by `(store_id, status, created_at)` scans millions of rows. Existing indexes are on each single column only. What is the best review recommendation?',
    options: [
      { id: 'A', text: 'Add one composite index aligned to filter selectivity/order and verify with EXPLAIN.' },
      { id: 'B', text: 'Add indexes to every column in the table to maximize optimizer choices.' },
      { id: 'C', text: 'Disable indexes to speed up inserts and rely on cache.' },
      { id: 'D', text: 'Sort in PHP to avoid SQL planner complexity.' }
    ],
    correctAnswers: ['A'],
    explanation: 'A is correct. Composite indexes aligned with predicate and sorting patterns usually outperform multiple single-column indexes for this workload. EXPLAIN confirms plan quality.\n\nB increases write cost and often harms plan selection. C is destructive for read performance. D moves work away from the database engine optimized for it.'
  },
  {
    id: 202,
    category: 'Database',
    difficulty: 'Hard',
    examDomain: 'Review',
    objectiveTags: ['data-retention', 'archiving', 'operational-readiness'],
    question: 'Order tables exceeded 400M rows and maintenance windows cannot complete. Legal requires 7-year retention but hot-path operations only need 18 months. Which strategy is most appropriate?',
    options: [
      { id: 'A', text: 'Delete old orders permanently to restore performance.' },
      { id: 'B', text: 'Archive older records to a separate data store/schema with governed access and keep operational tables lean, plus documented restore/report pathways.' },
      { id: 'C', text: 'Keep all rows in primary tables and double DB CPU.' },
      { id: 'D', text: 'Export CSV once and remove database backups.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct: it balances legal retention, operational performance, and auditability. Architectures should separate hot operational workload from long-term historical access.\n\nA violates retention policy. C is expensive and often insufficient. D undermines recoverability and governance.'
  },

  {
    id: 203,
    category: 'Configuration & XML',
    difficulty: 'Hard',
    examDomain: 'Review',
    objectiveTags: ['xml-merge-rules', 'module-sequence', 'debugging-config'],
    question: 'A custom total collector intermittently disappears after deployments with different module sets enabled. `sales.xml` definitions exist in multiple modules with similar item names. What should review focus on first?',
    options: [
      { id: 'A', text: 'Raise PHP memory limit to ensure XML merge completes.' },
      { id: 'B', text: 'Inspect XML merge precedence, duplicate item keys, and module sequence dependencies to ensure deterministic collector registration.' },
      { id: 'C', text: 'Move collector declaration to `config.php` for stronger priority.' },
      { id: 'D', text: 'Clear browser cache after deployment.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct. Collector disappearance across module combinations strongly suggests merge-key collision or sequence-related override behavior. Deterministic naming and explicit dependency order are required.\n\nA and D are unrelated. C misuses configuration location and does not solve merge semantics.'
  },
  {
    id: 204,
    category: 'Configuration & XML',
    difficulty: 'Medium',
    examDomain: 'Review',
    objectiveTags: ['area-specific-di', 'configuration-scope', 'review-findings'],
    question: 'A team placed admin-only preference overrides in global `etc/di.xml`. API behavior changed unexpectedly. Which correction should be recommended?',
    options: [
      { id: 'A', text: 'Keep global config and add conditionals in class methods for admin area.' },
      { id: 'B', text: 'Move overrides to `etc/adminhtml/di.xml` so scope is limited to admin area.' },
      { id: 'C', text: 'Use plugins with runtime checks for every method call.' },
      { id: 'D', text: 'Duplicate class and switch via composer autoload for backend requests.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct. Area-specific DI is the intended mechanism to avoid cross-area behavior bleed.\n\nA and C add runtime complexity and overhead. D is brittle and hard to maintain.'
  },

  {
    id: 205,
    category: 'Logging & Debugging',
    difficulty: 'Hard',
    examDomain: 'Review',
    objectiveTags: ['observability', 'distributed-tracing', 'incident-debugging'],
    question: 'An order request traverses CDN -> web node -> Adobe Commerce -> middleware -> ERP. Incident resolution takes hours because logs cannot be correlated across systems. Which architecture change provides the highest diagnostic value?',
    options: [
      { id: 'A', text: 'Increase each system log level to DEBUG permanently.' },
      { id: 'B', text: 'Introduce end-to-end correlation IDs propagated through HTTP headers, queue metadata, and structured logs; include it in alert payloads.' },
      { id: 'C', text: 'Store all logs in local files on each node for faster writes.' },
      { id: 'D', text: 'Disable retry logic so failures appear only once.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct. Correlation IDs are foundational for distributed debugging and mean-time-to-resolution reduction. Structured propagation across sync and async boundaries preserves causality.\n\nA increases noise/cost without joinability. C fragments observability. D harms resilience.'
  },

  {
    id: 206,
    category: 'Adobe Commerce Cloud',
    difficulty: 'Hard',
    examDomain: 'ConfigureDeploy',
    objectiveTags: ['cloud-deployment', 'build-deploy-phases', 'zero-downtime'],
    question: 'A team runs `setup:upgrade` and cache warmup in the Cloud build phase to shorten deploy time. Deploys intermittently fail and rollback. What is the correct phase strategy?',
    options: [
      { id: 'A', text: 'Keep current approach; build is always safest for all commands.' },
      { id: 'B', text: 'Run compile/static build artifacts in build phase, execute environment-dependent operations (DB/schema/config) in deploy, and use post-deploy for warmup/health checks.' },
      { id: 'C', text: 'Move everything to post-deploy to avoid deploy lock.' },
      { id: 'D', text: 'Run all commands manually on production after deployment.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct. Build should create immutable artifacts; deploy handles runtime environment and database-sensitive actions; post-deploy handles non-critical warmup and verification.\n\nA and C blur phase responsibilities and increase risk. D removes repeatability and automation safety.'
  },
  {
    id: 207,
    category: 'Adobe Commerce Cloud',
    difficulty: 'Medium',
    examDomain: 'ConfigureDeploy',
    objectiveTags: ['environment-variables', 'configuration-management', 'cloud-ops'],
    question: 'Different environments show inconsistent Redis/session behavior. Team committed env-specific values in module config and partially in `.magento.env.yaml`. What should the architect enforce?',
    options: [
      { id: 'A', text: 'Keep mixed approach so each team can choose preferred config location.' },
      { id: 'B', text: 'Centralize environment-specific runtime configuration in Cloud env mechanisms/variables with clear precedence documentation and remove environment-specific values from code artifacts.' },
      { id: 'C', text: 'Store all environment differences in frontend `.env` files.' },
      { id: 'D', text: 'Hardcode production settings and copy DB to lower environments weekly.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct because it preserves twelve-factor style separation of code and environment, improving predictability across stages.\n\nA creates drift. C is wrong scope. D is unsafe and non-compliant for many orgs.'
  },
  {
    id: 208,
    category: 'Deployment & Cloud',
    difficulty: 'Hard',
    examDomain: 'ConfigureDeploy',
    objectiveTags: ['deployment-strategy', 'backward-compatible-migrations', 'release-safety'],
    question: 'You deploy weekly with near-zero downtime requirement. A feature introduces schema changes and code relying on new columns. What rollout pattern is safest?',
    options: [
      { id: 'A', text: 'Deploy code and destructive schema change together, then flush all caches.' },
      { id: 'B', text: 'Use backward-compatible expand/migrate/contract sequence across releases: add nullable/new structures first, dual-write/read as needed, then remove old schema only after full cutover.' },
      { id: 'C', text: 'Run schema changes manually after traffic drops at night.' },
      { id: 'D', text: 'Disable old code paths with feature flags before schema exists.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct and is the standard safe migration pattern for continuous delivery. It keeps old and new versions compatible during rollout windows and rollback scenarios.\n\nA risks runtime breakage. C is operationally fragile. D can break before dependencies are ready.'
  },
  {
    id: 209,
    category: 'Caching',
    difficulty: 'Hard',
    examDomain: 'ConfigureDeploy',
    objectiveTags: ['cache-invalidation', 'fastly-varnish', 'operational-readiness'],
    question: 'After each deployment, homepage and category cache hit ratio drops below 20% for 30 minutes, causing backend saturation. What is the best cache strategy improvement?',
    options: [
      { id: 'A', text: 'Purge all cache globally on every release to guarantee correctness.' },
      { id: 'B', text: 'Adopt targeted tag-based invalidation and controlled warmup of critical routes (home, top categories, PDP hot set) before opening full traffic.' },
      { id: 'C', text: 'Disable Varnish and rely only on application cache.' },
      { id: 'D', text: 'Lower TTL to 30 seconds to refill faster.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct. Tag-scoped invalidation plus warmup prevents avoidable cold-start storms and preserves origin capacity.\n\nA over-purges and creates thundering herd effects. C removes a critical performance layer. D reduces cache utility and can worsen load.'
  },
  {
    id: 210,
    category: 'Web API',
    difficulty: 'Hard',
    examDomain: 'ConfigureDeploy',
    objectiveTags: ['webapi', 'async-bulk', 'operational-scaling'],
    question: 'A partner sends 200k product stock updates during peak hours through synchronous REST calls, causing API saturation and checkout latency spikes. Which architecture should be implemented?',
    options: [
      { id: 'A', text: 'Increase PHP-FPM workers and keep synchronous endpoint pattern.' },
      { id: 'B', text: 'Move integration to async bulk API/queue-based ingestion with idempotent payload keys and consumer autoscaling policies.' },
      { id: 'C', text: 'Throttle checkout endpoints so stock updates can complete first.' },
      { id: 'D', text: 'Ask partner to split calls across more IP addresses.' }
    ],
    correctAnswers: ['B'],
    explanation: 'B is correct because high-volume data ingestion should be decoupled from synchronous request paths. Async bulk processing smooths load, supports retries, and protects customer-facing latency.\n\nA scales symptoms only. C harms revenue-critical flows. D sidesteps architecture and can worsen abuse controls.'
  }
]

function ensureMappings(sourceQuestions) {
  const missing = new Set()
  for (const q of sourceQuestions) {
    if (!categoryDomainMap[q.category]) missing.add(q.category)
  }

  if (missing.size) {
    throw new Error(`Missing domain mapping for categories: ${Array.from(missing).join(', ')}`)
  }
}

function normalizeExisting(sourceQuestions) {
  return sourceQuestions.map((q) => ({
    ...q,
    examDomain: categoryDomainMap[q.category],
    objectiveTags: categoryTagMap[q.category] || []
  }))
}

function getCountsByDomain(all) {
  return all.reduce((acc, q) => {
    acc[q.examDomain] = (acc[q.examDomain] || 0) + 1
    return acc
  }, {})
}

ensureMappings(questions)

const currentMaxId = Math.max(...questions.map((q) => q.id))
if (currentMaxId + 1 !== newQuestions[0].id) {
  throw new Error(`Expected first new question ID to be ${currentMaxId + 1}, got ${newQuestions[0].id}`)
}

const normalized = normalizeExisting(questions)
const merged = [...normalized, ...newQuestions]

const domainCounts = getCountsByDomain(merged)
if (domainCounts.Design !== 97 || domainCounts.Review !== 67 || domainCounts.ConfigureDeploy !== 46) {
  throw new Error(`Unexpected domain counts after merge: ${JSON.stringify(domainCounts)}`)
}

const idSet = new Set()
for (const q of merged) {
  if (idSet.has(q.id)) {
    throw new Error(`Duplicate question ID found: ${q.id}`)
  }
  idSet.add(q.id)
}

fs.writeFileSync(questionsPath, `${JSON.stringify(merged, null, 2)}\n`)

console.log('Question bank rebalanced successfully.')
console.log(`Total questions: ${merged.length}`)
console.log('Domain counts:', domainCounts)
