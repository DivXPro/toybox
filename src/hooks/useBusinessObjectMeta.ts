import { BusinessObjectMeta, FieldMeta } from '../types/interface';

const useObjectMeta = (objectMeta: BusinessObjectMeta) => {
  const fields: FieldMeta[] = [];
  Object.keys(objectMeta.properties).forEach(key => {
    fields.push(objectMeta.properties[key]);
  });
  return fields.sort((a, b) => {
    if (b.index == null) {
      return -1;
    }
    if (a.index == null) {
      return 1;
    }
    return a.index - b.index;
  });
};

export default useObjectMeta;
