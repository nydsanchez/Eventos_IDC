export default function validation(data) {
  let errors = {};

  if (data.name.trim() === "") {
    errors.e1 = "El nombre del evento es requerido";
  }
  if (data.name.length < 20) {
    errors.e1 = "El nombre del evento debe tener minimo 20 caracteres";
  }

  if (!data.event_type) {
    errors.e2 = "Debe seleccionar una opción";
  }

  if (!data.start_date) {
    errors.e3 = "La fecha de inicio es requerida";
  }

  if (!data.end_date) {
    errors.e4 = "La fecha de finalización es requerida";
  }

  if (data.start_date && data.end_date) {
    const startDate = new Date(data.start_date);
    const endDate = new Date(data.end_date);

    if (startDate > endDate) {
      errors.e3 = "La fecha de inicio no puede ser mayor a la fecha de fin";
      errors.e4 =
        "La fecha de fin debe ser igual o posterior a la fecha de inicio";
    }
  }

  if (data.tickets <= 0) {
    errors.e5 = "El número de cupos del evento debe ser mayor a 0";
  }
  // Otras validaciones para los demás campos si es necesario

  return errors;
}
