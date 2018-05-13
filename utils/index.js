exports.insertDataToDatabase = (insField, query) => {
  return `insert into class (${insField.join(', ')}) values (${insField.map(item => `'${exports.threeElementOperation(query[item])}'`).join(', ')})`
}
exports.threeElementOperation =  (first, second = first, third = '') => {
  return first ? second : third
}