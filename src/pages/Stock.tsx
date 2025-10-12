import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useVehicles } from "@/hooks/useVehicles";

const Stock = () => {
  const { data: allVehicles, isLoading } = useVehicles();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMake, setSelectedMake] = useState<string>("all");
  const [selectedFuelType, setSelectedFuelType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recent");

  // Obtenir les marques uniques des véhicules
  const uniqueMakes = useMemo(() => {
    if (!allVehicles) return [];
    return Array.from(new Set(allVehicles.map(v => v.make))).sort();
  }, [allVehicles]);

  // Obtenir les types de carburant uniques
  const uniqueFuelTypes = useMemo(() => {
    if (!allVehicles) return [];
    return Array.from(new Set(allVehicles.map(v => v.fuel_type))).sort();
  }, [allVehicles]);

  // Filtrer et trier les véhicules
  const filteredVehicles = useMemo(() => {
    if (!allVehicles) return [];
    
    let filtered = allVehicles.filter(vehicle => {
      // Filtre par recherche
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchName = vehicle.name.toLowerCase().includes(query);
        const matchMake = vehicle.make.toLowerCase().includes(query);
        const matchModel = vehicle.model.toLowerCase().includes(query);
        if (!matchName && !matchMake && !matchModel) return false;
      }
      
      // Filtre par marque
      if (selectedMake !== "all" && vehicle.make !== selectedMake) return false;
      
      // Filtre par carburant
      if (selectedFuelType !== "all" && vehicle.fuel_type !== selectedFuelType) return false;
      
      return true;
    });

    // Tri
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "year":
        filtered.sort((a, b) => b.year - a.year);
        break;
      default: // recent
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return filtered;
  }, [allVehicles, searchQuery, selectedMake, selectedFuelType, sortBy]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explorez Notre Stock</h1>
            <p className="text-xl text-muted-foreground">
              {isLoading ? "Chargement..." : `${filteredVehicles.length} véhicules disponibles`}
            </p>
          </div>

          {/* Barre de recherche et filtres */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Barre de recherche */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher un véhicule (marque, modèle...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              {/* Filtres compacts */}
              <div className="flex flex-wrap gap-3">
                {/* Filtre Marque */}
                <Select value={selectedMake} onValueChange={setSelectedMake}>
                  <SelectTrigger className="w-[160px] h-12">
                    <SelectValue placeholder="Marque" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes marques</SelectItem>
                    {uniqueMakes.map((make) => (
                      <SelectItem key={make} value={make}>
                        {make}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Filtre Carburant */}
                <Select value={selectedFuelType} onValueChange={setSelectedFuelType}>
                  <SelectTrigger className="w-[160px] h-12">
                    <SelectValue placeholder="Carburant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous types</SelectItem>
                    {uniqueFuelTypes.map((fuel) => (
                      <SelectItem key={fuel} value={fuel}>
                        {fuel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Tri */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px] h-12">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Plus récents</SelectItem>
                    <SelectItem value="price-asc">Prix croissant</SelectItem>
                    <SelectItem value="price-desc">Prix décroissant</SelectItem>
                    <SelectItem value="name">Nom (A-Z)</SelectItem>
                    <SelectItem value="year">Année</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Vehicle Grid */}
          <div>
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Chargement des véhicules...</p>
              </div>
            ) : filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard 
                    key={vehicle.id}
                    id={vehicle.id}
                    name={vehicle.name}
                    price={`À partir de ${vehicle.price.toLocaleString()} ${vehicle.currency}`}
                    image={vehicle.image_url}
                    year={vehicle.year.toString()}
                    mileage={`${vehicle.mileage.toLocaleString()} km`}
                    fuel={vehicle.fuel_type}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {searchQuery || selectedMake !== "all" || selectedFuelType !== "all" 
                    ? "Aucun véhicule ne correspond à vos critères de recherche." 
                    : "Aucun véhicule disponible pour le moment."}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Stock;
