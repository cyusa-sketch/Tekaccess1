import { useEffect, useState } from "react";
import { Package, Truck, Warehouse, Ship, Plane, Clock, ArrowRight } from "lucide-react";
import useFirebase from "@/hooks/useFirebase";
interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  price?: number;
}
const fallbackImages = {
  service: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
};
const iconMap: {
  [key: string]: React.ElementType;
} = {
  package: Package,
  truck: Truck,
  warehouse: Warehouse,
  ship: Ship,
  plane: Plane,
  clock: Clock
};
const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {
    isReady,
    getFirestore
  } = useFirebase();
  useEffect(() => {
    if (isReady) {
      loadServices();
    }
  }, [isReady]);
  const loadServices = async () => {
    const db = getFirestore();
    if (!db) {
      setError("Database not connected");
      setLoading(false);
      return;
    }
    try {
      const snapshot = await db.collection("services").get();
      if (snapshot.empty) {
        setServices([]);
      } else {
        const servicesData: Service[] = [];
        snapshot.forEach((doc: {
          id: string;
          data: () => Service;
        }) => {
          servicesData.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setServices(servicesData);
      }
    } catch (err) {
      console.error("Error loading services:", err);
      setError("Failed to load services");
    } finally {
      setLoading(false);
    }
  };
  const getIconForService = (index: number) => {
    const icons = [Package, Truck, Warehouse, Ship, Plane, Clock];
    return icons[index % icons.length];
  };

  // Background colors for cards (soft, warm palette like the reference)
  const cardColors = ['bg-amber-50 dark:bg-amber-950/30', 'bg-emerald-50 dark:bg-emerald-950/30', 'bg-rose-50 dark:bg-rose-950/30', 'bg-sky-50 dark:bg-sky-950/30', 'bg-violet-50 dark:bg-violet-950/30', 'bg-orange-50 dark:bg-orange-950/30'];
  return <section id="services" className="section-services relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="relative mb-4 inline-block text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-foreground">Our </span>
            <span className="gradient-text">Services</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Comprehensive logistics solutions designed to streamline your supply chain
          </p>
        </div>

        {/* Loading State */}
        {loading && <div className="flex flex-col items-center justify-center py-20">
            <div className="glass-spinner" />
            <p className="mt-4 text-muted-foreground">Loading services...</p>
          </div>}

        {/* Error State */}
        {error && !loading && <div className="glass-card mx-auto max-w-md p-8 text-center border border-destructive/20">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <Package className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              Oops! Something went wrong
            </h3>
            <p className="mb-4 text-muted-foreground">{error}</p>
            <button onClick={loadServices} className="gradient-btn text-sm">
              Try Again
            </button>
          </div>}

        {/* Empty State */}
        {!loading && !error && services.length === 0 && <div className="glass-card mx-auto max-w-md p-12 text-center border-2 border-dashed border-primary/30">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20">
              <Package className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              No Services Available
            </h3>
            <p className="text-muted-foreground">
              We're currently updating our service offerings. Please check back soon!
            </p>
          </div>}

        {/* Services Grid - Mobile-style cards like the reference */}
        {!loading && !error && services.length > 0 && <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
          const Icon = getIconForService(index);
          const bgColor = cardColors[index % cardColors.length];
          return <div key={service.id} className={`group relative rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${bgColor}`} style={{
            animationDelay: `${index * 100}ms`
          }}>
                  {/* Card Content */}
                  <div className="p-6">
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 shadow-lg">
                      <img src={service.imageUrl || fallbackImages.service} alt={service.title || "Service"} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" onError={e => {
                  e.currentTarget.src = fallbackImages.service;
                }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Icon Badge */}
                      <div className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 dark:bg-background/90 shadow-lg backdrop-blur-sm">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>

                    {/* Text Content */}
                    <h3 className="mb-2 text-xl font-bold text-foreground">
                      {service.title || "Unnamed Service"}
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                      {service.description || "Description coming soon."}
                    </p>
                    
                    {/* Footer */}
                    
                  </div>
                </div>;
        })}
          </div>}
      </div>
    </section>;
};
export default Services;