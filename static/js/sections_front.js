const section_html = new DOMParser().parseFromString(`
<section>
    <h2></h2>
    <div class="indicators"></div>
    <nav class="move">
        <button type="button" onclick="slide_button(this)" class="move__btn moveL">ᐊ</button>
        <button type="button" onclick="slide_button(this)" class="move__btn moveR">ᐅ</button>
    </nav>
    <div class="container" onscroll="slide_scroll(this)" data-index=0>
        <a class="element">
            <img src="" class="element__img">
            <detail class="detail">
                <div class="detail__styles">
                <span class="detail__left"></span>
                <span class="detail__center"></span>
                <span class="detail__right"></span>
                </div>
                <br>
                <div class="detail__genres"></div>
            </detail>
            <h4 class="element__title"></h4>
        </a>
    </div>
</section>
`, 'text/html').querySelector('section');

function put_sections_values(sections=[]) {
    if (window.location.pathname.includes('/search/')) {
        let h1 = document.createElement('h1');
        h1.className = 'result';
        h1.innerHTML = 'Results for : '+window.location.search.split('=')[1].split('&')[0];
        document.querySelector('main').prepend(h1);
    }
    sections.forEach(section => {
        let sec = section_html.cloneNode(true);
        sec.querySelector('h2').innerHTML = section['title'];
        
        sec.querySelector('.container').classList.add(section['scrolling_sens']);
        if (sec.querySelector('.vertical')) {['.indicators', '.move'].forEach(s => sec.querySelector(s).remove())}
        
        section['elements'].forEach(el => {
            let element = sec.querySelector('.element').cloneNode(true);
            
            if (!window.location.pathname.includes('/info/')) { element.href = `../info/?url=${btoa(el['link']['url'])}`; }
            else { element.setAttribute('onclick', `show_iframe('../${href[0].toLowerCase()}/?url=${btoa(el['link']['url'])}')`); }
            element.querySelector('img').src = el['img']['url'];
            element.querySelector('img').classList.add(el['img']['type']);
    
            ['left','center','right'].forEach(s => element.querySelector(`.detail__${s}`).innerHTML = el[s])
            let genres = sec.querySelector('.detail__genres');
            el['genres'].forEach(g => { genres.innerHTML += `<span>${g['name']}</span><span>&middot;</span>`; })
    
            element.querySelector('h4').innerHTML = el['title'];
            sec.querySelector('.container').appendChild(element);
        });
        sec.querySelector('.element').remove();
        document.querySelector('.sections').appendChild(sec);
    });
    gen_indicators();
    document.body.setAttribute('onresize', 'gen_indicators()');
}


function width_visib_elements(container) {
    let element_width = container.querySelector('.element').getBoundingClientRect().width;
    return [element_width, parseInt(window.innerWidth / element_width)];
}

function gen_indicators() {
    for (let container of document.querySelectorAll('.container.horizontal')) {
        const elements_length = container.querySelectorAll('.element').length;
        
        if (!elements_length) { container.parentElement.remove(); continue; }
        
        const visib_elements = width_visib_elements(container)[1];
        const nb_indicators = parseInt(elements_length / visib_elements) + (elements_length % visib_elements > 0);
        
        container.parentElement.querySelector('.move').style.display = nb_indicators < 2 || window.innerWidth < 600 ? 'none' : '';
        
        let indicators = container.parentElement.querySelector('.indicators');
        indicators.style.display = nb_indicators < 2 ? 'none' : '';

        indicators.innerHTML = '';
        for (let i=0; i<nb_indicators; i++) {
            let div = document.createElement('div');
            div.className = 'indicator';
            div.setAttribute('data-index', i);
            indicators.appendChild(div)
        }
        indicators.querySelector('div').classList.add('active');
    }
}

function slide_button(btn) {
    const container = btn.parentElement.parentElement.querySelector('.container');
    const nb_indicators = container.parentElement.querySelectorAll('.indicator').length;
    
    container.setAttribute('data-index',
        (parseInt(container.getAttribute('data-index')) + (btn.id.includes('Left') ? -1 : 1) + nb_indicators) % nb_indicators)
    
    container.scroll({
        left: width_visib_elements(container).reduce((a, b) => a*b) * container.getAttribute('data-index'),
        behavior: 'smooth',
    });
}

function slide_scroll(container) {
    const indicators = container.parentElement.querySelectorAll('.indicator');
    container.setAttribute('data-index',
        container.scrollLeft == container.scrollLeftMax ?
            indicators.length-1 : parseInt(container.scrollLeft / width_visib_elements(container).reduce((a, b) => a*b)));

    container.parentElement.querySelector('.indicator.active').classList.remove('active');
    indicators[container.getAttribute('data-index')].classList.add('active');
}