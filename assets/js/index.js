const blogApi = 'https://62389bd40a54d2ceab77f263.mockapi.io/api/v1/blogs'

$(document).ready(() => {
    $('.search-results').hide();
    $('.no-matches-result').hide()
    callApi()
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

function callApi() {
    $.ajax({
        url: blogApi,
        dataType: 'json',
    }).done(res => {
        render(res)
    })
}

function render(datas) {
    const html = datas.map(data =>
        `<div class="col-12 my-4" id="blogItem">
            <div class="card">
                <div class="card-header">
                    <h4 style="cursor:pointer;" onclick = handerRenderDetail(${data.id}) class="card-title text-dark font-weight-bold">${data.name}</h4>
                    <div class="px-3 py-2 side-info">
                        <span>Posted on
                            <a href="">
                                February 26, 2022
                            </a>
                        </span>
                        <span class="mx-2">
                            by
                            <a href="">
                                The Film
                            </a>
                        </span>
                        <span>
                            <a href="">
                                Leave a comment
                            </a>
                        </span>
                    </div>
                </div>
                <a onclick = handerRenderDetail(${data.id})>
                    <img style="cursor:pointer;" class="card-img-top"
                        src="${data.thumb}"
                        alt="Card image">
                </a>
                <div class="card-body">
                    <p class="card-text">${data.description}</p>
                    <a href="#" onclick = handerRenderDetail(${data.id}) class="btn btn-danger text-dark">READ MORE</a><br>
                    <a href="#" class="btn btn-dark mt-3">Review</a>
                </div>
            </div>
        </div>
`
    ).join('')
    $('.list-blogs').html(html)
}

function handerRenderDetail(id) {
    $.ajax({
        url: blogApi,
        dataType: 'json',
    }).done(res => {
        res.map(data => {
            if (+data.id === id) {
                console.log(data.trailer);
                console.log(typeof (data.trailer));
                $('.detail-blog').html(` <div class="col-12">
                                            <div class="card pl-3 pr-2 pt-3">
                                                ${data.detail}
                                            </div>
                                         </div>`)
            }
        })
    })
}

function searchBlogs(e, value) {
    $('#carousel').hide()
    $('.search-results').show()
    $('.search-results span').text(`${value}`)

    if (value) {
        $('.no-matches-result').hide()
        const result = $('.list-blogs #blogItem').filter(function () {
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
