/** @format */

// components/loading/BeritaLoading.tsx
"use client";

interface BeritaLoadingProps {
  viewMode?: "list" | "grid";
  count?: number;
}

const BeritaLoading = ({
  viewMode = "list",
  count = 6,
}: BeritaLoadingProps) => {
  // List View Skeleton
  const ListSkeleton = () => (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="card bg-base-100 shadow-xl animate-pulse">
          <div className="card-body p-4">
            <div className="flex items-start space-x-4">
              {/* Image skeleton */}
              <div className="shrink-0">
                <div className="w-40 h-32 bg-base-300 rounded-lg"></div>
              </div>

              <div className="flex-1 min-w-0 space-y-3">
                {/* Title skeleton */}
                <div className="space-y-2">
                  <div className="h-6 bg-base-300 rounded w-3/4"></div>
                  <div className="h-6 bg-base-300 rounded w-1/2"></div>
                </div>

                {/* Content skeleton */}
                <div className="space-y-2">
                  <div className="h-4 bg-base-300 rounded w-full"></div>
                  <div className="h-4 bg-base-300 rounded w-5/6"></div>
                  <div className="h-4 bg-base-300 rounded w-4/6"></div>
                </div>

                {/* Meta skeleton */}
                <div className="flex items-center gap-4 mt-3">
                  <div className="h-3 bg-base-300 rounded w-20"></div>
                  <div className="h-3 bg-base-300 rounded w-24"></div>
                  <div className="h-3 bg-base-300 rounded w-16"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Grid View Skeleton
  const GridSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="card bg-base-100 shadow-xl animate-pulse">
          {/* Image skeleton */}
          <figure className="relative overflow-hidden">
            <div className="w-full h-48 bg-base-300"></div>
            <div className="absolute top-2 right-2">
              <div className="w-12 h-5 bg-base-300 rounded-full"></div>
            </div>
          </figure>

          <div className="card-body p-4 space-y-3">
            {/* Title skeleton */}
            <div className="space-y-2">
              <div className="h-5 bg-base-300 rounded w-full"></div>
              <div className="h-5 bg-base-300 rounded w-3/4"></div>
            </div>

            {/* Content skeleton */}
            <div className="space-y-2">
              <div className="h-3 bg-base-300 rounded w-full"></div>
              <div className="h-3 bg-base-300 rounded w-2/3"></div>
            </div>

            {/* Actions skeleton */}
            <div className="flex justify-between items-center mt-4">
              <div className="space-y-1">
                <div className="h-3 bg-base-300 rounded w-16"></div>
                <div className="h-3 bg-base-300 rounded w-20"></div>
              </div>
              <div className="h-6 w-12 bg-base-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return viewMode === "grid" ? <GridSkeleton /> : <ListSkeleton />;
};

export default BeritaLoading;
