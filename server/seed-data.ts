import { storage } from "./storage";

export async function seedDatabase() {
  try {
    // Create categories in the correct order
    const categories = [
      {
        name: "Hosting & Installation",
        slug: "hosting",
        description: "Learn about web hosting, domain setup, and WordPress installation",
        order: 1
      },
      {
        name: "WordPress Fundamentals", 
        slug: "fundamentals",
        description: "Master the basics of WordPress dashboard, settings, and security",
        order: 2
      },
      {
        name: "Content & Structure",
        slug: "content", 
        description: "Advanced content management, custom post types, and user roles",
        order: 3
      },
      {
        name: "Theme Development",
        slug: "themes",
        description: "Build and customize WordPress themes from scratch",
        order: 4
      },
      {
        name: "Plugin Development", 
        slug: "plugins",
        description: "Create powerful WordPress plugins and extend functionality",
        order: 5
      },
      {
        name: "API & Headless WordPress",
        slug: "api",
        description: "REST API, custom endpoints, and headless WordPress development", 
        order: 6
      },
      {
        name: "Performance & SEO",
        slug: "performance",
        description: "Optimize performance, SEO, and deploy WordPress sites",
        order: 7
      }
    ];

    // Create categories
    const createdCategories = [];
    for (const category of categories) {
      const created = await storage.createCategory(category);
      createdCategories.push(created);
    }

    // Create lessons for each category
    const lessons = [
      // Hosting & Installation (1-4)
      {
        title: "Choosing a Hosting Provider",
        slug: "choosing-hosting-provider",
        description: "Compare shared, VPS, and cloud hosting. Learn about the best WordPress hosts like SiteGround, Cloudways, and NameHero.",
        content: "# Choosing the Right WordPress Host\n\nSelecting the right hosting provider is crucial for your WordPress website's success...",
        duration: 45,
        order: 1,
        categoryId: createdCategories.find(c => c.slug === 'hosting')?.id,
        type: "free" as const,
        practiceExercise: JSON.stringify({
          title: "Compare Hosting Plans",
          description: "Research and compare hosting plans from different providers",
          tasks: ["Compare pricing", "Check performance features", "Review support options"]
        })
      },
      {
        title: "Domain Setup, SSL & DNS",
        slug: "domain-ssl-dns-setup", 
        description: "Learn how to set up domains, configure SSL certificates, and manage DNS settings for your WordPress site.",
        content: "# Domain and SSL Configuration\n\nProperly configuring your domain and SSL is essential for security and SEO...",
        duration: 30,
        order: 2,
        categoryId: createdCategories.find(c => c.slug === 'hosting')?.id,
        type: "free" as const
      },
      {
        title: "Installing WordPress on a Host",
        slug: "installing-wordpress-host",
        description: "Master cPanel installation using Softaculous, manual FTP installation, and setting up staging environments.",
        content: "# WordPress Installation Methods\n\nThere are several ways to install WordPress on your hosting account...",
        duration: 40,
        order: 3,
        categoryId: createdCategories.find(c => c.slug === 'hosting')?.id,
        type: "free" as const,
        practiceExercise: JSON.stringify({
          title: "Install WordPress",
          description: "Practice installing WordPress using different methods",
          tasks: ["One-click install via cPanel", "Manual FTP installation", "Set up staging site"]
        })
      },
      {
        title: "Local WordPress Development",
        slug: "local-wordpress-development",
        description: "Set up local development environments using LocalWP, XAMPP, MAMP, and DevKinsta for faster development.",
        content: "# Local Development Setup\n\nWorking locally speeds up development and allows you to test changes safely...",
        duration: 35,
        order: 4,
        categoryId: createdCategories.find(c => c.slug === 'hosting')?.id,
        type: "premium" as const
      },

      // WordPress Fundamentals (5-8)
      {
        title: "WordPress Dashboard Mastery",
        slug: "wordpress-dashboard-mastery",
        description: "Navigate the WordPress dashboard, understand user roles, manage media, and configure essential settings.",
        content: "# Mastering the WordPress Dashboard\n\nThe WordPress dashboard is your control center...",
        duration: 50,
        order: 5,
        categoryId: createdCategories.find(c => c.slug === 'fundamentals')?.id,
        type: "free" as const,
        practiceExercise: JSON.stringify({
          title: "Dashboard Navigation",
          description: "Complete common dashboard tasks",
          tasks: ["Create user accounts", "Upload and organize media", "Configure general settings"]
        })
      },
      {
        title: "WordPress Security Essentials",
        slug: "wordpress-security-essentials",
        description: "Secure your WordPress site by changing default settings, implementing security plugins like Wordfence, and following best practices.",
        content: "# WordPress Security Best Practices\n\nSecurity should be your top priority when managing WordPress sites...",
        duration: 45,
        order: 6,
        categoryId: createdCategories.find(c => c.slug === 'fundamentals')?.id,
        type: "free" as const
      },
      {
        title: "Installing & Managing Themes",
        slug: "installing-managing-themes",
        description: "Install themes, compare free vs premium options, and customize using Astra, OceanWP, and GeneratePress.",
        content: "# WordPress Themes Deep Dive\n\nThemes control the appearance and functionality of your WordPress site...",
        duration: 55,
        order: 7,
        categoryId: createdCategories.find(c => c.slug === 'fundamentals')?.id,
        type: "free" as const,
        practiceExercise: JSON.stringify({
          title: "Theme Customization",
          description: "Install and customize a WordPress theme",
          tasks: ["Install a theme", "Customize via Customizer", "Create child theme"]
        })
      },
      {
        title: "Essential WordPress Plugins",
        slug: "essential-wordpress-plugins",
        description: "Discover must-have plugins for SEO, caching, backups, and security. Learn to avoid plugin conflicts and debug issues.",
        content: "# Essential WordPress Plugins\n\nPlugins extend WordPress functionality beyond the core features...",
        duration: 40,
        order: 8,
        categoryId: createdCategories.find(c => c.slug === 'fundamentals')?.id,
        type: "premium" as const
      },

      // Content & Structure (9-12)
      {
        title: "Custom Post Types & Taxonomies",
        slug: "custom-post-types-taxonomies",
        description: "Create custom post types for portfolios, testimonials, and products. Build custom taxonomies and organize content.",
        content: "# Custom Post Types and Taxonomies\n\nExtend WordPress beyond posts and pages with custom content types...",
        duration: 60,
        order: 9,
        categoryId: createdCategories.find(c => c.slug === 'content')?.id,
        type: "premium" as const,
        practiceExercise: JSON.stringify({
          title: "Build a Portfolio",
          description: "Create a custom post type for portfolio items",
          tasks: ["Register portfolio CPT", "Add custom taxonomies", "Create template files"]
        })
      },
      {
        title: "Advanced Custom Fields (ACF)",
        slug: "advanced-custom-fields",
        description: "Master ACF to create dynamic content with custom fields, repeaters, and flexible content layouts.",
        content: "# Advanced Custom Fields Mastery\n\nACF transforms WordPress into a powerful CMS with custom fields...",
        duration: 50,
        order: 10,
        categoryId: createdCategories.find(c => c.slug === 'content')?.id,
        type: "premium" as const
      },
      {
        title: "User Roles & Permissions",
        slug: "user-roles-permissions",
        description: "Manage WordPress user roles, create custom roles, and implement membership functionality with access restrictions.",
        content: "# WordPress User Management\n\nControl who can access and modify your WordPress content...",
        duration: 35,
        order: 11,
        categoryId: createdCategories.find(c => c.slug === 'content')?.id,
        type: "premium" as const
      },
      {
        title: "Gutenberg Blocks & Content Creation",
        slug: "gutenberg-blocks-content",
        description: "Master the Gutenberg block editor, create page hierarchies, and build complex layouts with blocks.",
        content: "# Gutenberg Block Editor Mastery\n\nThe block editor is the modern way to create WordPress content...",
        duration: 45,
        order: 12,
        categoryId: createdCategories.find(c => c.slug === 'content')?.id,
        type: "free" as const,
        practiceExercise: JSON.stringify({
          title: "Build a Landing Page",
          description: "Create a landing page using Gutenberg blocks",
          tasks: ["Use core blocks", "Create reusable blocks", "Add custom CSS"]
        })
      },

      // Theme Development (13-17)
      {
        title: "WordPress Theme Development Basics",
        slug: "theme-development-basics",
        description: "Learn theme structure, style.css, functions.php, and create your first child theme from scratch.",
        content: "# WordPress Theme Development\n\nBuilding custom themes gives you complete control over design and functionality...",
        duration: 70,
        order: 13,
        categoryId: createdCategories.find(c => c.slug === 'themes')?.id,
        type: "premium" as const,
        practiceExercise: JSON.stringify({
          title: "Create a Child Theme",
          description: "Build a child theme with custom functionality",
          tasks: ["Create style.css", "Add functions.php", "Override parent templates"]
        })
      },
      {
        title: "WordPress Template Hierarchy",
        slug: "template-hierarchy",
        description: "Master how WordPress chooses templates. Work with single.php, page.php, archive.php, and template parts.",
        content: "# Understanding Template Hierarchy\n\nWordPress uses a specific hierarchy to determine which template file to use...",
        duration: 55,
        order: 14,
        categoryId: createdCategories.find(c => c.slug === 'themes')?.id,
        type: "premium" as const
      },
      {
        title: "The WordPress Loop & Custom Queries",
        slug: "wordpress-loop-queries",
        description: "Master The Loop, create custom queries with WP_Query, and display dynamic content in your themes.",
        content: "# The WordPress Loop and Custom Queries\n\nThe Loop is the heart of WordPress content display...",
        duration: 50,
        order: 15,
        categoryId: createdCategories.find(c => c.slug === 'themes')?.id,
        type: "premium" as const,
        practiceExercise: JSON.stringify({
          title: "Custom Query Display",
          description: "Create custom post displays using WP_Query",
          tasks: ["Build custom loop", "Add pagination", "Filter by taxonomy"]
        })
      },
      {
        title: "Theme Customizer & Full Site Editing",
        slug: "theme-customizer-fse",
        description: "Add custom options to the Customizer and work with theme.json for modern block-based themes (FSE).",
        content: "# Theme Customization Options\n\nGive users control over theme appearance with the Customizer and FSE...",
        duration: 60,
        order: 16,
        categoryId: createdCategories.find(c => c.slug === 'themes')?.id,
        type: "premium" as const
      },
      {
        title: "Responsive Design & Theme Optimization",
        slug: "responsive-theme-optimization",
        description: "Create mobile-first responsive themes, optimize performance, and implement accessibility best practices.",
        content: "# Responsive WordPress Themes\n\nModern themes must work perfectly across all devices...",
        duration: 45,
        order: 17,
        categoryId: createdCategories.find(c => c.slug === 'themes')?.id,
        type: "premium" as const
      },

      // Plugin Development (18-22)
      {
        title: "WordPress Plugin Development Fundamentals",
        slug: "plugin-development-fundamentals",
        description: "Create your first WordPress plugin with proper header comments, activation hooks, and basic functionality.",
        content: "# WordPress Plugin Development\n\nPlugins extend WordPress functionality without modifying core files...",
        duration: 65,
        order: 18,
        categoryId: createdCategories.find(c => c.slug === 'plugins')?.id,
        type: "premium" as const,
        practiceExercise: JSON.stringify({
          title: "Build a Simple Plugin",
          description: "Create a plugin with activation/deactivation hooks",
          tasks: ["Write plugin header", "Add activation hook", "Create settings page"]
        })
      },
      {
        title: "WordPress Hooks: Actions & Filters",
        slug: "wordpress-hooks-actions-filters",
        description: "Master WordPress event-driven architecture with actions and filters. Create custom hooks and modify existing functionality.",
        content: "# WordPress Hooks System\n\nHooks are the foundation of WordPress extensibility...",
        duration: 55,
        order: 19,
        categoryId: createdCategories.find(c => c.slug === 'plugins')?.id,
        type: "premium" as const
      },
      {
        title: "Shortcodes & Custom Widgets",
        slug: "shortcodes-custom-widgets",
        description: "Build powerful shortcodes with parameters and create both legacy and block-based custom widgets.",
        content: "# Shortcodes and Custom Widgets\n\nShortcodes and widgets provide reusable functionality for users...",
        duration: 40,
        order: 20,
        categoryId: createdCategories.find(c => c.slug === 'plugins')?.id,
        type: "premium" as const,
        practiceExercise: JSON.stringify({
          title: "Contact Form Shortcode",
          description: "Build a custom contact form shortcode",
          tasks: ["Create shortcode function", "Add form validation", "Handle form submission"]
        })
      },
      {
        title: "Custom Admin Pages & Settings API",
        slug: "custom-admin-settings",
        description: "Create custom admin pages using add_menu_page() and the Settings API. Save and retrieve plugin settings securely.",
        content: "# WordPress Admin Interface\n\nCreate professional admin interfaces for your plugins...",
        duration: 50,
        order: 21,
        categoryId: createdCategories.find(c => c.slug === 'plugins')?.id,
        type: "premium" as const
      },
      {
        title: "AJAX in WordPress",
        slug: "wordpress-ajax",
        description: "Implement AJAX functionality in WordPress using admin-ajax.php, handle security with nonces, and create dynamic user interfaces.",
        content: "# WordPress AJAX Implementation\n\nAdd dynamic functionality to your WordPress sites with AJAX...",
        duration: 45,
        order: 22,
        categoryId: createdCategories.find(c => c.slug === 'plugins')?.id,
        type: "premium" as const
      },

      // API & Headless WordPress (23-26)
      {
        title: "WordPress REST API Mastery",
        slug: "wordpress-rest-api",
        description: "Work with the WordPress REST API, read and write data via /wp-json/, and implement proper authentication.",
        content: "# WordPress REST API\n\nThe REST API transforms WordPress into a powerful backend for any application...",
        duration: 60,
        order: 23,
        categoryId: createdCategories.find(c => c.slug === 'api')?.id,
        type: "premium" as const,
        practiceExercise: JSON.stringify({
          title: "Build an API Client",
          description: "Create a simple app that consumes WordPress REST API",
          tasks: ["Fetch posts via API", "Implement authentication", "Create new posts"]
        })
      },
      {
        title: "Custom REST API Endpoints",
        slug: "custom-rest-endpoints",
        description: "Create custom REST API endpoints, secure them properly, and structure responses for your specific needs.",
        content: "# Custom REST API Endpoints\n\nExtend the WordPress REST API with your own custom endpoints...",
        duration: 50,
        order: 24,
        categoryId: createdCategories.find(c => c.slug === 'api')?.id,
        type: "premium" as const
      },
      {
        title: "Headless WordPress with React/Next.js",
        slug: "headless-wordpress-react",
        description: "Decouple WordPress from the frontend and build modern applications using React, Next.js, or Vue with WordPress as backend.",
        content: "# Headless WordPress Development\n\nUse WordPress as a content management system for modern frontend frameworks...",
        duration: 75,
        order: 25,
        categoryId: createdCategories.find(c => c.slug === 'api')?.id,
        type: "premium" as const
      },
      {
        title: "Custom Gutenberg Block Development",
        slug: "custom-gutenberg-blocks",
        description: "Build custom Gutenberg blocks using React, JSX, and @wordpress/scripts. Create interactive block interfaces.",
        content: "# Custom Gutenberg Block Development\n\nExtend the block editor with your own custom blocks...",
        duration: 65,
        order: 26,
        categoryId: createdCategories.find(c => c.slug === 'api')?.id,
        type: "premium" as const,
        practiceExercise: JSON.stringify({
          title: "Custom Block Creation",
          description: "Build a custom testimonial block",
          tasks: ["Set up build process", "Create block structure", "Add block controls"]
        })
      },

      // Performance & SEO (27-28)
      {
        title: "WordPress Performance Optimization",
        slug: "wordpress-performance-optimization", 
        description: "Optimize WordPress performance with caching, CDN, lazy loading, and tools like LiteSpeed Cache and WP Rocket.",
        content: "# WordPress Performance Optimization\n\nFast-loading websites provide better user experience and SEO rankings...",
        duration: 55,
        order: 27,
        categoryId: createdCategories.find(c => c.slug === 'performance')?.id,
        type: "premium" as const,
        practiceExercise: JSON.stringify({
          title: "Site Speed Audit",
          description: "Optimize a WordPress site for maximum performance",
          tasks: ["Run speed tests", "Implement caching", "Optimize images", "Minify assets"]
        })
      },
      {
        title: "WordPress Migration & Maintenance",
        slug: "wordpress-migration-maintenance",
        description: "Learn site migration techniques, backup strategies, version control with Git, and maintenance best practices.",
        content: "# WordPress Site Migration and Maintenance\n\nProperly migrating and maintaining WordPress sites ensures long-term success...",
        duration: 50,
        order: 28,
        categoryId: createdCategories.find(c => c.slug === 'performance')?.id,
        type: "premium" as const
      }
    ];

    // Create lessons
    for (const lesson of lessons) {
      await storage.createLesson(lesson);
    }

    console.log("Database seeded successfully with comprehensive WordPress curriculum!");
    
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}