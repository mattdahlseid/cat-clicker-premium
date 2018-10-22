// Model
let model = [
    {
        name: 'POOR RICHARD',
        url: 'images/poor_richard.jpg',
        count: 0
    },
    {
        name: 'KAREN',
        url: 'images/karen.jpg',
        count: 0
    },
    {
        name: 'LEWIS',
        url: 'images/lewis.jpg',
        count: 0
    },
    {
        name: 'ROCKY',
        url: 'images/rocky.jpg',
        count: 0
    },
    {
        name: 'EDDIE',
        url: 'images/eddie.jpg',
        count: 0
    }
]

// Octopus
let octopus = (function() {
    let selectedCat = model[0];

    function init() {
        catView.init();
        catView.render(selectedCat);
        catView.submit(model);
        catView.cancel(model);
        catView.showControlPanel();
        listView.render(model);
        listView.init();
        listView.select();
    }

    // adds count to cat when catPic is clicked
    function catClicked() {
        if (selectedCat.count >= 999) {
            alert('Cats only have 9 lives and 999 clicks.\nPlease type in a lower click count to continue clicking this cat.\nOr spread the love and click another kitty.') 
            } else {
        selectedCat.count++;
            }
        catView.render(selectedCat);
    }

    // changes display image and info to selected cat
    function updateSelectedCat(name) {
        selectedCat = model.find(function(cat) {
            return cat.name === name;
        })
        catView.render(selectedCat);
    }

    function cancelUpdate(cats) {
        cats.forEach(function(cat) {
            if (cat.name === selectedCat.name) {
                return cat === cat;
            }
        })
        catView.render(selectedCat)
    }

    function updateCatInfo(cats) {
        let activeCell = document.querySelector('.active');
        let newName = document.querySelector('#name').value;
        let newImage = document.querySelector('#image').value;
        let newCount = document.querySelector('#clicks').value;
        let clickCount = document.querySelector('#clickCount');
        let catName = document.querySelector('#catName');
        let catPhoto = document.querySelector('.catPic');
        activeCell.innerText = newName;
        catName.innerText = newName;

        // prevent click count from getting too big for counter box
        if (newCount > 999) {
            alert('Cats only have 9 lives and 999 clicks.\nPlease type in a lower click count to continue clicking this cat.\nOr spread the love and click another kitty.');
            newCount = clickCount.innerText;
        } else {
            clickCount.innerText = newCount;
        }

        // prevent non-jpg image from being used
        if (newImage.endsWith('.jpg') == false) {
            alert('Please paste a .jpg file here.')
            newImage = catPhoto.src;
        } else {
            catPhoto.src = newImage;
        }

        cats.forEach(function(cat) {
            if (cat.name === selectedCat.name) {
                cat.name = newName;
                cat.count = newCount;
                cat.url = newImage;
            }
        })

    }


    return {
        init,
        catClicked,
        updateSelectedCat,
        cancelUpdate,
        updateCatInfo
    }

})();


// View
let catView = (function() {
    let featuredCat = document.querySelector('#featuredCat');
    let catForm = document.querySelector('#catForm');
    let submitButton = document.querySelector('#submitButton');
    let cancelButton = document.querySelector('#cancelButton');
    let countBox = document.querySelector('#countBox');

    function init() {
        featuredCat.addEventListener('click', octopus.catClicked);
    }

    // updates info for displayed cat
    function render(cat) {
        // updates main image, cat name and count 
        featuredCat.innerHTML = `
            <div id="catName">${cat.name}</div>
            <img src="${cat.url}" class="catPic">
        `;

        countBox.innerHTML = `click count
            <div id="clickCount">${cat.count}</div>
        `;

        // updates cat info in catForm
        catForm.innerHTML = `
            name: <input type="text" id="name" value="${cat.name}"/>
            <br>
            image: <input type="text" id="image" value="${cat.url}"/>
            <br>
            clicks: <input type="text" id="clicks" value="${cat.count}" maxlength="3" min="1"/>
            <br>
        `;
    }

    function submit(cats) {
        submitButton.addEventListener('click', function() {
            octopus.updateCatInfo(cats);
        });
    }


    function showControlPanel() {
        let adminControls = document.querySelector('#adminControls');
        let showControl = document.querySelector('#showControl');
        showControl.addEventListener('click', function() {
            if (adminControls.classList.contains('hidden')) {
                adminControls.classList.replace('hidden', 'visible');
            } else {
                adminControls.classList.replace('visible', 'hidden');
            }
        });
    }

    function cancel(cats) {
        cancelButton.addEventListener('click', function() {
            octopus.cancelUpdate(cats);
        })
    }

    return {
        init,
        render,
        submit,
        cancel,
        showControlPanel
    }

})();

let listView = (function() {
    let catList = document.querySelector('#catList');

    // dynamically creates the cat list column
    function render(cats) {
        for (let i = 0; i < cats.length; i++) {
            let cat = cats[i];
            let elem = document.createElement('div');
            elem.setAttribute('class', 'listBox');
            let a = document.createElement('a');
            a.setAttribute('class', 'cell');
            catList.appendChild(elem).appendChild(a);
            a.innerText = cat.name;
        }
        // adds selected attribute to first cell in column
        document.getElementsByClassName('cell')[0].classList.add('active');

        let clickBox = document.querySelector('#countBox');
        let clickCounter = document.querySelector('#clickCount');
        clickBox.click(false);
        clickCounter.click(false);
    }
    
    // listens for cell click
    function init() {
        catList.addEventListener('click', function(e) {
            octopus.updateSelectedCat(e.target.innerText);
        })
    }

    // highlight selected cat in catList
    function select() {
        catList.addEventListener('click', function(e) {
            let current = document.getElementsByClassName('active');
            current[0].className = current[0].className.replace('active', '');
            e.target.classList.add('active');
        })
    }

    return {
        render, 
        init, 
        select
    }

})();

document.addEventListener('DOMContentLoaded', octopus.init);