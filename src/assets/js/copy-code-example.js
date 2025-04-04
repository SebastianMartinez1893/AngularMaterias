function CopyToClipboard(id) {
    var r = document.createRange();
    r.selectNode(document.getElementById(id));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    document.getElementById("copyMessage").classList.remove("hide");
    setTimeout(function(){document.getElementById("copyMessage").classList.add("hide");},5000)    
}
