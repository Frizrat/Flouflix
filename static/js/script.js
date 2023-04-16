const href = window.location.href.split('/').slice('-4');
const module = modules[href[0]][href[1]][href[2]];

Object.entries(modules).forEach(module => {
    let optgroup = document.createElement('optgroup');
    optgroup.label = module[0];
    
    Object.keys(module[1]).forEach(site => {
        let option = document.createElement('option');
        option.value = option.innerHTML = site;
        option.selected = module[0] == href[0] && site == href[1];
        optgroup.appendChild(option);
    });
    document.querySelector('#modules').appendChild(optgroup);
});

function research() {
    const search = document.querySelector('.input-search').value;
    window.location = window.location.href.split('/').slice(0, -2).join('/')+`/search/?s=${search}&page=1`;
}
function change_module(select) {
    let page = href[2] == 'search' ? `search/${window.location.search}` : 'main/';
    window.location = `${window.location.origin}/${select.parentElement.label}/${select.value}/${page}`;
}
function url_search() { return window.location.search.split('?url=')[1].split('&')[0]; }

async function requestURL(url) {
    const headers = module['request']['headers'];
    const rem = module['javascript_config']['remove'];

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `/requestURL/`);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhr.send(`url=${url}&${new URLSearchParams(headers).toString()}&proxies=${module['request']['proxies']}`);

    let script = document.createElement('script');
    script.innerHTML = `\nconst request = {
        url: '${atob(url)}',
        headers: JSON.parse(atob('${btoa(JSON.stringify(headers))}')),
    };\n${module['javascript_config']['javascript']}\n`;
    script.id = 'javascript';
    document.body.appendChild(script);

    return await new Promise(resolve => xhr.onload = () => {
        let doc = new DOMParser().parseFromString(xhr.responseText.replaceAll('script'.repeat(+rem), 'p'.repeat(+rem)), 'text/html');

        script.innerHTML += `\nconsole.log(${href[2]}(document));\n`;
        doc.body.appendChild(script);

        document.querySelector('#download').download = `${href[1]}_${href[2]}.html`;
        document.querySelector('#download').href = window.URL.createObjectURL(new Blob([doc.documentElement.outerHTML], { type: 'text/html; charset=utf-8' }));

        resolve(window[href[2]](doc));
    })
}
