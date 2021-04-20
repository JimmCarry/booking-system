// RENDER STORAGE
const myStorage = window.localStorage;
//myStorage.clear();
// OPTIONS OF SCHEDULE
const TIME_SCHEDULE = ["10:00", "12:00", "14:00", "16:00", "18:00"];
const MOVIES_TITLE = ["The Shawshank Redemption", "Forrest Gump", "The Green Mile", "One Flew Over the Cuckoo's Nest", "Seven"];
const MOVIE_IMG = ["https://img.csfd.cz/files/images/film/posters/162/505/162505167_735db9.jpg?h180", "https://img.csfd.cz/files/images/film/posters/158/988/158988468_acc7b5.jpg?h180", "https://img.csfd.cz/files/images/film/posters/000/079/79050_b712c4.jpg?h180", "https://img.csfd.cz/files/images/film/posters/000/002/2831_9fc5c9.jpg?h180", "https://img.csfd.cz/files/images/film/posters/159/256/159256875_01354b.jpg?h180"];
const MOVIE_TEXT = [ "Strach dělá z lidí vězně. Naděje jim dává křídla. Film natočený podle novely Stephena Kinga. Strhující příběh o přátelství, naději a moudrosti s velmi výraznými hereckými i charakterovými osobnostmi. Andy Dufresne ...",
                     "Zemeckisův film je brilantním shrnutím dosavadních režisérových poznatků o možnostech comicsového vyprávění. Formálně i obsahově nejméně konvenční z jeho snímků přesvědčuje komediálními gagy i naléhavě patetickým tónem.",
                     "Na začátku příběhu se potkáme se starým mužem Paulem Edgecombem (Dabbs Greer). Žije v domově s pečovatelskou službou a právě se dojatě dívá na starý film s Fredem Astairem. Snad až příliš dojatě, protože ...",
                      "Když svobodomyslný malý podvodníček Randle P. McMurphy (Jack Nicholson) přichází do státní psychiatrické nemocnice, jeho nakažlivý odpor k disciplíně otřese rutinou celého zařízení. On je jednou stranou ... ",
                       "Dva policisté (Brad Pitt a Morgan Freeman) jsou na stopě geniálního vraha, zodpovědného za sérii děsivých vražd, jejichž oběti spojuje sedm smrtelných hříchů. V jedné z rolí tohoto kvalitního trhilleru..."];
const NUMBER_OF_SEATS = 9;
const getFalsyArray = () => new Array(NUMBER_OF_SEATS).fill(false);
const templateSeats = [];
// CONST FOR SCHEDULE
const date = new Date();
const dateControl = new Date(Date.now());
const NUMBEROFDAYS = 7;
const numberOfToday = date.getUTCDay();
// CONSTRUCTORS FOR SCHEDULE
class day {
    constructor(date, dateNum, sessionTime) {
      this.date = date;
      this.dateNum = dateNum;
      this.sessionTime = sessionTime
    }
}
class ticket {
    constructor(time, movie, seats, img, text) {
        this.time = time;
        this.movie = movie;
        this.seats = seats;
        this.img = img;
        this.text = text;
    }
}
const getScheduleDays = () => {
    let days = [];
    for (let i = 0; i <= 6; i++) {
        if ( i === 0)  {
            days.push(new Date(date - i * 24 * 60 * 60 * 1000));
        } else {
            days.push(new Date(date - -i * 24 * 60 * 60 * 1000));
        }
    }
    return days;
};
const templateTickets = () => {
    var tickets = [];
    var seats = [];
    for ( let x = 0; x <= NUMBER_OF_SEATS -1; x++) {
        seats.push(false);
    }
    for (let i = 0; i <= MOVIES_TITLE.length -1; i++) {
            const img = MOVIE_IMG[i];
            const time = TIME_SCHEDULE[i];
            const movie = MOVIES_TITLE[i];
            const text = MOVIE_TEXT[i];
            const seatsRender = seats;
            tickets.push(new ticket(time, movie, seatsRender, img, text))      
    }
    return tickets;
}
const templateSchedule = () => {
    var days = [];
    var sessions = [];
    for (let i = 0; i <= NUMBEROFDAYS -1; i++) {
            const dateNum = getScheduleDays()[i].getDate();
            const date = getScheduleDays()[i].getDay();
            console.log(date);
            const timeforday = templateTickets(); 
        if (dateNum === 0 || dateNum === 6) {
            days.push(new day(date, dateNum, timeforday))
        } else {
            days.push((new day(date, dateNum, timeforday)))  
        }
    }
    myStorage.setItem(
        "tuesday",
        JSON.stringify(days) 
    );
}
var data = myStorage.getItem("tuesday");
    if(data) {
        var objektBack = JSON.parse(data);
    } else {
        templateTickets();
        templateSchedule();
    }
