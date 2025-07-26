import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <i className="fab fa-wordpress text-white text-lg"></i>
              </div>
              <h1 className="text-xl font-bold text-gray-900">WordPress Mastery</h1>
            </div>
            
            <Button 
              onClick={() => window.location.href = '/api/login'}
              className="bg-primary hover:bg-blue-600"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            🚀 Learn WordPress from Zero to Hero
          </Badge>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Master WordPress <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Website Building
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Build professional WordPress websites with our comprehensive course. 
            Learn themes, plugins, hosting, and advanced customization through hands-on practice.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => window.location.href = '/api/login'}
              className="bg-primary hover:bg-blue-600 text-lg px-8 py-3"
            >
              Start Learning for Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => {
                const outlineSection = document.getElementById('course-outline');
                if (outlineSection) {
                  outlineSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-lg px-8 py-3 border-primary text-primary hover:bg-primary hover:text-white"
            >
              View Course Outline
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-graduation-cap text-primary text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Structured Learning</h3>
              <p className="text-gray-600">
                Follow our carefully crafted curriculum from basics to advanced WordPress development
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-code text-secondary text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hands-on Practice</h3>
              <p className="text-gray-600">
                Interactive coding exercises and real project building in every lesson
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-trophy text-accent text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Earn Certificates</h3>
              <p className="text-gray-600">
                Get recognized for your achievements with completion certificates
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Course Modules */}
        <div id="course-outline" className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What You'll Learn
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-play-circle text-violet-600"></i>
              </div>
              <h3 className="font-semibold mb-2">WordPress Foundations</h3>
              <p className="text-sm text-gray-600">Learn basics, local setup, and essential concepts</p>
              <div className="text-xs text-violet-600 mt-2">5 lessons</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-server text-blue-600"></i>
              </div>
              <h3 className="font-semibold mb-2">Hosting & Installation</h3>
              <p className="text-sm text-gray-600">Choose hosting, set up domains, and install WordPress</p>
              <div className="text-xs text-blue-600 mt-2">4 lessons</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-graduation-cap text-green-600"></i>
              </div>
              <h3 className="font-semibold mb-2">WordPress Fundamentals</h3>
              <p className="text-sm text-gray-600">Master dashboard, security, themes, and plugins</p>
              <div className="text-xs text-green-600 mt-2">4 lessons</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-cubes text-purple-600"></i>
              </div>
              <h3 className="font-semibold mb-2">Content & Structure</h3>
              <p className="text-sm text-gray-600">Custom post types, fields, and user management</p>
              <div className="text-xs text-purple-600 mt-2">4 lessons</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-palette text-indigo-600"></i>
              </div>
              <h3 className="font-semibold mb-2">Theme Development</h3>
              <p className="text-sm text-gray-600">Build custom themes from scratch</p>
              <div className="text-xs text-indigo-600 mt-2">5 lessons</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-plug text-orange-600"></i>
              </div>
              <h3 className="font-semibold mb-2">Plugin Development</h3>
              <p className="text-sm text-gray-600">Create powerful WordPress plugins</p>
              <div className="text-xs text-orange-600 mt-2">5 lessons</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-code text-cyan-600"></i>
              </div>
              <h3 className="font-semibold mb-2">API & Headless</h3>
              <p className="text-sm text-gray-600">REST API and modern development</p>
              <div className="text-xs text-cyan-600 mt-2">4 lessons</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-rocket text-red-600"></i>
              </div>
              <h3 className="font-semibold mb-2">Performance & SEO</h3>
              <p className="text-sm text-gray-600">Optimize and deploy professional sites</p>
              <div className="text-xs text-red-600 mt-2">2 lessons</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
