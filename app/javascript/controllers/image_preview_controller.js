import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "preview","selectImages","postForm"]
  connect() {
    this.selectImagesTarget.style.transition = 'opacity 0.5s';
    this.observer = new MutationObserver(() => this.checkImages());
    this.observer.observe(this.previewTarget, { childList: true });
    let modal = document.getElementById('exampleModal');

    // Add an event listener for the 'hidden.bs.modal' event
    modal.addEventListener('hidden.bs.modal', () => this.clearImages());
  }
  select() {
    this.inputTarget.click();
  }
  next(){
    console.log("next")
    let form = this.postFormTarget;
    form.style.display="block"
  }
  disconnect() {
    this.observer.disconnect();
  }

  clearImages() {
    this.previewTarget.innerHTML = '';
    this.selectImagesTarget.style.opacity = '1';
  }

  preview() {
    let input = this.inputTarget;
    let preview = this.previewTarget;
    let selectImage = this.selectImagesTarget;
    selectImage.style.opacity = '0';
    preview.innerHTML = '';

    Array.from(input.files).forEach((file,index) => {
      let reader = new FileReader();

      reader.onload = (e) => {
        let div = document.createElement('div');
        div.className = "carousel-item carousel-image";
        if (index === 0) {
          div.className += " active";
        }
        let img = document.createElement('img');
        img.src = e.target.result;
        img.className = "d-block w-100 ";
        div.appendChild(img);
        preview.appendChild(div);
        this.selectImagesTarget.style.opacity = '0';
      }

      reader.readAsDataURL(file);
    });
    console.log(this.previewTarget.children.length)
  }

  checkImages() {
    if (this.previewTarget.children.length === 0) {
      console.log(this.previewTarget.children.length)
      this.selectImagesTarget.style.opacity = '1';
    }
  }
}
