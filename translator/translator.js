data = [
    {"id":"id1", "it":"txt in ita", "en": "english txt"},
    {"id":"id2", "it":"txt in ita 2", "en": "english txt 2"}
];

lang = "it"; //change this

for (let i = 1; i <= data.length; i++) {
    let text = "";
    if(lang === "it") text = data[i-1].it;
    else if (lang === "en") text = data[i-1].en;
    $('[data-translate=id'+ i + ']')[0].innerHTML = text;
}