import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "preview","selectImages"]
  connect() {
    this.selectImagesTarget.style.transition = 'opacity 0.5s';
    this.observer = new MutationObserver(() => this.checkImages());
    this.observer.observe(this.previewTarget, { childList: true });
  }
  select() {
    this.inputTarget.click();
  }
  disconnect() {
    this.observer.disconnect();
  }

  preview() {
    let input = this.inputTarget;
    let preview = this.previewTarget;
    let selectImage = this.selectImagesTarget;
    selectImage.style.opacity = '0';
    preview.innerHTML = '';

    Array.from(input.files).forEach((file) => {
      let reader = new FileReader();

      reader.onload = (e) => {
        let img = document.createElement('img');
        img.src = e.target.result;
        img.className = "preview-image";
        img.addEventListener('click', function(e) {
          e.target.remove();
        });
        preview.appendChild(img);
      }

      reader.readAsDataURL(file);
    });
  }

  checkImages() {
    if (this.previewTarget.children.length === 0) {
        console.log("test here")
      this.selectImagesTarget.style.opacity = '1';
    }
  }
}
