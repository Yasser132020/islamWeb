//fixedNav 

let header = document.querySelector('.header');

let scrollBtn = document.querySelector('.scrollBtn');

console.log(header)

window.addEventListener('scroll',() => {

    window.scrollY > 100 ? header.classList.add('active') : header.classList.remove('active');

    if(window.scrollY > 500)
    {
        scrollBtn.classList.add('active')
    }
    else
    {
        scrollBtn.classList.remove('active')
    }
})


scrollBtn.addEventListener('click',() => {

    window.scrollTo({

        behavior : "smooth",

        top : 0

    })
})

// explore Buton

let 
    exploreBtn 
    = 
    document.querySelector('.title .btn');

    hadithSection     
    = 
    document.querySelector('.hadith');

    console.log(hadithSection)

exploreBtn.addEventListener('click',() => {

    hadithSection.scrollIntoView({

        behavior : 'smooth'
    })

})

// hadithChanger

let 

    hadithContainer     =       document.querySelector('.hadithContainer');

    prev                =       document.querySelector('.prev');

    number              =       document.querySelector('.number');

    next                =       document.querySelector('.next');

    hadithIndex         =       0;



fetch('https://api.hadith.sutanlab.id/books/muslim?range=1-300')

.then(response => response.json())

.then(data => {

    

    let hadiths = data.data.hadiths;

    changeHadith();

    next.addEventListener('click',() => {

        hadithIndex == 299 ? hadithIndex = 0 : hadithIndex++;

        changeHadith();
    })
    
    prev.addEventListener('click',() => {

        hadithIndex == 0 ? hadithIndex = 299 : hadithIndex--;

        changeHadith();
    })

    function changeHadith()
    {
        hadithContainer.innerText = hadiths[hadithIndex].arab;

        number.innerText          = `300 - ${hadithIndex}`;

    }

})

// link sections

let links = document.querySelectorAll('.header ul li');

let sections = document.querySelectorAll('section');

links.forEach(link => {

    link.addEventListener('click',() => {

        document.querySelector('.header ul li.active').classList.remove('active');

        link.classList.add('active');

        let target = link.dataset.filter;

        sections.forEach(section => {

            if(section.classList.contains(target))
            {
                section.scrollIntoView({

                    behavior : 'smooth'
                })
            }
        })

    })
})

// Surah Api 

// fetch surahs meta data {Name Of Surahs}

let surahsContainer = document.querySelector('.surahs-container');

getSurahs()

function getSurahs()
{
    fetch('http://api.alquran.cloud/v1/meta')

    .then(response => response.json())

    .then(data => {

        surahsContainer.innerHTML = ``;

        let surahs = data.data.surahs.references;

        let numberOfSurahs = 114;

        for (let i = 0; i < numberOfSurahs; i++) 
        {
            surahsContainer.innerHTML +=
            `
                <div class="surah">
                    <p>${surahs[i].name}</p>
                    <p>${surahs[i].englishName}</p>
                </div>
            `
        }

        let surahsTitles = document.querySelectorAll('.surah');

        let ayatContainer = document.querySelector('.ayat-container');

        let surahPopup = document.querySelector('.surah-popup');

        surahsTitles.forEach((title,index) => {

            title.addEventListener('click',() => {

                fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)

                .then(response => response.json())

                .then(data => {

                    ayatContainer.innerHTML = ``;

                    surahPopup.classList.add('active');

                    let ayat = data.data.ayahs;

                    ayat.forEach(ayah => 
                    {
                        ayatContainer.innerHTML +=
                        `
                            <p> (${ayah.numberInSurah}) - ${ayah.text} </p>
                        `
                    })

                })
            })
            
        })

        let closeBtn = document.querySelector('.close');

        closeBtn.addEventListener('click',() => {

            surahPopup.classList.remove('active');
            
        })

    })
}


// prayTimes

let cards = document.querySelector('.cards');

getPrayTimes()

function getPrayTimes()
{
    fetch(`https://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt`)

    .then(response => response.json())

    .then(data => {

        let times = data.data.timings;

        cards.innerHTML = ``;
        
        for (const time in times) 
        {
            cards.innerHTML +=
            `
                <div class="card">
                    <div class="circle">
                        <svg>
                            <circle cx="100" cy = "100" r="100"> </circle>
                        </svg>
                        <div class="pray-time">${times[time]}</div>
                    </div>
                    <p>${time}</p>
                </div>
            `
        }
        
    })
}

// active sideBar

let bars    = document.querySelector('.bars');
    sidebar = document.querySelector('.header ul');


    bars.addEventListener('click',() => {
        sidebar.classList.toggle('active')
    })