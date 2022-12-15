document.addEventListener('DOMContentLoaded', () => {

    console.log('%c HI', 'color: firebrick')


    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    const breedArray = [];
    const dogList = document.querySelector('ul#dog-breeds');
    const dropDownMenu = document.querySelector('#breed-dropdown');

    /////functions:

    function createBreedArray(data) {
        let str = "";
        for (const key in data) {
            if (data[key].length > 0) {
                data[key].forEach(descriptor => {
                str = descriptor.toString() + ' ' + key.toString();
                breedArray.push(str);
                });
            } 
            else {
                str = key.toString();
                breedArray.push(str);
            }
        }
        return breedArray;
    }

    function addImages(data) {
        const dogPics = document.querySelector('div#dog-image-container');
        data.forEach(imageUrl => {
            const pic = document.createElement('img');
            pic.src = imageUrl;
            dogPics.appendChild(pic);
        })
    }

    function addBreed(arr) {
        arr.forEach(breedName => {
            const li = document.createElement('li');
            li.innerText = breedName;
            dogList.appendChild(li);
            li.addEventListener('click', () => {
                li.style.color = "pink";
            });
        });
    }

    function specificLetter(parent, letter) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        const newArr = breedArray.filter(dog => dog.charAt(0) === letter); 
        addBreed(newArr);
    }

    function chooseLetter(e) {
        const selectedLetter =e.target.options[e.target.selectedIndex].value; 
        specificLetter(dogList, selectedLetter);
    }


    fetch(imgUrl)
    .then(resp => resp.json())
    .then(data => addImages(data.message));

    fetch(breedUrl)
    .then(resp => resp.json())
    .then(data => createBreedArray(data.message))
    .then(array => addBreed(array));

    dropDownMenu.addEventListener('change', chooseLetter);

    
});