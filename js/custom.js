$("#Header").load("layout/header.html");
$("#Footer").load("layout/footer.html");

$(document).ready(function () {
  // Toggle Search Input Visibility
  $('.main_search_btn').on('click', function () {
    var $search_main_input = $('.search_main_input');
    if ($search_main_input.is(':visible')) {
      $search_main_input.hide(); // Hide input
      $('.main_search_btn > i').removeClass('fa-times'); // Reset icon
    } else {
      $search_main_input.show().focus(); // Show input and focus
      $('.main_search_btn > i').addClass('fa-times'); // Change icon
    }
  });

  $('.main_search_btn').on('click', function () {
    $('.main_search_btn > i').toggleClass('fa-times');
  });

  // Perform Search
  $('#searchButton').on('click', function () {
    const searchValue = $('#searchInput').val().trim().toLowerCase();

    if (!searchValue) {
      alert('Please enter a search term!');
      return;
    }

    // Fetch Excel Data
    fetch('path_to_your_excel_file.xlsx')
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = 'ALL'; // Replace with your sheet name
        const sheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(sheet);

        // Filter Data
        const filteredData = sheetData.filter((row) => {
          return Object.values(row).some((cell) =>
            String(cell).toLowerCase().includes(searchValue)
          );
        });

        // Display Results
        displayResults(filteredData);
      })
      .catch((error) => console.error('Error reading Excel file:', error));
  });

  function displayResults(data) {
    const resultsContainer = $('#searchResults');
    resultsContainer.empty();

    if (data.length === 0) {
      resultsContainer.html('<p>No results found.</p>');
      return;
    }

    // Create Table for Results
    const table = $('<table>').addClass('table table-bordered');
    const headerRow = $('<tr>');

    // Add Table Headers
    Object.keys(data[0]).forEach((header) => {
      $('<th>').text(header).appendTo(headerRow);
    });
    table.append(headerRow);

    // Add Table Rows
    data.forEach((row) => {
      const rowElement = $('<tr>');
      Object.values(row).forEach((cell) => {
        $('<td>').text(cell).appendTo(rowElement);
      });
      table.append(rowElement);
    });

    resultsContainer.append(table);
  }
});

  // Search buton end


// banner_slider start
$(".banner_slider").slick({
  dots: false,
  arrows: false,
  infinite: true,
  autoplay: false,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});

// banner_slider end


// product slider jas start

$('.slider-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.slider-nav'
});
$('.slider-nav').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.slider-for',
  dots: true,
  centerMode: true,
  focusOnSelect: true
});
// product slider jas end

// wow animation js

$(function () {
  new WOW().init();
});


// responsive menu js

$(function () {
  $('#menu').slicknav();
});




// slick slider in tabs js end