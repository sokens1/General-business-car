import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import vehicle1 from "@/assets/vehicle-1.jpg";
import vehicle2 from "@/assets/vehicle-2.jpg";
import vehicle3 from "@/assets/vehicle-3.jpg";
import vehicle4 from "@/assets/vehicle-4.jpg";

const Stock = () => {
  const [filters, setFilters] = useState({
    make: [] as string[],
    priceRange: [] as string[],
    fuelType: [] as string[],
  });

  const vehicles = [
    {
      id: "1",
      name: "BMW X7 M50i",
      price: "À partir de 95 000 €",
      image: vehicle1,
      year: "2024",
      mileage: "0 km",
      fuel: "Essence",
      make: "BMW",
    },
    {
      id: "2",
      name: "Lexus LX 600",
      price: "À partir de 110 000 €",
      image: vehicle2,
      year: "2024",
      mileage: "0 km",
      fuel: "Essence",
      make: "Lexus",
    },
    {
      id: "3",
      name: "Ford F-150 Raptor",
      price: "À partir de 75 000 €",
      image: vehicle3,
      year: "2024",
      mileage: "0 km",
      fuel: "Essence",
      make: "Ford",
    },
    {
      id: "4",
      name: "Hyundai Ioniq 6",
      price: "À partir de 55 000 €",
      image: vehicle4,
      year: "2024",
      mileage: "0 km",
      fuel: "Électrique",
      make: "Hyundai",
    },
    {
      id: "5",
      name: "BMW X5 xDrive45e",
      price: "À partir de 85 000 €",
      image: vehicle1,
      year: "2024",
      mileage: "5 000 km",
      fuel: "Hybride",
      make: "BMW",
    },
    {
      id: "6",
      name: "Lexus RX 500h",
      price: "À partir de 72 000 €",
      image: vehicle2,
      year: "2023",
      mileage: "12 000 km",
      fuel: "Hybride",
      make: "Lexus",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explorez Notre Stock</h1>
            <p className="text-xl text-muted-foreground">
              {vehicles.length} véhicules disponibles
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-64 space-y-6">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h2 className="text-lg font-bold mb-4">FILTRES</h2>
                
                {/* Make Filter */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm uppercase">Marque</h3>
                  {["BMW", "Lexus", "Ford", "Hyundai"].map((make) => (
                    <div key={make} className="flex items-center space-x-2">
                      <Checkbox id={`make-${make}`} />
                      <Label htmlFor={`make-${make}`} className="text-sm cursor-pointer">
                        {make}
                      </Label>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Price Range Filter */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm uppercase">Prix</h3>
                  {[
                    "< 50 000 €",
                    "50 000 € - 75 000 €",
                    "75 000 € - 100 000 €",
                    "> 100 000 €",
                  ].map((range) => (
                    <div key={range} className="flex items-center space-x-2">
                      <Checkbox id={`price-${range}`} />
                      <Label htmlFor={`price-${range}`} className="text-sm cursor-pointer">
                        {range}
                      </Label>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Fuel Type Filter */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm uppercase">Carburant</h3>
                  {["Essence", "Diesel", "Électrique", "Hybride"].map((fuel) => (
                    <div key={fuel} className="flex items-center space-x-2">
                      <Checkbox id={`fuel-${fuel}`} />
                      <Label htmlFor={`fuel-${fuel}`} className="text-sm cursor-pointer">
                        {fuel}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Vehicle Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} {...vehicle} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Stock;
