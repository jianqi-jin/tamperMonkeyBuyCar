function getElementsByAttr(tag, attr, value){
    const domList = document.getElementsByTagName(tag)
    let ansDom = []
    for(let i = 0;;) {
        let el = domList[i++]
        if(!el) break 
        let v = el.getAttribute(attr)
        if(v == value){
            ansDom.push(el)
        }
    }
    return ansDom
}

export {
    getElementsByAttr
}