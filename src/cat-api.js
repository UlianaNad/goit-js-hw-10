const BASE_URL = 'https://api.thecatapi.com/v1';
const options = {
    method: 'GET',
    headers: {
        'x-api-key': 'live_C2Ycp7892AHYPOBL4k31bMb9Y5D8aAHn8L35FkxKCXLCrMqb9PvN9BrclnA0aEv5',
    },
};

function fetchBreeds(){
    return fetch(`${BASE_URL}/breeds`, options)
    .then((res) => {
        if(!res.ok){
            throw new Error (res.status);
        }
        return res.json();
    });
};

function fetchCatByBreed(breedId){
    return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`,options).then(
        (res) => {
            if(!res.ok){
                throw new Error(res.status);
            }
            return res.json();
        }
    )
}

export {fetchBreeds, fetchCatByBreed};