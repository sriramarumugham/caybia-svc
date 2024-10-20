export interface IRouteTypes {
  method: String;
  url: String;
}
const checkRoutesAndBypass = (
  routesArray: [IRouteTypes],
  method: string,
  url: string,
): any => {
  let newUrl = url.endsWith('/') ? url.substring(0, url.length) : url;
  let res =
    routesArray &&
    routesArray?.some((val: any) => {
      return (
        val?.method === method &&
        val?.url?.toLowerCase() === newUrl?.toLowerCase()
      );
    });
  return res;
};

export { checkRoutesAndBypass };
