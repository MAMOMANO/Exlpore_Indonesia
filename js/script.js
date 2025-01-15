$(document).ready(function () {
    // Menampilkan data wisata
    $.getJSON('../json/data.json', function (data) {
        let wisata = data.wisata;

        $.each(wisata, function (i, wisataItem) {
            $('.tempat').append(`
                <div class="tempatpopuler" data-id="${wisataItem.id}">
                    <img src="/wisata/${wisataItem.gambar}" />
                    <h4>${wisataItem.nama}</h4>
                </div>
            `);
        });
    });

    // Klik tempat wisata
    $('.tempat').on('click', '.tempatpopuler', function () {
        const dataId = $(this).data('id');
        localStorage.removeItem('selectedTempatId');
        localStorage.setItem('selectedWisataId', dataId);
        window.location.href = 'detail.html';
    });

    // Menampilkan detail wisata
    const selectedWisataId = localStorage.getItem('selectedWisataId');
    if (selectedWisataId) {
        $.getJSON('../json/data.json', function (data) {
            const wisata = data.wisata.find(item => item.id === parseInt(selectedWisataId));
            if (wisata) {
                $('.containerdetail .detailinformasi').html(`
                    <div class="detailinformasi">
                        <img src="/wisata/${wisata.gambar}" />
                        <p>${wisata.deskripsi}</p>
                    </div>
                `);
            } else {
                // alert('Data wisata tidak ditemukan.');
            }
        });
    }

    // Menampilkan data tempat
    $.getJSON('../json/tempat.json', function (data) {
        let tempat = data.tempat;

        $.each(tempat, function (i, tempatItem) {
            $('.cardestinasi').append(`
                <div class="kmplncarddestinasi" data-id="${tempatItem.id}">
                    <img src="/wisata/${tempatItem.gambar}" />
                    <h3>${tempatItem.nama}</h3>
                </div>
            `);
        });
    });

    // Klik tempat destinasi
    $('.cardestinasi').on('click', '.kmplncarddestinasi', function () {
        const dataId = $(this).data('id');
        localStorage.removeItem('selectedWisataId');
        localStorage.setItem('selectedTempatId', dataId);
        window.location.href = 'detailtempat.html';
    });

    // Menampilkan detail tempat
    const selectedTempatId = localStorage.getItem('selectedTempatId');
    if (selectedTempatId) {
        $.getJSON('../json/tempat.json', function (data) {
            const tempat = data.tempat.find(item => item.id === parseInt(selectedTempatId));
            if (tempat) {
                $('.containertempat .detailtempat').html(`
                    <div class="detailtempat">
                        <img src="/wisata/${tempat.gambar}" />
                        <p>${tempat.deskripsi}</p>
                    </div>
                `);
            } else {
                // alert('Data tempat tidak ditemukan.');
            }
        });
    }
});



document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show"); // Optional: animasi berulang
      }
    });
  });

  // Ambil semua elemen dengan class 'hidden'
  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((el) => observer.observe(el));
});

// Fungsi untuk menambahkan kelas 'show' saat elemen terlihat
function handleScrollAnimation() {
  const elements = document.querySelectorAll('.fade-in');
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('show');
    }
  });
}

// Event listener untuk scroll
window.addEventListener('scroll', handleScrollAnimation);
