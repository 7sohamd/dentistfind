# Practice Dashboard

A modern, responsive dashboard for monitoring dental practice performance metrics.

## Features

- **Multi-practice overview**: View key metrics for multiple dental practices at a glance
- **Performance tracking**: Monitor conversion rates, patient counts, and appointment requests
- **Trend visualization**: 6-month patient trend charts with interactive hover states
- **Smart recommendations**: AI-driven actionable insights based on practice performance
- **Responsive design**: Mobile-first approach that adapts from phone to desktop
- **Type-safe**: Built with TypeScript for robust code quality

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for utility-first styling
- **Vite** for fast development and optimized builds

## Project Structure

```
src/
├── components/
│   ├── StatusBadge.tsx       # Performance status indicators
│   ├── MetricCard.tsx         # Reusable metric display
│   ├── TrendBars.tsx          # 6-month trend chart
│   ├── Recommendations.tsx    # Smart recommendations
│   └── PracticeSummaryCard.tsx # Main card component
├── types.ts                   # TypeScript type definitions
├── helpers.ts                 # Utility functions & business logic
├── mockData.ts                # Sample practice data
├── App.tsx                    # Main application wrapper
└── index.css                  # Tailwind imports & global styles
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

## Q2 – Approach, Code Quality & Decision-Making

### 1. Component & Styling Decisions

#### 1.1 Why did you structure your components the way you did?

I broke down the Practice Summary dashboard into modular, reusable components for better maintainability and scalability:

- **PracticeSummaryCard** – Main container component that orchestrates the card layout and data flow
- **StatusBadge** – Self-contained badge component for performance status indicators
- **MetricCard** – Reusable metric display component used across different data points
- **TrendBars** – Chart visualization component with its own rendering logic
- **Recommendations** – Business logic-driven recommendations list

This structure provides several benefits:

- **Reusability**: Components like `MetricCard` and `StatusBadge` can be used across different dashboard views
- **Testability**: Each component has a single responsibility, making unit testing straightforward
- **Readability**: Smaller components are easier to understand and modify
- **Separation of concerns**: UI rendering, business logic (helpers), and data types are cleanly separated
- **Easier scaling**: New features can be added by creating new components or extending existing ones

Additionally, I extracted helper functions (`getStatusFromConversionRate`, `formatPercent`, `getRecommendations`) into a separate `helpers.ts` file, separating business logic from presentation.

#### 1.2 Why did you choose your styling approach?

I used **Tailwind CSS** for the following reasons:

- **Speed under time constraints**: Utility-first approach allows rapid prototyping without writing custom CSS
- **Consistency**: Tailwind's design system ensures consistent spacing, colors, and typography out of the box
- **Responsive design**: Built-in responsive modifiers (`md:`, `lg:`) make mobile-first design straightforward
- **Maintainability**: No CSS file sprawl; styles are co-located with components
- **Predictable**: Utility classes eliminate CSS specificity issues and naming conflicts
- **Production-ready**: Tailwind's purge process removes unused CSS, keeping bundle sizes minimal

This approach allowed me to focus on component logic and user experience rather than managing complex CSS architectures.

#### 1.3 How did you ensure visual consistency and responsiveness?

I implemented several strategies to maintain consistency:

- **Tailwind's spacing scale**: Used consistent spacing tokens (`gap-6`, `p-6`, `mb-8`) instead of arbitrary pixel values
- **Typography hierarchy**: Consistent text sizing (`text-sm`, `text-2xl`, `text-3xl`) and weights (`font-medium`, `font-bold`)
- **Color palette**: Leveraged Tailwind's semantic color system (`gray-900`, `emerald-500`, `blue-700`) for consistent theming
- **Border radius & shadows**: Standard values (`rounded-xl`, `shadow-sm`, `shadow-md`) applied uniformly
- **Responsive grid layout**: Mobile-first approach with `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` for adaptive layouts
- **Flexbox utilities**: Used flex utilities for proper alignment and spacing within cards
- **Hover states**: Consistent interaction patterns (`hover:shadow-md`, `hover:border-gray-300`)

The layout adapts seamlessly from mobile (stacked cards) to tablet (2-column grid) to desktop (3-column grid).

### 2. Scaling & Real-World Use

#### 2.1 How would you integrate this card into a larger PracticeFuel dashboard?

- Create a **component library structure** with shared UI primitives (buttons, badges, metrics)
- Implement **design tokens** for colors, spacing, typography, and breakpoints
- Add **theming support** (light/dark mode) using CSS variables or Tailwind's dark mode
- Build a **props-based component API** for flexible configuration (e.g., `variant`, `size`, `theme`)
- Document components in **Storybook** for design system visibility and testing
- Establish **shared UI patterns** (loading states, error states, empty states) used consistently across the dashboard
- Use a **context/provider pattern** for global state (user preferences, theme, locale)

#### 2.2 What would you add/change if you had one extra day?

- **Accessibility improvements**: Add ARIA labels, keyboard navigation, focus management, and ensure WCAG AA color contrast
- **Animations**: Smooth transitions for hover states, skeleton loaders for data fetching, micro-interactions
- **Testing**: Write unit tests with React Testing Library and integration tests for component interactions
- **Better loading states**: Implement skeleton screens and granular loading indicators
- **Error handling**: Add error boundaries and user-friendly error messages
- **Localization**: Add i18n support for multi-language dashboard views
- **Performance optimization**: Memoize expensive calculations, virtualize long lists if needed
- **Advanced theming**: Custom color palettes per practice or user preference
- **Data visualization enhancements**: Interactive tooltips, clickable chart elements, drill-down capabilities

### 3. Time Management

Here's how I allocated the 2-hour timeframe:

- **Setup & planning (15 minutes)**: Project initialization, dependency installation, understanding requirements
- **Component structure & types (30 minutes)**: Created type definitions, component scaffolding, and helper functions
- **Layout & styling (45 minutes)**: Implemented UI components with Tailwind, responsive grid, and visual polish
- **Data integration & testing (20 minutes)**: Connected mock data, tested responsive behavior, verified functionality
- **Documentation (10 minutes)**: Code comments, README preparation, final review

## License

MIT
