import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataChurch } from "../../features/church/churchSlice";

import PropTypes from "prop-types";

const SelectChurch = ({ selectedChurchId, onChange }) => {
  SelectChurch.propTypes = {
    selectedChurchId: PropTypes.string.isRequired, // onClose debe ser una función y es requerida
    onChange: PropTypes.func.isRequired, // isModal debe ser un booleano y es requerido
  };

  const dispatch = useDispatch();
  const data = useSelector((state) => state.churches?.data);
  const status = useSelector((state) => state.churches?.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getDataChurch());
    }
  }, [status, dispatch]);

  const handleSelectChange = (event) => {
    const selectedOptionId = event.target.value;
    const selectedChurch = data?.find(
      (entity) => entity.id === selectedOptionId
    );
    onChange(selectedOptionId, selectedChurch); // Llama a la función onChange prop
  };

  return (
    <select value={selectedChurchId} onChange={handleSelectChange}>
      <option value="">Seleccione una opción</option>
      {data && data.length > 0 ? (
        data.map((church) => (
          <option key={church.id} value={church.id}>
            {church.church_name}
          </option>
        ))
      ) : (
        <option value="" disabled>
          No hay datos disponibles
        </option>
      )}
    </select>
  );
};

export default SelectChurch;
