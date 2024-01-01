//獲得格式為 2022-01-01 00:00:00 的時間
function getTime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}+00`;
}

export default getTime;