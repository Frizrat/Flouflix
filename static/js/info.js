(async () => {
    const infos = await requestURL(url_search());
    
    document.querySelector('title').innerHTML = `${infos['title']} | ${document.querySelector('title').innerHTML}`;
    [['.banner__type', 'type'], ['.banner__title', 'title'], ['h3', 'title'], ['.infos__details', 'details'], ['.desc', 'desc'], ['.genres', 'genres']].forEach(info => document.querySelector(info[0]).innerHTML += infos[info[1]]);
    document.querySelector('.bg__img').src = infos['img'];

    Object.entries(infos['contents']).forEach(contents => {
        if (contents[1].length > 0) {
            let section = document.querySelector('section').cloneNode(true);
            section.querySelector('h2').innerHTML = contents[0];
    
            contents[1].forEach(content => {
                let element = document.querySelector('.element').cloneNode(true);
                element.setAttribute('data-link', window.location.href.split('info/')[0] + href[0].toLowerCase()+'/?url='+btoa(content['link']));
                element.querySelector('img').src = content['img'];
                element.querySelector('h4').innerHTML = content['title'];
                section.querySelector('.slider').appendChild(element);
            });
            document.querySelector('.contents').appendChild(section);
            section.querySelector('.element').remove();
        }
    });
    document.querySelector('section').remove();
    gen_indicators();
    adapte_height_bg();
})()

function adapte_height_bg() { document.querySelector('.bg').style.height = document.querySelector('main').getClientRects()[0].height+'px'; }
document.body.setAttribute('onresize', document.body.getAttribute('onresize')+'; adapte_height_bg()');

function show_iframe(link) {
    document.querySelector('iframe').src = link;
    document.querySelector('.iframe-container').style.display = link ? '': 'none';
    document.body.style.overflow = link ? 'hidden': '';
}