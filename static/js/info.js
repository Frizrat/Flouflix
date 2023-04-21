(async () => {
    const infos = await requestURL(url_search());
    
    document.querySelector('title').innerHTML = `${infos['title']} | ${document.querySelector('title').innerHTML}`;
    [['.banner__type', 'type'], ['.banner__title', 'title'], ['h3', 'title'], ['.desc', 'desc']].forEach(info => document.querySelector(info[0]).innerHTML = infos[info[1]]);

    infos['details'].forEach(detail => {
        let span = document.createElement('span');
        span.innerHTML = detail;
        document.querySelector('.details').appendChild(span);
    })
    infos['genres'].forEach(genre => {
        let span = document.createElement('span');
        span.innerHTML = genre['name'];
        document.querySelector('.genres').appendChild(span);
    })
    document.querySelector('.bg__img').src = infos['img'];

    put_sections_values(infos['sections'], false);
    adapte_height_bg();
})()

function adapte_height_bg() { document.querySelector('.bg').style.height = (
      document.querySelector('main').getClientRects()[0].height
    + document.querySelector('footer a').getClientRects()[0].height
    + 'px'
)}
document.body.setAttribute('onresize', document.body.getAttribute('onresize')+'; adapte_height_bg()');

function show_iframe(link) {
    document.querySelector('iframe').src = link;
    document.querySelector('.iframe-container').style.display = link ? '': 'none';
    document.body.style.overflow = link ? 'hidden': '';
}