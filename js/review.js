window.addEventListener('load', function () {
  // review
  const searchBtnReview = document.querySelector('.callback-review-btn')
  const searchModalReview = document.querySelector('.review-modal')
  const modalClose = document.querySelector('.modal-close')

  if (searchBtnReview) {
    searchBtnReview.addEventListener('click', () => {
      searchModalReview.classList.add('-open')
    })
  }

  window.addEventListener('click', (event) => {
    const target = event.target
    if (target.classList.contains('modal-backdrop')) {
      searchModalReview.classList.remove('-open')
    }

    if (target.classList.contains('modal-close-img') || target === modalClose) {
      searchModalReview.classList.remove('-open')
    }
  })
})

var filters = document.getElementsByName('filter')
var prevElement = ''
filters.forEach(function (filter) {
  filter.addEventListener('change', function (e) {
    searchInput.value = ''

    if (filter.checked) {
      filter.parentElement.classList.add('active')
    } else {
      filter.parentElement.classList.remove('active')
    }

    var elements = document.querySelectorAll(
      'input[value="' + filter.value + '"]'
    )
    elements.forEach(function (element) {
      element.click()
    })
    handleFilter()
    prevElement = filter
  })
})
var searchInput = document.getElementById('searchInput')
var clearSearch = document.getElementById('clear-search')
var doctors = document.getElementsByClassName('team-item')

if (searchInput) {
  searchInput.addEventListener('keyup', function (e) {
    var search = searchInput.value
    Object.keys(doctors).forEach(function (item) {
      if (
        doctors[item].dataset.value.toLowerCase().includes(search.toLowerCase())
      ) {
        doctors[item].style.display = 'block'
      } else {
        doctors[item].style.display = 'none'
      }
    })
  })
}

if (clearSearch) {
  clearSearch.addEventListener('click', function () {
    searchInput.value = ''
    filters.forEach(function (filter) {
      filter.parentElement.classList.remove('active')
      filter.checked = false
    })
    Object.keys(doctors).forEach(function (item) {
      doctors[item].style.display = 'block'
    })
  })
}

function checkReviewForm() {
  var reviewName = jQuery('#reviewName').val()
  var reviewDescr = jQuery('#reviewDescr').val()
  var reviewPhone = jQuery('#reviewPhone').val()
  if (reviewDescr == '' || reviewName == '' || reviewPhone == '') {
    alert('Заполните все поля формы')
  } else {
    jQuery.post('review/review.php', {
      reviewName: reviewName,
      reviewDescr: reviewDescr,
      reviewPhone: reviewPhone,
    })
    $('.review-modal').removeClass('-open')
    alert('Сообщение отправлено')
    jQuery('#reviewName').val('')
    jQuery('#reviewPhone').val('')
    jQuery('#reviewDescr').val('')
  }

  return false
}
