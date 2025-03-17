import 'next';

declare module 'next' {
  interface PageProps<ParamsType = Record<string, any>> {
    params?: ParamsType;
  }
}
