export const regexConditions = type => {
  switch (type) {
    case "email":
      return /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    case "passwordHard":
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!$%@.]).{8,24}$/;
    case "name":
      return /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    case "address":
      return /[\w',-\\/.\s]/;
    case "path":
      console.log("path");
      return /^[A-Za-z0-9.:/]+[(".jpg")(".png")("webp")]$/;
    case "phone":
      return /^(\+\d{1,3}( )?)?((\(\d{1,3}\))|\d{1,3})[- .]?\d{3,4}[- .]?\d{4}$/;
    default:
      return true;
  }
};
