(async () => {
    let search = {};
    for ( const [key, value] of new URLSearchParams(location.search.substring(1))) search[key] = value;
    put_sections_values(await requestURL(btoa(eval('`'+module['request']['url']+'`'))))
})()