function measureInMs(originalMethod: Function) {
    return () => {
        const perfNow = performance.now();
        console.log("LOG: Measure started");
        const result = originalMethod();
        console.log(`LOG: Time taken: ${performance.now() - perfNow}ms`);
        if(result) return result;
    }
}


export {measureInMs};