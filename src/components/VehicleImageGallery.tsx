import { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { VehicleImage } from "@/lib/supabase";

interface VehicleImageGalleryProps {
  images: VehicleImage[];
  vehicleName: string;
}

const VehicleImageGallery = ({ images, vehicleName }: VehicleImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  const openModal = (index: number) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const nextImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">
        Galerie Photos ({images.length})
      </h2>
      
      {/* Grille d'images en cartes */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => openModal(index)}
            className="relative aspect-video rounded-lg overflow-hidden border border-border bg-muted group hover:border-accent transition-all duration-300 hover:shadow-lg"
          >
            <img
              src={image.image_url}
              alt={image.alt_text || `${vehicleName} - Photo ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {/* Overlay avec icône au survol */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
              <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            {/* Numéro de l'image */}
            <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
              {index + 1}
            </div>
          </button>
        ))}
      </div>

      {/* Modal pour afficher l'image en grand */}
      <Dialog open={selectedIndex !== null} onOpenChange={closeModal}>
        <DialogContent className="max-w-6xl w-full p-0 bg-transparent border-none max-h-[90vh] overflow-hidden">
          <div className="relative bg-background/95 backdrop-blur-md rounded-lg overflow-hidden">
            {/* Image en grand */}
            {selectedIndex !== null && (
              <>
                <div className="relative aspect-video max-h-[65vh] bg-muted">
                  <img
                    src={images[selectedIndex].image_url}
                    alt={images[selectedIndex].alt_text || `${vehicleName} - Photo ${selectedIndex + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Informations sous l'image */}
                <div className="p-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {images[selectedIndex].alt_text || `Photo ${selectedIndex + 1}`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedIndex + 1} / {images.length}
                      </p>
                    </div>
                    
                    {/* Navigation dans le modal */}
                    {images.length > 1 && (
                      <div className="flex gap-2">
                        <Button
                          onClick={prevImage}
                          variant="outline"
                          size="icon"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <Button
                          onClick={nextImage}
                          variant="outline"
                          size="icon"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Miniatures dans le modal */}
                  {images.length > 1 && (
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                      {images.map((image, index) => (
                        <button
                          key={image.id}
                          onClick={() => setSelectedIndex(index)}
                          className={`relative flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                            index === selectedIndex
                              ? "border-accent scale-105"
                              : "border-border hover:border-accent/50 opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={image.image_url}
                            alt={`Miniature ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VehicleImageGallery;

