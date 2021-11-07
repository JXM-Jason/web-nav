let $lastli = $('.last');//这是最后一个li内容为新增网址
let $sitelist = $('.sitelist');//这是所有的li的父级ul
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);
const hashMap = xObject || [
    { logo: 'a', url: 'https://www.acfun.cn/' },
    { logo: 'b', url: 'https://www.bilibili.com/'},
    { logo: 'j', url: 'https://juejin.cn/' },
    { logo: 'z', url: 'https://zh.javascript.info/' },
    { logo: 'd', url: 'https://developer.mozilla.org/zh-CN/'}
]

//简化URL
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '');//使用正则表达式简化/后面的内容
}
const render = () => {
    $sitelist.find('li:not(.last)').remove();
    hashMap.forEach((node,index) => {
        const $li = $(` 
            <li>
                <div class="site">
                    <div class="logo">${node.logo[0]}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-close"></use
                        </svg>
                    </div>
                </div>
            </li>`
        ).insertBefore($lastli);
        $li.on('click', (e) => {
            window.open(node.url);
        });
        $li.on('click', '.close', (e) => {
            e.stopPropagation();
            hashMap.splice(index,1);
            render();
        })
    })
}
render();

$('.addButton').on('click', () => {
    //获取网址
    //不能有中文
    let url = window.prompt('请输入网址！');
    if (/.*[\u4e00-\u9fa5]+.*$/.test(url)) {
        url = null;
        alert("请按照网站的形式输入，不能包含中文！");
    }
    else if (url.indexOf('http') !== 0) {
        url = 'http://' + url;
    }
    //生成新的li并放在最后一个li的前面
    hashMap.push({ logo: simplifyUrl(url)[0], url: url });
    render();
});

window.onbeforeunload = () => {
    //将哈希变成字符串存储
    const string = JSON.stringify(hashMap);
    window.localStorage.setItem('x', string);
};
{/* 
<svg class="icon">
    <use xlink:href="#icon-diandian"></use>
</svg> */}
$(document).on('keypress', (e) => {
    const key = e.key;//可以简写为 const{key} =e;
    for (let i = 0; i < hashMap.length; i++) {
        
        if (hashMap[i].logo.toLowerCase() ===key) {
            window.open(hashMap[i].url);
        }
        
        
    }

})






