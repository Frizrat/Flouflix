let index = 0;
let element_width = 0;
let visib_elements = 0;
let nb_indicators = 0;

function elements_indicators(elements) {
    element_width = elements[0].getBoundingClientRect().width;
    visib_elements = parseInt(window.innerWidth / element_width);
    nb_indicators = parseInt(elements.length / visib_elements) + (elements.length % visib_elements > 0);
}

function gen_indicators() {
    for (let slider of document.querySelectorAll('.slider')) {
        elements_indicators(slider.querySelectorAll('.element'));
        let indicators = slider.parentElement.querySelector('.indicators');

        slider.parentElement.querySelector('.move').style.display = nb_indicators < 2 || window.innerWidth < 600 ? 'none' : '';
        indicators.style.display = nb_indicators < 2 ? 'none' : '';

        indicators.innerHTML = '';
        for (let i=0; i<nb_indicators; i++) {
            let div = document.createElement('div');
            div.className = 'indicator';
            if (i == 0) { div.classList.add('active'); }
            div.setAttribute('data-index', i);
            indicators.appendChild(div)
        }
    }
}

function slide_button(btn) {
    index = (index + (btn.id.includes('Left') ? -1 : 1)) % nb_indicators;
    index = index < 0 ? index + nb_indicators : index;
    btn.parentElement.parentElement.querySelector('.slider').scroll({
        left: element_width * visib_elements * index,
        behavior: 'smooth',
    });
}

function slide_scroll(slider) {
    let indicators = slider.parentElement.querySelectorAll('.indicator');
    index = slider.scrollLeft == slider.scrollLeftMax ?
        indicators.length-1 : parseInt(slider.scrollLeft / (element_width * visib_elements));

    slider.parentElement.querySelector('.indicator.active').classList.remove('active');
    indicators[index].classList.add('active');
}

window.onload = () => { gen_indicators(); }