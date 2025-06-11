/** @format */

// utils/scroll.utils.ts
export interface ScrollOptions {
  behavior?: "auto" | "smooth";
  block?: "start" | "center" | "end" | "nearest";
  inline?: "start" | "center" | "end" | "nearest";
  offset?: number; // Additional offset in pixels
}

/**
 * Smart scroll for pagination
 * Scrolls to content area with proper offset to keep navigation visible
 */
export const scrollToContent = (options: ScrollOptions = {}) => {
  if (typeof window === "undefined") return;

  const {
    behavior = "smooth",
    offset = 120, // Default offset to keep header/nav visible
  } = options;

  // Try to find specific content container first
  const contentElement = document.querySelector(
    "[data-mahasiswa-content]"
  ) as HTMLElement;

  if (contentElement) {
    // Calculate position with offset
    const elementRect = contentElement.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const scrollToPosition = Math.max(0, absoluteElementTop - offset);

    window.scrollTo({
      top: scrollToPosition,
      behavior,
    });
  } else {
    // Fallback: scroll to top with offset
    window.scrollTo({
      top: offset,
      behavior,
    });
  }
};

/**
 * Scroll to statistics section
 */
export const scrollToStatistics = () => {
  const statsElement = document.querySelector(
    "[data-statistics]"
  ) as HTMLElement;
  if (statsElement) {
    statsElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else {
    scrollToContent({ offset: 80 });
  }
};

/**
 * Scroll to search/filter section
 */
export const scrollToFilters = () => {
  const filtersElement = document.querySelector(
    "[data-filters]"
  ) as HTMLElement;
  if (filtersElement) {
    filtersElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else {
    scrollToContent({ offset: 200 });
  }
};

/**
 * Get optimal scroll position for pagination
 * Considers header height, search filters, etc.
 */
export const getOptimalScrollPosition = (): number => {
  if (typeof window === "undefined") return 0;

  const header = document.querySelector("header") as HTMLElement;
  const navigation = document.querySelector("nav") as HTMLElement;
  const filters = document.querySelector("[data-filters]") as HTMLElement;

  let offset = 20; // Base offset

  if (header) {
    offset += header.offsetHeight;
  }

  if (navigation) {
    offset += navigation.offsetHeight;
  }

  if (filters) {
    offset += Math.min(filters.offsetHeight, 100); // Don't offset too much for tall filters
  }

  return Math.min(offset, 200); // Cap at 200px
};

/**
 * Enhanced scroll to content with dynamic offset calculation
 */
export const smartScrollToContent = (customOffset?: number) => {
  const offset = customOffset ?? getOptimalScrollPosition();
  scrollToContent({ offset });
};

/**
 * Debounced scroll function to prevent excessive scroll events
 */
export const debouncedScroll = (() => {
  let timeoutId: NodeJS.Timeout;

  return (callback: () => void, delay: number = 100) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
})();

/**
 * Check if element is in viewport
 */
export const isElementInViewport = (element: HTMLElement): boolean => {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Smooth scroll with animation frame for better performance
 */
export const animatedScrollTo = (
  targetPosition: number,
  duration: number = 300
) => {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  const animation = (currentTime: number) => {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3);

    window.scrollTo(0, startPosition + distance * easeOut);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

/**
 * Hook for handling scroll behavior in React components
 */
export const useScrollBehavior = () => {
  const scrollToContentWithLoading = (showLoader: boolean = true) => {
    if (showLoader) {
      // Add slight delay to ensure loading state is visible
      setTimeout(() => {
        smartScrollToContent();
      }, 100);
    } else {
      smartScrollToContent();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return {
    scrollToContent: scrollToContentWithLoading,
    scrollToTop,
    scrollToBottom,
    scrollToFilters,
    scrollToStatistics,
    smartScrollToContent,
  };
};
