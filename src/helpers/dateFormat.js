export const getDateFormatted = date => {
  const creationDateMs = new Date(date).getTime();
  const today = new Date(Date.now());
  const diff = today.getTime() - creationDateMs;
  const days = diff / (1000 * 60 * 60 * 24);
  const day = new Date(Date.parse(date));
  const dateNumber = day.getDate();
  const hour = day.getHours();
  const minute = day.getMinutes();
  const month = day.getMonth();
  const year = day.getFullYear();
  const getDayOfWeek = day => {
    switch (day) {
      case 0:
        return "Dom";
      case 1:
        return "Lun";
      case 2:
        return "Mar";
      case 3:
        return "Mie";
      case 4:
        return "Jue";
      case 5:
        return "Vie";
      case 6:
        return "Sab";
      default:
        return "Incorrecto";
    }
  };

  switch (true) {
    case days < 1 && today.getDate() === dateNumber:
      return "Hoy a las " + hour + ":" + minute + "hs";
    case days < 2:
      if (today.getDate() - 1 === dateNumber) {
        return "Ayer a las " + hour + ":" + minute + "hs";
      } else {
        return "Hace 2 días";
      }
    case days < 7:
      return `Hace ${Math.round(days)} dias`;
    case days >= 7 && days < 14:
      return "Hace una semana";
    case days >= 14 && days < 21:
      return "Hace dos semanas";
    case days >= 21 && days < 30:
      return "Hace tres semanas";
    case days >= 30 && days < 45:
      if (days > 30) {
        return (
          "Hace un mes y " +
          Math.round(today.getTime() - 30) +
          "días  a las " +
          hour +
          ":" +
          minute +
          "hs"
        );
      } else {
        return "Hace un mes a las " + hour + ":" + minute + "hs";
      }
    default:
      return `${getDayOfWeek(
        day.getDay()
      )}, ${dateNumber}/${month}/${year} a las ${hour}:${minute}hs`;
  }
};
