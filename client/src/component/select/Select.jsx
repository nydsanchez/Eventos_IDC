import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../redux/actions";

const Select = ({ entityType, handleFilter, idKey, nameKey }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state[entityType].data);

  useEffect(() => {
    dispatch(getData(entityType));
  }, [dispatch, entityType]);

  const handleEntityChange = (event) => {
    const selectedOptionId = event.target.value;
    const selectedEntity = data.find(
      (entity) => entity[idKey] === selectedOptionId
    );
    handleFilter(selectedEntity);
  };

  return (
    <div>
      <select onChange={handleEntityChange}>
        {data.map((entity) => (
          <option key={entity[idKey]} value={entity[idKey]}>
            {entity[nameKey]}{" "}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
