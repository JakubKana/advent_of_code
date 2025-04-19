function measureInMs(
  originalMethod: (...args: unknown[]) => unknown,
  context: ClassMethodDecoratorContext
) {
  function measureDurationInMs(this: unknown, ...args: unknown[]) {
    const methodName = String(context.name);
    const perfNow = performance.now();
    console.log(`LOG: Measure started for ${methodName}`);
    const result = originalMethod.call(this, ...args);

    console.log(`LOG: Time taken: ${performance.now() - perfNow}ms`);
    return result;
  }

  return measureDurationInMs;
}

function logger(
  originalMethod: (...args: unknown[]) => unknown,
  context: ClassMethodDecoratorContext
) {
  function logMethod(this: unknown, ...args: unknown[]) {
    const methodName = String(context.name);
    console.log(`LOG: Method ${methodName} called with args: ${args}`);
    const result = originalMethod.call(this, ...args);
    return result;
  }

  return logMethod;
}

export { measureInMs, logger };
