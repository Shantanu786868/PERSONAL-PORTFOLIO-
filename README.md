# Shantanu Sharma - Personal Portfolio Website

A modern, production-ready personal portfolio website for a BCA student and aspiring Frontend Developer.

## Features

- Modern, futuristic design with glassmorphism effects
- Dark theme with elegant color palette
- Smooth animations using Framer Motion
- Particle background effects
- Fully responsive (mobile, tablet, desktop)
- Authentication system (Login, Register, Dashboard)
- Contact form with validation
- Project showcase with filtering and search
- Skills visualization with animated progress bars
- SEO-friendly structure

## Tech Stack

- **React 18** - Frontend library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Supabase** - Authentication and database
- **Lucide React** - Icons
- **React Type Animation** - Typing effects

## Pages

1. **Home** - Hero section, featured projects, testimonials
2. **About** - Education timeline, skills, career goals
3. **Projects** - Project showcase with filtering and search
4. **Skills & Experience** - Technical skills, work experience, certifications
5. **Contact** - Contact form with validation
6. **Login/Register** - Authentication pages
7. **Dashboard** - User dashboard with analytics

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/shantanu/portfolio.git

# Navigate to project directory
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Import your repository on [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables
6. Deploy!

## Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ParticleBackground.jsx
│   ├── Loading.jsx
│   ├── ScrollToTop.jsx
│   ├── ThemeToggle.jsx
│   └── ProtectedRoute.jsx
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Projects.jsx
│   ├── Skills.jsx
│   ├── Contact.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Dashboard.jsx
├── lib/
│   └── supabase.js
├── App.jsx
├── main.jsx
└── index.css
```

## Design System

### Colors

- **Background**: #0F172A
- **Primary**: #3B82F6 (Blue)
- **Secondary**: #8B5CF6 (Purple)
- **Accent**: #06B6D4 (Cyan)

### Features

- Glassmorphism effects
- Glowing borders
- Gradient text
- Animated skill bars
- Smooth page transitions
- Particle background

## License

MIT License - feel free to use this for your own portfolio!

## Contact

- Email: shantanu@example.com
- LinkedIn: https://linkedin.com/in/shantanu
- GitHub: https://github.com/shantanu

---

Made with React and Tailwind CSS by Shantanu Sharma
