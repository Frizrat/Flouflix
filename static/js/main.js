(async () => {
    Object.entries(await requestURL(btoa(module['request']['url']))).forEach(sec => {
        let section = document.querySelector('section').cloneNode(true);
        section.querySelector('h2').innerHTML = sec[0];
        sec[1].forEach(el => {
            let element = document.querySelector('.element').cloneNode(true);
            
            element.href = `${window.location.href.split('main/')[0]}info/?url=${btoa(el['link'])}`;
            element.querySelector('img').src = el['img'];
    
            ['left','center','right'].forEach(s => element.querySelector(`.detail__${s}`).innerHTML = el[s])
            let genres = document.querySelector('.detail__genres');
            el['genres'].forEach(g => { genres.innerHTML += `<span>${g}</span><span>&middot;</span>`; })
    
            element.querySelector('h4').innerHTML = el['title'];
            section.querySelector('.slider').appendChild(element);
        });
        document.querySelector('main').appendChild(section);
        section.querySelector('.element').remove();
    });
    document.querySelector('section').remove();
    gen_indicators();
})()