// MAIN CONTENT RENDERING
const nameOfDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const nameOfMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
// RENDER MOVIES
const renderMovies = () => {
    // RENDER HEADER WITH TODAY
    const todayNum = date.getDate();
    const todayDay = date.getUTCDay();
    const todayYear = date.getFullYear();
    document.querySelector(".date h2").innerHTML = nameOfDay[todayDay];
    document.querySelector(".date span").innerHTML = todayNum;
    document.querySelector(".date h5").innerHTML = todayYear;
    document.querySelector(".date h1").innerHTML = nameOfMonth[date.getMonth()];
    //RENDER NON FUNCTION CONTENT
    if(date.getDate() < dateControl.getDate()) {
        //console.log(document.querySelectorAll(".card")[0].children[0]);
        document.querySelector(".date").style.backgroundColor="gray";
        for (let i = 0; i <= document.querySelectorAll(".card").length -1; i++) {
            document.querySelectorAll(".card")[i].style.opacity="0.5";
        }
    } else {
        document.querySelector(".date").style.backgroundColor="white";
        for (let i = 0; i <= document.querySelectorAll(".card").length -1; i++) {
            document.querySelectorAll(".card")[i].style.opacity="1";
        }
    }
    // GET DATA FROM LOCALE STORAGE
    var data = myStorage.getItem("tuesday");
    if(data) {
        var objektBack = JSON.parse(data);
    }
        const cardsElement = document.querySelector(".cards");
        const seatsElement = document.querySelector(".seats");
        if (date.getDate() - dateControl.getDate() == 0) {
            var data = objektBack[0];
            
        } else if (date.getDate() - dateControl.getDate() == 1) {
            var data = objektBack[1];
            
        } else if (date.getDate() - dateControl.getDate() == 2) {
            var data = objektBack[2];
           
        } else if (date.getDate() - dateControl.getDate() == 3) {
            var data = objektBack[3];
            
        } else if (date.getDate() - dateControl.getDate() == 4) {
            var data = objektBack[4];
           
        } else if (date.getDate() - dateControl.getDate() == 5) {
            var data = objektBack[5];
           
        } else if (date.getDate() - dateControl.getDate() == 6) {
            var data = objektBack[6];
            
        } 
        for (let i = 0; i < cardsElement.children.length; i++) {   
            const occupied = getFalsyArray().map(x => {   
                let sum = "";
                if (x == false) {
                    sum += `
                    <li class="seat"><span></span></li>`
                } else {
                    sum += `
                    
                    <li class="seat-occupied"><span></span></li>`
                }
                return sum;
            });
            const dataOccupied = data.sessionTime[i].seats.map(x => {
                let sum = "";
                if (x == false) {
                    sum += ` 
                    <li class="seat"><span></span></li>`
                } else {
                    sum += `   
                    <li class="seat-occupied"><span></span></li>`
                }
                return sum;
            });
            let seats = occupied.toString().replace(/,/gi, '');
            let dataSeats = dataOccupied.toString().replace(/,/gi, '');
            if (data) {
                cardsElement.children[i].innerHTML = `
                <div class="movie_card">
                    <h2><span>session time:</span> ${data.sessionTime[i].time}</h2>
                    <h1>${data.sessionTime[i].movie}</h1>
                    <div class="card_option">
                        <img src="${data.sessionTime[i].img}" alt="">
                        </img>
                        <div class="movie_info">
                            <p>${data.sessionTime[i].text}</p>
                        </div>
                    </div> 
                </div>
                <span onclick="showBooking('${i}','${i}','${date.getDate()}')" class="choose_seats">order tickets</span>
                <div class="popup-wrapper">
                <div class="seats-title">
                    <span onclick="hideBooking('${i}','${i}','${date.getDate()}')">X</span>
                        <h2>Choose your seats</h2>                                  
                </div>
                <ul id="seats" class="seats">
                    ${dataSeats}
                </ul>
                <span class="orderTickets" onclick="orderTickets('${i}','${i}','${date.getDate()}')">submit</span>
            </div>
            `;
            } else {
                cardsElement.children[i].innerHTML = `
                <div class="movie_card">
                    <h2><span>session time:</span> ${data.sessionTime[i].time}</h2>
                    <h1>${data.sessionTime[i].movie}</h1>
                    <div class="card_option">
                        <img src="${data.sessionTime[i].img}" alt="">
                        </img>
                        <div class="movie_info">
                            <p>${data.sessionTime[i].text}</p>
                        </div>
                    </div>
                </div>
                <span onclick="showBooking('${i}','${i}','${date.getDate()}')" class="choose_seats">order tickets</span>
                    <div class="popup-wrapper">
                        <div class="seats-title">
                            <span onclick="hideBooking('${i}','${i}','${date.getDate()}')">X</span>  
                            <h2>Choose your seats</h2>    
                        </div>
                        <ul id="seats" class="seats">
                            ${seats}
                        </ul>
                <span class="orderTickets" onclick="orderTickets('${i}','${i}','${date.getDate()}')">submit</span>
                </div>
                `;
            }
        }
        for (let i = 0; i <= 4; i++) {
            const seatsDOM = document.querySelectorAll('.seats');
            seatsDOM[i].addEventListener('click', (e) => {
                if ( 
                    e.target.classList.contains('seat-occupied') ||
                    !e.target.classList.contains('seat')
                )
                return;
                e.target.classList.toggle('seat-selected');
                const selectedSeats = document.querySelectorAll('.seat');
                console.log(selectedSeats);
                const seats = {
                    available: [],
                    occupied: [],
                    selected: [],
                };
            });  
        } 
}
renderMovies();
function showBooking(x) {
    if( date.getDate() < dateControl.getDate() ) {
        return;
    } else {
        document.querySelectorAll(".popup-wrapper")[x].style.display="block";
        document.querySelectorAll(".choose_seats")[x].style.display="none";
    }
}
function hideBooking(x) {
document.querySelectorAll(".popup-wrapper")[x].style.display="none";
document.querySelectorAll(".choose_seats")[x].style.display="flex";
}
document.querySelector(".prev").addEventListener("click", () => {
    document.querySelector(".next").style.display="block";
    if (date.getDate()  === dateControl.getDate() - 6 ) { 
        document.querySelector(".prev").style.display="none";
    } else {
        date.setDate(date.getDate() - 1); 
    }
    renderMovies();
});
document.querySelector(".next").addEventListener("click", () => {
    document.querySelector(".prev").style.display="block";
    if (date.getDate()  === dateControl.getDate() + 6 ) {   
        document.querySelector(".next").style.display="none";
    } else {
        date.setDate(date.getDate() + 1);  
    }
    renderMovies();
});
function orderTickets(x,y,z) {  
// FOR MOVIE INDEX 0  
    if (x == 0) {
        let sum = [];
        for (let i = 0; i <= 8; i++) {
            if (document.querySelectorAll('.seats li')[i].classList.contains('seat-selected') ) {
                sum.push(true);
            } else if (document.querySelectorAll('.seats li')[i].classList.contains('seat-occupied')) {
                sum.push(true);
            } else {
                sum.push(false)
            }
        }
        const dalsi = JSON.parse(myStorage.tuesday);
        const indexMuj = parseInt(z) - parseInt(dateControl.getDate());
        dalsi[indexMuj].sessionTime[x].seats = sum;
        myStorage.setItem(
                "tuesday",
                JSON.stringify(dalsi)
        );
        renderMovies();
// FOR MOVIE INDEX 1
    } else if (x == 1) {
        let sum = [];
        for (let i = 9; i <= 17; i++) {
            if (document.querySelectorAll('.seats li')[i].classList.contains('seat-selected') ) {
                sum.push(true);
            } else if (document.querySelectorAll('.seats li')[i].classList.contains('seat-occupied')) {
                sum.push(true);
            } else {
                sum.push(false)
            }
        }
        const dalsi = JSON.parse(myStorage.tuesday);
        const indexMuj = parseInt(z) - parseInt(dateControl.getDate());
        dalsi[indexMuj].sessionTime[x].seats = sum;
        myStorage.setItem(
                "tuesday",
                JSON.stringify(dalsi)
        );
        renderMovies();
// FOR MOVIE INDEX 2
    } else if (x == 2) {
        let sum = [];
        for (let i = 18; i <= 26; i++) {
            if (document.querySelectorAll('.seats li')[i].classList.contains('seat-selected') ) {
                sum.push(true);
            } else if (document.querySelectorAll('.seats li')[i].classList.contains('seat-occupied')) {
                sum.push(true);
            } else {
                sum.push(false)
            }
        }
        const dalsi = JSON.parse(myStorage.tuesday);
        const indexMuj = parseInt(z) - parseInt(dateControl.getDate());
        dalsi[indexMuj].sessionTime[x].seats = sum;
        myStorage.setItem(
                "tuesday",
                JSON.stringify(dalsi)
        );
        renderMovies();
// FOR MOVIE INDEX 3
    } else if (x == 3) {
        let sum = [];
        for (let i = 27; i <= 35; i++) {
            if (document.querySelectorAll('.seats li')[i].classList.contains('seat-selected') ) {
                sum.push(true);
            } else if (document.querySelectorAll('.seats li')[i].classList.contains('seat-occupied')) {
                sum.push(true);
            } else {
                sum.push(false)
            }
        }
        const dalsi = JSON.parse(myStorage.tuesday);
        const indexMuj = parseInt(z) - parseInt(dateControl.getDate());
        dalsi[indexMuj].sessionTime[x].seats = sum;
        myStorage.setItem(
                "tuesday",
                JSON.stringify(dalsi)
        );
        renderMovies();
// FOR MOVIE INDEX 4
    } else if (x == 4) {
        let sum = [];
        for (let i = 36; i <= 44; i++) {
            if (document.querySelectorAll('.seats li')[i].classList.contains('seat-selected') ) {
    
                sum.push(true);
            } else if (document.querySelectorAll('.seats li')[i].classList.contains('seat-occupied')) {
                sum.push(true);
            } else {
                sum.push(false)
            }
        }
        const dalsi = JSON.parse(myStorage.tuesday);
        const indexMuj = parseInt(z) - parseInt(dateControl.getDate());
        dalsi[indexMuj].sessionTime[x].seats = sum;
        myStorage.setItem(
                "tuesday",
                JSON.stringify(dalsi)
        );
        renderMovies();  
    }   
}