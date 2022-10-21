export const regexConditions = type => {
  switch (type) {
    case "email":
      return /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    // TODO: cambiar el password regex
    case "passwordHard":
      return /^[a-zA-Z0-9][a-zA-Z0-9./*_-]+/;
    case "name":
      return /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    case "address":
      return /[\w',-\\/.\s]/;
    case "path":
      console.log("path");
      return /^[A-Za-z0-9.:/]+[(".jpg")(".jpeg)(".png")("webp")]$/;
    case "phone":
      return /^(\+\d{1,3}( )?)?((\(\d{1,3}\))|\d{1,3})[- .]?\d{3,4}[- .]?\d{4}$/;
    case "age":
      return /^[0-9]{1,2}$/;
    default:
      return true;
  }
};
