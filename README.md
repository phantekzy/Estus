# Estus Engine | Distributed Task Processing System

Estus Engine is a high-performance, asynchronous task offloading architecture designed to eliminate request-response latency in distributed systems. By decoupling task ingestion from execution, the engine ensures 100% availability for client-side interactions while handling heavy computational workloads in the background.

## System Architecture

The engine utilizes a Producer-Consumer pattern orchestrated via a Redis-backed message broker.

1.  **Ingestion (Producer):** An Express v5 server validates incoming JSON payloads via Zod schemas. Upon validation, tasks are serialized and pushed to the Redis queue.
2.  **Orchestration (Broker):** Managed by Redis, the system handles state transitions (Waiting, Active, Completed, Failed). Persistence is guaranteed via Redis RDB/AOF snapshots.
3.  **Execution (Consumer):** A dedicated BullMQ Worker process monitors the queue, executing business logic (e.g., SMTP dispatch, data aggregation) with isolated error boundaries.

---

## Technical Specifications

### Resiliency & Fault Tolerance
* **Stalled Job Detection:** Automatic detection of worker process crashes. Lost tasks are transparently re-queued to prevent data loss.
* **Exponential Backoff:** Configurable retry strategy to mitigate downstream service exhaustion:
    * Attempts: 3
    * Backoff Strategy: Exponential
    * Initial Delay: 1000ms

### Full-Stack Type Safety
The system maintains a unified TypeScript interface layer. The 'JobPayload' contract is strictly enforced from the React frontend through the API layer to the background worker, ensuring structural integrity across the wire.

## Tech Stack

* **Runtime:** Node.js (ESM)
* **Infrastructure:** Redis (Orchestrated via Podman)
* **API Layer:** Express v5
* **Validation:** Zod v4
* **UI Layer:** React 19 / Vite / Tailwind CSS v4

---

## Environment Configuration

Copy the required variables into a local .env file. Ensure .env is included in your .gitignore to prevent sensitive data leaks.

### Backend Configuration
- **PORT**: The port the Express server listens on.
- **REDIS_HOST**: Endpoint for the Redis broker.
- **REDIS_PORT**: Port for the Redis broker.

### Frontend Configuration
- **VITE_API_URL**: The base URL for the backend API.

---

## Deployment & Development

### 1. Initialize Redis (Podman)
podman run -d --name estus-redis -p 6379:6379 redis:alpine

### 2. Ignition
# Start Backend
cd backend && npm run dev

# Start Frontend
cd frontend && npm run dev

---

## Monitoring
The system provides granular logging for lifecycle tracking:
* [Worker] Processing Job ID: <uuid> - Task pickup.
* [Worker] Job Execution Completed - Logic termination.
* [Worker] Job Failed - Error stack traces for debugging.

