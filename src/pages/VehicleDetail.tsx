import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Gauge, Fuel, ChevronLeft } from "lucide-react";
import { useVehicle } from "@/hooks/useVehicles";
import VehicleImageGallery from "@/components/VehicleImageGallery";
import VehicleVideoGallery from "@/components/VehicleVideoGallery";

const VehicleDetail = () => {
  const { id } = useParams();
  const { data: vehicle, isLoading, error } = useVehicle(id || "");

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center py-12">
            <p className="text-muted-foreground">Chargement du véhicule...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Véhicule non trouvé</h1>
            <Link to="/stock">
              <Button className="btn-gold">Retour au stock</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/stock" className="inline-flex items-center text-accent hover:text-accent/80 mb-6 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Retour au stock
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 border border-border">
                <img
                  src={vehicle.image_url}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{vehicle.name}</h1>
                <p className="text-3xl font-bold text-accent">
                  {vehicle.price.toLocaleString()} {vehicle.currency}
                </p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 bg-card p-4 rounded-lg border border-border">
                  <Calendar className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Année</p>
                    <p className="font-semibold">{vehicle.year}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-card p-4 rounded-lg border border-border">
                  <Gauge className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Kilométrage</p>
                    <p className="font-semibold">{vehicle.mileage.toLocaleString()} km</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-card p-4 rounded-lg border border-border">
                  <Fuel className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Carburant</p>
                    <p className="font-semibold">{vehicle.fuel_type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-card p-4 rounded-lg border border-border">
                  <Gauge className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Puissance</p>
                    <p className="font-semibold">{vehicle.power}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold mb-3">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{vehicle.description}</p>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <Link to="/contact" className="block">
                  <Button className="w-full btn-gold">
                    DEMANDER UN ESSAI
                  </Button>
                </Link>
                <Link to="/contact" className="block">
                  <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    DEMANDER UN DEVIS
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <Separator className="my-12" />

          {/* Galerie d'images */}
          {vehicle.vehicle_images && vehicle.vehicle_images.length > 0 && (
            <VehicleImageGallery 
              images={vehicle.vehicle_images} 
              vehicleName={vehicle.name}
            />
          )}

          {/* Galerie de vidéos */}
          {vehicle.vehicle_videos && vehicle.vehicle_videos.length > 0 && (
            <VehicleVideoGallery 
              videos={vehicle.vehicle_videos} 
              vehicleName={vehicle.name}
            />
          )}

          {/* Features & Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Équipements</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vehicle.features.map((feature: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-sm bg-card p-3 rounded-lg border border-border"
                  >
                    <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specs */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Caractéristiques Techniques</h2>
              <div className="space-y-3">
                {Object.entries(vehicle.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center p-3 bg-card rounded-lg border border-border"
                  >
                    <span className="font-medium">{key}</span>
                    <span className="text-muted-foreground">{value as string}</span>
                  </div>
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

export default VehicleDetail;
