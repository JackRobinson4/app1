import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface PracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PracticeModal({ isOpen, onClose }: PracticeModalProps) {
  const [code, setCode] = useState(`/* Add your CSS code here */
.site-header {
  background-color: #6366F1;
}

.main-navigation a {
  color: white;
}`);

  const checkSolution = () => {
    alert("Great job! Your CSS implementation is correct.");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Practice: Custom CSS Implementation</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 h-[600px]">
          <div className="p-6 border-r border-gray-200 overflow-auto">
            <h4 className="font-medium text-gray-900 mb-4">Instructions</h4>
            <div className="space-y-4 text-sm text-gray-600">
              <p>Add custom CSS to change the header background color to #6366F1 and make the navigation links white.</p>
              
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <p className="font-medium text-gray-900 mb-2">Your task:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Navigate to Appearance → Customize</li>
                    <li>Add the provided CSS code</li>
                    <li>Preview the changes</li>
                    <li>Publish your modifications</li>
                  </ol>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <h5 className="font-medium text-gray-900">Key Learning Points:</h5>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Understanding CSS selectors</li>
                  <li>WordPress theme customization</li>
                  <li>Safe CSS implementation practices</li>
                  <li>Using the WordPress Customizer</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              <Button 
                onClick={checkSolution}
                className="bg-secondary text-white hover:bg-green-600 w-full"
              >
                <i className="fas fa-check mr-2"></i>
                Check Solution
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setCode(`/* Add your CSS code here */\n.site-header {\n  \n}\n\n.main-navigation a {\n  \n}`)}
              >
                <i className="fas fa-undo mr-2"></i>
                Reset Code
              </Button>
            </div>
          </div>
          
          <div className="bg-gray-900 text-green-400 font-mono text-sm overflow-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">style.css</span>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-[500px] bg-transparent text-green-400 font-mono text-sm resize-none outline-none"
                placeholder="Enter your CSS code here..."
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-gray-500">
            <i className="fas fa-lightbulb mr-1"></i>
            Tip: Use the WordPress Customizer for safe CSS modifications
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={checkSolution}>
              Submit Solution
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
