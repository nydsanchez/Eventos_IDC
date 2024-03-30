import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../redux/actions";
import PropTypes from "prop-types";

const Select = ({ entityType, handleFilter, idKey, nameKey }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state[entityType]?.data);

  useEffect(() => {
    if (!data) {
      dispatch(addData(entityType));
    }
  }, [dispatch, entityType, data]);

  const handleEntityChange = (event) => {
    const selectedOptionId = event.target.value;
    const selectedEntity = data?.find(
      (entity) => entity[idKey] === selectedOptionId
    );
    if (selectedEntity) {
      handleFilter(selectedEntity);
    }
  };

  return (
    <div>
      <select onChange={handleEntityChange}>
        <option value="">Seleccione una opción</option>
        {data && data.length > 0 ? (
          data.map((entity) => (
            <option key={entity[idKey]} value={entity[idKey]}>
              {entity[nameKey]}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No hay datos disponibles
          </option>
        )}
      </select>
    </div>
  );
};

Select.propTypes = {
  entityType: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
  idKey: PropTypes.string.isRequired,
  nameKey: PropTypes.string.isRequired,
};

export default Select;

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addData } from "../../redux/actions";
// import PropTypes from "prop-types";

// const Select = ({ entityType, handleFilter, idKey, nameKey }) => {
//   const dispatch = useDispatch();

//   const data = useSelector((state) => state.data[entityType]);
//   const loading = useSelector((state) => state.loading);

//   useEffect(() => {
//     if (!data && !loading) {
//       dispatch(addData(entityType));
//     }
//   }, [dispatch, entityType, data, loading]);

//   const handleEntityChange = (event) => {
//     const selectedOptionId = event.target.value;
//     if (data) {
//       const selectedEntity = data.find(
//         (entity) => entity[idKey] === selectedOptionId
//       );
//       if (selectedEntity) {
//         handleFilter(selectedEntity);
//       }
//     }
//   };

//   return (
//     <div>
//       {loading && <p>Cargando...</p>}
//       {data && data.length > 0 ? (
//         <select onChange={handleEntityChange}>
//           {data.map((entity) => (
//             <option key={entity[idKey]} value={entity[idKey]}>
//               {entity[nameKey]}
//             </option>
//           ))}
//         </select>
//       ) : (
//         <p>No hay datos disponibles</p>
//       )}
//     </div>
//   );
// };

// export default Select;

// Select.propTypes = {
//   entityType: PropTypes.string.isRequired,
//   handleFilter: PropTypes.func.isRequired,
//   idKey: PropTypes.string.isRequired,
//   nameKey: PropTypes.string.isRequired,
// };
