
// 获取当前地址栏中的查询字符串
function searchParam(url) {
    let search = location.search.slice(1) || '';
    let params = {};
    search && search.split('&').forEach(v => {
        let [key, value] = v.split('=')
        params[key] = decodeURIComponent(value)
    })
    return params;
}


// 加载头部公共页面nav.html
$("#nav").load('./common/nav.html',function(){
    console.log('nav.html加载完毕')
    // nav.html dom结构加载完毕之后，再去加载分类
    loadCate();
})
function formatDate(date,format="YYYY-MM-DD HH:mm:ss"){
        return moment(date).format(format)
}

function startNProgress() {
    NProgress.set(0.4); // 默认设置40% NProgress.set(0) 等价与 NProgress.start()
    let interval = setInterval(function () {
        NProgress.inc(); // 以小量递增
    }, 200)

    $(window).on('load', () => {
        clearInterval(interval)
        NProgress.done()
    })
}

// 开启网页加载的进度条
startNProgress();

// 获取所有的分类
async function loadCate() {
    let data = await axios.get('/cate');
    // 动态创建分类标签追加
    let liHtml = ``;
    data.forEach(({
        name,
        cat_id
    }) => {
        liHtml += `<li><a href="/cate.html?cat_id=${cat_id}">${name}</a></li>`
    })
    $('#wrapCate').html(liHtml);
}
