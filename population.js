const Promise = require('bluebird');
const axios = require('axios');

//task01-1
axios.get('https://pokeapi.co/api/v2/pokemon/228')
    .then(res => {
        console.log('==========================TASK 1==========================');
        console.log(`name: ${res.data.name}\nweight: ${res.data.weight}\nheight: ${res.data.height} `);
    })
    .catch(err => {
        console.error(err);
    });


//task01-2
let req = [];
for (let i = 0; i < 3; i++) {
    req.push(axios.get('https://pokeapi.co/api/v2/pokemon/?limit=10'));
}
Promise.all(req).then(results => {
    console.log('==========================TASK 2==========================');
    results.forEach((value, idx) => {
        value.data.results.forEach((pokemon, pokIdx) => {
            console.log(`${idx}: ${pokIdx} - ${pokemon.name}`);
        });
        console.log('-------------')
    })
})
    .catch((err) => {
        console.error(err);
    });

//task01-3
Promise.any([
    axios.get('https://pokeapi.co/api/v2/pokemon/1/'),
    axios.get('https://pokeapi.co/api/v2/pokemon/4/'),
    axios.get('https://pokeapi.co/api/v2/pokemon/7/')
])
    .then(value => {
    console.log('==========================TASK 3==========================');
    console.log(value.data.name)
})
    .catch(err => {
        console.error(err)
    });

//task01-4
Promise.props({
    pokemons: axios.get('http://pokeapi.co/api/v2/pokemon/?limit=10'),
    items: axios.get('http://pokeapi.co/api/v2/item/?limit=10'),
    locations: axios.get('http://pokeapi.co/api/v2/location/?limit=10')
})
    .then(results => {
        console.log('==========================TASK 4==========================');
        Object.values(results).forEach(prop => {
            prop.data.results.forEach(value => {
                console.log(value.name)
            });
            console.log('-------------')
        })
    })
    .catch(err => {
        console.error(err)
    });

//task01-5
Promise.map([1, 2, 3, 4], id => {
    return axios.get(`https://pokeapi.co/api/v2/berry/${id}/`)
})
    .then(res => {
        console.log('==========================TASK 5==========================');
        res.forEach(value => {
            console.log(value.data.name)
        })
    })
    .catch(err => {
        console.error(err)
    })



