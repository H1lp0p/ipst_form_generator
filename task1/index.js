let path = 'F:\ipst\week2\task1\form-test-1.json'
json = fetch(path).then((res) => res.json())

console.log(json.title)