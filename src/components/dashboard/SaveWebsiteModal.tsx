
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useWebsite } from "@/context/WebsiteContext";

interface SaveWebsiteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SaveWebsiteModal = ({ open, onOpenChange }: SaveWebsiteModalProps) => {
  const [websiteName, setWebsiteName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const { saveAsNewWebsite } = useWebsite();
  const { toast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a website name",
        variant: "destructive"
      });
      return;
    }

    saveAsNewWebsite();
    toast({
      title: "Website Saved Successfully!",
      description: `Your website "${websiteName}" is now live and active.`,
    });
    
    setWebsiteName("");
    setWebsiteUrl("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Save as New Website</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <Label htmlFor="websiteName">Website Name</Label>
            <Input
              id="websiteName"
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
              placeholder="Enter website name"
              required
            />
          </div>

          <div>
            <Label htmlFor="websiteUrl">Custom URL (Optional)</Label>
            <Input
              id="websiteUrl"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="my-store-name"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Your website will be available at: {websiteUrl || "your-store"}.pocket-angadi.com
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Save & Go Live
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
