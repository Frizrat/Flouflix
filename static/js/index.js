const section_html = new DOMParser().parseFromString(`
<section>
    <h2></h2>
    <div class="container vertical" onscroll="slide_scroll(this)">
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

Object.entries(modules).forEach(module => {
    let section = section_html.cloneNode(true);
    section.querySelector('h2').innerHTML = module[0];
    
    Object.entries(module[1]).forEach(site => {
        const module_infos = site[1]['module_infos'];
        let element = section.querySelector('.element').cloneNode(true);
        element.classList.add('square');

        element.href = `/${module[0]}/${site[0]}/main/`;
        
        element.querySelector('img').src = module_infos['img']['url'];
        element.querySelector('img').style = module_infos['img']['style'];

        element.querySelector('.detail__left').innerHTML = module_infos['initials'];
        element.querySelector('.detail__center').innerHTML = module_infos['language'];
        element.querySelector('.detail__right').innerHTML = module_infos['developer'];

        element.querySelector('.detail__genres').innerHTML = `<span>${module_infos['desc']}</span>`;

        element.querySelector('h4').innerHTML = site[0];
        section.querySelector('.container').appendChild(element);
    });
    document.querySelector('main').appendChild(section);
    section.querySelector('.element').remove();
});