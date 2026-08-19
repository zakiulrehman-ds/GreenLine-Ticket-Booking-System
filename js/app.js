/* =========================================================
   GreenLine — shared data & helpers
   Uses jQuery + SweetAlert2. No backend — localStorage simulates persistence.
   ========================================================= */

// ---- Mock route/bus data (prices in PKR) ---------------------------
const GL_BUSES = [
  // Sialkot <-> Lahore
  { id: "GL-101", operator: "Greenline Coaches", type: "AC Sleeper",    from: "Sialkot",    to: "Lahore",     depart: "07:00", arrive: "11:15", duration: "4h 15m", price: 360, seatsTotal: 20 },
  { id: "GL-102", operator: "Punjab Metro",       type: "AC Seater",     from: "Sialkot",    to: "Lahore",     depart: "10:30", arrive: "14:15", duration: "3h 45m", price: 300, seatsTotal: 20 },

  // Sialkot <-> Gujranwala
  { id: "GL-119", operator: "Punjab Metro",       type: "Non-AC Seater", from: "Sialkot",    to: "Gujranwala", depart: "08:00", arrive: "09:00", duration: "1h 00m", price: 320, seatsTotal: 20 },
  { id: "GL-120", operator: "City Link",          type: "AC Seater",     from: "Sialkot",    to: "Gujranwala", depart: "16:00", arrive: "17:00", duration: "1h 00m", price: 350, seatsTotal: 20 },

  // Gujrat <-> Islamabad
  { id: "GL-121", operator: "Greenline Coaches", type: "AC Seater",     from: "Gujrat",     to: "Islamabad",  depart: "09:00", arrive: "11:30", duration: "2h 30m", price: 620, seatsTotal: 20 },
  { id: "GL-122", operator: "Punjab Express",     type: "AC Sleeper",    from: "Gujrat",     to: "Islamabad",  depart: "17:00", arrive: "19:30", duration: "2h 30m", price: 680, seatsTotal: 20 },

  // Daska <-> Lahore
  { id: "GL-103", operator: "Greenline Coaches", type: "AC Seater",     from: "Daska",      to: "Lahore",     depart: "08:00", arrive: "11:30", duration: "3h 30m", price: 450, seatsTotal: 20 },
  { id: "GL-104", operator: "City Link",          type: "Non-AC Seater", from: "Daska",      to: "Lahore",     depart: "15:00", arrive: "18:20", duration: "3h 20m", price: 380, seatsTotal: 20 },

  // Sialkot -> Islamabad
  { id: "GL-105", operator: "Greenline Coaches", type: "AC Sleeper",    from: "Sialkot",    to: "Islamabad",  depart: "06:30", arrive: "10:00", duration: "3h 30m", price: 420, seatsTotal: 20 },
  { id: "GL-106", operator: "Punjab Express",     type: "AC Seater",     from: "Sialkot",    to: "Islamabad",  depart: "13:00", arrive: "16:15", duration: "3h 15m", price: 380, seatsTotal: 20 },

  // Sialkot -> Karachi
  { id: "GL-107", operator: "Greenline Coaches", type: "AC Sleeper",    from: "Sialkot",    to: "Karachi",    depart: "18:00", arrive: "12:00", duration: "18h 00m", price: 3200, seatsTotal: 20 },

  // Sialkot -> Multan
  { id: "GL-108", operator: "City Link",          type: "AC Seater",     from: "Sialkot",    to: "Multan",     depart: "09:00", arrive: "15:30", duration: "6h 30m", price: 950, seatsTotal: 20 },

  // Lahore -> Islamabad
  { id: "GL-109", operator: "Greenline Coaches", type: "AC Sleeper",    from: "Lahore",     to: "Islamabad",  depart: "07:30", arrive: "10:45", duration: "3h 15m", price: 400, seatsTotal: 20 },
  { id: "GL-110", operator: "Punjab Express",     type: "AC Seater",     from: "Lahore",     to: "Islamabad",  depart: "14:00", arrive: "17:00", duration: "3h 00m", price: 350, seatsTotal: 20 },

  // Lahore -> Karachi
  { id: "GL-111", operator: "Greenline Coaches", type: "AC Sleeper",    from: "Lahore",     to: "Karachi",    depart: "19:00", arrive: "12:30", duration: "17h 30m", price: 3000, seatsTotal: 20 },

  // Lahore -> Multan
  { id: "GL-112", operator: "City Link",          type: "AC Seater",     from: "Lahore",     to: "Multan",     depart: "10:00", arrive: "15:00", duration: "5h 00m", price: 800, seatsTotal: 20 },

  // Gujranwala -> Islamabad
  { id: "GL-113", operator: "Punjab Metro",       type: "AC Seater",     from: "Gujranwala", to: "Islamabad",  depart: "08:30", arrive: "11:30", duration: "3h 00m", price: 360, seatsTotal: 20 },

  // Gujranwala -> Karachi
  { id: "GL-114", operator: "Greenline Coaches", type: "AC Sleeper",    from: "Gujranwala", to: "Karachi",    depart: "17:30", arrive: "12:00", duration: "18h 30m", price: 3100, seatsTotal: 20 },

  // Gujranwala -> Multan
  { id: "GL-115", operator: "City Link",          type: "AC Seater",     from: "Gujranwala", to: "Multan",     depart: "11:00", arrive: "16:45", duration: "5h 45m", price: 870, seatsTotal: 20 },

  // Daska -> Islamabad
  { id: "GL-116", operator: "Punjab Express",     type: "AC Seater",     from: "Daska",      to: "Islamabad",  depart: "09:30", arrive: "12:45", duration: "3h 15m", price: 400, seatsTotal: 20 },

  // Daska -> Karachi
  { id: "GL-117", operator: "Greenline Coaches", type: "AC Sleeper",    from: "Daska",      to: "Karachi",    depart: "18:30", arrive: "13:00", duration: "18h 30m", price: 3250, seatsTotal: 20 },

  // Daska -> Multan
  { id: "GL-118", operator: "City Link",          type: "AC Seater",     from: "Daska",      to: "Multan",     depart: "10:30", arrive: "16:30", duration: "6h 00m", price: 920, seatsTotal: 20 },
];

