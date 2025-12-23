import { useState, useEffect } from "react";
import { City, CityFormData } from "@/types/city";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Building2 } from "lucide-react";

interface CityFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CityFormData) => void;
  editingCity?: City | null;
}

const initialFormData: CityFormData = {
  name: "",
  country: "",
  population: 0,
  timezone: "",
};

export function CityForm({ open, onOpenChange, onSubmit, editingCity }: CityFormProps) {
  const [formData, setFormData] = useState<CityFormData>(initialFormData);

  useEffect(() => {
    if (editingCity) {
      setFormData({
        name: editingCity.name,
        country: editingCity.country,
        population: editingCity.population,
        timezone: editingCity.timezone,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [editingCity, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialFormData);
  };

  const isEditing = !!editingCity;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-warm shadow-glow">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <DialogTitle className="text-xl font-semibold">
              {isEditing ? "Edit City" : "Add New City"}
            </DialogTitle>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              City Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter city name"
              required
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm font-medium">
              Country
            </Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              placeholder="Enter country"
              required
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="population" className="text-sm font-medium">
              Population
            </Label>
            <Input
              id="population"
              type="number"
              value={formData.population || ""}
              onChange={(e) => setFormData({ ...formData, population: parseInt(e.target.value) || 0 })}
              placeholder="Enter population"
              required
              min={0}
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone" className="text-sm font-medium">
              Timezone
            </Label>
            <Input
              id="timezone"
              value={formData.timezone}
              onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
              placeholder="e.g., UTC+1, EST, PST"
              required
              className="h-11"
            />
          </div>
          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="gradient-warm text-primary-foreground hover:opacity-90 transition-opacity">
              {isEditing ? "Save Changes" : "Add City"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
