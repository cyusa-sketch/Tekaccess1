import { useEffect, useState } from "react";
import { Calendar, User, ArrowRight, X, Newspaper } from "lucide-react";
import useFirebase from "@/hooks/useFirebase";

interface Blog {
  id: string;
  collection: string;
  title?: string;
  name?: string;
  content?: string;
  body?: string;
  description?: string;
  text?: string;
  imageUrl?: string;
  date?: { seconds: number } | number;
  author?: string;
  category?: string;
}

const fallbackImages = {
  blog: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
};

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const { isReady, getFirestore } = useFirebase();

  useEffect(() => {
    if (isReady) {
      loadBlogs();
    }
  }, [isReady]);

  const loadBlogs = async () => {
    const db = getFirestore();
    if (!db) {
      setError("Database not connected");
      setLoading(false);
      return;
    }

    try {
      const allBlogs: Blog[] = [];

      // Try 'blogs' collection
      try {
        const blogsSnapshot = await db.collection("blogs").get();
        blogsSnapshot.forEach((doc: { id: string; data: () => Blog }) => {
          allBlogs.push({ id: doc.id, collection: "blogs", ...doc.data() });
        });
      } catch (err) {
        console.log("No 'blogs' collection:", err);
      }

      // Try 'blog' collection
      try {
        const blogSnapshot = await db.collection("blog").get();
        blogSnapshot.forEach((doc: { id: string; data: () => Blog }) => {
          allBlogs.push({ id: doc.id, collection: "blog", ...doc.data() });
        });
      } catch (err) {
        console.log("No 'blog' collection:", err);
      }

      // Sort by date
      allBlogs.sort((a, b) => {
        const dateA =
          a.date && typeof a.date === "object" ? a.date.seconds : (a.date as number) || 0;
        const dateB =
          b.date && typeof b.date === "object" ? b.date.seconds : (b.date as number) || 0;
        return dateB - dateA;
      });

      setBlogs(allBlogs);
    } catch (err) {
      console.error("Error loading blogs:", err);
      setError("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date?: { seconds: number } | number) => {
    if (!date) return "Recent";
    try {
      const timestamp =
        typeof date === "object" && date.seconds ? date.seconds * 1000 : date;
      return new Date(timestamp as number).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Recent";
    }
  };

  const getContent = (blog: Blog) => {
    return blog.content || blog.body || blog.description || blog.text || "";
  };

  const getTitle = (blog: Blog) => {
    return blog.title || blog.name || "Blog Post";
  };

  const getPreview = (blog: Blog) => {
    const content = getContent(blog);
    const plainText = content.replace(/<[^>]*>/g, "");
    return plainText.substring(0, 100) + (plainText.length > 100 ? "..." : "");
  };

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(blogs.map(blog => blog.category).filter(Boolean))) as string[]];
  
  // Filter blogs by category
  const filteredBlogs = activeCategory === "All" 
    ? blogs 
    : blogs.filter(blog => blog.category === activeCategory);

  return (
    <section id="blogs" className="section-blogs relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden bg-muted/20">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <h2 className="relative mb-4 inline-block text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-foreground">Latest </span>
            <span className="gradient-text">Insights</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Stay updated with the latest trends in logistics and supply chain
          </p>
        </div>

        {/* Category Tabs */}
        {!loading && !error && blogs.length > 0 && (
          <div className="mb-10 flex justify-center">
            <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-muted/50 backdrop-blur-sm">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="glass-spinner" />
            <p className="mt-4 text-muted-foreground">Loading blog posts...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="glass-card mx-auto max-w-md p-8 text-center border border-destructive/20">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <Newspaper className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              Oops! Something went wrong
            </h3>
            <p className="mb-4 text-muted-foreground">{error}</p>
            <button onClick={loadBlogs} className="gradient-btn text-sm">
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && blogs.length === 0 && (
          <div className="glass-card mx-auto max-w-md p-12 text-center border-2 border-dashed border-primary/30">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
              <Newspaper className="h-10 w-10 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              Blog Coming Soon!
            </h3>
            <p className="text-muted-foreground">
              We're working on our first blog post. Check back soon for industry
              insights.
            </p>
          </div>
        )}

        {/* Blogs Grid */}
        {!loading && !error && filteredBlogs.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog, index) => (
              <div
                key={`${blog.collection}-${blog.id}`}
                className="group relative bg-card rounded-3xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={blog.imageUrl || fallbackImages.blog}
                    alt={getTitle(blog)}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = fallbackImages.blog;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                  
                  {blog.category && (
                    <div className="absolute left-4 top-4">
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-lg">
                        {blog.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(blog.date)}
                    </div>
                    {blog.author && (
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        {blog.author}
                      </div>
                    )}
                  </div>

                  <h3 className="mb-3 text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {getTitle(blog)}
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                    {getPreview(blog)}
                  </p>

                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No results for filter */}
        {!loading && !error && blogs.length > 0 && filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts found in this category.</p>
          </div>
        )}

        {/* Blog Modal */}
        {selectedBlog && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
            onClick={() => setSelectedBlog(null)}
          >
            <div
              className="relative bg-card max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal Image */}
              {selectedBlog.imageUrl && (
                <img
                  src={selectedBlog.imageUrl}
                  alt={getTitle(selectedBlog)}
                  className="h-72 w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImages.blog;
                  }}
                />
              )}

              {/* Modal Content */}
              <div className="p-8">
                {/* Meta */}
                <div className="mb-6 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {formatDate(selectedBlog.date)}
                  </div>
                  {selectedBlog.author && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      {selectedBlog.author}
                    </div>
                  )}
                  {selectedBlog.category && (
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                      {selectedBlog.category}
                    </span>
                  )}
                </div>

                <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
                  {getTitle(selectedBlog)}
                </h2>

                <div
                  className="prose prose-lg max-w-none text-foreground/90"
                  dangerouslySetInnerHTML={{
                    __html: getContent(selectedBlog) || "No content available.",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
