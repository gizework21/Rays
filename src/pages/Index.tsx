import { useState } from "react";
import { City, CityFormData } from "@/types/city";
import { CityTable } from "@/components/CityTable";
import { CityForm } from "@/components/CityForm";
import { Button } from "@/components/ui/button";
import { Plus, Building2, Globe } from "lucide-react";
import { toast } from "sonner";

const initialCities: City[] = [
  {
    id: "1",
    name: "Tokyo",
    country: "Japan",
    population: 13960000,
    timezone: "JST (UTC+9)",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "New York",
    country: "United States",
    population: 8336817,
    timezone: "EST (UTC-5)",
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "London",
    country: "United Kingdom",
    population: 8982000,
    timezone: "GMT (UTC+0)",
    createdAt: new Date(),
  },
  {
    id: "4",
    name: "Paris",
    country: "France",
    population: 2161000,
    timezone: "CET (UTC+1)",
    createdAt: new Date(),
  },
];

const Index = () => {
  const [cities, setCities] = useState<City[]>(initialCities);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);

  const handleAddCity = (data: CityFormData) => {
    const newCity: City = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date(),
    };
    setCities([...cities, newCity]);
    setIsFormOpen(false);
    toast.success("City added successfully", {
      description: `${data.name} has been added to the list.`,
    });
  };

  const handleEditCity = (data: CityFormData) => {
    if (!editingCity) return;
    setCities(
      cities.map((city) =>
        city.id === editingCity.id ? { ...city, ...data } : city
      )
    );
    setEditingCity(null);
    setIsFormOpen(false);
    toast.success("City updated successfully", {
      description: `${data.name} has been updated.`,
    });
  };

  const handleDeleteCity = (id: string) => {
    const cityToDelete = cities.find((c) => c.id === id);
    setCities(cities.filter((city) => city.id !== id));
    toast.success("City deleted", {
      description: `${cityToDelete?.name} has been removed.`,
    });
  };

  const openEditForm = (city: City) => {
    setEditingCity(city);
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setEditingCity(null);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-background dark">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-warm shadow-glow">
              <Globe className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">City Manager</h1>
              <p className="text-muted-foreground">
                Manage your global city database
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 animate-slide-up">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">
                <span className="text-2xl font-bold text-foreground">{cities.length}</span>{" "}
                <span className="text-muted-foreground">cities</span>
              </span>
            </div>
            <div className="h-6 w-px bg-border" />
            <div className="text-sm text-muted-foreground">
              Total population:{" "}
              <span className="font-semibold text-foreground font-mono">
                {(cities.reduce((acc, city) => acc + city.population, 0) / 1000000).toFixed(1)}M
              </span>
            </div>
          </div>
          <Button
            onClick={openAddForm}
            className="gradient-warm text-primary-foreground hover:opacity-90 transition-all shadow-glow"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add City
          </Button>
        </div>

        <CityTable
          cities={cities}
          onEdit={openEditForm}
          onDelete={handleDeleteCity}
        />

        <CityForm
          open={isFormOpen}
          onOpenChange={(open) => {
            setIsFormOpen(open);
            if (!open) setEditingCity(null);
          }}
          onSubmit={editingCity ? handleEditCity : handleAddCity}
          editingCity={editingCity}
        />
      </div>
    </div>
  );
};

export default Index;
