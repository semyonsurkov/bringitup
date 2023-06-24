export default class Form {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll('input');
    this.message = {
      loading: 'Loading...',
      success: 'Thank you! We will contact you soon!',
      failure: 'Something went wrong...',
    };
    this.path = 'https://eogq7bt1cf5yuc2.m.pipedream.net';
  }

  clearInputs() {
    this.inputs.forEach((input) => {
      input.value = '';
    });
  }

  checkMailInputs() {
    const mailInputs = document.querySelectorAll('[type="email"]');

    mailInputs.forEach((input) => {
      input.addEventListener('keypress', function (e) {
        const event = e;
        if (event.key.match(/[^a-z 0-9 @ \.]/gi)) {
          event.preventDefault();
        }
      });
    });
  }

  initMask() {
    const setCursorPosition = (position, element) => {
      element.focus();

      if (element.setSelectionRange) {
        element.setSelectionRange(position, position);
      } else {
        if (element.createTextRange) {
          let range = element.createTextRange();

          range.collapse(true);
          range.moveEnd('character', position);
          range.moveStart('character', position);
          range.select();
        }
      }
    };

    const createMask = (event) => {
      const matrix = '+1 (___) ___-____';
      const def = matrix.replace(/\D/g, '');
      let value = event.target.value.replace(/\D/g, '');
      let i = 0;

      if (def.length >= value.length) {
        value = def;
      }

      event.target.value = matrix.replace(/./g, function (s) {
        return /[_\d]/.test(s) && i < value.length
          ? value.charAt(i++)
          : i >= value.length
          ? ''
          : s;
      });

      if (event.type === 'blur') {
        if (event.target.value.length === 2) {
          event.target.value = '';
        }
      } else {
        setCursorPosition(event.target.value.length, event.target);
      }
    };

    let inputs = document.querySelectorAll('[name="phone"]');

    inputs.forEach((input) => {
      input.addEventListener('input', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
    });
  }

  async postData(url, formData) {
    const object = {};
    formData.forEach((value, key) => (object[key] = value.toString()));
    const body = JSON.stringify(object);
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    return await result.text();
  }

  init() {
    this.checkMailInputs();
    this.initMask();
    this.forms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('div');
        statusMessage.style.cssText = `
          margin-top: 15px;
          font-size: 18px; 
          color: grey;  
        `;
        form.parentNode.appendChild(statusMessage);

        statusMessage.textContent = this.message.loading;

        const formData = new FormData(form);

        this.postData(this.path, formData)
          .then((result) => {
            console.log(result);
            statusMessage.textContent = this.message.success;
          })
          .catch(() => {
            statusMessage.textContent = this.message.failure;
          })
          .finally(() => {
            this.clearInputs();
            setTimeout(() => {
              statusMessage.remove();
            }, 5000);
          });
      });
    });
  }
}
