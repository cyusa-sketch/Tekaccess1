import { useEffect, useState, useRef } from "react";
import { Users, ChevronLeft, ChevronRight, X, Briefcase, Target, Quote } from "lucide-react";
import useFirebase from "@/hooks/useFirebase";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  imageUrl?: string;
  about?: string;
  bio?: string;
  purpose?: string;
  experience?: string;
  quote?: string;
}

const fallbackImages = {
  team: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
};

const Team = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const { isReady, getFirestore } = useFirebase();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReady) {
      loadTeam();
    }
  }, [isReady]);

  const loadTeam = async () => {
    const db = getFirestore();
    if (!db) {
      setError("Database not connected");
      setLoading(false);
      return;
    }

    try {
      const snapshot = await db.collection("team").get();

      if (snapshot.empty) {
        setTeam([]);
      } else {
        const teamData: TeamMember[] = [];
        snapshot.forEach((doc: { id: string; data: () => TeamMember }) => {
          teamData.push({ id: doc.id, ...doc.data() });
        });
        setTeam(teamData);
      }
    } catch (err) {
      console.error("Error loading team:", err);
      setError("Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  const scrollTo = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 320;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current && team.length > 0) {
      const container = scrollContainerRef.current;
      const scrollPosition = container.scrollLeft;
      const cardWidth = 320;
      const newIndex = Math.round(scrollPosition / cardWidth);
      setActiveIndex(Math.min(newIndex, team.length - 1));
    }
  };

  const openMemberProfile = (member: TeamMember) => {
    setSelectedMember(member);
  };

  const closeMemberProfile = () => {
    setSelectedMember(null);
  };

  return (
    <section id="team" className="section-team relative py-20 overflow-hidden bg-muted/30">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="relative mb-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              <span className="text-foreground">Meet the </span>
              <span className="gradient-text">Team</span>
            </h2>
            <p className="max-w-xl text-muted-foreground">
              The dedicated professionals behind our success
            </p>
          </div>
          
          {/* Navigation Arrows */}
          {team.length > 0 && (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scrollTo('left')}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
                aria-label="Previous team member"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollTo('right')}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
                aria-label="Next team member"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="glass-spinner" />
            <p className="mt-4 text-muted-foreground">Loading team members...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="glass-card mx-auto max-w-md p-8 text-center border border-destructive/20">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <Users className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              Oops! Something went wrong
            </h3>
            <p className="mb-4 text-muted-foreground">{error}</p>
            <button onClick={loadTeam} className="gradient-btn text-sm">
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && team.length === 0 && (
          <div className="glass-card mx-auto max-w-md p-12 text-center border-2 border-dashed border-primary/30">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20">
              <Users className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              Meet Our Team
            </h3>
            <p className="text-muted-foreground">Team profiles coming soon!</p>
          </div>
        )}

        {/* Team Horizontal Scroll */}
        {!loading && !error && team.length > 0 && (
          <>
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {team.map((member, index) => (
                <div
                  key={member.id}
                  onClick={() => openMemberProfile(member)}
                  className="relative flex-shrink-0 w-[280px] sm:w-[320px] h-[420px] sm:h-[480px] rounded-3xl overflow-hidden snap-center group cursor-pointer transition-all duration-500 hover:scale-[0.98] hover:shadow-2xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Full Image Background */}
                  <img
                    src={member.imageUrl || fallbackImages.team}
                    alt={member.name || "Team Member"}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = fallbackImages.team;
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Click Indicator */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to view
                  </div>
                  
                  {/* Content at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h4 className="text-2xl font-bold mb-1">
                      {member.name || "Team Member"}
                    </h4>
                    <p className="text-sm text-white/80 font-medium uppercase tracking-wider">
                      {member.position || "Position"}
                    </p>
                    {(member.about || member.bio) && (
                      <p className="mt-3 text-sm text-white/70 line-clamp-2 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        {member.about || member.bio}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {team.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (scrollContainerRef.current) {
                      scrollContainerRef.current.scrollTo({
                        left: index * 320,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'w-8 bg-primary' 
                      : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to team member ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Team Member Profile Modal */}
      <Dialog open={!!selectedMember} onOpenChange={(open) => !open && closeMemberProfile()}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border-0 rounded-3xl animate-in zoom-in-95 duration-300">
          {selectedMember && (
            <div className="flex flex-col lg:flex-row min-h-[500px]">
              {/* Image Side */}
              <div className="relative lg:w-2/5 h-64 lg:h-auto">
                <img
                  src={selectedMember.imageUrl || fallbackImages.team}
                  alt={selectedMember.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImages.team;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-background via-background/50 to-transparent" />
                
                {/* Name overlay on mobile */}
                <div className="absolute bottom-4 left-4 lg:hidden">
                  <h3 className="text-2xl font-bold text-foreground">{selectedMember.name}</h3>
                  <p className="text-primary font-medium">{selectedMember.position}</p>
                </div>
              </div>

              {/* Content Side */}
              <div className="lg:w-3/5 p-8 lg:p-10 flex flex-col">
                {/* Close Button */}
                <button
                  onClick={closeMemberProfile}
                  className="absolute top-4 right-4 z-10 h-10 w-10 flex items-center justify-center rounded-full bg-muted/80 backdrop-blur-sm hover:bg-muted transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Name - Desktop */}
                <div className="hidden lg:block mb-6">
                  <h3 className="text-3xl font-bold text-foreground mb-1">{selectedMember.name}</h3>
                  <p className="text-lg text-primary font-medium">{selectedMember.position}</p>
                </div>

                {/* Bio Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground">About</h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedMember.about || selectedMember.bio || "A dedicated professional committed to delivering excellence in every project."}
                  </p>
                </div>

                {/* Purpose Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <Target className="h-4 w-4 text-accent" />
                    </div>
                    <h4 className="font-semibold text-foreground">Purpose & Vision</h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedMember.purpose || "Driven by a passion to create meaningful impact and contribute to the organization's growth and success."}
                  </p>
                </div>

                {/* Experience Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-full bg-secondary/50 flex items-center justify-center">
                      <Briefcase className="h-4 w-4 text-foreground" />
                    </div>
                    <h4 className="font-semibold text-foreground">Experience</h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedMember.experience || "Years of industry experience bringing expertise and innovation to every challenge."}
                  </p>
                </div>

                {/* Quote Section */}
                {selectedMember.quote && (
                  <div className="mt-auto pt-6 border-t border-border">
                    <div className="flex gap-3">
                      <Quote className="h-6 w-6 text-primary/50 flex-shrink-0 mt-1" />
                      <p className="text-lg italic text-muted-foreground">
                        "{selectedMember.quote}"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Team;
