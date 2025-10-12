import { useState } from "react";
import { Play } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { VehicleVideo } from "@/lib/supabase";

interface VehicleVideoGalleryProps {
  videos: VehicleVideo[];
  vehicleName: string;
}

// Fonction pour extraire l'ID YouTube
const getYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Fonction pour extraire l'ID Vimeo
const getVimeoId = (url: string): string | null => {
  const regExp = /vimeo.com\/(\d+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

const VehicleVideoGallery = ({ videos, vehicleName }: VehicleVideoGalleryProps) => {
  const [selectedVideo, setSelectedVideo] = useState<VehicleVideo | null>(null);

  if (!videos || videos.length === 0) {
    return null;
  }

  const openVideo = (video: VehicleVideo) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const renderVideoEmbed = (video: VehicleVideo) => {
    if (video.video_type === 'youtube') {
      const videoId = getYouTubeId(video.video_url);
      if (videoId) {
        return (
          <iframe
            className="w-full aspect-video"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      }
    } else if (video.video_type === 'vimeo') {
      const videoId = getVimeoId(video.video_url);
      if (videoId) {
        return (
          <iframe
            className="w-full aspect-video"
            src={`https://player.vimeo.com/video/${videoId}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        );
      }
    } else if (video.video_type === 'direct') {
      return (
        <video
          className="w-full aspect-video"
          controls
          autoPlay
          src={video.video_url}
        >
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
      );
    }
    return <p>Format vidéo non supporté</p>;
  };

  const getThumbnail = (video: VehicleVideo): string => {
    if (video.thumbnail_url) {
      return video.thumbnail_url;
    }
    
    if (video.video_type === 'youtube') {
      const videoId = getYouTubeId(video.video_url);
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    } else if (video.video_type === 'vimeo') {
      // Vimeo nécessite une API call pour la thumbnail, on utilise un placeholder
      return 'https://placehold.co/600x400/1a1a1a/FFD700?text=Vidéo+Vimeo';
    }
    
    return 'https://placehold.co/600x400/1a1a1a/FFD700?text=Vidéo';
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">
        Vidéos ({videos.length})
      </h2>
      
      {/* Grille de vidéos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => openVideo(video)}
            className="relative aspect-video rounded-lg overflow-hidden border border-border bg-muted group hover:border-accent transition-all duration-300 hover:shadow-lg"
          >
            <img
              src={getThumbnail(video)}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Overlay avec icône play */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-accent/90 group-hover:bg-accent group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
                <Play className="w-8 h-8 text-accent-foreground fill-current ml-1" />
              </div>
            </div>

            {/* Titre de la vidéo */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-white font-medium text-sm line-clamp-2">
                {video.title}
              </p>
              {video.duration && (
                <p className="text-white/70 text-xs mt-1">
                  {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Modal pour lire la vidéo */}
      <Dialog open={selectedVideo !== null} onOpenChange={closeVideo}>
        <DialogContent className="max-w-5xl w-full p-0 bg-transparent border-none">
          <div className="relative bg-background rounded-lg overflow-hidden">
            {selectedVideo && (
              <>
                {/* Vidéo */}
                <div className="bg-black">
                  {renderVideoEmbed(selectedVideo)}
                </div>

                {/* Informations */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{selectedVideo.title}</h3>
                  {selectedVideo.description && (
                    <p className="text-muted-foreground">{selectedVideo.description}</p>
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

export default VehicleVideoGallery;

