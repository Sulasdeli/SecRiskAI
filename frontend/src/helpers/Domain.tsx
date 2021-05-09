export const getDomain = () => {
  if (isProduction()) {
    return process.env.SERVER_PROD_URL;
  }
  return "http://localhost:8080";
};

const isProduction = () => {
  const isProd =  process.env.NODE_ENV === "production";
  if(isProd) {
    console.log=()=>{}
  }
  return isProd
};