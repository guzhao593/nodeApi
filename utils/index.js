exports.insertDataToDatabase = (insField, query, table) => {
  return `insert into ${table} (${insField.join(', ')}) values (${insField.map(item => `'${exports.threeElementOperation(query[item])}'`).join(', ')})`
}
exports.threeElementOperation =  (first, second = first, third = '') => {
  return first ? second : third
}
exports.updateDataToDatabase = (updateField, query, table, keyword) => {
  return `update ${table} set ${updateField.map(item => `${item}='${query[item]}'`).join(', ')} where ${keyword}='${query[keyword]}'`
}