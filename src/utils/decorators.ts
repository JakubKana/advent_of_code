function measureInMs(originalMethod: any, context: ClassMethodDecoratorContext) {

    function measureDurationInMs(this: any, ...args: any[]) {

        const methodName = String(context.name);
        const perfNow = performance.now();
        console.log(`LOG: Measure started for ${methodName}`);
        const result = originalMethod.call(this, ...args);

        console.log(`LOG: Time taken: ${performance.now() - perfNow}ms`);
        return result;
    }

    return measureDurationInMs;
}


export {measureInMs};