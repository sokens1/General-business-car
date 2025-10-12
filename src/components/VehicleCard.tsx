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
    <Card className="vehicle-card group">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <CardContent className="p-4 space-y-2">
        <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
          {name}
        </h3>
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          {year && <span>• {year}</span>}
          {mileage && <span>• {mileage}</span>}
          {fuel && <span>• {fuel}</span>}
        </div>
        <p className="text-2xl font-bold text-accent">{price}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link to={`/vehicle/${id}`} className="w-full">
          <Button className="w-full btn-gold">
            VOIR DÉTAILS
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default VehicleCard;
