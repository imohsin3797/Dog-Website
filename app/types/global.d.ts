// types/global.d.ts
declare global {
    type PageProps<ParamsType = Record<string, any>> = {
      params: ParamsType;
    };
  }
  
  export {};
  