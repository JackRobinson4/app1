import { storage } from "./storage";

export async function seedDatabase() {
  try {
    // Create categories in the correct order
    const categories = [
      {
        name: "WordPress Foundations",
        slug: "foundations", 
        description: "Introduction to WordPress, local development, and essential concepts",
        order: 1
      },
      {
        name: "Hosting & Installation",
        slug: "hosting",
        description: "Learn about web hosting, domain setup, and WordPress installation",
        order: 2
      },
      {
        name: "WordPress Fundamentals", 
        slug: "fundamentals",
        description: "Master the dashboard, content creation, themes, and plugins",
        order: 3
      },
      {
        name: "Content & Structure",
        slug: "content", 
        description: "Advanced content management, custom post types, and user roles",
        order: 4
      },
      {
        name: "Theme Development",
        slug: "themes",
        description: "Build and customize WordPress themes from scratch",
        order: 5
      },
      {
        name: "Plugin Development", 
        slug: "plugins",
        description: "Create powerful WordPress plugins and extend functionality",
        order: 6
      },
      {
        name: "API & Headless WordPress",
        slug: "api",
        description: "REST API, custom endpoints, and headless WordPress development", 
        order: 7
      },
      {
        name: "Performance & SEO",
        slug: "performance",
        description: "Optimize performance, SEO, and deploy WordPress sites",
        order: 8
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
      // WordPress Foundations (1-5)
      {
        title: "What is WordPress? WordPress.com vs WordPress.org",
        slug: "what-is-wordpress",
        description: "Learn about WordPress, its market share, use cases, and the crucial difference between WordPress.com and WordPress.org",
        content: `# What is WordPress?

WordPress is the world's most popular content management system (CMS), powering over 43% of all websites on the internet. Originally started as a blogging platform in 2003, WordPress has evolved into a powerful tool for creating any type of website.

## WordPress Market Share & Use Cases

**Market Dominance:**
- Powers 43.3% of all websites globally
- 65.2% market share among all CMS platforms
- Used by major brands like The New York Times, Sony, and Disney

**Common Use Cases:**
- Business websites and portfolios
- E-commerce stores (with WooCommerce)
- Blogs and news sites
- Educational platforms
- Non-profit organizations
- Government websites

## WordPress.com vs WordPress.org: The Critical Difference

### WordPress.org (Self-Hosted) ✅ Recommended
**What it is:** Free, open-source software you install on your own hosting
**Advantages:**
- Complete control and ownership
- Install any themes and plugins
- Monetize your site however you want
- Custom code and advanced functionality
- No branding or ads

### WordPress.com (Hosted Service)
**What it is:** A hosting service that runs WordPress for you
**Limitations:**
- Limited customization options
- Cannot install custom plugins on free/lower plans
- WordPress.com branding on free plans
- Restricted monetization options

## When to Choose Each

**Choose WordPress.org if you want:**
- A professional business website
- E-commerce functionality
- Custom design and features
- Complete control over your site

**Choose WordPress.com if you want:**
- A simple blog with minimal setup
- No technical maintenance
- Basic website needs only`,
        duration: 30,
        order: 1,
        categoryId: createdCategories.find(c => c.slug === 'foundations')?.id,
        type: "free" as const,
        practiceExercise: JSON.stringify({
          title: "WordPress Platform Analysis",
          description: "Compare WordPress.com vs WordPress.org for different scenarios",
          tasks: [
            "List 3 advantages of WordPress.org over WordPress.com",
            "Identify which platform suits a small business website",
            "Research WordPress market share statistics"
          ]
        })
      },
      {
        title: "Setting Up Local Development Environment",
        slug: "local-development-setup",
        description: "Install XAMPP, MAMP, or LocalWP to run WordPress locally on your computer for safe development and testing",
        content: `# Setting Up a Local Development Environment

Before building live websites, developers work locally on their computers. This allows safe testing, faster development, and offline work.

## Why Use Local Development?

**Benefits:**
- Test changes safely before going live
- Work offline without internet
- Faster loading and development
- Free hosting costs during development
- Easy to reset and start over

## Popular Local Development Tools

### 1. LocalWP (Recommended for Beginners)
**What it is:** User-friendly WordPress-specific local environment
**Installation:**
1. Download from localwp.com
2. Install and run the application
3. Click "Create a new site"
4. Choose site name and local domain
5. Select WordPress version and admin credentials
6. Wait for automatic installation

**Advantages:**
- WordPress-specific features
- Easy SSL setup
- Built-in email testing
- One-click staging

### 2. XAMPP (Cross-Platform)
**What it is:** Complete web server package (Apache, MySQL, PHP)
**Installation Steps:**
1. Download from apachefriends.org
2. Install XAMPP (default settings work fine)
3. Start Apache and MySQL services
4. Download WordPress from wordpress.org
5. Extract to htdocs folder
6. Create database in phpMyAdmin
7. Run WordPress installation

### 3. MAMP (Mac/Windows)
**What it is:** Similar to XAMPP, popular on Mac
**Quick Setup:**
1. Download from mamp.info
2. Install and start servers
3. Place WordPress in htdocs folder
4. Access via localhost

## Setting Up Your First Local Site

**Step-by-Step with LocalWP:**
1. **Create New Site**
   - Site name: "My WordPress Site"
   - Local domain: "mywordpresssite.local"

2. **Choose Environment**
   - PHP version: Latest stable
   - Web server: Nginx (recommended)
   - MySQL version: Latest

3. **WordPress Setup**
   - Admin username: Choose secure username
   - Admin password: Use strong password
   - Admin email: Your email address

4. **Access Your Site**
   - View site: Click "Open site"
   - Admin area: Click "WP Admin"

## Local Development Best Practices

**File Organization:**
- Keep each project in separate folders
- Use descriptive site names
- Backup important projects

**Security:**
- Use strong admin passwords
- Don't use "admin" as username
- Keep local environment updated

**Testing:**
- Test all changes locally first
- Use different browsers for testing
- Check mobile responsiveness`,
        duration: 45,
        order: 2,
        categoryId: createdCategories.find(c => c.slug === 'foundations')?.id,
        type: "free" as const,
        practiceExercise: JSON.stringify({
          title: "Set Up Local Environment",
          description: "Install a local development environment and create your first WordPress site",
          tasks: [
            "Download and install LocalWP or XAMPP",
            "Create a new local WordPress site",
            "Access both the frontend and admin area",
            "Take a screenshot of your local WordPress dashboard"
          ]
        })
      },
      {
        title: "WordPress Dashboard Deep Dive",
        slug: "wordpress-dashboard-overview",
        description: "Master the WordPress admin interface, understand user roles, and navigate all essential dashboard features",
        content: `# WordPress Dashboard Overview

The WordPress dashboard is your control center for managing your website. Understanding its layout and features is essential for efficient WordPress management.

## Dashboard Layout

### 1. Admin Bar (Top)
- **WordPress Logo:** Quick links and WordPress.org resources
- **Site Name:** Visit site and customize options
- **Comments:** Quick access to pending comments
- **New:** Create new posts, pages, media, users
- **Profile:** Account settings and logout

### 2. Admin Menu (Left Sidebar)
**Main Sections:**
- **Dashboard:** Overview and quick actions
- **Posts:** Blog posts management
- **Media:** File library and uploads
- **Pages:** Static pages management
- **Comments:** Comment moderation
- **Appearance:** Themes, customizer, widgets, menus
- **Plugins:** Plugin management
- **Users:** User accounts and roles
- **Tools:** Import, export, site health
- **Settings:** Site configuration

### 3. Main Content Area
- **Welcome Panel:** Quick start options for new sites
- **Dashboard Widgets:** Customizable information panels
- **At a Glance:** Site statistics overview
- **Activity:** Recent posts and comments
- **Quick Draft:** Fast post creation

## User Roles and Capabilities

### Super Administrator (Multisite only)
- Complete network control
- Manage all sites and users

### Administrator
- Complete site control
- Manage all content, users, plugins, themes
- Access all settings

### Editor
- Manage and publish all posts and pages
- Moderate comments
- Manage categories and tags

### Author
- Create, edit, and publish own posts
- Upload media files
- View all posts

### Contributor
- Create and edit own posts (unpublished)
- Cannot publish or upload media

### Subscriber
- Read content and manage own profile
- Leave comments (if enabled)

## Dashboard Customization

### Screen Options (Top Right)
- Show/hide dashboard widgets
- Customize columns in post/page lists
- Control items per page

### Dashboard Widgets Management
**Default Widgets:**
- At a Glance
- Activity
- Quick Draft
- WordPress Events and News

**Custom Widgets:**
- Many plugins add dashboard widgets
- Developers can create custom widgets

## Essential Dashboard Features

### 1. Quick Actions
- **Quick Draft:** Write posts directly from dashboard
- **At a Glance:** See content statistics
- **Activity:** Monitor recent changes

### 2. Admin Menu Customization
- Collapse menu for more space
- Plugins can add new menu items
- User roles determine visible menus

### 3. Profile Management
- **Users > Your Profile**
- Personal settings and preferences
- Admin color schemes
- Toolbar preferences

## Dashboard Best Practices

### Security
- Use strong passwords
- Enable two-factor authentication
- Regular user audit
- Limit administrator accounts

### Organization
- Customize dashboard widgets for your workflow
- Use screen options to optimize views
- Learn keyboard shortcuts for efficiency

### Maintenance
- Check dashboard regularly
- Monitor site health
- Keep plugins and themes updated
- Review user accounts periodically`,
        duration: 40,
        order: 3,
        categoryId: createdCategories.find(c => c.slug === 'foundations')?.id,
        type: "free" as const,
        practiceExercise: JSON.stringify({
          title: "Dashboard Navigation Practice",
          description: "Explore and customize the WordPress dashboard",
          tasks: [
            "Hide and show different dashboard widgets using Screen Options",
            "Create a test user with Editor role and compare dashboard access",
            "Customize your profile settings and admin color scheme",
            "Find and access the Site Health tool"
          ]
        })
      },
      {
        title: "Content Creation: Posts vs Pages",
        slug: "posts-vs-pages-content-creation",
        description: "Master the Gutenberg editor, understand posts vs pages, and learn about categories, tags, and content organization",
        content: `# Content Creation: Posts vs Pages

WordPress has two main content types: Posts and Pages. Understanding their differences and mastering the Gutenberg editor is fundamental to WordPress success.

## Posts vs Pages: When to Use Each

### Posts
**Characteristics:**
- Time-sensitive content
- Displayed in reverse chronological order
- Can be categorized and tagged
- Allow comments by default
- Appear in RSS feeds
- Used for blogs and news

**Examples:**
- Blog articles
- News updates
- Company announcements
- Case studies
- How-to guides

### Pages
**Characteristics:**
- Static, timeless content
- Hierarchical (can have parent/child relationships)
- No categories or tags
- Comments usually disabled
- Don't appear in RSS feeds
- Used for permanent site content

**Examples:**
- About page
- Contact page
- Services page
- Privacy policy
- Landing pages

## Gutenberg Editor Walkthrough

### Editor Interface
1. **Title Area:** Post/page title
2. **Content Area:** Block-based editor
3. **Settings Panel:** Post and block settings
4. **Toolbar:** Block-specific tools

### Block Types
**Text Blocks:**
- Paragraph
- Heading (H1-H6)
- List (bulleted/numbered)
- Quote
- Code
- Preformatted

**Media Blocks:**
- Image
- Gallery
- Video
- Audio
- File
- Cover

**Design Blocks:**
- Button
- Columns
- Group
- Separator
- Spacer

**Widget Blocks:**
- Shortcode
- HTML
- Latest Posts
- Calendar

### Block Editor Tips
**Adding Blocks:**
- Click + button
- Type "/" and block name
- Use keyboard shortcut
- Browse block library

**Block Settings:**
- Select block to see options
- Right sidebar shows settings
- Toolbar appears above block
- Advanced settings in sidebar

## Categories vs Tags

### Categories
**Purpose:** Broad groupings of content
**Structure:** Hierarchical (can have sub-categories)
**Best Practices:**
- Keep broad and general
- Use 5-10 main categories
- Create logical hierarchy
- Every post should have a category

**Examples:**
- Technology
  - Web Development
  - Mobile Apps
- Marketing
  - SEO
  - Social Media

### Tags
**Purpose:** Specific keywords and topics
**Structure:** Flat (no hierarchy)
**Best Practices:**
- Use specific keywords
- 3-5 tags per post
- Think like your audience
- Use consistently

**Examples:**
- wordpress
- responsive-design
- javascript
- tutorial
- beginner

## Content Organization Strategy

### Planning Your Content Structure
1. **Identify Main Topics:** What subjects will you cover?
2. **Create Category Hierarchy:** Organize broad to specific
3. **Develop Tag Strategy:** List important keywords
4. **Plan Page Structure:** Map out static pages

### Content Calendar
- Plan posts in advance
- Balance different categories
- Consider seasonal content
- Maintain posting consistency

## Advanced Content Features

### Featured Images
- Represent posts in listings
- Used by themes for display
- Important for social sharing
- Recommended size varies by theme

### Excerpts
- Short post summaries
- Used in post listings
- Manual or automatic
- Important for SEO

### Post Formats
- Standard
- Video
- Gallery
- Quote
- Link
- Audio
- Status
- Image
- Chat

### Custom Fields
- Additional post metadata
- Advanced Custom Fields (ACF) plugin
- Store extra information
- Display custom data`,
        duration: 50,
        order: 4,
        categoryId: createdCategories.find(c => c.slug === 'foundations')?.id,
        type: "free" as const,
        practiceExercise: JSON.stringify({
          title: "Content Creation Practice",
          description: "Create different types of content and organize them properly",
          tasks: [
            "Create 3 categories with a hierarchical structure",
            "Write a blog post using at least 4 different block types",
            "Create an About page with contact information",
            "Add 5 relevant tags to your blog post",
            "Set a featured image for your post"
          ]
        })
      },
      {
        title: "Media Management and Optimization",
        slug: "media-management-optimization",
        description: "Master WordPress Media Library, learn image optimization techniques, and understand best practices for file management",
        content: `# Media Management and Optimization

Proper media management is crucial for website performance, user experience, and SEO. WordPress provides powerful tools for managing your media files efficiently.

## WordPress Media Library Overview

### Accessing Media Library
- **Dashboard > Media > Library**
- **Add Media** button in posts/pages
- **Customizer** for theme images
- **Widget areas** for sidebar images

### Media Views
**Grid View (Default):**
- Visual thumbnail grid
- Search and filter options
- Bulk actions available
- Date filters

**List View:**
- Detailed file information
- Sortable columns
- Quick edit options
- Better for large libraries

## Uploading and Managing Images

### Upload Methods
1. **Drag and Drop:** Simplest method
2. **Select Files:** Browse computer files
3. **Media Uploader:** In posts/pages
4. **FTP Upload:** Direct server upload for bulk

### Image Information
**Automatic Data:**
- File name and size
- Upload date
- Dimensions
- MIME type

**Editable Information:**
- Title
- Caption
- Alt text (crucial for accessibility)
- Description

### Image Sizes in WordPress
**Default Sizes:**
- **Thumbnail:** 150x150px (cropped)
- **Medium:** 300x300px (max width/height)
- **Large:** 1024x1024px (max width/height)
- **Full Size:** Original dimensions

**Custom Sizes:**
- Themes can register custom sizes
- Plugins can add sizes
- Functions.php customization

## Image Optimization Best Practices

### Before Upload
**File Formats:**
- **JPEG:** Photos and complex images
- **PNG:** Logos and simple graphics with transparency
- **WebP:** Modern format, smaller files
- **SVG:** Vector graphics and icons

**Compression:**
- Use tools like TinyPNG, ImageOptim
- Balance quality vs file size
- Aim for under 100KB per image
- Compress before upload

### WordPress Image Optimization
**Plugins for Optimization:**
- **Smush:** Free compression
- **ShortPixel:** Advanced optimization
- **Imagify:** Automatic compression
- **EWWW Image Optimizer:** Comprehensive tools

**Manual Optimization:**
- Choose appropriate dimensions
- Use correct file format
- Enable lazy loading
- Implement responsive images

## Advanced Media Features

### Image Editing
**Built-in Editor:**
- Crop images
- Rotate and flip
- Scale dimensions
- Restore original

**Limitations:**
- Basic editing only
- Consider external tools for advanced editing
- Always keep original backups

### Featured Images
**Purpose:**
- Represent posts/pages visually
- Used in theme layouts
- Social media sharing
- Post listings and archives

**Best Practices:**
- Consistent dimensions
- High quality images
- Relevant to content
- Optimized file size

### Media Organization

**Folder Organization:**
- WordPress stores by year/month by default
- **Settings > Media** to change structure
- Consider folder plugins for better organization

**File Naming:**
- Use descriptive names
- Include keywords for SEO
- Avoid spaces (use hyphens)
- Keep names concise

### Alt Text and Accessibility
**Importance:**
- Screen reader compatibility
- SEO benefits
- Image context when loading fails
- Legal compliance (ADA)

**Writing Good Alt Text:**
- Describe image content
- Keep under 125 characters
- Include keywords naturally
- Skip "image of" or "picture of"

## Media Security and Performance

### Security Considerations
- **File Type Restrictions:** WordPress blocks dangerous file types
- **User Permissions:** Control who can upload media
- **File Size Limits:** Set reasonable upload limits
- **Hotlinking Protection:** Prevent unauthorized use

### Performance Optimization
**CDN Integration:**
- CloudFlare
- MaxCDN
- Amazon CloudFront
- Improve global loading speeds

**Lazy Loading:**
- Load images when needed
- Reduces initial page load
- Built into WordPress 5.5+
- Plugin options available

**Image Compression:**
- Automatic optimization plugins
- Server-level compression
- WebP format adoption
- Progressive JPEG loading

## Troubleshooting Common Issues

### Upload Problems
- Check file size limits
- Verify file permissions
- Confirm supported file types
- Clear browser cache

### Missing Images
- Check file paths
- Verify media URLs
- Review .htaccess rules
- Confirm server storage space

### Performance Issues
- Optimize large images
- Implement caching
- Use CDN services
- Enable compression`,
        duration: 45,
        order: 5,
        categoryId: createdCategories.find(c => c.slug === 'foundations')?.id,
        type: "premium" as const,
        practiceExercise: JSON.stringify({
          title: "Media Optimization Workshop",
          description: "Practice proper media management and optimization techniques",
          tasks: [
            "Upload 5 images and optimize them using an optimization plugin",
            "Create a gallery with properly formatted alt text for each image",
            "Set up different image sizes using theme customization",
            "Test lazy loading functionality on your site",
            "Organize media library with descriptive file names"
          ]
        })
      },

      // Hosting & Installation (6-9)
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