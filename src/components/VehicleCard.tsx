import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface VehicleCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  year?: string;
  mileage?: string;
  fuel?: string;
}

const VehicleCard = ({ id, name, price, image, year, mileage, fuel }: VehicleCardProps) => {
  return (
    <Card className="vehicle-card group animate-fade-in hover:shadow-[0_10px_40px_hsl(45,100%,55%,0.2)] transition-all duration-500">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="bg-accent/90 text-accent-foreground px-6 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            Voir Plus
          </div>
        </div>
      </div>
      <CardContent className="p-4 space-y-2">
        <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
          {name}
        </h3>
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          {year && <span className="transition-transform duration-300 group-hover:scale-105">• {year}</span>}
          {mileage && <span className="transition-transform duration-300 group-hover:scale-105" style={{ transitionDelay: '50ms' }}>• {mileage}</span>}
          {fuel && <span className="transition-transform duration-300 group-hover:scale-105" style={{ transitionDelay: '100ms' }}>• {fuel}</span>}
        </div>
        <p className="text-2xl font-bold text-accent transition-transform duration-300 group-hover:scale-110">{price}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link to={`/vehicle/${id}`} className="w-full">
          <Button className="w-full btn-gold transform transition-all duration-300 group-hover:translate-y-[-2px]">
            VOIR DÉTAILS
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default VehicleCard;
