export default class VideoPlayer {
  constructor(triggers, overlay) {
    this.buttons = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector('.close');
  }

  bindTriggers() {
    this.buttons.forEach((button) => {
      button.addEventListener('click', () => {
        if (document.querySelector('iframe#frame')) {
          this.overlay.style.display = 'flex';
        } else {
          const path = button.getAttribute('data-url');

          this.createPlayer(path);
        }
      });
    });
  }

  bindCloseButton() {
    const closeOverlay = () => {
      this.overlay.style.display = 'none';
      this.player.stopVideo();
    };

    this.close.addEventListener('click', closeOverlay);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeOverlay();
      }
    });

    this.overlay.addEventListener('click', (event) => {
      if (event.target === this.overlay) {
        closeOverlay();
      }
    });
  }

  createPlayer(videoId) {
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId,
    });

    console.log(this.player);
    this.overlay.style.display = 'flex';
  }

  init() {
    const tag = document.createElement('script');

    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.bindTriggers();
    this.bindCloseButton();
  }
}
