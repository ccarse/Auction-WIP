export function DelayPromise(delay: number) {  
  //return a function that accepts a single variable
  return (data: any): Promise<any> => {
    //this function returns a promise.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //a promise that is resolved after "delay" milliseconds with the data provided
        resolve(data);
      }, delay);
    });
  };
}
