# 🎉 Trenuci za pamćenje — Event Reservation App

A **frontend-only Angular application** developed for faculty (PKI) purposes. It simulates
an event-organization platform where an **organizer (admin)** manages events, promotions and
reservation requests, and **consumers** browse events, leave reviews, build a reservation cart
and track the status of their requests.

The app is fully client-side — there is no backend. All data lives in memory and is seeded on
startup.

**🔗 Live demo:** [https://pki-project-f7f86.web.app/](https://pki-project-f7f86.web.app/)

---

## 🧰 Tech Stack

| Area | Technology |
|------|------------|
| Framework | **Angular 19** (standalone components, no `NgModule`s) |
| Language | **TypeScript 5.6** |
| UI / Styling | **Bootstrap 5.3**, **Bootstrap Icons**, custom component-scoped CSS |
| Angular UI | **Angular Material 19** + **Angular CDK** (datepicker, form fields, inputs, selects) |
| Reactive / async | **RxJS 7.8** |
| Pagination | **ngx-pagination** |
| Date handling | **date-fns** |
| Fonts | Google Fonts (Beiruti, Montserrat, BenchNine, Beau Rivage) |
| Testing | **Karma** + **Jasmine** (scaffolding) |
| Hosting | **Firebase Hosting** (SPA rewrites configured) |

---

## 🏗️ Architecture & Implementation

The application follows a modern Angular 19 structure and demonstrates several core framework concepts:

- **Standalone components** — the project uses Angular's standalone API throughout
  (`app.config.ts` with `provideRouter`), with **no `NgModule`s**.
- **Lazy loading** — feature routes are loaded on demand via `loadComponent()` dynamic imports,
  keeping the initial bundle small.
- **Role-based routing** — two separate route trees, `organizator/:userName` and `kupac/:userName`,
  each with its own layout shell, header and child routes.
- **Route guards** — a `CanActivate` `AuthGuard` protects every authenticated route. It checks the
  logged-in user in `sessionStorage` and verifies that the `:userName` in the URL matches the
  current session, redirecting to `/login` (no session) or `/unauthorized` (mismatched user).
- **Session handling** — the active username is stored in `sessionStorage`; login redirects users
  to their role-specific route tree.
- **Reactive & template-driven forms** — the login and profile forms use `ReactiveFormsModule` with
  validators (required, min-length) for as-you-type feedback; other forms use `FormsModule`.
- **Modal / popup pattern** — dialog-style components (promotion, event change, change-password)
  are composed into their parent components and toggled via component state.
- **Notification system** — reservation approvals/rejections push notification objects to the
  consumer, rendered in a dropdown in the header with an unread counter and per-message "mark as read".
- **Responsive layout** — Bootstrap grid + custom CSS with a mobile hamburger menu and breakpoint
  utilities (`d-none d-md-block`, etc.).

### State & Data Layer

There is **no HTTP backend**. State is held in two root-provided injectable services:

- **`LogInService`** — seeds the user list, handles login/logout, exposes `getUser`, `updateUser`
  and `updatePassword`.
- **`OrganizatorService`** — the central in-memory store for **promotions, events, reviews, cart
  items, reservations and notifications**, exposing CRUD-style methods (`getEvents`, `addEvent`,
  `updateEvent`, `removeEvent`, `leaveReview`, `addToCart`, `reserveEvent`, `acceptReservation`,
  `declineReservation`, etc.).

Domain models are defined as TypeScript interfaces in `src/app/models/`:
`User`, `EventModel`, `Review`, `Promotion`, `CartItem`, `Reservation`, `Notification`.

### Project Structure
src/app/
├── models/                     # TypeScript domain interfaces
├── services/                   # LogInService, OrganizatorService (in-memory state)
├── authGuard/                  # AuthGuard (CanActivate)
├── login/  logout/             # Authentication
├── organizator/  kupac/        # Role-specific layout shells (route trees)
├── header/  header-kupac/      # Role-specific navigation headers
├── homepage-org/  homepage-kupac/
├── events/  events-kupac/      # Event listing (paginated)
├── event-details/  event-details-kupac/
├── add-event/  event-change-popup/
├── promotions-popup/           # Promotion add/edit dialog
├── cart/  reservations/        # Consumer cart & reservations
├── reservations-organizator/   # Admin reservation requests
├── my-profile/  change-password-popup/
├── about-us/
├── not-found/  unauthorized/   # Error routes
├── app.routes.ts               # Route definitions (lazy-loaded)
└── app.config.ts               # App-level providers

---

## 👤 User Types

The following users are seeded at startup:

- **Admin (Organizer)**
  **Credentials:** `organizator123` / `123456`

- **Consumer**
  **Credentials:** `kupac123` / `123456`

- **Consumer**
  **Credentials:** `kupac` / `123456`

---

## 📋 Available Operations

### 🛠️ Admin (Organizer)

1. Login (with as-you-type feedback on credential format, and after-submit feedback on correctness).
2. Logout (redirects to the login page).
3. Add new promotion (select an available event and enter a description; promotions are shown as a
   slideshow on the homepage for every user type).
4. Modify a promotion (change the linked event and/or the description).
5. See all promotions on the homepage as a slideshow.
6. View and edit personal information (first name, last name, phone number, address, and password —
   changing the password also requires the current one).
7. Browse all available events (paginated, with picture, name and price).
8. View detailed event information (picture, name, description, price, and reviews).
9. Modify an event (picture, name, description, and/or price).
10. Delete an event.
11. Add a new event (picture, name, description, and price).
12. See all reservation requests from consumers.
13. Accept a reservation request.
14. Reject a reservation request.

### 🛒 Consumer

1. Login (with as-you-type format feedback and after-submit correctness feedback).
2. Logout (redirects to the login page).
3. See all promotions on the homepage as a slideshow.
4. View and edit personal information (first name, last name, phone number, address, and password —
   changing the password also requires the current one).
5. Browse all available events (paginated, with picture, name and price).
6. View detailed event information (picture, name, description, price, and reviews).
7. Leave one review per event.
8. Add an event to the reservation cart.
9. View all events in the reservation cart.
10. Submit reservation requests (by entering a date and number of guests).
11. Remove events from the reservation cart.
12. Track reservation requests (event name, date, number of guests, and status).
13. Get notified about reservation status — a notification is pushed when the admin accepts or
    rejects a request, and can be marked as read.
14. View information about the advertiser.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** and **npm**
- **Angular CLI 19** (`npm install -g @angular/cli`)

### Install & Run

```bash
npm install
ng serve

Then open http://localhost:4200/. The app reloads automatically on source changes.

📄 Notes
* The app is responsive — it works across different resolutions and devices, including a dedicated mobile navigation menu.
* The app implements no data persistence. All state is held in memory and is reset to its initial seeded state on page refresh.
* The interface language is Serbian.
