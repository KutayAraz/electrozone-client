export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: number | null = null;
  
    return function executedFunction(...args: Parameters<T>) {
      const later = () => {
        if (timeout !== null) {
          clearTimeout(timeout);
        }
        func(...args);
      };
  
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(later, wait) as unknown as number;
    };
  }
  