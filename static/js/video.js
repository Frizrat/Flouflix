let header = document.querySelector('header');
header.innerHTML = '';
header.classList.add('players');

(async () => {
    (await requestURL(url_search())).forEach(player => {
        let li = document.createElement('li');
        li.className = 'player text-grey';
        li.setAttribute('data-link', player['url']);
        li.setAttribute('onclick', 'select_player(this)');
        li.innerHTML = player['name'];
        header.appendChild(li);
    })
    document.querySelector('.player').classList.add('active');
    document.querySelector('.player').click();
})()

function select_player(player) {
    document.querySelector('.active').classList.remove('active');
    player.classList.add('active');
    document.querySelector('iframe').src = player.getAttribute('data-link');
}