const GL_CITIES = ["Lahore", "Sialkot", "Gujranwala", "Daska", "Islamabad", "Karachi", "Multan", "Gujrat"];

// Seats hardcoded as "sold" directly in the seats_selection.html markup
// (buttons 1,2,3,4,6,7,8 carry class="sold"). Kept identical for every bus.
const GL_SOLD_SEATS = [1, 2, 3, 4, 6, 7, 8];
const GL_SEATS_TOTAL = 20;

// ---- localStorage helpers -------------------------------------------
const GL = {
  getSearch(){ return JSON.parse(localStorage.getItem("gl_search") || "null"); },
  setSearch(obj){ localStorage.setItem("gl_search", JSON.stringify(obj)); },

  getSelectedBus(){ return JSON.parse(localStorage.getItem("gl_selected_bus") || "null"); },
  setSelectedBus(obj){ localStorage.setItem("gl_selected_bus", JSON.stringify(obj)); },

  getSelectedSeats(){ return JSON.parse(localStorage.getItem("gl_selected_seats") || "[]"); },
  setSelectedSeats(arr){ localStorage.setItem("gl_selected_seats", JSON.stringify(arr)); },

  getBookings(){ return JSON.parse(localStorage.getItem("gl_bookings") || "[]"); },
  saveBooking(booking){
    const all = GL.getBookings();
    all.unshift(booking);
    localStorage.setItem("gl_bookings", JSON.stringify(all));
  },
  cancelBooking(id){
    const all = GL.getBookings().map(b => b.id === id ? {...b, status: "cancelled"} : b);
    localStorage.setItem("gl_bookings", JSON.stringify(all));
  },

  soldSeatsFor(){ return GL_SOLD_SEATS.slice(); },

  money(n){ return Math.round(Number(n) || 0) + "rs"; },

  bookingCode(){
    return "GL" + Math.random().toString(36).slice(2, 6).toUpperCase() + Date.now().toString().slice(-4);
  },

  todayISO(){ return new Date().toISOString().slice(0, 10); },

  formatDate(iso){
    if (!iso) return "";
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  },

  // Guard: redirect to a previous step if required state is missing
  requireSearch(){ if (!GL.getSearch()) window.location.href = "index.html"; },
  requireBus(){ if (!GL.getSelectedBus()) window.location.href = "index.html"; },
  requireSeats(){ if (!GL.getSelectedSeats().length) window.location.href = "index.html"; },

  // Small wrapper so every page can show an error the same way (SweetAlert2 is
  // already loaded on every page).
  alertError(message, title){
    if (window.Swal){
      Swal.fire({ icon: "error", title: title || "Something's not right", text: message, confirmButtonColor: "#198754" });
    } else {
      alert(message);
    }
  },
  confirmAction(message, title){
    if (window.Swal){
      return Swal.fire({
        icon: "warning",
        title: title || "Are you sure?",
        text: message,
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes"
      }).then(res => res.isConfirmed);
    }
    return Promise.resolve(confirm(message));
  }
};

