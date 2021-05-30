const seats=document.querySelectorAll('.seats')
let booked=document.querySelector('.seat_quantity')
let costs=document.querySelector('.seat_cost')
const rowContainer=document.querySelector('.row_container')
let banner=document.querySelector('.banner')
let currentMovie=document.querySelector('#movie')
let ticketPrice=+currentMovie.value

populateUI()

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
     localStorage.setItem('selectedMovieIndex', movieIndex);
     localStorage.setItem('selectedMoviePrice', moviePrice);
   }


   function populateUI() {
     const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
   
     if (selectedSeats !== null && selectedSeats.length > 0) {
       seats.forEach((seat, index) => {
         if (selectedSeats.indexOf(index) > -1) {
           seat.classList.add('selected_seats');
         }
       });
     }
   
     const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
   
     if (selectedMovieIndex !== null) {
          currentMovie.selectedIndex = selectedMovieIndex;
     }
   }
let bannerFunc=function(){
     let bannerName=currentMovie.options[currentMovie.selectedIndex].text
     let movieFullName=bannerName.split(' ')
     let movieName=movieFullName[0]
     banner.textContent=movieName


}
bannerFunc()


currentMovie.addEventListener('change',e=> {
     ticketPrice=+e.target.value;

     setMovieData(e.target.selectedIndex, e.target.value)
     updateSelection()
     bannerFunc()
}
)

let updateSelection=function(){
let selectedSeats=document.querySelectorAll('.selected_seats')

const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));


let selectedSeatsNumber=selectedSeats.length
costs.textContent=`${selectedSeatsNumber*ticketPrice}`

booked.textContent=`${selectedSeatsNumber}`

}

rowContainer.addEventListener('click',function(e) {
const btn=e.target.closest('.seats')
if(!btn) return

btn.classList.toggle('selected_seats')

let selected=document.querySelector('.selected_seats')
if(!selected) return

updateSelection()
})


updateSelection()



