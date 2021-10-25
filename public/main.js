
var trash = document.getElementsByClassName("fa-trash");



Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    console.log(name)
    console.log(msg)
    fetch('delete', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'msg': msg,
        'name': name
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});
