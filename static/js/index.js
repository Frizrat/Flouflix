document.querySelector('.search-box').remove();
document.querySelector('select').remove();
document.querySelector('#download').remove();

Object.entries(modules).forEach(module => {
    let section = document.querySelector('section').cloneNode(true);
    section.querySelector('h2').innerHTML = module[0];
    
    Object.entries(module[1]).forEach(site => {
        const module_infos = site[1]['module_infos'];
        let element = document.querySelector('.element').cloneNode(true);
        element.classList.add('square');

        element.href = `/${module[0]}/${site[0]}/main/`;
        
        element.querySelector('img').src = module_infos['img']['url'];
        element.querySelector('img').style = module_infos['img']['style'];

        element.querySelector('.detail__left').innerHTML = module_infos['initials'];
        element.querySelector('.detail__center').innerHTML = module_infos['language'];
        element.querySelector('.detail__right').innerHTML = module_infos['developer'];

        element.querySelector('.detail__genres').innerHTML = `<span>${module_infos['desc']}</span>`;

        element.querySelector('h4').innerHTML = site[0];
        section.querySelector('.slider').appendChild(element);
    });
    document.querySelector('main').appendChild(section);
    section.querySelector('.element').remove();
});
document.querySelector('section').remove();
gen_indicators();