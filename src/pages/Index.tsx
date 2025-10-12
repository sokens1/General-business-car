import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import VehicleCard from "@/components/VehicleCard";
import WhyChooseUs from "@/components/WhyChooseUs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useFeaturedVehicles } from "@/hooks/useVehicles";

const Index = () => {
  const { data: featuredVehicles, isLoading } = useFeaturedVehicles();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <HeroSection />

        {/* Special Offers Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="section-title">Offres Spéciales</h2>
              <p className="text-muted-foreground text-lg">
                Ne manquez pas nos promotions exceptionnelles
              </p>
            </div>
            <div className="bg-gradient-to-r from-accent/20 to-accent/10 rounded-xl p-8 md:p-12 border border-accent/30">
              <div className="max-w-3xl mx-auto text-center space-y-4">
                <h3 className="text-3xl md:text-4xl font-bold">
                  Jusqu'à -15% sur une sélection de véhicules
                </h3>
                <p className="text-lg text-muted-foreground">
                  Profitez de nos offres exclusives sur les modèles 2024
                </p>
                <Link to="/stock">
                  <Button className="btn-gold mt-4">
                    DÉCOUVRIR LES OFFRES
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Vehicles */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="section-title">Dernières Arrivées</h2>
                <p className="text-muted-foreground text-lg">
                  Découvrez nos nouveaux véhicules premium
                </p>
              </div>
              <Link to="/stock">
                <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground hidden md:flex">
                  VOIR TOUT LE STOCK
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {isLoading ? (
                <div className="col-span-4 text-center py-12">
                  <p className="text-muted-foreground">Chargement des véhicules...</p>
                </div>
              ) : featuredVehicles && featuredVehicles.length > 0 ? (
                featuredVehicles.map((vehicle) => (
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
                ))
              ) : (
                <div className="col-span-4 text-center py-12">
                  <p className="text-muted-foreground">Aucun véhicule en vedette pour le moment.</p>
                </div>
              )}
            </div>

            <div className="text-center mt-8 md:hidden">
              <Link to="/stock">
                <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  VOIR TOUT LE STOCK
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <WhyChooseUs />

        {/* CTA Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                Prêt à Trouver Votre Véhicule Idéal ?
              </h2>
              <p className="text-xl text-muted-foreground">
                Notre équipe d'experts est là pour vous accompagner dans votre projet automobile
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-6">
                <Link to="/stock">
                  <Button size="lg" className="btn-gold">
                    PARCOURIR LE STOCK
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    DEMANDER UN DEVIS
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
