/**
 * Throttling enforces a maximum number of times a function
 * can be called over time.
 *
 * @param func a function
 * @param wait time
 */
export function throttle(this: any, func: Function, wait: number) {
  let timeout: NodeJS.Timeout | null = null;
  let callbackArgs: IArguments | null = null;
  // eslint-disable-next-line consistent-this
  const context = this;

  const later = () => {
    func.apply(context, callbackArgs);
    timeout = null;
  };

  return function throttled() {
    if (!timeout) {
      callbackArgs = arguments;
      timeout = setTimeout(later, wait);
    }
  };
}
