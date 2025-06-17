function evenNumbers(numbers)
{
    evenNumbers = [];
    for(let i = 0; i <numbers.length; i++)
    {
        if(numbers[i] % 2 === 0 )
        {
            evenNumbers.push(numbers[i]);
        }
    }
    return evenNumbers;
}

var person = {
    name: "Mustafa",
    age: 21,
    address :{
        city: "Faisalabad",
        street: "Canal Road"
    }
};
function formatString(person) {
    return `
      Name: ${person.name}
      Age: ${person.age}
      Address: 
        ${person.address.street}
        ${person.address.city}
    `;
  }
console.log(formatString(person));