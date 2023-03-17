async function loadJson(url) {
    let res = await fetch(url);

    if (response.status == 200) {
        let json = await res.json();
        return json;
    }

    throw new Error(res.status);
}

loadJson('no-such-user.json')
    .catch(console.log('error 404'));