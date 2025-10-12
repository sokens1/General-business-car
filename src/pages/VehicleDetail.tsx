import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Gauge, Fuel, ChevronLeft } from "lucide-react";
import vehicle1 from "@/assets/vehicle-1.jpg";
import vehicle2 from "@/assets/vehicle-2.jpg";
import vehicle3 from "@/assets/vehicle-3.jpg";
import vehicle4 from "@/assets/vehicle-4.jpg";

const VehicleDetail = () => {
  const { id } = useParams();

  // Mock data - would be fetched from API in production
  const vehicleData: Record<string, any> = {
    "1": {
      name: "BMW X7 M50i",
      price: "95 000 €",
      image: vehicle1,
      year: "2024",
      mileage: "0 km",
      fuel: "Essence",
      transmission: "Automatique",
      power: "530 ch",
      description:
        "Le BMW X7 M50i incarne le summum du luxe et de la performance. Ce SUV premium offre un espace généreux, des technologies de pointe et des performances exceptionnelles grâce à son moteur V8.",
      features: [
        "Toit panoramique",
        "Sièges en cuir Nappa",
        "Système audio Harman Kardon",
        "Caméra 360°",
        "Régulateur de vitesse adaptatif",
        "Affichage tête haute",
        "7 places",
        "Pack M Sport",
      ],
      specs: {
        "Moteur": "V8 4.4L Twin-Turbo",
        "Puissance": "530 ch",
        "Couple": "750 Nm",
        "0-100 km/h": "4.7 secondes",
        "Vitesse max": "250 km/h (bridée)",
        "Consommation": "12.5 L/100km",
        "Émissions CO2": "285 g/km",
      },
    },
  };

  const vehicle = vehicleData[id || "1"] || vehicleData["1"];

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
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{vehicle.name}</h1>
                <p className="text-3xl font-bold text-accent">{vehicle.price}</p>
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
                    <p className="font-semibold">{vehicle.mileage}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-card p-4 rounded-lg border border-border">
                  <Fuel className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Carburant</p>
                    <p className="font-semibold">{vehicle.fuel}</p>
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
                <Link to="/financing" className="block">
                  <Button variant="outline" className="w-full">
                    SIMULER UN FINANCEMENT
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <Separator className="my-12" />

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