/* =========================================================
   Global page wiring — runs on every page
   ========================================================= */
$(function(){

  // Fix the placeholder "javascript:void(0)" nav links so the site is
  // actually navigable (logo -> home, "My Bookings" -> booking.html).
  $(".navbar-brand").on("click", function(e){
    e.preventDefault();
    window.location.href = "index.html";
  });
  $(".my-booking-link, a.nav-link:contains('My Bookings')").on("click", function(e){
    e.preventDefault();
    window.location.href = "booking.html";
  });

  // Set min date = today on the travel-date input, if present on this page.
  $("#date").attr("min", GL.todayISO());

  // ---- Search form (index.html / results.html) ----------------------
  const $searchForm = $(".booking-form");
  if ($searchForm.length){
    $searchForm.on("submit", function(e){
      e.preventDefault();
      const from = $("#origin").val();
      const to = $("#destination").val();
      const date = $("#date").val();
      const passengers = parseInt($("#passengers").val(), 10) || 1;

      if (!from || !to){
        GL.alertError("Please choose both an origin and a destination city.");
        return;
      }
      if (from === to){
        GL.alertError("Origin and destination can't be the same city.");
        return;
      }
      if (!date){
        GL.alertError("Please pick a travel date.");
        return;
      }

      GL.setSearch({ from, to, date, passengers });
      window.location.href = "results.html";
    });
  }

  // "View buses" quick-route buttons on the popular-routes section.
  $(document).on("click", ".quick-route", function(){
    const from = $(this).data("from");
    const to = $(this).data("to");
    $("#origin").val(from);
    $("#destination").val(to);
    $("#date").val(GL.todayISO());
    GL.setSearch({ from, to, date: GL.todayISO(), passengers: parseInt($("#passengers").val(), 10) || 1 });
    window.location.href = "results.html";
  });

  /* =======================================================
     results.html — populate the existing bus-listing markup
     (routeTitle / routeSubtitle / busList / noResults already
     exist in the HTML — we just clear and rebuild them here.)
     ======================================================= */
  if ($("#busList").length && $("#routeTitle").length){
    GL.requireSearch();
    const search = GL.getSearch();

    $("#routeTitle").html(`${search.from} <span class="text-success">→</span> ${search.to}`);
    $("#routeSubtitle").text(`${GL.formatDate(search.date)} · ${search.passengers} passenger${search.passengers > 1 ? "s" : ""}`);

    $("#busList").empty(); // clear the static sample cards from the HTML

    const buses = GL_BUSES.filter(b => b.from === search.from && b.to === search.to);

    if (!buses.length){
      $("#noResults").show();
    } else {
      $("#noResults").hide();
      const soldCount = GL.soldSeatsFor().length;
      buses.forEach(b => {
        const available = b.seatsTotal - soldCount;
        const seatsClass = available <= 5 ? "text-danger" : "text-success";
        $("#busList").append(`
          <div class="bg-white p-3 p-md-4 rounded-3 border shadow-sm">
            <div class="row align-items-center g-3">
              <div class="col-12 col-md-3">
                <div class="fw-bold fs-5 text-dark">${b.operator}</div>
                <span class="badge border border-secondary text-secondary bg-light mt-1 fw-normal">${b.type}</span>
              </div>
              <div class="col-12 col-md-5">
                <div class="d-flex align-items-center gap-2">
                  <div class="text-center">
                    <div class="fw-bold fs-5">${b.depart}</div>
                    <div class="text-secondary small">${b.from}</div>
                  </div>
                  <div class="d-flex align-items-center flex-grow-1 mx-2 text-muted small">
                    <div class="border-top border-2 flex-grow-1 border-secondary border-opacity-25"></div>
                    <span class="px-2">${b.duration}</span>
                    <div class="border-top border-2 flex-grow-1 border-secondary border-opacity-25"></div>
                  </div>
                  <div class="text-center">
                    <div class="fw-bold fs-5">${b.arrive}</div>
                    <div class="text-secondary small">${b.to}</div>
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-2 text-md-center">
                <div class="fw-bold fs-4 text-dark">${GL.money(b.price)}</div>
                <div class="small fw-semibold ${seatsClass}">${available} seats left</div>
              </div>
              <div class="col-6 col-md-2 d-grid">
                <button class="btn btn-success fw-medium select-bus" data-id="${b.id}">Select seats</button>
              </div>
            </div>
          </div>
        `);
      });
    }

    $(document).on("click", ".select-bus", function(){
      const bus = GL_BUSES.find(b => b.id === $(this).data("id"));
      GL.setSelectedBus(bus);
      GL.setSelectedSeats([]);
      window.location.href = "seats_selection.html";
    });
  }

  /* =======================================================
     seats_selection.html
     ======================================================= */
  if (window.location.pathname.endsWith("seats_selection.html")){
    GL.requireBus();
    const bus = GL.getSelectedBus();
    const search = GL.getSearch() || { passengers: 1 };
    const needed = search.passengers || 1;
    let selected = [];

    $("#busTitle").text(`${bus.operator}`);
    $("#busTitle").next(".bus-badge").text(bus.type);
    $("#busSubtitle").html(`${bus.from} &rarr; ${bus.to} &middot; ${bus.depart}–${bus.arrive}`);
    $("#needCount").text(needed);
    $("#farePerSeat").text(GL.money(bus.price));

    function renderSelection(){
      $("#selectedSeatsList").empty();
      if (!selected.length){
        $("#selectedSeatsList").append(`<span class="text-muted small italic">No seats selected yet.</span>`);
      } else {
        selected.slice().sort((a, b) => a - b).forEach(n => {
          $("#selectedSeatsList").append(`<span class="bus-type-badge mono">Seat ${n}</span>`);
        });
      }
      $("#totalFare").text(GL.money(bus.price * selected.length));
      $("#continueBtn").prop("disabled", selected.length !== needed);
      $("#seatWarning").hide();
    }
    renderSelection();

    $("#seatGrid").on("click", ".seat:not(.sold):not(:disabled)", function(){
      const n = parseInt($(this).data("seat"), 10);
      const idx = selected.indexOf(n);

      if (idx > -1){
        selected.splice(idx, 1);
        $(this).removeClass("selected");
      } else {
        if (selected.length >= needed){
          $("#seatWarning").text(`You only need ${needed} seat(s). Deselect one first.`).show();
          return;
        }
        selected.push(n);
        $(this).addClass("selected");
      }
      renderSelection();
    });

    $("#continueBtn").on("click", function(){
      GL.setSelectedSeats(selected);
      window.location.href = "checkout.html";
    });
  }

  /* =======================================================
     checkout.html
     ======================================================= */
  if ($("#checkoutForm").length){
    GL.requireSeats();
    const bus = GL.getSelectedBus();
    const search = GL.getSearch();
    const seats = GL.getSelectedSeats();
    const total = bus.price * seats.length;

    $("#sumRoute").text(`${bus.from} → ${bus.to}`);
    $("#sumOperator").html(`${bus.operator} &middot; ${bus.type}`);
    $("#sumDate").text(GL.formatDate(search.date));
    $("#sumTime").text(bus.depart);
    $("#sumSeats").text(seats.slice().sort((a, b) => a - b).join(", "));
    $("#sumTotal").text(GL.money(total));
    $("#sumTotalSide").text(GL.money(total));

    // Light input formatting
    $("#cardNumber").on("input", function(){
      let v = $(this).val().replace(/\D/g, "").slice(0, 16);
      $(this).val(v.replace(/(.{4})/g, "$1 ").trim());
    });
    $("#cardExpiry").on("input", function(){
      let v = $(this).val().replace(/\D/g, "").slice(0, 4);
      if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
      $(this).val(v);
    });
    $("#cardCvv").on("input", function(){
      $(this).val($(this).val().replace(/\D/g, "").slice(0, 4));
    });

    $("#checkoutForm").on("submit", function(e){
      e.preventDefault();
      const cardDigits = $("#cardNumber").val().replace(/\D/g, "");
      if (cardDigits.length < 15){
        $("#checkoutError").text("Enter a valid card number.").show();
        return;
      }
      $("#checkoutError").hide();

      const booking = {
        id: GL.bookingCode(),
        status: "confirmed",
        createdAt: new Date().toISOString(),
        passenger: { name: $("#pName").val(), phone: $("#pPhone").val(), email: $("#pEmail").val() },
        bus, search, seats,
        total
      };
      GL.saveBooking(booking);
      localStorage.setItem("gl_last_booking", booking.id);
      window.location.href = "confirmation.html";
    });
  }

  /* =======================================================
     confirmation.html
     ======================================================= */
  if ($("#ticketCard").length){
    const lastId = localStorage.getItem("gl_last_booking");
    const booking = GL.getBookings().find(b => b.id === lastId);

    if (!booking){
      window.location.href = "index.html";
      return;
    }

    $("#confSub").text(`A confirmation has been sent to ${booking.passenger.email}.`);
    $("#tCode").text(booking.id);
    $("#tRoute").text(`${booking.bus.from} → ${booking.bus.to}`);
    $("#tOperator").html(`${booking.bus.operator} &middot; ${booking.bus.type}`);
    $("#tDate").text(GL.formatDate(booking.search.date));
    $("#tDepart").text(booking.bus.depart);
    $("#tArrive").text(booking.bus.arrive);
    $("#tSeats").text(booking.seats.slice().sort((a, b) => a - b).join(", "));
    $("#tPassenger").text(booking.passenger.name);
    $("#tTotal").text(GL.money(booking.total));
  }

  /* =======================================================
     booking.html — My Bookings list
     ======================================================= */
  if ($("#bookingsList").length){
    function render(){
      const bookings = GL.getBookings();
      $("#bookingsList").empty(); // clear the static sample card from the HTML

      if (!bookings.length){
        $("#emptyState").show();
        return;
      }
      $("#emptyState").hide();

      bookings.forEach(b => {
        const cancelled = b.status === "cancelled";
        $("#bookingsList").append(`
          <div class="bus-card bg-white p-3 p-md-4 rounded-3 border shadow-sm ${cancelled ? "opacity-50" : ""}">
            <div class="row align-items-center g-3">
              <div class="col-12 col-md-3">
                <div class="font-monospace text-secondary small mb-1">${b.id}</div>
                <div class="fw-bold fs-5 text-dark">${b.bus.from} → ${b.bus.to}</div>
              </div>
              <div class="col-12 col-md-3">
                <div class="small text-secondary fw-semibold text-uppercase">Date</div>
                <div class="fw-medium text-dark">${GL.formatDate(b.search.date)} &middot; ${b.bus.depart}</div>
              </div>
              <div class="col-6 col-md-2">
                <div class="small text-secondary fw-semibold text-uppercase">Seats</div>
                <div class="font-monospace fw-medium text-dark">${b.seats.slice().sort((x, y) => x - y).join(", ")}</div>
              </div>
              <div class="col-6 col-md-2">
                <div class="small text-secondary fw-semibold text-uppercase">Total</div>
                <div class="font-monospace fw-bold text-success fs-5">${GL.money(b.total)}</div>
              </div>
              <div class="col-12 col-md-2 d-flex flex-wrap gap-2 justify-content-start justify-content-md-end align-items-center">
                <span class="badge ${cancelled ? "bg-danger bg-opacity-10 text-danger border border-danger" : "bg-success bg-opacity-10 text-success border border-success"} px-2 py-1">${cancelled ? "Cancelled" : "Confirmed"}</span>
                ${!cancelled ? `<button class="btn btn-outline-danger btn-sm fw-medium cancel-btn" data-id="${b.id}">Cancel</button>` : ""}
              </div>
            </div>
          </div>
        `);
      });
    }

    render();

    $(document).on("click", ".cancel-btn", function(){
      const id = $(this).data("id");
      GL.confirmAction("Cancel this booking?").then(ok => {
        if (!ok) return;
        GL.cancelBooking(id);
        render();
      });
    });
  }

});
