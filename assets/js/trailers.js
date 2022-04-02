const trailerApi = 'https://62389bd40a54d2ceab77f263.mockapi.io/api/v1/trailer'

$(document).ready(function () {
    $('.search-results').hide()
    $('.no-matches-result').hide()
    callApi(render)
    if (window.innerWidth < 992)
        $('nav.navbar').attr({ "data-toggle": "collapse", "data-target": "#collapsibleNavbar" })
    $(window).on('resize', () => {
        if (window.innerWidth < 992) {
            $('nav.navbar').attr({ "data-toggle": "collapse", "data-target": "#collapsibleNavbar" })
        } else {
            $('nav.navbar').attr({ "data-toggle": false, "data-target": '' })
        }
    })

    // Search feature
    $('.search-input').on('keyup', (e) => {
        let value = $(e.target).val().toLowerCase()
        if (e.key === 'Enter') {
            searchBlogs(e, value)
        }
        $('.search-input span ').click((e) => {
            searchBlogs(e, value)
        })
    })

    // Go head
    if (window.scrollY < 500)
        $('#goHead').hide()
    $(document).on('scroll', (e) => {
        let scrollTop = window.scrollY || document.documentElement.scrollTop
        if (scrollTop >= 500) {
            $('#goHead').show()
        } else {
            $('#goHead').hide()
        }
    })

    $('#goHead').click(goToHead)
})

function callApi(render) {
    $.ajax({
        url: trailerApi,
        dataType: 'json',
    })
        .done(render)
}

function render(datas) {
    const html = datas.map(data =>
        `<div class="col-12 my-4" id="blogItem">
            <div class="card">
                <div class="card-header">
                    <h4 style="cursor:pointer;" onclick="handleTrailerDetail(${data.id})" class="card-title text-dark font-weight-bold">${data.name}</h4>
                    <div class="px-3 py-2 side-info" style="background:rgba(0,0,0,.05);border-top:4px solid #333;">
                        <span>Posted on February 26, 2022</span>
                        <span class="mx-2">by The Film</span>
                        <span>
                            <a href="">
                                Leave a comment
                            </a>
                        </span>
                    </div>
                </div>
                <a onclick="handleTrailerDetail(${data.id})">
                    <img class="card-img-top"
                        src="${data.thumb1}"
                        alt="Card image">
                </a>
                <div class="card-body">
                    <p class="card-text">${data.description}</p>
                    <a onclick="handleTrailerDetail(${data.id})" class="btn btn-danger shadow-none text-dark">READ MORE</a><br>
                    <a href="#" class="btn btn-dark mt-3 shadow-none">Trailers</a>
                </div>
            </div>
        </div>
       `
    ).join('')
    $('.list-trailers').html(html)
}

function handleTrailerDetail(id) {
    callApi(datas => {
        const result = datas.find(data => +data.id === id)
        renderTrailerDetail(result)
    })
}

function renderTrailerDetail(data) {
    const html =
        (`<div class="card">
            <div class="card-header">
                <h4 class="card-title text-dark font-weight-bold">${data.name}</h4>
                <div class="px-3 py-2 side-info" style="background:rgba(0,0,0,.05);border-top:4px solid #333;">
                    <span>Posted on February 26, 2022</span>
                    <span class="mx-2">by The Film</span>
                    <span>
                        <a style="color:#333;" href="">
                            Leave a comment
                        </a>
                    </span>
                </div>
            </div>
            <a href="">
                <img class="card-img-top mb-1 px-3"
                    src="${data.thumb1}"
                    alt="Card image">
            </a>
            <div class="card-body">
                <p class="card-text mb-2">${data.text1}</p>
                <p">${data.url}</p>
                <p class="card-text mt-2">${data.text2}</p>

            </div>
            <div class="card-footer">
            <a href="">
                <img class="card-img-bottom"
                src="${data.thumb2}"
                alt="Card image">
            </a>
            <p class="card-text my-3">${data.debut}</p>
            </div>
        </div>`)
    $('.detail-trailer').html(html)
}

function searchBlogs(e, value) {
    $('.item-current').hide()
    $('.search-results').show()
    $('.search-results span').text(`${value}`)
    $('.older-entries').hide()

    if (value) {
        $('.no-matches-result').hide()
        const result = $('.list-trailers #blogItem').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            return $(this).text().toLowerCase().indexOf(value) > -1
        })
        if (result.length === 0) {
            $('.no-matches-result').show()
        }
    } else {
        $('.no-matches-result').show()
    }
    if (value === '')
        $('.no-matches-result').hide()
    $('.search-input input').val(null)
}

function goToHead() {
    window.scrollTo(0, 0)
}
