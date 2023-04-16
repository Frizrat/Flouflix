document.querySelector('h2').innerHTML = 'Results for : ' + document.querySelector('title').innerHTML.split(' |')[0];
document.querySelector('.indicators').remove();
document.querySelector('.move').remove();
document.querySelector('.slider').className = 'results';

(async () => {
    let search = {};
    for ( const [key, value] of new URLSearchParams(location.search.substring(1))) search[key] = value;
    
    (await requestURL(btoa(eval('`'+module['request']['url']+'`')))).forEach(result => {
        let element = document.querySelector('.element').cloneNode(true);
        element.classList.add('result');
    
        element.href = `${window.location.href.split('search/')[0]}info/?url=${btoa(result['link'])}`;
        element.querySelector('img').src = result['img'];
    
        ['left','center','right'].forEach(s => element.querySelector(`.detail__${s}`).innerHTML = result[s])
        let genres = document.querySelector('.detail__genres');
        result['genres'].forEach(g => { genres.innerHTML += `<span>${g}</span><span>&middot;</span>`; })
    
        element.querySelector('h4').innerHTML = result['title'];
        document.querySelector('.results').appendChild(element);
    });
    document.querySelector('.element').remove();
})()