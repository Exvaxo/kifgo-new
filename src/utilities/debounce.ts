export type SearchFunction<T> = (query: T) => Promise<void> | any;

export default function debounce<T>(
  func: SearchFunction<T>,
  delay: number,
): SearchFunction<T> {
  let timeoutId: NodeJS.Timeout | null = null;
  let cancelPrevious: (() => void) | null = null;

  return function (query: T) {
    clearTimeout(timeoutId as NodeJS.Timeout);

    if (cancelPrevious) {
      // If there's a previous search, reject it
      cancelPrevious();
    }

    const promise = new Promise<void>((resolve, reject) => {
      cancelPrevious = () => {
        reject("Previous search terminated.");
      };

      timeoutId = setTimeout(async () => {
        try {
          await func(query);
          resolve();
        } catch (error) {
          reject(error);
        }
      }, delay);
    });

    return promise;
  };
}
