export default function mapObject(object, callback){
  var keys = Object.keys(object)
  var array = keys.map(function(key) {
    return callback(object[key], key)
  })
  return array
}