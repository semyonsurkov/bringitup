export default class Download {
  constructor(triggers) {
    this.buttons = document.querySelectorAll(triggers);
    this.path = 'assets/img/mainbg.jpg';
  }

  downloadItem(path) {
    const link = document.createElement('a');

    link.setAttribute('href', path);
    link.setAttribute('download', 'nice_picture');

    link.style.display = 'none';
    document.body.appendChild(link);

    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  }

  init() {
    this.buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        this.downloadItem(this.path);
      });
    });
  }
}
